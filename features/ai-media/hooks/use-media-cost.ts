import { useState, useEffect } from "react";
import { aiMediaService } from "@/lib/api/services/ai-media.service";
import { Resolution } from "@/lib/types/ai-media.type";

export function useMediaCost(resolution: Resolution) {
  const [creditsCost, setCreditsCost] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function fetchCost() {
      setIsLoading(true);
      try {
        const { creditsCost } = await aiMediaService.calculateCost({
          resolution,
        });
        if (isMounted) {
          setCreditsCost(creditsCost);
        }
      } catch (error) {
        console.error("Failed to calculate media cost:", error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchCost();

    return () => {
      isMounted = false;
    };
  }, [resolution]);

  return { creditsCost, isLoading };
}
