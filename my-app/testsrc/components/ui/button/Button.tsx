import React from 'react';
import { cn } from '../../../lib/utils';
import { Spinner } from '../loading/Spinner';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline';
    isLoading?: boolean;
}

export function Button({
                           children,
                           className,
                           variant = 'primary',
                           isLoading,
                           disabled,
                           ...props
                       }: ButtonProps) {
    const baseStyles = "h-12 px-6 rounded-xl font-bold transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2";

    const variants = {
        primary: "bg-[#81b64c] hover:bg-[#73a342] text-white shadow-[0_4px_0_#4b6b26]",
        secondary: "bg-[#454341] hover:bg-[#302e2b] text-white shadow-[0_4px_0_#262421]",
        outline: "bg-transparent border-2 border-white/20 hover:bg-white/10 text-white"
    };

    return (
        <button
            className={cn(baseStyles, variants[variant], className)}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading && <Spinner size="sm" color="white" />}
            {children}
        </button>
    );
}