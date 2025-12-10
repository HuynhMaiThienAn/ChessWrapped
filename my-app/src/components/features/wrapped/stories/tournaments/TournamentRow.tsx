import { motion } from 'framer-motion';
import { itemVariants } from '../shared/animations';
import { TournamentStats } from '@/types';

interface TournamentRowProps extends TournamentStats {
    idx: number;
}

export default function TournamentRow({ variant, count, winRate, idx }: TournamentRowProps) {
    const isPositive = winRate > 50;
    const colorClass = isPositive ? 'text-[#81b64c]' : 'text-[#989795]';

    return (
        <motion.div
            variants={itemVariants}
            className="flex justify-between items-center p-3 bg-[#262421] rounded-xl border border-[#3e3c39] shadow-md transition hover:bg-[#3d3b38]"
        >
            {/* Rank & Info */}
            <div className="flex items-center gap-3">
                <span className="text-[#989795] font-black text-xs w-4">
                    #{idx + 1}
                </span>
                <div className="flex flex-col text-left">
                    <span className="text-white font-bold text-lg leading-tight">
                        {variant}
                    </span>
                    <span className="text-[#989795] text-xs font-mono">
                        {count} entries
                    </span>
                </div>
            </div>

            {/* Win Rate Stats */}
            <div className="flex flex-col items-end">
                <span className={`${colorClass} font-black text-xl`}>
                    {winRate}%
                </span>
                <span className="text-[#989795] text-[10px] font-bold uppercase">
                    Win Rate
                </span>
            </div>
        </motion.div>
    );
}