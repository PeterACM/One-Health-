/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { TEAM, PARTNERS } from "../data";
import { Sprout, Heart, HeartPulse, Stethoscope, Droplet, Users, Leaf, ArrowUpRight } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import EditableText from "./EditableText";

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

  return (
    <div className="space-y-16 py-8">
      {/* Tab Switcher */}
      <div className="flex border-b border-neutral-200 scrollbar-hide overflow-x-auto justify-start sm:justify-center gap-2 sm:gap-6 sticky top-20 bg-white/95 py-3 backdrop-blur z-30 select-none">
        {[
          { id: "story", label: "Our Story", color: "bg-blue-600 border-blue-600 hover:bg-blue-50 text-blue-600 shadow-blue-500/20" },
          { id: "philosophy", label: "The Philosophy", color: "bg-emerald-600 border-emerald-600 hover:bg-emerald-50 text-emerald-600 shadow-emerald-500/20" },
          { id: "values", label: "Vision, Mission & Objectives", color: "bg-blue-600 border-blue-600 hover:bg-blue-50 text-blue-600 shadow-blue-500/20" },
          { id: "team", label: "The Pioneers", color: "bg-rose-600 border-rose-600 hover:bg-rose-50 text-rose-600 shadow-rose-500/20" }
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
        <div className="space-y-12 animate-fadeIn text-left max-w-4xl mx-auto">
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-8">
            <h2 className="font-display font-medium text-3xl sm:text-4xl text-neutral-900 tracking-tight">
              <EditableText id="about.team.header" element="span">Who Directs One Health?</EditableText>
            </h2>
            <p className="text-neutral-600 text-sm leading-relaxed">
              <EditableText id="about.team.subheader" element="span">Meet our leadership, clinicians, and partners directing operations on the ground across South Africa and Africa.</EditableText>
            </p>
          </div>

          <div className="space-y-8">
            {TEAM.map((member, i) => {
              const isLeader = member.name === "Lesley Naidoo";
              const mId = member.name.replace(/\s+/g, "_");
              return (
                <ScrollReveal
                  key={i}
                  delayMs={i * 100}
                  className={`border p-6 sm:p-8 rounded-3xl transition-all duration-300 relative overflow-hidden group bg-neutral-50 ${
                    isLeader 
                      ? "border-neutral-350 shadow-sm ring-1 ring-neutral-300" 
                      : "border-neutral-200 hover:border-neutral-350 hover:shadow-md"
                  }`}
                >
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-start">
                    {/* Left Column: Avatar & Basic Info */}
                    <div className="md:col-span-4 flex flex-col items-start gap-3">
                      <div className="w-16 h-16 rounded-2xl bg-[#E0750C] text-white flex items-center justify-center font-display font-bold text-xl shadow-md transition-transform duration-300 group-hover:scale-105 select-none font-sans">
                        {member.name.split(" ").slice(-1)[0][0]}
                      </div>
                      
                      <div className="space-y-1 mt-2">
                        <h3 className="font-display font-bold text-neutral-950 text-lg sm:text-xl leading-snug">
                          <EditableText id={`about.team.${mId}.name`} element="span">{member.name}</EditableText>
                        </h3>
                        <span className="text-neutral-500 text-xs font-mono font-medium block">
                          <EditableText id={`about.team.${mId}.role`} element="span">{member.role}</EditableText>
                        </span>
                      </div>

                      {isLeader && (
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest font-semibold bg-[#E0750C]/10 text-[#E0750C] border border-[#E0750C]/25 mt-1 animate-pulse">
                          Team Leader
                        </div>
                      )}
                    </div>

                    {/* Right Column: Bio with paragraph separation support */}
                    <div className="md:col-span-8">
                      <div className="text-neutral-700 text-xs sm:text-sm leading-relaxed whitespace-pre-line">
                        <EditableText id={`about.team.${mId}.bio`} element="span">{member.bio}</EditableText>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      )}

      {/* Brand Partners Showcase */}
      <div className="border-t border-neutral-200 pt-16">
        <ScrollReveal activeClassName="opacity-100 uppercase" threshold={0.05} className="space-y-8 text-center max-w-5xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-4">
            {PARTNERS.map((partner, idx) => (
              <div
                key={idx}
                className="group border border-neutral-200 bg-neutral-50 hover:border-neutral-300 text-neutral-600 px-5 py-3 rounded-2xl flex items-center gap-3 transition-all duration-300 cursor-default select-none shadow-sm"
              >
                <div className="w-8 h-8 rounded-lg bg-white border border-neutral-200 text-neutral-500 text-xs font-mono font-medium flex items-center justify-center">
                  {partner.logoText}
                </div>
                <div className="text-left">
                  <div className="text-neutral-800 text-xs font-medium group-hover:text-neutral-950 transition-colors leading-none">{partner.name}</div>
                  <div className="text-[10px] text-neutral-500 leading-none mt-1">{partner.type}</div>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
