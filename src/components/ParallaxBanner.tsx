/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { ArrowRight, X, Maximize2, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import EditableText from "./EditableText";

// Import all 15 images from the root folder
// @ts-ignore
import img0469 from "../../IMG_0469.png";
// @ts-ignore
import img0931 from "../../IMG_0931.png";
// @ts-ignore
import img0936 from "../../IMG_0936.png";
// @ts-ignore
import img0937 from "../../IMG_0937.png";
// @ts-ignore
import img0938 from "../../IMG_0938.png";
// @ts-ignore
import img0939 from "../../IMG_0939.PNG";
// @ts-ignore
import img0940 from "../../IMG_0940.png";
// @ts-ignore
import img0941 from "../../IMG_0941.png";
// @ts-ignore
import img1014 from "../../IMG_1014.png";
// @ts-ignore
import img1041 from "../../IMG_1041.png";
// @ts-ignore
import img1043 from "../../IMG_1043.png";
// @ts-ignore
import img1045 from "../../IMG_1045.png";
// @ts-ignore
import img1049 from "../../IMG_1049.png";
// @ts-ignore
import mozambique from "../../Mozambique.png";
// @ts-ignore
import mozambique1 from "../../Mozambique1.png";

interface ParallaxBannerProps {
  onLearnMore?: () => void;
  onDonate?: () => void;
}

interface FlowingImage {
  id: string;
  src: string;
  label: string;
  left: number;       // horizontal position percentage (e.g., 4 to 94)
  size: number;       // image width in pixels (e.g., 110 to 170)
  rotation: number;   // rotation angle (e.g., -10 to 10)
  duration: number;   // speed of descent in seconds (e.g., 20 to 35)
  startY: number;     // initial vertical offset
}

const IMAGES_POOL = [
  { src: img0469, label: "One Health Team" },
  { src: img0931, label: "ToothKeepers Mobile Clinic" },
  { src: img0936, label: "Field Oral Restorations" },
  { src: img0937, label: "Primary Care Checkups" },
  { src: img0938, label: "Township Dental Care" },
  { src: img0939, label: "Dental Hygiene Assessment" },
  { src: img0940, label: "Children Oral Screening" },
  { src: img0941, label: "Accredited Dental Volunteers" },
  { src: img1014, label: "Zimbabwe Theological Mission" },
  { src: img1041, label: "Agricultural Garden Wall" },
  { src: img1043, label: "Vertical Composting Crops" },
  { src: img1045, label: "Maternal Health Support" },
  { src: img1049, label: "DriveWell Safety Seminar" },
  { src: mozambique, label: "Mozambique Mission" },
  { src: mozambique1, label: "Mozambique Pop-up Clinic" }
];

const IMAGE_DESCRIPTIONS: Record<string, string> = {
  "One Health Team": "The core leadership and clinical volunteer force of One Health on-site in Hillcrest, KwaZulu-Natal.",
  "ToothKeepers Mobile Clinic": "Our state-of-the-art mobile dental trailer on-site, bringing emergency dental screens and care to township schools.",
  "Field Oral Restorations": "Accredited voluntary dental therapists performing restorative treatments and pain relief directly in our mobile units.",
  "Primary Care Checkups": "Pop-up primary healthcare diagnostics, screening for chronic hypertension and diabetes in vulnerable townships.",
  "Township Dental Care": "Providing high-quality emergency dental treatment and restorations to adult outpatients in underserved areas.",
  "Dental Hygiene Assessment": "Providing clinical oral screenings and personalized hygiene instruction for primary school children.",
  "Children Oral Screening": "Our specialized team checking and recording children's dental health indicators inside the mobile dental trailer.",
  "Accredited Dental Volunteers": "Pioneering dentists and dental assistants pledging pro-bono service hours to relieve communities of oral infection.",
  "Zimbabwe Theological Mission": "Our cross-border pop-up surgical and theological outreach providing physical and spiritual relief in remote Zimbabwe.",
  "Agricultural Garden Wall": "Demonstrating space-efficient vertical wall crops designed to improve family food security and counter stunting.",
  "Vertical Composting Crops": "Teaching organic agricultural compost loops and crop cultivation in under-resourced communities.",
  "Maternal Health Support": "Providing essential clinical tracking, prenatal education, and newborn starter packs to new mothers.",
  "DriveWell Safety Seminar": "Distributing high-visibility reflector vests and teaching pedestrian safety to taxi operators and school children.",
  "Mozambique Mission": "Spiritual restoration, theological counseling, and medical pop-up clinics in remote Mozambique villages.",
  "Mozambique Pop-up Clinic": "Local residents receiving dental and primary medical screens during our cross-border East Africa campaign."
};

export default function ParallaxBanner({ onLearnMore, onDonate }: ParallaxBannerProps) {
  const [scrollY, setScrollY] = useState(0);
  const [activeImages, setActiveImages] = useState<FlowingImage[]>([]);
  const [lightboxImage, setLightboxImage] = useState<FlowingImage | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Soft Parallax offset for ambient background
  const backgroundY = Math.min(scrollY * 0.45, 400);

  // Initialize the background image state with 5 staggered images
  useEffect(() => {
    const initialImages: FlowingImage[] = [
      { id: "init-1", src: img0931, label: "ToothKeepers Mobile Clinic", left: 4, size: 170, rotation: -6, duration: 24, startY: 20 },
      { id: "init-2", src: img1041, label: "Agricultural Garden Wall", left: 82, size: 180, rotation: 8, duration: 28, startY: 80 },
      { id: "init-3", src: img1045, label: "Maternal Health Support", left: 12, size: 160, rotation: -4, duration: 22, startY: 260 },
      { id: "init-4", src: img1049, label: "DriveWell Safety Seminar", left: 78, size: 175, rotation: -7, duration: 30, startY: 380 },
      { id: "init-5", src: img0937, label: "Primary Care Checkups", left: 86, size: 140, rotation: 5, duration: 25, startY: 180 }
    ];
    setActiveImages(initialImages);
  }, []);

  // Handle a completed image - recycle and spawn a new randomized image
  const handleImageComplete = (id: string) => {
    setActiveImages((prev) => {
      const filtered = prev.filter((img) => img.id !== id);
      
      const activeSrcs = filtered.map((f) => f.src);
      const availablePool = IMAGES_POOL.filter((ip) => !activeSrcs.includes(ip.src));
      const nextItem = availablePool.length > 0 
        ? availablePool[Math.floor(Math.random() * availablePool.length)]
        : IMAGES_POOL[Math.floor(Math.random() * IMAGES_POOL.length)];

      const leftSide = Math.random() < 0.5;
      const left = leftSide 
        ? Math.floor(Math.random() * 15) + 3 // 3% to 18% (strict left margin)
        : Math.floor(Math.random() * 15) + 80; // 80% to 95% (strict right margin)
        
      const size = Math.floor(Math.random() * 50) + 160; // 160px to 210px
      const rotation = Math.floor(Math.random() * 18) - 9; // -9deg to 9deg
      const duration = Math.floor(Math.random() * 10) + 20; // 20s to 30s
      
      const newImage: FlowingImage = {
        id: `flow-${Date.now()}-${Math.random()}`,
        src: nextItem.src,
        label: nextItem.label,
        left,
        size,
        rotation,
        duration,
        startY: -180
      };
      
      return [...filtered, newImage];
    });
  };

  return (
    <div className="relative h-[600px] md:h-[680px] overflow-hidden rounded-3xl border border-neutral-200 bg-neutral-50 my-8 flex items-center justify-center text-center px-4">
      
      {/* 1. Interactive Sliding Background Layer */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <AnimatePresence>
          {activeImages.map((img) => {
            const baseOpacity = "opacity-[0.85]";
            
            return (
              <motion.div
                key={img.id}
                initial={{ y: img.startY, opacity: 0 }}
                animate={{ 
                  y: 720, 
                  opacity: [0, 0.85, 0.85, 0]
                }}
                transition={{
                  duration: img.duration,
                  ease: "linear",
                }}
                onAnimationComplete={() => {
                  handleImageComplete(img.id);
                }}
                whileHover={{
                  scale: 1.15,
                  rotate: 0,
                  zIndex: 40,
                  opacity: 1,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)"
                }}
                onClick={() => setLightboxImage(img)}
                className={`absolute cursor-pointer select-none group pointer-events-auto transition-opacity duration-300 ${baseOpacity} hover:opacity-100`}
                style={{
                  left: `${img.left}%`,
                  width: `${img.size}px`,
                  transformOrigin: "center"
                }}
              >
                {/* Polaroid-like Frame with high-fidelity styles */}
                <div 
                  className="bg-white p-2.5 pb-4 rounded-2xl shadow-md border border-neutral-200/50 transition-all duration-300 group-hover:border-emerald-500/30 flex flex-col items-center"
                  style={{ transform: `rotate(${img.rotation}deg)` }}
                >
                  <div className="relative w-full aspect-square overflow-hidden rounded-xl bg-neutral-100">
                    <img
                      src={img.src}
                      alt={img.label}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-neutral-900/5 group-hover:bg-transparent transition-colors duration-300" />
                    
                    {/* Hover indicator icon */}
                    <div className="absolute bottom-2 right-2 bg-neutral-950/70 backdrop-blur-xs text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Maximize2 size={10} />
                    </div>
                  </div>
                  <span className="font-sans font-semibold text-[10px] text-neutral-500 mt-2.5 truncate max-w-full text-center group-hover:text-emerald-600 transition-colors">
                    {img.label}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Soft gradient mask to preserve text contrast and elegance */}
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-50/5 via-transparent to-neutral-50/45 pointer-events-none z-5" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,#fafafa_92%)] pointer-events-none z-5" />

      {/* Parallax ambient blur backdrops */}
      <div
        className="absolute inset-0 pointer-events-none select-none z-0"
        style={{
          transform: `translateY(${backgroundY}px)`,
          transition: "transform 0.1s ease-out",
          willChange: "transform"
        }}
      >
        <div className="absolute top-1/4 left-1/3 w-96 h-96 rounded-full bg-emerald-100/20 blur-[120px] animate-pulse-slow" />
        <div className="absolute top-2/3 right-1/4 w-80 h-80 rounded-full bg-blue-100/15 blur-[100px]" />
      </div>

      {/* Main Foreground Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        
        {/* Subtle decorative flag */}
        <div className="mb-4 inline-flex items-center gap-1.5 px-3 py-1 bg-white/80 backdrop-blur-md rounded-full border border-neutral-200 shadow-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 font-bold">Interactive Field Showcase</span>
        </div>

        <h1 className="font-display font-medium tracking-tight text-neutral-900 leading-[1.1] mb-6 select-none text-4xl sm:text-5xl md:text-7xl">
          <EditableText id="home.banner.title1" element="span">Healing Communities.</EditableText>
          <br />
          <EditableText id="home.banner.title2" element="span" className="text-emerald-700 italic">Restoring Hope.</EditableText>
        </h1>

        <EditableText id="home.banner.subtitle" className="font-sans text-neutral-600 font-normal leading-relaxed max-w-2xl mx-auto text-sm sm:text-base md:text-lg mb-10 text-balance px-4">
          One Health brings together critical healthcare, genuine faith, agricultural skills, and environmental action to serve vulnerable townships and rural communities in South Africa and other countries across Africa.
        </EditableText>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={onLearnMore}
            className="group outline-none border border-emerald-600 bg-emerald-600 text-white font-bold tracking-wide text-sm px-8 py-4 rounded-xl cursor-pointer hover:bg-emerald-700 hover:shadow-[0_0_20px_rgba(16,185,129,0.35)] transition-all active:scale-[0.98] duration-300 shadow-sm flex items-center gap-2"
          >
            <EditableText id="home.banner.btn1" element="span">Learn Our Story</EditableText>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform animate-pulse" />
          </button>
          
          <button
            onClick={onDonate}
            className="group outline-none border border-neutral-900 bg-neutral-900 text-white font-bold tracking-wide text-sm px-8 py-4 rounded-xl cursor-pointer hover:bg-neutral-850 hover:shadow-[0_0_20px_rgba(0,0,0,0.15)] transition-all active:scale-[0.98] duration-300 flex items-center gap-2"
          >
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping inline-block mr-1"></span>
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

      {/* 2. Interactive Lightbox Modal */}
      <AnimatePresence>
        {lightboxImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 select-none pointer-events-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightboxImage(null)}
              className="absolute inset-0 bg-neutral-950/70 backdrop-blur-md"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="relative w-full max-w-3xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-neutral-200/50 flex flex-col md:flex-row h-auto max-h-[90vh] md:max-h-[580px] z-10 text-left"
            >
              {/* Photo Pane */}
              <div className="relative w-full md:w-1/2 bg-neutral-100 flex items-center justify-center min-h-[250px] md:min-h-full">
                <img
                  src={lightboxImage.src}
                  alt={lightboxImage.label}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-neutral-900/5" />
              </div>

              {/* Information Pane */}
              <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between bg-white overflow-y-auto">
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-600 font-bold">Field Operations</span>
                      <h3 className="text-xl md:text-2xl font-display font-bold text-neutral-900 mt-1 leading-tight">
                        {lightboxImage.label}
                      </h3>
                    </div>
                    {/* Close Trigger */}
                    <button
                      onClick={() => setLightboxImage(null)}
                      className="p-1.5 hover:bg-neutral-100 rounded-full text-neutral-400 hover:text-neutral-700 transition-colors duration-200 outline-none cursor-pointer"
                    >
                      <X size={18} />
                    </button>
                  </div>

                  <p className="text-neutral-600 text-sm leading-relaxed mb-6">
                    {IMAGE_DESCRIPTIONS[lightboxImage.label] || "An active snapshot of One Health's grassroot services, establishing health, crops, and spiritual counseling."}
                  </p>

                  <div className="space-y-4 border-t border-neutral-100 pt-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600">
                        <span className="text-xs font-bold font-mono">SA</span>
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-neutral-900">National Registration</h4>
                        <p className="text-[11px] text-neutral-500 font-mono">Hillcrest Central Headquarters, KZN</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                        <span className="text-xs font-bold font-mono">18C</span>
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-neutral-900">Tax Deductible Receipt</h4>
                        <p className="text-[11px] text-neutral-500">Corporate sponsorships verified by legal audits</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-neutral-100 flex items-center justify-between gap-4">
                  <span className="text-[10px] text-neutral-400 font-mono uppercase">One Health • Stewardship</span>
                  <button
                    onClick={() => {
                      setLightboxImage(null);
                      if (onDonate) onDonate();
                    }}
                    className="py-2 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs tracking-wider uppercase transition-all duration-300 shadow-sm cursor-pointer"
                  >
                    Support campaign
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
