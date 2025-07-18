"use client";

import React, { useState } from "react";
import { Project } from "@/types/project";
import ProjectCard from "@/app/project/components/ProjectCard";

interface ProjectListProps {
  initialProjects: Project[];
  totalPage: number;
  projectType: 'professional' | 'personal' | 'all';
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
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </ul>
      {hasMore && (
        <div className="flex justify-center py-8">
          <button
            onClick={handleLoadMore}
            disabled={loading}
            className="rounded-lg bg-blue-600 px-6 py-3 text-base font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
          >
            {loading ? "로딩 중.." : "더보기"}
          </button>
        </div>
      )}
    </>
  );
};

export default ProjectList;
