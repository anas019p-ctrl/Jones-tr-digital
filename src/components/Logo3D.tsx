import { useState } from "react";
import logo3D from "@/assets/logo-3d.png";

const Logo3D = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative w-12 h-12 perspective-1000"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glow Effect */}
      <div 
        className={`absolute inset-0 rounded-xl bg-primary/30 blur-xl transition-all duration-500 ${
          isHovered ? "opacity-100 scale-150" : "opacity-50 scale-100"
        }`}
      />
      
      {/* Logo Container with 3D Transform */}
      <div 
        className={`relative w-12 h-12 rounded-xl overflow-hidden transition-all duration-500 transform-gpu ${
          isHovered 
            ? "scale-110 rotate-y-12 shadow-2xl" 
            : "scale-100"
        }`}
        style={{
          transformStyle: "preserve-3d",
          animation: isHovered ? "none" : "logoFloat 4s ease-in-out infinite",
        }}
      >
        <img 
          src={logo3D} 
          alt="JONES TR DIGITAL Logo" 
          className="w-full h-full object-cover"
        />
        
        {/* Shine Effect */}
        <div 
          className={`absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent transition-opacity duration-500 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
          style={{
            animation: isHovered ? "logoShine 1s ease-in-out" : "none",
          }}
        />
      </div>
      
      <style>{`
        @keyframes logoFloat {
          0%, 100% {
            transform: translateY(0) rotateY(0deg);
          }
          25% {
            transform: translateY(-3px) rotateY(5deg);
          }
          50% {
            transform: translateY(0) rotateY(0deg);
          }
          75% {
            transform: translateY(3px) rotateY(-5deg);
          }
        }
        
        @keyframes logoShine {
          0% {
            transform: translateX(-100%) rotate(45deg);
          }
          100% {
            transform: translateX(100%) rotate(45deg);
          }
        }
        
        .perspective-1000 {
          perspective: 1000px;
        }
        
        .rotate-y-12 {
          transform: rotateY(12deg) scale(1.1);
        }
      `}</style>
    </div>
  );
};

export default Logo3D;
