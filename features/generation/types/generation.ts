import { MediaType } from "@/features/media/types/media";

export interface GenerationQueue {
  id: string;
  jobId: string;
  prompt: string;
  type: MediaType;
  status: 'pending' | 'processing' | 'success' | 'failure';
  resultUrl: string;
  createdAt: Date;
  updatedAt: Date;
}