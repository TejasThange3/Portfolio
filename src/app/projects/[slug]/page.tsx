import { DATA } from "@/lib/data";
import Link from "next/link";
import { ArrowLeft, Github, Globe } from "lucide-react";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return DATA.projects.map((project) => ({
    slug: project.slug,
  }));
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = DATA.projects.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <Link
        href="/"
        className="inline-flex items-center text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-white mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Home
      </Link>

      <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
      
      <div className="flex gap-2 mb-8">
        {project.tech.map((t) => (
          <span
            key={t}
            className="px-3 py-1 text-sm rounded-full bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700"
          >
            {t}
          </span>
        ))}
      </div>

      <div className="prose dark:prose-invert max-w-none mb-12">
        <p className="text-lg text-neutral-600 dark:text-neutral-300">
          {project.description}
        </p>
        
        {/* Placeholder for detailed content */}
        <div className="my-8 p-6 bg-neutral-50 dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800">
          <h3 className="text-xl font-semibold mb-4">Problem</h3>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          
          <h3 className="text-xl font-semibold mb-4">Solution</h3>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat.
          </p>

          <h3 className="text-xl font-semibold mb-4">Impact</h3>
          <p className="text-neutral-600 dark:text-neutral-400">
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur.
          </p>
        </div>
      </div>

      <div className="flex gap-4">
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 bg-neutral-900 dark:bg-white text-white dark:text-black rounded-full font-medium hover:opacity-90 transition-opacity"
          >
            <Globe className="w-4 h-4" />
            Live Demo
          </a>
        )}
        {project.repo && (
          <a
            href={project.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white rounded-full font-medium hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
          >
            <Github className="w-4 h-4" />
            View Source
          </a>
        )}
      </div>
    </div>
  );
}
