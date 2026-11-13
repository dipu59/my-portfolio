"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Bug {
  id: number;
  x: number;
  y: number;
  vy: number;
  size: number;
  label: string;
  icon: string;
  color: string;
  hp: number;
  maxHp: number;
  points: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  life: number;
}

interface FloatingScore {
  id: number;
  x: number;
  y: number;
  text: string;
  color: string;
  life: number;
}

interface Laser {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  color: string;
  life: number;
}

const BUG_TYPES = [
  { label: "404 Error", icon: "🐛", color: "#38bdf8", points: 10, speed: 1.1, hp: 1 },
  { label: "Memory Leak", icon: "💧", color: "#fbbf24", points: 15, speed: 1.4, hp: 1 },
  { label: "Null Pointer", icon: "💀", color: "#c084fc", points: 20, speed: 1.3, hp: 1 },
  { label: "Syntax Error", icon: "⚠️", color: "#f43f5e", points: 25, speed: 1.8, hp: 1 },
  { label: "Infinite Loop", icon: "🔄", color: "#D4FF24", points: 40, speed: 0.85, hp: 2 },
];

class BugHunterSFX {
  private ctx: AudioContext | null = null;
  public enabled: boolean = true;

  private init() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  playLaser() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(800, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(150, this.ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.08);
    } catch {}
  }

  playExplosion() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(220, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(40, this.ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.15);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.15);
    } catch {}
  }

  playBreach() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "square";
      osc.frequency.setValueAtTime(180, this.ctx.currentTime);
      osc.frequency.setValueAtTime(120, this.ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.25, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.25);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.25);
    } catch {}
  }
}

const sfx = new BugHunterSFX();

interface CyberBugHunterGameProps {
  onClose?: () => void;
  onSwitchToSnake: () => void;
}

export function CyberBugHunterGame({
  onClose,
  onSwitchToSnake,
}: CyberBugHunterGameProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [gameState, setGameState] = useState<"idle" | "playing" | "paused" | "gameover">("idle");
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [shields, setShields] = useState(3);
  const [streak, setStreak] = useState(0);
  const [soundOn, setSoundOn] = useState(true);

  // Game loop engine refs
  const bugsRef = useRef<Bug[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const lasersRef = useRef<Laser[]>([]);
  const floatingScoresRef = useRef<FloatingScore[]>([]);
  const nextBugIdRef = useRef(1);
  const lastSpawnTimeRef = useRef(0);
  const spawnIntervalRef = useRef(1300); // ms
  const animFrameRef = useRef<number | null>(null);

  // Load High Score
  useEffect(() => {
    try {
      const saved = localStorage.getItem("cyber_bughunter_highscore");
      if (saved) setHighScore(parseInt(saved, 10));
    } catch {}
  }, []);

  // Lock body scroll while game is playing
  useEffect(() => {
    if (gameState === "playing") {
      const prevOverflow = document.body.style.overflow;
      const prevTouchAction = document.body.style.touchAction;

      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";

      const handleGlobalTouchMove = (e: TouchEvent) => {
        if (e.cancelable) {
          e.preventDefault();
        }
      };

      window.addEventListener("touchmove", handleGlobalTouchMove, {
        passive: false,
      });

      return () => {
        document.body.style.overflow = prevOverflow;
        document.body.style.touchAction = prevTouchAction;
        window.removeEventListener("touchmove", handleGlobalTouchMove);
      };
    }
  }, [gameState]);

  const resetGame = useCallback(() => {
    bugsRef.current = [];
    particlesRef.current = [];
    lasersRef.current = [];
    floatingScoresRef.current = [];
    nextBugIdRef.current = 1;
    lastSpawnTimeRef.current = 0;
    spawnIntervalRef.current = 1300;
    setScore(0);
    setShields(3);
    setStreak(0);
    setGameState("playing");
  }, []);

  // Tap / Click shoot handler
  const handleShot = (clientX: number, clientY: number) => {
    if (gameState !== "playing") return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const clickX = (clientX - rect.left) * scaleX;
    const clickY = (clientY - rect.top) * scaleY;

    sfx.playLaser();

    // Laser from bottom center
    lasersRef.current.push({
      startX: canvas.width / 2,
      startY: canvas.height - 10,
      endX: clickX,
      endY: clickY,
      color: "#D4FF24",
      life: 1.0,
    });

    // Check bug hit (hit detection with generous mobile hit area)
    let hitAny = false;

    bugsRef.current.forEach((bug) => {
      const dist = Math.hypot(bug.x - clickX, bug.y - clickY);
      if (dist <= bug.size + 14) {
        hitAny = true;
        bug.hp -= 1;

        if (bug.hp <= 0) {
          sfx.playExplosion();

          // Particle burst
          for (let i = 0; i < 14; i++) {
            const angle = Math.random() * Math.PI * 2;
            const spd = Math.random() * 4 + 1.5;
            particlesRef.current.push({
              x: bug.x,
              y: bug.y,
              vx: Math.cos(angle) * spd,
              vy: Math.sin(angle) * spd,
              color: bug.color,
              life: 1.0,
            });
          }

          // Streak multiplier
          setStreak((prevStreak) => {
            const nextStreak = prevStreak + 1;
            const multiplier = nextStreak >= 10 ? 3 : nextStreak >= 5 ? 2 : 1;
            const pts = bug.points * multiplier;

            setScore((prevScore) => {
              const nextScore = prevScore + pts;
              setHighScore((currHigh) => {
                if (nextScore > currHigh) {
                  try {
                    localStorage.setItem("cyber_bughunter_highscore", String(nextScore));
                  } catch {}
                  return nextScore;
                }
                return currHigh;
              });
              return nextScore;
            });

            // Floating score popup
            floatingScoresRef.current.push({
              id: Date.now() + Math.random(),
              x: bug.x,
              y: bug.y,
              text: `+${pts}${multiplier > 1 ? ` (${multiplier}x)` : ""}`,
              color: bug.color,
              life: 1.0,
            });

            return nextStreak;
          });
        }
      }
    });

    // Remove dead bugs
    bugsRef.current = bugsRef.current.filter((b) => b.hp > 0);

    // If miss, reset streak
    if (!hitAny) {
      setStreak(0);
    }
  };

  // ── 60 FPS Render & Physics Loop ──────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let isMounted = true;

    const gameLoop = (timestamp: number) => {
      if (!isMounted) return;

      const width = canvas.width;
      const height = canvas.height;

      // ── Step Physics ──
      if (gameState === "playing") {
        // Spawn bugs
        if (!lastSpawnTimeRef.current) lastSpawnTimeRef.current = timestamp;
        if (timestamp - lastSpawnTimeRef.current > spawnIntervalRef.current) {
          lastSpawnTimeRef.current = timestamp;

          const bugTemplate =
            BUG_TYPES[Math.floor(Math.random() * BUG_TYPES.length)];
          const size = 18;
          const x = Math.random() * (width - size * 2) + size;

          bugsRef.current.push({
            id: nextBugIdRef.current++,
            x,
            y: -15,
            vy: bugTemplate.speed + Math.random() * 0.4,
            size,
            label: bugTemplate.label,
            icon: bugTemplate.icon,
            color: bugTemplate.color,
            hp: bugTemplate.hp,
            maxHp: bugTemplate.hp,
            points: bugTemplate.points,
          });

          // Accelerate spawn rate gradually
          spawnIntervalRef.current = Math.max(550, spawnIntervalRef.current - 12);
        }

        // Move bugs & check firewall breaches
        for (let i = bugsRef.current.length - 1; i >= 0; i--) {
          const bug = bugsRef.current[i];
          bug.y += bug.vy;

          // Breach firewall at bottom
          if (bug.y >= height - 25) {
            sfx.playBreach();
            bugsRef.current.splice(i, 1);
            setStreak(0);

            // Particle sparks at bottom
            for (let p = 0; p < 10; p++) {
              particlesRef.current.push({
                x: bug.x,
                y: height - 25,
                vx: (Math.random() - 0.5) * 4,
                vy: -Math.random() * 3,
                color: "#f43f5e",
                life: 1.0,
              });
            }

            setShields((prevShields) => {
              const nextShields = prevShields - 1;
              if (nextShields <= 0) {
                setGameState("gameover");
              }
              return nextShields;
            });
          }
        }
      }

      // ── Render Graphics ──
      ctx.fillStyle = "#07090e";
      ctx.fillRect(0, 0, width, height);

      // Cyber Matrix Grid
      ctx.strokeStyle = "rgba(21, 88, 201, 0.15)";
      ctx.lineWidth = 1;
      const gridSize = 20;
      for (let x = 0; x <= width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y <= height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Bottom Firewall Defense Line
      ctx.save();
      ctx.shadowColor = "#1558C9";
      ctx.shadowBlur = 12;
      ctx.strokeStyle = "#1558C9";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, height - 25);
      ctx.lineTo(width, height - 25);
      ctx.stroke();

      ctx.fillStyle = "rgba(21, 88, 201, 0.15)";
      ctx.fillRect(0, height - 25, width, 25);
      ctx.restore();

      ctx.font = "bold 9px monospace";
      ctx.fillStyle = "#60a5fa";
      ctx.textAlign = "center";
      ctx.fillText("🛡️ FIREWALL DEFENSE PERIMETER", width / 2, height - 10);

      // Draw Lasers
      lasersRef.current.forEach((laser) => {
        laser.life -= 0.15;
        if (laser.life > 0) {
          ctx.save();
          ctx.globalAlpha = laser.life;
          ctx.strokeStyle = laser.color;
          ctx.shadowColor = laser.color;
          ctx.shadowBlur = 10;
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          ctx.moveTo(laser.startX, laser.startY);
          ctx.lineTo(laser.endX, laser.endY);
          ctx.stroke();
          ctx.restore();
        }
      });
      lasersRef.current = lasersRef.current.filter((l) => l.life > 0);

      // Draw Bugs
      bugsRef.current.forEach((bug) => {
        ctx.save();
        ctx.shadowColor = bug.color;
        ctx.shadowBlur = 10;
        ctx.fillStyle = bug.color;

        // Bug Body
        ctx.beginPath();
        ctx.arc(bug.x, bug.y, bug.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Icon inside bug
        ctx.font = `${Math.floor(bug.size * 1.1)}px sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(bug.icon, bug.x, bug.y);

        // Label above bug
        ctx.font = "bold 9px monospace";
        ctx.textAlign = "center";
        ctx.fillStyle = "#e2e8f0";
        ctx.fillText(bug.label, bug.x, bug.y - bug.size - 4);

        // HP bar for multi-hit bugs
        if (bug.maxHp > 1) {
          ctx.fillStyle = "rgba(0,0,0,0.6)";
          ctx.fillRect(bug.x - 12, bug.y + bug.size + 2, 24, 3);
          ctx.fillStyle = "#D4FF24";
          ctx.fillRect(
            bug.x - 12,
            bug.y + bug.size + 2,
            (24 * bug.hp) / bug.maxHp,
            3
          );
        }
      });

      // Draw Particles
      particlesRef.current.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.04;

        if (p.life > 0) {
          ctx.save();
          ctx.globalAlpha = p.life;
          ctx.fillStyle = p.color;
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 8;
          ctx.beginPath();
          ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      });
      particlesRef.current = particlesRef.current.filter((p) => p.life > 0);

      // Draw Floating Scores
      floatingScoresRef.current.forEach((fs) => {
        fs.y -= 1.2;
        fs.life -= 0.035;

        if (fs.life > 0) {
          ctx.save();
          ctx.globalAlpha = fs.life;
          ctx.font = "bold 13px monospace";
          ctx.fillStyle = fs.color;
          ctx.shadowColor = fs.color;
          ctx.shadowBlur = 6;
          ctx.textAlign = "center";
          ctx.fillText(fs.text, fs.x, fs.y);
          ctx.restore();
        }
      });
      floatingScoresRef.current = floatingScoresRef.current.filter((fs) => fs.life > 0);

      animFrameRef.current = requestAnimationFrame(gameLoop);
    };

    animFrameRef.current = requestAnimationFrame(gameLoop);

    return () => {
      isMounted = false;
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [gameState]);

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-sm sm:max-w-md mx-auto rounded-2xl sm:rounded-3xl p-4 sm:p-5 border border-[#1a2235] bg-[#0a0d14]/95 backdrop-blur-xl shadow-2xl flex flex-col items-center select-none touch-none"
      style={{ touchAction: "none" }}
    >
      {/* Top Header & Game Switcher */}
      <div className="w-full flex items-center justify-between pb-3 mb-2 border-b border-[#1a2235] text-xs font-mono">
        {/* Game Switcher Tabs */}
        <div className="flex items-center gap-1.5 p-0.5 rounded-lg bg-[#030407] border border-[#1a2235]">
          <button
            onClick={onSwitchToSnake}
            className="px-2.5 py-1 rounded-md text-[11px] font-mono text-slate-400 hover:text-white transition-all cursor-pointer"
          >
            🐍 Snake
          </button>
          <button
            className="px-2.5 py-1 rounded-md text-[11px] font-mono font-bold bg-[#1558C9] text-white shadow-sm"
          >
            👾 Bug Hunter
          </button>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => {
              sfx.enabled = !soundOn;
              setSoundOn(!soundOn);
            }}
            title={soundOn ? "Mute SFX" : "Unmute SFX"}
            className="p-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            {soundOn ? "🔊" : "🔇"}
          </button>

          {onClose && (
            <button
              onClick={onClose}
              className="px-2 py-0.5 rounded-lg border border-[#1a2235] bg-[#111726] text-slate-400 hover:text-white hover:border-[#1558C9] text-[11px] transition-all cursor-pointer"
            >
              ✕ Exit
            </button>
          )}
        </div>
      </div>

      {/* Scoreboard Bar with Shields and Streak */}
      <div className="w-full flex items-center justify-between px-3 py-1.5 mb-3 rounded-xl bg-[#030407] border border-[#1a2235] text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="text-slate-500">SHIELDS:</span>
          <div className="flex items-center gap-1">
            {[1, 2, 3].map((s) => (
              <span
                key={s}
                className={`text-sm ${
                  s <= shields ? "text-rose-500 animate-pulse" : "text-slate-700 opacity-40"
                }`}
              >
                ❤️
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          {streak >= 3 && (
            <span className="text-[#D4FF24] font-bold text-[11px] animate-bounce">
              🔥 {streak}x
            </span>
          )}
          <div className="flex items-center gap-1">
            <span className="text-slate-500">SCORE:</span>
            <span className="font-bold text-[#D4FF24] text-sm">{score}</span>
          </div>
        </div>
      </div>

      {/* Game Canvas Container */}
      <div
        className="relative aspect-square w-full max-w-[340px] rounded-xl overflow-hidden border border-[#1a2235] bg-[#07090e] shadow-[0_0_20px_rgba(21,88,201,0.2)] touch-none cursor-crosshair"
        style={{ touchAction: "none" }}
        onPointerDown={(e) => handleShot(e.clientX, e.clientY)}
      >
        <canvas
          ref={canvasRef}
          width={340}
          height={340}
          className="w-full h-full block touch-none"
          style={{ touchAction: "none" }}
        />

        {/* Start / Idle Screen */}
        {gameState === "idle" && (
          <div className="absolute inset-0 bg-black/80 backdrop-blur-xs flex flex-col items-center justify-center p-4 text-center space-y-4">
            <span className="text-4xl animate-bounce">👾</span>
            <div>
              <h4 className="text-base font-bold text-white tracking-wide">
                CYBER BUG HUNTER
              </h4>
              <p className="text-[11px] text-slate-400 mt-1 max-w-xs">
                Tap/Click falling bugs (404, Memory Leaks, Infinite Loops) before they breach the firewall!
              </p>
            </div>
            <button
              onClick={resetGame}
              className="px-6 py-2.5 rounded-xl font-mono text-xs font-bold text-black bg-[#D4FF24] hover:bg-[#c4f018] shadow-[0_0_15px_rgba(212,255,36,0.5)] active:scale-95 transition-all cursor-pointer"
            >
              START HUNTING [TAP TO PLAY]
            </button>
            <p className="text-[10px] text-slate-500 font-mono">
              Desktop & Mobile: Tap on bugs to destroy!
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
              className="px-5 py-2 rounded-xl text-xs font-mono font-semibold bg-[#1558C9] text-white hover:bg-blue-600 transition-all cursor-pointer"
            >
              Resume
            </button>
          </div>
        )}

        {/* Game Over Screen */}
        {gameState === "gameover" && (
          <div className="absolute inset-0 bg-black/85 backdrop-blur-xs flex flex-col items-center justify-center p-4 text-center space-y-3 animate-in fade-in">
            <span className="text-3xl">🛡️💥</span>
            <div>
              <h4 className="text-base font-bold text-red-400 tracking-wider font-mono">
                FIREWALL BREACHED!
              </h4>
              <p className="text-xs text-slate-300 mt-1 font-mono">
                Bugs Fixed Score: <span className="text-[#D4FF24] font-bold">{score}</span>
              </p>
              <p className="text-[11px] text-slate-500 font-mono">
                Best Score: {highScore}
              </p>
            </div>
            <button
              onClick={resetGame}
              className="px-6 py-2.5 rounded-xl font-mono text-xs font-bold text-black bg-[#D4FF24] hover:bg-[#c4f018] shadow-[0_0_20px_rgba(212,255,36,0.4)] active:scale-95 transition-all cursor-pointer"
            >
              PLAY AGAIN [SPACE/TAP]
            </button>
          </div>
        )}
      </div>

      {/* Bottom Hint */}
      <div className="flex items-center justify-between w-full mt-3 pt-2 text-[10px] font-mono text-slate-500">
        <span>Tap / Click to Zap Bugs</span>
        <span>Combo Streaks give 2x &amp; 3x</span>
      </div>
    </div>
  );
}
