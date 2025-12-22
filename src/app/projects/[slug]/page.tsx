import { DATA } from "@/lib/data";
import Link from "next/link";
import { ArrowLeft, Github, Globe, CheckCircle2 } from "lucide-react";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return DATA.projects.map((project) => ({
    slug: project.slug,
  }));
}

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = DATA.projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="max-w-5xl mx-auto py-12 px-4">
      {/* Back Button */}
      <Link
        href="/"
        className="inline-flex items-center text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-white mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Home
      </Link>

      {/* Header Section */}
      <div className="mb-12">
        <h1 className="text-5xl font-bold mb-3 bg-gradient-to-r from-neutral-900 to-neutral-600 dark:from-white dark:to-neutral-400 bg-clip-text text-transparent">
          {project.title}
        </h1>
        <p className="text-xl text-neutral-600 dark:text-neutral-400 mb-6">
          {project.tagline}
        </p>
        
        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-8">
          {project.tech.map((t) => (
            <span
              key={t}
              className="px-4 py-2 text-sm font-medium rounded-full bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4">
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
              className="flex items-center gap-2 px-6 py-3 bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white rounded-full font-medium hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors border border-neutral-200 dark:border-neutral-700"
            >
              <Github className="w-4 h-4" />
              View Source
            </a>
          )}
        </div>
      </div>

      {/* Case Study Content */}
      {project.caseStudy && (
        <div className="space-y-16">
          {/* Problem Section */}
          <section>
            <div className="inline-block px-4 py-1 mb-4 text-sm font-semibold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 rounded-full border border-red-200 dark:border-red-800">
              Challenge
            </div>
            <h2 className="text-3xl font-bold mb-4">{project.caseStudy.problem.title}</h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed">
              {project.caseStudy.problem.description}
            </p>
          </section>

          {/* Solution Section */}
          <section>
            <div className="inline-block px-4 py-1 mb-4 text-sm font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 rounded-full border border-blue-200 dark:border-blue-800">
              Approach
            </div>
            <h2 className="text-3xl font-bold mb-4">{project.caseStudy.solution.title}</h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed mb-6">
              {project.caseStudy.solution.description}
            </p>
            
            {/* Features List */}
            {project.caseStudy.solution.features && (
              <div className="grid md:grid-cols-2 gap-4 mt-6">
                {project.caseStudy.solution.features.map((feature, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-4 bg-neutral-50 dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800"
                  >
                    <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-neutral-700 dark:text-neutral-300">{feature}</span>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Impact Section */}
          <section>
            <div className="inline-block px-4 py-1 mb-4 text-sm font-semibold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 rounded-full border border-green-200 dark:border-green-800">
              Results
            </div>
            <h2 className="text-3xl font-bold mb-4">{project.caseStudy.impact.title}</h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed mb-8">
              {project.caseStudy.impact.description}
            </p>

            {/* Stats Grid */}
            {project.caseStudy.impact.stats && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {project.caseStudy.impact.stats.map((stat, idx) => (
                  <div
                    key={idx}
                    className="p-6 bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700 text-center"
                  >
                    <div className="text-3xl font-bold text-neutral-900 dark:text-white mb-2">
                      {stat.value}
                    </div>
                    <div className="text-sm text-neutral-600 dark:text-neutral-400">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      )}
    </div>
  );
}
