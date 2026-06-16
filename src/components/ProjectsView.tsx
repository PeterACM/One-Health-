/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { PROJECT_LIST } from "../data";
import { Project } from "../types";
import * as Icons from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import EditableText from "./EditableText";

interface ProjectsViewProps {
  selectedProjectId: string | null;
  onSelectProject: (id: string | null) => void;
  onDonateSubmit: (projectTitle: string, amount: number) => void;
  onVolunteerClick: (projectTitle: string) => void;
}

export default function ProjectsView({
  selectedProjectId,
  onSelectProject,
  onDonateSubmit,
  onVolunteerClick
}: ProjectsViewProps) {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  
  // State for donation calculator inside detail template
  const [customAmount, setCustomAmount] = useState<string>("250");
  const [selectedPill, setSelectedPill] = useState<number>(250);
  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [donationSuccessMsg, setDonationSuccessMsg] = useState<string | null>(null);

  // Dynamic filter lists
  const categories = ["All", "Healthcare & Oral", "Creation Care", "International", "Faith & Support"];

  const getCategorizedList = () => {
    if (activeFilter === "All") return PROJECT_LIST;
    return PROJECT_LIST.filter((proj) => {
      if (activeFilter === "Healthcare & Oral") {
        return proj.category.includes("Oral") || proj.category.includes("Medicine") || proj.category.includes("Care") || proj.category.includes("Health");
      }
      if (activeFilter === "Creation Care") {
        return proj.category.includes("Creation") || proj.category.includes("Farming") || proj.category.includes("Sovereignty") || proj.category.includes("Food");
      }
      if (activeFilter === "International") {
        return proj.category.includes("Cross-Border");
      }
      if (activeFilter === "Faith & Support") {
        return proj.category.includes("Network") || proj.category.includes("Professional") || proj.category.includes("Community");
      }
      return true;
    });
  };

  const handlePillSelect = (amount: number) => {
    setSelectedPill(amount);
    setCustomAmount(amount.toString());
  };

  const handleCustomAmountChange = (val: string) => {
    setCustomAmount(val);
    const num = parseInt(val);
    if (!isNaN(num)) {
      setSelectedPill(num);
    } else {
      setSelectedPill(0);
    }
  };

  const handleDonationSubmit = (e: React.FormEvent, project: Project) => {
    e.preventDefault();
    const amountNum = parseInt(customAmount);
    if (isNaN(amountNum) || amountNum <= 0) {
      alert("Please specify a valid donation amount (Rands)");
      return;
    }
    // Call props function
    onDonateSubmit(project.title, amountNum);
    setDonationSuccessMsg(`Successfully simulated direct donation of R${amountNum} to ${project.title}. Thank you for playing an active role in healing communities!`);
    
    // Clear success message after 5 seconds
    setTimeout(() => {
      setDonationSuccessMsg(null);
    }, 8500);
  };

  // If a specific project is selected, render Page 4a (Individual Project Template)
  if (selectedProjectId) {
    const project = PROJECT_LIST.find((p) => p.id === selectedProjectId);
    if (!project) return <div className="text-neutral-800 text-sm font-medium py-12">Project not found.</div>;

    const IconName = project.iconName as keyof typeof Icons;
    const DynamicIcon = (Icons[IconName] || Icons.FolderOpen) as React.ComponentType<any>;

    return (
      <div className="space-y-12 py-8 animate-fadeIn text-left">
        {/* Back navigation */}
        <button
          onClick={() => {
            onSelectProject(null);
            setDonationSuccessMsg(null);
          }}
          className="flex items-center gap-2 text-neutral-800 hover:text-neutral-950 text-xs font-mono uppercase tracking-widest cursor-pointer outline-none group border border-neutral-200 bg-white px-4 py-2.5 rounded-xl transition-all shadow-sm"
        >
          <Icons.ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          <EditableText id="projects.btn.back" element="span">Back to initiatives</EditableText>
        </button>

        {/* Layout details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Block: Description, stats & outcome tracking */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <span className="text-neutral-500 text-xs font-mono uppercase tracking-wider block border border-neutral-300 px-3 py-1 rounded-full w-fit bg-transparent font-medium">
                {project.category}
              </span>
              <h1 className="font-display font-medium text-3xl sm:text-4xl text-neutral-900 tracking-tight flex items-center gap-3 font-bold">
                <DynamicIcon className="text-neutral-900 shrink-0" size={32} />
                <span>
                  <EditableText id={`project.${project.id}.title`} element="span">{project.title}</EditableText>
                </span>
              </h1>
              <EditableText id={`project.${project.id}.longDesc`} className="text-neutral-700 leading-relaxed text-sm sm:text-base">
                {project.longDesc}
              </EditableText>
            </div>

            {/* Local Stats Section */}
            <div className="grid grid-cols-3 gap-4">
              {project.stats.map((stat, idx) => (
                <div key={idx} className="border border-neutral-200 bg-neutral-50 p-4 rounded-2xl text-center">
                  <div className="text-neutral-900 font-display font-semibold text-lg sm:text-2xl font-bold">
                    <EditableText id={`project.${project.id}.stat.${idx}.value`} element="span">{stat.value}</EditableText>
                  </div>
                  <div className="text-neutral-500 text-[10px] sm:text-xs mt-1 leading-snug font-medium uppercase tracking-wider font-semibold">
                    <EditableText id={`project.${project.id}.stat.${idx}.label`} element="span">{stat.label}</EditableText>
                  </div>
                </div>
              ))}
            </div>

            {/* Impact Metric & Progress Bar Simulation */}
            <div className="border border-neutral-200 bg-neutral-50 p-6 rounded-2xl space-y-4">
              <span className="text-neutral-500 text-xs font-mono font-medium block uppercase tracking-widest">
                <EditableText id={`project.${project.id}.impactGoalTitle`} element="span">Target Action Plan & Outcomes</EditableText>
              </span>
              <div className="text-neutral-600 text-xs leading-relaxed">
                <EditableText id={`project.${project.id}.impactGoal`} element="span">{project.impactGoal}</EditableText>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-[11px] text-neutral-500 font-mono">
                  <span>ACTIVATION INDEX</span>
                  <span className="text-neutral-900 font-bold">82%</span>
                </div>
                <div className="h-2 bg-neutral-200 rounded-full overflow-hidden">
                  <div className="h-full bg-neutral-900 w-[82%] rounded-full" />
                </div>
              </div>
            </div>

            {/* Quick Actions Panel */}
            <div className="flex flex-wrap gap-4 pt-4 border-t border-neutral-200">
              <button
                onClick={() => onVolunteerClick(project.title)}
                className="outline-none tracking-wider uppercase font-bold text-xs border border-blue-600 bg-blue-600 text-white hover:bg-blue-700 hover:shadow-[0_0_15px_rgba(37,99,235,0.4)] px-6 py-3.5 rounded-xl transition-all cursor-pointer flex items-center gap-2 duration-300"
              >
                <Icons.UserPlus size={14} className="animate-pulse" />
                <EditableText id="projects.btn.volunteer" element="span">Volunteer Skills</EditableText>
              </button>
              
              <button
                onClick={() => {
                  const subId = `Referral for ${project.title}`;
                  window.dispatchEvent(new CustomEvent("navigation-request", { detail: { tab: "contact", subject: subId } }));
                }}
                className="outline-none tracking-wider uppercase font-bold text-xs border border-emerald-600 bg-emerald-600 text-white hover:bg-emerald-700 hover:shadow-[0_0_15px_rgba(16,185,129,0.4)] px-6 py-3.5 rounded-xl transition-all cursor-pointer duration-300"
              >
                <EditableText id="projects.btn.refer" element="span">Refer a family / center</EditableText>
              </button>
            </div>
          </div>

          {/* Right Block: Live Donation Checker simulating Secure Gateways */}
          <div className="lg:col-span-5 space-y-6">
            <div className="border border-neutral-200 bg-neutral-50 p-6 sm:p-8 rounded-3xl relative overflow-hidden shadow-sm">
              <h3 className="font-display font-medium text-neutral-950 text-lg sm:text-xl mb-2 font-bold">
                Direct Project Donation
              </h3>
              
              <p className="text-neutral-600 text-xs leading-relaxed mb-6">
                Your direct contribution is allocated fully to the resources required by <strong className="text-neutral-900 font-semibold">{project.title}</strong> on field trips. Safe checkout gateway simulation.
              </p>

              {donationSuccessMsg ? (
                <div className="p-4 bg-white border border-dashed border-neutral-300 text-neutral-800 text-xs rounded-2xl flex items-start gap-3 animate-fadeIn font-medium">
                  <Icons.PartyPopper size={20} className="shrink-0 text-neutral-800 animate-bounce" />
                  <p>{donationSuccessMsg}</p>
                </div>
              ) : (
                <form onSubmit={(e) => handleDonationSubmit(e, project)} className="space-y-4">
                  
                  {/* Amount grid */}
                  <div className="space-y-2">
                    <label className="text-[11px] text-neutral-400 font-mono uppercase tracking-widest block font-bold">
                      Choose donation amount (ZAR)
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {[100, 250, 500, 1000].map((amt) => (
                        <button
                          key={amt}
                          type="button"
                          onClick={() => handlePillSelect(amt)}
                          className={`py-2 px-1 rounded-xl font-mono text-xs font-semibold border transition-all cursor-pointer outline-none ${
                            selectedPill === amt
                              ? "bg-emerald-600 border-emerald-600 text-white shadow-md shadow-emerald-500/10 font-bold"
                              : "border-neutral-200 bg-white text-neutral-850 hover:border-emerald-500 hover:text-emerald-700"
                          }`}
                        >
                          R{amt}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Custom input */}
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 font-mono text-sm font-semibold">
                      ZAR (R)
                    </span>
                    <input
                      type="number"
                      required
                      min="10"
                      value={customAmount}
                      onChange={(e) => handleCustomAmountChange(e.target.value)}
                      placeholder="Specify custom amount..."
                      className="w-full bg-white border border-neutral-200 focus:border-neutral-900 rounded-xl pl-20 pr-4 py-3 text-sm text-neutral-900 font-mono placeholder-neutral-400 outline-none"
                    />
                  </div>

                  {/* Donor baseline inputs */}
                  <div className="space-y-3 pt-2">
                    <input
                      type="text"
                      required
                      placeholder="Your Full Name"
                      value={donorName}
                      onChange={(e) => setDonorName(e.target.value)}
                      className="w-full bg-white border border-neutral-200 focus:border-neutral-900 rounded-xl px-4 py-3 text-xs text-neutral-900 placeholder-neutral-400 outline-none"
                    />
                    <input
                      type="email"
                      required
                      placeholder="you@address.com"
                      value={donorEmail}
                      onChange={(e) => setDonorEmail(e.target.value)}
                      className="w-full bg-white border border-neutral-200 focus:border-neutral-900 rounded-xl px-4 py-3 text-xs text-neutral-900 placeholder-neutral-400 outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full outline-none bg-emerald-600 border border-emerald-600 text-white hover:bg-emerald-700 hover:shadow-[0_0_20px_rgba(16,185,129,0.45)] font-bold tracking-wider text-xs uppercase px-6 py-3.5 rounded-xl cursor-pointer transition-all active:scale-[0.98] duration-300 flex items-center justify-center gap-2 shadow-sm"
                  >
                    <Icons.Lock size={12} className="text-white fill-current" />
                    <span>
                      <EditableText id="projects.btn.secureDonate" element="span">Secure Donation</EditableText> R{customAmount || "0"}
                    </span>
                  </button>

                  <div className="text-center text-[10px] text-neutral-400 font-mono">
                    SECURED LAYER SYSTEM (18C COMPLIANT)
                  </div>
                </form>
              )}
            </div>


          </div>
        </div>
      </div>
    );
  }

  // List View (Page 4)
  return (
    <div className="space-y-12 py-8 text-left">
      {/* Intro text */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h2 className="font-display font-medium text-3xl sm:text-4xl text-neutral-900 tracking-tight">Our Projects & Active Initiatives</h2>
        <EditableText id="projects.list.intro" className="text-neutral-600 text-sm leading-relaxed text-balance text-center">
          Each initiative answers a specific community deficit. Choose an initiative card below to inspect clinical stats, milestones, target goals, and make project-specific donations.
        </EditableText>
      </div>

      {/* Categories block */}
      <div className="flex border-b border-neutral-200 scrollbar-hide overflow-x-auto justify-start sm:justify-center gap-1 sm:gap-3 py-2 select-none z-10">
        {categories.map((cat, idx) => {
          const isActive = activeFilter === cat;
          
          // Color-code each tab uniquely to reflect the project areas
          let colorClass = "bg-neutral-900 border-neutral-900 text-white shadow-sm";
          if (cat === "All" || cat === "International") {
            colorClass = "bg-blue-600 border-blue-600 text-white font-bold shadow-md shadow-blue-500/20";
          } else if (cat === "Healthcare & Oral" || cat === "Creation Care") {
            colorClass = "bg-emerald-600 border-emerald-600 text-white font-bold shadow-md shadow-emerald-500/20";
          } else if (cat === "Faith & Support") {
            colorClass = "bg-rose-600 border-rose-600 text-white font-bold shadow-md shadow-rose-500/20";
          }

          return (
            <button
              key={idx}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-colors outline-none cursor-pointer border ${
                isActive
                  ? colorClass
                  : "text-neutral-500 border-transparent hover:text-neutral-900 hover:bg-neutral-50"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Grid of Projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {getCategorizedList().map((proj, idx) => {
          const IconComponent = (Icons[proj.iconName as keyof typeof Icons] || Icons.FolderOpen) as React.ComponentType<any>;
          
          const cardColors = [
            // Index 0/3/6... (Green)
            {
              card: "hover:bg-emerald-800 hover:border-emerald-800 hover:shadow-md",
              tag: "group-hover:bg-emerald-900 group-hover:border-emerald-700 group-hover:text-emerald-300",
              icon: "group-hover:text-emerald-300",
              title: "group-hover:text-white",
              desc: "group-hover:text-emerald-100",
              footer: "group-hover:text-white group-hover:border-emerald-700/50"
            },
            // Index 1/4/7... (Blue)
            {
              card: "hover:bg-blue-800 hover:border-blue-800 hover:shadow-md",
              tag: "group-hover:bg-blue-900 group-hover:border-blue-700 group-hover:text-blue-300",
              icon: "group-hover:text-blue-300",
              title: "group-hover:text-white",
              desc: "group-hover:text-blue-100",
              footer: "group-hover:text-white group-hover:border-blue-700/50"
            },
            // Index 2/5/8... (Red)
            {
              card: "hover:bg-rose-800 hover:border-rose-800 hover:shadow-md",
              tag: "group-hover:bg-rose-900 group-hover:border-rose-700 group-hover:text-rose-300",
              icon: "group-hover:text-rose-300",
              title: "group-hover:text-white",
              desc: "group-hover:text-rose-100",
              footer: "group-hover:text-white group-hover:border-rose-700/50"
            }
          ];
          
          const colorSet = cardColors[idx % 3];

          return (
            <ScrollReveal
              key={proj.id}
              delayMs={idx * 50}
              className={`border border-neutral-200 bg-neutral-50 p-6 rounded-2xl flex flex-col justify-between h-[300px] cursor-pointer group duration-350 transition-all ${colorSet.card}`}
              activeClassName="border-neutral-300 bg-white font-medium"
            >
              <div onClick={() => onSelectProject(proj.id)} className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className={`text-neutral-600 font-mono text-[10px] uppercase tracking-widest bg-white border border-neutral-200 px-2.5 py-1 rounded-full font-semibold transition-colors duration-300 ${colorSet.tag}`}>
                    {proj.tag}
                  </span>
                  <div className={`text-neutral-500 duration-300 transition-colors ${colorSet.icon}`}>
                    <IconComponent size={20} strokeWidth={1.5} />
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className={`font-display font-medium text-neutral-950 text-sm transition-colors font-semibold duration-305 ${colorSet.title}`}>
                    <EditableText id={`projects.${proj.id}.title`} element="span">{proj.title}</EditableText>
                  </h3>
                  <div className={`text-neutral-600 text-xs leading-relaxed line-clamp-3 transition-colors duration-300 ${colorSet.desc}`}>
                    <EditableText id={`projects.${proj.id}.shortDesc`} element="span">{proj.shortDesc}</EditableText>
                  </div>
                </div>
              </div>

              <div
                onClick={() => onSelectProject(proj.id)}
                className={`flex items-center gap-2 text-neutral-900 text-[11px] font-mono uppercase tracking-widest font-semibold pt-4 border-t border-neutral-200 cursor-pointer transition-all duration-300 ${colorSet.footer}`}
              >
                <EditableText id={`projects.grid.btn.${proj.id}`} element="span">Details & Donate</EditableText>
                <Icons.ArrowRight size={12} className="group-hover:translate-x-1 duration-300 transition-all text-current" />
              </div>
            </ScrollReveal>
          );
        })}
      </div>
    </div>
  );
}
