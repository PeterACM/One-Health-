/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * TextEditContext handles the client-editing system.
 * Changes are saved in localStorage for the client's session,
 * and can be viewed, restored individually, or exported as JSON
 * by the developer or website owner.
 */

import React, { createContext, useContext, useState, useEffect } from "react";

export interface TextEdit {
  id: string;
  original: string;
  edited: string;
}

export interface HistoryEntry {
  id: string;
  textId: string;
  timestamp: string;
  oldValue: string;
  newValue: string;
}

interface TextEditContextType {
  isEditMode: boolean;
  setIsEditMode: (val: boolean) => void;
  edits: Record<string, string>;
  originalTexts: Record<string, string>;
  history: HistoryEntry[];
  registerText: (id: string, defaultText: string) => void;
  setEditText: (id: string, newText: string) => void;
  restoreText: (id: string) => void;
  restoreAll: () => void;
  getEditsList: () => TextEdit[];
  clearHistory: () => void;
}

const TextEditContext = createContext<TextEditContextType | undefined>(undefined);

export function TextEditProvider({ children }: { children: React.ReactNode }) {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [edits, setEdits] = useState<Record<string, string>>({});
  const [originalTexts, setOriginalTexts] = useState<Record<string, string>>({});
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  // Synchronizers to write changes to central server-side JSON database
  const syncEditsToServer = async (newEdits: Record<string, string>) => {
    try {
      await fetch("/api/edits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEdits)
      });
    } catch (e) {
      console.error("Failed to sync edits to server database:", e);
    }
  };

  const syncHistoryToServer = async (newHistory: HistoryEntry[]) => {
    try {
      await fetch("/api/history", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newHistory)
      });
    } catch (e) {
      console.error("Failed to sync history to server database:", e);
    }
  };

  // Load saved edits and history from localStorage, and sync with persistent backend filesystem on first render!
  useEffect(() => {
    // 1. Initial local bootstrap for zero-latency startup
    try {
      const savedEdits = localStorage.getItem("onehealth_client_edits");
      if (savedEdits) {
        setEdits(JSON.parse(savedEdits));
      }
      const savedHistory = localStorage.getItem("onehealth_client_edits_history");
      if (savedHistory) {
        setHistory(JSON.parse(savedHistory));
      }
    } catch (e) {
      console.error("Failed to load content edits or history from cache:", e);
    }

    // 2. Hydrate from permanent central server database to ensure survival for weeks/months/cross-device
    const hydrateFromDatabase = async () => {
      try {
        const [editsRes, historyRes] = await Promise.all([
          fetch("/api/edits"),
          fetch("/api/history")
        ]);
        if (editsRes.ok) {
          const serverEdits = await editsRes.json();
          setEdits(serverEdits);
          localStorage.setItem("onehealth_client_edits", JSON.stringify(serverEdits));
        }
        if (historyRes.ok) {
          const serverHistory = await historyRes.json();
          setHistory(serverHistory);
          localStorage.setItem("onehealth_client_edits_history", JSON.stringify(serverHistory));
        }
      } catch (e) {
        console.error("Failed to hybrid-hydrate edits from permanent server database:", e);
      }
    };
    hydrateFromDatabase();
  }, []);

  // Save changes to localStorage and central server db
  const saveEdits = (newEdits: Record<string, string>) => {
    setEdits(newEdits);
    try {
      localStorage.setItem("onehealth_client_edits", JSON.stringify(newEdits));
    } catch (e) {
      console.error("Failed to persist content edits:", e);
    }
    syncEditsToServer(newEdits);
  };

  const registerText = (id: string, defaultText: string) => {
    setOriginalTexts((prev) => {
      if (prev[id] === defaultText) return prev;
      return { ...prev, [id]: defaultText };
    });
  };

  const setEditText = (id: string, newText: string) => {
    const oldValue = edits[id] !== undefined ? edits[id] : (originalTexts[id] || "");
    const trimmed = newText.trim();
    const original = originalTexts[id] || "";
    
    if (trimmed === oldValue) return; // No true change to save

    const nextEdits = { ...edits };
    if (!trimmed || trimmed === original) {
      delete nextEdits[id];
    } else {
      nextEdits[id] = trimmed;
    }
    saveEdits(nextEdits);

    // Create chronological history entry
    const entry: HistoryEntry = {
      id: `${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      textId: id,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + " " + new Date().toLocaleDateString(),
      oldValue,
      newValue: trimmed || original,
    };
    const nextHistory = [entry, ...history];
    setHistory(nextHistory);
    try {
      localStorage.setItem("onehealth_client_edits_history", JSON.stringify(nextHistory));
    } catch (e) {
      console.error("Failed to store history:", e);
    }
    syncHistoryToServer(nextHistory);
  };

  const restoreText = (id: string) => {
    const oldValue = edits[id] !== undefined ? edits[id] : (originalTexts[id] || "");
    const original = originalTexts[id] || "";
    if (oldValue === original) return;

    const nextEdits = { ...edits };
    delete nextEdits[id];
    saveEdits(nextEdits);

    const entry: HistoryEntry = {
      id: `${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      textId: id,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + " " + new Date().toLocaleDateString(),
      oldValue,
      newValue: original,
    };
    const nextHistory = [entry, ...history];
    setHistory(nextHistory);
    try {
      localStorage.setItem("onehealth_client_edits_history", JSON.stringify(nextHistory));
    } catch (e) {
      console.error("Failed to store history:", e);
    }
    syncHistoryToServer(nextHistory);
  };

  const restoreAll = () => {
    const keys = Object.keys(edits);
    if (keys.length === 0) return;

    const newEntries: HistoryEntry[] = keys.map((id, index) => ({
      id: `${Date.now()}-${index}-${Math.random().toString(36).substring(2, 4)}`,
      textId: id,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + " " + new Date().toLocaleDateString(),
      oldValue: edits[id],
      newValue: originalTexts[id] || "",
    }));

    saveEdits({});
    const nextHistory = [...newEntries, ...history];
    setHistory(nextHistory);
    try {
      localStorage.setItem("onehealth_client_edits_history", JSON.stringify(nextHistory));
    } catch (e) {
      console.error("Failed to store history:", e);
    }
    syncHistoryToServer(nextHistory);
  };

  const clearHistory = () => {
    setHistory([]);
    try {
      localStorage.removeItem("onehealth_client_edits_history");
    } catch (e) {
      console.error("Failed to clear history from storage:", e);
    }
    syncHistoryToServer([]);
  };

  const getEditsList = (): TextEdit[] => {
    return Object.keys(edits).map((id) => ({
      id,
      original: originalTexts[id] || id,
      edited: edits[id],
    }));
  };

  return (
    <TextEditContext.Provider
      value={{
        isEditMode,
        setIsEditMode,
        edits,
        originalTexts,
        history,
        registerText,
        setEditText,
        restoreText,
        restoreAll,
        getEditsList,
        clearHistory,
      }}
    >
      {children}
    </TextEditContext.Provider>
  );
}

export function useTextEdit() {
  const context = useContext(TextEditContext);
  if (!context) {
    throw new Error("useTextEdit must be used within a TextEditProvider");
  }
  return context;
}
