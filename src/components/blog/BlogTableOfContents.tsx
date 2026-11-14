"use client";

import { useEffect, useState } from "react";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export function extractHeadings(markdown: string): TocItem[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const headings: TocItem[] = [];
  let match;

  while ((match = headingRegex.exec(markdown)) !== null) {
    const level = match[1].length;
    const text = match[2].trim().replace(/[*_`]/g, "");
    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");

    headings.push({ id, text, level });
  }

  return headings;
}

export function BlogTableOfContents({ markdown }: { markdown: string }) {
  const [headings, setHeadings] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    setHeadings(extractHeadings(markdown));
  }, [markdown]);

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-80px 0% -60% 0%",
        threshold: 0,
      }
    );

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav
      aria-label="Table of contents"
      className="my-6 rounded-2xl border border-[#1e2638] bg-[#07090e]/80 p-5 sm:p-6 shadow-md transition-all"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="flex h-2 w-2 rounded-full bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.5)]" />
          <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-200">
            Table of Contents
          </h3>
          <span className="text-[11px] font-mono text-slate-500">
            ({headings.length} {headings.length === 1 ? "section" : "sections"})
          </span>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="text-xs font-mono text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-[#1e2638] bg-[#0e1422] hover:bg-[#131926] cursor-pointer"
        >
          <span>{isOpen ? "Hide outline" : "Show outline"}</span>
          <span className="text-[10px]">{isOpen ? "▴" : "▾"}</span>
        </button>
      </div>

      {isOpen && (
        <ul className="mt-4 pt-4 border-t border-[#1e2638] grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-sm">
          {headings.map((item, idx) => {
            const isActive = activeId === item.id;
            return (
              <li
                key={item.id}
                className={item.level === 3 ? "pl-4" : ""}
              >
                <a
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    const target = document.getElementById(item.id);
                    if (target) {
                      const top =
                        target.getBoundingClientRect().top +
                        window.scrollY -
                        90;
                      window.scrollTo({ top, behavior: "smooth" });
                      setActiveId(item.id);
                    }
                  }}
                  className={`flex items-start gap-2 py-1 transition-all duration-200 text-xs sm:text-[13px] ${
                    isActive
                      ? "text-sky-400 font-semibold translate-x-1"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <span className="text-[11px] font-mono text-slate-500 shrink-0 mt-0.5 select-none">
                    {item.level === 3 ? "↳" : `${String(idx + 1).padStart(2, "0")}.`}
                  </span>
                  <span className="line-clamp-1 leading-snug">
                    {item.text}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      )}
    </nav>
  );
}
