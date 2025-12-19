import { useEffect, useRef, useCallback } from 'react';
import { useGlobalSound } from '../context/SoundContext';

interface UseSoundOptions {
    volume?: number;
    playbackRate?: number;
    soundEnabled?: boolean;
}

/**
 * Hook to play sound effects.
 */
export function useSound(url: string, { volume = 1, playbackRate = 1 }: UseSoundOptions = {}) {
    const { isMuted } = useGlobalSound();
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        // Create audio instance only on client side
        audioRef.current = new Audio(url);
    }, [url]);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
            audioRef.current.playbackRate = playbackRate;
        }
    }, [volume, playbackRate]);

    const play = useCallback(() => {
        if (isMuted || !audioRef.current) return;

        // Reset time to 0 to allow rapid replay
        audioRef.current.currentTime = 0;

        // Handle the promise to avoid "Uncaught (in promise) DOMException" errors
        audioRef.current.play().catch((error) => {
        });
    }, [isMuted]);

    const stop = useCallback(() => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
    }, []);

    return { play, stop };
}