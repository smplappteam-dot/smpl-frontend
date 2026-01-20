"use client";
import { PromptInput } from "@/features/ai-media/components/prompt-input";
import { GalleryGrid } from "@/components/gallery-grid";
import { useLatestGenerations } from "@/features/projects/hooks/use-latest-generations";
import Image from "next/image";
export default function WorkspacePage() {
  const { latestGenerations } = useLatestGenerations();

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-12">
      <section className="w-1/2 flex items-center fixed bottom-10 z-10">
        <PromptInput />
      </section>
      {/* Shopify Section */}

      <h1 className="text-black text-2xl font-bold ">Latest Generations</h1>
      <section className="pt-8 border-t border-gray-200">
        <GalleryGrid media={latestGenerations} />
      </section>

    </div>
  );
}
