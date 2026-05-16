import { useState, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Home, Code, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  path: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
  { path: "/", label: "Início", icon: Home },
  { path: "/projetos", label: "Projetos", icon: Code },
  { path: "/skills", label: "Skills", icon: Zap },
];

export const Navbar = () => {
  const location = useLocation();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [flashIndex, setFlashIndex] = useState<number | null>(null);
  const flashTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const activeIndex = Math.max(
    0,
    navItems.findIndex((item) => item.path === location.pathname)
  );

  const handleNavClick = (index: number) => {
    if (index === activeIndex) return;
    if (flashTimerRef.current) clearTimeout(flashTimerRef.current);
    setFlashIndex(index);
    flashTimerRef.current = setTimeout(() => setFlashIndex(null), 700);
  };

  return (
    <nav className="fixed left-8 top-1/2 -translate-y-1/2 z-50 max-md:left-1/2 max-md:top-0 max-md:-translate-x-1/2 max-md:translate-y-0 max-md:w-full max-md:px-4 max-md:py-4">
      <div className="absolute -inset-8 -left-4 pointer-events-none max-md:hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent rounded-r-3xl" />
        <div className="absolute left-0 top-1/2 -translate-y-1/2 h-[calc(100%-32px)] w-px bg-gradient-to-b from-transparent via-white/5 to-transparent" />
        {navItems.map((_, index) => {
          if (index !== activeIndex) return null;
          return (
            <div
              key={`glow-${index}`}
              className="absolute left-0 top-1/2 -translate-y-1/2 w-32 h-32 bg-white/5 rounded-full blur-3xl transition-all duration-700 ease-out pointer-events-none"
              style={{
                transform: `translate(-50%, calc(-50% + ${index * 72}px))`,
              }}
            />
          );
        })}
      </div>

      <div className="relative flex flex-col gap-6 max-md:flex-row max-md:justify-center max-md:gap-4">
        <div className="absolute left-6 top-0 bottom-0 w-px bg-white/10 max-md:hidden" />
        <div
          className="absolute left-6 top-0 w-px bg-white/40 transition-all duration-500 ease-out shadow-[0_0_8px_rgba(255,255,255,0.2)] max-md:hidden"
          style={{
            height: `${(activeIndex / (navItems.length - 1)) * 100}%`,
          }}
        />
        {navItems.map((_, index) => (
          <div
            key={`particle-${index}`}
            className="absolute left-4 top-6 w-1 h-1 bg-white/20 rounded-full animate-pulse"
            style={{
              top: `${index * 72 + 24}px`,
              animationDelay: `${index * 0.3}s`,
            }}
          />
        ))}

        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = activeIndex === index;
          const isBefore = index < activeIndex;
          const isFlashing = flashIndex === index;

          return (
            <div
              key={item.path}
              data-nav-index={index}
              className="relative group"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div
                className={cn(
                  "absolute left-6 top-6 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full transition-all duration-300",
                  isActive
                    ? "bg-white scale-150 shadow-[0_0_12px_rgba(255,255,255,0.6)]"
                    : isBefore
                    ? "bg-white/60 scale-110"
                    : "bg-white/20 scale-100 group-hover:bg-white/40 group-hover:scale-125"
                )}
              />
              {isActive && (
                <div className="absolute left-6 top-6 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white/30 animate-ping" />
              )}

              <NavLink
                to={item.path}
                onClick={() => handleNavClick(index)}
                className={cn(
                  "relative flex items-center gap-4 pl-3 pr-6 py-3 rounded-r-full transition-all duration-300 outline-none focus:outline-none max-md:px-4 max-md:py-2 max-md:rounded-full"
                )}
              >
                <div
                  className={cn(
                    "relative w-10 h-10 flex items-center justify-center transition-all duration-300",
                    isActive && "scale-110"
                  )}
                >
                  <div
                    className={cn(
                      "absolute inset-0 rotate-45 rounded-lg transition-all duration-300",
                      isActive
                        ? "bg-white border-2 border-white"
                        : "bg-black/40 border-2 border-white/20 group-hover:border-white/40",
                      isFlashing && "nav-item-flash"
                    )}
                  />
                  <Icon
                    className={cn(
                      "relative z-10 w-5 h-5 transition-all duration-300 -rotate-45",
                      isActive ? "text-black" : "text-white/70 group-hover:text-white"
                    )}
                  />
                  {isActive && (
                    <div className="absolute inset-0 rotate-45 rounded-lg bg-white/20 blur-lg" />
                  )}
                </div>

                <span
                  className={cn(
                    "text-sm font-medium transition-all duration-300 whitespace-nowrap max-md:opacity-100 max-md:translate-x-0",
                    isActive || hoveredIndex === index
                      ? "opacity-100 translate-x-0 text-white"
                      : "opacity-0 -translate-x-2 text-white/60 pointer-events-none"
                  )}
                >
                  {item.label}
                </span>

                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full" />
                )}
              </NavLink>

              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-8 w-8 h-px bg-gradient-to-r from-white/20 to-transparent" />
              )}
            </div>
          );
        })}
      </div>
    </nav>
  );
};
