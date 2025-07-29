"use client";

import { Navbar } from "@/components/navbar";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Home() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Calculate rotation based on scroll position
  // Start at 15 degrees (tilted forward) and go to 0 degrees (flat)
  const maxScroll = 500; // Adjust this value to control how much scroll is needed
  const rotation = Math.max(15 - (scrollY / maxScroll) * 15, 0);
  const scale = Math.min(1 + (scrollY / maxScroll) * 0.1, 1.1);

  return (
    <motion.div
      className="min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Navbar />

      {/* Animated curved vector line - positioned to hit top of screen */}
      <div className="absolute top-0 left-0 w-full h-screen overflow-hidden pointer-events-none">
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1440 1086"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="curveGradient" x1="808.5" y1="222.5" x2="801.5" y2="1258.5" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFA5AB" />
              <stop offset="0.798077" stopColor="#A53860" />
            </linearGradient>
          </defs>
          <path
            d="M1613.5 -69C1421.5 856 665.8 892.6 -273 911"
            stroke="url(#curveGradient)"
            strokeWidth="370"
            fill="none"
            style={{
              animation: "float 6s ease-in-out infinite",
            }}
          />
        </svg>
      </div>

      {/* Main Content with padding to account for fixed navbar */}
      <main className="pt-40 px-4 relative z-10">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-wine">
            Support, <span className="gradient-text">Whenever</span> You Need It
          </h1>
          <h2 className="text-lg md:text-xl lg:text-[24px] font-semibold text-brand-coral max-w-2xl mx-auto mt-12">
            Break old patterns, build healthier habits,<br />
            and feel supported every step of the way.
          </h2>
          <div className="flex justify-center mt-12">
            <Link href="/signup" className="bg-brand-berry text-white px-6 py-3 rounded-2xl text-lg font-semibold hover:bg-brand-coral transition-colors">
              Start Chatting For Free
            </Link>
          </div>
          
          {/* Parallax Image */}
          <div className="mt-16 flex justify-center perspective-1000">
            <div
              className="transition-transform duration-100 ease-out"
              style={{
                transform: `rotateX(${rotation}deg) scale(${scale})`,
                transformStyle: 'preserve-3d',
              }}
            >
              <img
                src="/images/localhost_3000_home (2).png"
                alt="AI Therapy App Interface"
                width={512}
                height={512}
                className="mx-auto rounded-2xl object-cover shadow-2xl max-w-full h-auto"
                draggable={false}
              />
            </div>
          </div>
        </div>
      </main>

      {/* Add some extra content to enable scrolling for the parallax effect */}
      <div className="h-screen"></div>

      <style jsx global>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          25% {
            transform: translateY(-3px) translateX(2px);
          }
          50% {
            transform: translateY(-5px) translateX(0px);
          }
          75% {
            transform: translateY(-3px) translateX(-2px);
          }
        }
        
        .gradient-text {
          background: linear-gradient(90deg, #A53860, #D2B48C);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-fill-color: transparent;
        }

        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </motion.div>
  );
}
