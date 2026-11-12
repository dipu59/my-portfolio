"use client";

import React, { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { LuZoomIn, LuZoomOut, LuRotateCcw, LuHeart } from "react-icons/lu";

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
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const lastTapRef = useRef<number>(0);

  // Zoom In
  const handleZoomIn = () => {
    setScale((prev) => Math.min(3, +(prev + 0.5).toFixed(1)));
  };

  // Zoom Out
  const handleZoomOut = () => {
    setScale((prev) => {
      const next = Math.max(1, +(prev - 0.5).toFixed(1));
      if (next === 1) setPosition({ x: 0, y: 0 });
      return next;
    });
  };

  // Reset Zoom
  const handleResetZoom = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  // Double tap / double click detection
  const handleDoubleTap = useCallback(
    (clientX: number, clientY: number) => {
      if (onDoubleTapHeart) {
        onDoubleTapHeart();
      }

      if (scale > 1) {
        handleResetZoom();
      } else {
        if (!containerRef.current) {
          setScale(2);
          return;
        }
        const rect = containerRef.current.getBoundingClientRect();
        const offsetX = clientX - rect.left - rect.width / 2;
        const offsetY = clientY - rect.top - rect.height / 2;
        setPosition({ x: -offsetX * 0.8, y: -offsetY * 0.8 });
        setScale(2);
      }
    },
    [scale, onDoubleTapHeart]
  );

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const now = Date.now();
    if (now - lastTapRef.current < 320) {
      // Double click
      handleDoubleTap(e.clientX, e.clientY);
      lastTapRef.current = 0;
    } else {
      lastTapRef.current = now;
    }
  };

  // Touch double tap handler
  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    const now = Date.now();
    if (now - lastTapRef.current < 320 && e.changedTouches[0]) {
      const touch = e.changedTouches[0];
      handleDoubleTap(touch.clientX, touch.clientY);
      lastTapRef.current = 0;
    } else {
      lastTapRef.current = now;
    }
  };

  // Mouse wheel zoom
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      setScale((prev) => Math.min(3, +(prev + 0.25).toFixed(2)));
    } else {
      setScale((prev) => {
        const next = Math.max(1, +(prev - 0.25).toFixed(2));
        if (next === 1) setPosition({ x: 0, y: 0 });
        return next;
      });
    }
  };

  // Pan dragging when scale > 1
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (scale <= 1) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || scale <= 1) return;
    const maxOffset = (scale - 1) * 200;
    const newX = Math.max(-maxOffset, Math.min(maxOffset, e.clientX - dragStart.x));
    const newY = Math.max(-maxOffset, Math.min(maxOffset, e.clientY - dragStart.y));
    setPosition({ x: newX, y: newY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div
      ref={containerRef}
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onClick={handleClick}
      onTouchEnd={handleTouchEnd}
      className={`relative w-full h-full flex items-center justify-center overflow-hidden select-none ${
        scale > 1 ? (isDragging ? "cursor-grabbing" : "cursor-grab") : "cursor-zoom-in"
      }`}
      style={{ touchAction: scale > 1 ? "none" : "auto" }}
    >
      {/* Zoomed Image Container */}
      <motion.div
        animate={{
          scale,
          x: position.x,
          y: position.y,
        }}
        transition={{
          type: "spring",
          stiffness: 280,
          damping: 28,
        }}
        className="relative w-full h-full flex items-center justify-center transform-gpu will-change-transform"
      >
        <div className="relative w-full h-full max-h-[82vh] max-w-full">
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(min-width: 1024px) 65vw, 100vw"
            priority
            draggable={false}
            className="object-contain pointer-events-none select-none"
          />
        </div>
      </motion.div>

      {/* Floating Heart Burst Animation (Instagram Double-Tap) */}
      <AnimatePresence>
        {showHeartAnim && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [0, 1.35, 1.15],
              opacity: [0, 1, 0.95],
              rotate: [0, -8, 8, 0],
            }}
            exit={{
              scale: 1.6,
              opacity: 0,
              y: -40,
              transition: { duration: 0.35, ease: "easeOut" },
            }}
            transition={{
              duration: 0.45,
              ease: [0.175, 0.885, 0.32, 1.275],
            }}
            className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center"
          >
            <div className="relative">
              <LuHeart className="h-28 w-28 text-rose-500 fill-rose-500 filter drop-shadow-[0_0_24px_rgba(244,63,94,0.9)] animate-pulse" />
              <div className="absolute inset-0 rounded-full bg-rose-500/20 blur-xl -z-10" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Minimal Zoom Controls Overlay (Top Right or Bottom Left) */}
      <div className="absolute bottom-3 left-3 z-30 flex items-center gap-1.5 rounded-full p-1 border border-[#1a2235] bg-[#030407]/85 backdrop-blur-md text-white shadow-xl pointer-events-auto">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleZoomOut();
          }}
          disabled={scale <= 1}
          aria-label="Zoom out"
          className="p-1.5 rounded-full hover:bg-[#1a2235] text-neutral-300 hover:text-white disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
        >
          <LuZoomOut className="h-4 w-4" />
        </button>

        <span className="font-mono text-[11px] px-2 py-0.5 text-neutral-300 font-semibold min-w-[42px] text-center">
          {Math.round(scale * 100)}%
        </span>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleZoomIn();
          }}
          disabled={scale >= 3}
          aria-label="Zoom in"
          className="p-1.5 rounded-full hover:bg-[#1a2235] text-neutral-300 hover:text-white disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
        >
          <LuZoomIn className="h-4 w-4" />
        </button>

        {scale > 1 && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleResetZoom();
            }}
            aria-label="Reset zoom"
            className="p-1.5 rounded-full hover:bg-[#1a2235] text-[#D4FF24] hover:text-[#D4FF24] transition-colors border-l border-[#1a2235] ml-0.5"
            title="Reset Zoom (100%)"
          >
            <LuRotateCcw className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {/* Subtle Hint */}
      <div className="absolute top-3 left-3 z-20 pointer-events-none hidden sm:block">
        <span className="font-mono text-[10px] text-neutral-400/80 bg-black/60 backdrop-blur-xs px-2.5 py-1 rounded-full border border-white/5">
          {scale > 1 ? "Drag to pan • Click to reset" : "Double-tap / Scroll to zoom"}
        </span>
      </div>
    </div>
  );
}
