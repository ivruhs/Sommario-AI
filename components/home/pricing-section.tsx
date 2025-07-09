// components/home/pricing-section.tsx
"use client";

import { cn } from "@/lib/utils";
import { ArrowRight, Check, CheckIcon } from "lucide-react";
import {
  containerVariants,
  itemVariants,
  pricingPlans,
} from "@/utils/constants";
import { MotionDiv, MotionSection } from "@/components/common/motion-wrapper";
import { initializePaddle, Paddle } from "@paddle/paddle-js";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";

type PriceType = {
  name: string;
  price: number;
  description: string;
  items: string[];
  id: string;
  paymentLink: string;
  priceId: string;
};

const listVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 20,
    },
  },
};

const PricingCard = ({
  name,
  price,
  description,
  items,
  id,
  priceId,
}: PriceType) => {
  const [paddle, setPaddle] = useState<Paddle>();

  useEffect(() => {
    initializePaddle({
      environment:
        process.env.NODE_ENV === "development" ? "sandbox" : "production",
      token: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN!,
    }).then((paddleInstance) => {
      if (paddleInstance) {
        setPaddle(paddleInstance);
      }
    });
  }, []);

  const handleCheckout = async () => {
    if (!paddle) {
      alert("Paddle not initialized");
      return;
    }

    try {
      const res = await fetch("/api/user");
      const data = await res.json();

      if (!data.userId) {
        alert("User not logged in");
        return;
      }

      const clerkUserId = data.userId;

      paddle.Checkout.open({
        items: [{ priceId: priceId, quantity: 1 }],
        customData: {
          clerk_user_id: clerkUserId, // ✅ Send it to Paddle
        },
        settings: {
          displayMode: "overlay",
          theme: "dark",
          successUrl: `${window.location.origin}/dashboard`,
        },
      });
    } catch (err) {
      console.error("Error fetching user ID:", err);
      alert("Something went wrong");
    }
  };

  return (
    <MotionDiv
      variants={listVariants}
      whileHover={{ scale: 1.02 }}
      className="relative w-full max-w-lg hover:scale-105 hover:transition-all duration-300"
    >
      <div
        className={cn(
          "relative flex flex-col h-full gap-4 lg:gap-8 z-10 p-8 border-[1px] border-gray-500/20 rounded-2xl",
          id === "pro" && "border-rose-500 gap-5 border-2"
        )}
      >
        <MotionDiv
          variants={listVariants}
          className="flex justify-between items-center gap-4"
        >
          <div>
            <p className="text-lg lg:text-xl font-bold capitalize">{name}</p>
            <p className="text-base-content/80 mt-2">{description}</p>
          </div>
        </MotionDiv>

        <MotionDiv variants={listVariants} className="flex gap-2">
          <p className="text-5xl tracking-tight font-extrabold">${price}</p>
          <div className="flex flex-col justify-end mb-[4px]">
            <p className="text-xs uppercase font-semibold">USD</p>
            <p className="text-xs">/month</p>
          </div>
        </MotionDiv>

        <MotionDiv
          variants={listVariants}
          className="space-y-2.5 leading-relaxed text-base flex-1"
        >
          {items.map((item, index) => (
            <li key={index} className="flex items-center gap-2">
              <CheckIcon size={18} />
              <span>{item}</span>
            </li>
          ))}
        </MotionDiv>

        <MotionDiv
          variants={listVariants}
          className="space-y-2 flex justify-center w-full"
        >
          <button
            onClick={handleCheckout}
            className={cn(
              "w-full rounded-full flex items-center justify-center gap-2 bg-linear-to-r from-rose-800 to-rose-500 hover:from-rose-500 hover:to-rose-800 text-white border-2 py-2 px-4 transition-all duration-300",
              id === "pro"
                ? "border-rose-500"
                : "border-rose-100 from-rose-400 to-rose-500"
            )}
          >
            Buy Now <ArrowRight size={18} />
          </button>
        </MotionDiv>
      </div>
    </MotionDiv>
  );
};

export default function PricingSection() {
  return (
    <MotionSection
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="relative overflow-hidden"
      id="pricing"
    >
      <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 lg:pt-12">
        <MotionDiv
          variants={itemVariants}
          className="flex items-center justify-center w-full pb-12"
        >
          <h2 className="uppercase font-bold text-xl mb-8 text-rose-500">
            Pricing
          </h2>
        </MotionDiv>
        <div className="relative flex justify-center flex-col lg:flex-row items-center lg:items-stretch gap-8">
          {pricingPlans.map((plan) => (
            <PricingCard key={plan.id} {...plan} />
          ))}
        </div>
      </div>
    </MotionSection>
  );
}
