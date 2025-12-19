'use client';

import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { useGlobalSound } from '../../context/SoundContext';

export function BackgroundMusic() {
    const { isMuted, toggleMute } = useGlobalSound();
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [hasInteracted, setHasInteracted] = useState(false);

    useEffect(() => {
        audioRef.current = new Audio('/bg-music.mp3');
        audioRef.current.loop = true;
        audioRef.current.volume = 0.15;

        const attemptPlay = async () => {
            try {
                if (audioRef.current && !isMuted) {
                    await audioRef.current.play();
                    setHasInteracted(true);
                }
            } catch (e) {
                // Autoplay blocked - waiting for interaction
            }
        };

        const handleInteraction = () => {
            if (!hasInteracted && audioRef.current && !isMuted) {
                audioRef.current.play().catch(() => {});
                setHasInteracted(true);
            }
        };

        window.addEventListener('click', handleInteraction);
        window.addEventListener('keydown', handleInteraction);

        attemptPlay();

        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
            window.removeEventListener('click', handleInteraction);
            window.removeEventListener('keydown', handleInteraction);
        };
    }, []);

    // React to Mute Toggle
    useEffect(() => {
        if (!audioRef.current) return;

        if (isMuted) {
            audioRef.current.pause();
        } else if (hasInteracted) {
            audioRef.current.play().catch(() => {});
        }
    }, [isMuted, hasInteracted]);

    return (
        <button
            onClick={toggleMute}
            className="fixed bottom-6 right-6 z-50 w-12 h-12 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white/80 hover:bg-white hover:text-black hover:scale-110 transition-all border border-white/10 shadow-lg"
        >
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>
    );
}