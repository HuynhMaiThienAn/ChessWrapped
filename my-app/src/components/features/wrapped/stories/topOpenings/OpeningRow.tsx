import { motion } from 'framer-motion';
import { itemVariants } from '../shared/animations';
import { OpeningStat } from '@/types';

interface OpeningRowProps {
    op: OpeningStat;
    idx: number;
    colorClass: string;
}

export default function OpeningRow({ op, idx, colorClass }: OpeningRowProps) {
    return (
        <motion.div
            variants={itemVariants}
            className="p-3 bg-[#262421] rounded-lg border-b-2 border-[#1f1e1b] flex flex-col justify-center min-h-[70px] shadow-md hover:bg-[#302e2b] transition-colors"
        >
            {/* Rank + Name */}
            <div className="flex items-start gap-2 mb-1">
                <span className={`text-[10px] font-black mt-0.5 ${colorClass}`}>
                    #{idx + 1}
                </span>
                <span className="text-white text-xs font-bold leading-tight text-left break-words">
                    {op.name}
                </span>
            </div>

            {/* Stats Row */}
            <div className="flex justify-between text-[9px] text-[#989795] font-mono pl-4 mt-1">
                <span className="text-white font-bold text-sm">
                    {op.count} <span className="text-[#989795] text-[9px]">games</span>
                </span>
                <span className={op.winRate > 50 ? 'text-[#81b64c] font-black' : 'text-[#989795]'}>
                    {op.winRate}% WR
                </span>
            </div>
        </motion.div>
    );
}