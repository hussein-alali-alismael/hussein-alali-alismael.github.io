import { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const BACKGROUND_IMAGE = "/assets/hero-background.jpg";
const OVERLAY_IMAGE = "/assets/hero-overlay.jpg";

type CursorPreset = "subtle" | "balanced" | "cinematic";

const CURSOR_PRESET_CONFIG: Record<
  CursorPreset,
  {
    baseRadius: number;
    maxBoost: number;
    glowOpacity: number;
    pulseAmp: number;
    glowScaleMax: number;
  }
> = {
  subtle: {
    baseRadius: 125,
    maxBoost: 45,
    glowOpacity: 0.35,
    pulseAmp: 0.04,
    glowScaleMax: 0.18,
  },
  balanced: {
    baseRadius: 170,
    maxBoost: 80,
    glowOpacity: 0.6,
    pulseAmp: 0.08,
    glowScaleMax: 0.3,
  },
  cinematic: {
    baseRadius: 220,
    maxBoost: 120,
    glowOpacity: 0.85,
    pulseAmp: 0.12,
    glowScaleMax: 0.45,
  },
};

export default function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [showMobileOverlay, setShowMobileOverlay] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [cursorPreset, setCursorPreset] = useState<CursorPreset>("balanced");
  const heroRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const mobileOverlayRef = useRef<HTMLImageElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useRef(false);
  const rafRef = useRef<number | null>(null);
  const pointerActiveRef = useRef(false);
  const targetPosRef = useRef({ x: 0, y: 0 });
  const currentPosRef = useRef({ x: 0, y: 0 });
  const velocityRef = useRef(0);
  const lastFrameRef = useRef(0);

  useEffect(() => {
    // Check for reduced motion preference
    prefersReducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    setIsLoaded(true);

    // Preload images
    const bgImg = new Image();
    const overlayImg = new Image();
    let loadedCount = 0;

    const handleImageLoad = () => {
      loadedCount++;
      if (loadedCount === 2) {
        setImagesLoaded(true);
      }
    };

    bgImg.onload = handleImageLoad;
    overlayImg.onload = handleImageLoad;
    bgImg.onerror = handleImageLoad; // Continue even if image fails
    overlayImg.onerror = handleImageLoad;

    bgImg.src = BACKGROUND_IMAGE;
    overlayImg.src = OVERLAY_IMAGE;
  }, []);

  useEffect(() => {
    if (!isMobile || !imagesLoaded) return;

    const timer = window.setTimeout(() => {
      setShowMobileOverlay(true);
    }, 700);

    return () => window.clearTimeout(timer);
  }, [isMobile, imagesLoaded]);

  useEffect(() => {
    if (prefersReducedMotion.current) return;
    const preset = CURSOR_PRESET_CONFIG[cursorPreset];
    const mobileScale = isMobile ? 0.6 : 1;

    const animate = (timestamp: number) => {
      const dt = Math.max(0.001, (timestamp - (lastFrameRef.current || timestamp)) / 16.67);
      lastFrameRef.current = timestamp;

      const current = currentPosRef.current;
      const target = targetPosRef.current;
      const lerp = pointerActiveRef.current ? 0.16 : 0.11;

      current.x += (target.x - current.x) * lerp * dt;
      current.y += (target.y - current.y) * lerp * dt;

      const dx = target.x - current.x;
      const dy = target.y - current.y;
      const dist = Math.hypot(dx, dy);
      velocityRef.current = velocityRef.current * 0.85 + dist * 0.15;

      const pulse = 1 + Math.sin(timestamp * 0.004) * preset.pulseAmp * mobileScale;
      const baseRadius = pointerActiveRef.current ? preset.baseRadius * mobileScale : 0;
      const radius = Math.max(0, (baseRadius + Math.min(preset.maxBoost * mobileScale, velocityRef.current * 1.8)) * pulse);

      const overlayElement = isMobile ? mobileOverlayRef.current : overlayRef.current;
      if (overlayElement) {
        overlayElement.style.clipPath = `circle(${radius}px at ${current.x}px ${current.y}px)`;
      }

      if (glowRef.current) {
        const glowSize = isMobile ? 150 : 240;
        glowRef.current.style.opacity = pointerActiveRef.current ? `${preset.glowOpacity}` : "0";
        glowRef.current.style.transform = `translate(${current.x - glowSize / 2}px, ${current.y - glowSize / 2}px) scale(${1 + Math.min(preset.glowScaleMax, velocityRef.current / 180)})`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      targetPosRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
      pointerActiveRef.current = true;
    };

    const handleMouseLeave = () => {
      pointerActiveRef.current = false;
      targetPosRef.current = {
        x: heroRef.current ? heroRef.current.clientWidth / 2 : 0,
        y: heroRef.current ? heroRef.current.clientHeight / 2 : 0,
      };
    };

    const heroElement = heroRef.current;
    if (!heroElement) return;

    const rect = heroElement.getBoundingClientRect();
    const center = { x: rect.width / 2, y: rect.height / 2 };
    targetPosRef.current = center;
    currentPosRef.current = center;

    heroElement.addEventListener("mousemove", handleMouseMove);
    heroElement.addEventListener("mouseleave", handleMouseLeave);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      heroElement.removeEventListener("mousemove", handleMouseMove);
      heroElement.removeEventListener("mouseleave", handleMouseLeave);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [isMobile, cursorPreset]);

  const scrollToNext = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const overlayClipPath = isMobile
    ? "circle(60% at 35% 40%)"
    : "circle(0px at 50% 50%)";

  const overlayPosition = isMobile ? "center top" : "center 12%";

  useEffect(() => {
    if (overlayRef.current && !isMobile) {
      overlayRef.current.style.clipPath = overlayClipPath;
      overlayRef.current.style.backgroundPosition = overlayPosition;
    }

    if (glowRef.current && !isMobile) {
      glowRef.current.classList.add("hero-cursor-glow");
    }
  }, [isMobile, overlayClipPath, overlayPosition]);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative bg-black md:min-h-screen overflow-hidden"
    >
      {isMobile ? (
        <div className="relative h-[45vh] w-full overflow-hidden bg-black md:hidden">
          <div className="grid h-full w-full place-items-center">
            <img
              src={BACKGROUND_IMAGE}
              alt="Hero background"
              className="col-start-1 row-start-1 block h-full w-full object-contain object-center"
            />
            {showMobileOverlay && (
              <img
                src={OVERLAY_IMAGE}
                alt="Hero overlay"
                ref={mobileOverlayRef}
                className="col-start-1 row-start-1 block h-full w-full object-contain object-center opacity-95 transition-opacity duration-500"
              />
            )}
            {!prefersReducedMotion.current && (
              <div
                ref={glowRef}
                className="col-start-1 row-start-1 h-36 w-36 rounded-full transition-opacity duration-300 hero-cursor-glow"
              />
            )}
            <div className="col-start-1 row-start-1 h-full w-full bg-black/10 pointer-events-none" />
          </div>
        </div>
      ) : (
        <>
          {/* Background Image */}
          <div className="absolute inset-0 hero-desktop-bg">
            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 bg-black/25"></div>
          </div>

          {/* Mouse-tracking Overlay Image - Hidden by default, revealed on mouse movement */}
          {imagesLoaded && !prefersReducedMotion.current && (
            <div
              ref={overlayRef}
              className="absolute inset-0 pointer-events-none transition-[clip-path] duration-100 hero-desktop-overlay"
            />
          )}

          {!isMobile && !prefersReducedMotion.current && (
            <div
              ref={glowRef}
              className="absolute pointer-events-none w-60 h-60 rounded-full transition-opacity duration-300 hero-cursor-glow"
            />
          )}
        </>
      )}

      {/* Animated background elements */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-red-500/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-red-500/5 rounded-full blur-3xl pointer-events-none"></div>

      {/* Cursor effect presets */}
      {!isMobile && !prefersReducedMotion.current && (
        <div className="absolute top-6 right-6 z-20 hidden md:flex items-center gap-2 bg-black/30 backdrop-blur-sm border border-white/20 rounded-full px-2 py-2">
          {(["subtle", "balanced", "cinematic"] as CursorPreset[]).map(preset => (
            <button
              key={preset}
              onClick={() => setCursorPreset(preset)}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                cursorPreset === preset
                  ? "bg-red-500 text-white"
                  : "bg-white/70 text-black hover:bg-white"
              }`}
            >
              {preset}
            </button>
          ))}
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 container px-4 sm:px-6 md:px-10 lg:px-14 md:absolute md:inset-0 md:flex md:items-center md:justify-center">
        <div
          className={`max-w-[1300px] mx-auto text-left transition-all duration-1000 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="hidden md:flex md:items-start md:justify-between md:gap-10 lg:gap-16 md:pt-16 lg:pt-20">
            <div className="mb-14 md:mb-0 md:w-[30%] lg:w-[31%] xl:w-[32%] md:-translate-x-16 md:translate-y-32 bg-white/68 md:bg-white/58 backdrop-blur-sm border border-red-300/60 rounded-2xl p-4 md:p-5 shadow-[0_8px_30px_rgba(0,0,0,0.25)]">
              {/* <p className="text-4xl md:text-5xl lg:text-[3.5rem] text-black font-extrabold leading-tight">
                Hussein Alali Alismael
              </p> */}
              
              <p className="text-xl md:text-2xl text-red-700 mt-4 font-semibold">
                AI Engineering & Backend Developer
              </p>
            </div>

            <div className="md:text-right md:w-[30%] lg:w-[31%] xl:w-[32%] md:translate-x-16 md:translate-y-40 bg-white/68 md:bg-white/58 backdrop-blur-sm border border-red-300/60 rounded-2xl p-4 md:p-5 shadow-[0_8px_30px_rgba(0,0,0,0.25)]">
              <p className="text-black/90 text-base md:text-lg lg:text-xl max-w-xl md:max-w-2xl md:ml-auto mb-6 leading-relaxed">
                Crafting robust server-side solutions and integrating AI into production systems
              </p>

              {/* <div className="flex flex-col gap-3 justify-start md:justify-end md:items-end mb-1 md:mb-2">
                <Button
                  onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
                  className="bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-3 text-lg"
                >
                  Explore My Work
                </Button>
                <Button
                  onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                  variant="outline"
                  className="border-black/70 text-black hover:bg-black/10 font-semibold px-8 py-3 text-lg"
                >
                  Get In Touch
                </Button>
              </div> */}
            </div>
          </div>

          {/* Hint for mouse tracking - only show on desktop
          {!prefersReducedMotion.current && (
            <p className="text-black/80 text-sm mt-6 mb-4 hidden md:block md:pl-2">
              ✨ Try the cursor presets in the top-right corner
            </p>
          )} */}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className={`hidden md:block absolute bottom-5 md:bottom-6 left-1/2 transform -translate-x-1/2 transition-all duration-1000 z-20 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <button
          onClick={scrollToNext}
          className="flex flex-col items-center gap-2 text-black hover:text-red-700 transition-colors bg-white/35 backdrop-blur-sm rounded-full px-4 py-2"
        >
          <span className="text-sm font-semibold">Scroll to explore</span>
          <ChevronDown className="animate-bounce" size={24} />
        </button>
      </div>
    </section>
  );
}
