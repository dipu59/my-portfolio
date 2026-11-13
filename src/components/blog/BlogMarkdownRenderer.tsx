"use client";

import React, { useState } from "react";

interface BlogMarkdownRendererProps {
  content: string;
  fontSize?: "normal" | "large" | "xlarge";
}

// ── Syntax Tokenizer for Code Highlighting ──────────────────────────────────
const KEYWORDS = new Set([
  "import", "export", "from", "default", "const", "let", "var",
  "function", "return", "if", "else", "switch", "case", "break",
  "for", "while", "do", "try", "catch", "finally", "throw",
  "async", "await", "yield", "class", "extends", "implements",
  "interface", "type", "enum", "new", "this", "super", "typeof",
  "instanceof", "in", "of", "void", "delete", "def", "self", "as"
]);

const TYPES = new Set([
  "string", "number", "boolean", "any", "unknown", "never", "void",
  "null", "undefined", "symbol", "bigint", "Object", "Function",
  "Array", "Promise", "Record", "Partial", "Pick", "Omit",
  "React", "ReactNode", "NextConfig", "NextResponse", "Request", "Response",
  "Metadata", "BlogPost", "BlogComment"
]);

const BUILTINS = new Set([
  "useState", "useEffect", "useMemo", "useCallback", "useRef",
  "useContext", "useOptimistic", "useTransition", "useActionState",
  "console", "window", "document", "process", "JSON", "Math",
  "fetch", "setTimeout", "setInterval", "log", "error", "warn", "info"
]);

const LITERALS = new Set(["true", "false", "null", "undefined", "NaN", "Infinity"]);

function highlightLine(line: string, lang: string): React.ReactNode {
  if (!line || !line.trim()) return " ";

  const trimmed = line.trim();

  // Full-line comment
  if (
    trimmed.startsWith("//") ||
    trimmed.startsWith("/*") ||
    trimmed.startsWith("*") ||
    ((lang === "bash" || lang === "yaml" || lang === "python" || lang === "sh") && trimmed.startsWith("#"))
  ) {
    return <span className="text-slate-500 italic">{line}</span>;
  }

  // Token regex for code elements
  const tokenRegex =
    /(\/\/[^\n]*|\/\*[\s\S]*?\*\/|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`|<\/?[A-Za-z0-9_.-]+|\b\d+(?:\.\d+)?\b|\b[A-Za-z_$][A-Za-z0-9_$]*\b|[^\s\w"'`]+|\s+)/g;

  const tokens = line.match(tokenRegex) || [line];

  return tokens.map((token, idx) => {
    // Inline comment
    if (token.startsWith("//") || token.startsWith("/*")) {
      return (
        <span key={idx} className="text-slate-500 italic">
          {token}
        </span>
      );
    }

    // Strings
    if (
      (token.startsWith('"') && token.endsWith('"')) ||
      (token.startsWith("'") && token.endsWith("'")) ||
      (token.startsWith("`") && token.endsWith("`"))
    ) {
      return (
        <span key={idx} className="text-[#a3e635]">
          {token}
        </span>
      );
    }

    // JSX Tags
    if (token.startsWith("<") && token.length > 1) {
      return (
        <span key={idx} className="text-[#f87171] font-medium">
          {token}
        </span>
      );
    }

    // Numbers
    if (/^\d+(?:\.\d+)?$/.test(token)) {
      return (
        <span key={idx} className="text-[#fb923c]">
          {token}
        </span>
      );
    }

    // Literals
    if (LITERALS.has(token)) {
      return (
        <span key={idx} className="text-[#f97316] font-medium">
          {token}
        </span>
      );
    }

    // Keywords
    if (KEYWORDS.has(token)) {
      return (
        <span key={idx} className="text-[#38bdf8] font-semibold">
          {token}
        </span>
      );
    }

    // Types
    if (TYPES.has(token)) {
      return (
        <span key={idx} className="text-[#fbbf24]">
          {token}
        </span>
      );
    }

    // Builtins / Hooks
    if (BUILTINS.has(token)) {
      return (
        <span key={idx} className="text-[#818cf8] font-medium">
          {token}
        </span>
      );
    }

    // Punctuation
    if (/^[{}()[\].,;:?!=<>+\-*/%&|^~]+$/.test(token)) {
      return (
        <span key={idx} className="text-slate-400">
          {token}
        </span>
      );
    }

    // Default identifier
    return <span key={idx} className="text-slate-200">{token}</span>;
  });
}

// ── Code Block Component ────────────────────────────────────────────────────
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

  const lines = code.split("\n");

  return (
    <div className="relative my-6 rounded-2xl border border-[#1a2235] bg-[#07090e] overflow-hidden group shadow-2xl">
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#0d121c] border-b border-[#1a2235] text-xs font-mono text-slate-400">
        <div className="flex items-center gap-2">
          <span className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/70 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/70 inline-block" />
          </span>
          <span className="ml-2 uppercase text-[11px] font-semibold text-[#D4FF24]">
            {language || "code"}
          </span>
        </div>
        <button
          onClick={handleCopy}
          aria-label="Copy code to clipboard"
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-sans border border-[#1a2235] bg-[#111726] hover:bg-[#1a233a] hover:border-[#1558C9] text-slate-300 hover:text-white transition-all active:scale-95 cursor-pointer"
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
              <tr key={idx} className="hover:bg-white/[0.03]">
                <td className="pr-4 text-right select-none text-slate-600 text-[11px] w-8 align-top">
                  {idx + 1}
                </td>
                <td className="text-slate-200 whitespace-pre">
                  {highlightLine(line, language.toLowerCase())}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── Markdown Parser Engine ──────────────────────────────────────────────────
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

  const renderBlocks = () => {
    const normalized = content.replace(/\r\n/g, "\n").trim();
    // Regex matching code blocks reliably (handling both regular and escaped backticks)
    const codeBlockRegex = /(?:```|\\```)(\w*)\n([\s\S]*?)\n(?:```|\\```)/g;

    interface BlockItem {
      type: "code" | "text";
      lang?: string;
      code?: string;
      raw?: string;
    }

    const blocks: BlockItem[] = [];
    let lastIdx = 0;
    let match;

    while ((match = codeBlockRegex.exec(normalized)) !== null) {
      const before = normalized.slice(lastIdx, match.index).trim();
      if (before) {
        before.split(/\n{2,}/).forEach((chunk) => {
          if (chunk.trim()) blocks.push({ type: "text", raw: chunk.trim() });
        });
      }

      blocks.push({
        type: "code",
        lang: match[1] || "code",
        code: match[2],
      });

      lastIdx = match.index + match[0].length;
    }

    const remaining = normalized.slice(lastIdx).trim();
    if (remaining) {
      remaining.split(/\n{2,}/).forEach((chunk) => {
        if (chunk.trim()) blocks.push({ type: "text", raw: chunk.trim() });
      });
    }

    return blocks.map((block, i) => {
      // ── Render Code Block ─────────────────────────────────────────────────
      if (block.type === "code" && block.code !== undefined) {
        return (
          <CodeBlock
            key={`code-${i}`}
            code={block.code}
            language={block.lang || "code"}
          />
        );
      }

      const text = block.raw || "";

      // ── Render Callouts (> [!NOTE], etc.) ─────────────────────────────────
      if (text.startsWith("> [!")) {
        const cMatch = text.match(/^>\s*\[!(NOTE|TIP|WARNING|IMPORTANT)\]\s*\n?([\s\S]*)$/i);
        if (cMatch) {
          const type = cMatch[1].toUpperCase();
          const body = cMatch[2]
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

          return (
            <div
              key={`callout-${i}`}
              className={`my-6 p-4 rounded-xl border ${cfg.border} ${cfg.bg} text-slate-300 text-sm`}
            >
              <div className={`flex items-center gap-2 font-mono font-semibold text-xs ${cfg.text} mb-1.5 uppercase tracking-wider`}>
                <span>{cfg.icon}</span>
                <span>{cfg.title}</span>
              </div>
              <p className="leading-relaxed">{parseInline(body)}</p>
            </div>
          );
        }
      }

      // ── Render Blockquote ─────────────────────────────────────────────────
      if (text.startsWith(">")) {
        const quoteText = text
          .split("\n")
          .map((l) => l.replace(/^>\s?/, ""))
          .join(" ");

        return (
          <blockquote
            key={`quote-${i}`}
            className="my-6 pl-4 border-l-2 border-[#1558C9] italic text-slate-300 bg-[#0a0e1a]/40 py-2.5 rounded-r-lg"
          >
            {parseInline(quoteText)}
          </blockquote>
        );
      }

      // ── Render Headings ───────────────────────────────────────────────────
      if (text.startsWith("#")) {
        const hMatch = text.match(/^(#{1,4})\s+(.+)$/);
        if (hMatch) {
          const level = hMatch[1].length;
          const hText = hMatch[2];
          const id = hText
            .toLowerCase()
            .replace(/[^\w\s-]/g, "")
            .replace(/\s+/g, "-");

          if (level === 2) {
            return (
              <h2
                key={`h2-${i}`}
                id={id}
                className="group relative mt-10 mb-4 text-2xl font-bold tracking-tight text-white scroll-mt-24 border-b border-[#1a2235]/60 pb-2"
              >
                <a
                  href={`#${id}`}
                  className="inline-flex items-center gap-2 hover:text-[#D4FF24] transition-colors"
                >
                  {parseInline(hText)}
                  <span className="opacity-0 group-hover:opacity-100 text-slate-500 hover:text-[#D4FF24] text-base transition-opacity">
                    #
                  </span>
                </a>
              </h2>
            );
          } else if (level === 3) {
            return (
              <h3
                key={`h3-${i}`}
                id={id}
                className="group relative mt-8 mb-3 text-xl font-semibold tracking-tight text-slate-100 scroll-mt-24"
              >
                <a
                  href={`#${id}`}
                  className="inline-flex items-center gap-2 hover:text-[#D4FF24] transition-colors"
                >
                  {parseInline(hText)}
                  <span className="opacity-0 group-hover:opacity-100 text-slate-500 hover:text-[#D4FF24] text-sm transition-opacity">
                    #
                  </span>
                </a>
              </h3>
            );
          } else {
            return (
              <h4
                key={`h4-${i}`}
                id={id}
                className="mt-6 mb-2 text-lg font-medium text-slate-200 scroll-mt-24"
              >
                {parseInline(hText)}
              </h4>
            );
          }
        }
      }

      // ── Render Horizontal Rule ────────────────────────────────────────────
      if (text === "---" || text === "***") {
        return (
          <hr
            key={`hr-${i}`}
            className="my-10 border-0 h-[1px] bg-gradient-to-r from-transparent via-[#1a2235] to-transparent"
          />
        );
      }

      // ── Render Markdown Table ─────────────────────────────────────────────
      if (text.includes("|") && text.includes("-|-")) {
        const rows = text.trim().split("\n");
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

        return (
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
      }

      // ── Render Lists ──────────────────────────────────────────────────────
      const lines = text.split("\n");
      const isUnordered = lines.every((l) => /^\s*[-*]\s+/.test(l));
      const isOrdered = lines.every((l) => /^\s*\d+\.\s+/.test(l));

      if (isUnordered) {
        return (
          <ul key={`ul-${i}`} className="my-4 space-y-2 list-none">
            {lines.map((line, lIdx) => {
              const itemText = line.replace(/^\s*[-*]\s+/, "");
              return (
                <li key={lIdx} className="flex items-start gap-2.5 text-slate-300">
                  <span className="text-[#D4FF24] mt-1 text-xs select-none">▸</span>
                  <span className="flex-1 leading-relaxed">{parseInline(itemText)}</span>
                </li>
              );
            })}
          </ul>
        );
      }

      if (isOrdered) {
        return (
          <ol key={`ol-${i}`} className="my-4 space-y-2.5 list-none">
            {lines.map((line, lIdx) => {
              const oMatch = line.match(/^\s*(\d+)\.\s+(.*)$/);
              const num = oMatch ? oMatch[1] : `${lIdx + 1}`;
              const itemText = oMatch ? oMatch[2] : line;
              return (
                <li key={lIdx} className="flex items-start gap-3 text-slate-300">
                  <span className="flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-md bg-[#111726] border border-[#1a2235] text-[11px] font-mono text-[#D4FF24]">
                    {num}
                  </span>
                  <span className="flex-1 leading-relaxed">{parseInline(itemText)}</span>
                </li>
              );
            })}
          </ol>
        );
      }

      // ── Render Standard Paragraph ─────────────────────────────────────────
      return (
        <p key={`p-${i}`} className={`my-4 text-slate-300 ${fontSizeClass}`}>
          {parseInline(text)}
        </p>
      );
    });
  };

  return <div className="blog-prose w-full">{renderBlocks()}</div>;
}

// ── Inline Markdown Parser (Bold, Code, Links, Italics) ──────────────────────
function parseInline(text: string): React.ReactNode[] {
  const regex = /(`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)]+\))/g;
  const parts = text.split(regex);

  return parts.map((part, index) => {
    if (!part) return null;

    // Inline Code
    if (part.startsWith("`") && part.endsWith("`") && part.length >= 2) {
      return (
        <code
          key={index}
          className="mx-1 px-1.5 py-0.5 rounded-md bg-[#0e1422] border border-[#1a2235] text-[#D4FF24] text-[0.88em] font-mono font-medium"
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
          className="text-[#38bdf8] hover:text-[#D4FF24] underline underline-offset-4 decoration-blue-500/40 hover:decoration-[#D4FF24] transition-colors"
        >
          {linkText}
        </a>
      );
    }

    return part;
  });
}
