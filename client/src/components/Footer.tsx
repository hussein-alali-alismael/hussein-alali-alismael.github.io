import { Mail, Linkedin, Github, Phone, MapPin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-red-500/20 py-12">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold mb-2">
              <span className="text-white">Hussein Alali Alismael</span>
              <span className="text-red-500">.</span>
            </h3>
            <p className="text-white/60">
              AI Engineering & Backend Developer
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="text-white/60 hover:text-red-500 transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#projects" className="text-white/60 hover:text-red-500 transition-colors">
                  Projects
                </a>
              </li>
              <li>
                <a href="#skills" className="text-white/60 hover:text-red-500 transition-colors">
                  Skills
                </a>
              </li>
              <li>
                <a href="#contact" className="text-white/60 hover:text-red-500 transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <div className="space-y-3">
              <a
                href="mailto:husseinalalialismael@gmail.com"
                className="flex items-center gap-2 text-white/60 hover:text-red-500 transition-colors"
              >
                <Mail size={18} />
                <span className="text-sm">husseinalalialismael@gmail.com</span>
              </a>
              <a
                href="tel:+963939866304"
                className="flex items-center gap-2 text-white/60 hover:text-red-500 transition-colors"
              >
                <Phone size={18} />
                <span className="text-sm">+963 939 866 304</span>
              </a>
              <div className="flex items-center gap-2 text-white/60">
                <MapPin size={18} />
                <span className="text-sm">Aleppo, Syria</span>
              </div>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="border-t border-white/10 pt-8 flex items-center justify-between">
          <p className="text-white/50 text-sm">
            © {currentYear} Hussein Alali Alismael. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a
              href="https://linkedin.com/in/hussein-alali-alismael10"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-red-500 transition-colors"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="https://github.com/hussein-alali-alismael"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-red-500 transition-colors"
            >
              <Github size={20} />
            </a>
            <a
              href="mailto:husseinalalialismael@gmail.com"
              className="text-white/60 hover:text-red-500 transition-colors"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
