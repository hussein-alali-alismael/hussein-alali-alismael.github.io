import { useEffect, useState } from "react";
import { trpc } from "@/lib/trpc";
import { ArrowUpRight } from "lucide-react";

export default function ProjectsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const { data: projects } = trpc.portfolio.projects.useQuery();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById("projects");
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  return (
    <section
      id="projects"
      className={`py-20 bg-black transition-all duration-1000 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="container">
        <h2 className="text-4xl md:text-5xl font-bold mb-12">
          <span className="text-white">Featured</span>
          <span className="text-red-500"> Projects</span>
        </h2>

        <div className="space-y-8">
          {projects?.map((project, index) => (
            <div
              key={project.id}
              className={`group bg-white/5 border border-red-500/20 rounded-lg overflow-hidden hover:border-red-500/40 transition-all duration-300 ${
                isVisible ? "animate-fade-in-up" : ""
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="p-8">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {project.name}
                    </h3>
                    {project.subtitle && (
                      <p className="text-red-500 font-medium">{project.subtitle}</p>
                    )}
                  </div>
                  <ArrowUpRight className="text-red-500 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" size={24} />
                </div>

                <p className="text-white/70 leading-relaxed mb-6">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.technologies?.map((tech: string) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-red-500/10 border border-red-500/30 rounded-full text-white/80 text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-white/60 mb-4">
            Want to see more of my work?
          </p>
          <a
            href="https://github.com/hussein-alali-alismael"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition-colors"
          >
            Visit My GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
