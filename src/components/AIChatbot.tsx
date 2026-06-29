/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { MessageSquare, Send, X, Bot, Sparkles, Navigation, ArrowRight } from "lucide-react";
import EditableText from "./EditableText";

interface Message {
  id: string;
  role: "user" | "assistant";
  text: string;
  navigatedTo?: string | null;
}

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "init",
      role: "assistant",
      text: "Hello! Welcome to One Health. I'm your AI Steward Companion. I can answer your physical and spiritual stewardship queries, and quickly direct you to any section of our website. What would you like to explore today?",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto scroll down on new message
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMsg: Message = {
      id: `usr-${Date.now()}`,
      role: "user",
      text: textToSend,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsLoading(true);

    try {
      // Map history for API context
      const historyContext = messages.slice(-6).map((m) => ({
        role: m.role,
        text: m.text,
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: textToSend,
          history: historyContext,
        }),
      });

      if (!res.ok) {
        throw new Error("Server responded with error code");
      }

      const data = await res.json();
      
      const assistantMsg: Message = {
        id: `ast-${Date.now()}`,
        role: "assistant",
        text: data.text || "I apologize, I received an invalid reply.",
        navigatedTo: data.navigateTo,
      };

      setMessages((prev) => [...prev, assistantMsg]);

      // If navigation requested by AI response, trigger it
      if (data.navigateTo) {
        window.dispatchEvent(
          new CustomEvent("navigation-request", {
            detail: { 
              tab: data.navigateTo,
              project: data.project
            },
          })
        );
      }

    } catch (err) {
      console.error("Chatbot connection error, falling back to resilient client-side matches:", err);
      const fallback = resolveClientFallback(textToSend);
      
      const assistantMsg: Message = {
        id: `ast-${Date.now()}`,
        role: "assistant",
        text: fallback.text,
        navigatedTo: fallback.navigateTo,
      };

      setMessages((prev) => [...prev, assistantMsg]);

      if (fallback.navigateTo) {
        window.dispatchEvent(
          new CustomEvent("navigation-request", {
            detail: { 
              tab: fallback.navigateTo,
              project: fallback.project
            },
          })
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestion = (topic: string, queryText: string) => {
    handleSendMessage(queryText);
  };

  return (
    <>
      {/* 1. FLOATING CHAT BALLOON BUBBLE (Bottom Right Corner) */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end select-none">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="p-4 rounded-full bg-neutral-900 border border-neutral-800 text-white hover:bg-neutral-800 shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer relative flex items-center justify-center group animate-bounce"
            style={{ animationDuration: "3s" }}
            id="ai-chatbot-toggle-button"
          >
            <Sparkles size={20} className="text-emerald-400 group-hover:rotate-12 duration-300 absolute -top-1 -left-1" />
            <MessageSquare size={22} className="text-white group-hover:scale-110 duration-200" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
          </button>
        )}

        {/* 2. CHAT DRAWER DIALOG BOX */}
        {isOpen && (
          <div className="w-[340px] sm:w-[380px] h-[520px] bg-white border border-neutral-200 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-scaleUp z-50">
            {/* Header portion */}
            <div className="p-4 bg-neutral-900 text-white flex items-center justify-between border-b border-neutral-800">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-xl bg-neutral-800 border border-neutral-750 flex items-center justify-center text-emerald-400 animate-pulse">
                  <Bot size={18} />
                </div>
                <div className="text-left">
                  <span className="block text-xs font-mono font-medium tracking-wider text-neutral-400 uppercase">One Health AI</span>
                  <h4 className="font-display font-semibold text-sm -mt-0.5">Stewardship Guide</h4>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-neutral-400 hover:text-white border border-neutral-800 p-1.5 rounded-xl hover:bg-neutral-800 transition-colors cursor-pointer outline-none"
                id="ai-chatbot-close-button"
              >
                <X size={16} />
              </button>
            </div>

            {/* Message feed stream */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 bg-neutral-50 scrollbar-thin scrollbar-thumb-neutral-200 text-left"
            >
              {messages.map((msg) => (
                <div key={msg.id} className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}>
                  <div 
                    className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed shadow-xs ${
                      msg.role === "user"
                        ? "bg-neutral-900 text-white rounded-tr-xs font-medium"
                        : "bg-white border border-neutral-200 text-neutral-800 rounded-tl-xs"
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{msg.text}</p>
                    
                    {/* Navigation update indicator banner inside bubble */}
                    {msg.navigatedTo && (
                      <div className="mt-2.5 pt-2 border-t border-neutral-100 flex items-center gap-1.5 text-[10px] text-emerald-600 font-mono font-bold animate-fadeIn uppercase tracking-wider">
                        <Navigation size={10} className="fill-current animate-bounce" />
                        <span>Directing target view: {msg.navigatedTo}</span>
                      </div>
                    )}
                  </div>
                  <span className="text-[9px] text-neutral-400 mt-1 uppercase font-mono tracking-widest px-1">
                    {msg.role === "user" ? "You" : "AI"}
                  </span>
                </div>
              ))}

              {/* Loader typing beat */}
              {isLoading && (
                <div className="flex flex-col items-start animate-fadeIn">
                  <div className="bg-white border border-neutral-200 text-neutral-800 rounded-2xl rounded-tl-xs p-3.5 flex items-center gap-1">
                    <span className="block w-2 h-2 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="block w-2 h-2 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="block w-2 h-2 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}
            </div>

            {/* Quick Query suggestions board */}
            <div className="p-2 border-t border-neutral-100 bg-white grid grid-cols-2 gap-1 text-[10px]">
              <button
                onClick={() => handleSuggestion("mobile_clinic", "Show me the ToothKeepers initiative.")}
                className="p-1 px-2 border border-neutral-200 hover:border-neutral-900 hover:bg-neutral-50 rounded-lg text-neutral-600 text-left cursor-pointer outline-none truncate"
                title="Sponsors queries"
              >
                🦷 Dental Mobile Clinics
              </button>
              <button
                onClick={() => handleSuggestion("outreach", "Show me how to volunteer or coordinate.")}
                className="p-1 px-2 border border-neutral-200 hover:border-neutral-900 hover:bg-neutral-50 rounded-lg text-neutral-600 text-left cursor-pointer outline-none truncate"
                title="Volunteer services"
              >
                👥 Volunteer & Partner
              </button>
              <button
                onClick={() => handleSuggestion("contact_direct", "Where are the clinics located? Take me to contact.")}
                className="p-1 px-2 border border-neutral-200 hover:border-neutral-900 hover:bg-neutral-50 rounded-lg text-neutral-600 text-left cursor-pointer outline-none truncate"
              >
                📍 Clinic Coordinates
              </button>
              <button
                onClick={() => handleSuggestion("impact_metrics", "Show me your Section 18C impact report.")}
                className="p-1 px-2 border border-neutral-200 hover:border-neutral-900 hover:bg-neutral-50 rounded-lg text-neutral-600 text-left cursor-pointer outline-none truncate"
              >
                📊 Organizational Impact
              </button>
            </div>

            {/* Chat entry form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputValue);
              }}
              className="p-3 border-t border-neutral-100 bg-white flex items-center gap-2"
            >
              <input
                type="text"
                placeholder="Ask or direct AI Steward..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-1 bg-neutral-50 border border-neutral-200 focus:border-neutral-900 focus:bg-white rounded-xl px-3 py-2.5 text-xs text-neutral-900 outline-none placeholder-neutral-400"
                maxLength={400}
                required
              />
              <button
                type="submit"
                className="bg-neutral-900 text-white hover:bg-neutral-850 p-2.5 rounded-xl transition-all cursor-pointer outline-none aspect-square flex items-center justify-center shrink-0"
                id="ai-chatbot-send-button"
                title="Send query message"
              >
                <Send size={14} />
              </button>
            </form>
          </div>
        )}
      </div>
    </>
  );
}

// Resilient client-side fallback matching engine
function resolveClientFallback(message: string): { text: string; navigateTo: string | null; project?: string | null } {
  const query = (message || "").toLowerCase().trim();
  let navigateTo: string | null = null;
  let project: string | null = null;
  let text = "";

  // 1. GREETING / WELCOME & GUIDANCE
  if (query === "" || /^(hello|hi|hey|greetings|howdy|good\s+day|good\s+morning|good\s+afternoon|good\s+evening|info)/.test(query)) {
    text = `👋 **Hello! Welcome to the One Health AI Stewardship Companion.**

I run 100% locally on the One Health directory, meaning I answer questions instantly using verified information from our real website.

Here is how I can help you today:
• **🦷 ToothKeepers & Initiatives**: Ask about mobile clinical dental vans, road safety, maternal aid, agricultural gardens, or medical missions.
• **📊 Operations & Impact**: Ask about our 15,000+ lives touched, 42 tons litter recycled, or Section 18C compliance audits.
• **👥 Our Leadership & Team**: Ask about Lesley Naidoo, Ocean Naidoo, or Laura Naidoo.
• **📍 Coordinates**: Ask where we are located or how to send a referral.

*You can also ask me to navigate! For example, say "take me to projects" or "show stories" and I will automatically slide you there.*`;
    return { text, navigateTo, project };
  }

  // 1.5 DIRECT EXPLICIT NAVIGATION COMMANDS MATCHING
  if (
    query.includes("take me") || 
    query.includes("go to") || 
    query.includes("open") || 
    query.includes("show") || 
    query.includes("view") || 
    query.includes("switch") || 
    query.includes("navigate") || 
    query.includes("display") || 
    query.includes("slide") ||
    query.includes("visit")
  ) {
    if (query.includes("toothkeeper") || query.includes("dental") || query.includes("teeth") || query.includes("dentist")) {
      return { text: "🦷 Opening the ToothKeepers mobile healthcare clinical timeline in Projects.", navigateTo: "projects", project: "keepers" };
    }
    if (query.includes("drivewell") || query.includes("safety") || query.includes("road") || query.includes("traffic")) {
      return { text: "🛡️ Opening the DriveWell community road safety and reflector vest initiative.", navigateTo: "projects", project: "drivewell" };
    }
    if (query.includes("maternal") || query.includes("mother") || query.includes("baby") || query.includes("infant") || query.includes("pregnant")) {
      return { text: "🤰 Opening the Maternal and Infant post-natal care support details.", navigateTo: "projects", project: "maternal" };
    }
    if (query.includes("zimbabwe") || query.includes("africa") || query.includes("surgical mission")) {
      return { text: "🌍 Opening the cross-border Africa pop-up surgical and theological mission portfolio.", navigateTo: "projects", project: "zimbabwe" };
    }
    if (query.includes("adult dental outreach") || query.includes("outreach clinic")) {
      return { text: "🦷 Opening the adult restorative dental outreach van maps under projects.", navigateTo: "projects", project: "dental_outreach" };
    }
    if (query.includes("pollution") || query.includes("recycle") || query.includes("clean") || query.includes("environmental")) {
      return { text: "♻️ Opening our Creation Care, ecosystem cleanup, and plastic diversion dashboard.", navigateTo: "projects", project: "pollution" };
    }
    if (query.includes("agri") || query.includes("farm") || query.includes("garden") || query.includes("crop") || query.includes("food")) {
      return { text: "🌱 Opening the Agricultural wall and vertical composting garden details.", navigateTo: "projects", project: "agri" };
    }
    if (query.includes("medical mission") || query.includes("primary healthcare")) {
      return { text: "🩺 Opening the Primary Healthcare pop-up field clinics under Projects.", navigateTo: "projects", project: "medical" };
    }
    if (query.includes("volunteer network") || query.includes("private doctors") || query.includes("pro-bono")) {
      return { text: "🤝 Opening the Professional Accredited Clinicians Network in projects.", navigateTo: "projects", project: "network" };
    }
    if (query.includes("project") || query.includes("initiative")) {
      return { text: "🗺️ Taking you to our complete catalog of Active Stewardship Initiatives.", navigateTo: "projects", project: null };
    }
    if (query.includes("about") || query.includes("story") || query.includes("philosoph") || query.includes("team") || query.includes("vision") || query.includes("lesley")) {
      return { text: "ℹ️ Slide request accepted! Welcome to our About section, detailing founder biographies, civic alliances, and our six design dimensions.", navigateTo: "about" };
    }
    if (query.includes("gospel") || query.includes("spiritual") || query.includes("pastor") || query.includes("church") || query.includes("faith")) {
      return { text: "📖 Slide request accepted! Welcome to our Gospel section, illustrating the convergences of theological counseling and clinical healthcare.", navigateTo: "gospel" };
    }
    if (query.includes("beneficiar") || query.includes("testimonial") || query.includes("patient") || query.includes("feedback")) {
      return { text: "💌 Slide request accepted! Here is our community testimonial stream, from primary schools and township residents.", navigateTo: "beneficiaries" };
    }
    if (query.includes("gallery") || query.includes("story") || query.includes("stories") || query.includes("photo") || query.includes("image") || query.includes("video") || query.includes("reel") || query.includes("mozambique")) {
      return { text: "📸 Slide request accepted! Opening our interactive Mozambique Stories and Expedition timeline.", navigateTo: "stories" };
    }
    if (query.includes("impact") || query.includes("stat") || query.includes("metric") || query.includes("report")) {
      return { text: "📊 Slide request accepted! Opening our verified Impact & compliance statistics, along with digital audit downloads.", navigateTo: "impact" };
    }
    if (query.includes("participate") || query.includes("volunteer form") || query.includes("sponsor") || query.includes("donate") || query.includes("join")) {
      return { text: "👥 Slide request accepted! Opening the Participate options, including direct camp material sponsorships and volunteer logs.", navigateTo: "participate" };
    }
    if (query.includes("contact") || query.includes("address") || query.includes("email") || query.includes("location") || query.includes("send")) {
      return { text: "📍 Slide request accepted! Redirecting you directly to the Contact desk and secure triage referral coordinates.", navigateTo: "contact" };
    }
  }

  // 2. LEADERSHIP / LEADERS / LESLEY / OCEAN / LAURA / FOUNDER / TEAM
  if (query.includes("lesley") || query.includes("ocean") || query.includes("laura") || query.includes("founder") || query.includes("team") || query.includes("who runs") || query.includes("leadership") || query.includes("director") || query.includes("people") || query.includes("member")) {
    navigateTo = "about";
    text = `👥 **One Health Pioneer Leadership & Team**

One Health is directed on the ground by clinical experts dedicated to community empowerment:

• **Dr. Lesley Naidoo** *(Founder & Executive Director / Team Leader)*:
  An experienced healthcare executive with dual clinical and administrative groundings. He holds an MBA, Master of Medical Science in Dentistry (UKZN), Master of Public Health (UWC), and a Bachelor of Theology & Counseling (SATS). He is deeply involved in policy creation (such as South Africa's Presidential Health Summits) and Universal Healthcare (NHI).
  
• **Ocean Naidoo** *(Clinical Neurophysiologist & Diagnostics Lead)*:
  Rotates across Greys and Universitas Academic Hospitals. Founder of **Neurowave** in 2026, delivering Nerve Conduction Studies, sleep disorder diagnostics (Polysomnography), and CPAP care.
  
• **Laura Naidoo** *(Cardiovascular Perfusionist & Perfusion Lecturer)*:
  Former board member of the HPCSA, Vice Chairperson of PASA, and clinical lecturer. Dedicated to elevating cardiopulmonary bypass safety and perfusion training standards across the continent.

*I have navigated you to our **About page** so you can read their full, detailed professional biographies!*`;
    return { text, navigateTo, project };
  }

  // 3. TOOTHKEEPERS / DENTAL / TEETH / VAN / TRAILER / DENTIST / SURGERY / ORAL
  if (query.includes("toothkeeper") || query.includes("dental") || query.includes("teeth") || query.includes("dentist") || query.includes("mouth") || query.includes("decay") || query.includes("tooth") || query.includes("surgery") || query.includes("caries")) {
    navigateTo = "projects";
    project = "keepers";
    text = `🦷 **ToothKeepers & Specialized Dental Outreach Initiatives**

One Health deploys state-of-the-art mobile clinical trailers to alleviate acute nerve pain, infections, and tooth decay:

• **ToothKeepers (Children focus)**:
  Visits township schools and children's shelters to provide cleanings, restorations, protective extractions, and preventative hygiene kits.
  *  **2,400+** Children treated to date.
  *  **34** Schools visited.
  *  **5,000+** Preventive hygiene kits distributed.

• **Adult Dental Outreach** (project ID: \`dental_outreach\`):
  Delivers emergency outpatient dental treatments for families unable to access public state hospitals.
  *  **4,100+** Adult patients relieved.
  *  **48** Action-packed field trips annually via 2 active custom mobile vans.

*Directing you to the dynamic **ToothKeepers details** inside the Projects board!*`;
    return { text, navigateTo, project };
  }

  // 4. DRIVEWELL / SAFETY / ROAD / TRAFFIC / PEDESTRIAN / VEHICLE / SHIELD
  if (query.includes("drivewell") || query.includes("safety") || query.includes("road") || query.includes("traffic") || query.includes("pedestrian") || query.includes("accident") || query.includes("vest") || query.includes("transport")) {
    navigateTo = "projects";
    project = "drivewell";
    text = `🛡️ **DriveWell Community Safety Program**

DriveWell is designed to protect vulnerable pedestrian commutes and lower accident indices in townships and rural networks:

• **Core Actions**:
  Reflector vest distributions for high-visibility commuting, pedestrian crossing instruction modules for children, and basic emergency first-aid courses for taxi operators.
• **Real Milestones**:
  *  **85+** Safety seminars hosted in hazardous corridors.
  *  **3,200+** Reflector vests distributed.
  *  **18** Under-resourced schools fully engaged.
• **Future Goal**:
  Reduce preventable pedestrian casualty rates in township transit bottlenecks by 30% through ongoing grassroots education.

*Opening the **DriveWell interactive initiative card** on your viewport!*`;
    return { text, navigateTo, project };
  }

  // 5. MATERNAL / MOTHER / BABY / PRENATAL / BIRTH / NEWBORN / PREGNANT / NUTRITION
  if (query.includes("maternal") || query.includes("mother") || query.includes("baby") || query.includes("prenatal") || query.includes("birth") || query.includes("newborn") || query.includes("pregnant") || query.includes("infant")) {
    navigateTo = "projects";
    project = "maternal";
    text = `🤰 **Maternal & Child Health Program**

Providing supportive, primary clinical counsel and resources during the critical 'first 1,000 days of life' for mothers and newborns:

• **Services Offered**:
  Clinical prenatal tracking, maternal health instruction, distribution of baby starter packs (diapers, infant garments, thermal blankets), and post-natal nutrition logs.
• **Our Milestones**:
  *  **850+** Mothers directly supported.
  *  **98%** Healthy births recorded.
  *  **600+** Premium baby starter boxes delivered.
• **Objective**:
  Establish 3 localized prenatal clinic support hubs that link expectant mothers directly to transport and professional care.

*Opening the **Maternal & Baby program** under your Projects view currently.*`;
    return { text, navigateTo, project };
  }

  // 6. AGRICULTURE / FARM / GARDEN / CROP / FOOD / GROW / MALNUTRITION / STUNTING / SPINACH / VEGETABLE
  if (query.includes("agri") || query.includes("farm") || query.includes("garden") || query.includes("crop") || query.includes("food") || query.includes("grow") || query.includes("nutrition") || query.includes("stunting") || query.includes("soil") || query.includes("spinach") || query.includes("vegetable") || query.includes("sprout")) {
    navigateTo = "projects";
    project = "agri";
    text = `🌱 **Agricultural Skills & Food Security**

To combat childhood malnutrition and systemic physical stunting, One Health teaches families to grow high-yield organic foods on miniature urban plots:

• **Core Methods**:
  Establishing vertical wall planter gardens, utilizing compost recycling loops, organic pest barriers, and smart household rainwater collection tanks.
• **Real Outcomes**:
  *  **450+** Active township crops and home gardens developed.
  *  **180** Community families fully self-sustained with organic greens.
  *  **95** Local trainees certified in smallholder agriculture.
• **Partners**:
  Philakade Care Home and other community orphanages directly benefit from fresh beets, sweet potatoes, and kale daily.

*Our **Agricultural and Food initiatives** are highlighted on both our **About** and **Projects** boards.*`;
    return { text, navigateTo, project };
  }

  // 7. POLLUTION / RECYCLE / TRASH / LITTER / CLEAN / PLASTIC / PLANET / EARTH / CREATION
  if (query.includes("pollut") || query.includes("recycle") || query.includes("trash") || query.includes("litter") || query.includes("clean") || query.includes("plastic") || query.includes("planet") || query.includes("earth") || query.includes("creation") || query.includes("green") || query.includes("leaf")) {
    navigateTo = "projects";
    project = "pollution";
    text = `♻️ **Creation Care, Pollution & Recycling Initiatives**

We believe that environmental integrity directly shapes human wellness. Open refuse heaps and plastic burning trigger toxic asthma and skin issues in nearby homes.

• **What We Do**:
  Organize township ecosystem cleanups, configure waste sorting platforms in rural educational centers, and support youthful recycling co-operatives.
• **Measurable Gains**:
  *  **42 Tons** Of plastic, card, and metal trash safely extracted.
  *  **24** Broad-scale community cleanup operations.
  *  **8** Independent recycling school sorting hubs established.
• **Future Goal**:
  Capture over 100 tons of waste annually while establishing secure, dignified self-employment payouts for 15 collectors.

*Take a look at other Eco-Stewardship milestones on the **Projects page**.*`;
    return { text, navigateTo, project };
  }

  // 8. AFRICA / ZIMBABWE / MISSION / RURAL / SURGICAL / SURGERY / INTERNATIONAL / POP-UP / CROSS-BORDER
  if (query.includes("zimbabwe") || query.includes("africa") || query.includes("mission") || query.includes("rural") || query.includes("surgical") || query.includes("surgery") || query.includes("international") || query.includes("pop-up")) {
    navigateTo = "projects";
    project = "zimbabwe";
    text = `🌍 **Africa Cross-Border Surgical & Spiritual Missions**

Our major international outreach travels deep into rural, highly isolated communities, with a sustained focus on Zimbabwe and adjacent regions:

• **Hospital on Wheels**:
  For two intensive weeks, a voluntary force of dentists, primary care physicians, ophthalmic specialists, and general surgeons establish a pop-up hospital infrastructure.
• **Field Returns**:
  *  **320+** Specialist surgeries successfully completed.
  *  **14** Intensive diagnostic and clinical consultation days.
  *  **1,500+** One-on-one pastoral counseling sessions and spiritual discussions.
• **Impact Goals**: Ensure partner clinics in these remote pockets remain supplied with diagnostic solar power systems and chronic clinical medicines.

*The **Africa Mission** details can be reviewed in the **Projects panel**.*`;
    return { text, navigateTo, project };
  }

  // 9. MEDICAL / STETHOSCOPE / DOCTOR / HEALTH / CLINIC / SICK / DIAGNOSE / PHARMACY / MEDICINE
  if (query.includes("medical") || query.includes("doctor") || query.includes("health") || query.includes("clinic") || query.includes("diagnostic") || query.includes("illness") || query.includes("screen") || query.includes("pharmacy") || query.includes("medicine") || query.includes("prescription") || query.includes("referral")) {
    navigateTo = "projects";
    project = "medical";
    text = `🩺 **Primary Healthcare & Medical Missions**

Bringing diagnostics, medication distribution, and clinical help straight into towns lacking solid public hospitals:

• **Services**:
  Managing temporary healthcare wards in local church centers, conducting chronic disease checks (hypertension, diabetes), running eye screenings, and distributing pharmacy prescriptions.
• **Key Statistics**:
  *  **6,400+** Individual patients examined.
  *  **3,800+** Professional prescriptions filled for free.
  *  **210+** Referrals passed directly to specialized private practitioners.

*Learn how we operate these temporary medical clinics on the active **Projects panel**.*`;
    return { text, navigateTo, project };
  }

  // 10. NETWORK / ACCOUNT / PROFESSIONAL / CLINICIAN / PRO-BONO / DOCTORS / SPECIALIST
  if (query.includes("network") || query.includes("specialist") || query.includes("pro-bono") || query.includes("volunteer") || query.includes("pledge") || query.includes("hours") || query.includes("professional") || query.includes("registry") || query.includes("cardio") || query.includes("ophthal")) {
    navigateTo = "projects";
    project = "network";
    text = `🤝 **Professional Health Volunteer Network**

This network channels private clinical wealth to target extreme public medical poverty, allowing specialists to give back:

• **How It Works**:
  Private dental surgeons, ophthalmologists, cardiologists, and pharmacists pledge a dedicated portion of their monthly clinic schedule. One Health refers verified, acute township patients to receive this premium care inside private practices, absolutely free.
• **Current Force**:
  *  **85+** Pledged accredited clinicians.
  *  **1,200+** Pro-bono surgical and consulting hours pledged annually.
  *  **45** Major life-altering surgeries fully donated by clinical partners.

*Details on joining our **Accredited Network Registry** are found under **Projects**!*`;
    return { text, navigateTo, project };
  }

  // 11. PARTNERS / ALLIANCE / ASSOCIATES / FORWARD DURBAN / CITYHILL / NATION CHANGERS / LILY / THE ARK / IKETHELO
  if (query.includes("partner") || query.includes("alliance") || query.includes("associate") || query.includes("cityhill") || query.includes("durban") || query.includes("nation changers") || query.includes("lily of the valley") || query.includes("ark") || query.includes("ikethelo") || query.includes("philakade")) {
    navigateTo = "about";
    text = `🤝 **Invaluable Civic & Faith Alliances**

One Health believes in collaborative community healing. We work hand-in-hand with civic, corporate, and faith circles:

• **Faith Alliances**:
  *  **CityHill Missions**: Collaborates on community resources, counseling outreach loops, and spiritual mentoring.
  *  **African Christian Fellowship**: Links international clinical volunteers.
• **Empowerment Partnerships**:
  *  **Nation Changers**: Directs township skills development.
  *  **Forward Durban**: Supports municipal-level civic coordination.
• **Shelter & Care Operations**:
  *  **Lily of the Valley** & **Ikethelo**: We construct vegetable walls and provide dental checks for their resident orphans.
  *  **Philakade Care Home**: Supporting continuous nutritional wellness.
  *  **The Ark**: Servicing homeless and drug recovery participants.

*You can inspect our list of partners on the **About page** which is now active on your screen!*`;
    return { text, navigateTo, project };
  }

  // 12. GOSPEL / BIBLE / SPIRITUAL / PASTORS / CHURCH / FAITH / CHRISTIAN / SCRIPTURE / COUNSEL
  if (query.includes("gospel") || query.includes("bible") || query.includes("spiritual") || query.includes("pastor") || query.includes("church") || query.includes("faith") || query.includes("christian") || query.includes("scripture") || query.includes("counsel") || query.includes("jesus") || query.includes("ministry")) {
    navigateTo = "gospel";
    text = `📖 **Spiritual Hope & Gospel Counsel integration**

At One Health, we believe human wellness demands a holistic approach. Addressing clinical pain and physical hunger is critical, but restoring hope, purpose, and faith re-anchors the human spirit.

• **Pastoral Support Partnerships**:
  We partner with CityHill Missions and other community church fellowships to hold voluntary youth scripture circles, open-air faith dialogues, and grief counseling.
• **Dignity & Relief**:
  Our counselors move alongside mobile ToothKeepers and medical vans, standing with township parents to pray, support them through struggles, and offer guidance for family reconciliation.

*I have guided your viewport directly to our **Gospel page** to illustrate the harmony of these physical and spiritual camps.*`;
    return { text, navigateTo, project };
  }

  // 13. CONTACT / ADDRESS / WHERE / HQ / HILLCREST / EMAIL / PHONE / REACH / SEND / TRIAGE / REFERRAL / SUBMIT
  if (query.includes("contact") || query.includes("address") || query.includes("where") || query.includes("hq") || query.includes("located") || query.includes("hillcrest") || query.includes("email") || query.includes("phone") || query.includes("reach") || query.includes("referral") || query.includes("submit") || query.includes("write") || query.includes("message")) {
    navigateTo = "contact";
    text = `📍 **One Health Headquarters & Secure Routing System**

• **Main HQ**:
  One Health operates centrally from **Hillcrest, KwaZulu-Natal, South Africa**.
  
• **Why Triage is Online**:
  Our mobile dental and medical trailers are continuously active across distant townships. To protect operational equipment and remain secure, we manage our referral and sponsorship intake entirely online through direct routing.

• **Direct Routing Forms**:
  On our Contact page, you can access:
  *  *Sponsorship Enquiries*: For corporate associations and donor matching.
  *  *Pro-bono Referrals*: Secure clinical triage requests for township children.
  *  *General Messages*: Directly monitored by our Durban team leaders.

*Please use the **secure contact form** now rendered on your screen to submit a message.*`;
    return { text, navigateTo, project };
  }

  // 14. IMPACT / STATS / METRICS / REPORT / USD / RANDS / 18C / AUDIT / AUDITED / TRANSALATION / COMPLIANCE
  if (query.includes("impact") || query.includes("stat") || query.includes("metric") || query.includes("report") || query.includes("audit") || query.includes("comply") || query.includes("compliance") || query.includes("18c") || query.includes("tax") || query.includes("certificate") || query.includes("outcome") || query.includes("number")) {
    navigateTo = "impact";
    text = `📊 **Verified Impact & Rigid Compliance Metrics**

Transparency is a core value at One Health. All dental, medical, agricultural, and financial records undergo continuous validation:

• **Cumulative Impact Milestones**:
  *  **9+** Active holistic initiatives in action.
  *  **15,000+** Lives directly touched by healthcare and stewardship camps.
  *  **42 Tons** of hazardous plastics diverted at sorting stations.
  *  **450+** Township home and care crops grown.
  *  **10+** Civic and faith collaborative partners.
  *  **5+** Nations in Africa served.

• **Corporate Tax Benefits**:
  One Health is a registered, certified NPO. We issue active **Section 18C Tax Certificates** to corporate sponsors in South Africa, enabling tax deductions on all supportive material funding.

*I have opened our **Impact Dashboard**, where you can browse audited statistics and download our annual outcome PDFs.*`;
    return { text, navigateTo, project };
  }

  // 15. BENEFICIARIES / TESTIMONIALS / SCHOOLS / CLIENTS / TOWNSHIP / DURBAN / PEOPLE / KIDS / TESTIFY
  if (query.includes("beneficiar") || query.includes("testimonial") || query.includes("school") || query.includes("client") || query.includes("township") || query.includes("durban") || query.includes("people") || query.includes("kids") || query.includes("kid") || query.includes("child") || query.includes("testify") || query.includes("story") || query.includes("stories")) {
    navigateTo = "beneficiaries";
    text = `💌 **Community Beneficiaries & Testimonials**

Our focus is centered on marginalized groups across Durban townships, KwaZulu-Natal, and remote borderlands:

• **Orphanages & Care Centres**:
  Lily of the Valley and Ikethelo orphanages receive recurring dental checks and organic farming vertical garden frames.
• **Under-Resourced Schools**:
  Primary school teachers report major class participation increases and zero chronic dental pain after ToothKeepers visits.
• **Township Residents**:
  Mothers like Lindiwe Dlamini testified to our mobile vans resolving months of intense pediatric tooth pain immediately, free of charge.

*I've opened the **Beneficiaries section**, where you can read real, heartwarming quotes from local families and clinicians in our loops.*`;
    return { text, navigateTo, project };
  }

  // 16. STORIES / GALLERY / PHOTO / IMAGE / REEL / VIDEO / MULTIMEDIA / SHOW / PIC / PICS / LOOK / MOZAMBIQUE
  if (query.includes("stories") || query.includes("story") || query.includes("gallery") || query.includes("photo") || query.includes("image") || query.includes("reel") || query.includes("video") || query.includes("multimedia") || query.includes("show") || query.includes("pic") || query.includes("pics") || query.includes("look") || query.includes("visual") || query.includes("mozambique")) {
    navigateTo = "stories";
    text = `📸 **Mission & Expedition Stories**

Explore real-time visual narratives representing One Health's dynamic cross-border projects and community outposts:

• **Featured Timeline**:
  *  *Mozambique July 2025*: Strategic partnership with The African Christian Fellowship & CAPRO in Namita.
  *  *Interactive Media Log*: Swipe from left to right to see on-site image snapshots and on-field video documentary clips.

*Explore this gorgeous chronological timeline right now in the **Stories category**!*`;
    return { text, navigateTo, project };
  }

  // 17. PARTICIPATE / VOLUNTEER / SPONSOR / DONATE / SUPPORT / MONEY / FUNDS / CONTRIBUTE / GIVE / INVOLVED
  if (query.includes("participate") || query.includes("volunteer") || query.includes("sponsor") || query.includes("donate") || query.includes("support") || query.includes("money") || query.includes("funds") || query.includes("contribute") || query.includes("give") || query.includes("involved") || query.includes("help") || query.includes("join")) {
    navigateTo = "participate";
    text = `👥 **Join the stewardship Mission**

There are three direct pipelines to support or get hands-on in our operations:

1. **Become a Camp Sponsor**:
   Fund essential materials like mobile clinic fuel, dental hygiene kits (toothpaste/brushes), organic compost lines, and newborn baby starter packs.
2. **Volunteer Professional Service**:
   Doctors, dental specialists, agricultural growers, or counselors can pledge active field hours or private appointment slots to referred patients.
3. **Register Corporate Collaborations**:
   Avail space or join outreach drives. Your donations directly trigger a Section 18C Tax Certificate to offset corporate tax liability.

*I've navigated you to our **Participate portal** where you can fill in your coordinator preferences or sponsor a campaign!*`;
    return { text, navigateTo, project };
  }

  // 18. NO MATCH / DETAILED GENERAL FALLBACK
  text = `💡 **One Health Stewardship Information Agent**

I am here to answer any specific question about the organization, using real, verified details from our local files. 

For example, ask me about:
• **"Who is Dr. Lesley Naidoo?"** or query our pioneering team leadership bio.
• **"What is the ToothKeepers initiative?"** for mobile clinic dental stats.
• **"Where is One Health located?"** to see our Hillcrest HQ coordinates.
• **"What are the six dimensions of One Health?"** to learn our philosophy and gospel integration.
• **"How do I volunteer?"** to see how professionals can pledge hours.

*Feel free to request any page! Try typing 'go to contact' or 'show impact'.*`;
  return { text, navigateTo, project };
}

