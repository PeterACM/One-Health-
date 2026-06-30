/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { TEAM, PARTNERS } from "../data";
import { 
  Sprout, 
  Heart, 
  HeartPulse, 
  Stethoscope, 
  Droplet, 
  Users, 
  Leaf, 
  ArrowUpRight,
  Compass,
  Quote,
  Sparkles,
  BookOpen
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import ScrollReveal from "./ScrollReveal";
import EditableText from "./EditableText";

// @ts-ignore
import nationChangersPng from "../assets/Nation_Changers.png";
// @ts-ignore
import forwardDurbanPng from "../assets/Forward_Durban.png";
// @ts-ignore
import acffPng from "../assets/ACFF.png";
// @ts-ignore
import iKhetheloPng from "../assets/iKhethelo.png";
// @ts-ignore
import lesleyPng from "../assets/Dr_Naidoo.png";
// @ts-ignore
import oceanPng from "../assets/IMG_8511.png";
// @ts-ignore
import lauraPng from "../assets/IMG_8513.png";

interface AboutViewProps {
  onLearnMoreProjects?: () => void;
  onDonate?: () => void;
}

const OBJECTIVES = [
  "To foster collaboration among stakeholders in human, animal, and environmental health in South Africa and Africa, including government agencies, NGOs, universities, and private sector organizations.",
  "To conduct research and provide evidence-based information and guidance to support One Health policies and practices in South Africa and Africa.",
  "To promote One Health education and training programs for professionals in human, animal, and environmental health in South Africa and Africa.",
  "To raise public awareness of the connections between human, animal, and environmental health in South Africa and Africa, and the importance of One Health approaches to achieving sustainable development.",
  "To advocate for policies and practices that support One Health in South Africa and Africa, including the development and implementation of One Health national action plans.",
  "To support the development and implementation of One Health initiatives and projects in South Africa and Africa, including surveillance systems, research studies, and capacity-building programs.",
  "To promote international collaboration and cooperation on One Health issues affecting South Africa and Africa, including zoonotic disease control, wildlife conservation, and climate change adaptation.",
  "To engage with local communities in South Africa and Africa to promote One Health practices and improve health outcomes for both humans and animals.",
  "To support the development and implementation of policies and programs that address the health impacts of environmental degradation, climate change, and biodiversity loss in South Africa and Africa.",
  "To build partnerships with other organizations and initiatives working towards One Health goals in South Africa and Africa, and to facilitate knowledge sharing and collaboration among stakeholders.",
  "To support the development of innovative solutions and technologies that promote One Health in South Africa and Africa, including digital health tools, diagnostic tests, and vaccines.",
  "To promote equity and social justice in One Health initiatives in South Africa and Africa, by ensuring that marginalized communities have access to healthcare and that the benefits of One Health approaches are distributed fairly."
];

export default function AboutView({ onLearnMoreProjects, onDonate }: AboutViewProps) {
  const [activeSubTab, setActiveSubTab] = useState<"story" | "philosophy" | "values" | "team">("story");
  const [showNationChangersPopup, setShowNationChangersPopup] = useState(false);
  const [showForwardDurbanPopup, setShowForwardDurbanPopup] = useState(false);
  const [showAcffPopup, setShowAcffPopup] = useState(false);
  const [showIKhetheloPopup, setShowIKhetheloPopup] = useState(false);
  const [selectedTeamMember, setSelectedTeamMember] = useState<any | null>(null);
  const [imageLoadErrors, setImageLoadErrors] = useState<Record<string, boolean>>({});

  return (
    <div className="space-y-16 py-8">
      {/* Tab Switcher */}
      <div className="flex border-b border-neutral-200 scrollbar-hide overflow-x-auto justify-start sm:justify-center gap-2 sm:gap-6 sticky top-20 bg-white/95 py-3 backdrop-blur z-30 select-none">
        {[
          { id: "story", label: "Our Story", color: "bg-blue-600 border-blue-600 hover:bg-blue-50 text-blue-600 shadow-blue-500/20" },
          { id: "philosophy", label: "The Philosophy", color: "bg-emerald-600 border-emerald-600 hover:bg-emerald-50 text-emerald-600 shadow-emerald-500/20" },
          { id: "values", label: "Vision, Mission & Objectives", color: "bg-blue-600 border-blue-600 hover:bg-blue-50 text-blue-600 shadow-blue-500/20" },
          { id: "team", label: "Team Members", color: "bg-rose-600 border-rose-600 hover:bg-rose-50 text-rose-600 shadow-rose-500/20" }
        ].map((tab) => {
          const isActive = activeSubTab === tab.id;
          const [bgNormal, borderNormal, bgHover, textActive, shadowActive] = tab.color.split(" ");
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-display text-sm tracking-wide transition-all outline-none cursor-pointer border ${
                isActive
                  ? `${bgNormal} text-white ${borderNormal} font-bold shadow-md ${shadowActive}`
                  : `text-neutral-600 border-transparent hover:${textActive} hover:${bgHover}`
              }`}
            >
              <span>{tab.label}</span>
            </button>
          )
        })}
      </div>

      {/* RENDER ACTIVE TAB */}
      {activeSubTab === "story" && (
        <div className="space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center text-left">
            <div className="lg:col-span-7 space-y-6">
              <ScrollReveal activeClassName="text-neutral-900 border-transparent">
                <h2 className="font-display font-medium text-3xl sm:text-5xl text-neutral-900 tracking-tight leading-tight">
                  <EditableText id="about.story.title1" element="span">Going where the need is deepest, </EditableText>
                  <span className="text-neutral-800 italic">
                    <EditableText id="about.story.title2" element="span">and staying there.</EditableText>
                  </span>
                </h2>
              </ScrollReveal>

              <ScrollReveal delayMs={100}>
                <EditableText id="about.story.para1" className="text-neutral-700 leading-relaxed text-sm sm:text-base text-balance">
                  One Health is a faith-driven, community-centred impact group. We operate at the convergence of clinical medicine, agricultural empowerment, community-sorting ecology, and spiritual renewal.
                </EditableText>
              </ScrollReveal>

              <ScrollReveal delayMs={200}>
                <EditableText id="about.story.para2" className="text-neutral-600 leading-relaxed text-sm">
                  Established inside the townships of Durban, KwaZulu-Natal, and spreading across boundaries, our work targets those fully overlooked by institutional maps. We deploy dental trailers, clinical counselors, and soil specialists directly to the doorsteps of remote primary schools, township care homes, and orphanages.
                </EditableText>
              </ScrollReveal>

              <ScrollReveal className="pt-4 flex flex-wrap gap-4" activeClassName="text-neutral-900 border-transparent bg-transparent shadow-none">
                <button
                  onClick={onLearnMoreProjects}
                  className="outline-none border border-blue-600 bg-blue-600 text-white font-bold text-xs tracking-wider uppercase px-6 py-3 rounded-xl cursor-pointer hover:bg-blue-700 hover:shadow-[0_0_15px_rgba(37,99,235,0.4)] transition-all flex items-center gap-2 duration-300"
                >
                  <EditableText id="about.story.btn1" element="span">Browse Active Projects</EditableText>
                  <ArrowUpRight size={14} className="animate-bounce" />
                </button>
                <button
                  onClick={onDonate}
                  className="outline-none border border-emerald-600 bg-emerald-600 text-white font-bold text-xs tracking-wider uppercase px-6 py-3 rounded-xl cursor-pointer hover:bg-emerald-700 hover:shadow-[0_0_15px_rgba(16,185,129,0.4)] transition-all duration-300"
                >
                  <EditableText id="about.story.btn2" element="span">Become a Sustaining Supporter</EditableText>
                </button>
              </ScrollReveal>
            </div>

            <div className="lg:col-span-5 relative">
              <ScrollReveal activeClassName="border-neutral-200 shadow-sm rounded-3xl overflow-hidden" threshold={0.05}>
                <div className="border border-neutral-200 bg-neutral-50 p-8 rounded-3xl relative overflow-hidden group">
                  <div className="border border-dashed border-neutral-300 rounded-2xl h-64 flex flex-col justify-center items-center text-center p-6 bg-white">
                    <div className="p-4 bg-white border border-neutral-200 text-neutral-800 rounded-full mb-4">
                      <Users size={32} />
                    </div>
                    <span className="text-neutral-900 font-display font-medium text-lg mb-1">
                      <EditableText id="about.story.card.title" element="span">Community-First Healthcare</EditableText>
                    </span>
                    <p className="text-neutral-600 text-xs leading-relaxed max-w-xs">
                      <EditableText id="about.story.card.desc" element="span">Holistic action bringing medicine, agricultural guidance, environmental stewardship, and church fellowship under one flag.</EditableText>
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      )}

      {/* PHILOSOPHY SECTION */}
      {activeSubTab === "philosophy" && (
        <div className="space-y-12 animate-fadeIn text-left">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="font-display font-medium text-3xl sm:text-4xl text-neutral-900 tracking-tight">
              <EditableText id="about.philosophy.title" element="span">The One Health Philosophy</EditableText>
            </h2>
            <p className="text-neutral-600 text-sm leading-relaxed text-balance">
              <EditableText id="about.philosophy.subtitle" element="span">Human thriving is physically linked to the vitality of the local animals, the fertility of the local soil, the cleanliness of local water bodies, and the resilience of the soul.</EditableText>
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <ScrollReveal delayMs={0} className="border border-neutral-200 bg-neutral-50 p-6 rounded-2xl flex flex-col justify-between h-[250px]">
              <div>
                <div className="p-3 bg-white border border-neutral-200 text-neutral-900 rounded-xl w-fit mb-4">
                  <Stethoscope size={24} />
                </div>
                <h3 className="font-display font-medium text-lg text-neutral-900 mb-2">
                  <EditableText id="about.dim1.title" element="span">Human Welbeing</EditableText>
                </h3>
                <p className="text-neutral-600 text-xs leading-relaxed">
                  <EditableText id="about.dim1.desc" element="span">Routine pediatric dental surgeries, acute clinical screens, maternal nutrition aid, and local eye services.</EditableText>
                </p>
              </div>
              <div className="text-neutral-400 text-xs font-mono font-medium tracking-widest uppercase">
                <EditableText id="about.dim1.footer" element="span">DIMENSION 01</EditableText>
              </div>
            </ScrollReveal>

            <ScrollReveal delayMs={100} className="border border-neutral-200 bg-neutral-50 p-6 rounded-2xl flex flex-col justify-between h-[250px]">
              <div>
                <div className="p-3 bg-white border border-neutral-200 text-neutral-900 rounded-xl w-fit mb-4">
                  <Leaf size={24} />
                </div>
                <h3 className="font-display font-medium text-lg text-neutral-900 mb-2">
                  <EditableText id="about.dim2.title" element="span">Planetary Integrity</EditableText>
                </h3>
                <p className="text-neutral-600 text-xs leading-relaxed">
                  <EditableText id="about.dim2.desc" element="span">Clearing plastics, introducing recycling initiatives to rural schools, and establishing rainwater conservation units.</EditableText>
                </p>
              </div>
              <div className="text-neutral-400 text-xs font-mono font-medium tracking-widest uppercase">
                <EditableText id="about.dim2.footer" element="span">DIMENSION 02</EditableText>
              </div>
            </ScrollReveal>

            <ScrollReveal delayMs={200} className="border border-neutral-200 bg-neutral-50 p-6 rounded-2xl flex flex-col justify-between h-[250px]">
              <div>
                <div className="p-3 bg-white border border-neutral-200 text-neutral-900 rounded-xl w-fit mb-4">
                  <Sprout size={24} />
                </div>
                <h3 className="font-display font-medium text-lg text-neutral-900 mb-2">
                  <EditableText id="about.dim3.title" element="span">Agricultural Security</EditableText>
                </h3>
                <p className="text-neutral-600 text-xs leading-relaxed">
                  <EditableText id="about.dim3.desc" element="span">Teaching organic vertical gardening at care homes to protect families against starvation and severe childhood stunting.</EditableText>
                </p>
              </div>
              <div className="text-neutral-400 text-xs font-mono font-medium tracking-widest uppercase">
                <EditableText id="about.dim3.footer" element="span">DIMENSION 03</EditableText>
              </div>
            </ScrollReveal>

            <ScrollReveal delayMs={300} className="border border-neutral-200 bg-neutral-50 p-6 rounded-2xl flex flex-col justify-between h-[250px]">
              <div>
                <div className="p-3 bg-white border border-neutral-200 text-neutral-900 rounded-xl w-fit mb-4">
                  <HeartPulse size={24} />
                </div>
                <h3 className="font-display font-medium text-lg text-neutral-900 mb-2">
                  <EditableText id="about.dim4.title" element="span">Spiritual Hope</EditableText>
                </h3>
                <p className="text-neutral-600 text-xs leading-relaxed">
                  <EditableText id="about.dim4.desc" element="span">Faith-rooted counseling, encouraging youth groups, and establishing local church partners.</EditableText>
                </p>
              </div>
              <div className="text-neutral-400 text-xs font-mono font-medium tracking-widest uppercase">
                <EditableText id="about.dim4.footer" element="span">DIMENSION 04</EditableText>
              </div>
            </ScrollReveal>

            <ScrollReveal delayMs={400} className="border border-neutral-200 bg-neutral-50 p-6 rounded-2xl flex flex-col justify-between h-[250px]">
              <div>
                <div className="p-3 bg-white border border-neutral-200 text-neutral-900 rounded-xl w-fit mb-4">
                  <Droplet size={24} />
                </div>
                <h3 className="font-display font-medium text-lg text-neutral-900 mb-2">
                  <EditableText id="about.dim5.title" element="span">Water, Food & Dignity</EditableText>
                </h3>
                <p className="text-neutral-600 text-xs leading-relaxed">
                  <EditableText id="about.dim5.desc" element="span">Clean water security systems paired with nutritious farm crops as basic rights, freeing community children to grow safely.</EditableText>
                </p>
              </div>
              <div className="text-neutral-400 text-xs font-mono font-medium tracking-widest uppercase">
                <EditableText id="about.dim5.footer" element="span">DIMENSION 05</EditableText>
              </div>
            </ScrollReveal>

            <ScrollReveal delayMs={500} className="border border-neutral-200 bg-neutral-50 p-6 rounded-2xl flex flex-col justify-between h-[250px]">
              <div>
                <div className="p-3 bg-white border border-neutral-200 text-neutral-900 rounded-xl w-fit mb-4">
                  <Users size={24} />
                </div>
                <h3 className="font-display font-medium text-lg text-neutral-900 mb-2">
                  <EditableText id="about.dim6.title" element="span">Long Term Stewardship</EditableText>
                </h3>
                <p className="text-neutral-600 text-xs leading-relaxed">
                  <EditableText id="about.dim6.desc" element="span">Investing in permanent skills, certifying local leaders, and avoiding temporary dependency loops.</EditableText>
                </p>
              </div>
              <div className="text-neutral-400 text-xs font-mono font-medium tracking-widest uppercase">
                <EditableText id="about.dim6.footer" element="span">DIMENSION 06</EditableText>
              </div>
            </ScrollReveal>
          </div>
        </div>
      )}

      {/* VALUES SECTION */}
      {activeSubTab === "values" && (
        <div className="space-y-16 animate-fadeIn text-left">
          {/* Top Mission & Vision Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ScrollReveal className="border border-neutral-200 bg-neutral-50 p-8 rounded-3xl flex flex-col justify-between">
              <div>
                <span className="text-neutral-500 font-mono text-xs uppercase tracking-widest block mb-3 font-semibold">
                  <EditableText id="about.mission.label" element="span">Mission Statement</EditableText>
                </span>
                <h3 className="font-display font-medium text-2xl text-neutral-900 mb-4">
                  <EditableText id="about.mission.title" element="span">Advancing Collaboration & Health</EditableText>
                </h3>
                <p className="text-neutral-600 text-sm leading-relaxed">
                  <EditableText id="about.mission.desc" element="span">One Health is dedicated to advancing the principles of One Health in South Africa and Africa by promoting collaboration, research, education, and advocacy among stakeholders in human, animal, and environmental health. Our mission is to create a healthier, more sustainable future for all.</EditableText>
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal className="border border-neutral-200 bg-neutral-50 p-8 rounded-3xl flex flex-col justify-between">
              <div>
                <span className="text-neutral-500 font-mono text-xs uppercase tracking-widest block mb-3 font-semibold">
                  <EditableText id="about.vision.label" element="span">Vision</EditableText>
                </span>
                <h3 className="font-display font-medium text-2xl text-neutral-900 mb-4">
                  <EditableText id="about.vision.title" element="span">Holistic Integration</EditableText>
                </h3>
                <p className="text-neutral-600 text-sm leading-relaxed">
                  <EditableText id="about.vision.desc" element="span">One Health Enterprises envisions a world where human, animal, and environmental health are integrated for the benefit of all, and where communities in South South Africa and Africa are healthy, resilient, and sustainable.</EditableText>
                </p>
              </div>
            </ScrollReveal>
          </div>

          {/* Objectives Grid Section */}
          <div className="space-y-8">
            <div className="border-t border-neutral-200 pt-12 text-center md:text-left max-w-3xl">
              <h3 className="font-display font-medium text-2xl sm:text-3xl text-neutral-900 tracking-tight mb-3">
                <EditableText id="about.objectives.title" element="span">Our Core Objectives</EditableText>
              </h3>
              <p className="text-neutral-600 text-sm">
                <EditableText id="about.objectives.subtitle" element="span">To achieve our integrated vision, we operate according to twelve strategic mandates across the continent.</EditableText>
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {OBJECTIVES.map((objective, i) => (
                <ScrollReveal key={i} delayMs={i * 50} className="border border-neutral-200 bg-neutral-50 p-6 rounded-2xl flex flex-col justify-between relative">
                  <div>
                    <div className="text-neutral-900 font-mono font-bold text-sm mb-3">
                      {(i + 1).toString().padStart(2, "0")}
                    </div>
                    <div className="text-neutral-700 text-xs leading-relaxed">
                      <EditableText id={`about.objective.${i}`} element="span">{objective}</EditableText>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            {/* Conclusion Highlight Box */}
            <ScrollReveal className="border border-neutral-900 bg-neutral-900 text-white p-8 rounded-3xl relative text-center max-w-4xl mx-auto mt-8">
              <div className="text-sm font-sans leading-relaxed text-neutral-200">
                <EditableText id="about.objectives.conclusion" element="span">By pursuing these objectives, One Health aims to create a more sustainable and resilient future for South Africa and Africa, where human, animal, and environmental health are integrated and prioritized for the benefit of all.</EditableText>
              </div>
            </ScrollReveal>
          </div>
        </div>
      )}

      {/* TEAM SECTION */}
      {activeSubTab === "team" && (
        <div className="space-y-12 animate-fadeIn text-left max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-8">
            <h2 className="font-display font-medium text-3xl sm:text-4xl text-neutral-900 tracking-tight">
              <EditableText id="about.team.header" element="span">Meet Our Team Members</EditableText>
            </h2>
            <p className="text-neutral-600 text-sm leading-relaxed">
              <EditableText id="about.team.subheader" element="span">Meet our clinicians and leaders directing healthcare and development operations on the ground across South Africa.</EditableText>
            </p>
          </div>

          {/* Interactive Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TEAM.map((member, i) => {
              const mId = member.name.replace(/\s+/g, "_");
              
              // Attach images, specialty tags, and credentials
              let image = lesleyPng;
              let tags: string[] = [];
              let degrees: string[] = [];
              let quote = "";

              if (member.name === "Lesley Naidoo") {
                image = lesleyPng;
                tags = ["Public Health", "Clinical Dentistry", "Advocate"];
                degrees = [
                  "PhD Candidate in Public Health (UKZN)",
                  "Master of Public Health (UWC)",
                  "Master of Medical Science in Dentistry (UKZN)",
                  "Master of Business Administration (MBA)",
                  "Bachelor of Theology & Counselling (SATS)",
                  "Primary Degree in Dental Therapy (UDW)"
                ];
                quote = "True restoration begins when clinical quality, emotional support, and township development align.";
              } else if (member.name === "Ocean Naidoo") {
                image = oceanPng;
                tags = ["Neurophysiology", "Diagnostics", "Sleep Science"];
                degrees = [
                  "Clinical Neurophysiologist Specialist",
                  "Polysomnography & CPAP Titration Lead",
                  "Founder & Director of Neurowave",
                  "Universal Sleep Lab Certified (Free State)"
                ];
                quote = "Our mission is to democratize advanced nerve and sleep diagnostics to community clinical layers.";
              } else {
                image = lauraPng;
                tags = ["Cardiovascular", "Lecturer", "HPCSA Ex-Board"];
                degrees = [
                  "Certified Cardiovascular Perfusionist Specialist",
                  "Clinical Cardiovascular Lecturer & Mentor",
                  "Former HPCSA Board Member",
                  "Vice Chairperson of Perfusion Association of SA"
                ];
                quote = "Patient safety, standardizing perfusion training, and building clinical resilience drive my work.";
              }

              const extendedMember = { ...member, image, tags, degrees, quote };

              return (
                <ScrollReveal
                  key={i}
                  delayMs={i * 100}
                  className="bg-white border border-neutral-200 hover:border-rose-500/35 rounded-3xl overflow-hidden group shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1.5 flex flex-col h-[430px]"
                >
                  {/* Card top - Photo Container */}
                  <div className="relative h-56 w-full overflow-hidden shrink-0 bg-neutral-100">
                    <img
                      src={image}
                      alt={member.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                    
                    {/* Shadow overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent opacity-60 group-hover:opacity-85 transition-opacity duration-300" />
                    
                    {/* Role Tag on top of image */}
                    <span className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm text-neutral-900 border border-white/20 font-mono font-bold text-[9px] uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">
                      {member.role.split("&")[0].split("Lecturer")[0].trim()}
                    </span>
                  </div>

                  {/* Card middle - Info */}
                  <div className="p-5 flex-1 flex flex-col justify-between text-left">
                    <div className="space-y-2">
                      <h3 className="font-display font-bold text-neutral-900 text-lg leading-tight group-hover:text-rose-600 transition-colors duration-300">
                        {member.name}
                      </h3>
                      
                      {/* Tags */}
                      <div className="flex flex-wrap gap-1">
                        {tags.map((tag, tIdx) => (
                          <span key={tIdx} className="bg-neutral-100 text-neutral-600 text-[10px] font-medium px-2 py-0.5 rounded-md">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <p className="text-neutral-500 text-xs line-clamp-3 leading-relaxed">
                        {member.bio}
                      </p>
                    </div>

                    {/* View Profile Action */}
                    <button
                      onClick={() => setSelectedTeamMember(extendedMember)}
                      className="w-full mt-4 py-2.5 px-4 rounded-xl border border-neutral-200 hover:border-rose-500/40 hover:bg-rose-50 text-neutral-800 hover:text-rose-600 font-bold text-xs tracking-wide uppercase cursor-pointer transition-all flex items-center justify-center gap-1.5"
                    >
                      <span>Interactive Bio</span>
                      <span className="text-sm">→</span>
                    </button>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>

          {/* Detailed Interactive Bio Modal */}
          <AnimatePresence>
            {selectedTeamMember && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                {/* Backdrop */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setSelectedTeamMember(null)}
                  className="absolute inset-0 bg-neutral-950/60 backdrop-blur-sm"
                />

                {/* Modal Box */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  className="relative w-full max-w-3xl bg-white border border-neutral-200 rounded-3xl shadow-2xl overflow-hidden max-h-[85vh] flex flex-col md:flex-row text-left z-10"
                >
                  {/* Left panel - Image */}
                  <div className="w-full md:w-5/12 bg-neutral-100 relative h-64 md:h-auto overflow-hidden shrink-0 border-r border-neutral-100">
                    <img
                      src={selectedTeamMember.image}
                      alt={selectedTeamMember.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/10 to-transparent opacity-60 md:hidden" />
                    
                    {/* Quote inside Image panel */}
                    <div className="absolute bottom-5 left-5 right-5 text-white hidden md:block">
                      <p className="font-display italic text-xs leading-relaxed text-neutral-200 border-l-2 border-rose-500 pl-3">
                        "{selectedTeamMember.quote}"
                      </p>
                    </div>
                  </div>

                  {/* Right panel - Scrollable details */}
                  <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 flex flex-col justify-between">
                    {/* Close button inside panel */}
                    <button
                      onClick={() => setSelectedTeamMember(null)}
                      className="absolute top-4 right-4 w-8 h-8 rounded-full border border-neutral-150 hover:border-neutral-200 bg-neutral-50 hover:bg-neutral-100 flex items-center justify-center text-neutral-500 hover:text-neutral-700 transition-all outline-none cursor-pointer"
                    >
                      ✕
                    </button>

                    <div className="space-y-5">
                      <div className="space-y-2">
                        <span className="text-[10px] font-mono tracking-widest uppercase font-bold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-100 w-fit block">
                          One Health Leadership
                        </span>
                        <h3 className="font-display font-bold text-neutral-950 text-2xl sm:text-3xl leading-snug">
                          {selectedTeamMember.name}
                        </h3>
                        <p className="text-neutral-500 text-xs sm:text-sm font-semibold font-mono">
                          {selectedTeamMember.role}
                        </p>
                      </div>

                      {/* Bio paragraphs */}
                      <div className="space-y-3">
                        <h4 className="text-[11px] font-mono tracking-widest text-neutral-400 uppercase font-bold">
                          Professional Biography
                        </h4>
                        <p className="text-neutral-700 text-xs leading-relaxed whitespace-pre-line bg-neutral-50 border border-neutral-100 p-4 rounded-2xl">
                          {selectedTeamMember.bio}
                        </p>
                      </div>

                      {/* Specialty Tags */}
                      <div className="space-y-2">
                        <h4 className="text-[11px] font-mono tracking-widest text-neutral-400 uppercase font-bold">
                          Core Specializations
                        </h4>
                        <div className="flex flex-wrap gap-1.5">
                          {selectedTeamMember.tags.map((tag: string, tIdx: number) => (
                            <span
                              key={tIdx}
                              className="bg-neutral-900 text-white font-mono text-[9px] uppercase tracking-wider px-2.5 py-1 rounded-md"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Credentials List */}
                      <div className="space-y-2.5">
                        <h4 className="text-[11px] font-mono tracking-widest text-neutral-400 uppercase font-bold">
                          Academic Degrees & Credentials
                        </h4>
                        <ul className="space-y-1.5">
                          {selectedTeamMember.degrees.map((degree: string, dIdx: number) => (
                            <li key={dIdx} className="text-neutral-600 text-[11px] sm:text-xs flex items-start gap-2">
                              <span className="text-rose-500 mt-0.5 shrink-0">✓</span>
                              <span className="font-medium">{degree}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Footer Close */}
                    <div className="pt-6 border-t border-neutral-100 mt-6">
                      <button
                        onClick={() => setSelectedTeamMember(null)}
                        className="w-full py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs tracking-wider uppercase cursor-pointer transition-all outline-none"
                      >
                        Close Bio Profile
                      </button>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Brand Partners Showcase */}
      <div className="border-t border-neutral-200 pt-16">
        <ScrollReveal activeClassName="opacity-100 uppercase" threshold={0.05} className="space-y-8 text-center max-w-5xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-4">
            {PARTNERS.map((partner, idx) => {
              const isNationChangers = partner.name === "Nation Changers";
              const isForwardDurban = partner.name === "Forward Durban";
              const isAcff = partner.name === "ACFF";
              const isIKhethelo = partner.name === "iKhethelo";
              
              let borderClass = "border-neutral-200 hover:border-neutral-300 cursor-default";
              let logoBorderClass = "border-neutral-200 text-neutral-500";
              let titleClass = "text-neutral-800 group-hover:text-neutral-950";
              
              if (isNationChangers) {
                borderClass = "border-amber-200 hover:border-amber-400 cursor-pointer hover:bg-amber-50/20";
                logoBorderClass = "border-amber-200 text-amber-600 group-hover:border-amber-300";
                titleClass = "text-neutral-800 group-hover:text-amber-800";
              } else if (isForwardDurban) {
                borderClass = "border-blue-200 hover:border-blue-400 cursor-pointer hover:bg-blue-50/20";
                logoBorderClass = "border-blue-200 text-blue-600 group-hover:border-blue-300";
                titleClass = "text-neutral-800 group-hover:text-blue-800";
              } else if (isAcff) {
                borderClass = "border-rose-200 hover:border-rose-400 cursor-pointer hover:bg-rose-50/20";
                logoBorderClass = "border-rose-200 text-rose-600 group-hover:border-rose-300";
                titleClass = "text-neutral-800 group-hover:text-rose-800";
              } else if (isIKhethelo) {
                borderClass = "border-emerald-200 hover:border-emerald-400 cursor-pointer hover:bg-emerald-50/20";
                logoBorderClass = "border-emerald-200 text-emerald-600 group-hover:border-emerald-300";
                titleClass = "text-neutral-800 group-hover:text-emerald-800";
              }

              return (
                <div
                  key={idx}
                  onClick={() => {
                    if (isNationChangers) {
                      setShowNationChangersPopup(true);
                    } else if (isForwardDurban) {
                      setShowForwardDurbanPopup(true);
                    } else if (isAcff) {
                      setShowAcffPopup(true);
                    } else if (isIKhethelo) {
                      setShowIKhetheloPopup(true);
                    }
                  }}
                  className={`group border bg-neutral-50 text-neutral-600 px-5 py-3 rounded-2xl flex items-center gap-3 transition-all duration-300 select-none shadow-sm ${borderClass}`}
                >
                  <div className={`w-8 h-8 rounded-lg bg-white border text-xs font-mono font-medium flex items-center justify-center transition-colors ${logoBorderClass}`}>
                    {partner.logoText}
                  </div>
                  <div className="text-left">
                    <div className={`text-xs font-medium transition-colors ${titleClass}`}>{partner.name}</div>
                    <div className="text-[10px] text-neutral-500 leading-none mt-1">{partner.type}</div>
                  </div>
                  {(isNationChangers || isForwardDurban || isAcff || isIKhethelo) && (
                    <button
                      type="button"
                      className={`ml-2 outline-none text-[10px] font-mono font-bold px-2.5 py-1.5 rounded-xl transition-all duration-300 flex items-center gap-1 cursor-pointer select-none shrink-0 ${
                        isNationChangers
                          ? "bg-amber-100 text-amber-800 group-hover:bg-amber-500 group-hover:text-white"
                          : isForwardDurban
                          ? "bg-blue-100 text-blue-800 group-hover:bg-blue-500 group-hover:text-white"
                          : isAcff
                          ? "bg-rose-100 text-rose-800 group-hover:bg-rose-500 group-hover:text-white"
                          : "bg-emerald-100 text-emerald-800 group-hover:bg-emerald-500 group-hover:text-white"
                      }`}
                    >
                      <span>Read Story</span>
                      <ArrowUpRight size={10} className="stroke-[3px]" />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </ScrollReveal>
      </div>

      {/* Nation Changers Detail Popup Modal */}
      <AnimatePresence>
        {showNationChangersPopup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowNationChangersPopup(false)}
              className="absolute inset-0 bg-neutral-900/60 backdrop-blur-sm"
            />
            
            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-xl bg-white border border-neutral-200 rounded-3xl shadow-2xl p-6 sm:p-8 overflow-hidden max-h-[90vh] overflow-y-auto"
            >
              {/* Header block with elegant gradient accent */}
              <div className="absolute top-0 left-0 right-0 h-2.5 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600" />
              
              {/* Close Button */}
              <button
                onClick={() => setShowNationChangersPopup(false)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full border border-neutral-200 hover:border-neutral-300 bg-neutral-50 hover:bg-neutral-100 flex items-center justify-center text-neutral-500 hover:text-neutral-700 transition-all outline-none cursor-pointer text-sm font-sans"
              >
                ✕
              </button>

              <div className="space-y-6 pt-3 text-left">
                {/* Logo and Intro Header */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 pb-4 border-b border-neutral-100">
                  <div className="w-24 h-24 bg-white border border-neutral-200 rounded-2xl p-2.5 flex items-center justify-center shadow-sm shrink-0 relative overflow-hidden select-none">
                    {!imageLoadErrors["nationChangers"] && (
                      <img 
                        src={nationChangersPng} 
                        alt="Nation Changers Logo" 
                        className="w-full h-full object-contain relative z-10 animate-fade-in"
                        onError={() => {
                          setImageLoadErrors(prev => ({ ...prev, nationChangers: true }));
                        }}
                        referrerPolicy="no-referrer"
                      />
                    )}
                    {imageLoadErrors["nationChangers"] && (
                      <div className="absolute inset-0 bg-neutral-50 flex flex-col items-center justify-center p-2 text-center select-none">
                        <BookOpen size={16} className="text-amber-500 mb-0.5" />
                        <span className="font-display font-bold text-[8px] text-neutral-800 leading-none">NATION CHANGERS</span>
                      </div>
                    )}
                  </div>
                  <div className="text-center sm:text-left space-y-1 mt-1">
                    <span className="text-[10px] font-mono tracking-widest uppercase font-semibold text-amber-600">
                      Featured Partner Profile
                    </span>
                    <h3 className="font-display font-bold text-neutral-900 text-2xl">
                      Nation Changers
                    </h3>
                    <p className="text-neutral-500 text-xs font-mono font-medium">
                      Est. 11 Years Ago • Isaiah 58 Inspired
                    </p>
                  </div>
                </div>

                {/* Main description section */}
                <div className="space-y-4">
                  <h4 className="font-display font-semibold text-neutral-900 text-sm tracking-wide uppercase">
                    Our Calling & Vision
                  </h4>
                  <p className="text-neutral-700 text-xs sm:text-sm leading-relaxed">
                    We live back-to-back with abject poverty, neglect, and abuse. First world and third world alongside each other! Through those who’re prepared to give what they can of their time, expertise and finances, present and future generations will be changed. Nation Changers was started 11 years ago, God inspired by Isaiah 58.
                  </p>
                </div>

                {/* Collaboration overview */}
                <div className="space-y-3 bg-amber-50/40 p-4 rounded-2xl border border-amber-100/60">
                  <h4 className="font-display font-semibold text-amber-900 text-xs sm:text-sm flex items-center gap-1.5 uppercase">
                    <Sparkles size={14} className="text-amber-600 shrink-0" />
                    Collaboration with One Health
                  </h4>
                  <p className="text-amber-950 text-xs leading-relaxed font-sans">
                    Through physical restoration and spiritual alignment, One Health and Nation Changers have worked back-to-back to elevate township communities. By combining Nation Changers' deep roots in local empowerment with One Health's mobile clinical units, we have delivered critical dental treatments, established self-sustaining vertical agricultural gardens, and distributed hygiene kits directly to vulnerable children. Together, we are bridging the first and third worlds, mobilizing professional expertise and volunteer hearts to break the cycles of neglect, dental agony, and food insecurity for generations to come.
                  </p>
                </div>

                {/* Scripture citation block */}
                <div className="border-l-2 border-amber-300 pl-3 py-1 bg-amber-50/20 text-[11px] sm:text-xs text-neutral-600 leading-relaxed rounded-r-lg pr-2 font-mono">
                  <p className="font-semibold text-neutral-800 mb-1">Isaiah 58 Focus:</p>
                  "Is not this the fast that I have chosen? To loose the bands of wickedness, to undo the heavy burdens, and to let the oppressed go free, and that ye break every yoke? Is it not to deal thy bread to the hungry, and thou bring the poor that are cast out to thy house?"
                </div>

                {/* Close modal action */}
                <div className="flex justify-end pt-2 border-t border-neutral-100">
                  <button
                    onClick={() => setShowNationChangersPopup(false)}
                    className="outline-none border border-neutral-200 hover:border-neutral-300 bg-neutral-50 hover:bg-neutral-100 text-neutral-700 text-xs font-semibold px-5 py-2.5 rounded-xl cursor-pointer transition-all"
                  >
                    Close Profile
                  </button>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Forward Durban Detail Popup Modal */}
      <AnimatePresence>
        {showForwardDurbanPopup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowForwardDurbanPopup(false)}
              className="absolute inset-0 bg-neutral-900/60 backdrop-blur-sm"
            />
            
            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-xl bg-white border border-neutral-200 rounded-3xl shadow-2xl p-6 sm:p-8 overflow-hidden max-h-[90vh] overflow-y-auto"
            >
              {/* Header block with elegant gradient accent */}
              <div className="absolute top-0 left-0 right-0 h-2.5 bg-gradient-to-r from-blue-400 via-sky-500 to-indigo-600" />
              
              {/* Close Button */}
              <button
                onClick={() => setShowForwardDurbanPopup(false)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full border border-neutral-200 hover:border-neutral-300 bg-neutral-50 hover:bg-neutral-100 flex items-center justify-center text-neutral-500 hover:text-neutral-700 transition-all outline-none cursor-pointer text-sm font-sans"
              >
                ✕
              </button>

              <div className="space-y-6 pt-3 text-left">
                {/* Logo and Intro Header */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 pb-4 border-b border-neutral-100">
                  <div className="w-24 h-24 bg-white border border-neutral-200 rounded-2xl p-2.5 flex items-center justify-center shadow-sm shrink-0 relative overflow-hidden select-none">
                    {!imageLoadErrors["forwardDurban"] && (
                      <img 
                        src={forwardDurbanPng} 
                        alt="Forward Durban Logo" 
                        className="w-full h-full object-contain relative z-10 animate-fade-in"
                        onError={() => {
                          setImageLoadErrors(prev => ({ ...prev, forwardDurban: true }));
                        }}
                        referrerPolicy="no-referrer"
                      />
                    )}
                    {imageLoadErrors["forwardDurban"] && (
                      <div className="absolute inset-0 bg-neutral-50 flex flex-col items-center justify-center p-2 text-center select-none">
                        <Compass size={16} className="text-blue-500 mb-0.5" />
                        <span className="font-display font-bold text-[8px] text-neutral-800 leading-none">FORWARD DURBAN</span>
                      </div>
                    )}
                  </div>
                  <div className="text-center sm:text-left space-y-1 mt-1">
                    <span className="text-[10px] font-mono tracking-widest uppercase font-semibold text-blue-600">
                      Featured Partner Profile
                    </span>
                    <h3 className="font-display font-bold text-neutral-900 text-2xl">
                      Forward Durban
                    </h3>
                    <p className="text-neutral-500 text-xs font-mono font-medium">
                      Civic Coalition • Reshaping the Narrative
                    </p>
                  </div>
                </div>

                {/* Main description section */}
                <div className="space-y-4">
                  <h4 className="font-display font-semibold text-neutral-900 text-sm tracking-wide uppercase">
                    Our Calling & Vision
                  </h4>
                  <p className="text-neutral-700 text-xs sm:text-sm leading-relaxed">
                    We are a movement focused on uplifting Durban’s economic activity and investment potential by reshaping the way our city is seen and supported. Through partnerships with businesses—especially SMMEs—and a strong media presence, we’re rewriting the story of Durban as a city of possibility, growth, and resilience.
                  </p>
                </div>

                {/* Collaboration overview */}
                <div className="space-y-3 bg-blue-50/40 p-4 rounded-2xl border border-blue-100/60">
                  <h4 className="font-display font-semibold text-blue-900 text-xs sm:text-sm flex items-center gap-1.5 uppercase">
                    <Sparkles size={14} className="text-blue-600 shrink-0" />
                    Collaboration with One Health
                  </h4>
                  <p className="text-blue-950 text-xs leading-relaxed font-sans">
                    Forward Durban partners with One Health to bring holistic transformation to marginalized areas of the city. While One Health deploys physical healthcare and critical medical or dental operations directly to vulnerable communities, Forward Durban supports these efforts by mobilizing local businesses, SMMEs, and civic networks. This symbiotic relationship ensures that clinical healing is coupled with economic upliftment, digital visibility, and sustainable livelihood support. By uniting physical wellness with city-wide media advocacy and enterprise growth, the partnership reshapes both the health and economic prospects of Durban’s townships, moving the city forward with resilience and dignity.
                  </p>
                </div>

                {/* Bottom values block */}
                <div className="border-l-2 border-blue-300 pl-3 py-1 bg-blue-50/20 text-[11px] sm:text-xs text-neutral-600 leading-relaxed rounded-r-lg pr-2 font-mono">
                  <p className="font-semibold text-neutral-800 mb-0.5">Core Focus Areas:</p>
                  Economic Empowerment • Civic Engagement • City-Wide Narrative Redefinition
                </div>

                {/* Close modal action */}
                <div className="flex justify-end pt-2 border-t border-neutral-100">
                  <button
                    onClick={() => setShowForwardDurbanPopup(false)}
                    className="outline-none border border-neutral-200 hover:border-neutral-300 bg-neutral-50 hover:bg-neutral-100 text-neutral-700 text-xs font-semibold px-5 py-2.5 rounded-xl cursor-pointer transition-all"
                  >
                    Close Profile
                  </button>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ACFF Detail Popup Modal */}
      <AnimatePresence>
        {showAcffPopup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAcffPopup(false)}
              className="absolute inset-0 bg-neutral-900/60 backdrop-blur-sm"
            />
            
            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-xl bg-white border border-neutral-200 rounded-3xl shadow-2xl p-6 sm:p-8 overflow-hidden max-h-[90vh] overflow-y-auto"
            >
              {/* Header block with elegant gradient accent */}
              <div className="absolute top-0 left-0 right-0 h-2.5 bg-gradient-to-r from-rose-400 via-rose-500 to-rose-600" />
              
              {/* Close Button */}
              <button
                onClick={() => setShowAcffPopup(false)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full border border-neutral-200 hover:border-neutral-300 bg-neutral-50 hover:bg-neutral-100 flex items-center justify-center text-neutral-500 hover:text-neutral-700 transition-all outline-none cursor-pointer text-sm font-sans"
              >
                ✕
              </button>

              <div className="space-y-6 pt-3 text-left">
                {/* Logo and Intro Header */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 pb-4 border-b border-neutral-100">
                  <div className="w-24 h-24 bg-white border border-neutral-200 rounded-2xl p-2.5 flex items-center justify-center shadow-sm shrink-0 relative overflow-hidden select-none">
                    {!imageLoadErrors["acff"] && (
                      <img 
                        src={acffPng} 
                        alt="ACFF Logo" 
                        className="w-full h-full object-contain relative z-10 animate-fade-in"
                        onError={() => {
                          setImageLoadErrors(prev => ({ ...prev, acff: true }));
                        }}
                        referrerPolicy="no-referrer"
                      />
                    )}
                    {imageLoadErrors["acff"] && (
                      <div className="absolute inset-0 bg-neutral-50 flex flex-col items-center justify-center p-2 text-center select-none">
                        <HeartPulse size={16} className="text-rose-500 mb-0.5" />
                        <span className="font-display font-bold text-[8px] text-neutral-800 leading-none">ACFF</span>
                      </div>
                    )}
                  </div>
                  <div className="text-center sm:text-left space-y-1 mt-1">
                    <span className="text-[10px] font-mono tracking-widest uppercase font-semibold text-rose-600">
                      Featured Partner Profile
                    </span>
                    <h3 className="font-display font-bold text-neutral-900 text-xl sm:text-2xl leading-tight">
                      Alliance for a Cavity-Free Future
                    </h3>
                    <p className="text-neutral-500 text-xs font-mono font-medium">
                      Global Non-Profit • Est. 2010
                    </p>
                  </div>
                </div>

                {/* Main description section */}
                <div className="space-y-4">
                  <h4 className="font-display font-semibold text-neutral-900 text-sm tracking-wide uppercase">
                    Our Calling & Vision
                  </h4>
                  <p className="text-neutral-700 text-xs sm:text-sm leading-relaxed">
                    The Alliance for a Cavity-Free Future is a global non-profit organisation committed to fighting against the initiation and progression of dental caries. The ACFF was formed out of this desire to effect change, by a group of like-minded dental professionals joining forces to raise awareness and combat dental caries through promoting clinical and public health action. Since its formation in 2010, the ACFF has worked to build an international network of dental experts, drawing together representatives from many of the world’s leading dental universities and associations, as well as practitioners and public health professionals.
                  </p>
                </div>

                {/* Collaboration overview */}
                <div className="space-y-3 bg-rose-50/40 p-4 rounded-2xl border border-rose-100/60">
                  <h4 className="font-display font-semibold text-rose-900 text-xs sm:text-sm flex items-center gap-1.5 uppercase">
                    <Sparkles size={14} className="text-rose-600 shrink-0" />
                    Collaboration with One Health
                  </h4>
                  <p className="text-rose-950 text-xs leading-relaxed font-sans">
                    The Alliance for a Cavity-Free Future (ACFF) partners with One Health to implement world-class clinical guidelines and raise the bar for community-based caries prevention. While One Health deploys physical mobile dental units and field teams directly to primary schools and township enclaves, ACFF supplies crucial educational resources, public health action checklists, and evidence-based methodologies. This synergy allows us to deliver high-impact clinical interventions alongside preventative knowledge, equipping local teachers, caregivers, and children with the tools they need to maintain healthy smiles. Together, we are creating a network of clinical care that works systematically to transition vulnerable communities toward a cavity-free future.
                  </p>
                </div>

                {/* Bottom values block */}
                <div className="border-l-2 border-rose-300 pl-3 py-1 bg-rose-50/20 text-[11px] sm:text-xs text-neutral-600 leading-relaxed rounded-r-lg pr-2 font-mono">
                  <p className="font-semibold text-neutral-800 mb-0.5">Core Focus Areas:</p>
                  Caries Prevention • Public Health Advocacy • Academic & Clinical Collaboration
                </div>

                {/* Close modal action */}
                <div className="flex justify-end pt-2 border-t border-neutral-100">
                  <button
                    onClick={() => setShowAcffPopup(false)}
                    className="outline-none border border-neutral-200 hover:border-neutral-300 bg-neutral-50 hover:bg-neutral-100 text-neutral-700 text-xs font-semibold px-5 py-2.5 rounded-xl cursor-pointer transition-all"
                  >
                    Close Profile
                  </button>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* iKhethelo Detail Popup Modal */}
      <AnimatePresence>
        {showIKhetheloPopup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowIKhetheloPopup(false)}
              className="absolute inset-0 bg-neutral-900/60 backdrop-blur-sm"
            />
            
            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-xl bg-white border border-neutral-200 rounded-3xl shadow-2xl p-6 sm:p-8 overflow-hidden max-h-[90vh] overflow-y-auto"
            >
              {/* Header block with elegant gradient accent */}
              <div className="absolute top-0 left-0 right-0 h-2.5 bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600" />
              
              {/* Close Button */}
              <button
                onClick={() => setShowIKhetheloPopup(false)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full border border-neutral-200 hover:border-neutral-300 bg-neutral-50 hover:bg-neutral-100 flex items-center justify-center text-neutral-500 hover:text-neutral-700 transition-all outline-none cursor-pointer text-sm font-sans"
              >
                ✕
              </button>

              <div className="space-y-6 pt-3 text-left">
                {/* Logo and Intro Header */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 pb-4 border-b border-neutral-100">
                  <div className="w-24 h-24 bg-white border border-neutral-200 rounded-2xl p-2.5 flex items-center justify-center shadow-sm shrink-0 relative overflow-hidden select-none">
                    {!imageLoadErrors["iKhethelo"] && (
                      <img 
                        src={iKhetheloPng} 
                        alt="iKhethelo Logo" 
                        className="w-full h-full object-contain relative z-10 animate-fade-in"
                        onError={() => {
                          setImageLoadErrors(prev => ({ ...prev, iKhethelo: true }));
                        }}
                        referrerPolicy="no-referrer"
                      />
                    )}
                    {imageLoadErrors["iKhethelo"] && (
                      <div className="absolute inset-0 bg-neutral-50 flex flex-col items-center justify-center p-2 text-center select-none">
                        <Heart size={16} className="text-emerald-500 mb-0.5" />
                        <span className="font-display font-bold text-[8px] text-neutral-800 leading-none">IKHETHELO</span>
                      </div>
                    )}
                  </div>
                  <div className="text-center sm:text-left space-y-1 mt-1">
                    <span className="text-[10px] font-mono tracking-widest uppercase font-semibold text-emerald-600">
                      Featured Partner Profile
                    </span>
                    <h3 className="font-display font-bold text-neutral-900 text-xl sm:text-2xl leading-tight">
                      iKhethelo Children's Village
                    </h3>
                    <p className="text-neutral-500 text-xs font-mono font-medium">
                      Children's Village • Est. Over 20 Years
                    </p>
                  </div>
                </div>

                {/* Main description section */}
                <div className="space-y-4">
                  <h4 className="font-display font-semibold text-neutral-900 text-sm tracking-wide uppercase">
                    Our Calling & Vision
                  </h4>
                  <p className="text-neutral-700 text-xs sm:text-sm leading-relaxed">
                    For over 20 years, we’ve been a place of safety, love, and restoration for children who need it most. Nestled in the peaceful KwaNyuswa Valley, our village is more than a home—it’s family.
                  </p>
                </div>

                {/* Collaboration overview */}
                <div className="space-y-3 bg-emerald-50/40 p-4 rounded-2xl border border-emerald-100/60">
                  <h4 className="font-display font-semibold text-emerald-900 text-xs sm:text-sm flex items-center gap-1.5 uppercase">
                    <Sparkles size={14} className="text-emerald-600 shrink-0" />
                    Collaboration with One Health
                  </h4>
                  <p className="text-emerald-950 text-xs leading-relaxed font-sans">
                    iKhethelo Children's Village partners with One Health to integrate comprehensive physical and emotional healthcare directly within their sanctuary of love and safety. While iKhethelo provides the stable, nurturing environment, family housing, and spiritual care that these vulnerable children need to recover from past trauma, One Health delivers vital mobile clinical operations, including dental screenings, preventative therapy, and primary wellness checkups. By meeting these health needs directly within the village, the collaboration ensures that the children receive top-tier, stress-free clinical care as part of their daily life. Together, we are building a model of holistic healing that protects, restores, and prepares these precious children for bright, healthy futures.
                  </p>
                </div>

                {/* Bottom values block */}
                <div className="border-l-2 border-emerald-300 pl-3 py-1 bg-emerald-50/20 text-[11px] sm:text-xs text-neutral-600 leading-relaxed rounded-r-lg pr-2 font-mono">
                  <p className="font-semibold text-neutral-800 mb-0.5">Core Focus Areas:</p>
                  Child Safety & Protection • Psychological Restoration • Preventative Health & Family Care
                </div>

                {/* Close modal action */}
                <div className="flex justify-end pt-2 border-t border-neutral-100">
                  <button
                    onClick={() => setShowIKhetheloPopup(false)}
                    className="outline-none border border-neutral-200 hover:border-neutral-300 bg-neutral-50 hover:bg-neutral-100 text-neutral-700 text-xs font-semibold px-5 py-2.5 rounded-xl cursor-pointer transition-all"
                  >
                    Close Profile
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
