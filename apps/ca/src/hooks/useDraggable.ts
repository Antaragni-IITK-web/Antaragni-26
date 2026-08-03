"use client";

import { useEffect, useRef, RefObject } from "react";
import { useEditorState } from "./useEditorState";
import { defaultTransform } from "@/config/incentives-layout";

export function useDraggable(id: string, ref: RefObject<HTMLElement | null>) {
  const { isEditorActive, mode, layout, updateTransform, setSelectedId } = useEditorState();

  // Read layout through a ref so it isn't an effect dependency — otherwise every
  // updateTransform during a drag re-runs the effect, removing the pointer
  // listeners and resetting isDragging, which froze the drag after one move.
  const layoutRef = useRef(layout);
  layoutRef.current = layout;

  useEffect(() => {
    const el = ref.current;
    if (!el || !isEditorActive) return;

    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let initialTx = 0;
    let initialTy = 0;

    const handlePointerDown = (e: PointerEvent) => {
      // If we clicked a control handle or editor panel, ignore
      if ((e.target as HTMLElement).closest(".editor-ui")) return;

      e.preventDefault(); // prevent text selection
      e.stopPropagation();

      setSelectedId(id);

      if (mode === "drag") {
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;

        const currentTransform = layoutRef.current[id] || defaultTransform;
        initialTx = currentTransform.x;
        initialTy = currentTransform.y;

        el.setPointerCapture(e.pointerId);
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!isDragging) return;

      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;

      updateTransform(id, {
        x: initialTx + deltaX,
        y: initialTy + deltaY,
      });
    };

    const handlePointerUp = (e: PointerEvent) => {
      if (isDragging) {
        isDragging = false;
        el.releasePointerCapture(e.pointerId);
      }
    };

    el.addEventListener("pointerdown", handlePointerDown);
    el.addEventListener("pointermove", handlePointerMove);
    el.addEventListener("pointerup", handlePointerUp);
    el.addEventListener("pointercancel", handlePointerUp);

    return () => {
      el.removeEventListener("pointerdown", handlePointerDown);
      el.removeEventListener("pointermove", handlePointerMove);
      el.removeEventListener("pointerup", handlePointerUp);
      el.removeEventListener("pointercancel", handlePointerUp);
    };
  }, [isEditorActive, mode, id, updateTransform, setSelectedId, ref]);
}
