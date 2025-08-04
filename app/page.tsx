"use client";

import { Navbar } from "@/components/navbar";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import ShinyText from "@/components/ShinyText";
import { Footer } from "@/components/footer";
import { AnimatedText } from "@/components/AnimatedText";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        router.push("/home");
      }
    };

    checkUser();
  }, [router]);

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
  const rotation = Math.max(20 - (scrollY / maxScroll) * 20, 0);
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
          <AnimatedText 
            text="Support, Whenever You Need It" 
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-wine"
            delay={0.2}
            staggerChildren={0.1}
          />
          <motion.h2 
            className="text-lg md:text-xl lg:text-[24px] font-semibold text-brand-berry max-w-2xl mx-auto mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            Break old patterns, build healthier habits,<br />
            and feel supported every step of the way.
          </motion.h2>
          <motion.div 
            className="flex justify-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <Link href="/signup" className="bg-brand-berry px-6 py-3 rounded-2xl text-lg font-semibold hover:bg-brand-coral transition-colors text-white">
              Start Chatting For Free
            </Link>
          </motion.div>

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
                src="/images/homePage.png"
                alt="AI Therapy App Interface"
                width={512}
                height={512}
                className="mx-auto rounded-2xl object-cover shadow-2xl max-w-full h-auto"
                draggable={false}
              />
            </div>
          </div>
        </div>

        {/* Personalized Support Section
        <div className="mt-32 text-center gap-32">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-wine">
            Personalized Support, Any Time
          </h2>

          {/* Layered Circles with User Icon 
          <div className="mt-12 flex justify-center">
            <div className="relative">
              {/* Outermost circle - Gradient from Soft Pink to Coral 
                {/* Middle circle - Gradient from Coral to Berry 
                  {/* Innermost circle - Gradient from Berry to Wine 
                  <div className="w-96 h-96 md:w-36 lg:w-48 md:h-36 lg:h-48 rounded-full bg-gradient-to-br from-brand-berry to-brand-wine flex items-center justify-center">
                    {/* User Icon 
                    <User className="w-12 h-12 md:w-16 lg:w-24 md:h-16 lg:h-24 text-white" />
                  </div>
                </div>
          </div> */}

        {/* Description text 
          <div className="mt-12 flex flex-col">
            <p className="text-lg md:text-xl text-brand-berry max-w-3xl mx-auto mt-8 px-4 font-medium">
              Our AI learns about your habits, patterns, and goals, adapting its guidance so every conversation feels personal and meaningful
            </p>
          </div>
        </div> */}

        {/* Gradient Divider */}
        {/* <div className="mt-16 h-32 -mx-4 bg-gradient-to-b from-brand-softPink to-transparent opacity-30"></div> */}

        {/* Daily Reflections Section */}
        <div className="mt-48 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-wine">
            Daily Reflections, <span className="gradient-text">Simplified</span>
          </h2>

          {/* Reflection Image */}
          <div className="mt-16 mb-12">
            <img
              src="/images/reflection.png"
              alt="Daily Reflections Interface"
              width={512}
              height={512}
              className="mx-auto rounded-lg object-cover shadow-2xl w-4/5 md:w-full max-w-md md:max-w-lg lg:max-w-xl h-auto"
              draggable={false}
            />
          </div>

          {/* Description text */}
          <div className="mt-12 flex flex-col">
            <p className="text-lg md:text-xl text-brand-berry max-w-3xl mx-auto mt-8 px-4 font-medium">
              Reflect on your day with quick journals and guided prompts that help you explore your thoughts without overthinking.
            </p>
          </div>
        </div>

        {/* Weekly Insights Section */}
        <div className="mt-32 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-wine">
            Weekly <span className="gradient-text">Personalized</span> Insights
          </h2>

          {/* Insights Image */}
          <div className="mt-16 mb-12">
            <img
              src="/images/insights.png"
              alt="Weekly Insights Interface"
              width={512}
              height={512}
              className="mx-auto rounded-lg object-cover shadow-2xl w-4/5 md:w-full max-w-md md:max-w-lg lg:max-w-xl h-auto"
              draggable={false}
            />
          </div>

          {/* Description text */}
          <div className="mt-12 flex flex-col">
            <p className="text-lg md:text-xl text-brand-berry max-w-3xl mx-auto mt-8 px-4 font-medium">
              Discover patterns in your thoughts and behaviors with AI-powered weekly summaries that reveal meaningful trends and celebrate your growth.
            </p>
          </div>
</div>
 
       </main>
       <Footer />
      {/* Add some extra content to enable scrolling for the parallax effect */}
      {/* <div className="h-screen"></div> */}

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
