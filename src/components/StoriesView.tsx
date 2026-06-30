/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState, useEffect } from "react";
import { 
  Compass, 
  MapPin, 
  ArrowLeft, 
  ArrowRight, 
  Play, 
  Film, 
  Image as ImageIcon, 
  Heart, 
  Sparkles, 
  ExternalLink,
  Users,
  CheckCircle,
  Calendar
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import EditableText from "./EditableText";

// Import the Mozambique assets directly from root level so Vite bundles them properly in production
// @ts-ignore
import mozambiquePng from "../../Mozambique.png";
// @ts-ignore
import mozambique1Png from "../../Mozambique1.png";
// @ts-ignore
import mozambiqueMp4 from "../../Mozambique.mp4";
// @ts-ignore
import fowardDurbanMp4 from "../../Foward Durban.mp4";

interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  badge: string;
  type: "image" | "video";
  src: string;
  description: string;
  details: string[];
  color: string;
  partnership?: string;
  subtitle?: string;
}

export default function StoriesView() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeCard, setActiveCard] = useState(0);
  const [showDetailedModal, setShowDetailedModal] = useState<TimelineEvent | null>(null);

  const events: TimelineEvent[] = [
    {
      id: "1",
      date: "July 12, 2025",
      title: "Strategic Alliance Briefing",
      badge: "Alliance Launch",
      type: "image",
      src: mozambiquePng,
      description: "One Health officially launched a historic partnership with CAPRO missions network. Clinical staff and regional coordinators mapped high-need areas across Namita.",
      details: [
        "Co-signed outreach blueprint with CAPRO field leads",
        "Dispatched initial diagnostic dental kits to Namita central hub",
        "Aligned theological counseling and clinical checklists"
      ],
      color: "from-emerald-500 to-teal-600",
      partnership: "One Health × CAPRO Co-op",
      subtitle: "CAPRO Support"
    },
    {
      id: "2",
      date: "July 18, 2025",
      title: "Namita Clinical Mobilization",
      badge: "Field Operations",
      type: "image",
      src: mozambique1Png,
      description: "Setting up our clinical basecamp in Namita. Hundreds of local children and families gathered to receive primary screenings, dental fillings, and professional hygiene kits.",
      details: [
        "Established pop-up clinical dental chairs with portable power",
        "Treated over 450 pupils from local community schools",
        "Distributed organic food-seeding manuals to caretakers"
      ],
      color: "from-blue-500 to-indigo-600",
      partnership: "One Health × ACF × CAPRO Co-op",
      subtitle: "ACF × CAPRO Support"
    },
    {
      id: "3",
      date: "July 24, 2025",
      title: "Namita Documentary Release",
      badge: "Media Record",
      type: "video",
      src: mozambiqueMp4,
      description: "A comprehensive documentary capture recording of the collaborative impact, clinical treatments, and community smiles across our Mozambique trip.",
      details: [
        "10-minute on-site cinema compilation",
        "Interviews with local school leaders and ACF coordinators",
        "Capturing real-time restorative clinic smile transitions"
      ],
      color: "from-amber-500 to-rose-600",
      partnership: "One Health × ACF × CAPRO Co-op",
      subtitle: "ACF × CAPRO Support"
    },
    {
      id: "4",
      date: "October 5, 2025",
      title: "City Wide Transformation",
      badge: "Transformation",
      type: "video",
      src: fowardDurbanMp4,
      description: "Wyebank Kloof - Partnering with our local government officials to support City Wide Transformation through One Health and Foward Durban.",
      details: [
        "Aligned with municipal transformation teams and ward leaders",
        "Established healthcare access blueprint for Wyebank Kloof",
        "Empowered localized dental campaigns and social upliftment frameworks"
      ],
      color: "from-violet-500 to-purple-600",
      partnership: "One Health × Foward Durban",
      subtitle: "Government & Civic Partnership"
    }
  ];

  // Monitor horizontal scroll to update timeline progress and active state
  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    
    // Scroll progress bar math
    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll > 0) {
      setScrollProgress(scrollLeft / maxScroll);
    }

    // Active card selection based on center position
    const cardWidth = 480; // approximate width + gap
    const index = Math.round(scrollLeft / cardWidth);
    if (index >= 0 && index < events.length) {
      setActiveCard(index);
    }
  };

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (el) {
      el.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (el) el.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollLeftBtn = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -420, behavior: "smooth" });
    }
  };

  const scrollRightBtn = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 420, behavior: "smooth" });
    }
  };

  return (
    <div className="space-y-12 py-8 animate-fadeIn text-left">
      
      {/* 1. Header with Partnership Highlight and Mozambique flag */}
      <div className="text-center max-w-4xl mx-auto space-y-6">
        <span className="text-emerald-700 font-mono text-[10px] uppercase tracking-widest px-3 py-1.5 border border-emerald-200 rounded-full bg-emerald-50/50 block w-fit mx-auto font-bold shadow-sm">
          🌟 Mozambique Expedition Portfolio
        </span>
        
        <h2 className="font-display font-bold text-3xl sm:text-5xl text-neutral-900 tracking-tight leading-tight">
          Mission Stories
        </h2>
        
        {/* Highlighted Partnership Banner */}
        <div className="p-6 border border-neutral-200 bg-neutral-50/80 backdrop-blur-sm rounded-3xl max-w-3xl mx-auto space-y-3 relative overflow-hidden group hover:border-neutral-900 transition-colors duration-300">
          <div className="absolute right-0 top-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />
          <div className="flex justify-center items-center gap-2 text-neutral-500 font-mono text-xs">
            <Compass size={14} className="text-emerald-600" />
            <span>Featured Partnership Chronology</span>
          </div>
          
          <p className="text-neutral-900 text-sm sm:text-lg font-medium leading-relaxed font-sans max-w-2xl mx-auto text-balance">
            <EditableText id="stories.banner.partnership" element="span">
              One Health in Partnership with CAPRO Missions Network - in Namita Mozambique 🇲🇿 July 2025
            </EditableText>
          </p>
          
          <div className="flex justify-center gap-4 text-[10px] text-neutral-400 font-mono uppercase tracking-widest pt-2">
            <span>Clinical Healthcare</span>
            <span>•</span>
            <span>Theological Counseling</span>
            <span>•</span>
            <span>Sustenance</span>
          </div>
        </div>
      </div>

      {/* 2. Scroll Indicators and Action Button Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 max-w-6xl mx-auto px-4 select-none">
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-neutral-500">Timeline Axis</span>
          <div className="w-48 h-1.5 bg-neutral-150 rounded-full overflow-hidden relative border border-neutral-200">
            <div 
              className="absolute top-0 left-0 h-full bg-neutral-900 rounded-full transition-all duration-100 ease-out"
              style={{ width: `${scrollProgress * 100}%` }}
            />
          </div>
          <span className="text-xs font-mono font-bold text-neutral-800">
            {Math.round(scrollProgress * 100)}%
          </span>
        </div>

        {/* Buttons to navigate timeline left/right */}
        <div className="flex items-center gap-3">
          <button
            onClick={scrollLeftBtn}
            className="p-3 border border-neutral-200 rounded-2xl hover:border-neutral-900 bg-white text-neutral-600 hover:text-neutral-900 transition-all cursor-pointer shadow-sm hover:shadow-md outline-none"
            aria-label="Scroll Left"
          >
            <ArrowLeft size={16} />
          </button>
          <span className="text-xs font-mono font-semibold text-neutral-400">
            Swipe to Explore
          </span>
          <button
            onClick={scrollRightBtn}
            className="p-3 border border-neutral-200 rounded-2xl hover:border-neutral-900 bg-white text-neutral-600 hover:text-neutral-900 transition-all cursor-pointer shadow-sm hover:shadow-md outline-none"
            aria-label="Scroll Right"
          >
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* 3. Horizontal Swiping Timeline Track */}
      <div className="relative max-w-7xl mx-auto">
        {/* Running timeline track axis behind cards */}
        <div className="absolute top-[35px] left-8 right-8 h-0.5 border-t border-dashed border-neutral-300 pointer-events-none z-0" />
        
        {/* Swiping track container */}
        <div 
          ref={scrollContainerRef}
          className="flex flex-row overflow-x-auto gap-6 sm:gap-10 pb-8 pt-4 px-8 scrollbar-hide snap-x snap-mandatory scroll-smooth relative z-10"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {events.map((event, index) => {
            const isSelected = activeCard === index;
            return (
              <div 
                key={event.id}
                className="w-[290px] xs:w-[350px] sm:w-[460px] shrink-0 snap-center flex flex-col items-center"
              >
                
                {/* Timeline axis dot node above card */}
                <div className="flex flex-col items-center mb-6 relative select-none">
                  <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-500 shadow-sm ${
                    isSelected 
                      ? "bg-neutral-900 border-neutral-900 text-white scale-110" 
                      : "bg-white border-neutral-300 text-neutral-400 hover:border-neutral-900 hover:text-neutral-900"
                  }`}>
                    {event.type === "video" ? <Film size={14} /> : <ImageIcon size={14} />}
                  </div>
                  <span className={`text-[10px] font-mono uppercase tracking-widest font-semibold mt-2.5 transition-colors duration-300 ${
                    isSelected ? "text-neutral-900 font-bold" : "text-neutral-400"
                  }`}>
                    {event.date}
                  </span>
                </div>

                {/* Event Card */}
                <div className={`w-full bg-white border rounded-3xl overflow-hidden transition-all duration-500 flex flex-col text-left shadow-sm hover:shadow-xl hover:border-neutral-900 ${
                  isSelected ? "border-neutral-800 ring-1 ring-neutral-800/10 shadow-lg" : "border-neutral-200"
                }`}>
                  
                  {/* Media Frame wrapper */}
                  <div className="aspect-[16/10] bg-neutral-950 relative overflow-hidden group border-b border-neutral-100 flex items-center justify-center">
                    
                    {event.type === "video" ? (
                      <div className="w-full h-full relative">
                        {/* Render real video element */}
                        <video 
                          src={event.src}
                          controls
                          className="w-full h-full object-cover"
                          preload="metadata"
                          playsInline
                        />
                        {/* High-fidelity custom player design fallback when empty/not playing */}
                        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent flex flex-col justify-end p-4 pointer-events-none">
                          <span className="text-white text-xs font-bold font-sans flex items-center gap-1.5 uppercase tracking-wide">
                            <Play size={10} className="fill-current text-amber-400" />
                            {event.partnership || "CAPRO × One Health Film Reel"}
                          </span>
                          <span className="text-neutral-300 text-[10px] font-mono mt-0.5">
                            {event.id === "4" ? "foward_durban.mp4" : "mozambique_namita_outreach.mp4"}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="w-full h-full relative">
                        {/* Render real image element */}
                        <img 
                          src={event.src} 
                          alt={event.title}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                          onError={(e) => {
                            // Suppress broken visual triggers by providing beautiful placeholder color cards
                            e.currentTarget.style.display = "none";
                          }}
                          referrerPolicy="no-referrer"
                        />
                        
                        {/* High-fidelity overlay placeholder that matches branding if image is empty/not rendered */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-neutral-900 via-neutral-900/40 to-neutral-800/20 flex flex-col justify-between p-5 text-white">
                          <div className="flex justify-between items-start">
                            <span className="text-[9px] uppercase tracking-widest font-mono font-bold px-2 py-1 rounded bg-white/10 backdrop-blur-sm border border-white/20">
                              Archival Record
                            </span>
                            <span className="text-white/40"><ImageIcon size={16} /></span>
                          </div>
                          
                          <div className="space-y-1">
                            <span className="text-[11px] font-sans text-neutral-200 flex items-center gap-1">
                              <MapPin size={10} className="text-emerald-400" />
                              {event.id === "4" ? "Wyebank Kloof, Durban" : "Namita, Mozambique 🇲🇿"}
                            </span>
                            <h4 className="font-display font-medium text-sm text-white">
                              {event.title}
                            </h4>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Card Content block */}
                  <div className="p-6 space-y-4 flex-grow flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] font-mono font-bold uppercase tracking-widest px-2.5 py-1 bg-neutral-100 border border-neutral-200 rounded-full text-neutral-600">
                          {event.badge}
                        </span>
                        <span className="text-[10px] font-mono text-neutral-400">
                          {event.subtitle || "ACF × CAPRO Support"}
                        </span>
                      </div>
                      
                      <h3 className="font-display font-bold text-lg text-neutral-950 group-hover:text-emerald-700 transition-colors">
                        {event.title}
                      </h3>
                      
                      <p className="text-xs text-neutral-600 leading-relaxed font-sans line-clamp-3">
                        {event.description}
                      </p>
                    </div>

                    {/* Interactive triggers in card */}
                    <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
                      <button 
                        onClick={() => setShowDetailedModal(event)}
                        className="text-xs font-semibold text-neutral-900 hover:text-emerald-700 transition-colors duration-200 outline-none cursor-pointer flex items-center gap-1.5"
                      >
                        <span>View Mission Log</span>
                        <ExternalLink size={12} />
                      </button>
                      
                      <span className="text-[10px] text-neutral-400 font-mono font-medium">
                        0{index + 1} / 0{events.length}
                      </span>
                    </div>

                  </div>

                </div>

              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Bottom Mission Impact Summary Callout */}
      <div className="max-w-4xl mx-auto px-4 select-none">
        <div className="border border-neutral-200 bg-neutral-50/50 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 text-left">
          <div className="space-y-2">
            <h4 className="font-display font-bold text-neutral-900 text-base sm:text-lg flex items-center gap-2">
              <Sparkles size={16} className="text-emerald-600" />
              Sponsor Future Continental Outposts
            </h4>
            <p className="text-neutral-500 text-xs sm:text-sm leading-relaxed max-w-xl">
              Our Mozambique 2025 mission successfully demonstrated the powerful synergy of united theological support and immediate clinical intervention. Help us scale these cross-border dental units for coming clinics.
            </p>
          </div>
          <button 
            onClick={() => {
              // Fire navigation event to participate or open donate
              const navEvent = new CustomEvent("navigation-request", {
                detail: { tab: "participate" }
              });
              window.dispatchEvent(navEvent);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="shrink-0 bg-neutral-900 border border-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl transition-all shadow-sm hover:shadow-md cursor-pointer outline-none flex items-center gap-2"
          >
            <Heart size={12} className="fill-current text-white" />
            <span>Support Missions</span>
          </button>
        </div>
      </div>

      {/* 5. LIGHTBOX / DETAILED WORKSPACE VIEW POPUP */}
      <AnimatePresence>
        {showDetailedModal && (
          <div 
            className="fixed inset-0 bg-neutral-950/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
            onClick={() => setShowDetailedModal(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="border border-neutral-200 bg-white max-w-xl w-full rounded-3xl p-6 sm:p-8 space-y-6 relative overflow-hidden shadow-2xl text-left"
              onClick={(e) => e.stopPropagation()}
            >
              
              {/* Top info */}
              <div className="flex justify-between items-start select-none">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 flex items-center gap-1">
                    <Calendar size={10} className="text-emerald-600" />
                    {showDetailedModal.date}
                  </span>
                  <h3 className="font-display font-bold text-neutral-950 text-xl">
                    {showDetailedModal.title}
                  </h3>
                </div>
                
                {/* Close */}
                <button
                  onClick={() => setShowDetailedModal(null)}
                  className="text-neutral-400 hover:text-neutral-900 p-1.5 border border-neutral-200 rounded-lg hover:bg-neutral-50 outline-none cursor-pointer"
                >
                  Close
                </button>
              </div>

              {/* Partnership callout in modal */}
              <div className="bg-emerald-50/50 border border-emerald-100 p-4 rounded-2xl flex items-center gap-3">
                <Users size={18} className="text-emerald-700 shrink-0" />
                <div className="text-xs">
                  <p className="font-semibold text-emerald-950">Joint Mission Initiative</p>
                  <p className="text-emerald-700 font-medium">{showDetailedModal.partnership || "One Health × ACF × CAPRO Co-op"}</p>
                </div>
              </div>

              {/* Main Narrative */}
              <div className="space-y-4">
                <p className="text-xs text-neutral-700 leading-relaxed font-sans font-medium">
                  {showDetailedModal.description}
                </p>
                
                {/* Detailed highlights checklist */}
                <div className="space-y-2.5 pt-2 border-t border-neutral-100">
                  <span className="text-[10px] text-neutral-400 font-mono uppercase tracking-wider block font-bold select-none">
                    Mission Accomplishments & Logs
                  </span>
                  <ul className="space-y-2">
                    {showDetailedModal.details.map((detail, dIdx) => (
                      <li key={dIdx} className="flex items-start gap-2 text-xs text-neutral-600 leading-relaxed">
                        <CheckCircle size={14} className="text-emerald-600 shrink-0 mt-0.5" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex justify-between items-center pt-4 border-t border-neutral-200 select-none">
                <span className="text-[10px] text-neutral-400 font-mono uppercase">
                  Location: {showDetailedModal.id === "4" ? "Wyebank Kloof, Durban" : "Namita Outpost"}
                </span>
                
                <button
                  onClick={() => setShowDetailedModal(null)}
                  className="outline-none text-xs font-bold px-5 py-2.5 rounded-xl border border-neutral-200 bg-white text-neutral-700 hover:text-neutral-950 hover:bg-neutral-50 transition-colors cursor-pointer"
                >
                  Dismiss Log
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
