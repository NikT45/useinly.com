"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[95%] max-w-6xl">
            <div className="navbar-backdrop bg-white/10 dark:bg-black/10 border border-white/20 dark:border-white/10 rounded-2xl shadow-lg shadow-black/5 dark:shadow-black/20">
                <div className="px-6 py-4 flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-brand-coral to-brand-berry rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-sm">IN</span>
                        </div>
                        <span className="font-semibold text-lg text-foreground">Inly</span>
                    </Link>

                    {/* Navigation Links - Desktop */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link
                            href="/pricing"
                            className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
                        >
                            Pricing
                        </Link>
                        <Link
                            href="/privacy"
                            className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
                        >
                            Privacy
                        </Link>
                        <Link
                            href="/terms"
                            className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
                        >
                            Terms
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-9 w-9"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            <svg
                                className="h-5 w-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                {isMenuOpen ? (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                )}
                            </svg>
                        </Button>
                    </div>
                </div>

                {/* Mobile Menu Dropdown */}
                {isMenuOpen && (
                    <div className="md:hidden px-6 py-4 border-t border-white/20 dark:border-white/10">
                        <div className="flex flex-col space-y-4">
                            <Link
                                href="/pricing"
                                className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors py-2"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Pricing
                            </Link>
                            <Link
                                href="/privacy"
                                className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors py-2"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Privacy
                            </Link>
                            <Link
                                href="/terms"
                                className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors py-2"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Terms
                            </Link>
                        </div>
                    </div>
                )}
            </div>
            
            {/* Custom CSS for backdrop filter with webkit prefix */}
            <style jsx global>{`
                .navbar-backdrop {
                    backdrop-filter: blur(12px);
                    -webkit-backdrop-filter: blur(12px);
                }
            `}</style>
        </nav>
    );
}