"use client";

import { useState } from "react";

export function BlogNewsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/blog/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        setMessage(data.message || "Thank you for subscribing!");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Failed to subscribe. Please try again.");
    }
  };

  return (
    <div className="relative my-12 rounded-2xl border border-[#1a2235] bg-gradient-to-b from-[#0e1422] to-[#07090e] p-6 sm:p-8 overflow-hidden shadow-2xl">
      {/* Decorative cyber grid backdrop */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(#1558C9 1px, transparent 1px), radial-gradient(#D4FF24 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          backgroundPosition: "0 0, 12px 12px",
        }}
      />

      <div className="relative z-10 max-w-xl mx-auto text-center space-y-3">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-mono font-medium border border-[#D4FF24]/30 bg-[#D4FF24]/10 text-[#D4FF24]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D4FF24] animate-pulse" />
          Developer Dispatch
        </span>

        <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
          Stay Ahead of the Tech Curve
        </h3>

        <p className="text-sm text-slate-400 leading-relaxed">
          Deep dives into modern web systems, React internals, distributed edge
          architectures, and pragmatic engineering. Zero spam, unsubscribe
          anytime.
        </p>

        {status === "success" ? (
          <div className="mt-4 p-3 rounded-xl border border-[#D4FF24]/40 bg-[#D4FF24]/10 text-[#D4FF24] text-xs font-mono">
            ✓ {message}
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-4 flex flex-col sm:flex-row gap-2 max-w-md mx-auto"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-1 px-4 py-2.5 rounded-xl border border-[#1a2235] bg-[#030407] text-sm text-white placeholder-slate-600 focus:outline-none focus:border-[#1558C9] focus:ring-1 focus:ring-[#1558C9] transition-all"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="px-5 py-2.5 rounded-xl text-xs font-semibold font-mono tracking-wide text-black bg-[#D4FF24] hover:bg-[#c2ed19] disabled:opacity-50 transition-all shadow-[0_0_15px_rgba(212,255,36,0.3)] hover:shadow-[0_0_20px_rgba(212,255,36,0.5)] active:scale-95"
            >
              {status === "loading" ? "Joining..." : "Subscribe"}
            </button>
          </form>
        )}

        {status === "error" && (
          <p className="text-xs text-rose-400 mt-2 font-mono">{message}</p>
        )}
      </div>
    </div>
  );
}
