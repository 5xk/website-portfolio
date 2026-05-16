import { useLocation, Link } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

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

      <div className="relative z-10 text-center max-w-md">
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <img 
            src="/fameblack.png" 
            alt="Fame Black Logo" 
            className="w-24 h-24 object-contain opacity-80"
          />
        </div>

        {/* 404 Text */}
        <h1 className="text-8xl font-bold text-white mb-4 bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent">
          404
        </h1>
        
        <h2 className="text-2xl font-semibold text-white mb-2">
          Página não encontrada
        </h2>
        
        <p className="text-white/60 mb-8 leading-relaxed">
          A página que você está procurando não existe ou foi movida.
          <br />
          <span className="text-white/40 text-sm font-mono">
            {location.pathname}
          </span>
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="group flex items-center justify-center gap-2 px-6 py-3 bg-white text-black rounded-lg font-medium hover:bg-white/90 transition-all duration-300 hover:scale-105"
          >
            <Home className="w-4 h-4 group-hover:scale-110 transition-transform" />
            Voltar ao Início
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="group flex items-center justify-center gap-2 px-6 py-3 bg-white/10 text-white border border-white/20 rounded-lg font-medium hover:bg-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105"
          >
            <ArrowLeft className="w-4 h-4 group-hover:scale-110 transition-transform" />
            Voltar
          </button>
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-white/40 text-sm">
          <p>Se você acredita que isso é um erro, entre em contato conosco.</p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
