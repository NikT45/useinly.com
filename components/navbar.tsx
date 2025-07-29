"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Navbar() {
    return (
        <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[95%] max-w-6xl">
            <div className="backdrop-blur-md bg-white/10 dark:bg-black/10 border border-white/20 dark:border-white/10 rounded-2xl shadow-lg shadow-black/5 dark:shadow-black/20">
                <div className="px-6 py-4 flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-brand-coral to-brand-berry rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-sm">AT</span>
                        </div>
                        <span className="font-semibold text-lg text-foreground">AI Therapy</span>
                    </Link>

                    {/* Navigation Links */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link
                            href="/home"
                            className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
                        >
                            Home
                        </Link>
                        <Link
                            href="/reflections"
                            className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
                        >
                            Reflections
                        </Link>
                        <Link
                            href="/insights"
                            className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
                        >
                            Insights
                        </Link>
                        <Link
                            href="/pricing"
                            className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
                        >
                            Pricing
                        </Link>
                    </div>



                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <Button variant="ghost" size="icon" className="h-9 w-9">
                            <svg
                                className="h-5 w-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        </Button>
                    </div>
                </div>
            </div>
        </nav>
    );
} 