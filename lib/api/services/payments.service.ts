import { apiFetch } from "@/lib/api/client";

export const paymentsService = {
  async createCheckoutSession(
    subscriptionPlanId: string
  ): Promise<{ checkoutUrl: string }> {
    const res = await fetch("/api/payments/checkout-session", {
      method: "POST",
      body: JSON.stringify({ subscriptionPlanId }),
    });
    const json = await res.json();
    console.log(json)
    return json.data;
  },
};
