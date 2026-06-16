/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { IMPACT_STATS } from "../data";
import ScrollReveal from "./ScrollReveal";

export default function ImpactView() {
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
    </div>
  );
}
