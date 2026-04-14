import { Mail, Linkedin, Github, Phone, MapPin, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const CV_URL = "/assets/Hussein_Alali_Alismael_CV.pdf";

export default function AboutSection() {
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

    const element = document.getElementById("about");
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  return (
    <section
      id="about"
      className={`py-20 bg-black transition-all duration-1000 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="container">
        <h2 className="text-4xl md:text-5xl font-bold mb-12">
          <span className="text-white">About</span>
          <span className="text-red-500"> Me</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Main Content */}
          <div className="space-y-6">
            <p className="text-white/80 text-lg leading-relaxed">
              I'm a highly motivated 4th-year Informatics Engineering student specializing in Artificial Intelligence, with a strong focus on Backend Development and Scalable APIs. I'm proficient in building robust server-side logic using Django REST Framework and integrating Neural Networks into functional systems.
            </p>

            <p className="text-white/80 text-lg leading-relaxed">
              I have hands-on experience with hardware-software integration using Raspberry Pi and I'm passionate about solving complex engineering problems through optimized code and logical design.
            </p>

            <div className="pt-6">
              <h3 className="text-xl font-semibold text-white mb-4">Soft Skills</h3>
              <ul className="space-y-3">
                <li className="flex gap-3">
                  <span className="text-red-500 font-bold">•</span>
                  <div>
                    <p className="text-white font-medium">Analytical Thinking</p>
                    <p className="text-white/60 text-sm">Expert at breaking down complex requirements into manageable technical tasks</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-red-500 font-bold">•</span>
                  <div>
                    <p className="text-white font-medium">Problem Solving</p>
                    <p className="text-white/60 text-sm">Strong ability to debug complex logic and optimize system-wide performance</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-red-500 font-bold">•</span>
                  <div>
                    <p className="text-white font-medium">Continuous Learning</p>
                    <p className="text-white/60 text-sm">Proactively staying updated with the latest trends in AI and backend architectures</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-white/5 border border-red-500/20 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-white mb-6">Get In Touch</h3>

              <div className="space-y-4">
                <a
                  href="mailto:husseinalalialismael@gmail.com"
                  className="flex items-center gap-4 p-3 rounded-lg hover:bg-red-500/10 transition-colors group"
                >
                  <Mail className="text-red-500 group-hover:scale-110 transition-transform" size={24} />
                  <div>
                    <p className="text-white/60 text-sm">Email</p>
                    <p className="text-white font-medium">husseinalalialismael@gmail.com</p>
                  </div>
                </a>

                <a
                  href="tel:+963939866304"
                  className="flex items-center gap-4 p-3 rounded-lg hover:bg-red-500/10 transition-colors group"
                >
                  <Phone className="text-red-500 group-hover:scale-110 transition-transform" size={24} />
                  <div>
                    <p className="text-white/60 text-sm">Phone</p>
                    <p className="text-white font-medium">+963 939 866 304</p>
                  </div>
                </a>

                <div className="flex items-center gap-4 p-3 rounded-lg">
                  <MapPin className="text-red-500" size={24} />
                  <div>
                    <p className="text-white/60 text-sm">Location</p>
                    <p className="text-white font-medium">Aleppo, Syria</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-white/10 space-y-3">
                <a
                  href={CV_URL}
                  download="Hussein_Alali_Alismael_CV.pdf"
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition-colors"
                >
                  <Download size={18} />
                  Download CV
                </a>
                
                <div className="flex gap-3">
                  <a
                    href="https://linkedin.com/in/hussein-alali-alismael10"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1"
                  >
                    <Button className="w-full bg-red-500 hover:bg-red-600 text-white">
                      <Linkedin size={18} className="mr-2" />
                      LinkedIn
                    </Button>
                  </a>
                  <a
                    href="https://github.com/hussein-alali-alismael"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1"
                  >
                    <Button className="w-full bg-red-500 hover:bg-red-600 text-white">
                      <Github size={18} className="mr-2" />
                      GitHub
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
