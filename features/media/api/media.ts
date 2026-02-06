import { Project } from "@/features/projects/types/project";
import { Media, MediaType } from "@/features/media/types/media";
import {
  CalculateMediaCostRequest,
  CalculateMediaCostResponse,
  GenerateMediaRequest,
} from "@/features/media/types/api";

// lib/api/projects.ts
export async function fetchMyProjects(): Promise<Project[] | []> {
  const res = await fetch("/api/projects/me");
  const json = await res.json();
  return json.data;
}

export async function fetchMedia(
  projectId?: string,
  type?: MediaType,
): Promise<Media[] | []> {
  // if (!projectId) return [];
  const res = await fetch(
    `/api/media/me?projectId=${projectId ?? ""}&type=${type ?? ""}`,
  );
  const json = await res.json();
  return json.data;
}
export async function mediaGeneration(data: GenerateMediaRequest) {
  const formData = new FormData();
  formData.append("prompt", data.prompt);
  formData.append("mediaType", data.mediaType);
  formData.append("projectId", data.projectId);
  if (data.resolution) formData.append("resolution", data.resolution);
  if (data.aspectRatio) formData.append("aspectRatio", data.aspectRatio);

  if (data.referenceImages) {
    data.referenceImages.forEach((file) => {
      formData.append("referenceImages", file);
    });
  }
  // await new Promise((resolve) => setTimeout(resolve, 5000));
  const res = await fetch("/api/ai-media/generate", {
    method: "POST",
    body: formData,
  });
  const json = await res.json();
  console.log(json.data);
  return json.data;
  // return {
  //   url: "http://res.cloudinary.com/dxec2uvwm/image/upload/v1767416485/projects/694ecece580530ed4e35bb0c/yvvvx0vl9dxmlvabe1e2.png",
  // };
}
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
