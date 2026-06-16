/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { Image, X, Maximize2, Play, Compass, FileImage } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import EditableText from "./EditableText";

interface GalleryItem {
  id: string;
  title: string;
  project: string;
  type: "image" | "video";
  urlLabel: string;
  description: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  { id: "1", title: "ToothKeepers KZN School Visit", project: "ToothKeepers", type: "image", urlLabel: "KZN School Clinic", description: "Clinicians delivering emergency examinations and brushing kits directly to township primary school pupils." },
  { id: "2", title: "Agricultural Garden Bed Seeding", project: "Agricultural", type: "image", urlLabel: "Community Crops Setup", description: "Teaching caretakers and local team members organic composting & vertical backyard farming models." },
  { id: "3", title: "Comprehensive Medical Mission", project: "Medical", type: "image", urlLabel: "Primary Health Screening", description: "Providing direct primary screening, diabetic checkups, and chronic medication refills for residents." },
  { id: "4", title: "Africa Pop-up Hospital Wards", project: "Africa", type: "image", urlLabel: "African Clinic", description: "Deploying deep general clinics across rural Africa for emergency treatments." },
  { id: "5", title: "ToothKeepers Free Treatment Day", project: "ToothKeepers", type: "video", urlLabel: "Mobile Clinic Trailer", description: "Short documentary illustrating a child smiling wide post restorative cleaning." },
  { id: "6", title: "Medical Mission Base Camps", project: "Medical", type: "image", urlLabel: "Durban Community Hall", description: "Clinical checking arrays for lifestyle diseases and dispensing general wellness kits." },
  { id: "7", title: "Creation Care Recycling Sorts", project: "Agricultural", type: "image", urlLabel: "High School Co-op", description: "Diverting toxic household plastic layers via interactive eco school campaigns." },
  { id: "8", title: "Africa Voluntary Doctors Sync", project: "Africa", type: "video", urlLabel: "Mission Briefing Reel", description: "Video reel capturing surgical, dental, and spiritual teams organizing daily task pipelines." },
  { id: "9", title: "Mobile Dental Vehicle Operation", project: "Medical", type: "image", urlLabel: "Rural Field Outpost", description: "One Health specialized vehicles serving isolated families pro-bono." },
  { id: "10", title: "ToothKeepers Fluoride Treatment", project: "ToothKeepers", type: "image", urlLabel: "KZN Fluoride Clinic", description: "Clinical support team arranging local fluoride treatment and oral hygiene demonstrations." },
  { id: "11", title: "Community Food Sovereignty Training", project: "Agricultural", type: "image", urlLabel: "Food Security Workshop", description: "Backyard veggie patches and soil building skills for self-sustenance." },
  { id: "12", title: "Africa Outreach Field Support", project: "Africa", type: "image", urlLabel: "Africa Support Day", description: "Local medical volunteers and teams preparing supplies for patient navigation." },
  { id: "13", title: "Township Primary Care Support", project: "Medical", type: "image", urlLabel: "Township Health Day", description: "Deploying general health screenings, lifestyle indicators, and clinical checks." },
  { id: "14", title: "Backyard Garden Bed Preparation", project: "Agricultural", type: "image", urlLabel: "Urban Farming Site", description: "Composting arrays, layout design, and urban agro-farming initiatives." }
];

export default function GalleryView() {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const filterTabs = ["All", "ToothKeepers", "Africa", "Medical", "Agricultural", "Video"];

  const filteredItems = GALLERY_ITEMS.filter((item) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Video") return item.type === "video";
    return item.project === activeFilter;
  });

  return (
    <div className="space-y-12 py-8 animate-fadeIn text-left">
      {/* Intro */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h2 className="font-display font-medium text-3xl sm:text-4xl text-neutral-900 tracking-tight font-bold">Outreach Gallery</h2>
        <p className="text-neutral-600 text-sm leading-relaxed text-balance">
          Documenting clinical screenings, organic crop seeding days, recycling sorted arrays, and cross-border clinics inside KZN and other African territories.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex border-b border-neutral-200 scrollbar-hide overflow-x-auto justify-start sm:justify-center gap-1 sm:gap-3 py-2 select-none">
        {filterTabs.map((tab) => {
          const isActive = activeFilter === tab;

          // Theme according to area focus
          let colorClass = "bg-neutral-900 border-neutral-900 text-white shadow-sm";
          if (tab === "All" || tab === "Africa") {
            colorClass = "bg-blue-600 border-blue-600 text-white font-bold shadow-md shadow-blue-500/20";
          } else if (tab === "ToothKeepers" || tab === "Medical" || tab === "Agricultural") {
            colorClass = "bg-emerald-600 border-emerald-600 text-white font-bold shadow-md shadow-emerald-500/20";
          } else if (tab === "Video") {
            colorClass = "bg-rose-600 border-rose-600 text-white font-bold shadow-md shadow-rose-500/20";
          }

          return (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-colors outline-none cursor-pointer border ${
                isActive
                  ? colorClass
                  : "text-neutral-500 border-transparent hover:text-neutral-900 hover:bg-neutral-50"
              }`}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* Grid of gallery pictures */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredItems.map((item, idx) => {
          const isVideo = item.type === "video";
          return (
            <ScrollReveal
              key={item.id}
              delayMs={idx * 50}
              className="border border-neutral-200 bg-white rounded-3xl h-[250px] flex flex-col justify-between cursor-pointer group hover:border-neutral-900 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative overflow-hidden p-6"
              activeClassName="border-neutral-350"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-neutral-50/40 via-transparent to-neutral-50/20 pointer-events-none" />

              {/* Header: Project and Type badge */}
              <div className="flex justify-between items-start relative z-10" onClick={() => setSelectedItem(item)}>
                <span className="font-mono text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-full bg-neutral-100 border border-neutral-200 text-neutral-700 font-semibold">
                  {item.project}
                </span>
                <div className="text-neutral-400 group-hover:text-neutral-900 transition-colors duration-300">
                  {isVideo ? <Play size={16} className="text-neutral-600 fill-current" /> : <Image size={16} />}
                </div>
              </div>

              {/* Body: Technical reference block */}
              <div className="flex items-center gap-3 py-3 border-y border-dashed border-neutral-200 my-2 relative z-10" onClick={() => setSelectedItem(item)}>
                <div className="w-8 h-8 rounded-lg bg-neutral-50 border border-neutral-200 flex items-center justify-center text-neutral-500 group-hover:text-neutral-900 group-hover:bg-neutral-100 duration-300 transition-colors">
                  <FileImage size={14} />
                </div>
                <div className="text-left font-mono text-[10px] text-neutral-500 truncate w-40 font-medium">
                  {item.urlLabel.toLowerCase().replace(/\s+/g, "_")}.raw
                </div>
              </div>

              {/* Footer: title and status */}
              <div className="flex items-end justify-between relative z-10" onClick={() => setSelectedItem(item)}>
                <div className="text-left leading-tight pr-4 truncate">
                  <h4 className="text-xs font-semibold text-neutral-950 truncate w-[160px] group-hover:text-neutral-900 font-bold transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-[10px] uppercase tracking-wider font-mono mt-0.5 font-semibold text-neutral-400">
                    ON FIELD {item.type}
                  </p>
                </div>
                <div className="p-1.5 rounded-lg border border-neutral-200 bg-neutral-50 text-neutral-500 group-hover:bg-neutral-900 group-hover:text-white duration-300 transition-all shadow-sm">
                  <Maximize2 size={12} />
                </div>
              </div>
            </ScrollReveal>
          );
        })}
      </div>

      {/* LIGHTBOX POPUP COMPONENT (MODAL) */}
      {selectedItem && (
        <div 
          className="fixed inset-0 bg-neutral-950/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-fadeIn select-none"
          onClick={() => setSelectedItem(null)}
        >
          <div 
            className="border border-neutral-200 bg-white max-w-lg w-full rounded-3xl p-6 sm:p-8 space-y-6 relative overflow-hidden animate-scaleUp shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            
            {/* Close */}
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 text-neutral-500 hover:text-neutral-900 p-1.5 border border-neutral-200 rounded-lg hover:bg-neutral-50 outline-none cursor-pointer z-10 bg-white"
            >
              <X size={18} />
            </button>

            <span className="text-neutral-500 text-xs font-mono uppercase tracking-widest block font-bold">
              {selectedItem.project} • FIELD ARCHIVE
            </span>

            {/* Media Simulation Workspace */}
            <div className="border border-neutral-200 rounded-2xl h-64 flex flex-col justify-center items-center text-center overflow-hidden bg-neutral-950 relative p-6">
              {selectedItem.type === "video" ? (
                <div>
                  <div className="p-4 bg-white border border-neutral-200 text-neutral-950 rounded-full mb-4 animate-pulse mx-auto w-fit">
                    <Play size={28} className="text-neutral-950 fill-current" />
                  </div>
                  <span className="text-white text-sm font-bold tracking-wide block">PLAYING OUTREACH DOCUMENTARY</span>
                  <p className="text-neutral-400 text-xs mt-2 max-w-xs leading-relaxed font-semibold mx-auto uppercase tracking-wider font-mono">
                    {selectedItem.urlLabel.toLowerCase().replace(/\s+/g, "_")}_stream.mp4
                  </p>
                </div>
              ) : (
                <div>
                  <div className="p-4 bg-white border border-neutral-200 text-neutral-950 rounded-full mb-4 mx-auto w-fit">
                    <Compass size={28} className="text-neutral-950" />
                  </div>
                  <span className="text-white text-sm font-bold tracking-wide block">RAW IMAGE RECORD</span>
                  <p className="text-neutral-400 text-xs mt-2 max-w-xs leading-relaxed font-semibold mx-auto uppercase tracking-wider font-mono">
                    {selectedItem.urlLabel.toLowerCase().replace(/\s+/g, "_")}.raw
                  </p>
                </div>
              )}
            </div>

            <div className="space-y-2 text-left">
              <h3 className="font-display font-medium text-lg text-neutral-950 font-bold">
                {selectedItem.title}
              </h3>
              <p className="text-neutral-600 text-xs leading-relaxed font-medium">
                {selectedItem.description}
              </p>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-neutral-200">
              <button
                onClick={() => setSelectedItem(null)}
                className="outline-none text-xs font-semibold px-5 py-2.5 rounded-xl border border-neutral-300 bg-white text-neutral-700 hover:text-neutral-950 hover:bg-neutral-50 transition-colors cursor-pointer font-bold"
              >
                <EditableText id="gallery.lightbox.close" element="span">Close Archive</EditableText>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

