/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { DollarSign, Menu, X, Heart } from "lucide-react";
import EditableText from "./EditableText";
// @ts-ignore
import logo from "../one_health_logo.png";

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tabId: string) => void;
  onDonateClick: () => void;
}

const NAV_ITEMS = [
  { id: "about", label: "About" },
  { id: "gospel", label: "Gospel & Healthcare" },
  { id: "projects", label: "Projects" },
  { id: "beneficiaries", label: "Beneficiaries" },
  { id: "gallery", label: "Gallery" },
  { id: "impact", label: "Impact" },
  { id: "participate", label: "Participate" },
  { id: "contact", label: "Contact" }
];

export default function Header({ activeTab, setActiveTab, onDonateClick }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-200 bg-white/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 sm:h-28 flex items-center justify-between">
        {/* Logo and Brand */}
        <button
          onClick={() => handleNavClick("about")}
          className="flex items-center cursor-pointer group outline-none h-full"
          id="header-logo-btn"
        >
          <img
            src={logo}
            alt="One Health Logo"
            className="h-14 xs:h-16 sm:h-24 md:h-26 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.03]"
            referrerPolicy="no-referrer"
            id="header-logo-img"
          />
        </button>

        {/* Desktop Links */}
        <nav className="hidden lg:flex items-center gap-1">
          {NAV_ITEMS.map((item) => {
            const isActive = activeTab === item.id || (activeTab === "project-details" && item.id === "projects");
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`relative px-4 py-2 rounded-lg text-xs font-medium tracking-wider uppercase transition-all duration-300 cursor-pointer outline-none ${
                  isActive
                    ? "text-neutral-950 font-semibold"
                    : "text-neutral-500 hover:text-neutral-900"
                }`}
              >
                <span>{item.label}</span>
                {isActive && (
                  <div className="absolute bottom-[-10px] left-4 right-4 h-0.5 bg-neutral-900 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* CTA and Hamburger */}
        <div className="flex items-center gap-4">
          <button
            onClick={onDonateClick}
            className="group outline-none bg-emerald-600 border border-emerald-600 text-white hover:bg-emerald-700 hover:text-white hover:shadow-[0_0_18px_rgba(16,185,129,0.45)] transition-all cursor-pointer px-5 py-2.5 rounded-xl font-bold text-xs tracking-wider uppercase flex items-center gap-2 duration-300"
          >
            <Heart size={14} className="group-hover:scale-110 transition-transform text-white fill-current" />
            <EditableText id="header.donate" element="span">Donate Now</EditableText>
          </button>

          {/* Hamburger trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-neutral-500 hover:text-neutral-900 outline-none cursor-pointer p-1.5 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-all"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-20 sm:top-28 left-0 w-full bg-white border-b border-neutral-200 flex flex-col p-4 gap-2 z-40 float-none animate-fadeIn shadow-lg">
          {NAV_ITEMS.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-left px-4 py-3 rounded-xl text-sm font-medium tracking-wider uppercase transition-colors outline-none ${
                  isActive
                    ? "bg-neutral-50 text-neutral-900 border border-neutral-200"
                    : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
}
