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
  const isPremiumOrPro = !isBasic && !isStandard;

  return (
    <div
      className={`relative rounded-2xl p-8 border hover:shadow-xl transition-all duration-300 flex flex-col h-full overflow-hidden group ${
        isPremiumOrPro
          ? "border-blue-200 hover:border-blue-300 bg-white"
          : "border-gray-100 hover:border-gray-200 bg-white"
      }`}
    >
      {isPremiumOrPro && (
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500" />
      )}

      <div className="mb-6 relative">
        <h3
          className={`font-extrabold mb-2 transition-all duration-300 text-2xl ${
            isPremiumOrPro
              ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
              : isStandard
              ? "text-blue-600"
              : "text-gray-900"
          }`}
        >
          {plan.name}
        </h3>
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-bold text-gray-900">
            {plan.priceAmount}
            {plan.currency}
          </span>
          <span className="text-gray-500 text-sm">
            /{plan.billingPeriod === "MONTHLY" ? "mo" : "yr"}
          </span>
        </div>
      </div>

      <div className="flex-grow space-y-4 mb-8">
        <div className="flex items-start gap-3 text-gray-600">
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
        className="w-full py-3 px-6 rounded-xl bg-black text-white font-medium hover:bg-gray-800 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
