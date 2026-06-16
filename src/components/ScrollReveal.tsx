/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef, ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  activeClassName?: string; // class added when scrolled into view
  threshold?: number;
  delayMs?: number;
  key?: any;
}

export default function ScrollReveal({
  children,
  className = "",
  activeClassName = "",
  threshold = 0.15,
  delayMs = 0
}: ScrollRevealProps) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
        } else {
          setIsIntersecting(false);
        }
      },
      {
        threshold,
        rootMargin: "0px 0px -10% 0px"
      }
    );

    const currentEl = elementRef.current;
    if (currentEl) {
      observer.observe(currentEl);
    }

    return () => {
      if (currentEl) {
        observer.unobserve(currentEl);
      }
    };
  }, [threshold]);

  return (
    <div
      ref={elementRef}
      className={`scrolled-active duration-700 ease-out transition-all ${className} ${
        isIntersecting
          ? `opacity-100 translate-y-0 ${activeClassName}`
          : "opacity-0 translate-y-4"
      }`}
      style={{ transitionDelay: `${delayMs}ms` }}
    >
      {children}
    </div>
  );
}
