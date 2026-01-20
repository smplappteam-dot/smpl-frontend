"use client";

import { useState, useRef, useEffect } from "react";
import { Project } from "@/lib/types/project.type";
import { useProjects } from "../hooks/use-projects";
import { CreateProjectModal } from "@/components/create-project-modal";

interface ProjectSelectorProps {
  selectedProjectId?: string;
  onSelect: (projectId: string) => void;
}

export function ProjectSelector({
  selectedProjectId,
  onSelect,
}: ProjectSelectorProps) {
  const { projects, isLoading } = useProjects();
  const [isOpen, setIsOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedProject = projects.find((p) => p.id === selectedProjectId);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    // Auto-select first project if none selected and projects exist
    // This mimics the behavior of a user likely wanting a default
    if (!selectedProjectId && projects.length > 0) {
      onSelect(projects[0].id);
    }
  }, [projects, selectedProjectId, onSelect]);

  if (isLoading) {
    return (
      <div className="h-8 w-32 bg-white/10 animate-pulse rounded-lg"></div>
    );
  }

  if (projects.length === 0) {
    return (
      <>
        <button
          type="button"
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium text-blue-600 bg-blue-50/50 hover:bg-blue-50 transition-colors border border-blue-100"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          Create Project
        </button>
        <CreateProjectModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
        />
      </>
    );
  }

  return (
    <>
      <div className="relative" ref={containerRef}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-white/20 transition-colors backdrop-blur-sm bg-white/10 border border-black/5 min-w-[140px] justify-between"
        >
          <div className="flex items-center gap-2 truncate">
            <div className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
            <span className="truncate max-w-[100px]">
              {selectedProject ? selectedProject.name : "Select Project"}
            </span>
          </div>
          <svg
            className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {isOpen && (
          <div className="absolute top-full mt-2 right-0 w-56 bg-white/80 backdrop-blur-xl rounded-xl shadow-xl border border-white/40 p-1 z-[100] animate-in fade-in zoom-in-95 duration-200 origin-top-right">
            <div className="max-h-[240px] overflow-y-auto custom-scrollbar">
              <div className="px-2 py-1.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Switch Project
              </div>
              {projects.map((project) => (
                <button
                  key={project.id}
                  type="button"
                  onClick={() => {
                    onSelect(project.id);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center gap-2 px-2 py-2 rounded-lg text-sm transition-colors ${
                    selectedProjectId === project.id
                      ? "bg-blue-50 text-blue-600 font-medium"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <div
                    className={`w-2 h-2 rounded-full shrink-0 ${
                      selectedProjectId === project.id
                        ? "bg-blue-500"
                        : "bg-gray-300"
                    }`}
                  />
                  <span className="truncate text-left">{project.name}</span>
                  {selectedProjectId === project.id && (
                    <svg
                      className="w-4 h-4 ml-auto"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </button>
              ))}
            </div>

            <div className="h-px bg-gray-100 my-1" />

            <button
              type="button"
              onClick={() => {
                setIsCreateModalOpen(true);
                setIsOpen(false);
              }}
              className="w-full flex items-center gap-2 px-2 py-2 rounded-lg text-sm text-blue-600 hover:bg-blue-50 transition-colors font-medium"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Create New Project
            </button>
          </div>
        )}
      </div>
      <CreateProjectModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </>
  );
}
