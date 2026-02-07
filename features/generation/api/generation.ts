import { CalculateMediaCostRequest, CalculateMediaCostResponse } from "@/features/media/types/api";
import { GenerateImageRequest, GenerateVideoRequest } from "../types/api";
import { GenerationQueue } from "../types/generation";
export async function fetchGenerationCost(
  data: CalculateMediaCostRequest,
): Promise<CalculateMediaCostResponse> {
  const { resolution,mediaType } = data;
  const res = await fetch("/api/ai-media/calculate-cost", {
    method: "POST",
    body: JSON.stringify({ resolution,mediaType }),
  });
  const json = await res.json();
  console.log(json.data);
  return json.data as CalculateMediaCostResponse;
}
export async function fetchGenerationQueues(
): Promise<GenerationQueue[] | []> {
  // if (!projectId) return [];
  const res = await fetch(
    `/api/media/me/queues`,
  );
  const json = await res.json();
  return json.data;
}
export async function videoGeneration(data: GenerateVideoRequest) {
  const formData = new FormData();
  formData.append("prompt", data.prompt);
  formData.append("projectId", data.projectId);
  formData.append("durationSeconds", data.durationSeconds.toString());
  if (data.resolution) formData.append("resolution", data.resolution);
  if (data.aspectRatio) formData.append("aspectRatio", data.aspectRatio);

  if (data.referenceImages) {
    data.referenceImages.forEach((file) => {
      formData.append("referenceImages", file);
    });
  }
  // await new Promise((resolve) => setTimeout(resolve, 5000));
  const res = await fetch("/api/ai-media/generate/video", {
    method: "POST",
    body: formData,
  });
  const json = await res.json();
  console.log(json);
  if (!json.success) {
      throw new Error(json.message)
    }
  return json.data;
  // return {
  //   url: "http://res.cloudinary.com/dxec2uvwm/image/upload/v1767416485/projects/694ecece580530ed4e35bb0c/yvvvx0vl9dxmlvabe1e2.png",
  // };
}
export async function imageGeneration(data: GenerateImageRequest) {
  const formData = new FormData();
  formData.append("prompt", data.prompt);
  formData.append("projectId", data.projectId);
  if (data.resolution) formData.append("resolution", data.resolution);
  if (data.aspectRatio) formData.append("aspectRatio", data.aspectRatio);

  if (data.referenceImages) {
    data.referenceImages.forEach((file) => {
      formData.append("referenceImages", file);
    });
  }
  // await new Promise((resolve) => setTimeout(resolve, 5000));
  const res = await fetch("/api/ai-media/generate/image", {
    method: "POST",
    body: formData,
  });
  const json = await res.json();
  console.log(json);
  if (!json.success) {
      throw new Error(json.message)
    }
  return json.data;
  // return {
  //   url: "http://res.cloudinary.com/dxec2uvwm/image/upload/v1767416485/projects/694ecece580530ed4e35bb0c/yvvvx0vl9dxmlvabe1e2.png",
  // };
}