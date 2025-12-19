import React from 'react';
import { cn } from '../../../lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: 'default' | 'glass' | 'outline';
}

export function Card({ className, variant = 'default', ...props }: CardProps) {
    const variants = {
        default: "bg-[#262421] border border-white/10 shadow-xl",
        glass: "bg-black/30 backdrop-blur-md border border-white/10",
        outline: "bg-transparent border-2 border-white/20"
    };

    return (
        <div
            className={cn("rounded-2xl p-6 text-white", variants[variant], className)}
            {...props}
        />
    );
}