"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { IncentivesLayoutConfig, ElementTransform, defaultTransform, incentivesLayout } from "@/config/incentives-layout";

type EditorMode = "drag" | "scale" | "rotate" | "none";

interface EditorState {
  isEditorActive: boolean;
  selectedId: string | null;
  mode: EditorMode;
  layout: IncentivesLayoutConfig;
  setSelectedId: (id: string | null) => void;
  setMode: (mode: EditorMode) => void;
  updateTransform: (id: string, updates: Partial<ElementTransform>) => void;
  saveLayout: () => Promise<void>;
  resetSelected: () => void;
  resetAll: () => void;
  importLayout: (config: IncentivesLayoutConfig) => void;
}

const EditorContext = createContext<EditorState | null>(null);

export function EditorProvider({ children }: { children: React.ReactNode }) {
  const [isEditorActive, setIsEditorActive] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [mode, setMode] = useState<EditorMode>("drag");
  const [layout, setLayout] = useState<IncentivesLayoutConfig>(incentivesLayout);

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_EDITOR_MODE === "true") {
      setIsEditorActive(true);
    }
  }, []);

  // Stable identity: consumers (useDraggable) keep pointer listeners alive across
  // renders; a fresh closure here would tear the listeners down mid-drag.
  const updateTransform = useCallback((id: string, updates: Partial<ElementTransform>) => {
    setLayout((prev) => ({
      ...prev,
      [id]: {
        ...(prev[id] || defaultTransform),
        ...updates,
      },
    }));
  }, []);

  const saveLayout = async () => {
    try {
      const res = await fetch("/api/editor/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(layout),
      });
      if (!res.ok) throw new Error("Failed to save layout");
      alert("Layout saved to codebase!");
    } catch (e) {
      console.error(e);
      alert("Error saving layout. Check console.");
    }
  };

  const resetSelected = () => {
    if (selectedId) {
      setLayout((prev) => ({
        ...prev,
        [selectedId]: { ...defaultTransform },
      }));
    }
  };

  const resetAll = () => {
    setLayout(incentivesLayout);
  };

  const importLayout = (config: IncentivesLayoutConfig) => {
    setLayout(config);
  };

  // Keyboard Shortcuts Global Listener
  useEffect(() => {
    if (!isEditorActive) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if typing in an input
      if (document.activeElement?.tagName === "INPUT" || document.activeElement?.tagName === "TEXTAREA") return;

      switch (e.key.toLowerCase()) {
        case "escape":
          setSelectedId(null);
          break;
        case "r":
          setMode("rotate");
          break;
        case "s":
          setMode("scale");
          break;
        case "d":
        case "g":
          setMode("drag"); // D for drag, or G for grab
          break;
      }

      if (selectedId) {
        const t = layout[selectedId] || defaultTransform;
        let deltaX = 0, deltaY = 0;
        const step = e.shiftKey ? 10 : (e.altKey ? 0.1 : 1);

        if (mode === "drag") {
          if (e.key === "ArrowUp") deltaY = -step;
          if (e.key === "ArrowDown") deltaY = step;
          if (e.key === "ArrowLeft") deltaX = -step;
          if (e.key === "ArrowRight") deltaX = step;
          
          if (deltaX !== 0 || deltaY !== 0) {
            e.preventDefault();
            updateTransform(selectedId, { x: t.x + deltaX, y: t.y + deltaY });
          }
        } else if (mode === "scale") {
          let deltaS = 0;
          if (e.key === "ArrowUp" || e.key === "ArrowRight") deltaS = step * 0.01;
          if (e.key === "ArrowDown" || e.key === "ArrowLeft") deltaS = -step * 0.01;
          
          if (deltaS !== 0) {
            e.preventDefault();
            updateTransform(selectedId, { scale: Math.max(0, t.scale + deltaS) });
          }
        } else if (mode === "rotate") {
          let deltaR = 0;
          if (e.key === "ArrowUp" || e.key === "ArrowRight") deltaR = step;
          if (e.key === "ArrowDown" || e.key === "ArrowLeft") deltaR = -step;
          
          if (deltaR !== 0) {
            e.preventDefault();
            updateTransform(selectedId, { rotation: t.rotation + deltaR });
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isEditorActive, selectedId, layout, mode]);

  return (
    <EditorContext.Provider
      value={{
        isEditorActive,
        selectedId,
        mode,
        layout,
        setSelectedId,
        setMode,
        updateTransform,
        saveLayout,
        resetSelected,
        resetAll,
        importLayout,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
}

export function useEditorState() {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error("useEditorState must be used within EditorProvider");
  }
  return context;
}
