'use client';

import { X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { Card } from '../ui/card';

interface LegalModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function LegalModal({ isOpen, onClose }: LegalModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                    />

                    {/* Content Wrapper for Animation */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="relative z-10 w-full max-w-md"
                    >
                        <Card className="relative p-6">
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 text-white/50 hover:text-white"
                            >
                                <X size={24} />
                            </button>

                            <h2 className="text-xl font-bold text-white mb-4">Legal Disclaimer</h2>
                            <div className="text-white/70 text-sm space-y-4">
                                <p>
                                    Chess Wrapped is an unofficial fan project and is not affiliated with, endorsed by, or sponsored by Chess.com.
                                </p>
                                <p>
                                    All chess data and assets are retrieved via the public Chess.com API.
                                    We do not store your passwords or private account data.
                                </p>
                                <p>
                                    Created for educational and entertainment purposes only.
                                </p>
                            </div>
                        </Card>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}