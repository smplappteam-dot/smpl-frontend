import { ImageAspectRatio,VideoAspectRatio, MediaType, ImageResolution, VideoResolution } from "@/features/media/types/media";

export interface GenerateMediaRequest {
  prompt: string;
  mediaType: MediaType;
  projectId: string;
  referenceImages?: File[];
  resolution?: ImageResolution | VideoResolution;
  aspectRatio?: ImageAspectRatio | VideoAspectRatio;
}
export interface CalculateMediaCostRequest{
    resolution: ImageResolution | VideoResolution;
    mediaType: MediaType;
}
export interface CalculateMediaCostResponse{
    creditsCost: number;
}