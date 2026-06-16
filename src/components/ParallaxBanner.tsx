/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import EditableText from "./EditableText";

interface ParallaxBannerProps {
  onLearnMore?: () => void;
  onDonate?: () => void;
}

export default function ParallaxBanner({ onLearnMore, onDonate }: ParallaxBannerProps) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Soft Parallax offsets
  const backgroundY = Math.min(scrollY * 0.45, 400); 
  const foregroundY = Math.min(scrollY * 0.15, 120);

  return (
    <div className="relative h-[550px] md:h-[650px] overflow-hidden rounded-3xl border border-neutral-200 bg-neutral-50 my-8 flex items-center justify-center text-center px-4">
      {/* Decorative Parallax Background Layer */}
      <div
        className="absolute inset-0 pointer-events-none select-none z-0"
        style={{
          transform: `translateY(${backgroundY}px)`,
          transition: "transform 0.1s ease-out-stroke",
          willChange: "transform"
        }}
      >
        {/* Soft glowing spheres */}
        <div className="absolute top-1/4 left-1/3 w-96 h-96 rounded-full bg-neutral-200/20 blur-[100px] animate-pulse-slow" />
      </div>

      {/* Main Foreground Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        
        <h1 className="font-display font-medium tracking-tight text-neutral-900 leading-[1.1] mb-6 select-none text-4xl sm:text-5xl md:text-7xl">
          <EditableText id="home.banner.title1" element="span">Healing Communities.</EditableText>
          <br />
          <EditableText id="home.banner.title2" element="span" className="text-neutral-700 italic">Restoring Hope.</EditableText>
        </h1>

        <EditableText id="home.banner.subtitle" className="font-sans text-neutral-600 font-normal leading-relaxed max-w-2xl mx-auto text-sm sm:text-base md:text-lg mb-10 text-balance px-4">
          One Health brings together critical healthcare, genuine faith, agricultural skills, and environmental action to serve vulnerable townships and rural communities in South Africa and other countries across Africa.
        </EditableText>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={onLearnMore}
            className="group outline-none border border-blue-600 bg-blue-600 text-white font-bold tracking-wide text-sm px-8 py-4 rounded-xl cursor-pointer hover:bg-blue-700 hover:shadow-[0_0_20px_rgba(37,99,235,0.45)] transition-all active:scale-[0.98] duration-300 shadow-sm flex items-center gap-2"
          >
            <EditableText id="home.banner.btn1" element="span">Learn Our Story</EditableText>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform animate-pulse" />
          </button>
          
          <button
            onClick={onDonate}
            className="group outline-none border border-emerald-600 bg-emerald-600 text-white font-bold tracking-wide text-sm px-8 py-4 rounded-xl cursor-pointer hover:bg-emerald-700 hover:shadow-[0_0_20px_rgba(16,185,129,0.45)] transition-all active:scale-[0.98] duration-300 flex items-center gap-2"
          >
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping inline-block mr-1"></span>
            <EditableText id="home.banner.btn2" element="span">Donate as supporter</EditableText>
          </button>
        </div>

        {/* Fine subtext mimicking top tier web agencies */}
        <div className="mt-16 text-neutral-400 text-xs font-mono max-w-md mx-auto hidden md:block">
          <EditableText id="home.banner.mono" element="span">
            REVOLUTIONIZING GRASSROOTS CLINICS & ENVIRONMENTAL HEALTH DIRECT IN KWAZULU-NATAL & BEYOND
          </EditableText>
        </div>
      </div>
    </div>
  );
}
