import ProjectSelector from "@/features/generation/components/selectors/ProjectSelector";
import { useEffect } from "react";
import { useProjectsQuery } from "../../queries/media";
import { useImageGenerationStore } from "@/stores/useImageGenerationStore";

interface PromptComposerFooterProps {
  children: React.ReactNode;
  onGeneration: () => void;
    disabled: boolean;
    isGenerating: boolean;
    creditsCost: number;
    isFocused: boolean;
}
export default function PromptComposerFooter({
  children,
    onGeneration,
    disabled,
    isGenerating,
    creditsCost,
    isFocused,
}: PromptComposerFooterProps) {
    const {
      resolution,
      aspectRatio,
      projectId,
      setResolution,
      setAspectRatio,
      setProjectId,
    } = useImageGenerationStore();
    const { data: projects = [] } = useProjectsQuery();
  
    useEffect(() => {
      if (!projectId && projects.length > 0) {
        setProjectId(projects[0].id);
      }
    }, [projects, projectId, setProjectId]);
  return (
      <div
          className={`z-50 transition-all duration-500 ease-in-out  ${
            isFocused ? "max-h-[100px] opacity-100 " : "max-h-0 opacity-0 "
          }`}
        >
    <div className="flex items-center justify-between  ">
        <div className="flex items-center gap-2">{children}</div>
        <div className="flex items-center gap-2">
          <ProjectSelector projects={projects} selectedProjectId={projectId} onSelect={setProjectId} />
          <button
        type="button"
        onClick={onGeneration}
        disabled={disabled}
        className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-primary to-tertiary text-white font-medium rounded-xl transition-all shadow-lg shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none backdrop-blur-sm"
      >
        {isGenerating ? (
          <>
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Generating...
          </>
        ) : (
          <>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
            Generate {creditsCost ?? 0}
          </>
        )}
      </button>
        </div>
          </div>
          </div>
  );
}
