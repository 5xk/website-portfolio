import { useMemo } from "react";
import { ProfileCard } from "@/components/ProfileCard";
import Footer from "@/components/Footer";

const generateParticles = (count: number) => {
  const particles = [];
  for (let i = 0; i < count; i++) {
    const seed = i * 0.618033988749;
    particles.push({
      size: (Math.sin(seed) * 0.5 + 0.5) * 2 + 1,
      opacity: (Math.cos(seed * 2) * 0.5 + 0.5) * 0.5 + 0.2,
      delay: (Math.sin(seed * 3) * 0.5 + 0.5) * 4,
      duration: (Math.cos(seed * 4) * 0.5 + 0.5) * 3 + 2,
      top: (Math.sin(seed * 5) * 0.5 + 0.5) * 100,
      left: (Math.cos(seed * 6) * 0.5 + 0.5) * 100,
    });
  }
  return particles;
};

const Index = () => {
  const particles = useMemo(() => generateParticles(30), []);
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-black p-4 relative overflow-hidden">
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
        
        {particles.map((particle, i) => (
          <div
            key={`particle-${i}`}
            className="absolute rounded-full bg-white"
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              top: `${particle.top}%`,
              left: `${particle.left}%`,
              opacity: particle.opacity * 0.6,
              animation: `pulse ${particle.duration}s ease-in-out infinite`,
              animationDelay: `${particle.delay}s`,
              boxShadow: `0 0 ${particle.size * 2}px rgba(255, 255, 255, ${particle.opacity * 0.4})`,
            }}
          />
        ))}
        
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
      
      <ProfileCard />
      <Footer />
    </div>
  );
};

export default Index;
