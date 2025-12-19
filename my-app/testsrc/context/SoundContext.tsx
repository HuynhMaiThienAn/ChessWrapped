'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface SoundContextType {
    isMuted: boolean;
    toggleMute: () => void;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

export function SoundProvider({ children }: { children: ReactNode }) {
    const [isMuted, setIsMuted] = useState(false);
    const [mounted, setMounted] = useState(false);

    // 1. Load preference from LocalStorage on mount
    useEffect(() => {
        const stored = localStorage.getItem('chess-wrapped-muted');
        if (stored) {
            setIsMuted(stored === 'true');
        }
        setMounted(true);
    }, []);

    // 2. Toggle function
    const toggleMute = () => {
        setIsMuted((prev) => {
            const newState = !prev;
            localStorage.setItem('chess-wrapped-muted', String(newState));
            return newState;
        });
    };

    return (
        <SoundContext.Provider value={{ isMuted, toggleMute }}>
            {children}
        </SoundContext.Provider>
    );
}

// Custom Hook for easy access
export const useGlobalSound = () => {
    const context = useContext(SoundContext);
    if (!context) {
        throw new Error('useGlobalSound must be used within a SoundProvider');
    }
    return context;
};