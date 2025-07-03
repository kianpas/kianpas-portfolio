import { getAllProjectIds, getProjectData } from "@/services/projects";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";

type ProjectPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params;
  const project = await getProjectData(id);

  if (!project) {
    notFound();
  }

  const { title, contentHtml, imageUrl, projectUrl, tags } = project;

  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="aspect-video relative overflow-hidden rounded-lg mb-8">
          <Image
            src={imageUrl}
            alt={`${title} 이미지`}
            fill
            className="object-cover"
          />
        </div>

        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-300"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl">
            {title}
          </h1>

          <div
            className="prose max-w-none dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />

          {projectUrl && (
            <div className="flex">
              <Link
                href={projectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-x-2 rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
              >
                <FaGithub className="h-5 w-5" />
                <span>GitHub에서 보기</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const projects = getAllProjectIds();
  return projects.map((project) => ({
    id: project.params.id,
  }));
}
