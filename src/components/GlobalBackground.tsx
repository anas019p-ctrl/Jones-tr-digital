import React from 'react';

const GlobalBackground = () => {
    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-void">
            {/* Base subtle grid */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `linear-gradient(rgba(0, 242, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 242, 255, 0.05) 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                }}
            />

            {/* Subtle glow orbs for depth */}
            <div
                className="absolute w-[800px] h-[800px] rounded-full blur-[150px] bg-cyber-cyan/5 animate-float"
                style={{
                    top: '-10%',
                    right: '-10%',
                    animationDuration: '20s',
                }}
            />
            <div
                className="absolute w-[600px] h-[600px] rounded-full blur-[120px] bg-cyber-purple/5 animate-float"
                style={{
                    bottom: '-10%',
                    left: '-10%',
                    animationDuration: '25s',
                    animationDelay: '-10s',
                }}
            />

            {/* Scanline effect from index.css */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div
                    className="w-full h-[100px] opacity-[0.05] absolute"
                    style={{
                        background: 'linear-gradient(0deg, transparent 0%, rgba(0, 242, 255, 0.1) 50%, transparent 100%)',
                        animation: 'scanLine 8s linear infinite'
                    }}
                />
            </div>

            {/* Vignette for cinematic focus */}
            <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-void/80" />
        </div>
    );
};

export default GlobalBackground;
