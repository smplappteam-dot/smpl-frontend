import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { imageGeneration,videoGeneration } from "../api/generation";
import { GenerateImageRequest, GenerateVideoRequest } from "../types/api";

export function useImageGenerationMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: GenerateImageRequest) => imageGeneration(data),
    onSuccess: (data) => {
      console.log("success", data);
      queryClient.refetchQueries({
        queryKey: ["generation-queues"],
      });
      return data;
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
export function useVideoGenerationMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: GenerateVideoRequest) => videoGeneration(data),
    onSuccess: (data) => {
      console.log("success", data);
      queryClient.refetchQueries({
        queryKey: ["generation-queues"],
      });
      return data;
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
