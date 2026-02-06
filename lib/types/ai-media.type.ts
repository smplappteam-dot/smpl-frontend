export type MediaType = "IMAGE" | "VIDEO";
export type Resolution = "1K" | "2K" | "4K";
export type AspectRatio = "16:9" | "4:3" | "1:1" | "3:4" | "9:16" | "5:4";

export interface GenerateMediaRequest {
  prompt: string;
  mediaType: MediaType;
  projectId: string;
  referenceImages?: File[];
  resolution?: Resolution;
  aspectRatio?: AspectRatio;
}
