import { fetchGenerationQueues } from "../api/generation";
import { useQuery } from "@tanstack/react-query";

export const useGenerationQueuesQuery = () => {
  return useQuery({
    queryKey: ["generation-queues"],
    queryFn: () => fetchGenerationQueues(),
    refetchInterval: (query) => {
      const data = query.state.data;
      if (
        data?.some((item) => ["pending", "processing"].includes(item.status))
      ) {
        return 1000;
      }
      return false;
    },
  });
};
