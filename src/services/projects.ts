
import { Project } from "@/types/project";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const projectsDirectory = path.join(process.cwd(), "src", "projects");

export const getSortedProjectsData = () => {
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
        imageUrl: string;
        projectUrl: string;
        tags: string[];
      }),
    };
  });

  return allProjectsData;
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
  };

  return projectData;
};
