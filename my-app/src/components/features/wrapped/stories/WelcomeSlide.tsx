'use client';

import { motion } from 'framer-motion';
import { Crown, Trophy, Sparkles, Star } from 'lucide-react';
import { useRef, useEffect } from 'react';
import StoryCard from '@/components/ui/StoryCard';
import { itemVariants, containerVariants } from './shared/animations';
import { CONTAINERS, TYPOGRAPHY } from './shared/styles';
import { useChessStats } from '@/context/ChessContext';
import { StoryBackground } from './shared';

const AutoFitText = ({ text }: { text: string }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const resize = () => {
            const container = containerRef.current;
            const txt = textRef.current;
            if (!container || !txt) return;

            txt.style.transform = 'scale(1)';

            const containerWidth = container.clientWidth;
            const textWidth = txt.scrollWidth;

            // Only scale down if text is wider than container
            if (textWidth > containerWidth) {
                const scale = containerWidth / textWidth;
                txt.style.transform = `scale(${scale})`;
            }
        };

        // Run on mount and window resize
        resize();
        window.addEventListener('resize', resize);
        return () => window.removeEventListener('resize', resize);
    }, [text]);

    return (
        <div ref={containerRef} className="w-full flex justify-center items-center overflow-hidden">
            <div
                ref={textRef}
                className="whitespace-nowrap origin-center font-bold text-white drop-shadow-md text-4xl md:text-5xl transition-transform duration-200 leading-[1.5]"
            >
                {text}
            </div>
        </div>
    );
};

export default function WelcomeSlide() {
    const { stats: data } = useChessStats();

    return (
        <StoryCard id="slide-welcome" className={CONTAINERS.slideCard}>

            <StoryBackground>
                <div className="absolute top-10 right-10 text-[#ffc800] opacity-20 rotate-12">
                    <Crown size={100} fill="currentColor" strokeWidth={0} />
                </div>
            </StoryBackground>

            <motion.div
                className={CONTAINERS.slideContainer}
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                {/* 1. Year Badge */}
                <motion.div variants={itemVariants} className="bg-[#ffc800] text-[#302e2b] px-4 py-1 rounded-full font-black text-sm mb-6 shadow-sm border-2 border-white/20 rotate-[-2deg]">
                    <Star size={14} className="inline mr-1 mb-0.5" fill="currentColor"/> 2025 WRAPPED
                </motion.div>

                {/* 2. Avatar Circle */}
                <motion.div variants={itemVariants} className="relative mb-6">
                    <div className="p-2 bg-white rounded-full shadow-lg rotate-3">
                        <img
                            src={data.avatarUrl}
                            alt={data.username}
                            className="w-32 h-32 rounded-full object-cover border-4 border-[#81b64c]"
                        />
                    </div>
                    {/* Rank Icon Badge */}
                    <div className="absolute -bottom-2 -right-2 bg-[#81b64c] text-white p-3 rounded-2xl border-4 border-white shadow-lg rotate-[-10deg]">
                        <Trophy size={24} fill="currentColor" />
                    </div>
                </motion.div>

                <motion.div variants={itemVariants} className="text-center w-full px-4 mb-2">

                    <div className="w-full">
                        <AutoFitText text={data.username} />
                    </div>
                </motion.div>

                {/* 4. Fun Footer Comment */}
                <motion.div variants={itemVariants}>
                    <p className={TYPOGRAPHY.comment} >"Ready to see your stats?"</p>
                </motion.div>

            </motion.div>
        </StoryCard>
    );
}