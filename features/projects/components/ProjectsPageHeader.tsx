"use client";
import { CreateProjectModal } from "@/components/create-project-modal";
import { Button } from "@/components/ui/button";

import { useState } from "react";

export default function ProjectsPageHeader() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  return (
    <>
      <CreateProjectModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-primary-foreground">
            Projects
          </h1>
          <p className="text-gray-500 mt-1">
            Manage and organize your creative work
          </p>
        </div>
        <Button onClick={() => setIsCreateModalOpen(true)}>
          Create Project
        </Button>
      </div>
    </>
  );
}
