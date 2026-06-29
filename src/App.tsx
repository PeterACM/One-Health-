/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import BackgroundFlow from "./components/BackgroundFlow";
import ParallaxBanner from "./components/ParallaxBanner";
import Header from "./components/Header";
import AboutView from "./components/AboutView";
import GospelHealthcareView from "./components/GospelHealthcareView";
import ProjectsView from "./components/ProjectsView";
import BeneficiariesView from "./components/BeneficiariesView";
import StoriesView from "./components/StoriesView";
import ImpactView from "./components/ImpactView";
import ParticipateView from "./components/ParticipateView";
import ContactView from "./components/ContactView";
import ScrollReveal from "./components/ScrollReveal";

import { TextEditProvider } from "./components/TextEditContext";
import EditorControlPanel from "./components/EditorControlPanel";
import AIChatbot from "./components/AIChatbot";
import EditableText from "./components/EditableText";

import { LogOut, Heart, ShieldAlert, AlertCircle, Phone, Mail, Instagram, MapPin, HandHeart, CheckCircle2 } from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("about");
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  // Global overlay Donation card state
  const [showGlobalDonation, setShowGlobalDonation] = useState(false);
  const [globAmount, setGlobAmount] = useState("250");
  const [globPill, setGlobPill] = useState(250);
  const [globName, setGlobName] = useState("");
  const [globEmail, setGlobEmail] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState<string | null>(null);

  // Listen for custom navigation requests between components
  useEffect(() => {
    const handleNavRequest = (e: any) => {
      if (e.detail?.tab) {
        setActiveTab(e.detail.tab);
        if (e.detail.project) {
          setSelectedProjectId(e.detail.project);
        } else {
          setSelectedProjectId(null);
        }
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };
    
    window.addEventListener("navigation-request", handleNavRequest);
    return () => window.removeEventListener("navigation-request", handleNavRequest);
  }, []);

  const handleGlobalDonationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amt = parseInt(globAmount);
    if (isNaN(amt) || amt <= 0) {
      alert("Please specify a valid ZAR Rand amount");
      return;
    }
    setPaymentSuccess(`Thank you ${globName.split(" ")[0]}! We simulated a secure payment of R${amt} ZAR. A tax section-18C receipt certificate has been compiled for ${globEmail}.`);
    
    setTimeout(() => {
      setPaymentSuccess(null);
      setShowGlobalDonation(false);
      setGlobName("");
      setGlobEmail("");
    }, 6000);
  };

  const handlePillSelect = (val: number) => {
    setGlobPill(val);
    setGlobAmount(val.toString());
  };

  const handleCustomAmtChange = (val: string) => {
    setGlobAmount(val);
    const num = parseInt(val);
    if (!isNaN(num)) {
      setGlobPill(num);
    } else {
      setGlobPill(0);
    }
  };

  return (
    <TextEditProvider>
      <div className="relative min-h-screen bg-white font-sans text-neutral-800 overflow-x-hidden selection:bg-neutral-200 selection:text-neutral-900">
      
      {/* 1. Animated drifting elements flowing in background */}
      <BackgroundFlow />

      {/* 2. Premium sticky header */}
      <Header
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setSelectedProjectId(null); // Clear selected project detail view on tab switch
        }}
        onDonateClick={() => setShowGlobalDonation(true)}
      />

      {/* 3. Hero Parallax banner container (Shown predominantly on Home / About View first loads) */}
      {activeTab === "about" && !selectedProjectId && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
          <ParallaxBanner
            onLearnMore={() => {
              setActiveTab("gospel");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            onDonate={() => setShowGlobalDonation(true)}
          />
        </div>
      )}

      {/* 4. Main content viewport section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10">
        
        {/* Render View Blocks matching selected Nav index */}
        <section className="min-h-[500px]">
          {activeTab === "about" && (
            <AboutView
              onLearnMoreProjects={() => {
                setActiveTab("projects");
                setSelectedProjectId(null);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              onDonate={() => setShowGlobalDonation(true)}
            />
          )}

          {activeTab === "gospel" && (
            <GospelHealthcareView
              onRegisterInterest={() => {
                setActiveTab("participate");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              onZimMissionClick={() => {
                setActiveTab("projects");
                setSelectedProjectId("zimbabwe");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />
          )}

          {activeTab === "projects" && (
            <ProjectsView
              selectedProjectId={selectedProjectId}
              onSelectProject={setSelectedProjectId}
              onDonateSubmit={(proj, amt) => {
                // Pre-populate global checkout values for simulated synergy
                setGlobPill(amt);
                setGlobAmount(amt.toString());
                setShowGlobalDonation(true);
              }}
              onVolunteerClick={() => {
                setActiveTab("participate");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />
          )}

          {activeTab === "beneficiaries" && <BeneficiariesView />}

          {activeTab === "stories" && <StoriesView />}

          {activeTab === "impact" && <ImpactView />}

          {activeTab === "participate" && <ParticipateView />}

          {activeTab === "contact" && <ContactView />}
        </section>

      </main>

      {/* 5. Sticky Floating Quick Contact & Action Beads (Margins) */}
      <AIChatbot />

      {/* 6. Interlinked Footer Area matching wireframe elements */}
      <footer className="border-t border-neutral-200 bg-neutral-50 relative z-10 pt-16 pb-8 select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            
            {/* Mission statement column */}
            <div className="space-y-4 text-left">
              <div className="flex items-center gap-2 text-neutral-900 font-display font-medium text-lg">
                <div className="w-2.5 h-2.5 bg-neutral-900 rounded-full" />
                <EditableText id="footer.brand" element="span">One Health</EditableText>
              </div>
              <div className="text-neutral-600 text-xs leading-relaxed max-w-sm">
                <EditableText id="footer.desc" element="p">
                  Bringing critical dental screens, environmental cleanups, organic farming skills, and spiritual relief to overlooking territories inside Hillcrest and surrounding township hubs and other countries across Africa.
                </EditableText>
              </div>
            </div>

            {/* Organizations Columns */}
            <div className="space-y-4 text-left">
              <h4 className="text-neutral-900 font-display text-xs font-semibold tracking-wider uppercase">
                <EditableText id="footer.heading1" element="span">Organisation</EditableText>
              </h4>
              <ul className="space-y-2 text-neutral-600 text-xs font-medium">
                <li><button onClick={() => { setActiveTab("about"); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="hover:text-neutral-950 transition-colors outline-none cursor-pointer"><EditableText id="footer.link1.1" element="span">Our story & vision</EditableText></button></li>
                <li><button onClick={() => { setActiveTab("about"); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="hover:text-neutral-950 transition-colors outline-none cursor-pointer"><EditableText id="footer.link1.2" element="span">One Health philosophy</EditableText></button></li>
                <li><button onClick={() => { setActiveTab("about"); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="hover:text-neutral-950 transition-colors outline-none cursor-pointer"><EditableText id="footer.link1.3" element="span">The pioneer team</EditableText></button></li>
              </ul>
            </div>

            {/* Participation Column */}
            <div className="space-y-4 text-left">
              <h4 className="text-neutral-900 font-display text-xs font-semibold tracking-wider uppercase">
                <EditableText id="footer.heading2" element="span">Get Involved</EditableText>
              </h4>
              <ul className="space-y-2 text-neutral-600 text-xs font-medium">
                <li><button onClick={() => setShowGlobalDonation(true)} className="hover:text-neutral-900 transition-colors outline-none cursor-pointer"><EditableText id="footer.link2.1" element="span">Direct project feeding</EditableText></button></li>
                <li><button onClick={() => { setActiveTab("participate"); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="hover:text-neutral-900 transition-colors outline-none cursor-pointer font-semibold text-neutral-900"><EditableText id="footer.link2.2" element="span">Volunteer services</EditableText></button></li>
                <li><button onClick={() => { setActiveTab("participate"); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="hover:text-neutral-900 transition-colors outline-none cursor-pointer"><EditableText id="footer.link2.3" element="span">Corporate partnerships</EditableText></button></li>
                <li><button onClick={() => { setActiveTab("contact"); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="hover:text-neutral-900 transition-colors outline-none cursor-pointer"><EditableText id="footer.link2.4" element="span">Referral submission</EditableText></button></li>
              </ul>
            </div>

            {/* Featured Projects Column */}
            <div className="space-y-4 text-left">
              <h4 className="text-neutral-900 font-display text-xs font-semibold tracking-wider uppercase">
                <EditableText id="footer.heading3" element="span">Active Initiatives</EditableText>
              </h4>
              <ul className="space-y-2 text-neutral-600 text-xs font-medium">
                <li><button onClick={() => { setActiveTab("projects"); setSelectedProjectId("keepers"); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="hover:text-neutral-950 transition-colors outline-none"><EditableText id="footer.link3.1" element="span">ToothKeepers screens</EditableText></button></li>
                <li><button onClick={() => { setActiveTab("projects"); setSelectedProjectId("zimbabwe"); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="hover:text-neutral-950 transition-colors outline-none"><EditableText id="footer.link3.2" element="span">Africa surgical missions</EditableText></button></li>
                <li><button onClick={() => { setActiveTab("projects"); setSelectedProjectId("maternal"); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="hover:text-neutral-950 transition-colors outline-none"><EditableText id="footer.link3.3" element="span">Maternal & child aid</EditableText></button></li>
                <li><button onClick={() => { setActiveTab("projects"); setSelectedProjectId(null); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="text-neutral-900 font-semibold hover:text-neutral-950 transition-colors"><EditableText id="footer.link3.4" element="span">See all initiatives →</EditableText></button></li>
              </ul>
            </div>

          </div>

          <div className="border-t border-neutral-200 pt-8 mt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-neutral-500 text-xs font-mono">
            <span><EditableText id="footer.copyright" element="span">© 2026 One Health • Non-Profit Organisation (SA)</EditableText></span>
            <div className="flex gap-4 items-center">
              <span><EditableText id="footer.credit" element="span">Website designed and developed by Peter</EditableText></span>
            </div>
          </div>
        </div>
      </footer>

      {/* GLOBAL SECURE CHECKOUT POPUP DIALOG */}
      {showGlobalDonation && (
        <div className="fixed inset-0 bg-neutral-900/60 backdrop-blur-sm z-50 overflow-y-auto p-4 flex items-center justify-center animate-fadeIn select-none">
          <div className="border border-neutral-200 bg-white max-w-xl w-full rounded-2xl p-6 sm:p-8 space-y-6 relative animate-scaleUp text-left shadow-2xl">
            <span className="text-neutral-500 font-mono text-[9px] uppercase tracking-widest px-3 py-1 border border-neutral-300 rounded-full w-fit block font-medium bg-transparent">
              Safe Supporter Checkout Simulator
            </span>

            {/* Exit trigger */}
            <button
              onClick={() => {
                setShowGlobalDonation(false);
                setPaymentSuccess(null);
              }}
              className="absolute top-4 right-4 text-neutral-500 hover:text-neutral-800 border border-neutral-200 rounded-lg p-1.5 hover:bg-neutral-50 cursor-pointer outline-none"
            >
              <EditableText id="donation.btn.cancel" element="span">Cancel</EditableText>
            </button>

            {paymentSuccess ? (
              <div className="p-6 bg-neutral-50 border border-neutral-200 text-neutral-800 text-center rounded-2xl space-y-4 animate-scaleUp">
                <div className="p-3 bg-neutral-905 bg-neutral-900 text-white rounded-full w-fit mx-auto animate-bounce">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="font-display font-medium text-neutral-900 text-lg">Donation Simulated</h3>
                <p className="text-xs leading-relaxed max-w-md mx-auto text-neutral-600">{paymentSuccess}</p>
                <button
                  onClick={() => {
                    setShowGlobalDonation(false);
                    setPaymentSuccess(null);
                  }}
                  className="outline-none tracking-wider uppercase font-semibold text-xs bg-neutral-900 hover:bg-neutral-800 text-white px-6 py-3 rounded-xl transition-all cursor-pointer"
                >
                  <EditableText id="donation.btn.return" element="span">Return to portal</EditableText>
                </button>
              </div>
            ) : (
              <form onSubmit={handleGlobalDonationSubmit} className="space-y-4">
                <div className="space-y-1">
                  <h3 className="font-display font-bold text-neutral-950 text-xl">Sponsor Outreach Plans</h3>
                  <p className="text-neutral-500 text-xs leading-relaxed">
                    Set your support budget. Direct ZAR routing to trailer operational pools. Fully secure SSL simulation.
                  </p>
                </div>

                {/* Amount grid */}
                <div className="space-y-2 pt-2">
                  <label className="text-[10px] text-neutral-400 font-mono uppercase tracking-widest block font-bold">Quick Amount Presets (ZAR)</label>
                  <div className="grid grid-cols-4 gap-2">
                    {[100, 250, 500, 1000].map((val) => (
                      <button
                        type="button"
                        key={val}
                        onClick={() => handlePillSelect(val)}
                        className={`py-2 px-1 rounded-xl text-center font-mono text-xs font-semibold border cursor-pointer outline-none transition-all ${
                          globPill === val
                            ? "bg-emerald-600 border-emerald-600 text-white shadow-md shadow-emerald-500/10 font-bold"
                            : "bg-white border-neutral-200 text-neutral-700 hover:border-emerald-500 hover:text-emerald-700 hover:bg-neutral-50"
                        }`}
                      >
                        R{val}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Custom numeric range specifier */}
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 text-sm font-semibold font-mono">
                    ZAR (R)
                  </span>
                  <input
                    type="number"
                    required
                    min="10"
                    placeholder="Enter custom cash amount..."
                    value={globAmount}
                    onChange={(e) => handleCustomAmtChange(e.target.value)}
                    className="w-full bg-neutral-50 border border-neutral-200 focus:border-neutral-900 rounded-xl pl-20 pr-4 py-3 text-sm text-neutral-900 font-mono placeholder-neutral-400 outline-none"
                  />
                </div>

                {/* Donor profile fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <input
                    type="text"
                    required
                    placeholder="Your Full Name"
                    value={globName}
                    onChange={(e) => setGlobName(e.target.value)}
                    className="w-full bg-neutral-50 border border-neutral-200 focus:border-neutral-900 rounded-xl px-4 py-3 text-xs text-neutral-900 placeholder-neutral-400 outline-none"
                  />
                  <input
                    type="email"
                    required
                    placeholder="you@address.com"
                    value={globEmail}
                    onChange={(e) => setGlobEmail(e.target.value)}
                    className="w-full bg-neutral-50 border border-neutral-200 focus:border-neutral-900 rounded-xl px-4 py-3 text-xs text-neutral-900 placeholder-neutral-400 outline-none"
                  />
                </div>

                {/* Simulated payment gateway card details */}
                <div className="border border-neutral-200 p-4 rounded-xl space-y-3 bg-neutral-50">
                  <span className="text-[10px] text-neutral-400 font-mono uppercase tracking-widest block font-medium">Secured Payment Info</span>
                  
                  <div className="space-y-2">
                    <input
                      type="text"
                      required
                      placeholder="Name on Card"
                      className="w-full bg-white border border-neutral-200 focus:border-neutral-900 rounded-xl px-4 py-2.5 text-xs text-neutral-900 placeholder-neutral-400 outline-none"
                    />
                    <input
                      type="text"
                      required
                      maxLength={19}
                      placeholder="Card Number (simulated)"
                      className="w-full bg-white border border-neutral-200 focus:border-neutral-900 rounded-xl px-4 py-2.5 text-xs text-neutral-900 font-mono placeholder-neutral-400 outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      required
                      maxLength={5}
                      placeholder="MM/YY"
                      className="w-full bg-white border border-neutral-200 focus:border-neutral-900 rounded-xl px-4 py-2.5 text-xs text-neutral-900 font-mono placeholder-neutral-400 outline-none text-center"
                    />
                    <input
                      type="password"
                      required
                      maxLength={3}
                      placeholder="CVV"
                      className="w-full bg-white border border-neutral-200 focus:border-neutral-900 rounded-xl px-4 py-2.5 text-xs text-neutral-900 font-mono placeholder-neutral-400 outline-none text-center"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-emerald-600 border border-emerald-600 hover:bg-emerald-700 text-white hover:shadow-[0_0_20px_rgba(16,185,129,0.45)] font-bold tracking-wider text-xs uppercase px-6 py-4 rounded-xl cursor-pointer transition-all active:scale-[0.98] duration-300 flex items-center justify-center gap-2"
                >
                  <HandHeart size={14} className="text-white fill-current animate-pulse" />
                  <span>
                    <EditableText id="donation.btn.prefix" element="span">Sponsor</EditableText> R{globAmount || "0"} <EditableText id="donation.btn.suffix" element="span">to outreach campaigns</EditableText>
                  </span>
                </button>

                <div className="text-center text-[10px] text-neutral-400 tracking-wider">
                  SECURED SECURE LAYER (SSL)
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      </div>
      <EditorControlPanel />
    </TextEditProvider>
  );
}
