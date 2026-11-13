"use client";

import { LuTerminal } from "react-icons/lu";

export function Footer() {
  const year = new Date().getFullYear();

  const handleReplayIntro = () => {
    try {
      sessionStorage.removeItem("dipu_portfolio_intro_seen");
      document.documentElement.classList.remove("intro-seen");
      window.dispatchEvent(new CustomEvent("replay-intro"));
    } catch {
      window.location.reload();
    }
  };

  return (
    <footer style={{ borderTop: "1px solid #1a2235", backgroundColor: "#030407" }}>
      <div
        className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8"
      >
        <div className="space-y-1.5 text-sm">
          <p style={{ color: "#94a3b8" }}>
            Designed &amp; built by{" "}
            <span className="font-medium text-white">Dipu Biswas</span>
          </p>
          <p className="text-xs" style={{ color: "#64748b" }}>
            Building fast, premium web experiences with React &amp; Next.js.
          </p>
          <div className="pt-1.5">
            <button
              type="button"
              onClick={handleReplayIntro}
              className="inline-flex items-center gap-1.5 rounded-full border border-[#1a2235] bg-[#0a0d14] px-3 py-1 font-mono text-[11px] text-slate-400 transition-all duration-200 hover:border-[#D4FF24]/60 hover:text-white hover:shadow-[0_0_12px_rgba(212,255,36,0.25)] active:scale-95 cursor-pointer"
              title="Re-run developer terminal boot sequence"
            >
              <LuTerminal className="h-3 w-3 text-[#D4FF24]" />
              <span>Replay Boot Sequence</span>
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-3 text-xs sm:items-end" style={{ color: "#64748b" }}>
          <div className="flex flex-wrap gap-4 sm:justify-end">
            <a
              href="tel:+919239005171"
              className="transition-colors"
              style={{ color: "#64748b" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#1558C9"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#64748b"; }}
            >
              Phone:{" "}
              <span className="font-medium" style={{ color: "#94a3b8" }}>+91 92390 05171</span>
            </a>
            <a
              href="mailto:12biswasdipu@gmail.com"
              className="transition-colors"
              style={{ color: "#64748b" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#D4FF24"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#64748b"; }}
            >
              Email:{" "}
              <span className="font-medium" style={{ color: "#94a3b8" }}>12biswasdipu@gmail.com</span>
            </a>
          </div>
          <p className="text-[11px]" style={{ color: "#64748b" }}>Balagarh, Hooghly, West Bengal, India</p>
          <p className="text-[11px]" style={{ color: "#1a2235" }}>
            &copy; {year} Dipu Biswas. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
