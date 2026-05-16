import { useState, useEffect } from "react";
import Footer from "@/components/Footer";

const Skills = () => {
  const [currentIndex, setCurrentIndex] = useState(2); // Start at index 2 so React is in center

  const technologies = [
    {
      name: "React",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      color: "#61DAFB"
    },
    {
      name: "Next.js",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg",
      color: "#FFFFFF"
    },
    {
      name: "TypeScript",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
      color: "#3178C6"
    },
    {
      name: "Node.js",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
      color: "#339933"
    },
    {
      name: "NestJS",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nestjs/nestjs-original.svg",
      color: "#E0234E"
    },
    {
      name: "Prisma",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prisma/prisma-original.svg",
      color: "#2D3748"
    },
    {
      name: "PostgreSQL",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
      color: "#336791"
    },
    {
      name: "Tailwind CSS",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
      color: "#06B6D4"
    },
    {
      name: "Angular",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angular/angular-original.svg",
      color: "#DD0031"
    },
    {
      name: "Svelte",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/svelte/svelte-original.svg",
      color: "#FF3E00"
    },
    {
      name: "C#",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg",
      color: "#734184ff"
    },
    {
      name: "Python",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
      color: "#3776AB"
    },
    {
      name: "Lua",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/lua/lua-original.svg",
      color: "#2C2D72"
    }
  ];

  // Auto-rotate carousel - slower and smoother
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % technologies.length);
    }, 3000); // Increased to 3 seconds
    return () => clearInterval(interval);
  }, [technologies.length]);

  // Get visible technologies - always center the selected one
  const getVisibleTechs = () => {
    const visible = [];
    
    // Always show 5 items with current in center (index 2)
    for (let i = -2; i <= 2; i++) {
      const index = (currentIndex + i + technologies.length) % technologies.length;
      visible.push({
        ...technologies[index],
        originalIndex: index,
        position: i + 2 // 0, 1, 2, 3, 4 where 2 is center
      });
    }
    
    return visible;
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-black p-4 relative overflow-hidden">
      
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
            backgroundPosition: '0 0, 0 0'
          }}
        />
        
        <div className="absolute top-[20%] left-[5%] w-[500px] h-[500px] bg-white/1.5 rounded-full blur-3xl animate-float opacity-20" />
        <div className="absolute bottom-[25%] right-[8%] w-[450px] h-[450px] bg-white/1.5 rounded-full blur-3xl animate-float opacity-18" style={{ animationDelay: "-4s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-white/1 rounded-full blur-3xl opacity-15" />
        
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 0%, transparent 40%, rgba(0,0,0,0.1) 100%)'
          }}
        />
      </div>

      <div className="w-full max-w-5xl relative z-10 text-center">
        <h1 className="text-4xl font-bold mb-2 text-white">Skills & Technologies</h1>
        <p className="text-white/60 mb-16">Tecnologias que domino para criar soluções incríveis</p>
        
        {/* Carousel */}
        <div className="flex items-center justify-center gap-4 mb-12 px-8">
          {getVisibleTechs().map((tech, index) => {
            const isCenter = index === 2; // Center is always index 2
            const distance = Math.abs(index - 2); // Distance from center
            
            let scale, opacity;
            if (isCenter) {
              scale = 'scale-125';
              opacity = 'opacity-100';
            } else if (distance === 1) {
              scale = 'scale-110';
              opacity = 'opacity-80';
            } else {
              scale = 'scale-95';
              opacity = 'opacity-40';
            }
            
            return (
              <div
                key={tech.originalIndex}
                className={`transition-all duration-500 ease-out ${scale} ${opacity} flex flex-col items-center gap-4`}
              >
                <div 
                  className="w-20 h-20 rounded-2xl flex items-center justify-center border-2 transition-all duration-500 ease-out hover:scale-105 cursor-pointer"
                  style={{ 
                    borderColor: isCenter ? tech.color : 'rgba(255,255,255,0.2)',
                    backgroundColor: isCenter ? `${tech.color}20` : 'rgba(255,255,255,0.05)',
                    boxShadow: isCenter ? `0 0 20px ${tech.color}40` : 'none'
                  }}
                  onClick={() => setCurrentIndex(tech.originalIndex)}
                >
                  <img 
                    src={tech.icon} 
                    alt={tech.name}
                    className="w-12 h-12 transition-all duration-300"
                    onError={(e) => {
                      console.log(`Failed to load icon for ${tech.name}:`, tech.icon);
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
                {isCenter && (
                  <span 
                    className="text-lg font-semibold transition-all duration-500 ease-out"
                    style={{ color: tech.color }}
                  >
                    {tech.name}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Progress dots */}
        <div className="flex justify-center gap-3">
          {technologies.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-110 ${
                index === currentIndex ? 'bg-white' : 'bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Skills;