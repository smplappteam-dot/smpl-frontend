export default function MediaCardSkeleton() {
  return (
    <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-200 animate-pulse">
      {/* Overlay placeholder */}
      <div className="absolute inset-0 bg-gray-300/40" />
      {/* Button placeholder */}
      <div className="absolute bottom-4 left-4 right-4 opacity-100 transform translate-y-0">
        <div className="flex items-center justify-end">
          <div className="w-6 h-6 bg-gray-300 rounded-lg" />
        </div>
      </div>
    </div>
  );
}
