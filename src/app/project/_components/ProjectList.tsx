"use client";

import { Project } from "@/types/project";
import ProjectCard from "@/app/project/_components/ProjectCard";
import LoadMoreButton from "@/components/LoadMoreButton";
import { useLoadMore } from "@/hooks/useLoadMore";

interface ProjectListProps {
  initialProjects: Project[];
  totalPage: number;
  projectType: "professional" | "personal" | "all";
}

const ProjectList = ({ initialProjects, totalPage }: ProjectListProps) => {
  const { items: projects, loading, hasMore, loadMore } = useLoadMore<Project>({
    initialItems: initialProjects,
    totalPage,
    fetchPage: async (page) => {
      const res = await fetch(`/api/projects?page=${page}`);
      if (!res.ok) throw new Error("failed to load projects");
      const data = await res.json();
      return { items: data.projects, hasMore: data.hasMore };
    },
  });

  return (
    <>
      <div className="divide-y divide-gray-200 border-y border-gray-200 dark:divide-gray-700 dark:border-gray-700">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>

      {hasMore && <LoadMoreButton onClick={loadMore} loading={loading} />}
    </>
  );
};

export default ProjectList;
