import MediaCardSkeleton from "./MediaCardSkeleton";

// MediaGridSkeleton.tsx
export function MediaGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="p-4 space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: count }).map((_, i) => (
          <MediaCardSkeleton />
        ))}
      </div>
    </div>
  );
}
