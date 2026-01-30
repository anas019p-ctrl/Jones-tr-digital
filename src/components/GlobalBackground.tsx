import React from 'react';

const GlobalBackground = () => {
    return (
        <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden bg-background">
            {/* Main Cyber Grid and Circuit Effect */}
            <div className="absolute inset-0 cyber-circuit-bg opacity-30" />

            {/* Complex HUD Elements */}
            <div className="absolute inset-0 opacity-20">
                {/* HUD Circles */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-cyber-cyan/10 rounded-full animate-spin-slow" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-cyber-purple/10 rounded-full animate-reverse-spin" />

                {/* Scanning Lines */}
                <div className="absolute top-0 left-[20%] w-[1px] h-full bg-gradient-to-b from-transparent via-cyber-cyan/20 to-transparent" />
                <div className="absolute top-0 left-[80%] w-[1px] h-full bg-gradient-to-b from-transparent via-cyber-cyan/20 to-transparent" />
                <div className="absolute top-[30%] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyber-cyan/10 to-transparent" />
            </div>

            {/* Concentrated Dynamic Glow Orbs */}
            <div
                className="absolute w-[70vw] h-[70vw] rounded-full cyber-glow-orb bg-cyber-cyan animate-pulse"
                style={{
                    top: '-20%',
                    right: '-20%',
                    animationDuration: '12s',
                    filter: 'blur(120px)',
                }}
            />
            <div
                className="absolute w-[60vw] h-[60vw] rounded-full cyber-glow-orb bg-cyber-purple animate-pulse"
                style={{
                    bottom: '-20%',
                    left: '-20%',
                    animationDuration: '18s',
                    animationDelay: '-4s',
                    filter: 'blur(100px)',
                }}
            />

            {/* Scanning Line */}
            <div className="absolute inset-0 overflow-hidden">
                <div
                    className="w-full h-[1px] dark:bg-cyber-cyan/30 bg-cyber-cyan/15 absolute shadow-[0_0_20px_rgba(0,242,255,0.6)]"
                    style={{
                        animation: 'scanLine 12s linear infinite'
                    }}
                />
            </div>

            {/* Noise / Grain Effect */}
            <div className="absolute inset-0 opacity-[0.04] dark:opacity-[0.06] pointer-events-none mix-blend-overlay"
                style={{ backgroundImage: `url('https://grainy-gradients.vercel.app/noise.svg')` }} />

            {/* Vignette */}
            <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-background/60" />
        </div>
    );
};

export default GlobalBackground;
