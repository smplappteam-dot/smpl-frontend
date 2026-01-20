import { apiFetch } from "@/lib/api/client";

export const paymentsService = {
  async createCheckoutSession(
    subscriptionPlanId: string
  ): Promise<{ checkoutUrl: string }> {
    return await apiFetch("payments/checkout-session", {
      method: "POST",
      body: JSON.stringify({ subscriptionPlanId }),
    });
  },
};
