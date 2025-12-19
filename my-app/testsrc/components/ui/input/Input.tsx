import React from 'react';
import { cn } from '../../../lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    error?: boolean;
}

export function Input({ className, error, ...props }: InputProps) {
    return (
        <input
            className={cn(
                "w-full h-14 bg-[#262421] text-white px-5 rounded-xl border-2 border-[#3e3c39] focus:border-[#81b64c] focus:outline-none transition-all placeholder:text-white/30 font-bold",
                error && "border-red-500 focus:border-red-500",
                className
            )}
            {...props}
        />
    );
}