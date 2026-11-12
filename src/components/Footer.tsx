"use client";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{ borderTop: "1px solid #1a2235", backgroundColor: "#030407" }}>
      <div
        className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8"
      >
        <div className="space-y-1 text-sm">
          <p style={{ color: "#94a3b8" }}>
            Designed &amp; built by{" "}
            <span className="font-medium text-white">Dipu Biswas</span>
          </p>
          <p className="text-xs" style={{ color: "#64748b" }}>
            Building fast, premium web experiences with React &amp; Next.js.
          </p>
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
