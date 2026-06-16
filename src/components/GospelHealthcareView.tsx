/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { ArrowRight, CheckCircle2, BookOpen, Stethoscope } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import EditableText from "./EditableText";

interface GospelHealthcareViewProps {
  onRegisterInterest?: () => void;
  onZimMissionClick?: () => void;
}

export default function GospelHealthcareView({ onRegisterInterest, onZimMissionClick }: GospelHealthcareViewProps) {
  return (
    <div className="space-y-16 py-8">
      {/* Banner */}
      <div className="relative rounded-3xl border border-neutral-200 bg-neutral-50 p-8 md:p-12 overflow-hidden flex flex-col md:flex-row items-center gap-8 justify-between shadow-sm select-none text-left">
        <div className="space-y-4 max-w-2xl">
          <h2 className="font-display font-medium text-3xl sm:text-4xl text-neutral-900 tracking-tight leading-tight">
            <EditableText id="gospel.banner.title" element="span">Where Healthcare Meets Hope.</EditableText>
          </h2>
          <EditableText id="gospel.banner.para" className="text-neutral-600 text-sm leading-relaxed">
            One Health holds together two critical coordinates that were never meant to be separated: the physical healing of the body, and the spiritual restoration of the soul. No clinician operates alone; every diagnostic tool runs beside a heart of profound encouragement.
          </EditableText>
        </div>

        <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0 w-full sm:w-auto">
          <button
            onClick={onRegisterInterest}
            className="outline-none tracking-wider uppercase font-bold text-xs border border-blue-600 bg-blue-600 text-white hover:bg-blue-700 hover:shadow-[0_0_15px_rgba(37,99,235,0.4)] px-6 py-4 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-sm duration-300"
          >
            <EditableText id="gospel.banner.btn1" element="span">Register Interests</EditableText>
            <ArrowRight size={14} className="animate-pulse" />
          </button>
          <button
            onClick={onZimMissionClick}
            className="outline-none tracking-wider uppercase font-bold text-xs border border-emerald-600 bg-emerald-600 text-white px-6 py-4 rounded-xl transition-all cursor-pointer hover:bg-emerald-700 hover:shadow-[0_0_15px_rgba(16,185,129,0.4)] text-center duration-300"
          >
            <EditableText id="gospel.banner.btn2" element="span">View Africa Mission</EditableText>
          </button>
        </div>
      </div>

      {/* Philosophy breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch text-left">
        <ScrollReveal activeClassName="border-neutral-300 bg-white shadow-sm" className="border border-neutral-200 bg-neutral-50 p-8 rounded-3xl flex flex-col justify-between transition-all duration-300">
          <div>
            <div className="p-3 bg-white text-neutral-900 rounded-2xl w-fit mb-6 border border-neutral-200">
              <Stethoscope size={28} />
            </div>
            <h3 className="font-display font-medium text-xl text-neutral-900 mb-3 font-semibold">
              <EditableText id="gospel.health.title" element="span">Healthcare Aspect</EditableText>
            </h3>
            <EditableText id="gospel.health.para" className="text-neutral-600 text-sm leading-relaxed mb-6">
              Free pediatric oral surgery routines (ToothKeepers), mobile clinic loops inside remote villages, maternal first-aid checks, and pro-bono corrective surgeries organized through the Professional Health Network. We approach our medicine with stringent professional protocols.
            </EditableText>
            <ul className="space-y-2 text-neutral-600 text-xs font-medium">
              <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-neutral-900 shrink-0" /> Certified surgical equipment deployment</li>
              <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-neutral-900 shrink-0" /> Mobile pediatric dentistry vans</li>
              <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-neutral-900 shrink-0" /> Licensed private medical partners</li>
            </ul>
          </div>
          <div className="border-t border-neutral-200 pt-6 mt-6 text-xs font-mono text-neutral-450 font-medium">
            <EditableText id="gospel.health.footer" element="span">DIGNIFIED CLINICAL INTERVENTION</EditableText>
          </div>
        </ScrollReveal>
 
        <ScrollReveal activeClassName="border-neutral-300 bg-white shadow-sm" className="border border-neutral-200 bg-neutral-50 p-8 rounded-3xl flex flex-col justify-between transition-all duration-300">
          <div>
            <div className="p-3 bg-white text-neutral-900 rounded-2xl w-fit mb-6 border border-neutral-200">
              <BookOpen size={28} />
            </div>
            <h3 className="font-display font-medium text-xl text-neutral-900 mb-3 font-semibold">
              <EditableText id="gospel.message.title" element="span">The Gospel Message</EditableText>
            </h3>
            <EditableText id="gospel.message.para" className="text-neutral-600 text-sm leading-relaxed mb-6">
              We stand firm on a message of hope. Deep restoration must extend beyond treating physically decaying teeth. Alongside clinic work, our voluntary team offers spiritual counseling, bibles, prayer blocks, and assists local township churches to expand care networks.
            </EditableText>
            <ul className="space-y-2 text-neutral-600 text-xs font-medium">
              <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-neutral-900 shrink-0" /> Prayer & comfort inside clinical areas</li>
              <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-neutral-900 shrink-0" /> Partnership with localized church alliances</li>
              <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-neutral-900 shrink-0" /> Care home volunteer support circles</li>
            </ul>
          </div>
          <div className="border-t border-neutral-200 pt-6 mt-6 text-xs font-mono text-neutral-450 font-medium">
            <EditableText id="gospel.message.footer" element="span">SPIRITUAL COMFORT & RE-ANCHORING</EditableText>
          </div>
        </ScrollReveal>
      </div>
 
      {/* Integration Justification */}
      <div className="text-center max-w-4xl mx-auto space-y-6">
        <h3 className="font-display font-medium text-2xl text-neutral-900">
          <EditableText id="gospel.integration.title" element="span">Why Do We Hold Both Together?</EditableText>
        </h3>
        <EditableText id="gospel.integration.para" className="text-neutral-600 text-sm leading-relaxed max-w-2xl mx-auto">
          Many organizations separating care functions focus strictly on physical aid or purely structural support. However, local mothers who receive maternal checkups deserve spiritual validation and personal dignity. Children treated at dental setups deserve to know they are intrinsically seen and loved.
        </EditableText>
        
      </div>
    </div>
  );
}
