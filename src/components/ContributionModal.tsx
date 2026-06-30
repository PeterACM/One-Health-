import React, { useState } from "react";
import { 
  HandHeart, 
  Plus, 
  Minus, 
  CreditCard, 
  Package, 
  Clock, 
  Stethoscope, 
  CheckCircle2, 
  X,
  BookOpen,
  Calendar,
  Sparkles
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ContributionModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialAmount?: string;
}

type ContributionTab = "financial" | "non-financial";

interface DonationType {
  id: string;
  name: string;
  description: string;
  unitPrice: number;
  unitLabel: string;
}

const DONATION_TYPES: DonationType[] = [
  {
    id: "kits",
    name: "Dental Hygiene Kits",
    description: "Toothbrushes, toothpaste, hygiene guide, and a preventative counseling session for one child.",
    unitPrice: 150,
    unitLabel: "Child Kits"
  },
  {
    id: "seeds",
    name: "Food Garden Seeds & Soil",
    description: "Vertical organic garden packs, topsoil, non-GMO vegetable seeds, and a vertical planting workshop.",
    unitPrice: 250,
    unitLabel: "Plots"
  },
  {
    id: "general",
    name: "General Outreach Unit",
    description: "Flexible operational resources used on the ground for primary healthcare, medicine, and transport.",
    unitPrice: 500,
    unitLabel: "Care Units"
  },
  {
    id: "trailer",
    name: "Mobile Trailer Support",
    description: "Co-sponsors clinical fuel, mobile dental sanitization equipment, and clinical glove/mask consumables.",
    unitPrice: 1200,
    unitLabel: "Trailer Days"
  }
];

type NonFinancialType = "clinical" | "farming" | "supplies" | "education";

export default function ContributionModal({ isOpen, onClose, initialAmount }: ContributionModalProps) {
  const [activeTab, setActiveTab] = useState<ContributionTab>("financial");
  
  // Financial Form States
  const [selectedDonationType, setSelectedDonationType] = useState<string>("kits");
  const [quantity, setQuantity] = useState<number>(1);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [isCustomMode, setIsCustomMode] = useState<boolean>(false);
  
  const [finName, setFinName] = useState("");
  const [finEmail, setFinEmail] = useState("");
  const [finCardName, setFinCardName] = useState("");
  const [finCardNum, setFinCardNum] = useState("");
  const [finExpiry, setFinExpiry] = useState("");
  const [finCvv, setFinCvv] = useState("");
  
  // Non-Financial Form States
  const [nonFinType, setNonFinType] = useState<NonFinancialType>("clinical");
  const [nonFinDesc, setNonFinDesc] = useState("");
  const [nonFinName, setNonFinName] = useState("");
  const [nonFinEmail, setNonFinEmail] = useState("");
  const [nonFinPhone, setNonFinPhone] = useState("");
  const [nonFinDate, setNonFinDate] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Helper to get active donation type object
  const activeDonationTypeObj = DONATION_TYPES.find(d => d.id === selectedDonationType) || DONATION_TYPES[0];

  // Calculated financial amount
  const calculatedAmount = isCustomMode 
    ? (parseInt(customAmount) || 0)
    : (activeDonationTypeObj.unitPrice * quantity);

  const handleFinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (calculatedAmount <= 0) {
      alert("Please specify a valid contribution amount.");
      return;
    }
    
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccessMessage(
        `Thank you, ${finName.split(" ")[0]}! We simulated a secure payment of R${calculatedAmount} ZAR. A tax section-18C certificate and official receipt have been dispatched to ${finEmail}. Your generous partnership helps fuel our mobile trailer loops directly!`
      );
    }, 1200);
  };

  const handleNonFinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      let typeLabel = "Volunteer Clinical Hours";
      if (nonFinType === "farming") typeLabel = "Farming & Agricultural Goods";
      if (nonFinType === "supplies") typeLabel = "Dental & Medical Supplies";
      if (nonFinType === "education") typeLabel = "Spiritual & Educational Books";

      setSuccessMessage(
        `Thank you, ${nonFinName.split(" ")[0]}! Your non-financial pledge of "${typeLabel}" has been logged successfully. A field coordinator will reach out to you at ${nonFinEmail} or ${nonFinPhone} to arrange logistics/coordination for ${nonFinDate || "your chosen date"}. We are deeply grateful for your support!`
      );
    }, 1200);
  };

  const resetAll = () => {
    setSuccessMessage(null);
    setQuantity(1);
    setCustomAmount("");
    setIsCustomMode(false);
    setFinName("");
    setFinEmail("");
    setFinCardName("");
    setFinCardNum("");
    setFinExpiry("");
    setFinCvv("");
    setNonFinDesc("");
    setNonFinName("");
    setNonFinEmail("");
    setNonFinPhone("");
    setNonFinDate("");
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            onClose();
            resetAll();
          }}
          className="absolute inset-0 bg-neutral-900/60 backdrop-blur-sm"
        />

        {/* Modal Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-white border border-neutral-200 rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col"
        >
          {/* Header block with elegant green-blue gradient */}
          <div className="h-2 bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-500 shrink-0" />

          {/* Close Button */}
          <button
            onClick={() => {
              onClose();
              resetAll();
            }}
            className="absolute top-5 right-5 w-8 h-8 rounded-full border border-neutral-200 hover:border-neutral-300 bg-neutral-50 hover:bg-neutral-100 flex items-center justify-center text-neutral-500 hover:text-neutral-700 transition-all outline-none cursor-pointer z-10"
          >
            ✕
          </button>

          {/* Scrollable Content Container */}
          <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
            
            {/* Success State */}
            {successMessage ? (
              <div className="p-8 text-center space-y-6 max-w-md mx-auto py-12">
                <div className="p-4 bg-emerald-50 text-emerald-600 rounded-full w-fit mx-auto border border-emerald-100 animate-bounce">
                  <CheckCircle2 size={40} className="stroke-[2.5px]" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-display font-bold text-neutral-900 text-xl">Thank You for Your Support!</h3>
                  <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed">{successMessage}</p>
                </div>
                <button
                  onClick={() => {
                    onClose();
                    resetAll();
                  }}
                  className="w-full py-3 px-6 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-semibold text-xs tracking-wider uppercase cursor-pointer transition-all outline-none"
                >
                  Return to Portal
                </button>
              </div>
            ) : (
              <>
                {/* Header Information */}
                <div className="space-y-1">
                  <span className="text-[10px] font-mono tracking-widest uppercase font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100 w-fit block">
                    Support One Health Mission
                  </span>
                  <h2 className="font-display font-bold text-neutral-950 text-2xl">
                    Make a Contribution
                  </h2>
                  <p className="text-neutral-500 text-xs">
                    We deploy dental trailers, clinical counselors, and organic seeds directly to vulnerable townships. Choose your pathway of support below.
                  </p>
                </div>

                {/* Tab Switcher */}
                <div className="flex bg-neutral-100 p-1 rounded-xl shrink-0 select-none">
                  <button
                    onClick={() => setActiveTab("financial")}
                    className={`flex-1 py-2.5 text-center text-xs font-semibold rounded-lg transition-all cursor-pointer outline-none ${
                      activeTab === "financial"
                        ? "bg-white text-neutral-900 shadow-sm font-bold"
                        : "text-neutral-500 hover:text-neutral-800"
                    }`}
                  >
                    💰 Financial Support
                  </button>
                  <button
                    onClick={() => setActiveTab("non-financial")}
                    className={`flex-1 py-2.5 text-center text-xs font-semibold rounded-lg transition-all cursor-pointer outline-none ${
                      activeTab === "non-financial"
                        ? "bg-white text-neutral-900 shadow-sm font-bold"
                        : "text-neutral-500 hover:text-neutral-800"
                    }`}
                  >
                    📦 Non-Financial Pledge
                  </button>
                </div>

                {/* FINANCIAL FORM VIEW */}
                {activeTab === "financial" && (
                  <form onSubmit={handleFinSubmit} className="space-y-6">
                    {/* Types Grid */}
                    <div className="space-y-2">
                      <label className="text-[10px] text-neutral-400 font-mono uppercase tracking-widest block font-bold">
                        1. Select Donation Purpose
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {DONATION_TYPES.map((type) => (
                          <div
                            key={type.id}
                            onClick={() => {
                              setSelectedDonationType(type.id);
                              setIsCustomMode(false);
                            }}
                            className={`p-4 rounded-2xl border cursor-pointer select-none text-left transition-all relative ${
                              selectedDonationType === type.id && !isCustomMode
                                ? "border-emerald-500 bg-emerald-50/20 shadow-sm"
                                : "border-neutral-200 bg-white hover:border-neutral-300"
                            }`}
                          >
                            <div className="flex justify-between items-start gap-2">
                              <h4 className="font-semibold text-neutral-900 text-xs sm:text-sm">
                                {type.name}
                              </h4>
                              <span className="font-mono font-bold text-xs text-emerald-600 bg-emerald-50 border border-emerald-100 px-1.5 py-0.5 rounded-md shrink-0">
                                R{type.unitPrice}
                              </span>
                            </div>
                            <p className="text-neutral-500 text-[10px] sm:text-xs leading-relaxed mt-1">
                              {type.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Numeric Stepper Section / Toggle Numbers */}
                    <div className="bg-neutral-50 border border-neutral-100 p-4 sm:p-5 rounded-2xl space-y-4">
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                        <div>
                          <label className="text-[10px] text-neutral-400 font-mono uppercase tracking-widest block font-bold">
                            2. Toggle Quantity / Multiplier
                          </label>
                          <p className="text-[11px] text-neutral-500 mt-0.5">
                            {!isCustomMode 
                              ? `Sponsor multiple units of ${activeDonationTypeObj.name}.` 
                              : "Enter custom donation budget below."}
                          </p>
                        </div>
                        
                        <div className="flex items-center gap-2 select-none">
                          <button
                            type="button"
                            onClick={() => {
                              setIsCustomMode(false);
                            }}
                            className={`px-3 py-1.5 text-[10px] font-bold rounded-lg border transition-all cursor-pointer ${
                              !isCustomMode
                                ? "bg-emerald-600 border-emerald-600 text-white"
                                : "bg-white border-neutral-200 text-neutral-600 hover:bg-neutral-50"
                            }`}
                          >
                            Multiplier
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setIsCustomMode(true);
                              if (!customAmount) setCustomAmount(activeDonationTypeObj.unitPrice.toString());
                            }}
                            className={`px-3 py-1.5 text-[10px] font-bold rounded-lg border transition-all cursor-pointer ${
                              isCustomMode
                                ? "bg-emerald-600 border-emerald-600 text-white"
                                : "bg-white border-neutral-200 text-neutral-600 hover:bg-neutral-50"
                            }`}
                          >
                            Custom Amount
                          </button>
                        </div>
                      </div>

                      {/* Stepper controls */}
                      {!isCustomMode ? (
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-1 bg-white p-3.5 rounded-xl border border-neutral-150">
                          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
                            <span className="text-xs font-mono font-semibold text-neutral-600">
                              Number of {activeDonationTypeObj.unitLabel}:
                            </span>
                            <div className="flex items-center gap-1.5 bg-neutral-100 rounded-lg p-1">
                              <button
                                type="button"
                                disabled={quantity <= 1}
                                onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                                className="w-8 h-8 rounded-md bg-white hover:bg-neutral-50 text-neutral-700 flex items-center justify-center outline-none border border-neutral-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-sm"
                              >
                                <Minus size={12} />
                              </button>
                              <span className="w-10 text-center font-mono font-bold text-sm text-neutral-900">
                                {quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() => setQuantity(prev => prev + 1)}
                                className="w-8 h-8 rounded-md bg-white hover:bg-neutral-50 text-neutral-700 flex items-center justify-center outline-none border border-neutral-200 cursor-pointer shadow-sm"
                              >
                                <Plus size={12} />
                              </button>
                            </div>
                          </div>

                          {/* Quick Preset Numbers */}
                          <div className="flex items-center gap-1.5 w-full sm:w-auto justify-end">
                            <span className="text-[10px] text-neutral-400 font-mono uppercase tracking-wider hidden md:inline">Quick Set:</span>
                            {[1, 3, 5, 10].map(num => (
                              <button
                                key={num}
                                type="button"
                                onClick={() => setQuantity(num)}
                                className={`px-3 py-1.5 rounded-lg font-mono text-xs font-semibold border transition-all cursor-pointer ${
                                  quantity === num
                                    ? "bg-neutral-900 border-neutral-900 text-white"
                                    : "bg-white border-neutral-200 text-neutral-600 hover:border-neutral-300"
                                }`}
                              >
                                {num}x
                              </button>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="relative pt-1">
                          <span className="absolute left-4 top-[22px] text-neutral-500 text-sm font-semibold font-mono">
                            ZAR (R)
                          </span>
                          <input
                            type="number"
                            required
                            min="10"
                            placeholder="Enter custom Rand amount..."
                            value={customAmount}
                            onChange={(e) => setCustomAmount(e.target.value)}
                            className="w-full bg-white border border-neutral-200 focus:border-neutral-900 rounded-xl pl-20 pr-4 py-3 text-sm text-neutral-900 font-mono placeholder-neutral-400 outline-none shadow-sm"
                          />
                        </div>
                      )}

                      {/* Display calculations */}
                      <div className="flex justify-between items-center bg-emerald-500/10 border border-emerald-100 p-4 rounded-xl">
                        <span className="text-xs font-semibold text-emerald-950 font-display flex items-center gap-1.5">
                          <Sparkles size={14} className="text-emerald-700 animate-pulse" />
                          Total Contribution Summary:
                        </span>
                        <span className="font-mono font-bold text-lg text-emerald-800">
                          R{calculatedAmount} ZAR
                        </span>
                      </div>
                    </div>

                    {/* Donor Credentials */}
                    <div className="space-y-3">
                      <label className="text-[10px] text-neutral-400 font-mono uppercase tracking-widest block font-bold">
                        3. Donor Information
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                          type="text"
                          required
                          placeholder="Your Full Name"
                          value={finName}
                          onChange={(e) => setFinName(e.target.value)}
                          className="w-full bg-neutral-50 border border-neutral-200 focus:border-neutral-900 rounded-xl px-4 py-3 text-xs text-neutral-900 placeholder-neutral-400 outline-none"
                        />
                        <input
                          type="email"
                          required
                          placeholder="your.email@domain.com"
                          value={finEmail}
                          onChange={(e) => setFinEmail(e.target.value)}
                          className="w-full bg-neutral-50 border border-neutral-200 focus:border-neutral-900 rounded-xl px-4 py-3 text-xs text-neutral-900 placeholder-neutral-400 outline-none"
                        />
                      </div>
                    </div>

                    {/* Simulated Payment Card fields */}
                    <div className="border border-neutral-200 p-4 rounded-2xl space-y-3 bg-neutral-50/50">
                      <span className="text-[10px] text-neutral-400 font-mono uppercase tracking-widest block font-bold flex items-center gap-1">
                        <CreditCard size={12} className="text-neutral-500" />
                        Secured Payment Information (Simulator)
                      </span>
                      
                      <div className="space-y-2">
                        <input
                          type="text"
                          required
                          placeholder="Name on Card"
                          value={finCardName}
                          onChange={(e) => setFinCardName(e.target.value)}
                          className="w-full bg-white border border-neutral-200 focus:border-neutral-900 rounded-xl px-4 py-2.5 text-xs text-neutral-900 placeholder-neutral-400 outline-none"
                        />
                        <input
                          type="text"
                          required
                          maxLength={19}
                          placeholder="Card Number"
                          value={finCardNum}
                          onChange={(e) => setFinCardNum(e.target.value)}
                          className="w-full bg-white border border-neutral-200 focus:border-neutral-900 rounded-xl px-4 py-2.5 text-xs text-neutral-900 font-mono placeholder-neutral-400 outline-none"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          required
                          maxLength={5}
                          placeholder="MM/YY"
                          value={finExpiry}
                          onChange={(e) => setFinExpiry(e.target.value)}
                          className="w-full bg-white border border-neutral-200 focus:border-neutral-900 rounded-xl px-4 py-2.5 text-xs text-neutral-900 font-mono placeholder-neutral-400 outline-none text-center"
                        />
                        <input
                          type="password"
                          required
                          maxLength={3}
                          placeholder="CVV"
                          value={finCvv}
                          onChange={(e) => setFinCvv(e.target.value)}
                          className="w-full bg-white border border-neutral-200 focus:border-neutral-900 rounded-xl px-4 py-2.5 text-xs text-neutral-900 font-mono placeholder-neutral-400 outline-none text-center"
                        />
                      </div>
                    </div>

                    {/* Submit button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold tracking-wider text-xs uppercase cursor-pointer disabled:opacity-55 transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/10 hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]"
                    >
                      <HandHeart size={14} className="animate-pulse" />
                      <span>{isSubmitting ? "Processing SSL Payment..." : `Sponsor R${calculatedAmount} ZAR Now`}</span>
                    </button>
                  </form>
                )}

                {/* NON-FINANCIAL FORM VIEW */}
                {activeTab === "non-financial" && (
                  <form onSubmit={handleNonFinSubmit} className="space-y-6">
                    {/* Non-financial Type selector */}
                    <div className="space-y-2">
                      <label className="text-[10px] text-neutral-400 font-mono uppercase tracking-widest block font-bold">
                        1. Select Contribution Type
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { id: "clinical", label: "Volunteer Clinical Hours", icon: Stethoscope, desc: "Doctors, dentists, or hygienists giving field hours." },
                          { id: "supplies", label: "Dental/Medical Supplies", icon: Package, desc: "Consumable toothbrushes, paste, or gloves." },
                          { id: "farming", label: "Farming & Seeds Goods", icon: Sparkles, desc: "Organic soil, seeds, tools, or gardening kits." },
                          { id: "education", label: "Spiritual/Education Books", icon: BookOpen, desc: "Bibles, children's storybooks, or hygiene pamphlets." }
                        ].map((item) => {
                          const Icon = item.icon;
                          const isSelected = nonFinType === item.id;
                          return (
                            <div
                              key={item.id}
                              onClick={() => setNonFinType(item.id as any)}
                              className={`p-4 rounded-2xl border cursor-pointer select-none text-left transition-all ${
                                isSelected
                                  ? "border-teal-500 bg-teal-50/20 shadow-sm"
                                  : "border-neutral-200 bg-white hover:border-neutral-300"
                              }`}
                            >
                              <div className="flex items-center gap-2 mb-1">
                                <div className={`p-1 rounded-lg border ${
                                  isSelected ? "bg-teal-500 border-teal-500 text-white" : "bg-neutral-50 border-neutral-200 text-neutral-500"
                                }`}>
                                  <Icon size={14} />
                                </div>
                                <span className="font-semibold text-neutral-900 text-xs sm:text-sm">
                                  {item.label}
                                </span>
                              </div>
                              <p className="text-neutral-500 text-[10px] sm:text-xs leading-relaxed">
                                {item.desc}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Pledge description */}
                    <div className="space-y-1.5">
                      <label className="text-[11px] text-neutral-500 font-mono uppercase tracking-widest block font-semibold">
                        2. Describe What You Can Provide
                      </label>
                      <textarea
                        required
                        rows={3}
                        value={nonFinDesc}
                        onChange={(e) => setNonFinDesc(e.target.value)}
                        placeholder={
                          nonFinType === "clinical" 
                            ? "E.g. I am a licensed Dental Hygienist and would like to commit 4 hours on bi-weekly Saturdays..." 
                            : nonFinType === "farming"
                            ? "E.g. We have 50 bags of organic composting soil and 100 sets of tomato/spinach seeds ready to deliver..."
                            : nonFinType === "supplies"
                            ? "E.g. We can donate 200 unused premium adult toothbrushes and 100 tubes of Colgate fluoride paste..."
                            : "E.g. We have a set of 50 bilingual children's health manuals and 30 study Bibles to share..."
                        }
                        className="w-full bg-neutral-50 border border-neutral-200 focus:border-neutral-900 rounded-xl px-4 py-3 text-xs sm:text-sm text-neutral-900 placeholder-neutral-400 outline-none resize-none"
                      />
                    </div>

                    {/* Delivery / Coordination Date Picker */}
                    <div className="space-y-1.5">
                      <label className="text-[11px] text-neutral-500 font-mono uppercase tracking-widest block font-semibold flex items-center gap-1.5">
                        <Calendar size={13} className="text-neutral-500" />
                        3. Proposed Handover / Coordination Date
                      </label>
                      <input
                        type="date"
                        required
                        value={nonFinDate}
                        onChange={(e) => setNonFinDate(e.target.value)}
                        className="w-full bg-neutral-50 border border-neutral-200 focus:border-neutral-900 rounded-xl px-4 py-3 text-xs text-neutral-900 outline-none"
                      />
                    </div>

                    {/* Contributor credentials */}
                    <div className="space-y-2">
                      <label className="text-[10px] text-neutral-400 font-mono uppercase tracking-widest block font-bold">
                        4. Contact Details
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <input
                          type="text"
                          required
                          placeholder="Your Full Name"
                          value={nonFinName}
                          onChange={(e) => setNonFinName(e.target.value)}
                          className="w-full bg-neutral-50 border border-neutral-200 focus:border-neutral-900 rounded-xl px-4 py-3 text-xs text-neutral-900 placeholder-neutral-400 outline-none"
                        />
                        <input
                          type="email"
                          required
                          placeholder="your.email@domain.com"
                          value={nonFinEmail}
                          onChange={(e) => setNonFinEmail(e.target.value)}
                          className="w-full bg-neutral-50 border border-neutral-200 focus:border-neutral-900 rounded-xl px-4 py-3 text-xs text-neutral-900 placeholder-neutral-400 outline-none"
                        />
                        <input
                          type="tel"
                          required
                          placeholder="Phone Number"
                          value={nonFinPhone}
                          onChange={(e) => setNonFinPhone(e.target.value)}
                          className="w-full bg-neutral-50 border border-neutral-200 focus:border-neutral-900 rounded-xl px-4 py-3 text-xs text-neutral-900 placeholder-neutral-400 outline-none"
                        />
                      </div>
                    </div>

                    {/* Submit Pledge */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold tracking-wider text-xs uppercase cursor-pointer disabled:opacity-55 transition-all flex items-center justify-center gap-2 shadow-lg shadow-teal-500/10 hover:shadow-[0_0_20px_rgba(13,148,136,0.4)]"
                    >
                      <Clock size={14} className="animate-spin" style={{ animationDuration: isSubmitting ? "3s" : "0s" }} />
                      <span>{isSubmitting ? "Logging Pledge..." : "Pledge Non-Financial Support"}</span>
                    </button>
                  </form>
                )}
              </>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
