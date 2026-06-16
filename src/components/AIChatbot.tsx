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
      console.error("Chatbot error:", err);
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          role: "assistant",
          text: "I experienced a connection issue, but let me redirect you anyway! Try clicking one of our instant links."
        },
      ]);
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
