"use client";
import { useEffect, useState } from "react";
import { Project } from "@/features/projects/types/project";
import { MediaGrid } from "@/features/media/components/MediaGrid";
import {
  useMediaQuery,
  useProjectsQuery,
} from "@/features//media/queries/media";
import { MediaGridSkeleton } from "@/features/media/components/skeletons/MediaGridSkeleton";
import MediaHeader from "@/features/media/components/MediaHeader";
import PromptComposer from "@/features/media/components/prompt/PromptComposer";
import { GenerateMediaRequest } from "@/features/media/types/api";
import { useMediaGenerationMutation } from "@/features/media/queries/media";
import GeneratingMediaGridSkeleton from "@/features/media/components/skeletons/GeneratingMediaGridSkeleton";

export function MediaFeature() {
  const { data: projects = [], isLoading } = useProjectsQuery();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const {
    data: media = [],
    isFetching: isMediaFetching,
    isFetched: isMediaFetched,
  } = useMediaQuery(selectedProject?.id);
  useEffect(() => {
    if (!selectedProject && projects.length) {
      setSelectedProject(projects.find((p) => p.isMain) ?? projects[0]);
    }
  }, [projects, selectedProject]);
  const mediaGeneration = useMediaGenerationMutation(selectedProject?.id ?? "");
  const onGeneration = (request: GenerateMediaRequest) => {
    const data = mediaGeneration.mutateAsync(request);
  };

  return (
    <>
      {/* {selectedProject && (
        <section className="w-1/2 flex items-center fixed bottom-10 z-10">
            <PromptComposer
          />
          <PromptComposer
            projectId={selectedProject.id}
            onGeneration={onGeneration}
            isGenerating={mediaGeneration.isPending}
          />
        </section>
      )} */}
      <section className="bg-black/50 backdrop-blur-xl">
        <MediaHeader
          project={selectedProject}
          onSelect={setSelectedProject}
          projects={projects}
        />
        <section>
          {/* Show skeleton only on first fetch */}
          {!isMediaFetched || isMediaFetching ? (
            <MediaGridSkeleton />
          ) : mediaGeneration.isPending ? (
            <GeneratingMediaGridSkeleton media={media} />
          ) : (
            <MediaGrid media={media} />
          )}
        </section>
      </section>
    </>
  );
}
