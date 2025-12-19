'use client';

import Link from 'next/link';
import { Github } from 'lucide-react';
import { useState } from 'react';
import { LegalModal } from './LegalModal';
import { Card } from '../ui/card';

export function Header() {
    const [isLegalOpen, setIsLegalOpen] = useState(false);

    return (
        <>
            <header className="fixed top-0 left-0 w-full p-6 flex justify-between items-center z-50 pointer-events-none">
                <Link href="/" className="pointer-events-auto transition-transform hover:scale-105">
                    <Card variant="glass" className="flex items-center gap-3 px-4 py-2 rounded-2xl">
                        <img src="/icon.png" alt="Logo" className="w-8 h-8 rounded-lg shadow-sm" />
                        <span className="text-white font-black tracking-wider text-sm hidden sm:block">
                            CHESS WRAPPED
                        </span>
                    </Card>
                </Link>

                <div className="flex items-center gap-3 pointer-events-auto">
                    <button
                        onClick={() => setIsLegalOpen(true)}
                        className="text-white/50 hover:text-white text-xs font-bold uppercase tracking-widest px-3 py-2 transition-colors"
                    >
                        Legal
                    </button>

                    <Link
                        href="https://github.com/HuynhMaiThienAn/Chess-Wrapped"
                        target="_blank"
                        className="bg-black/30 backdrop-blur-md p-2.5 rounded-xl border border-white/10 text-white hover:bg-white hover:text-black transition-all"
                    >
                        <Github size={20} />
                    </Link>
                </div>
            </header>

            <LegalModal isOpen={isLegalOpen} onClose={() => setIsLegalOpen(false)} />
        </>
    );
}