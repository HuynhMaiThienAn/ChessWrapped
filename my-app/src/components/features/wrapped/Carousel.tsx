'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Rocket, Home } from 'lucide-react';
import { UserData } from '@/types';
import Link from 'next/link';

import WelcomeSlide from './stories/WelcomeSlide';
import JoinDateSlide from './stories/JoinDateSlide';
import TotalGamesSlide from './stories/TotalGamesSlide';
import EloGraphSlide from './stories/EloGraphSlide';
import OpeningCountSlide from './stories/OpeningCountSlide';
import GuessOpeningSlide from './stories/GuessOpeningSlide';
import ImpressiveMatchesSlide from './stories/ImpressiveMatchesSlide';
import WorstOpeningSlide from './stories/WorstOpeningSlide';
import EndSlide from './stories/EndSlide';

import TopOpeningSlide from './stories/topOpenings';
import TournamentsSlide from './stories/tournaments';
import FriendsSlide from './stories/friends';

// Background
const BACKGROUND_IMAGES = [
    "https://images.chesscomfiles.com/uploads/v1/images_users/tiny_mce/PedroPinhata/php1If5rD.png",
    "https://images.chesscomfiles.com/uploads/v1/images_users/tiny_mce/PedroPinhata/phpVmOHiw.png",
    "https://images.chesscomfiles.com/uploads/v1/images_users/tiny_mce/PedroPinhata/php6wV0bn.png",
    "https://images.chesscomfiles.com/uploads/v1/images_users/tiny_mce/PedroPinhata/phpJfHzcl.png"
];

export default function Carousel({ data }: { data: UserData }) {
    const [currentStep, setCurrentStep] = useState(0);
    const [bgImage, setBgImage] = useState(BACKGROUND_IMAGES[0]);

    // Randomize background on mount
    useEffect(() => {
        setBgImage(BACKGROUND_IMAGES[Math.floor(Math.random() * BACKGROUND_IMAGES.length)]);
    }, []);

    // Slide
    const allSlides = [
        { id: 'welcome', component: <WelcomeSlide data={data} /> },
        { id: 'join', component: <JoinDateSlide data={data} />, condition: () => new Date(data.joinDate * 1000).getFullYear() === data.year },
        { id: 'games', component: <TotalGamesSlide data={data} /> },
        { id: 'elo', component: <EloGraphSlide data={data} /> },
        { id: 'op_count', component: <OpeningCountSlide data={data} /> },
        { id: 'guess_white', component: <GuessOpeningSlide data={data} color="white" />, condition: () => data.topOpeningsWhite.length >= 3 },
        { id: 'guess_black', component: <GuessOpeningSlide data={data} color="black" />, condition: () => data.topOpeningsBlack.length >= 3 },
        { id: 'op_top', component: <TopOpeningSlide data={data} /> },
        { id: 'op_worst', component: <WorstOpeningSlide data={data} />, condition: () => data.worstOpeningsWhite.length > 0 || data.worstOpeningsBlack.length > 0 },
        { id: 'tourney', component: <TournamentsSlide data={data} />, condition: () => data.tournamentCount > 0 },
        { id: 'friends', component: <FriendsSlide data={data} /> },
        { id: 'impressive', component: <ImpressiveMatchesSlide data={data} />, condition: () => data.impressiveMatches.length > 0 },
        { id: 'end', component: <EndSlide onReset={() => window.location.reload()} /> },
    ];

    // Filter slides based on data availability
    const slides = allSlides.filter(slide => slide.condition ? slide.condition() : true);

    // Navigation
    const handleNext = useCallback(() => {
        if (currentStep < slides.length - 1) setCurrentStep(c => c + 1);
    }, [currentStep, slides.length]);

    const handlePrev = useCallback(() => {
        if (currentStep > 0) setCurrentStep(c => c - 1);
    }, [currentStep]);

    // Keyboard Navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight') handleNext();
            if (e.key === 'ArrowLeft') handlePrev();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleNext, handlePrev]);

    const isFirstSlide = currentStep === 0;
    const isLastSlide = currentStep === slides.length - 1;

    return (
        <div
            className="fixed inset-0 bg-[#302e2b] flex flex-col items-center p-4 font-sans text-[#c3c2c1] transition-all duration-700 ease-in-out"
            style={{
                backgroundImage: `url("${bgImage}")`,
                backgroundBlendMode: 'overlay',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}
        >
            {/* Top Bar: Home Button & Progress */}
            <div className="w-full max-w-md flex items-center gap-4 mt-2 mb-4 shrink-0 z-50">
                <Link href="/" className="p-2 bg-[#262421] rounded-full text-white/50 hover:text-white transition">
                    <Home size={20} />
                </Link>

                {/* Progress Bar */}
                <div className="flex-1 flex gap-1 h-1.5">
                    {slides.map((_, idx) => (
                        <div
                            key={idx}
                            className={`flex-1 rounded-full transition-colors duration-300 
                            ${idx <= currentStep ? 'bg-[#81b64c]' : 'bg-[#4b4845]/50'}`}
                        />
                    ))}
                </div>
            </div>

            {/* SLIDE  */}
            <div className="flex-1 w-full max-w-md flex items-center justify-center relative min-h-0">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={slides[currentStep].id}
                        initial={{ opacity: 0, x: 20, scale: 0.95 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: -20, scale: 0.95 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="w-full flex justify-center"
                    >
                        {slides[currentStep].component}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* CONTROLS */}
            <div className="w-full max-w-md flex gap-4 justify-between mt-6 mb-4 shrink-0 px-2 z-50">
                <button
                    onClick={handlePrev}
                    disabled={currentStep === 0}
                    className="p-4 rounded-xl bg-[#262421] text-[#989795] hover:text-white hover:bg-[#3d3b38] disabled:opacity-0 disabled:pointer-events-none transition shadow-lg border-b-4 border-[#1f1e1b] active:border-b-0 active:translate-y-1"
                >
                    <ArrowLeft size={24} strokeWidth={3} />
                </button>

                <button
                    onClick={handleNext}
                    disabled={isLastSlide} // Disable Next on the final slide (EndSlide handles its own actions)
                    className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-xl font-black text-xl transition-all shadow-lg border-b-4 active:border-b-0 active:translate-y-1 disabled:opacity-0 disabled:pointer-events-none
                    ${isFirstSlide
                        ? 'bg-[#81b64c] border-[#457524] text-white animate-pulse hover:bg-[#72a341]'
                        : 'bg-[#81b64c] border-[#457524] text-white hover:bg-[#72a341]'
                    }`}
                >
                    {isFirstSlide ? "LET'S GO" : "NEXT"}
                    {isFirstSlide ? <Rocket size={24} strokeWidth={3} /> : <ArrowRight size={24} strokeWidth={3} />}
                </button>
            </div>
        </div>
    );
}