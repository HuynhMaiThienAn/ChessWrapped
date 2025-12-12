'use client';

import { useEffect, useRef } from 'react';

export default function BackgroundMusic() {
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        // 1. Initialize audio ONLY ONCE
        if (!audioRef.current) {
            audioRef.current = new Audio('/1-04. Thank You For Your Patience.mp3');
            audioRef.current.loop = true;
            audioRef.current.volume = 0.4; // Adjust volume as needed
        }

        // 2. Function to attempt playback
        const attemptPlay = async () => {
            if (audioRef.current && audioRef.current.paused) {
                try {
                    await audioRef.current.play();
                } catch (error) {
                    console.log("Autoplay blocked. Waiting for user interaction...");
                }
            }
        };

        // 3. Try to play immediately (might fail due to browser policy)
        attemptPlay();

        // 4. Add a global listener to unlock audio on the first click anywhere
        const unlockAudio = () => {
            attemptPlay();
            // Remove listeners once playing
            window.removeEventListener('click', unlockAudio);
            window.removeEventListener('keydown', unlockAudio);
        };

        window.addEventListener('click', unlockAudio);
        window.addEventListener('keydown', unlockAudio);

        // Cleanup: We do NOT pause the music here, because we want it to persist.
        // We only remove the event listeners.
        return () => {
            window.removeEventListener('click', unlockAudio);
            window.removeEventListener('keydown', unlockAudio);
        };
    }, []);

    return null; // This component is invisible
}