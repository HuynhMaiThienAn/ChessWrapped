'use client';

import { motion } from 'framer-motion';
import { Swords, Castle, Zap, Target } from 'lucide-react';
import { UserData, OpeningStat } from '@/types';
import StoryCard from '@/components/ui/StoryCard';
import { StoryHeader, StoryBackground, containerVariants, CONTAINERS } from '../shared';
import OpeningRow from './OpeningRow';

// helper
const OpeningList = ({ title, list, colorClass }: { title: string, list: OpeningStat[], colorClass: string }) => (
    <div className="flex-1 min-w-0 flex flex-col">
        <div className={`text-[10px] font-bold uppercase tracking-widest mb-3 text-center bg-[#211f1c] py-1 rounded-sm border border-[#3e3c39] ${colorClass} shadow-inner`}>
            {title}
        </div>
        <div className="flex flex-col gap-2 flex-1">
            {list.map((op, idx) => (
                <OpeningRow key={op.name} op={op} idx={idx} colorClass={colorClass} />
            ))}
            {list.length === 0 && (
                <div className="text-[#3e3c39] text-[10px] italic p-2 text-center">
                    No games found.
                </div>
            )}
        </div>
    </div>
);

export default function TopOpeningSlide({ data }: { data: UserData }) {
    return (
        <StoryCard id="slide-top-openings" className={CONTAINERS.slideCard}>

            {/* Background Layer */}
            <StoryBackground>
                <div className="absolute top-10 left-10 text-white opacity-5"><Swords size={50} /></div>
                <div className="absolute top-1/4 right-5 text-white opacity-5"><Target size={40} /></div>
                <div className="absolute bottom-10 left-5 text-white opacity-5"><Zap size={30} /></div>
                <div className="absolute bottom-1/4 right-1/4 text-white opacity-5"><Castle size={45} /></div>
            </StoryBackground>

            {/* Content Layer */}
            <motion.div
                className={CONTAINERS.slideContainer}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <StoryHeader
                    icon={<Swords size={32} />}
                    iconColor="text-[#81b64c]"
                    title="Your Repertoire"
                    subtitle="(Most Played Openings)"
                />

                <div className="w-full flex gap-3 text-left items-stretch px-2">
                    <OpeningList
                        title="As White"
                        list={data.topOpeningsWhite}
                        colorClass="text-white"
                    />

                    {/* Vertical Divider */}
                    <div className="w-px bg-[#3e3c39] opacity-50 my-2"></div>

                    <OpeningList
                        title="As Black"
                        list={data.topOpeningsBlack}
                        colorClass="text-[#989795]"
                    />
                </div>

            </motion.div>
        </StoryCard>
    );
}