/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { IMPACT_STATS, PUBLISHED_REPORTS } from "../data";
import { Download, FileText, CheckCircle, Clock, ShieldCheck } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import EditableText from "./EditableText";

export default function ImpactView() {
  const [downloadingIndex, setDownloadingIndex] = useState<number | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState<number | null>(null);

  const simulateDownload = (idx: number) => {
    if (downloadingIndex !== null) return;
    setDownloadingIndex(idx);
    setDownloadSuccess(null);

    setTimeout(() => {
      setDownloadingIndex(null);
      setDownloadSuccess(idx);
      
      // Auto clear green check
      setTimeout(() => {
        setDownloadSuccess(null);
      }, 5000);
    }, 2800);
  };

  return (
    <div className="space-y-16 py-8 animate-fadeIn text-left">
      {/* Introduction */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h2 className="font-display font-medium text-3xl sm:text-4xl text-neutral-900 tracking-tight font-bold">Our Verified Impact</h2>
        <p className="text-neutral-600 text-sm leading-relaxed text-balance">
          Supporter equity flows directly into material supplies on the ground. Below is our clinical performance summary audited across townships.
        </p>
      </div>

      {/* Grid of big statistics */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {IMPACT_STATS.map((stat, idx) => (
          <ScrollReveal
            key={idx}
            delayMs={idx * 50}
            className="border border-neutral-200 bg-neutral-55 bg-neutral-50 p-6 rounded-3xl flex flex-col justify-between hover:bg-white hover:border-neutral-300 hover:shadow-sm duration-300 transition-all text-neutral-900"
            activeClassName="border-neutral-350 bg-white"
          >
            <div className="space-y-2 text-left">
              <span className="text-neutral-900 font-display font-semibold text-3xl sm:text-4xl tracking-tight block font-bold">
                {stat.num}
              </span>
              <h3 className="text-neutral-950 font-display font-semibold text-sm leading-tight leading-snug font-bold">
                {stat.label}
              </h3>
              <p className="text-neutral-600 text-[11px] sm:text-xs leading-relaxed line-clamp-3">
                {stat.description}
              </p>
            </div>
            <div className="border-t border-neutral-200 pt-3 mt-4 text-[9px] font-mono text-neutral-455 uppercase tracking-wider font-semibold">
              VERIFIED KEY METRIC
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* Published Reports & Downloader */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left explanation */}
        <div className="lg:col-span-4 space-y-4">
          <h2 className="font-display font-medium text-2xl text-neutral-900 tracking-tight font-bold">Published Reports</h2>
          <p className="text-neutral-600 text-xs leading-relaxed">
            Download our documented financial and clinical records detailing operational indices, funding loops, and field milestones.
          </p>
          <div className="pt-4 border-t border-neutral-200 space-y-3">
            <div className="flex items-center gap-2 text-neutral-650 text-xs font-semibold">
              <ShieldCheck size={14} className="text-neutral-900" />
              <span>Independent external audits</span>
            </div>
            <div className="flex items-center gap-2 text-neutral-650 text-xs font-semibold">
              <ShieldCheck size={14} className="text-neutral-900" />
              <span>18C Certified Tax Certificates</span>
            </div>
          </div>
        </div>

        {/* List of files with simulator progress bar */}
        <div className="lg:col-span-8 space-y-4 text-left">
          {PUBLISHED_REPORTS.map((report, idx) => (
            <div
              key={idx}
              className="border border-neutral-200 bg-neutral-50 p-5 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-neutral-300 hover:bg-white transition-all duration-300"
            >
              <div className="flex gap-4 items-start text-left">
                <div className="p-3 bg-white border border-neutral-200 text-neutral-900 rounded-xl">
                  <FileText size={20} />
                </div>
                <div className="space-y-1">
                  <h4 className="text-neutral-950 text-xs sm:text-sm font-semibold font-bold">{report.title}</h4>
                  <p className="text-neutral-600 text-xs leading-relaxed max-w-md">{report.desc}</p>
                  <div className="flex items-center gap-3 text-[10px] text-neutral-400 font-mono font-medium">
                    <span>SIZE: {report.size}</span>
                    <span>•</span>
                    <span>RELEASED: {report.date}</span>
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="w-full sm:w-auto shrink-0 pt-2 sm:pt-0">
                {downloadingIndex === idx ? (
                  <div className="flex flex-col items-end gap-1.5 w-full sm:w-[130px]">
                    <div className="flex items-center gap-1.5 text-neutral-900 font-mono text-[10px] font-bold">
                      <Clock size={12} className="animate-spin" />
                      <span>DOWNLOADING...</span>
                    </div>
                    <div className="h-1 w-full bg-neutral-200 rounded-full overflow-hidden">
                      <div className="h-full bg-neutral-900 w-[70%]" />
                    </div>
                  </div>
                ) : downloadSuccess === idx ? (
                  <button className="w-full sm:w-auto outline-none border border-neutral-200 bg-white text-neutral-900 px-4 py-2.5 rounded-xl font-medium text-xs flex items-center justify-center gap-2 cursor-default shadow-sm">
                    <CheckCircle size={14} className="text-neutral-900" />
                    <EditableText id="impact.btn.ready" element="span">Download Ready</EditableText>
                  </button>
                ) : (
                  <button
                    onClick={() => simulateDownload(idx)}
                    className="w-full sm:w-auto outline-none border border-blue-600 bg-blue-600 text-white hover:bg-blue-700 hover:shadow-[0_0_12px_rgba(37,99,235,0.35)] px-4 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all shadow-sm"
                  >
                    <Download size={14} className="animate-bounce" />
                    <EditableText id={`impact.btn.download.${idx}`} element="span">Download PDF</EditableText>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
