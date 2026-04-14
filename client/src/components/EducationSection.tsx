import { useEffect, useState } from "react";
import { BookOpen, Award } from "lucide-react";

export default function EducationSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById("education");
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  return (
    <section
      id="education"
      className={`py-20 bg-black transition-all duration-1000 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="container">
        <h2 className="text-4xl md:text-5xl font-bold mb-12">
          <span className="text-white">Education &</span>
          <span className="text-red-500"> Certifications</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Degree */}
          <div className="bg-white/5 border border-red-500/20 rounded-lg p-8 hover:border-red-500/40 transition-all duration-300">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <BookOpen className="text-red-500" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">
                  Bachelor of Informatics Engineering
                </h3>
                <p className="text-red-500 font-medium">Specialization in AI</p>
              </div>
            </div>

            <p className="text-white/70 mb-4">
              Aleppo University, Syria
            </p>
            <p className="text-white/60 text-sm mb-4">
              2022 – Present
            </p>

            <div className="pt-4 border-t border-white/10">
              <p className="text-white/60 text-sm font-medium mb-3">Relevant Coursework:</p>
              <div className="flex flex-wrap gap-2">
                {[
                  "Machine Learning",
                  "Deep Learning",
                  "Database Systems",
                  "Algorithm Analysis",
                  "Robotics",
                  "Data Structures"
                ].map((course) => (
                  <span
                    key={course}
                    className="px-3 py-1 bg-red-500/10 border border-red-500/30 rounded-full text-white/70 text-xs"
                  >
                    {course}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div className="space-y-4">
            {[
              {
                name: "Artificial Neural Networks",
                issuer: "projects.sy",
                hours: "40 hours"
              },
              {
                name: "Python Programming Language",
                issuer: "Midad Organization",
                hours: "35 hours"
              },
              {
                name: "Machine Learning",
                issuer: "Midad Organization",
                hours: "30 hours"
              }
            ].map((cert, index) => (
              <div
                key={index}
                className="bg-white/5 border border-red-500/20 rounded-lg p-6 hover:border-red-500/40 transition-all duration-300"
              >
                <div className="flex items-start gap-3 mb-2">
                  <Award className="text-red-500 flex-shrink-0 mt-1" size={20} />
                  <div className="flex-1">
                    <h4 className="text-white font-bold">{cert.name}</h4>
                    <p className="text-white/60 text-sm">{cert.issuer}</p>
                    <p className="text-red-500/70 text-xs mt-1">{cert.hours}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
