'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Star, Github, X, Shield, Lightbulb, Zap, ChessKing, Mail, UserPlus } from 'lucide-react';

// --- 1. MODAL CONTENT DEFINITIONS ---
// Removed 'feedback' from the type since it's now a direct link
type ModalContentKey = 'none' | 'guide' | 'features' | 'legal';

const MODAL_CONTENT = {
    guide: {
        title: "How It Works",
        icon: Lightbulb,
        color: 'text-[#81b64c]',
        body: (
            <div className="space-y-4">
                <p>1. Type your chess.com username.</p>
                <p>2. Click START! or press Enter.</p>
                <p>3. Don't have an account? bro just make one :b</p>
            </div>
        )
    },
    features: {
        title: "Key Features",
        icon: Zap,
        color: 'text-[#ffc800]',
        body: (
            <div className="space-y-4">
                <p>It's a year wrap for chess (inspired by Spotify Wrapped). It showcases your chess journey in 2025</p>
                <p className="font-bold text-[#ffc800]">NO SPOILERS HERE {'>'}:)</p>
            </div>
        )
    },
    legal: {
        title: "Legal & Contact",
        icon: Shield,
        color: 'text-white',
        body: (
            <div className="space-y-6 text-sm">

                {/* Contact Section */}
                <div className="bg-[#3e3c39] p-4 rounded-xl border border-white/10">
                    <h4 className="text-[#81b64c] font-bold text-lg mb-2 flex items-center gap-2">
                        <Mail size={16} /> Contact Us
                    </h4>
                    <p className="mb-2">For support, bug reports, or inquiries, please contact me:</p>
                    <a
                        href="mailto:huynhmaithienan.2005@gmail.com"
                        className="text-[#ffc800] hover:underline font-bold break-all"
                    >
                        huynhmaithienan.2005@gmail.com
                    </a>
                </div>

                {/* Terms of Service */}
                <div>
                    <h4 className="text-white font-bold text-lg mb-2 border-b border-white/20 pb-1">1. Terms of Service</h4>
                    <p className="mb-2 text-justify">
                        <strong>Disclaimer:</strong> ChessWrapped is an independent, open-source hobby project and is <span className="text-[#ffc800]">not affiliated, endorsed, or sponsored by Chess.com</span>.
                    </p>
                    <p className="text-justify">
                        By using this website, you acknowledge that we simply visualize public data available via the Chess.com Public API. We are not responsible for any inaccuracies in the data provided by the third-party API. Also pls don't DDOS the web :(
                    </p>
                </div>

                {/* Privacy Policy */}
                <div>
                    <h4 className="text-white font-bold text-lg mb-2 border-b border-white/20 pb-1">2. Privacy Policy</h4>
                    <ul className="list-disc list-inside space-y-2 text-[#c3c2c1]">
                        <li><strong>No Data Storage:</strong> We do not store your passwords, or personal credentials so don't worry :{'>'}</li>
                        <li><strong>Public Data Only:</strong> We only access data that is already publicly available on your Chess.com profile (including all your blunders ya know)</li>
                        <li><strong>Cookies:</strong> We do not use tracking cookies or sell your data to third parties. But we do have da riel cookie 🍪</li>
                    </ul>
                </div>

                <div className="pt-4 border-t border-white/10 text-center text-xs text-[#989795]">
                    © 2025 ChessWrapped. All rights reserved.
                </div>
            </div>
        ),
    },
};

// --- 2. REUSABLE MODAL COMPONENT ---
const HeaderModal = ({ contentKey, onClose }: { contentKey: ModalContentKey, onClose: () => void }) => {
    if (contentKey === 'none') return null;

    const content = MODAL_CONTENT[contentKey as ValidModalKey];
    const Icon = content.icon;

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center font-bubbly p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
            >
                <motion.div
                    className="bg-[#262421] rounded-3xl p-6 md:p-8 max-w-lg w-full shadow-2xl border-4 border-white/20 flex flex-col max-h-[85vh]"
                    initial={{ scale: 0.8, y: -50 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.8, y: -50 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    onClick={e => e.stopPropagation()}
                >
                    {/* Modal Header (Fixed) */}
                    <div className="flex justify-between items-start mb-4 shrink-0">
                        <div className="flex items-center gap-3">
                            <Icon size={28} className={`${content.color} drop-shadow-md`} />
                            <h3 className="text-2xl font-bold text-white">{content.title}</h3>
                        </div>
                        <button onClick={onClose} className="text-white/80 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10">
                            <X size={24} />
                        </button>
                    </div>

                    {/* Modal Body (Scrollable) */}
                    <div className="text-left text-[#c3c2c1] overflow-y-auto pr-2 custom-scrollbar">
                        {typeof content.body === 'string' ? (
                            <p className="whitespace-pre-line">{content.body}</p>
                        ) : (
                            content.body
                        )}
                    </div>

                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};
type ValidModalKey = Exclude<ModalContentKey, 'none'>;


// --- 3. MAIN HEADER COMPONENT ---
export default function Header() {
    const [modalContent, setModalContent] = useState<ModalContentKey>('none');

    // --- Sound Effect Logic ---
    const playHoverSound = () => {
        try {
            const audio = new Audio('/hover.mp3');
            audio.volume = 0.5;
            audio.play().catch(() => {});
        } catch (e) {
            console.error("Audio play failed", e);
        }
    };

    const handleModalOpen = (key: ModalContentKey) => {
        setModalContent(key);
    };

    const handleModalClose = () => {
        setModalContent('none');
    };

    return (
        <header className="w-full fixed top-0 z-50 py-3 font-bubbly">
            <div className="max-w-7xl mx-auto px-4 flex justify-between items-center bg-[#302e2b] rounded-full shadow-xl border-4 border-[#262421]">

                {/* 1. Logo/Home Link */}
                <Link
                    href="/"
                    onMouseEnter={playHoverSound}
                    className="flex items-center gap-2 p-2 transition-transform hover:scale-105"
                >
                    <div className="bg-[#81b64c] p-2 rounded-full shadow-md">
                        <ChessKing size={20} className="text-white" strokeWidth={3} />
                    </div>
                    <span className="text-2xl font-black text-white tracking-tight">
                        Chess<span className="text-[#ffc800]">Wrapped</span>
                    </span>
                </Link>

                {/* 2. Nav Links */}
                <nav className="hidden md:flex items-center gap-2 md:gap-4 text-sm font-bold text-white/80">
                    <button
                        onMouseEnter={playHoverSound}
                        onClick={() => handleModalOpen('guide')}
                        className="hover:text-[#ffc800] transition-colors p-2 rounded-lg"
                    >
                        How It Works
                    </button>

                    <button
                        onMouseEnter={playHoverSound}
                        onClick={() => handleModalOpen('features')}
                        className="hover:text-[#ffc800] transition-colors p-2 rounded-lg"
                    >
                        Features
                    </button>

                    <button
                        onMouseEnter={playHoverSound}
                        onClick={() => handleModalOpen('legal')}
                        className="hover:text-[#ffc800] transition-colors p-2 rounded-lg flex items-center gap-1"
                    >
                        Policy & Legal
                    </button>
                </nav>

                {/* 3. Action Buttons */}
                <div className="flex gap-2 items-center">

                    {/* Add Friend Button */}
                    <Link
                        href="https://www.chess.com/member/aan_huynh"
                        target="_blank"
                        onMouseEnter={playHoverSound}
                        className="bg-[#81b64c] hover:bg-[#72a341] text-white font-bold px-4 py-2 rounded-full shadow-[0_4px_0_#457524] active:shadow-none active:translate-y-[4px] transition-all flex items-center gap-2 border-2 border-[#81b64c]"
                    >
                        <UserPlus size={16} /> <span className="hidden sm:inline">Add Friend?</span>
                    </Link>

                    {/* Feedback Button (Now a Link) */}
                    <Link
                        href="https://forms.gle/Eweg1RtYs9is9p6x5" // REPLACE THIS WITH YOUR FORM LINK
                        target="_blank"
                        onMouseEnter={playHoverSound}
                        className="hidden sm:flex bg-[#ffc800] hover:bg-[#e6b800] text-[#302e2b] font-bold px-4 py-2 rounded-full shadow-[0_4px_0_#b38b00] active:shadow-none active:translate-y-[4px] transition-all items-center gap-2 border-2 border-[#ffc800]"
                    >
                        <Star size={16} fill="currentColor" /> <span className="hidden md:inline">Feedback</span>
                    </Link>

                    {/* GitHub Button */}
                    <Link
                        href="https://github.com/huynhmaithienan/Chess-wrapped"
                        target="_blank"
                        onMouseEnter={playHoverSound}
                        className="bg-[#3e3c39] hover:bg-[#52525b] text-white font-bold px-4 py-2 rounded-full shadow-[0_4px_0_#262421] active:shadow-none active:translate-y-[4px] transition-all flex items-center gap-2 border-2 border-[#3e3c39]"
                    >
                        <Github size={16} /> <span className="hidden sm:inline">GitHub</span>
                    </Link>

                </div>
            </div>

            {/* Modal Renderer */}
            <HeaderModal contentKey={modalContent} onClose={handleModalClose} />
        </header>
    );
}