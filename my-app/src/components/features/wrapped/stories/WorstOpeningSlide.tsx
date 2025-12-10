'use client';

import { motion } from 'framer-motion';
import { Skull, AlertTriangle, XCircle, ShieldAlert } from 'lucide-react';
import { UserData } from '@/types';
import StoryCard from '@/components/ui/StoryCard';
import { StoryHeader, StoryBackground, containerVariants, itemVariants, CONTAINERS, TYPOGRAPHY } from './shared';

export default function WorstOpeningSlide({ data }: { data: UserData }) {
    const worstWhite = data.worstOpeningsWhite?.[0];
    const worstBlack = data.worstOpeningsBlack?.[0];

    // If no data exists for either, don't render the slide
    if (!worstWhite && !worstBlack) return null;

    return (
        <StoryCard id="slide-worst" className={CONTAINERS.slideCard}>

            {/* Background Layer */}
            <StoryBackground>
                <div className="absolute top-10 right-10 text-red-500 opacity-5"><Skull size={80} /></div>
                <div className="absolute bottom-10 left-10 text-red-500 opacity-5"><ShieldAlert size={60} /></div>
                <div className="absolute top-1/2 left-4 text-red-500 opacity-5"><XCircle size={40} /></div>
            </StoryBackground>

            {/* Content Layer */}
            <motion.div
                className={CONTAINERS.slideContainer}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <StoryHeader
                    icon={<AlertTriangle size={24}/>}
                    iconColor="text-red-500"
                    title="Your Kryptonite"
                    subtitle="Openings you struggled against"
                />

                <div className="w-full flex flex-col gap-4 px-4 mt-2 z-10">

                    {/* Worst As White */}
                    {worstWhite && (
                        <motion.div
                            variants={itemVariants}
                            className="bg-[#262421] border border-red-900/40 p-5 rounded-xl relative overflow-hidden shadow-lg group hover:border-red-500/50 transition-colors"
                        >
                            <div className="absolute top-0 left-0 w-1.5 h-full bg-red-500/80"/>

                            <h3 className="text-[#989795] text-[10px] uppercase font-bold tracking-widest mb-1 pl-2">
                                Playing As White
                            </h3>
                            <div className="text-xl font-black text-white mb-2 leading-tight pl-2 truncate">
                                {worstWhite.name}
                            </div>
                            <div className="flex gap-4 text-xs pl-2">
                                <span className="text-red-400 font-bold bg-red-950/30 px-2 py-1 rounded">
                                    {worstWhite.winRate}% Win Rate
                                </span>
                                <span className="text-[#989795] py-1">
                                    {worstWhite.count} games
                                </span>
                            </div>
                        </motion.div>
                    )}

                    {/* Worst As Black */}
                    {worstBlack && (
                        <motion.div
                            variants={itemVariants}
                            className="bg-[#262421] border border-red-900/40 p-5 rounded-xl relative overflow-hidden shadow-lg group hover:border-red-500/50 transition-colors"
                        >
                            <div className="absolute top-0 left-0 w-1.5 h-full bg-red-500/80"/>

                            <h3 className="text-[#989795] text-[10px] uppercase font-bold tracking-widest mb-1 pl-2">
                                Playing As Black
                            </h3>
                            <div className="text-xl font-black text-white mb-2 leading-tight pl-2 truncate">
                                {worstBlack.name}
                            </div>
                            <div className="flex gap-4 text-xs pl-2">
                                <span className="text-red-400 font-bold bg-red-950/30 px-2 py-1 rounded">
                                    {worstBlack.winRate}% Win Rate
                                </span>
                                <span className="text-[#989795] py-1">
                                    {worstBlack.count} games
                                </span>
                            </div>
                        </motion.div>
                    )}
                </div>

                {/* Footer Message */}
                <motion.div variants={itemVariants} className={TYPOGRAPHY.cardMessage}>
                    <p className={TYPOGRAPHY.comment}>
                        "Study these lines, and you shall become invincible."
                    </p>
                </motion.div>

            </motion.div>
        </StoryCard>
    );
}