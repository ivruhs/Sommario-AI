// import { isDev } from "@/utils/helpers";
import { Variants } from "motion/react";

const isDev = process.env.NODE_ENV === "development";

export const pricingPlans = [
  {
    name: "Basic",
    price: 9,
    description: "Perfect for occasional use",
    items: [
      "5 PDF summaries per month",
      "Standard processing speed",
      "Email support",
    ],
    id: "basic",
    paymentLink: "", // Not needed for Paddle
    priceId: isDev
      ? "pri_01jzpvcxetyjnkdgap6hp9a5b1"
      : "pri_your_production_basic_price_id",
  },
  {
    name: "Pro",
    price: 19,
    description: "For professionals and teams",
    items: [
      "Unlimited PDF summaries",
      "Priority processing",
      "24/7 priority support",
      "Markdown Export",
    ],
    id: "pro",
    paymentLink: "", // Not needed for Paddle
    priceId: isDev
      ? "pri_01jzpvefqwcaq7jaftxy61s1me"
      : "pri_your_production_pro_price_id",
  },
];

export const containerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

export const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    // y: 0,
    transition: {
      type: "spring",
      stiffness: 50,
      damping: 15,
      duration: 0.8,
    },
  },
};
