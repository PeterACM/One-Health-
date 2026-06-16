/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { useTextEdit } from "./TextEditContext";
import { 
  Settings, 
  ChevronDown, 
  ChevronUp, 
  ToggleLeft, 
  ToggleRight, 
  RotateCcw, 
  FileJson, 
  Copy, 
  Check, 
  AlertCircle,
  Sparkles,
  Github,
  History,
  Trash2
} from "lucide-react";

export default function EditorControlPanel() {
  const { 
    isEditMode, 
    setIsEditMode, 
    getEditsList, 
    restoreText, 
    restoreAll, 
    history, 
    clearHistory 
  } = useTextEdit();
  
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"edits" | "history" | "pages">("edits");

  const activeEdits = getEditsList();
  const editsCount = activeEdits.length;

  const handleCopyJson = () => {
    const backupObj = activeEdits.reduce((acc, edit) => {
      acc[edit.id] = edit.edited;
      return acc;
    }, {} as Record<string, string>);

    navigator.clipboard.writeText(JSON.stringify(backupObj, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadJsonFile = () => {
    const backupObj = activeEdits.reduce((acc, edit) => {
      acc[edit.id] = edit.edited;
      return acc;
    }, {} as Record<string, string>);

    const blob = new Blob([JSON.stringify(backupObj, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "onehealth_content_edits.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed bottom-3 left-3 sm:bottom-6 sm:left-6 z-40 select-none font-sans max-w-[280px] sm:max-w-sm w-full">
      <div className="border border-neutral-200 bg-white shadow-2xl rounded-2xl overflow-hidden transition-all duration-300">
        
        {/* Header / Condensed Tab */}
        <div 
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between p-2.5 sm:p-4 bg-neutral-950 text-white cursor-pointer hover:bg-neutral-900 transition-colors"
        >
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${isEditMode ? "bg-emerald-400 animate-pulse" : "bg-neutral-500"}`} />
            <div className="text-left leading-none">
              <span className="text-[8px] sm:text-[9px] uppercase tracking-widest font-mono font-semibold text-neutral-400">Content System</span>
              <h4 className="text-[10px] sm:text-xs font-bold font-display flex items-center gap-1 sm:gap-1.5 mt-0.5 sm:mt-1">
                Live Editor
                {editsCount > 0 && (
                  <span className="px-1 py-0.5 bg-emerald-500 text-white text-[8px] font-mono font-bold rounded-full">
                    {editsCount} Edits
                  </span>
                )}
              </h4>
            </div>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Toggle Edit Mode */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsEditMode(!isEditMode);
              }}
              className="text-neutral-300 hover:text-white transition-colors cursor-pointer outline-none"
              title={isEditMode ? "Turn Off Live Edit Mode" : "Turn On Live Edit Mode"}
            >
              {isEditMode ? <ToggleRight size={20} className="text-emerald-400 sm:w-6 sm:h-6" /> : <ToggleLeft size={20} className="sm:w-6 sm:h-6" />}
            </button>
            
            <div className="text-neutral-400">
              {isOpen ? <ChevronDown size={12} className="sm:w-[14px] sm:h-[14px]" /> : <ChevronUp size={12} className="sm:w-[14px] sm:h-[14px]" />}
            </div>
          </div>
        </div>

        {/* Expanded panel body */}
        {isOpen && (
          <div className="p-0 flex flex-col max-h-[360px] sm:max-h-[480px]">
            
            {/* Tab selector bar */}
            <div className="flex border-b border-neutral-200 bg-neutral-50/50">
              <button
                onClick={() => setActiveTab("edits")}
                className={`flex-1 py-2 sm:py-3 text-center text-[10px] sm:text-xs font-semibold border-b-2 transition-all cursor-pointer outline-none ${
                  activeTab === "edits" 
                    ? "border-neutral-900 text-neutral-950 font-bold bg-white" 
                    : "border-transparent text-neutral-500 hover:text-neutral-800"
                }`}
              >
                Edits ({editsCount})
              </button>
              
              <button
                onClick={() => setActiveTab("history")}
                className={`flex-1 py-2 sm:py-3 text-center text-[10px] sm:text-xs font-semibold border-b-2 transition-all cursor-pointer outline-none ${
                  activeTab === "history" 
                    ? "border-neutral-900 text-neutral-950 font-bold bg-white" 
                    : "border-transparent text-neutral-500 hover:text-neutral-800"
                }`}
              >
                History ({history.length})
              </button>

              <button
                onClick={() => setActiveTab("pages")}
                className={`flex-1 py-2 sm:py-3 text-center text-[10px] sm:text-xs font-semibold border-b-2 transition-all cursor-pointer outline-none ${
                  activeTab === "pages" 
                    ? "border-neutral-900 text-neutral-950 font-bold bg-white" 
                    : "border-transparent text-neutral-500 hover:text-neutral-800"
                }`}
              >
                Cloudflare Sync
              </button>
            </div>

            <div className="p-3 sm:p-5 space-y-3 sm:space-y-4 overflow-y-auto max-h-[260px] sm:max-h-[380px]">
              
              {/* TAB 1: ACTIVE EDITS */}
              {activeTab === "edits" && (
                <div className="space-y-4">
                  {/* Guide & Toggle State info */}
                  <div className="text-xs leading-relaxed text-neutral-600 bg-neutral-50 border border-neutral-200 rounded-xl p-3 space-y-2">
                    <p className="font-semibold text-neutral-800">
                      {isEditMode 
                        ? "✓ Interactive Edit Mode is Active!" 
                        : "💡 Edit Mode is currently OFF."}
                    </p>
                    <p className="text-[11px] text-neutral-500 leading-relaxed">
                      {isEditMode
                        ? "Click any text block surrounded by a dotted boundary on the page to customize its wording directly. Hover handles reveal identifiers."
                        : "Slide the controller at the top right to start modifying visual paragraphs."}
                    </p>
                  </div>

                  {/* List of active changes */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] text-neutral-400 font-mono uppercase tracking-widest font-bold">Client Modifications</span>
                      {editsCount > 0 && (
                        <button
                          onClick={() => {
                            if (window.confirm("Restore original wording for all paragraphs?")) {
                              restoreAll();
                            }
                          }}
                          className="flex items-center gap-1 text-[10px] uppercase font-mono tracking-wider font-bold text-neutral-500 hover:text-red-600 duration-200 cursor-pointer outline-none bg-transparent border-none"
                        >
                          <RotateCcw size={10} />
                          Reset All
                        </button>
                      )}
                    </div>

                    {editsCount === 0 ? (
                      <div className="text-center py-8 border border-dashed border-neutral-200 rounded-xl text-neutral-400 text-xs leading-relaxed">
                        No customized paragraph edits found.<br/>
                        <span className="text-[10.5px] text-neutral-400 italic">Toggle edit mode & try it directly!</span>
                      </div>
                    ) : (
                      <div className="space-y-2 max-h-[180px] overflow-y-auto pr-1">
                        {activeEdits.map((edit) => (
                          <div key={edit.id} className="border border-neutral-200 bg-neutral-50/55 rounded-xl p-2.5 text-xs relative space-y-1 text-left">
                            <div className="flex justify-between items-center gap-2">
                              <span className="font-mono text-[9px] text-neutral-500 font-bold uppercase tracking-wider truncate w-40" title={edit.id}>
                                {edit.id}
                              </span>
                              <button
                                onClick={() => restoreText(edit.id)}
                                className="text-[9px] font-mono text-neutral-400 hover:text-neutral-900 border border-neutral-200 bg-white rounded px-1.5 py-0.5 shadow-sm duration-200 uppercase tracking-tight cursor-pointer outline-none"
                                title="Restore original wording"
                              >
                                Revert
                              </button>
                            </div>
                            <p className="text-[11px] text-neutral-850 line-clamp-2 leading-relaxed italic text-neutral-700">
                              "{edit.edited}"
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 2: AUDIT HISTORY LOG */}
              {activeTab === "history" && (
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-neutral-400 font-mono uppercase tracking-widest font-semibold flex items-center gap-1">
                      <History size={11} className="text-neutral-600" />
                      Chronological Audit Trail
                    </span>
                    {history.length > 0 && (
                      <button
                        onClick={() => {
                          if (window.confirm("Clear all edit history logs? Active changes on the site will remain.")) {
                            clearHistory();
                          }
                        }}
                        className="flex items-center gap-1 text-[10px] uppercase font-mono tracking-wider font-bold text-neutral-500 hover:text-red-600 duration-200 cursor-pointer outline-none bg-transparent border-none"
                      >
                        <Trash2 size={10} />
                        Clear Trail
                      </button>
                    )}
                  </div>

                  {history.length === 0 ? (
                    <div className="text-center py-10 border border-dashed border-neutral-200 rounded-xl text-neutral-400 text-xs">
                      No change history logs recorded.
                    </div>
                  ) : (
                    <div className="space-y-2.5 max-h-[220px] overflow-y-auto pr-1">
                      {history.map((entry) => (
                        <div key={entry.id} className="border border-neutral-200 bg-neutral-50/55 rounded-xl p-3 text-xs space-y-2 text-left relative">
                          <div className="flex justify-between items-baseline gap-2">
                            <span className="font-mono text-[9px] text-neutral-500 font-bold uppercase truncate max-w-[155px]" title={entry.textId}>
                              {entry.textId}
                            </span>
                            <span className="font-mono text-[8px] text-neutral-400 font-semibold text-right whitespace-nowrap">
                              {entry.timestamp}
                            </span>
                          </div>
                          
                          <div className="space-y-1.5 text-[11px]">
                            <div className="line-clamp-2 text-neutral-500 italic bg-white border border-neutral-100/80 p-1.5 rounded-lg">
                              <span className="text-[8px] font-mono text-red-500 font-bold uppercase block not-italic leading-none mb-0.5">FROM:</span>
                              "{entry.oldValue}"
                            </div>
                            <div className="line-clamp-2 text-neutral-900 font-semibold bg-emerald-50/20 border border-emerald-105 border-emerald-100/50 p-1.5 rounded-lg">
                              <span className="text-[8px] font-mono text-emerald-600 font-bold uppercase block leading-none mb-0.5">TO:</span>
                              "{entry.newValue}"
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: CLOUDFLARE SYNC */}
              {activeTab === "pages" && (
                <div className="space-y-4">
                  <div className="text-xs leading-relaxed text-neutral-600 bg-neutral-50 border border-neutral-200 rounded-xl p-3 space-y-2">
                    <p className="font-semibold text-neutral-800 flex items-center gap-1">
                      <Github size={13} className="text-neutral-900" />
                      Git & Cloudflare Deployment Guide
                    </p>
                    <p className="text-[11.5px] text-neutral-500 leading-normal">
                      Since static sites host contents as JSON or compile-time states, you can copy the final configuration file payload below to persist custom changes permanently inside your source code directory.
                    </p>
                  </div>

                  {editsCount === 0 ? (
                    <div className="text-center py-8 border border-dashed border-neutral-200 rounded-xl text-neutral-400 text-xs">
                      Make visual edits first to prepare sync payloads.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-neutral-400 font-mono uppercase tracking-widest font-bold">Configuration JSON Payload</span>
                      </div>

                      <pre className="p-3 bg-neutral-900 text-neutral-100 text-[10px] font-mono rounded-xl h-28 overflow-y-auto overflow-x-auto text-left leading-relaxed select-all selection:bg-neutral-800">
                        {JSON.stringify(
                          activeEdits.reduce((acc, edit) => {
                            acc[edit.id] = edit.edited;
                            return acc;
                          }, {} as Record<string, string>),
                          null,
                          2
                        )}
                      </pre>

                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={handleCopyJson}
                          className="py-2 px-2.5 bg-neutral-100 border border-neutral-200 hover:bg-neutral-200 rounded-lg text-[10px] font-semibold text-neutral-700 font-mono flex items-center justify-center gap-1.5 outline-none cursor-pointer duration-200"
                        >
                          {copied ? <Check size={11} className="text-emerald-500" /> : <Copy size={11} />}
                          {copied ? "Copied!" : "Copy Payload"}
                        </button>

                        <button
                          onClick={downloadJsonFile}
                          className="py-2 px-2.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg text-[10px] font-semibold font-mono flex items-center justify-center gap-1.5 outline-none cursor-pointer duration-200"
                        >
                          <FileJson size={11} />
                          Download JSON
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Subtle CMS footer */}
              <div className="text-[9px] text-neutral-400 font-semibold font-mono flex items-center gap-1 justify-center tracking-wide pt-1">
                <Sparkles size={10} className="text-emerald-400" />
                PORTABLE CONTENT ARCHIVE SECURE SYSTEM
              </div>

            </div>
          </div>
        )}
      </div>
    </div>
  );
}
