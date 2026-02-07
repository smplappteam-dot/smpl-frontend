"use client";
import { useEffect } from "react";
import { useProjectsQuery } from "../../queries/media";
import { useImageGenerationStore } from "@/stores/useImageGenerationStore";
import { Button } from "@/components/ui/button";
import { Menu, MenuItem } from "@/components/menu";
import { useAuthStore } from "@/stores/useAuthStore";

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
  const { projectId, setProjectId } = useImageGenerationStore();
  const { isAuthenticated } = useAuthStore();
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
      <div className="flex items-center justify-between  xs:flex-row flex-col ">
        <div className="flex items-center xs:w-auto w-full justify-start xs:gap-2 xs:order-1 order-2">
          {children}
        </div>
        <div className="flex items-center xs:w-auto w-full justify-between xs:justify-start xs:gap-2 xs:order-2 order-1">
          {isAuthenticated && (
            <Menu
              trigger={
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium text-white hover:bg-white/20 transition-colors backdrop-blur-sm bg-white/10 border border-white/20">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-5"
                  >
                    <path d="M19.5 21a3 3 0 0 0 3-3v-4.5a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3V18a3 3 0 0 0 3 3h15ZM1.5 10.146V6a3 3 0 0 1 3-3h5.379a2.25 2.25 0 0 1 1.59.659l2.122 2.121c.14.141.331.22.53.22H19.5a3 3 0 0 1 3 3v1.146A4.483 4.483 0 0 0 19.5 9h-15a4.483 4.483 0 0 0-3 1.146Z" />
                  </svg>

                  {projects.find((project) => project.id === projectId)?.name}
                </div>
              }
              direction="up"
            >
              <MenuItem className="hover:bg-transparent">
                <div className="gap-1 h-full max-h-100 w-full overflow-y-auto flex flex-col">
                  {projects.map((project) => (
                    <button
                      className="w-full text-left hover:bg-background-lighter p-3"
                      key={project.id}
                      onClick={() => setProjectId(project.id)}
                    >
                      {project.name}
                    </button>
                  ))}
                </div>
              </MenuItem>
            </Menu>
          )}
          <Button
            type="button"
            variant={"primary"}
            className="text-sm p-3"
            onClick={onGeneration}
            disabled={disabled}
          >
            {isGenerating ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <div className="flex flex-row items-center gap-1">
                  <div>Create</div>
                  <div className="text-sm text-white/50">|</div>
                  <div className="flex flex-row items-center opacity-50 ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-4"
                    >
                      <path
                        fillRule="evenodd"
                        d="M14.615 1.595a.75.75 0 0 1 .359.852L12.982 9.75h7.268a.75.75 0 0 1 .548 1.262l-10.5 11.25a.75.75 0 0 1-1.272-.71l1.992-7.302H3.75a.75.75 0 0 1-.548-1.262l10.5-11.25a.75.75 0 0 1 .913-.143Z"
                        clipRule="evenodd"
                      />
                    </svg>

                    {creditsCost ?? 0}
                  </div>
                </div>
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
