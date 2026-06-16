/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { UserCheck, Stethoscope, Building2, Briefcase, Send, CheckCircle2, AlertCircle } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import EditableText from "./EditableText";

export default function ParticipateView() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("Healthcare pro-bono volunteer");
  const [message, setMessage] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone) return;

    setIsSubmitting(true);
    setSuccessMsg(null);

    setTimeout(() => {
      setIsSubmitting(false);
      setSuccessMsg(`Thank you, ${fullName.split(" ")[0]}! Your interest as a "${role}" has been registered in the One Health dispatch queue successfully. Our field organizers will connect with you shortly.`);
      
      // Clear fields
      setFullName("");
      setEmail("");
      setPhone("");
      setMessage("");
    }, 200);
  };

  return (
    <div className="space-y-16 py-8 animate-fadeIn text-left">
      {/* Introduction */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h2 className="font-display font-medium text-3xl sm:text-4xl text-neutral-900 tracking-tight leading-tight font-bold">
          Join the Mission
        </h2>
        <p className="text-neutral-600 text-sm leading-relaxed text-balance">
          One Health grows through people, not just funding. Clinicians, pastors, corporate leaders, and students all carry vital roles in restoring township health.
        </p>
      </div>

      {/* Structured opportunities description cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ScrollReveal className="border border-neutral-200 bg-neutral-50 p-6 rounded-2xl flex flex-col justify-between h-[270px] hover:bg-white hover:border-neutral-350 hover:shadow-sm duration-300 transition-all text-neutral-900">
          <div>
            <div className="p-3 bg-white border border-neutral-200 text-neutral-900 rounded-xl w-fit mb-4">
              <Stethoscope size={22} />
            </div>
            <h3 className="font-display font-medium text-lg text-neutral-950 mb-2 font-semibold">Clinicians & Doctors</h3>
            <p className="text-neutral-600 text-xs leading-relaxed">
              Volunteer pro-bono extraction consults or surgery hours to the Professional Health Network or jump on our bi-weekly township trailer loops.
            </p>
          </div>
          <div className="text-neutral-500 text-[10px] font-mono tracking-widest uppercase font-semibold">
            CLINICAL NETWORK PATHWAY
          </div>
        </ScrollReveal>

        <ScrollReveal delayMs={100} className="border border-neutral-200 bg-neutral-50 p-6 rounded-2xl flex flex-col justify-between h-[270px] hover:bg-white hover:border-neutral-350 hover:shadow-sm duration-300 transition-all text-neutral-900">
          <div>
            <div className="p-3 bg-white border border-neutral-200 text-neutral-900 rounded-xl w-fit mb-4">
              <Building2 size={22} />
            </div>
            <h3 className="font-display font-medium text-lg text-neutral-950 mb-2 font-semibold">Churches & Ministries</h3>
            <p className="text-neutral-600 text-xs leading-relaxed">
              Sponsor localized mission camps, deploy pastoral counseling teams beside dental trailers, and take active care charges.
            </p>
          </div>
          <div className="text-neutral-500 text-[10px] font-mono tracking-widest uppercase font-semibold">
            ECCLESIASTICAL UNION
          </div>
        </ScrollReveal>

        <ScrollReveal delayMs={200} className="border border-neutral-200 bg-neutral-50 p-6 rounded-2xl flex flex-col justify-between h-[270px] hover:bg-white hover:border-neutral-350 hover:shadow-sm duration-300 transition-all text-neutral-900">
          <div>
            <div className="p-3 bg-white border border-neutral-200 text-neutral-900 rounded-xl w-fit mb-4">
              <Briefcase size={22} />
            </div>
            <h3 className="font-display font-medium text-lg text-neutral-950 mb-2 font-semibold">Corporate CSI Sponsoring</h3>
            <p className="text-neutral-600 text-xs leading-relaxed">
              Finance a dedicated ToothKeepers school trip, donate consumable medical assets, or secure a regional mobile truck segment as CSR action.
            </p>
          </div>
          <div className="text-neutral-500 text-[10px] font-mono tracking-widest uppercase font-semibold">
            CORPORATE SOLIDARITY
          </div>
        </ScrollReveal>
      </div>

      <div className="border-t border-neutral-200 pt-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Explanation text block */}
        <div className="lg:col-span-4 space-y-4 text-left">
          <h2 className="font-display font-medium text-2xl text-neutral-900 tracking-tight leading-snug font-bold">
            Register Your Interest
          </h2>
          <p className="text-neutral-600 text-xs leading-relaxed">
            Specify your skills or sponsorship aims below. Our field coordinators log every application to pair professional volunteers with upcoming outreach plans.
          </p>
          <div className="pt-4 border-t border-neutral-200 space-y-3">
            <div className="flex items-center gap-2 text-neutral-550 text-[10px] font-mono font-bold uppercase tracking-wider">
              <UserCheck size={12} className="text-neutral-900" />
              <span>DURBAN COORDINATION HEADQUARTERS</span>
            </div>
            <div className="flex items-center gap-2 text-neutral-550 text-[10px] font-mono font-bold uppercase tracking-wider">
              <UserCheck size={12} className="text-neutral-900" />
              <span>COMPLIANT PRIVACY PROTOCOLS</span>
            </div>
          </div>
        </div>

        {/* Input Forms */}
        <div className="lg:col-span-8 border border-neutral-200 bg-neutral-50 p-6 sm:p-8 rounded-3xl relative">
          
          {successMsg ? (
            <div className="p-6 bg-white border border-dashed border-neutral-300 text-neutral-805 text-neutral-800 rounded-2xl flex flex-col items-center text-center space-y-4 animate-scaleUp">
              <div className="p-3 bg-white rounded-full border border-neutral-200 text-neutral-900">
                <CheckCircle2 size={32} />
              </div>
              <h3 className="font-display font-medium text-neutral-950 text-lg font-bold">Interest Registered Successfully</h3>
              <p className="text-xs leading-relaxed max-w-md font-medium">{successMsg}</p>
              <button
                onClick={() => setSuccessMsg(null)}
                className="outline-none border border-blue-600 text-blue-600 px-5 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider cursor-pointer hover:bg-blue-50 transition-all bg-white font-bold hover:shadow-[0_0_12px_rgba(37,99,235,0.2)]"
              >
                <EditableText id="participate.btn.reset" element="span">Register another skill</EditableText>
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] text-neutral-500 font-mono uppercase tracking-widest block font-semibold">Full name</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Dr. Martha Nkosi"
                    className="w-full bg-white border border-neutral-200 focus:border-neutral-900 rounded-xl px-4 py-3 text-xs text-neutral-900 placeholder-neutral-400 outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] text-neutral-500 font-mono uppercase tracking-widest block font-semibold">Email address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="martha.nkosi@health.org"
                    className="w-full bg-white border border-neutral-200 focus:border-neutral-900 rounded-xl px-4 py-3 text-xs text-neutral-900 placeholder-neutral-400 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] text-neutral-500 font-mono uppercase tracking-widest block font-semibold">Phone number</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+27 82 000 0000"
                    className="w-full bg-white border border-neutral-200 focus:border-neutral-900 rounded-xl px-4 py-3 text-xs text-neutral-900 placeholder-neutral-400 outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] text-neutral-500 font-mono uppercase tracking-widest block font-semibold">How can you help?</label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full bg-white border border-neutral-200 focus:border-neutral-900 rounded-xl px-4 py-3 text-xs text-neutral-900 outline-none font-medium"
                  >
                    <option>Healthcare pro-bono volunteer</option>
                    <option>Church partnership leader</option>
                    <option>Corporate CSI Sponsoring group</option>
                    <option>General hands-on volunteer</option>
                    <option>Mission trip candidate (Africa)</option>
                    <option>Other / general consultation</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] text-neutral-500 font-mono uppercase tracking-widest block font-semibold">Cover note</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us briefly about your background and how you would prefer to be mobilized..."
                  className="w-full bg-white border border-neutral-200 focus:border-neutral-900 rounded-xl px-4 py-3 text-xs text-neutral-900 placeholder-neutral-400 outline-none h-28 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full outline-none bg-emerald-600 border border-emerald-600 text-white disabled:bg-neutral-200 disabled:text-neutral-400 font-bold tracking-wider text-xs uppercase px-6 py-4 rounded-xl cursor-pointer transition-all hover:bg-emerald-700 hover:shadow-[0_0_20px_rgba(16,185,129,0.45)] active:scale-[0.98] duration-300 flex items-center justify-center gap-2 shadow-sm"
              >
                {isSubmitting ? (
                  <>
                    <AlertCircle size={14} className="animate-spin" />
                    <span>SAVING DETAILS CONSOLE...</span>
                  </>
                ) : (
                  <>
                    <Send size={14} />
                    <EditableText id="participate.btn.submit" element="span">SUBMIT REGISTRATION INTEREST</EditableText>
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
