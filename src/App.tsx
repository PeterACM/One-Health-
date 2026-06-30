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
import ContributionModal from "./components/ContributionModal";

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
      <ContributionModal 
        isOpen={showGlobalDonation} 
        onClose={() => setShowGlobalDonation(false)} 
      />

      </div>
      <EditorControlPanel />
    </TextEditProvider>
  );
}
