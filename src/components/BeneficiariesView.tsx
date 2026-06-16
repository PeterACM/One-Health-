/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BENEFICIARIES_SUMMARY } from "../data";
import { Building, BookOpen, AlertCircle, Heart } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import EditableText from "./EditableText";

export default function BeneficiariesView() {
  return (
    <div className="space-y-16 py-8">
      {/* Page Intro header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h2 className="font-display font-medium text-3xl sm:text-4xl text-neutral-900 tracking-tight leading-tight">
          <EditableText id="beneficiaries.title" element="span">Communities We serve</EditableText>
        </h2>
        <EditableText id="beneficiaries.summary.intro" className="text-neutral-600 text-sm leading-relaxed text-balance font-medium">
          {BENEFICIARIES_SUMMARY.intro}
        </EditableText>
      </div>

      {/* Target categories layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch text-left">
        {BENEFICIARIES_SUMMARY.categories.map((cat, idx) => (
          <ScrollReveal
            key={idx}
            delayMs={idx * 100}
            className="border border-neutral-200 bg-neutral-50 p-8 rounded-3xl flex flex-col justify-between hover:bg-white hover:border-neutral-300 hover:shadow-sm duration-300 transition-all text-neutral-900"
            activeClassName="border-neutral-300 bg-white"
          >
            <div>
              <div className="p-3 bg-white border border-neutral-200 text-neutral-900 rounded-xl w-fit mb-6">
                {idx === 0 && <Building size={22} />}
                {idx === 1 && <AlertCircle size={22} />}
                {idx === 2 && <BookOpen size={22} />}
                {idx === 3 && <Heart size={22} />}
              </div>
              <h3 className="font-display font-semibold text-lg sm:text-xl text-neutral-900 mb-2 leading-none font-bold">
                <EditableText id={`beneficiaries.category.${idx}.title`} element="span">{cat.title}</EditableText>
              </h3>
              <EditableText id={`beneficiaries.category.${idx}.desc`} className="text-neutral-600 text-xs leading-relaxed font-normal">
                {cat.desc}
              </EditableText>
            </div>
            <div className="border-t border-neutral-200 pt-5 mt-6 text-[10px] font-mono text-neutral-450 tracking-wider font-semibold">
              <EditableText id={`beneficiaries.category.${idx}.footer`} element="span">ESTABLISHED SERVICE CIRCLE</EditableText>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
