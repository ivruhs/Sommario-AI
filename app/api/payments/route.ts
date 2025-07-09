// app/api/payments/route.ts
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import {
  handleTransactionCompleted,
  handleSubscriptionCancelled,
} from "@/lib/payments";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.text();
    const signature = req.headers.get("paddle-signature");

    if (!signature) {
      return NextResponse.json(
        { error: "Missing Paddle signature" },
        { status: 400 }
      );
    }

    // Verify Paddle webhook signature
    const webhookSecret = process.env.PADDLE_WEBHOOK_SECRET!;

    if (!verifyPaddleSignature(body, signature, webhookSecret)) {
      console.error("Invalid Paddle signature");
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    const event = JSON.parse(body);
    console.log("Received Paddle notification:", event.event_type);

    switch (event.event_type) {
      case "transaction.completed":
        console.log("Transaction completed");
        await handleTransactionCompleted(event.data);
        break;
      case "subscription.canceled":
        console.log("Subscription cancelled");
        await handleSubscriptionCancelled(event.data);
        break;
      default:
        console.log(`Unhandled event type: ${event.event_type}`);
    }

    return NextResponse.json({ status: "success" });
  } catch (error) {
    console.error("Paddle webhook error:", error);
    return NextResponse.json(
      { error: "Failed to process webhook" },
      { status: 500 }
    );
  }
};

// Paddle signature verification function
function verifyPaddleSignature(
  body: string,
  signature: string,
  secret: string
): boolean {
  try {
    // Parse the signature header
    const parts = signature.split(";");
    let ts = "";
    let h1 = "";

    for (const part of parts) {
      const [key, value] = part.split("=");
      if (key === "ts") {
        ts = value;
      } else if (key === "h1") {
        h1 = value;
      }
    }

    if (!ts || !h1) {
      console.error("Missing timestamp or hash in signature");
      return false;
    }

    // Create the signed payload
    const signedPayload = `${ts}:${body}`;

    // Calculate the expected signature
    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(signedPayload)
      .digest("hex");

    // Compare signatures
    return crypto.timingSafeEqual(
      Buffer.from(h1, "hex"),
      Buffer.from(expectedSignature, "hex")
    );
  } catch (error) {
    console.error("Error verifying Paddle signature:", error);
    return false;
  }
}
