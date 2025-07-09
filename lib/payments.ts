import { getDbConnection } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
// import { createClerkClient } from "@clerk/backend";

export async function handleSubscriptionCancelled(data: any) {
  console.log("Subscription cancelled:", data.id);
  try {
    const sql = await getDbConnection();
    const customerId = data.customer_id;
    await sql`UPDATE users SET status = 'cancelled' WHERE customer_id = ${customerId}`;
    console.log(
      `Subscription cancelled successfully for customer: ${customerId}`
    );
  } catch (error) {
    console.error("Error handling subscription cancellation:", error);
    throw error;
  }
}
export async function handleTransactionCompleted(data: any) {
  const userId = data.custom_data?.clerk_user_id || null;
  console.log(userId, "User ID from clerk");
  console.log("Transaction completed:", data.id);

  try {
    const subscriptionId = data.subscription_id;
    const customerId = data.customer_id;
    const priceId = data.items[0]?.price?.id;
    const amount = data.details.totals.total;
    const clerkUserId = userId;

    if (!customerId || !priceId) {
      console.error("Missing customer_id or price_id in transaction data");
      return;
    }

    // Get customer details from Paddle
    const customerData = await fetchPaddleCustomer(customerId);
    if (!customerData) {
      console.error("Failed to fetch customer data from Paddle");
      return;
    }

    const sql = await getDbConnection();
    await createOrUpdateUser({
      sql,
      clerkUserId,
      email: customerData.email,
      fullName: customerData.name || customerData.email,
      customerId,
      subscriptionId,
      priceId,
      status: "active",
    });

    await createPayment({
      sql,
      transactionId: data.id,
      amount,
      priceId,
      userEmail: customerData.email,
      status: data.status,
    });

    console.log(
      `Transaction processed successfully for customer: ${customerId}`
    );
  } catch (error) {
    console.error("Error handling transaction completion:", error);
    throw error;
  }
}

async function fetchPaddleCustomer(customerId: string) {
  try {
    const response = await fetch(
      `https://sandbox-api.paddle.com/customers/${customerId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.PADDLE_SANDBOX_API_KEY}`, // use your sandbox secret key here
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to fetch customer: ${response.status} ${errorText}`
      );
    }

    const json = await response.json();
    return json.data;
  } catch (error) {
    console.error("Error fetching Paddle customer:", error);
    return null;
  }
}

async function createOrUpdateUser({
  sql,
  clerkUserId,
  email,
  fullName,
  customerId,
  subscriptionId,
  priceId,
  status,
}: {
  sql: any;
  clerkUserId: string | null;
  email: string;
  fullName: string;
  customerId: string;
  subscriptionId: string | null;
  priceId: string;
  status: string;
}) {
  try {
    const user = await sql`SELECT * FROM users WHERE email = ${email}`;
    if (user.length === 0) {
      await sql`INSERT INTO users (id, email, full_name, customer_id, subscription_id, price_id, status) 
                VALUES (${clerkUserId}, ${email}, ${fullName}, ${customerId}, ${subscriptionId}, ${priceId}, ${status})`;
      console.log(`New user created: ${email}`);
    } else {
      await sql`UPDATE users SET 
                full_name = ${fullName}, 
                customer_id = ${customerId}, 
                price_id = ${priceId}, 
                status = ${status} 
                WHERE email = ${email}`;
      console.log(`User updated: ${email}`);
    }
  } catch (error) {
    console.error("Error creating or updating user:", error);
    throw error;
  }
}
async function createPayment({
  sql,
  transactionId,
  amount,
  priceId,
  userEmail,
  status,
}: {
  sql: any;
  transactionId: string;
  amount: string;
  priceId: string;
  userEmail: string;
  status: string;
}) {
  try {
    await sql`INSERT INTO payments (amount, status, stripe_payment_id, price_id, user_email) 
              VALUES (${amount}, ${status}, ${transactionId}, ${priceId}, ${userEmail})`;
    console.log(`Payment record created for transaction: ${transactionId}`);
  } catch (error) {
    console.error("Error creating payment record:", error);
    throw error;
  }
}
