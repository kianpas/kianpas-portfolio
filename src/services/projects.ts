import { Project } from "@/types/project";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const projectsDirectory = path.join(process.cwd(), "src", "projects");

export const getSortedProjectsData = (page: number = 1, limit: number = 6) => {
  const fileNames = fs.readdirSync(projectsDirectory);
  const allProjectsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, "");
    const fullPath = path.join(projectsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const matterResult = matter(fileContents);

    return {
      id,
      ...(matterResult.data as {
        title: string;
        description: string;
        date: string;
        imageUrl: string;
        projectUrl: string;
        tags: string[];
        type: "professional" | "personal";
      }),
    };
  });

  // 날짜별로 프로젝트 정렬 (최신순)
  const sortedProjects = allProjectsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });

  const totalProjects = sortedProjects.length;
  const totalPages = Math.ceil(totalProjects / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  return {
    projects: sortedProjects.slice(startIndex, endIndex),
    totalProjects,
    totalPages,
  };
};

export const getAllProjectIds = () => {
  const fileNames = fs.readdirSync(projectsDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });
};

export const getProjectData = async (id: string) => {
  const fullPath = path.join(projectsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const matterResult = matter(fileContents);

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  const projectData: Project & { contentHtml: string } = {
    id,
    contentHtml,
    title: matterResult.data.title,
    description: matterResult.data.description,
    imageUrl: matterResult.data.imageUrl,
    projectUrl: matterResult.data.projectUrl,
    tags: matterResult.data.tags,
    type: matterResult.data.type,
  };

  return projectData;
};

export const getProjectsByType = (
  type: "professional" | "personal" | "all",
  page: number = 1,
  limit: number = 6
) => {
  const allProjects = getSortedProjectsData().projects;

  //타입 필터링
  const filteredProjects =
    type === "all"
      ? allProjects
      : allProjects.filter((project) => project.type === type);

  const totalProjects = filteredProjects.length;
  const totalPages = Math.ceil(totalProjects / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  return {
    projects: filteredProjects.slice(startIndex, endIndex),
    totalProjects,
    totalPages,
  };
};
