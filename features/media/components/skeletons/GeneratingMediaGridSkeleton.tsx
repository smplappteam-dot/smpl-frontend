import { Media } from "@/features/media/types/media";
import { MediaCard } from "@/features/media/components/MediaCard";
import GeneratingMediaCardSkeleton from "@/features/media/components/skeletons/GeneratingMediaCardSkeleton";

export default function GeneratingMediaGridSkeleton({
  media,
  status,
}: {
  media: Media[];
  status?: string;
}) {
  return (
    <div className=" p-4 space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <GeneratingMediaCardSkeleton status={status} />
        {media.map((item) => (
          <MediaCard key={item.id} media={item} width={200} height={200} />
        ))}
      </div>
    </div>
  );
}
