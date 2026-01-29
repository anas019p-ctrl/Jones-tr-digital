import React from 'react';

const GlobalBackground = () => {
    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-background">
            {/* Base subtle grid */}
            <div className="absolute inset-0 cyber-grid opacity-[0.05]" />

            {/* Subtle glow orbs for depth */}
            <div
                className="absolute w-[800px] h-[800px] rounded-full blur-[150px] bg-primary/10 animate-float"
                style={{
                    top: '-10%',
                    right: '-10%',
                    animationDuration: '20s',
                }}
            />
            <div
                className="absolute w-[600px] h-[600px] rounded-full blur-[120px] bg-accent/5 animate-float"
                style={{
                    bottom: '-10%',
                    left: '-10%',
                    animationDuration: '25s',
                    animationDelay: '-10s',
                }}
            />

            {/* Scanline effect very subtle */}
            <div className="absolute inset-0 scan-line opacity-[0.02]" />

            {/* Vignette for cinematic focus */}
            <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-background/60" />
        </div>
    );
};

export default GlobalBackground;
