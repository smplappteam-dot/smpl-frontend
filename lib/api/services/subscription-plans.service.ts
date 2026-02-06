import { apiFetch } from "@/lib/api/client";
import {
  SubscriptionPlan,
  billingPeriod,
} from "@/lib/types/subscription-plan.type";

export const subscriptionPlansService = {
  async getSubscriptionPlans(
    period: billingPeriod
  ): Promise<SubscriptionPlan[]> {
    const res = await fetch(`/api/subscription-plans?billingPeriod=${period}`, {
      method: "GET",
    });
    const json = await res.json();
    console.log(json)
    return json.data;
  },

  async createCheckout(
    subscriptionPlanId: string
  ): Promise<{ checkoutUrl: string }> {
    return await apiFetch("subscription-plans/checkout", {
      method: "POST",
      body: JSON.stringify({ subscriptionPlanId }),
    });
  },
};
