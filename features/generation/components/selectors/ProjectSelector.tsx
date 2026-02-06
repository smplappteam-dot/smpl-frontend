import { Project } from "@/lib/types/project.type";
import { ChevronDown } from "lucide-react";

interface ProjectSelectorProps {
  projects: Project[];
  selectedProjectId: string | null;
  onSelect: (projectId: string) => void;
  disabled?: boolean;
}

export default function ProjectSelector({
  projects,
  selectedProjectId,
  onSelect,
  disabled,
}: ProjectSelectorProps) {
  return (
    <div className="bg-background-lighter p-3 rounded-lg flex flex-col gap-1">
      <p className="text-neutral-400 font-medium">Project</p>
      <div className="relative">
        <select
          value={selectedProjectId || ""}
          onChange={(e) => onSelect(e.target.value)}
          disabled={disabled}
          className="w-full bg-neutral-900 border border-neutral-700 text-neutral-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 appearance-none cursor-pointer hover:bg-neutral-850 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <option value="" disabled>
            Select a project
          </option>
          {projects.map((project) => (
            <option key={project.id} value={project.id}>
              {project.name}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-2.5 top-3 w-4 h-4 text-neutral-400 pointer-events-none" />
      </div>
    </div>
  );
}
