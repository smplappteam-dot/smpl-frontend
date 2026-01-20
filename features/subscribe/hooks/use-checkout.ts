import { paymentsService } from "@/lib/api/services/payments.service";
import { useCallback, useState } from "react";

export function useCheckout() {
  const [isLoading, setIsLoading] = useState(false);

  const startCheckout = useCallback(async (planId: string) => {
    try {
      setIsLoading(true);
      const { checkoutUrl } = await paymentsService.createCheckoutSession(
        planId
      );

      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      }
    } catch (error) {
      console.error("Failed to start checkout:", error);
      throw error; // optionally rethrow for caller
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { startCheckout, isLoading };
}
