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
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
}

export function ZoomableImage({
  src,
  alt,
  onDoubleTapHeart,
  showHeartAnim = false,
  onSwipeLeft,
  onSwipeRight,
}: ZoomableImageProps) {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Keep state in refs so touch handlers don't need to rebind on every state change
  const scaleRef = useRef(1);
  scaleRef.current = scale;

  const positionRef = useRef({ x: 0, y: 0 });
  positionRef.current = position;

  const onSwipeLeftRef = useRef(onSwipeLeft);
  onSwipeLeftRef.current = onSwipeLeft;

  const onSwipeRightRef = useRef(onSwipeRight);
  onSwipeRightRef.current = onSwipeRight;

  const onDoubleTapHeartRef = useRef(onDoubleTapHeart);
  onDoubleTapHeartRef.current = onDoubleTapHeart;

  // Reset zoom & pan when image source changes
  useEffect(() => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  }, [src]);

  // Gesture state
  const touchStartRef = useRef<{
    dist: number;
    initialScale: number;
    panStart: { x: number; y: number };
    initialPos: { x: number; y: number };
    startTime: number;
    deltaX: number;
    deltaY: number;
    isSwiping: boolean;
  }>({
    dist: 0,
    initialScale: 1,
    panStart: { x: 0, y: 0 },
    initialPos: { x: 0, y: 0 },
    startTime: 0,
    deltaX: 0,
    deltaY: 0,
    isSwiping: false,
  });

  const lastTapRef = useRef<number>(0);
  const isInteractingRef = useRef(false);

  // Mouse drag state for desktop
  const isMouseDownRef = useRef(false);
  const mouseDragStartRef = useRef({ x: 0, y: 0 });
  const mouseStartTimeRef = useRef(0);
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
      if (onDoubleTapHeartRef.current) {
        onDoubleTapHeartRef.current();
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
    [clampPosition]
  );

  // Native touch event listeners
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onTouchStart = (e: TouchEvent) => {
      isInteractingRef.current = true;

      if (e.touches.length === 2) {
        // Pinch-to-zoom start
        const t1 = e.touches[0];
        const t2 = e.touches[1];
        const dist = Math.hypot(t1.clientX - t2.clientX, t1.clientY - t2.clientY);
        touchStartRef.current.dist = dist;
        touchStartRef.current.initialScale = scaleRef.current;
      } else if (e.touches.length === 1) {
        // Single touch start (swipe, pan, or tap)
        const t = e.touches[0];
        touchStartRef.current.panStart = { x: t.clientX, y: t.clientY };
        touchStartRef.current.initialPos = { ...positionRef.current };
        touchStartRef.current.startTime = Date.now();
        touchStartRef.current.deltaX = 0;
        touchStartRef.current.deltaY = 0;
        touchStartRef.current.isSwiping = false;
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isInteractingRef.current) return;

      if (e.touches.length === 2) {
        // Pinching to zoom
        if (e.cancelable) e.preventDefault();
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
      } else if (e.touches.length === 1) {
        const t = e.touches[0];
        const dx = t.clientX - touchStartRef.current.panStart.x;
        const dy = t.clientY - touchStartRef.current.panStart.y;
        touchStartRef.current.deltaX = dx;
        touchStartRef.current.deltaY = dy;

        if (scaleRef.current > 1.05) {
          // Panning while zoomed in
          if (e.cancelable) e.preventDefault();
          const nextX = touchStartRef.current.initialPos.x + dx;
          const nextY = touchStartRef.current.initialPos.y + dy;
          setPosition(clampPosition(scaleRef.current, nextX, nextY));
        } else {
          // At normal 1x zoom: track horizontal swipe gesture
          if (Math.abs(dx) > Math.abs(dy)) {
            if (e.cancelable) e.preventDefault();
            touchStartRef.current.isSwiping = true;
            setIsDragging(true);
            // Realtime 1:1 tactile drag displacement
            setPosition({ x: dx, y: 0 });
          }
        }
      }
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (e.touches.length === 0) {
        isInteractingRef.current = false;
        setIsDragging(false);

        const endTouch = e.changedTouches && e.changedTouches[0] ? e.changedTouches[0] : null;
        const dx = endTouch
          ? endTouch.clientX - touchStartRef.current.panStart.x
          : touchStartRef.current.deltaX;
        const dy = endTouch
          ? endTouch.clientY - touchStartRef.current.panStart.y
          : touchStartRef.current.deltaY;
        const dist = Math.hypot(dx, dy);
        const elapsed = Date.now() - touchStartRef.current.startTime;

        // 1. Detect genuine clean tap (no significant drag or movement)
        if (dist < 15 && elapsed < 280) {
          const now = Date.now();
          if (now - lastTapRef.current < 350) {
            // Second tap of double tap
            handleDoubleTap(
              endTouch ? endTouch.clientX : window.innerWidth / 2,
              endTouch ? endTouch.clientY : window.innerHeight / 2
            );
            lastTapRef.current = 0;
          } else {
            // First tap
            lastTapRef.current = now;
          }
          return;
        }

        // If moved, it's NOT a tap: reset tap timer so swipes never falsely zoom
        lastTapRef.current = 0;

        // 2. Handle swipe navigation when at normal 1x scale
        if (scaleRef.current <= 1.05) {
          const isHorizontal = Math.abs(dx) > Math.abs(dy);
          // Distance threshold: 35px or quick flick gesture (< 350ms & > 20px)
          const isFlick = elapsed < 350 && Math.abs(dx) > 20;
          const isDrag = Math.abs(dx) > 35;

          if (isHorizontal && (isFlick || isDrag)) {
            if (dx < 0) {
              // Swiped finger left -> Show NEXT photo
              if (onSwipeLeftRef.current) {
                onSwipeLeftRef.current();
              }
            } else {
              // Swiped finger right -> Show PREVIOUS photo
              if (onSwipeRightRef.current) {
                onSwipeRightRef.current();
              }
            }
          }

          // Reset horizontal position back to center
          setPosition({ x: 0, y: 0 });
          setScale(1);
        } else {
          // Snap back if user pinched below 1x
          setScale((prev) => {
            if (prev < 1.05) {
              setPosition({ x: 0, y: 0 });
              return 1;
            }
            return prev;
          });
        }
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
  }, [handleDoubleTap, clampPosition]);

  // Desktop Mouse Handlers (supports drag-to-pan when zoomed and drag-to-swipe when 1x)
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    isMouseDownRef.current = true;
    mouseDragStartRef.current = { x: e.clientX, y: e.clientY };
    mouseStartTimeRef.current = Date.now();
    posAtDragStartRef.current = { ...positionRef.current };
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isMouseDownRef.current) return;
    const deltaX = e.clientX - mouseDragStartRef.current.x;
    const deltaY = e.clientY - mouseDragStartRef.current.y;

    if (scale > 1.05) {
      const nextX = posAtDragStartRef.current.x + deltaX;
      const nextY = posAtDragStartRef.current.y + deltaY;
      setPosition(clampPosition(scale, nextX, nextY));
    } else {
      if (Math.abs(deltaX) > 10) {
        setIsDragging(true);
        setPosition({ x: deltaX * 0.8, y: 0 });
      }
    }
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isMouseDownRef.current) return;
    isMouseDownRef.current = false;
    setIsDragging(false);

    if (scale <= 1.05) {
      const deltaX = e.clientX - mouseDragStartRef.current.x;
      const elapsed = Date.now() - mouseStartTimeRef.current;
      const isFlick = elapsed < 350 && Math.abs(deltaX) > 30;
      const isDrag = Math.abs(deltaX) > 60;

      if (isFlick || isDrag) {
        if (deltaX < 0 && onSwipeLeftRef.current) {
          onSwipeLeftRef.current();
        } else if (deltaX > 0 && onSwipeRightRef.current) {
          onSwipeRightRef.current();
        }
      }
      setPosition({ x: 0, y: 0 });
    }
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
      {/* Zoomed / Transformed Image Layer */}
      <motion.div
        animate={{
          scale,
          x: position.x,
          y: position.y,
        }}
        transition={
          isDragging
            ? { duration: 0 }
            : {
                type: "spring",
                stiffness: 320,
                damping: 32,
              }
        }
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
