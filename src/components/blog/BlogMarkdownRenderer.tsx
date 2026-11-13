"use client";

import React, { useState } from "react";

interface BlogMarkdownRendererProps {
  content: string;
  fontSize?: "normal" | "large" | "xlarge";
}

function CodeBlock({ code, language }: { code: string; language: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  const lines = code.trim().split("\n");

  return (
    <div className="relative my-6 rounded-xl border border-[#1a2235] bg-[#07090e] overflow-hidden group shadow-lg">
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#0d121c] border-b border-[#1a2235] text-xs font-mono text-slate-400">
        <div className="flex items-center gap-2">
          <span className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/70 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/70 inline-block" />
          </span>
          <span className="ml-2 uppercase text-[11px] font-semibold text-slate-300">
            {language || "code"}
          </span>
        </div>
        <button
          onClick={handleCopy}
          aria-label="Copy code to clipboard"
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-sans border border-[#1a2235] bg-[#111726] hover:bg-[#1a233a] hover:border-[#1558C9] text-slate-300 hover:text-white transition-all active:scale-95"
        >
          {copied ? (
            <>
              <svg className="w-3.5 h-3.5 text-[#D4FF24]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-[#D4FF24]">Copied!</span>
            </>
          ) : (
            <>
              <svg className="w-3.5 h-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      <div className="p-4 overflow-x-auto text-[13px] leading-relaxed font-mono">
        <table className="w-full border-collapse">
          <tbody>
            {lines.map((line, idx) => (
              <tr key={idx} className="hover:bg-white/[0.02]">
                <td className="pr-4 text-right select-none text-slate-600 text-[11px] w-8 align-top">
                  {idx + 1}
                </td>
                <td className="text-slate-200 whitespace-pre">
                  {line || " "}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function BlogMarkdownRenderer({
  content,
  fontSize = "normal",
}: BlogMarkdownRendererProps) {
  const fontSizeClass =
    fontSize === "large"
      ? "text-lg leading-relaxed"
      : fontSize === "xlarge"
      ? "text-xl leading-loose"
      : "text-base leading-relaxed";

  // Parse markdown into structured blocks
  const renderBlocks = () => {
    const rawBlocks = content.trim().split("\n\n");
    const elements: React.ReactNode[] = [];
    let i = 0;

    while (i < rawBlocks.length) {
      let block = rawBlocks[i].trim();
      if (!block) {
        i++;
        continue;
      }

      // ── Code Block ──────────────────────────────────────────────────────────
      if (block.startsWith("```")) {
        let codeLines = block.split("\n");
        const firstLine = codeLines[0];
        const language = firstLine.replace("```", "").trim();
        let codeContent = codeLines.slice(1).join("\n");

        if (codeContent.endsWith("```")) {
          codeContent = codeContent.slice(0, -3);
        } else {
          // If block spans multiple chunks
          while (i + 1 < rawBlocks.length && !codeContent.includes("```")) {
            i++;
            codeContent += "\n\n" + rawBlocks[i];
          }
          if (codeContent.endsWith("```")) {
            codeContent = codeContent.slice(0, -3);
          }
        }

        elements.push(
          <CodeBlock
            key={`code-${i}`}
            code={codeContent}
            language={language}
          />
        );
        i++;
        continue;
      }

      // ── Alert Callouts (> [!NOTE], etc.) ──────────────────────────────────
      if (block.startsWith("> [!")) {
        const match = block.match(/^>\s*\[!(NOTE|TIP|WARNING|IMPORTANT)\]\s*\n?([\s\S]*)$/i);
        if (match) {
          const type = match[1].toUpperCase();
          const text = match[2]
            .split("\n")
            .map((line) => line.replace(/^>\s?/, ""))
            .join("\n")
            .trim();

          const configs = {
            NOTE: {
              border: "border-blue-500/40",
              bg: "bg-blue-950/20",
              text: "text-blue-400",
              title: "Note",
              icon: "ℹ️",
            },
            TIP: {
              border: "border-[#D4FF24]/40",
              bg: "bg-[#D4FF24]/5",
              text: "text-[#D4FF24]",
              title: "Tip",
              icon: "💡",
            },
            WARNING: {
              border: "border-amber-500/40",
              bg: "bg-amber-950/20",
              text: "text-amber-400",
              title: "Warning",
              icon: "⚠️",
            },
            IMPORTANT: {
              border: "border-cyan-500/40",
              bg: "bg-cyan-950/20",
              text: "text-cyan-400",
              title: "Important",
              icon: "⚡",
            },
          };

          const cfg = configs[type as keyof typeof configs] || configs.NOTE;

          elements.push(
            <div
              key={`callout-${i}`}
              className={`my-6 p-4 rounded-xl border ${cfg.border} ${cfg.bg} text-slate-300 text-sm`}
            >
              <div className={`flex items-center gap-2 font-mono font-semibold text-xs ${cfg.text} mb-1.5 uppercase tracking-wider`}>
                <span>{cfg.icon}</span>
                <span>{cfg.title}</span>
              </div>
              <p className="leading-relaxed">{parseInline(text)}</p>
            </div>
          );
          i++;
          continue;
        }
      }

      // ── Blockquote ────────────────────────────────────────────────────────
      if (block.startsWith(">")) {
        const quoteText = block
          .split("\n")
          .map((l) => l.replace(/^>\s?/, ""))
          .join(" ");

        elements.push(
          <blockquote
            key={`quote-${i}`}
            className="my-6 pl-4 border-l-2 border-[#1558C9] italic text-slate-300 bg-[#0a0e1a]/40 py-2.5 rounded-r-lg"
          >
            {parseInline(quoteText)}
          </blockquote>
        );
        i++;
        continue;
      }

      // ── Headings ─────────────────────────────────────────────────────────
      if (block.startsWith("#")) {
        const hMatch = block.match(/^(#{1,4})\s+(.+)$/);
        if (hMatch) {
          const level = hMatch[1].length;
          const text = hMatch[2];
          const id = text
            .toLowerCase()
            .replace(/[^\w\s-]/g, "")
            .replace(/\s+/g, "-");

          if (level === 2) {
            elements.push(
              <h2
                key={`h2-${i}`}
                id={id}
                className="group relative mt-10 mb-4 text-2xl font-bold tracking-tight text-white scroll-mt-24 border-b border-[#1a2235]/60 pb-2"
              >
                <a
                  href={`#${id}`}
                  className="inline-flex items-center gap-2 hover:text-[#D4FF24] transition-colors"
                >
                  {parseInline(text)}
                  <span className="opacity-0 group-hover:opacity-100 text-slate-500 hover:text-[#D4FF24] text-base transition-opacity">
                    #
                  </span>
                </a>
              </h2>
            );
          } else if (level === 3) {
            elements.push(
              <h3
                key={`h3-${i}`}
                id={id}
                className="group relative mt-8 mb-3 text-xl font-semibold tracking-tight text-slate-100 scroll-mt-24"
              >
                <a
                  href={`#${id}`}
                  className="inline-flex items-center gap-2 hover:text-[#D4FF24] transition-colors"
                >
                  {parseInline(text)}
                  <span className="opacity-0 group-hover:opacity-100 text-slate-500 hover:text-[#D4FF24] text-sm transition-opacity">
                    #
                  </span>
                </a>
              </h3>
            );
          } else {
            elements.push(
              <h4
                key={`h4-${i}`}
                id={id}
                className="mt-6 mb-2 text-lg font-medium text-slate-200 scroll-mt-24"
              >
                {parseInline(text)}
              </h4>
            );
          }
          i++;
          continue;
        }
      }

      // ── Horizontal Rule ──────────────────────────────────────────────────
      if (block === "---" || block === "***") {
        elements.push(
          <hr
            key={`hr-${i}`}
            className="my-10 border-0 h-[1px] bg-gradient-to-r from-transparent via-[#1a2235] to-transparent"
          />
        );
        i++;
        continue;
      }

      // ── Markdown Table ───────────────────────────────────────────────────
      if (block.includes("|") && block.includes("-|-")) {
        const rows = block.trim().split("\n");
        const headerCols = rows[0]
          .split("|")
          .map((c) => c.trim())
          .filter(Boolean);
        const dataRows = rows.slice(2).map((r) =>
          r
            .split("|")
            .map((c) => c.trim())
            .filter(Boolean)
        );

        elements.push(
          <div key={`table-${i}`} className="my-6 overflow-x-auto rounded-xl border border-[#1a2235] bg-[#07090e]">
            <table className="w-full text-left text-xs md:text-sm">
              <thead className="bg-[#0f1420] text-slate-200 border-b border-[#1a2235] uppercase font-mono text-[11px]">
                <tr>
                  {headerCols.map((col, idx) => (
                    <th key={idx} className="px-4 py-3 font-semibold">
                      {parseInline(col)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1a2235] text-slate-300">
                {dataRows.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-white/[0.02]">
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} className="px-4 py-3">
                        {parseInline(cell)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
        i++;
        continue;
      }

      // ── Lists ────────────────────────────────────────────────────────────
      const lines = block.split("\n");
      const isUnordered = lines.every((l) => /^\s*[-*]\s+/.test(l));
      const isOrdered = lines.every((l) => /^\s*\d+\.\s+/.test(l));

      if (isUnordered) {
        elements.push(
          <ul key={`ul-${i}`} className="my-4 space-y-2 list-none">
            {lines.map((line, lIdx) => {
              const text = line.replace(/^\s*[-*]\s+/, "");
              return (
                <li key={lIdx} className="flex items-start gap-2.5 text-slate-300">
                  <span className="text-[#D4FF24] mt-1 text-xs select-none">▸</span>
                  <span className="flex-1 leading-relaxed">{parseInline(text)}</span>
                </li>
              );
            })}
          </ul>
        );
        i++;
        continue;
      }

      if (isOrdered) {
        elements.push(
          <ol key={`ol-${i}`} className="my-4 space-y-2.5 list-none">
            {lines.map((line, lIdx) => {
              const match = line.match(/^\s*(\d+)\.\s+(.*)$/);
              const num = match ? match[1] : `${lIdx + 1}`;
              const text = match ? match[2] : line;
              return (
                <li key={lIdx} className="flex items-start gap-3 text-slate-300">
                  <span className="flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-md bg-[#111726] border border-[#1a2235] text-[11px] font-mono text-[#D4FF24]">
                    {num}
                  </span>
                  <span className="flex-1 leading-relaxed">{parseInline(text)}</span>
                </li>
              );
            })}
          </ol>
        );
        i++;
        continue;
      }

      // ── Standard Paragraph ───────────────────────────────────────────────
      elements.push(
        <p key={`p-${i}`} className={`my-4 text-slate-300 ${fontSizeClass}`}>
          {parseInline(block)}
        </p>
      );
      i++;
    }

    return elements;
  };

  return <div className="blog-prose w-full">{renderBlocks()}</div>;
}

// ── Inline Markdown Parser (Bold, Code, Links, Italics) ──────────────────────
function parseInline(text: string): React.ReactNode[] {
  // Regex to split tokens: `code`, **bold**, *italic*, [link](url)
  const regex = /(`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)]+\))/g;
  const parts = text.split(regex);

  return parts.map((part, index) => {
    if (!part) return null;

    // Inline Code
    if (part.startsWith("`") && part.endsWith("`") && part.length >= 2) {
      return (
        <code
          key={index}
          className="mx-1 px-1.5 py-0.5 rounded-md bg-[#0e1422] border border-[#1a2235] text-[#D4FF24] text-[0.88em] font-mono"
        >
          {part.slice(1, -1)}
        </code>
      );
    }

    // Bold
    if (part.startsWith("**") && part.endsWith("**") && part.length >= 4) {
      return (
        <strong key={index} className="font-semibold text-white">
          {part.slice(2, -2)}
        </strong>
      );
    }

    // Italic
    if (part.startsWith("*") && part.endsWith("*") && part.length >= 2) {
      return (
        <em key={index} className="italic text-slate-200">
          {part.slice(1, -1)}
        </em>
      );
    }

    // Links: [Text](URL)
    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      const linkText = linkMatch[1];
      const linkHref = linkMatch[2];
      const isExternal = linkHref.startsWith("http");

      return (
        <a
          key={index}
          href={linkHref}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          className="text-[#3b82f6] hover:text-[#D4FF24] underline underline-offset-4 decoration-blue-500/40 hover:decoration-[#D4FF24] transition-colors"
        >
          {linkText}
        </a>
      );
    }

    return part;
  });
}
