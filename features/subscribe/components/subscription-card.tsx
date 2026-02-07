"use client";

import { SubscriptionPlan } from "@/lib/types/subscription-plan.type";
import { subscriptionPlansService } from "@/lib/api/services/subscription-plans.service";
import { useState } from "react";
import { useCheckout } from "../hooks/use-checkout";

interface SubscriptionCardProps {
  plan: SubscriptionPlan;
}

export function SubscriptionCard({ plan }: SubscriptionCardProps) {
  const { startCheckout, isLoading } = useCheckout();

  const planName = plan.name.toLowerCase();
  const isBasic = planName.includes("basic");
  const isStandard = planName.includes("standard");
  const isPro = planName.includes("pro");
  const isPremium = planName.includes("premium");
  // const isPremiumOrPro = !isBasic && !isStandard;

  return (
    <div
      className={`relative rounded-2xl p-8 border hover:shadow-xl transition-all duration-300 flex flex-col h-full overflow-hidden group border-neutral-700/50 hover:bg-background-light bg-transparent`}
    >
      <div className="mb-6 relative">
        <h3 className="font-extrabold mb-2 transition-all duration-300 text-2xl text-primary-foreground">
          {plan.name}
        </h3>
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-bold text-primary-foreground">
            {plan.priceAmount}
            $
          </span>
          <span className="text-muted-foreground text-sm">
            /{plan.billingPeriod === "MONTHLY" ? "mo" : "yr"}
          </span>
        </div>
      </div>

      <div className="flex-grow space-y-4 mb-8">
        <div className="flex items-start gap-3 text-muted-foreground">
          <svg
            className="w-5 h-5 text-green-500 shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          <span>{plan.creditsPerMonth} Credits / Month</span>
        </div>
      </div>

      <button
        onClick={() => startCheckout(plan.id)}
        disabled={isLoading}
        className={`w-full py-3 px-6 rounded-xl font-medium transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-primary-foreground ${
          isPro
            ? "bg-gradient-secondary border-none"
            : isPremium
              ? "bg-gradient-primary border-none" : isBasic
              ? "hidden" : "bg-transparent border border-neutral-700 hover:bg-background-light"
        }`}
      >
        {isLoading ? (
          <>
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Processing...
          </>
        ) : (
          "Subscribe"
        )}
      </button>
    </div>
  );
}
