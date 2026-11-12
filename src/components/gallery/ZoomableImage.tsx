"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { LuHeart, LuZoomIn, LuZoomOut, LuRotateCcw } from "react-icons/lu";

interface ZoomableImageProps {
  src: string;
  alt: string;
  onDoubleTapHeart?: () => void;
  showHeartAnim?: boolean;
}

export function ZoomableImage({
  src,
  alt,
  onDoubleTapHeart,
  showHeartAnim = false,
}: ZoomableImageProps) {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // References for multi-touch gesture handling
  const touchStartRef = useRef<{
    dist: number;
    initialScale: number;
    touch1: { x: number; y: number };
    touch2?: { x: number; y: number };
    panStart: { x: number; y: number };
    initialPos: { x: number; y: number };
  }>({
    dist: 0,
    initialScale: 1,
    touch1: { x: 0, y: 0 },
    panStart: { x: 0, y: 0 },
    initialPos: { x: 0, y: 0 },
  });

  const lastTapRef = useRef<number>(0);
  const isInteractingRef = useRef(false);

  // Mouse dragging state
  const isMouseDownRef = useRef(false);
  const mouseDragStartRef = useRef({ x: 0, y: 0 });
  const posAtDragStartRef = useRef({ x: 0, y: 0 });

  const clampPosition = useCallback((newScale: number, x: number, y: number) => {
    if (newScale <= 1) return { x: 0, y: 0 };
    if (!containerRef.current) return { x, y };

    const rect = containerRef.current.getBoundingClientRect();
    const maxX = (rect.width * (newScale - 1)) / 2;
    const maxY = (rect.height * (newScale - 1)) / 2;

    return {
      x: Math.max(-maxX, Math.min(maxX, x)),
      y: Math.max(-maxY, Math.min(maxY, y)),
    };
  }, []);

  // Double tap detection
  const handleDoubleTap = useCallback(
    (clientX: number, clientY: number) => {
      if (onDoubleTapHeart) {
        onDoubleTapHeart();
      }

      setScale((prevScale) => {
        if (prevScale > 1.2) {
          setPosition({ x: 0, y: 0 });
          return 1;
        } else {
          if (!containerRef.current) return 2.5;
          const rect = containerRef.current.getBoundingClientRect();
          const targetX = (rect.width / 2 - (clientX - rect.left)) * 1.2;
          const targetY = (rect.height / 2 - (clientY - rect.top)) * 1.2;
          setPosition(clampPosition(2.5, targetX, targetY));
          return 2.5;
        }
      });
    },
    [onDoubleTapHeart, clampPosition]
  );

  // Native touch event listeners attached with passive: false to prevent browser pinch interference
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onTouchStart = (e: TouchEvent) => {
      isInteractingRef.current = true;

      if (e.touches.length === 2) {
        // Pinch start
        const t1 = e.touches[0];
        const t2 = e.touches[1];
        const dist = Math.hypot(t1.clientX - t2.clientX, t1.clientY - t2.clientY);
        touchStartRef.current.dist = dist;
        touchStartRef.current.initialScale = scale;
        touchStartRef.current.touch1 = { x: t1.clientX, y: t1.clientY };
        touchStartRef.current.touch2 = { x: t2.clientX, y: t2.clientY };
      } else if (e.touches.length === 1) {
        // Single touch start (pan or double tap check)
        const t = e.touches[0];
        touchStartRef.current.panStart = { x: t.clientX, y: t.clientY };
        touchStartRef.current.initialPos = { ...position };

        const now = Date.now();
        if (now - lastTapRef.current < 300) {
          e.preventDefault();
          handleDoubleTap(t.clientX, t.clientY);
          lastTapRef.current = 0;
        } else {
          lastTapRef.current = now;
        }
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isInteractingRef.current) return;

      if (e.touches.length === 2) {
        // Pinching to zoom
        e.preventDefault();
        const t1 = e.touches[0];
        const t2 = e.touches[1];
        const currentDist = Math.hypot(
          t1.clientX - t2.clientX,
          t1.clientY - t2.clientY
        );

        if (touchStartRef.current.dist > 0) {
          const ratio = currentDist / touchStartRef.current.dist;
          const nextScale = Math.min(
            4,
            Math.max(0.85, touchStartRef.current.initialScale * ratio)
          );
          setScale(nextScale);
        }
      } else if (e.touches.length === 1 && scale > 1) {
        // Panning while zoomed
        e.preventDefault();
        const t = e.touches[0];
        const deltaX = t.clientX - touchStartRef.current.panStart.x;
        const deltaY = t.clientY - touchStartRef.current.panStart.y;

        const nextX = touchStartRef.current.initialPos.x + deltaX;
        const nextY = touchStartRef.current.initialPos.y + deltaY;

        setPosition(clampPosition(scale, nextX, nextY));
      }
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (e.touches.length === 0) {
        isInteractingRef.current = false;
        // Snap back if user pinched below 1x
        setScale((prev) => {
          if (prev < 1.05) {
            setPosition({ x: 0, y: 0 });
            return 1;
          }
          return prev;
        });
      }
    };

    el.addEventListener("touchstart", onTouchStart, { passive: false });
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    el.addEventListener("touchend", onTouchEnd);
    el.addEventListener("touchcancel", onTouchEnd);

    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
      el.removeEventListener("touchcancel", onTouchEnd);
    };
  }, [scale, position, handleDoubleTap, clampPosition]);

  // Desktop Mouse Handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (scale <= 1) return;
    isMouseDownRef.current = true;
    mouseDragStartRef.current = { x: e.clientX, y: e.clientY };
    posAtDragStartRef.current = { ...position };
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isMouseDownRef.current || scale <= 1) return;
    const deltaX = e.clientX - mouseDragStartRef.current.x;
    const deltaY = e.clientY - mouseDragStartRef.current.y;
    const nextX = posAtDragStartRef.current.x + deltaX;
    const nextY = posAtDragStartRef.current.y + deltaY;
    setPosition(clampPosition(scale, nextX, nextY));
  };

  const handleMouseUp = () => {
    isMouseDownRef.current = false;
  };

  // Mouse wheel zoom
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    const factor = e.deltaY < 0 ? 0.25 : -0.25;
    setScale((prev) => {
      const next = Math.min(4, Math.max(1, +(prev + factor).toFixed(2)));
      if (next === 1) setPosition({ x: 0, y: 0 });
      return next;
    });
  };

  const handleDoubleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    handleDoubleTap(e.clientX, e.clientY);
  };

  return (
    <div
      ref={containerRef}
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onDoubleClick={handleDoubleClick}
      className="relative w-full h-full min-h-0 flex items-center justify-center overflow-hidden select-none touch-none"
      style={{
        cursor: scale > 1 ? "grab" : "zoom-in",
        width: "100%",
        height: "100%",
      }}
    >
      {/* Zoomed/Transformed Image Layer */}
      <motion.div
        animate={{
          scale,
          x: position.x,
          y: position.y,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
        }}
        className="relative w-full h-full min-h-0 flex items-center justify-center transform-gpu will-change-transform"
        style={{ width: "100%", height: "100%" }}
      >
        <div
          className="relative w-full h-full min-h-0 flex items-center justify-center"
          style={{ width: "100%", height: "100%" }}
        >
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(min-width: 1024px) 800px, 100vw"
            priority
            draggable={false}
            className="object-contain pointer-events-none select-none"
          />
        </div>
      </motion.div>

      {/* Floating Instagram Heart Explosion */}
      <AnimatePresence>
        {showHeartAnim && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [0, 1.35, 1.1],
              opacity: [0, 1, 0.95],
              rotate: [0, -6, 6, 0],
            }}
            exit={{
              scale: 1.6,
              opacity: 0,
              y: -30,
              transition: { duration: 0.3, ease: "easeOut" },
            }}
            transition={{
              duration: 0.45,
              ease: [0.175, 0.885, 0.32, 1.275],
            }}
            className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center"
          >
            <LuHeart className="h-24 w-24 sm:h-28 sm:w-28 text-rose-500 fill-rose-500 filter drop-shadow-[0_0_24px_rgba(244,63,94,0.9)]" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Compact Zoom Controls Badge */}
      <div className="absolute bottom-3 left-3 z-30 flex items-center gap-1 rounded-full p-1 border border-[#1a2235] bg-[#030407]/80 backdrop-blur-md text-white shadow-lg pointer-events-auto">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setScale((prev) => {
              const next = Math.max(1, +(prev - 0.5).toFixed(1));
              if (next === 1) setPosition({ x: 0, y: 0 });
              return next;
            });
          }}
          disabled={scale <= 1}
          aria-label="Zoom out"
          className="p-1 rounded-full text-neutral-400 hover:text-white disabled:opacity-25"
        >
          <LuZoomOut className="h-3.5 w-3.5" />
        </button>

        <span className="font-mono text-[10px] px-1.5 text-neutral-300 font-semibold min-w-[34px] text-center">
          {Math.round(scale * 100)}%
        </span>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setScale((prev) => Math.min(4, +(prev + 0.5).toFixed(1)));
          }}
          disabled={scale >= 4}
          aria-label="Zoom in"
          className="p-1 rounded-full text-neutral-400 hover:text-white disabled:opacity-25"
        >
          <LuZoomIn className="h-3.5 w-3.5" />
        </button>

        {scale > 1 && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setScale(1);
              setPosition({ x: 0, y: 0 });
            }}
            aria-label="Reset zoom"
            className="p-1 rounded-full text-[#D4FF24] hover:text-[#D4FF24] border-l border-[#1a2235] ml-0.5"
            title="Reset"
          >
            <LuRotateCcw className="h-3 w-3" />
          </button>
        )}
      </div>
    </div>
  );
}
