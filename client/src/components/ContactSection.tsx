import { useEffect, useState } from "react";
import { Mail, Linkedin, Github, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ContactSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById("contact");
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Create mailto link
    const mailtoLink = `mailto:husseinalalialismael@gmail.com?subject=Message from ${encodeURIComponent(formData.name)}&body=${encodeURIComponent(formData.message)}%0D%0A%0D%0AFrom: ${encodeURIComponent(formData.email)}`;
    window.location.href = mailtoLink;
  };

  return (
    <section
      id="contact"
      className={`py-20 bg-black transition-all duration-1000 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="container">
        <h2 className="text-4xl md:text-5xl font-bold mb-12">
          <span className="text-white">Let's Work</span>
          <span className="text-red-500"> Together</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <p className="text-white/70 text-lg">
              I'm always interested in hearing about new projects and opportunities. Whether you have a question or just want to say hi, feel free to reach out!
            </p>

            <div className="space-y-4">
              <a
                href="mailto:husseinalalialismael@gmail.com"
                className="flex items-center gap-4 p-4 rounded-lg bg-white/5 border border-red-500/20 hover:border-red-500/40 hover:bg-red-500/10 transition-all duration-300 group"
              >
                <Mail className="text-red-500 group-hover:scale-110 transition-transform" size={24} />
                <div>
                  <p className="text-white/60 text-sm">Email</p>
                  <p className="text-white font-medium">husseinalalialismael@gmail.com</p>
                </div>
              </a>

              <a
                href="https://linkedin.com/in/hussein-alali-alismael10"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-lg bg-white/5 border border-red-500/20 hover:border-red-500/40 hover:bg-red-500/10 transition-all duration-300 group"
              >
                <Linkedin className="text-red-500 group-hover:scale-110 transition-transform" size={24} />
                <div>
                  <p className="text-white/60 text-sm">LinkedIn</p>
                  <p className="text-white font-medium">Hussein Alali Alismael</p>
                </div>
              </a>

              <a
                href="https://github.com/hussein-alali-alismael"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-lg bg-white/5 border border-red-500/20 hover:border-red-500/40 hover:bg-red-500/10 transition-all duration-300 group"
              >
                <Github className="text-red-500 group-hover:scale-110 transition-transform" size={24} />
                <div>
                  <p className="text-white/60 text-sm">GitHub</p>
                  <p className="text-white font-medium">hussein-alali-alismael</p>
                </div>
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white/5 border border-red-500/20 rounded-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-white font-medium mb-2">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full px-4 py-2 bg-black border border-white/20 rounded-lg text-white placeholder-white/40 focus:border-red-500 focus:outline-none transition-colors"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full px-4 py-2 bg-black border border-white/20 rounded-lg text-white placeholder-white/40 focus:border-red-500 focus:outline-none transition-colors"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Message</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={4}
                  className="w-full px-4 py-2 bg-black border border-white/20 rounded-lg text-white placeholder-white/40 focus:border-red-500 focus:outline-none transition-colors resize-none"
                  placeholder="Your message..."
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2"
              >
                <Send size={18} className="mr-2" />
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
