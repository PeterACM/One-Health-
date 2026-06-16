/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, Instagram, CheckCircle2, Bookmark, Compass } from "lucide-react";
import EditableText from "./EditableText";

export default function ContactView() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("General enquiry");
  const [msg, setMsg] = useState("");

  const [isSending, setIsSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !msg) return;

    setIsSending(true);

    setTimeout(() => {
      setIsSending(false);
      setSubmitted(true);
      
      // Clear fields
      setName("");
      setEmail("");
      setMsg("");
    }, 1200);
  };

  return (
    <div className="space-y-12 py-8 animate-fadeIn text-left">
      {/* Intro */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h2 className="font-display font-medium text-3xl sm:text-4xl text-neutral-900 tracking-tight font-bold">
          <EditableText id="contact.title" element="span">Get In Touch</EditableText>
        </h2>
        <div className="text-neutral-600 text-sm leading-relaxed text-balance">
          <EditableText id="contact.desc" element="span">Connect with One Health regarding sponsorships, pro-bono healthcare referrals, church associations, and upcoming missions.</EditableText>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Coordinates card */}
        <div className="lg:col-span-5 space-y-6">
          <div className="border border-neutral-200 bg-neutral-50 p-6 sm:p-8 rounded-3xl space-y-6">
            <h3 className="font-display font-medium text-neutral-950 text-xl font-bold">
              <EditableText id="contact.routing.title" element="span">Secure Routing System</EditableText>
            </h3>
            
            <div className="text-neutral-600 text-xs leading-relaxed">
              <EditableText id="contact.routing.desc" element="span">We operate dynamic trailers throughout our coverage spheres. Rather than public physical counters, we utilize direct triage. Your submission instantly maps to local coordinators for action.</EditableText>
            </div>

            <div className="space-y-4 pt-4 border-t border-neutral-200 text-xs text-neutral-700 font-medium font-semibold">
              <div className="space-y-1">
                <div className="text-neutral-400 font-mono text-[9px] uppercase tracking-wider font-bold">Triage Liaison Desk</div>
                <p className="font-semibold text-neutral-800 leading-normal">
                  All requests undergo automatic filtering to route pro-bono healthcare candidates and sponsorships to designated program directors.
                </p>
              </div>
              <div className="space-y-1">
                <div className="text-neutral-400 font-mono text-[9px] uppercase tracking-wider font-bold">Audited Correspondence</div>
                <p className="font-semibold text-neutral-800 leading-normal">
                  Our internal policy maintains fully confidential channels of transmission to guard patient identities and local community trust.
                </p>
              </div>
            </div>
          </div>

          {/* Premium custom dark map design */}
          <div className="border border-neutral-200 bg-neutral-50 p-5 rounded-3xl relative overflow-hidden h-44 flex flex-col justify-between">
            <div className="absolute inset-0 pointer-events-none opacity-[0.25] bg-[linear-gradient(to_right,#cbd5e1_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e1_1px,transparent_1px)] bg-[size:1.5rem_1.5rem]" />
            
            <div className="flex justify-between items-start relative z-10">
              <span className="text-[10px] text-neutral-450 font-mono uppercase tracking-widest flex items-center gap-1.5 font-bold">
                <Compass size={12} className="text-neutral-900 animate-spin" style={{ animationDuration: "12s" }} />
                <span>MAP PROXY OUTPOSTS</span>
              </span>
              <span className="text-neutral-900 font-mono text-[10px] font-bold">HILLCREST HQ ACTIVE</span>
            </div>

            <div className="space-y-1 relative z-10 pointer-events-none">
              <h4 className="text-neutral-950 text-xs font-bold">Mobile Trailer Deployment Matrix</h4>
              <p className="text-neutral-500 text-[10px] leading-relaxed max-w-xs font-semibold">
                Real-time routing tracking dental trailer coordinates along Hillcrest and surrounding township corridors pro-bono.
              </p>
            </div>
            
            <div className="h-1 bg-neutral-200 rounded-full overflow-hidden relative z-10">
              <div className="h-full bg-neutral-900 w-[64%] rounded-full" />
            </div>
          </div>
        </div>

        {/* Right Message input forms */}
        <div className="lg:col-span-7 border border-neutral-200 bg-neutral-50 p-6 sm:p-8 rounded-3xl">
          
          {submitted ? (
            <div className="p-6 text-center space-y-4 animate-scaleUp">
              <div className="p-3 bg-white border border-neutral-200 text-neutral-950 rounded-full w-fit mx-auto">
                <CheckCircle2 size={32} />
              </div>
              <h3 className="font-display font-medium text-neutral-950 text-lg font-bold">Inquiry Forwarded</h3>
              <p className="text-neutral-600 text-xs leading-relaxed max-w-md mx-auto font-medium">
                Thank you for reaching out. Your dispatch ticket has been forwarded to Sarah van Wyk (Pastor Liaison) and Peter de Wit (Clinical Director) for rapid audit and response.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="outline-none border border-blue-600 text-blue-600 hover:bg-blue-50 font-mono text-[10px] uppercase tracking-wider px-5 py-2.5 rounded-xl transition-all cursor-pointer bg-white font-bold hover:shadow-[0_0_12px_rgba(37,99,235,0.2)]"
              >
                <EditableText id="contact.btn.reset" element="span">Send another message</EditableText>
              </button>
            </div>
          ) : (
            <form onSubmit={handleSend} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[11px] text-neutral-500 font-mono uppercase tracking-widest block font-bold">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="Martha Nkosi"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-white border border-neutral-200 focus:border-neutral-900 rounded-xl px-4 py-3 text-xs text-neutral-900 placeholder-neutral-400 outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] text-neutral-500 font-mono uppercase tracking-widest block font-bold">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="you@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white border border-neutral-200 focus:border-neutral-900 rounded-xl px-4 py-3 text-xs text-neutral-900 placeholder-neutral-400 outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] text-neutral-500 font-mono uppercase tracking-widest block font-bold">Inquiry Topic</label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-white border border-neutral-200 focus:border-neutral-900 rounded-xl px-4 py-3 text-xs text-neutral-900 outline-none font-medium"
                >
                  <option>General enquiry</option>
                  <option>Partnership & Collaboration</option>
                  <option>Volunteering skills / Pro-bono</option>
                  <option>Donation audits & Corporate CSI</option>
                  <option>Refer a child or rural shelter</option>
                  <option>Media, press & speaking engagements</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] text-neutral-500 font-mono uppercase tracking-widest block font-bold">Message Body</label>
                <textarea
                  required
                  rows={4}
                  placeholder="How can our clinical or faith operations coordinates partner with your goals? Please provide complete details..."
                  value={msg}
                  onChange={(e) => setMsg(e.target.value)}
                  className="w-full bg-white border border-neutral-200 focus:border-neutral-900 rounded-xl px-4 py-3 text-xs text-neutral-900 placeholder-neutral-400 outline-none h-32 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSending}
                className="w-full outline-none bg-emerald-600 border border-emerald-600 text-white disabled:bg-neutral-200 disabled:text-neutral-450 font-bold tracking-wider text-xs uppercase px-6 py-4 rounded-xl cursor-pointer transition-all hover:bg-emerald-700 hover:shadow-[0_0_20px_rgba(16,185,129,0.45)] active:scale-[0.98] duration-300 flex items-center justify-center gap-2 shadow-sm"
              >
                {isSending ? (
                  <>
                    <Bookmark size={14} className="animate-pulse" />
                    <span>TRANSMITTING DIRECT TICKET...</span>
                  </>
                ) : (
                  <>
                    <Send size={14} />
                    <EditableText id="contact.btn.submit" element="span">SEND MESSAGE CHANNELS</EditableText>
                  </>
                )}
              </button>
            </form>
          )}

        </div>
      </div>
    </div>
  );
}
