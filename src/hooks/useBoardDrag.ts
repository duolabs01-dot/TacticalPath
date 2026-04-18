import { useCallback, useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";

export interface BoardDragPreview {
  label: string;
  className: string;
  labelClassName?: string;
}

interface PendingDragSession {
  source: number;
  startX: number;
  startY: number;
  validTargets: number[];
  preview: BoardDragPreview;
}

export interface ActiveBoardDrag {
  source: number;
  pointer: { x: number; y: number };
  hovered: number | null;
  validTargets: number[];
  preview: BoardDragPreview;
}

interface UseBoardDragOptions {
  enabled: boolean;
  getValidTargets: (source: number) => number[];
  onDrop: (source: number, target: number) => void;
}

const DRAG_THRESHOLD = 8;

function getHoveredTarget(clientX: number, clientY: number, validTargets: number[]) {
  const targetElement = document.elementFromPoint(clientX, clientY)?.closest<HTMLElement>("[data-drag-target]");
  const rawTarget = targetElement?.dataset.dragTarget;
  if (!rawTarget) return null;

  const target = Number(rawTarget);
  if (!Number.isInteger(target) || !validTargets.includes(target)) return null;
  return target;
}

export function useBoardDrag({ enabled, getValidTargets, onDrop }: UseBoardDragOptions) {
  const [dragState, setDragState] = useState<ActiveBoardDrag | null>(null);
  const pendingRef = useRef<PendingDragSession | null>(null);
  const dragStateRef = useRef<ActiveBoardDrag | null>(null);
  const cleanupRef = useRef<(() => void) | null>(null);
  const suppressClickUntilRef = useRef(0);

  useEffect(() => {
    dragStateRef.current = dragState;
  }, [dragState]);

  const clearSession = useCallback((suppressClick: boolean) => {
    if (cleanupRef.current) {
      cleanupRef.current();
      cleanupRef.current = null;
    }

    pendingRef.current = null;
    dragStateRef.current = null;
    setDragState(null);

    if (suppressClick) {
      suppressClickUntilRef.current = Date.now() + 180;
    }
  }, []);

  const startDrag = useCallback((source: number, event: ReactPointerEvent, preview: BoardDragPreview) => {
    if (!enabled || cleanupRef.current) return;

    const validTargets = getValidTargets(source);
    if (validTargets.length === 0) return;

    pendingRef.current = {
      source,
      startX: event.clientX,
      startY: event.clientY,
      validTargets,
      preview,
    };

    const handlePointerMove = (pointerEvent: PointerEvent) => {
      const pending = pendingRef.current;
      if (!pending) return;

      const activeDrag = dragStateRef.current;
      if (!activeDrag) {
        const movedEnough =
          Math.hypot(pointerEvent.clientX - pending.startX, pointerEvent.clientY - pending.startY) >= DRAG_THRESHOLD;

        if (!movedEnough) return;

        const nextDragState: ActiveBoardDrag = {
          source: pending.source,
          pointer: { x: pointerEvent.clientX, y: pointerEvent.clientY },
          hovered: getHoveredTarget(pointerEvent.clientX, pointerEvent.clientY, pending.validTargets),
          validTargets: pending.validTargets,
          preview: pending.preview,
        };

        suppressClickUntilRef.current = Date.now() + 180;
        dragStateRef.current = nextDragState;
        setDragState(nextDragState);
        return;
      }

      const nextHovered = getHoveredTarget(pointerEvent.clientX, pointerEvent.clientY, activeDrag.validTargets);
      const nextDragState: ActiveBoardDrag = {
        ...activeDrag,
        pointer: { x: pointerEvent.clientX, y: pointerEvent.clientY },
        hovered: nextHovered,
      };

      dragStateRef.current = nextDragState;
      setDragState(nextDragState);
    };

    const handlePointerUp = () => {
      const activeDrag = dragStateRef.current;

      if (activeDrag?.hovered !== null) {
        onDrop(activeDrag.source, activeDrag.hovered);
        clearSession(true);
        return;
      }

      clearSession(Boolean(activeDrag));
    };

    const handlePointerCancel = () => {
      clearSession(Boolean(dragStateRef.current));
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp, { once: true });
    window.addEventListener("pointercancel", handlePointerCancel, { once: true });

    cleanupRef.current = () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointercancel", handlePointerCancel);
    };
  }, [clearSession, enabled, getValidTargets, onDrop]);

  useEffect(() => () => clearSession(false), [clearSession]);

  const shouldSuppressClick = useCallback(() => Date.now() < suppressClickUntilRef.current, []);

  return {
    dragState,
    startDrag,
    shouldSuppressClick,
  };
}
