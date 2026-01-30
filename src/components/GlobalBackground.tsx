import React from 'react';
import { motion } from 'framer-motion';

const BitStream = ({ delay = 0, left = '0%' }) => (
    <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: '100vh', opacity: [0, 1, 1, 0] }}
        transition={{
            duration: Math.random() * 5 + 5,
            repeat: Infinity,
            delay,
            ease: "linear"
        }}
        className="absolute w-[1px] h-20 bg-gradient-to-b from-transparent via-cyber-cyan to-transparent z-0"
        style={{ left }}
    >
        <div className="w-1 h-1 bg-white rounded-full absolute bottom-0 blur-[1px] animate-pulse" />
    </motion.div>
);

const GlobalBackground = () => {
    return (
        <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden bg-background">
            {/* Main Cyber Grid and Circuit Effect */}
            <div className="absolute inset-0 cyber-circuit-bg opacity-30" />

            {/* Data Streams / Bit Streams */}
            <div className="absolute inset-0 opacity-10">
                <BitStream left="15%" delay={0} />
                <BitStream left="35%" delay={2} />
                <BitStream left="65%" delay={1} />
                <BitStream left="85%" delay={4} />
            </div>

            {/* Complex HUD Elements */}
            <div className="absolute inset-0 opacity-20">
                {/* Main HUD Circles */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-cyber-cyan/10 rounded-full animate-spin-slow" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-cyber-purple/10 rounded-full animate-reverse-spin" />

                {/* Secondary HUD Rings */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-dashed border-cyber-cyan/5 rounded-full" />
                <div className="absolute top-[20%] left-[10%] w-[200px] h-[200px] border border-cyber-cyan/5 rounded-full animate-pulse" />
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
            <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-background/80" />
        </div>
    );
};

export default GlobalBackground;
