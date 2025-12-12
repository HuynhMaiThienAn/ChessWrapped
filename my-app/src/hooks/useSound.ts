import { useEffect, useCallback, useRef } from 'react';

// Hook for Background Music (Loops, Handles Autoplay Policy)
export function useBGM(src: string, volume: number = 0.5) {
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        // Only run in browser
        if (typeof window === 'undefined') return;

        const audio = new Audio(src);
        audio.loop = true;
        audio.volume = volume;
        audioRef.current = audio;

        // 1. Try to play immediately
        const playPromise = audio.play();

        if (playPromise !== undefined) {
            playPromise.catch(() => {
                console.log("Autoplay blocked. Waiting for user interaction...");

                // 2. Fallback: Play on the very first click/interaction
                const enableAudio = () => {
                    audio.play();
                    // Remove listener once played
                    document.removeEventListener('click', enableAudio);
                    document.removeEventListener('keydown', enableAudio);
                };

                document.addEventListener('click', enableAudio);
                document.addEventListener('keydown', enableAudio);
            });
        }

        // Cleanup: Stop music when leaving the page
        return () => {
            audio.pause();
            audio.currentTime = 0;
            // Clean up event listeners if they weren't triggered yet
            document.removeEventListener('click', (() => {}) as EventListener);
        };
    }, [src, volume]);
}

// Hook for Sound Effects (Buttons)
export function useSFX(src: string, volume: number = 0.5) {
    const play = useCallback(() => {
        if (typeof window === 'undefined') return;

        const audio = new Audio(src);
        audio.volume = volume;

        // Clone node helps play overlapping sounds (fast clicking)
        // or just use new Audio() every time as we do here.
        audio.play().catch((e) => console.warn("SFX play failed", e));
    }, [src, volume]);

    return play;
}