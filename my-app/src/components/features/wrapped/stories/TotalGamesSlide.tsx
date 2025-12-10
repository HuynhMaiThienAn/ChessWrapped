'use client';

import { Clock, Rocket, Grid3X3, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, LabelList } from 'recharts';
import { UserData } from '@/types';
import StoryCard from '@/components/ui/StoryCard';
import { StoryHeader, StoryBackground, containerVariants, itemVariants, CONTAINERS, TYPOGRAPHY } from './shared';

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-[#262421] border border-[#3e3c39] p-2 rounded-lg shadow-xl text-center">
                <p className="text-white font-bold text-sm mb-1">{label}</p>
                <p className="text-[#81b64c] font-black text-lg">
                    {payload[0].value} <span className="text-xs text-[#989795]">games</span>
                </p>
            </div>
        );
    }
    return null;
};

export default function TotalGamesSlide({ data }: { data: UserData }) {
    return (
        <StoryCard id="slide-games" className={CONTAINERS.slideCard}>

            <StoryBackground>
                <div className="absolute top-10 left-10 text-white opacity-5"><Grid3X3 size={60} /></div>
                <div className="absolute bottom-10 right-10 text-white opacity-5"><Zap size={50} /></div>
            </StoryBackground>

            <motion.div className={CONTAINERS.slideContainer} variants={containerVariants} initial="hidden" animate="visible">

                <StoryHeader
                    icon={<Rocket size={24}/>}
                    iconColor="text-[#81b64c]"
                    title={data.totalGames.toLocaleString()}
                    subtitle="Total Games Played"
                />

                {/* Time Invested */}
                <motion.div variants={itemVariants} className="w-full my-4 px-6 z-10">
                    <div className="bg-[#262421] border border-[#3e3c39] rounded-xl p-4 flex items-center justify-between shadow-lg">
                        <div className="flex items-center gap-3">
                            <div className="bg-[#81b64c]/20 p-2 rounded-lg">
                                <Clock size={24} className="text-[#81b64c]" />
                            </div>
                            <div className="text-left">
                                <div className="text-[#989795] text-[10px] font-bold uppercase tracking-wider">Time Invested</div>
                                <div className="text-2xl font-black text-white leading-none mt-1">
                                    ~{data.totalHours} <span className="text-sm font-medium text-[#989795]">Hours</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Bar Chart */}
                <motion.div variants={itemVariants} className="w-full h-40 mb-2 pr-6 relative z-10">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={data.gamesByVariant}
                            layout="vertical"
                            margin={{ top: 0, right: 20, left: 10, bottom: 0 }}
                            barCategoryGap={8}
                        >
                            <YAxis
                                type="category"
                                dataKey="name"
                                width={60}
                                tick={{ fill: '#c1c1c0', fontSize: 11, fontWeight: 700 }}
                                axisLine={false}
                                tickLine={false}
                            />
                            <XAxis type="number" hide />
                            <Tooltip content={<CustomTooltip />} cursor={{fill: 'transparent'}} />

                            <Bar dataKey="count" radius={[0, 4, 4, 0]} barSize={24}>
                                {data.gamesByVariant.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={index === 0 ? '#81b64c' : '#4b4845'} />
                                ))}
                                <LabelList
                                    dataKey="count"
                                    position="right"
                                    fill="#fff"
                                    fontSize={12}
                                    fontWeight={700}
                                    offset={10}
                                />
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </motion.div>

                <motion.div variants={itemVariants} className="opacity-80 mt-2">
                    <p className={TYPOGRAPHY.comment}>"Chess is life."</p>
                </motion.div>
            </motion.div>
        </StoryCard>
    );
}