"use client";

import React, { useState } from "react";
import { Project } from "@/types/project";
import ProjectCard from "@/app/project/_components/ProjectCard";

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
      <div className="divide-y divide-gray-200 border-y border-gray-200 dark:divide-gray-700 dark:border-gray-700">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>

      {hasMore && (
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={handleLoadMore}
            disabled={loading}
            className="text-sm font-semibold text-gray-600 transition-colors hover:text-orange-600 disabled:cursor-not-allowed disabled:opacity-60 dark:text-gray-400 dark:hover:text-orange-400"
          >
            {loading ? "로딩 중..." : "더보기"}
          </button>
        </div>
      )}
    </>
  );
};

export default ProjectList;
