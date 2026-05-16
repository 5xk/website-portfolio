import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { ExternalLink } from "lucide-react";

interface SocialLinkProps {
  href: string;
  icon: string;
  alt: string;
  label: string;
}

export const SocialLink = ({ href, icon, alt, label }: SocialLinkProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const platformName = alt.charAt(0).toUpperCase() + alt.slice(1);
  const showMenu = isOpen || isHovered;

  // Calcular posição do menu
  useEffect(() => {
    if (showMenu && containerRef.current && menuRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      menuRef.current.style.top = `${rect.bottom + 6}px`;
      menuRef.current.style.left = `${rect.left}px`;
    }
  }, [showMenu]);

  // Fechar ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node) &&
          menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const menu = showMenu && (
    <div 
      ref={menuRef}
      className="fixed z-[99999] bg-zinc-900/98 backdrop-blur-md border border-white/20 rounded-lg shadow-2xl min-w-[160px] overflow-hidden animate-in fade-in-0 zoom-in-95 pointer-events-auto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => !isOpen && setIsHovered(false)}
    >
      {/* Brilho branco sutil no menu */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 pointer-events-none" />
      
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2.5 text-xs text-white/80 hover:text-white hover:bg-white/10 cursor-pointer px-3 py-2.5 transition-all duration-200 relative group/item"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(false);
        }}
      >
        {/* Shimmer no item */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/item:translate-x-full transition-transform duration-700" />
        
        <span className="flex-1 font-medium relative z-10">{platformName}</span>
        <span className="w-1 h-1 rounded-full bg-white/60 relative z-10" />
        <span className="relative z-10">Abrir perfil</span>
        <ExternalLink className="w-3 h-3 opacity-0 group-hover/item:opacity-100 transition-opacity duration-200 relative z-10" />
      </a>
    </div>
  );

  return (
    <>
      <div 
        ref={containerRef}
        className="relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => !isOpen && setIsHovered(false)}
      >
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="px-2.5 py-1.5 rounded-md bg-muted/50 hover:bg-white/10 flex items-center gap-1.5 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_15px_rgba(255,255,255,0.2)] group relative overflow-hidden"
        >
          {/* Shimmer effect branco bonito */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          
          {/* Glow effect branco no hover */}
          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md blur-sm" />
          
          <div className="relative z-10 flex items-center gap-1.5">
            <div className="relative w-3.5 h-3.5 flex items-center justify-center min-w-[14px] min-h-[14px] shrink-0">
              {icon && icon.trim() !== '' ? (
                <img
                  alt={alt}
                  className="w-full h-full object-contain rounded-sm group-hover:brightness-110 transition-all duration-300"
                  src={icon}
                  loading="eager"
                  style={{ 
                    filter: 'brightness(1)',
                    imageRendering: 'crisp-edges'
                  }}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    const parent = target.parentElement;
                    if (parent) {
                      target.style.display = 'none';
                      if (!parent.querySelector('.fallback-icon')) {
                        const fallback = document.createElement('div');
                        fallback.className = 'fallback-icon w-full h-full bg-white/20 rounded-sm flex items-center justify-center text-[8px] text-white/60';
                        fallback.textContent = alt && alt.length > 0 ? alt.charAt(0).toUpperCase() : '?';
                        parent.appendChild(fallback);
                      }
                    }
                  }}
                />
              ) : (
                <div className="w-full h-full bg-white/20 rounded-sm flex items-center justify-center text-[8px] text-white/60">
                  {alt && alt.length > 0 ? alt.charAt(0).toUpperCase() : '?'}
                </div>
              )}
              <div className="absolute inset-0 bg-white/20 rounded-sm opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-300 pointer-events-none" />
            </div>
            <span className="text-xs font-medium text-muted-foreground group-hover:text-white transition-colors">
              {label}
            </span>
          </div>
        </button>
      </div>
      {typeof document !== 'undefined' && createPortal(menu, document.body)}
    </>
  );
};
