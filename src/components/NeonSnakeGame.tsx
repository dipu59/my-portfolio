"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const GRID_SIZE = 20; // 20x20 grid

type Point = { x: number; y: number };
type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";

interface FoodItem {
  pos: Point;
  tech: string;
  symbol: string;
  points: number;
  color: string;
}

const TECH_FOODS = [
  { tech: "React", symbol: "⚛️", points: 10, color: "#61dafb" },
  { tech: "Next.js", symbol: "▲", points: 15, color: "#ffffff" },
  { tech: "TypeScript", symbol: "TS", points: 10, color: "#3178c6" },
  { tech: "Tailwind", symbol: "🌊", points: 10, color: "#38bdf8" },
  { tech: "Node.js", symbol: "🟩", points: 15, color: "#22c55e" },
  { tech: "GraphQL", symbol: "◈", points: 20, color: "#e535ab" },
  { tech: "Turbo", symbol: "⚡", points: 25, color: "#D4FF24" },
];

const INITIAL_SNAKE: Point[] = [
  { x: 10, y: 10 },
  { x: 10, y: 11 },
  { x: 10, y: 12 },
];

// ── Web Audio 8-Bit Sound Synthesizer ───────────────────────────────────────
class SoundFX {
  private ctx: AudioContext | null = null;
  public enabled: boolean = true;

  private init() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  playEat() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(440, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.1);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.1);
    } catch {
      // Audio autoplay policy fallback
    }
  }

  playGameOver() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(300, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(80, this.ctx.currentTime + 0.35);
      gain.gain.setValueAtTime(0.18, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.35);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.35);
    } catch {
      // ignore
    }
  }
}

const sfx = new SoundFX();

interface NeonSnakeGameProps {
  onClose?: () => void;
}

export function NeonSnakeGame({ onClose }: NeonSnakeGameProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [gameState, setGameState] = useState<"idle" | "playing" | "paused" | "gameover">("idle");
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [soundOn, setSoundOn] = useState(true);
  const [lastEaten, setLastEaten] = useState<string | null>(null);

  // Snake engine refs for 60fps glitch-free physics
  const snakeRef = useRef<Point[]>([...INITIAL_SNAKE]);
  const dirRef = useRef<Direction>("UP");
  const nextDirQueue = useRef<Direction[]>([]);
  const foodRef = useRef<FoodItem>({
    pos: { x: 10, y: 5 },
    tech: "Next.js",
    symbol: "▲",
    points: 15,
    color: "#D4FF24",
  });
  const particlesRef = useRef<{ x: number; y: number; vx: number; vy: number; color: string; life: number }[]>([]);
  const speedRef = useRef(115); // ms per step
  const lastTickRef = useRef(0);
  const animFrameRef = useRef<number | null>(null);

  // Load High Score
  useEffect(() => {
    try {
      const saved = localStorage.getItem("cyber_snake_highscore");
      if (saved) setHighScore(parseInt(saved, 10));
    } catch {
      // ignore
    }
  }, []);

  const spawnFood = useCallback((currentSnake: Point[]): FoodItem => {
    let newPos: Point;
    let collision: boolean;
    do {
      newPos = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
      collision = currentSnake.some((seg) => seg.x === newPos.x && seg.y === newPos.y);
    } while (collision);

    const randomTech = TECH_FOODS[Math.floor(Math.random() * TECH_FOODS.length)];
    return {
      pos: newPos,
      tech: randomTech.tech,
      symbol: randomTech.symbol,
      points: randomTech.points,
      color: randomTech.color,
    };
  }, []);

  const resetGame = useCallback(() => {
    snakeRef.current = [
      { x: 10, y: 10 },
      { x: 10, y: 11 },
      { x: 10, y: 12 },
    ];
    dirRef.current = "UP";
    nextDirQueue.current = [];
    foodRef.current = spawnFood(snakeRef.current);
    particlesRef.current = [];
    speedRef.current = 115;
    setScore(0);
    setGameState("playing");
  }, [spawnFood]);

  // Direction handler with Queue (Prevents 180° reverse bug)
  const setDirection = useCallback((newDir: Direction) => {
    const queue = nextDirQueue.current;
    const current = queue.length > 0 ? queue[queue.length - 1] : dirRef.current;

    const opposites: Record<Direction, Direction> = {
      UP: "DOWN",
      DOWN: "UP",
      LEFT: "RIGHT",
      RIGHT: "LEFT",
    };

    if (newDir !== opposites[current] && newDir !== current) {
      if (queue.length < 2) {
        queue.push(newDir);
      }
    }
  }, []);

  // Keyboard controls listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only capture if game container is focused/active
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Space"].includes(e.code)) {
        e.preventDefault();
      }

      if (e.code === "Space") {
        if (gameState === "idle" || gameState === "gameover") {
          resetGame();
        } else if (gameState === "playing") {
          setGameState("paused");
        } else if (gameState === "paused") {
          setGameState("playing");
        }
        return;
      }

      if (gameState !== "playing") return;

      switch (e.code) {
        case "ArrowUp":
        case "KeyW":
          setDirection("UP");
          break;
        case "ArrowDown":
        case "KeyS":
          setDirection("DOWN");
          break;
        case "ArrowLeft":
        case "KeyA":
          setDirection("LEFT");
          break;
        case "ArrowRight":
        case "KeyD":
          setDirection("RIGHT");
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown, { passive: false });
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [gameState, resetGame, setDirection]);

  // Touch Swipe listener
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartRef.current || gameState !== "playing") return;
    const dx = e.changedTouches[0].clientX - touchStartRef.current.x;
    const dy = e.changedTouches[0].clientY - touchStartRef.current.y;
    const absX = Math.abs(dx);
    const absY = Math.abs(dy);

    if (Math.max(absX, absY) > 20) {
      if (absX > absY) {
        setDirection(dx > 0 ? "RIGHT" : "LEFT");
      } else {
        setDirection(dy > 0 ? "DOWN" : "UP");
      }
    }
    touchStartRef.current = null;
  };

  // ── 60 FPS Render & Step Loop ──────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let isMounted = true;

    const gameLoop = (timestamp: number) => {
      if (!isMounted) return;

      const cellSize = canvas.width / GRID_SIZE;

      // ── Step Physics if Playing ──
      if (gameState === "playing") {
        if (!lastTickRef.current) lastTickRef.current = timestamp;
        const elapsed = timestamp - lastTickRef.current;

        if (elapsed > speedRef.current) {
          lastTickRef.current = timestamp;

          // Consume next queued direction
          if (nextDirQueue.current.length > 0) {
            dirRef.current = nextDirQueue.current.shift()!;
          }

          const head = snakeRef.current[0];
          const newHead: Point = { ...head };

          switch (dirRef.current) {
            case "UP":
              newHead.y -= 1;
              break;
            case "DOWN":
              newHead.y += 1;
              break;
            case "LEFT":
              newHead.x -= 1;
              break;
            case "RIGHT":
              newHead.x += 1;
              break;
          }

          // Wall Collision (Wrap-around or die: let's die for authentic arcade excitement)
          if (
            newHead.x < 0 ||
            newHead.x >= GRID_SIZE ||
            newHead.y < 0 ||
            newHead.y >= GRID_SIZE
          ) {
            sfx.playGameOver();
            setGameState("gameover");
            return;
          }

          // Self Collision
          if (
            snakeRef.current.some(
              (seg) => seg.x === newHead.x && seg.y === newHead.y
            )
          ) {
            sfx.playGameOver();
            setGameState("gameover");
            return;
          }

          snakeRef.current.unshift(newHead);

          // Check Food Eaten
          const food = foodRef.current;
          if (newHead.x === food.pos.x && newHead.y === food.pos.y) {
            sfx.playEat();
            setScore((prev) => {
              const next = prev + food.points;
              setHighScore((currHigh) => {
                if (next > currHigh) {
                  try {
                    localStorage.setItem("cyber_snake_highscore", String(next));
                  } catch {}
                  return next;
                }
                return currHigh;
              });
              return next;
            });

            setLastEaten(`+${food.points} ${food.tech}`);
            setTimeout(() => setLastEaten(null), 1200);

            // Burst particles
            for (let i = 0; i < 12; i++) {
              const angle = Math.random() * Math.PI * 2;
              const speed = Math.random() * 3 + 1;
              particlesRef.current.push({
                x: (food.pos.x + 0.5) * cellSize,
                y: (food.pos.y + 0.5) * cellSize,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                color: food.color,
                life: 1.0,
              });
            }

            // Speed up slightly as snake grows
            speedRef.current = Math.max(65, 115 - Math.floor(snakeRef.current.length * 1.5));
            foodRef.current = spawnFood(snakeRef.current);
          } else {
            snakeRef.current.pop();
          }
        }
      }

      // ── Draw Canvas Graphics ──
      // Clear background
      ctx.fillStyle = "#07090e";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Subtle Cyber Grid
      ctx.strokeStyle = "rgba(26, 34, 53, 0.4)";
      ctx.lineWidth = 0.5;
      for (let i = 0; i <= GRID_SIZE; i++) {
        ctx.beginPath();
        ctx.moveTo(i * cellSize, 0);
        ctx.lineTo(i * cellSize, canvas.height);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, i * cellSize);
        ctx.lineTo(canvas.width, i * cellSize);
        ctx.stroke();
      }

      // Draw Food
      const food = foodRef.current;
      const fx = food.pos.x * cellSize;
      const fy = food.pos.y * cellSize;

      ctx.save();
      // Glowing aura around food
      ctx.shadowColor = food.color;
      ctx.shadowBlur = 12;
      ctx.fillStyle = food.color;
      ctx.beginPath();
      ctx.arc(fx + cellSize / 2, fy + cellSize / 2, cellSize / 2 - 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Food Label/Emoji
      ctx.font = `bold ${Math.floor(cellSize * 0.55)}px sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "#030407";
      ctx.fillText(food.symbol, fx + cellSize / 2, fy + cellSize / 2);

      // Draw Snake
      snakeRef.current.forEach((seg, idx) => {
        const x = seg.x * cellSize;
        const y = seg.y * cellSize;
        const isHead = idx === 0;

        ctx.save();
        if (isHead) {
          ctx.fillStyle = "#D4FF24"; // Neon Lime Head
          ctx.shadowColor = "#D4FF24";
          ctx.shadowBlur = 14;
        } else {
          // Gradient fade from electric blue to lime
          const ratio = idx / snakeRef.current.length;
          ctx.fillStyle = ratio < 0.5 ? "#1558C9" : "#1a3675";
          ctx.shadowColor = "#1558C9";
          ctx.shadowBlur = 4;
        }

        // Rounded Segments
        const radius = isHead ? 4 : 2;
        ctx.beginPath();
        ctx.roundRect(x + 1, y + 1, cellSize - 2, cellSize - 2, radius);
        ctx.fill();

        // Draw eyes on head
        if (isHead) {
          ctx.fillStyle = "#030407";
          const eyeOffset = cellSize * 0.25;
          const eyeSize = Math.max(2, cellSize * 0.15);

          if (dirRef.current === "UP" || dirRef.current === "DOWN") {
            const eyeY = dirRef.current === "UP" ? y + eyeOffset : y + cellSize - eyeOffset;
            ctx.beginPath();
            ctx.arc(x + eyeOffset + 1, eyeY, eyeSize, 0, Math.PI * 2);
            ctx.arc(x + cellSize - eyeOffset - 1, eyeY, eyeSize, 0, Math.PI * 2);
            ctx.fill();
          } else {
            const eyeX = dirRef.current === "LEFT" ? x + eyeOffset : x + cellSize - eyeOffset;
            ctx.beginPath();
            ctx.arc(eyeX, y + eyeOffset + 1, eyeSize, 0, Math.PI * 2);
            ctx.arc(eyeX, y + cellSize - eyeOffset - 1, eyeSize, 0, Math.PI * 2);
            ctx.fill();
          }
        }
        ctx.restore();
      });

      // Draw Particles
      particlesRef.current.forEach((p, pIdx) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.04;

        if (p.life > 0) {
          ctx.save();
          ctx.globalAlpha = p.life;
          ctx.fillStyle = p.color;
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 6;
          ctx.beginPath();
          ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      });
      particlesRef.current = particlesRef.current.filter((p) => p.life > 0);

      animFrameRef.current = requestAnimationFrame(gameLoop);
    };

    animFrameRef.current = requestAnimationFrame(gameLoop);

    return () => {
      isMounted = false;
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [gameState, spawnFood]);

  return (
    <div
      className="relative w-full max-w-sm sm:max-w-md mx-auto rounded-2xl sm:rounded-3xl p-4 sm:p-5 border border-[#1a2235] bg-[#0a0d14]/95 backdrop-blur-xl shadow-2xl flex flex-col items-center select-none"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Top Arcade Header */}
      <div className="w-full flex items-center justify-between pb-3 mb-2 border-b border-[#1a2235] text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-[#D4FF24] animate-pulse" />
          <span className="font-bold tracking-wider text-white">NEON SNAKE</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              sfx.enabled = !soundOn;
              setSoundOn(!soundOn);
            }}
            title={soundOn ? "Mute SFX" : "Unmute SFX"}
            className="p-1 text-slate-400 hover:text-white transition-colors"
          >
            {soundOn ? "🔊" : "🔇"}
          </button>

          {onClose && (
            <button
              onClick={onClose}
              className="px-2 py-0.5 rounded-lg border border-[#1a2235] bg-[#111726] text-slate-400 hover:text-white hover:border-[#1558C9] text-[11px] transition-all"
            >
              ✕ Exit
            </button>
          )}
        </div>
      </div>

      {/* Scoreboard Bar */}
      <div className="w-full flex items-center justify-between px-3 py-1.5 mb-3 rounded-xl bg-[#030407] border border-[#1a2235] text-xs font-mono">
        <div className="flex items-center gap-1.5">
          <span className="text-slate-500">SCORE:</span>
          <span className="font-bold text-[#D4FF24] text-sm">{score}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-slate-500">BEST:</span>
          <span className="font-bold text-white text-sm">{highScore}</span>
        </div>
      </div>

      {/* Game Canvas Container */}
      <div className="relative aspect-square w-full max-w-[340px] rounded-xl overflow-hidden border border-[#1a2235] bg-[#07090e] shadow-[0_0_20px_rgba(21,88,201,0.2)]">
        <canvas
          ref={canvasRef}
          width={340}
          height={340}
          className="w-full h-full block"
        />

        {/* Floating Eaten Tech Badge */}
        <AnimatePresence>
          {lastEaten && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.9 }}
              className="absolute top-3 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-[#1558C9]/80 border border-[#D4FF24] text-[11px] font-mono font-bold text-white shadow-lg pointer-events-none"
            >
              {lastEaten}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Start / Idle Screen */}
        {gameState === "idle" && (
          <div className="absolute inset-0 bg-black/80 backdrop-blur-xs flex flex-col items-center justify-center p-4 text-center space-y-4">
            <span className="text-4xl animate-bounce">🐍</span>
            <div>
              <h4 className="text-base font-bold text-white tracking-wide">
                CYBER SNAKE v2.0
              </h4>
              <p className="text-[11px] text-slate-400 mt-1">
                Eat tech stacks (React, Next.js, Turbo) to grow!
              </p>
            </div>
            <button
              onClick={resetGame}
              className="px-6 py-2.5 rounded-xl font-mono text-xs font-bold text-black bg-[#D4FF24] hover:bg-[#c4f018] shadow-[0_0_15px_rgba(212,255,36,0.5)] active:scale-95 transition-all cursor-pointer"
            >
              PLAY GAME [SPACE]
            </button>
            <p className="text-[10px] text-slate-500 font-mono">
              Desktop: WASD / Arrows • Mobile: Touch D-Pad
            </p>
          </div>
        )}

        {/* Paused Screen */}
        {gameState === "paused" && (
          <div className="absolute inset-0 bg-black/75 backdrop-blur-xs flex flex-col items-center justify-center space-y-3">
            <h4 className="text-lg font-bold text-[#D4FF24] tracking-widest font-mono">
              GAME PAUSED
            </h4>
            <button
              onClick={() => setGameState("playing")}
              className="px-5 py-2 rounded-xl text-xs font-mono font-semibold bg-[#1558C9] text-white hover:bg-blue-600 transition-all"
            >
              Resume
            </button>
          </div>
        )}

        {/* Game Over Screen */}
        {gameState === "gameover" && (
          <div className="absolute inset-0 bg-black/85 backdrop-blur-xs flex flex-col items-center justify-center p-4 text-center space-y-3 animate-in fade-in">
            <span className="text-3xl">💥</span>
            <div>
              <h4 className="text-base font-bold text-red-400 tracking-wider font-mono">
                SYSTEM CRASHED
              </h4>
              <p className="text-xs text-slate-300 mt-1 font-mono">
                Final Score: <span className="text-[#D4FF24] font-bold">{score}</span>
              </p>
            </div>
            <button
              onClick={resetGame}
              className="px-6 py-2.5 rounded-xl font-mono text-xs font-bold text-black bg-[#D4FF24] hover:bg-[#c4f018] shadow-[0_0_20px_rgba(212,255,36,0.4)] active:scale-95 transition-all cursor-pointer"
            >
              PLAY AGAIN [SPACE]
            </button>
          </div>
        )}
      </div>

      {/* ── Mobile Virtual D-Pad ────────────────────────────────────────── */}
      <div className="w-full mt-3 pt-3 border-t border-[#1a2235]/60 flex flex-col items-center gap-1.5 md:hidden">
        <button
          onClick={() => setDirection("UP")}
          aria-label="Move Up"
          className="w-12 h-10 rounded-xl border border-[#1a2235] bg-[#111726] active:bg-[#1558C9] active:text-white text-slate-300 flex items-center justify-center text-sm font-bold shadow-md transition-all active:scale-90"
        >
          ▲
        </button>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setDirection("LEFT")}
            aria-label="Move Left"
            className="w-12 h-10 rounded-xl border border-[#1a2235] bg-[#111726] active:bg-[#1558C9] active:text-white text-slate-300 flex items-center justify-center text-sm font-bold shadow-md transition-all active:scale-90"
          >
            ◀
          </button>
          <button
            onClick={() => {
              if (gameState === "idle" || gameState === "gameover") resetGame();
              else setGameState(gameState === "playing" ? "paused" : "playing");
            }}
            className="px-3 h-10 rounded-xl border border-[#D4FF24]/40 bg-[#D4FF24]/10 text-[#D4FF24] text-[10px] font-mono font-bold flex items-center justify-center active:scale-95"
          >
            {gameState === "playing" ? "PAUSE" : "START"}
          </button>
          <button
            onClick={() => setDirection("RIGHT")}
            aria-label="Move Right"
            className="w-12 h-10 rounded-xl border border-[#1a2235] bg-[#111726] active:bg-[#1558C9] active:text-white text-slate-300 flex items-center justify-center text-sm font-bold shadow-md transition-all active:scale-90"
          >
            ▶
          </button>
        </div>
        <button
          onClick={() => setDirection("DOWN")}
          aria-label="Move Down"
          className="w-12 h-10 rounded-xl border border-[#1a2235] bg-[#111726] active:bg-[#1558C9] active:text-white text-slate-300 flex items-center justify-center text-sm font-bold shadow-md transition-all active:scale-90"
        >
          ▼
        </button>
      </div>

      {/* Desktop Keybind Hint */}
      <div className="hidden md:flex items-center justify-between w-full mt-3 pt-2 text-[10px] font-mono text-slate-500">
        <span>Controls: Arrow Keys or W A S D</span>
        <span>Space: Pause/Play</span>
      </div>
    </div>
  );
}
