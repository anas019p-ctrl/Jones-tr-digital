import React from 'react';
import { motion } from 'framer-motion';

const BitStream = ({ delay = 0, left = '0%' }) => (
    <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: '100vh', opacity: [0, 0.6, 0.6, 0] }}
        transition={{
            duration: Math.random() * 8 + 10,
            repeat: Infinity,
            delay,
            ease: "linear"
        }}
        className="absolute w-[1px] h-20 bg-gradient-to-b from-transparent via-cyan-500/30 to-transparent z-0"
        style={{ left }}
    >
        <div className="w-[2px] h-[2px] bg-cyan-400 absolute bottom-0 blur-[1.5px]" />
    </motion.div>
);

const GlobalBackground = () => {
    return (
        <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden bg-[#020205]">
            {/* 1. Base Layer: Deeper Blue/Purple Radial (Less "Flat Black") */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#0f172a_0%,#020205_100%)] opacity-100" />

            {/* 2. Soft Edge Glows - More Visible */}
            <div className="absolute inset-0">
                <div
                    className="absolute -left-[10%] top-0 w-[50%] h-[100%] bg-cyan-500/10 blur-[130px] opacity-60"
                />
                <div
                    className="absolute -right-[10%] top-0 w-[50%] h-[100%] bg-purple-600/10 blur-[130px] opacity-50"
                />
            </div>

            {/* 3. Sparse Data Streams (Clearer) */}
            <div className="absolute inset-0 opacity-30">
                <BitStream left="8%" delay={0} />
                <BitStream left="92%" delay={5} />
                <BitStream left="20%" delay={2} />
                <BitStream left="80%" delay={7} />
            </div>

            {/* 4. Horizon Glow - Brighter */}
            <div className="absolute bottom-0 left-0 right-0 h-[40%] bg-gradient-to-t from-cyan-500/10 to-transparent blur-[80px]" />

            {/* 5. Fluid Scanline (Slightly more visible) */}
            <motion.div
                animate={{ y: ['-100%', '100%'] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-full h-[1px] bg-cyan-500/15 absolute shadow-[0_0_10px_rgba(0,242,255,0.2)]"
            />

            {/* 6. Subtle Noise for texture */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none mix-blend-overlay"
                style={{ backgroundImage: `url('https://grainy-gradients.vercel.app/noise.svg')` }} />
        </div>
    );
};

export default GlobalBackground;
