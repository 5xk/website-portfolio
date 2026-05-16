import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

interface BadgeProps {
  src: string;
  alt: string;
}

export const Badge = ({ src, alt }: BadgeProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const badgeRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Calcular posição do menu
  useEffect(() => {
    if (isHovered && badgeRef.current && menuRef.current) {
      const rect = badgeRef.current.getBoundingClientRect();
      menuRef.current.style.left = `${rect.left + rect.width / 2}px`;
      menuRef.current.style.top = `${rect.bottom + 8}px`;
      menuRef.current.style.transform = 'translateX(-50%)';
    }
  }, [isHovered]);

  const menu = isHovered && (
    <div 
      ref={menuRef}
      className="fixed z-[99999] bg-zinc-900/98 backdrop-blur-md border border-white/20 rounded-lg shadow-2xl px-3 py-2 animate-in fade-in-0 zoom-in-95 whitespace-nowrap pointer-events-auto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Brilho branco sutil no menu */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 pointer-events-none rounded-lg" />
      
      <div className="flex items-center text-xs text-white/80 relative z-10">
        <span className="font-medium">{alt}</span>
      </div>
    </div>
  );

  return (
    <>
      <div 
        ref={badgeRef}
        className="relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="w-5 h-5 rounded-md bg-muted/50 p-0.5 hover:scale-125 hover:rotate-12 transition-all duration-300 cursor-pointer hover:bg-white/10 hover:shadow-[0_0_15px_rgba(255,255,255,0.2)] relative overflow-hidden group">
          {/* Shimmer effect branco */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          <img alt={alt} className="w-full h-full object-contain relative z-10" src={src} />
        </div>
      </div>
      {typeof document !== 'undefined' && createPortal(menu, document.body)}
    </>
  );
};
