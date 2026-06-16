/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import * as Icons from "lucide-react";

interface FloatingIconProps {
  name: keyof typeof Icons;
  size: number;
  top: string;
  left: string;
  delay: string;
  animateClass: string;
  opacity: string;
}

const FLOWING_ICONS: FloatingIconProps[] = [
  { name: "HeartPulse", size: 48, top: "8%", left: "5%", delay: "0s", animateClass: "animate-float-slow", opacity: "opacity-8" },
  { name: "Stethoscope", size: 64, top: "25%", left: "85%", delay: "1.5s", animateClass: "animate-float-delayed", opacity: "opacity-6" },
  { name: "Smile", size: 52, top: "15%", left: "45%", delay: "3s", animateClass: "animate-float-fast", opacity: "opacity-5" },
  { name: "Sprout", size: 56, top: "42%", left: "12%", delay: "0.5s", animateClass: "animate-float-slow", opacity: "opacity-7" },
  { name: "Leaf", size: 40, top: "60%", left: "78%", delay: "4s", animateClass: "animate-float-delayed", opacity: "opacity-8" },
  { name: "Activity", size: 60, top: "75%", left: "6%", delay: "2.2s", animateClass: "animate-float-fast", opacity: "opacity-6" },
  { name: "ShieldAlert", size: 44, top: "85%", left: "40%", delay: "5s", animateClass: "animate-float-slow", opacity: "opacity-5" },
  { name: "Globe", size: 70, top: "52%", left: "90%", delay: "2.8s", animateClass: "animate-float-delayed", opacity: "opacity-4" },
  { name: "Users", size: 48, top: "32%", left: "30%", delay: "1.2s", animateClass: "animate-float-fast", opacity: "opacity-7" },
  { name: "Heart", size: 52, top: "2%", left: "75%", delay: "3.5s", animateClass: "animate-float-slow", opacity: "opacity-6" },
  { name: "Briefcase", size: 44, top: "68%", left: "55%", delay: "0.8s", animateClass: "animate-float-delayed", opacity: "opacity-5" },
  { name: "Clipboard", size: 50, top: "92%", left: "82%", delay: "4.5s", animateClass: "animate-float-fast", opacity: "opacity-7" }
];

export default function BackgroundFlow() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      {FLOWING_ICONS.map((ico, idx) => {
        const IconComponent = Icons[ico.name] as React.ComponentType<any>;
        if (!IconComponent) return null;
        return (
          <div
            key={idx}
            className={`absolute text-neutral-300/30 ${ico.opacity} ${ico.animateClass}`}
            style={{
              top: ico.top,
              left: ico.left,
              animationDelay: ico.delay,
              transformOrigin: "center"
            }}
          >
            <IconComponent size={ico.size} strokeWidth={1} />
          </div>
        );
      })}
    </div>
  );
}
