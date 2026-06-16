/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useTextEdit } from "./TextEditContext";
import { Edit3, Check, X, RotateCcw } from "lucide-react";

interface EditableTextProps {
  id: string;
  children: string;
  className?: string;
  element?: "p" | "span" | "h1" | "h2" | "h3" | "h4" | "h5" | "div";
}

export default function EditableText({
  id,
  children,
  className = "",
  element = "p",
}: EditableTextProps) {
  const { isEditMode, setIsEditMode, edits, registerText, setEditText, restoreText } = useTextEdit();
  const [isEditing, setIsEditing] = useState(false);
  const [val, setVal] = useState(children);

  // Sync / Register default text on mount and prop changes
  useEffect(() => {
    registerText(id, children);
    setVal(edits[id] !== undefined ? edits[id] : children);
  }, [id, children, edits]);

  const activeText = edits[id] !== undefined ? edits[id] : children;
  const isCustomized = edits[id] !== undefined;

  const handleSave = () => {
    setEditText(id, val);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setVal(activeText);
    setIsEditing(false);
  };

  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation();
    restoreText(id);
    setVal(children);
  };

  const Component = element;

  // Render normal view when edit mode is off
  if (!isEditMode) {
    return (
      <Component 
        className={`${className} hover:bg-neutral-50/50 cursor-help transition-colors select-none`}
        onDoubleClick={(e) => {
          e.stopPropagation();
          setIsEditMode(true);
          setIsEditing(true);
        }}
        title="Double-click to customize this text data directly"
      >
        {activeText}
      </Component>
    );
  }

  return (
    <>
      <Component
        onClick={(e) => {
          e.stopPropagation();
          setIsEditing(true);
        }}
        className={`relative group/edit cursor-pointer border border-dashed transition-all duration-200 rounded-lg p-1 -m-1 ${
          isCustomized 
            ? "border-emerald-400 bg-emerald-50/20 hover:bg-emerald-50/40" 
            : "border-neutral-300 hover:border-neutral-500 hover:bg-neutral-50"
        } ${className}`}
        title="Click to edit raw text block"
      >
        <span>{activeText}</span>
        
        {/* Floating action badges on hover (Edit & Reset if customized) */}
        <span className="absolute top-1 right-1 opacity-0 group-hover/edit:opacity-100 flex items-center gap-1.5 transition-opacity duration-200 pointer-events-none">
          {isCustomized && (
            <button
              onClick={handleReset}
              className="p-1 rounded bg-white shadow-sm border border-neutral-200 text-neutral-500 hover:text-neutral-900 pointer-events-auto cursor-pointer"
              title="Revert to original text data"
            >
              <RotateCcw size={10} />
            </button>
          )}
          <span className="p-1 rounded bg-neutral-900 text-white shadow-sm flex items-center gap-1 text-[9px] font-mono uppercase tracking-wider font-semibold">
            <Edit3 size={10} />
            Edit
          </span>
        </span>
      </Component>

      {isEditing && typeof document !== "undefined" && createPortal(
        <div 
          className="fixed inset-0 bg-neutral-950/40 backdrop-blur-xs z-[200] flex items-center justify-center p-4 animate-fadeIn select-none font-sans"
          onClick={handleCancel}
        >
          <div 
            className="border border-neutral-200 bg-white max-w-lg w-full rounded-2xl p-5 space-y-4 shadow-2xl relative animate-scaleUp text-left cursor-default self-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center">
              <div>
                <span className="text-neutral-400 font-mono text-[9px] uppercase tracking-widest font-semibold">FIELD ID: {id}</span>
                <h4 className="font-display font-bold text-neutral-900 text-sm mt-0.5">Edit Content Segment</h4>
              </div>
              {isCustomized && (
                <button
                  onClick={() => {
                    restoreText(id);
                    setVal(children);
                    setIsEditing(false);
                  }}
                  className="flex items-center gap-1 px-2.5 py-1 text-[10px] uppercase font-mono tracking-wider font-bold rounded-lg border border-neutral-200 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50 transition-all cursor-pointer outline-none"
                >
                  <RotateCcw size={10} />
                  Restore Default
                </button>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-[10px] text-neutral-400 font-mono uppercase tracking-widest block font-medium">Text Workspace</label>
              <textarea
                value={val}
                rows={children.length > 200 ? 5 : 3}
                onChange={(e) => setVal(e.target.value)}
                placeholder="Type new wording..."
                className="w-full bg-neutral-50 border border-neutral-200 focus:border-neutral-900 focus:bg-white rounded-xl px-3 py-2.5 text-xs text-neutral-900 font-sans leading-relaxed outline-none"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                    handleSave();
                  }
                }}
              />
              <span className="text-[9px] text-neutral-400 font-mono italic block text-right">Press Ctrl+Enter or Cmd+Enter to confirm changes</span>
            </div>

            {/* Compare with original */}
            {isCustomized && activeText !== children && (
              <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-xl space-y-1 opacity-80">
                <span className="text-[9px] text-neutral-400 font-mono uppercase tracking-widest block font-bold">Original Reference Code Wording:</span>
                <p className="text-[10px] text-neutral-500 italic max-h-16 overflow-y-auto leading-relaxed">{children}</p>
              </div>
            )}

            {/* Action Bar */}
            <div className="flex items-center justify-end gap-2 pt-1">
              <button
                onClick={handleCancel}
                className="px-3.5 py-2 text-xs font-semibold text-neutral-600 rounded-xl border border-neutral-200 hover:bg-neutral-50 transition-colors cursor-pointer outline-none flex items-center gap-1.5"
              >
                <X size={13} />
                Cancel
              </button>
              
              <button
                onClick={handleSave}
                className="px-4 py-2 text-xs font-semibold text-white bg-neutral-900 hover:bg-neutral-800 rounded-xl transition-all shadow-sm cursor-pointer outline-none flex items-center gap-1.5"
              >
                <Check size={13} />
                Save Wording
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
