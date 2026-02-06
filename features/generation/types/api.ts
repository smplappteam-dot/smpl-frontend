import { ImageResolution, VideoResolution, ImageAspectRatio, VideoAspectRatio, VideoDuration } from "@/features/media/types/media";

export interface GenerateImageRequest {
  prompt: string;
  projectId: string;
  referenceImages?: File[];
  resolution?: ImageResolution;
  aspectRatio?: ImageAspectRatio;
}
export interface GenerateVideoRequest{
  prompt: string;
  projectId: string;
  referenceImages?: File[];
  durationSeconds: VideoDuration;
  resolution?: VideoResolution;
  aspectRatio?: VideoAspectRatio;
}