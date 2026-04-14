import { useEffect, useState } from "react";
import { trpc } from "@/lib/trpc";

interface SkillCategory {
  title: string;
  key: string;
  color: string;
}

const skillCategories: SkillCategory[] = [
  { title: "Backend Development", key: "backend", color: "from-red-500 to-red-600" },
  { title: "AI & Machine Learning", key: "ai_ml", color: "from-red-600 to-red-700" },
  { title: "Database Management", key: "database", color: "from-red-500 to-orange-600" },
  { title: "Embedded Systems", key: "embedded", color: "from-orange-600 to-red-600" },
  { title: "Tools & Environment", key: "tools", color: "from-red-700 to-red-800" },
];

export default function SkillsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const { data: skillsData } = trpc.portfolio.skills.useQuery();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById("skills");
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  return (
    <section
      id="skills"
      className={`py-20 bg-black transition-all duration-1000 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="container">
        <h2 className="text-4xl md:text-5xl font-bold mb-12">
          <span className="text-white">Technical</span>
          <span className="text-red-500"> Skills</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillCategories.map((category) => {
            const skills = skillsData?.[category.key] || [];
            return (
              <div
                key={category.key}
                className="bg-white/5 border border-red-500/20 rounded-lg p-6 hover:border-red-500/40 transition-all duration-300"
              >
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${category.color}`}></div>
                  {category.title}
                </h3>

                <div className="flex flex-wrap gap-2">
                  {skills.map((skill: string) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-red-500/10 border border-red-500/30 rounded-full text-white/80 text-sm hover:bg-red-500/20 hover:border-red-500/50 transition-all duration-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Skills Overview */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/5 border border-red-500/20 rounded-lg p-6 text-center">
            <div className="text-4xl font-bold text-red-500 mb-2">3+</div>
            <p className="text-white/60">Years of Experience</p>
          </div>
          <div className="bg-white/5 border border-red-500/20 rounded-lg p-6 text-center">
            <div className="text-4xl font-bold text-red-500 mb-2">25+</div>
            <p className="text-white/60">Technical Skills</p>
          </div>
          <div className="bg-white/5 border border-red-500/20 rounded-lg p-6 text-center">
            <div className="text-4xl font-bold text-red-500 mb-2">5+</div>
            <p className="text-white/60">Major Projects</p>
          </div>
        </div>
      </div>
    </section>
  );
}
