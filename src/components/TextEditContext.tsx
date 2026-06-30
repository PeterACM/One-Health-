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
import { db } from "../lib/firebase";
import { 
  collection, 
  doc, 
  setDoc, 
  deleteDoc, 
  onSnapshot, 
  query, 
  orderBy, 
  writeBatch,
  getDocs,
  limit
} from "firebase/firestore";

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
  createdAt?: number;
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

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errMsg = error instanceof Error ? error.message : String(error);
  const errCode = error && typeof error === "object" && "code" in error ? (error as any).code : "";
  const isPermissionError = 
    errCode === "permission-denied" || 
    errMsg.toLowerCase().includes("permission") || 
    errMsg.toLowerCase().includes("insufficient");

  const errInfo: FirestoreErrorInfo = {
    error: errMsg,
    authInfo: {
      userId: null,
      email: null,
      emailVerified: null,
      isAnonymous: null,
    },
    operationType,
    path
  };

  if (isPermissionError) {
    console.error('Firestore Permission Error Details: ', JSON.stringify(errInfo));
    throw new Error(JSON.stringify(errInfo));
  } else {
    console.warn('Firestore Connection/Non-fatal Error Details: ', JSON.stringify(errInfo));
  }
}

const TextEditContext = createContext<TextEditContextType | undefined>(undefined);

export function TextEditProvider({ children }: { children: React.ReactNode }) {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [edits, setEdits] = useState<Record<string, string>>(() => {
    try {
      const savedEdits = localStorage.getItem("onehealth_client_edits");
      return savedEdits ? JSON.parse(savedEdits) : {};
    } catch {
      return {};
    }
  });
  const [originalTexts, setOriginalTexts] = useState<Record<string, string>>({});
  const [history, setHistory] = useState<HistoryEntry[]>(() => {
    try {
      const savedHistory = localStorage.getItem("onehealth_client_edits_history");
      return savedHistory ? JSON.parse(savedHistory) : [];
    } catch {
      return [];
    }
  });
  const [migrationChecked, setMigrationChecked] = useState<boolean>(false);

  // 1. One-time client-to-cloud legacy edits auto-migration
  useEffect(() => {
    const migrateLegacyLocalData = async () => {
      try {
        const migratedFlag = localStorage.getItem("onehealth_migrated_to_firestore_v2");
        if (migratedFlag === "true") {
          setMigrationChecked(true);
          return;
        }

        const savedEditsStr = localStorage.getItem("onehealth_client_edits");
        const savedHistoryStr = localStorage.getItem("onehealth_client_edits_history");

        if (savedEditsStr) {
          const localEdits = JSON.parse(savedEditsStr);
          const editKeys = Object.keys(localEdits);
          if (editKeys.length > 0) {
            console.log("Migrating legacy client overrides to Firestore:", editKeys);
            for (const id of editKeys) {
              const text = localEdits[id];
              if (text) {
                const editDocRef = doc(db, "edits", id);
                await setDoc(editDocRef, {
                  text: text,
                  updatedAt: new Date().toISOString()
                });
              }
            }
          }
        }

        if (savedHistoryStr) {
          const localHistory = JSON.parse(savedHistoryStr) as HistoryEntry[];
          if (localHistory && localHistory.length > 0) {
            console.log("Migrating legacy history entries to Firestore:", localHistory.length);
            for (const entry of localHistory) {
              const entryId = entry.id || `${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
              const entryDocRef = doc(db, "history", entryId);
              await setDoc(entryDocRef, {
                id: entryId,
                textId: entry.textId || "",
                timestamp: entry.timestamp || "",
                oldValue: entry.oldValue || "",
                newValue: entry.newValue || "",
                createdAt: entry.createdAt || Date.now()
              });
            }
          }
        }

        localStorage.setItem("onehealth_migrated_to_firestore_v2", "true");
        console.log("Migration of legacy edits completed successfully!");
      } catch (e) {
        console.error("Legacy client to Firestore migration failed:", e);
      } finally {
        setMigrationChecked(true);
      }
    };

    migrateLegacyLocalData();
  }, []);

  // 2. Listen to 'edits' collection in Firestore in real-time once migration check is complete
  useEffect(() => {
    if (!migrationChecked) return;

    try {
      const unsubscribe = onSnapshot(collection(db, "edits"), (snapshot) => {
        const updatedEdits: Record<string, string> = {};
        snapshot.forEach((doc) => {
          const data = doc.data();
          if (data && typeof data.text === "string") {
            updatedEdits[doc.id] = data.text;
          }
        });
        setEdits(updatedEdits);
        localStorage.setItem("onehealth_client_edits", JSON.stringify(updatedEdits));
      }, (error) => {
        handleFirestoreError(error, OperationType.LIST, "edits");
      });
      return () => unsubscribe();
    } catch (e) {
      console.error("Failed to start onSnapshot listener for edits:", e);
    }
  }, [migrationChecked]);

  // 3. Listen to 'history' collection in Firestore in real-time once migration check is complete
  useEffect(() => {
    if (!migrationChecked) return;

    try {
      const q = query(
        collection(db, "history"), 
        orderBy("createdAt", "desc"),
        limit(100)
      );
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const updatedHistory: HistoryEntry[] = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          updatedHistory.push({
            id: doc.id,
            textId: data.textId || "",
            timestamp: data.timestamp || "",
            oldValue: data.oldValue || "",
            newValue: data.newValue || "",
            createdAt: data.createdAt || 0
          });
        });
        setHistory(updatedHistory);
        localStorage.setItem("onehealth_client_edits_history", JSON.stringify(updatedHistory));
      }, (error) => {
        handleFirestoreError(error, OperationType.LIST, "history");
      });
      return () => unsubscribe();
    } catch (e) {
      console.error("Failed to start onSnapshot listener for history:", e);
    }
  }, [migrationChecked]);

  const registerText = (id: string, defaultText: string) => {
    setOriginalTexts((prev) => {
      if (prev[id] === defaultText) return prev;
      return { ...prev, [id]: defaultText };
    });
  };

  const setEditText = async (id: string, newText: string) => {
    const oldValue = edits[id] !== undefined ? edits[id] : (originalTexts[id] || "");
    const trimmed = newText.trim();
    const original = originalTexts[id] || "";
    
    if (trimmed === oldValue) return; // No true change to save

    try {
      const timestampMs = Date.now();
      // 1. Update/delete document in the 'edits' Firestore collection
      const editDocRef = doc(db, "edits", id);
      if (!trimmed || trimmed === original) {
        try {
          await deleteDoc(editDocRef);
        } catch (e) {
          handleFirestoreError(e, OperationType.DELETE, `edits/${id}`);
        }
      } else {
        try {
          await setDoc(editDocRef, {
            text: trimmed,
            updatedAt: new Date().toISOString()
          });
        } catch (e) {
          handleFirestoreError(e, OperationType.WRITE, `edits/${id}`);
        }
      }

      // 2. Create history entry in Firestore 'history' collection
      const entryId = `${timestampMs}-${Math.random().toString(36).substring(2, 6)}`;
      const entryDocRef = doc(db, "history", entryId);
      try {
        await setDoc(entryDocRef, {
          id: entryId,
          textId: id,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + " " + new Date().toLocaleDateString(),
          oldValue,
          newValue: trimmed || original,
          createdAt: timestampMs
        });
      } catch (e) {
        handleFirestoreError(e, OperationType.WRITE, `history/${entryId}`);
      }
    } catch (e) {
      console.error("Error setting edit text in Firestore:", e);
    }
  };

  const restoreText = async (id: string) => {
    const oldValue = edits[id] !== undefined ? edits[id] : (originalTexts[id] || "");
    const original = originalTexts[id] || "";
    if (oldValue === original) return;

    try {
      const timestampMs = Date.now();
      // 1. Delete the document in the 'edits' Firestore collection
      const editDocRef = doc(db, "edits", id);
      try {
        await deleteDoc(editDocRef);
      } catch (e) {
        handleFirestoreError(e, OperationType.DELETE, `edits/${id}`);
      }

      // 2. Create history entry
      const entryId = `${timestampMs}-${Math.random().toString(36).substring(2, 6)}`;
      const entryDocRef = doc(db, "history", entryId);
      try {
        await setDoc(entryDocRef, {
          id: entryId,
          textId: id,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + " " + new Date().toLocaleDateString(),
          oldValue,
          newValue: original,
          createdAt: timestampMs
        });
      } catch (e) {
        handleFirestoreError(e, OperationType.WRITE, `history/${entryId}`);
      }
    } catch (e) {
      console.error("Error restoring text in Firestore:", e);
    }
  };

  const restoreAll = async () => {
    const keys = Object.keys(edits);
    if (keys.length === 0) return;

    try {
      const timestampMs = Date.now();
      const batch = writeBatch(db);

      // 1. Delete all overrides
      keys.forEach((id) => {
        const editDocRef = doc(db, "edits", id);
        batch.delete(editDocRef);
      });

      // 2. Write history entries
      keys.forEach((id, index) => {
        const entryId = `${timestampMs}-${index}-${Math.random().toString(36).substring(2, 4)}`;
        const entryDocRef = doc(db, "history", entryId);
        batch.set(entryDocRef, {
          id: entryId,
          textId: id,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + " " + new Date().toLocaleDateString(),
          oldValue: edits[id],
          newValue: originalTexts[id] || "",
          createdAt: timestampMs + index
        });
      });

      try {
        await batch.commit();
      } catch (e) {
        handleFirestoreError(e, OperationType.WRITE, "edits/history-batch");
      }
    } catch (e) {
      console.error("Error restoring all texts in Firestore batch:", e);
    }
  };

  const clearHistory = async () => {
    try {
      let querySnapshot;
      try {
        querySnapshot = await getDocs(collection(db, "history"));
      } catch (e) {
        handleFirestoreError(e, OperationType.GET, "history");
      }
      
      if (!querySnapshot || querySnapshot.empty) return;

      const batch = writeBatch(db);
      querySnapshot.forEach((doc) => {
        batch.delete(doc.ref);
      });

      try {
        await batch.commit();
      } catch (e) {
        handleFirestoreError(e, OperationType.DELETE, "history-batch");
      }
    } catch (e) {
      console.error("Error clearing history in Firestore batch:", e);
    }
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
