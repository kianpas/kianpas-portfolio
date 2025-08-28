"use client";

import React, { useState } from "react";
import { Project } from "@/types/project";
import ProjectCard from "@/app/project/_components/ProjectCard";
import { Button } from "@/components/ui";

interface ProjectListProps {
  initialProjects: Project[];
  totalPage: number;
  projectType: "professional" | "personal" | "all";
}

const ProjectList = ({ initialProjects, totalPage }: ProjectListProps) => {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(page < totalPage);

  const handleLoadMore = async () => {
    if (loading || page >= totalPage) return;

    setLoading(true);
    const nextPage = page + 1;
    const res = await fetch(`/api/projects?page=${nextPage}`);

    if (!res.ok) {
      setLoading(false);
      return;
    }

    const data = await res.json();
    setProjects((prev) => [...prev, ...data.projects]);
    setPage(nextPage);
    setHasMore(data.hasMore);
    setLoading(false);
  };
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center">
          <Button
            variant="primary"
            size="lg"
            onClick={handleLoadMore}
            disabled={loading}
            loading={loading}
          >
            {loading ? "로딩 중..." : "더보기"}
          </Button>
        </div>
      )}
    </>
  );
};

export default ProjectList;
