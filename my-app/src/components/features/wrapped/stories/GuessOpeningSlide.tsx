'use client';

import { useState } from 'react';
import { HelpCircle } from 'lucide-react';
import { UserData } from '@/types';
import StoryCard from '@/components/ui/StoryCard';
import { StoryHeader, CONTAINERS, TYPOGRAPHY } from './shared';

interface GuessProps {
    data: UserData;
    color: 'white' | 'black';
}

export default function GuessOpeningSlide({ data, color }: GuessProps) {
    const [status, setStatus] = useState<'idle' | 'correct' | 'wrong'>('idle');

    const list = color === 'white' ? data.topOpeningsWhite : data.topOpeningsBlack;

    const [options] = useState(() => {
        if (!list || list.length < 3) return null;
        const correct = list[0];
        const others = list.slice(1, 3);
        const shuffled = [correct, ...others].sort(() => Math.random() - 0.5);
        return { correct, shuffled };
    });

    if (!options) return null;

    const handleGuess = (name: string) => {
        if (status === 'correct') return;
        setStatus(name === options.correct.name ? 'correct' : 'wrong');
    };

    return (
        <StoryCard id={`slide-guess-${color}`} className={CONTAINERS.slideCard}>
            <div className={CONTAINERS.slideContainer}>
                <StoryHeader
                    icon={<HelpCircle size={32}/>}
                    iconColor="text-[#81b64c]"
                    title="Pop Quiz"
                    subtitle={`Most played as ${color}?`}
                />

                <div className="w-full flex flex-col gap-3 px-4 z-20">
                    {options.shuffled.map((op) => {
                        let btnStyle = "bg-[#262421] border-[#3e3c39] text-[#c1c1c0] hover:bg-[#3d3b38]";

                        if (status === 'correct' && op.name === options.correct.name) {
                            btnStyle = "bg-[#457524] border-[#457524] text-white ring-2 ring-[#81b64c]";
                        } else if (status === 'wrong' && op.name !== options.correct.name) {
                            btnStyle = "bg-[#262421] border-red-900/50 text-red-400 opacity-50";
                        }

                        return (
                            <button
                                key={op.name}
                                onClick={() => handleGuess(op.name)}
                                disabled={status === 'correct'}
                                className={`w-full p-4 rounded-lg text-sm font-bold transition border-2 text-left flex justify-between items-center ${btnStyle}`}
                            >
                                <span>{op.name}</span>
                                {status === 'correct' && op.name === options.correct.name && (
                                    <span className="text-xs bg-white/20 px-2 py-1 rounded text-white font-mono">
                                        {op.count} gms
                                    </span>
                                )}
                            </button>
                        );
                    })}
                </div>

                <div className="h-8 mt-6 font-bold text-center z-20">
                    {status === 'correct' && <span className="text-[#81b64c] animate-bounce block text-lg">Correct! You're a legend.</span>}
                    {status === 'wrong' && <span className="text-red-500 animate-shake block">Nope! Try again.</span>}
                </div>
            </div>
        </StoryCard>
    );
}