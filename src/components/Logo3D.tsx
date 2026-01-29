import { Badge } from "@/components/ui/badge";

const Logo3D = () => {
  return (
    <div className="relative w-12 h-12 flex items-center justify-center animate-float">
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full drop-shadow-[0_0_15px_rgba(43,100,255,0.5)]"
        style={{ filter: "drop-shadow(0 0 10px hsla(var(--primary)))" }}
      >
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" />
            <stop offset="50%" stopColor="hsl(var(--accent))" />
            <stop offset="100%" stopColor="hsl(var(--secondary))" />
          </linearGradient>
        </defs>

        {/* 3D Cube effect background */}
        <path
          d="M50 5 L95 25 L95 75 L50 95 L5 75 L5 25 Z"
          fill="none"
          stroke="url(#logoGradient)"
          strokeWidth="2"
          className="opacity-50"
        />

        {/* Inner Logo Geometry */}
        <path
          d="M50 20 L80 35 L80 65 L50 80 L20 65 L20 35 Z"
          fill="url(#logoGradient)"
          className="opacity-90"
        />

        {/* Text Initials */}
        <text
          x="50"
          y="62"
          fontSize="35"
          fontFamily="Arial, sans-serif"
          fontWeight="bold"
          fill="white"
          textAnchor="middle"
          style={{ textShadow: "0 2px 4px rgba(0,0,0,0.3)" }}
        >
          JT
        </text>

        {/* Glow Ring */}
        <circle
          cx="50"
          cy="50"
          r="45"
          stroke="hsl(var(--primary))"
          strokeWidth="1"
          strokeDasharray="4 4"
          fill="none"
          className="animate-spin-slow opacity-30"
        />
      </svg>
    </div>
  );
};

export default Logo3D;
