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
    <nav className="rounded-2xl border border-[#1a2235] bg-[#0a0d14]/80 p-5 backdrop-blur-md">
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#1a2235]">
        <span className="flex h-2 w-2 rounded-full bg-[#D4FF24] shadow-[0_0_8px_#D4FF24]" />
        <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-300">
          Table of Contents
        </h3>
      </div>
      <ul className="space-y-2 text-sm">
        {headings.map((item) => {
          const isActive = activeId === item.id;
          return (
            <li
              key={item.id}
              style={{ paddingLeft: item.level === 3 ? "1rem" : "0rem" }}
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
                className={`block py-1 text-xs transition-all duration-200 ${
                  isActive
                    ? "text-[#D4FF24] font-medium translate-x-1"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {isActive && (
                  <span className="inline-block mr-1.5 text-[#D4FF24]">▸</span>
                )}
                {item.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
