import { Media } from "@/features/media/types/media";

export type Project = {
  id: string;
  name: string;
  isMain: boolean;
  createdAt: string;
  updatedAt: string;
}
export type ProjectStats = {
  totalVideos: number;
  totalImages: number;
};

export type ProjectWithStats = Project & {
  stats: ProjectStats;
};

export type ProjectWithMedia = Project & {
  media: Media[];
};

export type ProjectWithStatsAndMedia = Project & ProjectStats & {
  media: Media[];
};
