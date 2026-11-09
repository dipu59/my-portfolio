"use client";

/**
 * ContactSection — Ultra-Minimal High-Contrast Dark Contact Form
 * ───────────────────────────────────────────────────────────────
 * Specifications:
 * • Dark Mode Locked: Base `#000000` with high-contrast `#FFFFFF` typography.
 * • Click-to-Copy: Interactive email pill with clipboard copy and animated "Copied!" tooltip.
 * • Animated Form Fields: Smooth Framer Motion border transition from dim neutral to neon glow on focus.
 * • Micro-interactions: "Send Message" → GPU-accelerated "Sending..." → smooth cross-fade to
 *   "Message sent successfully!" block.
 * • Fully Responsive: Fluid `w-full px-4 sm:px-6` fitting seamlessly into CyberLayout.
 */

import React, { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LuCopy,
  LuCheck,
  LuMail,
  LuSend,
  LuClock,
  LuMapPin,
  LuSparkles,
} from "react-icons/lu";

type FormStatus = "idle" | "submitting" | "success" | "error";

interface FormDataState {
  name: string;
  email: string;
  message: string;
}

export function ContactSection() {
  const [formData, setFormData] = useState<FormDataState>({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [copied, setCopied] = useState(false);
  const emailAddress = "12biswasdipu@gmail.com";

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(emailAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback if clipboard API is restricted
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (status === "error") {
      setErrorMessage(null);
      setStatus("idle");
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "submitting") return;

    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedMessage = formData.message.trim();

    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      setStatus("error");
      setErrorMessage("Please complete all required fields.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setStatus("error");
      setErrorMessage("Please provide a valid email address.");
      return;
    }

    setStatus("submitting");
    setErrorMessage(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: trimmedName,
          email: trimmedEmail,
          message: trimmedMessage,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(
          errorData?.error || "Unable to send message. Please try again."
        );
      }

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Failed to deliver message."
      );
    }
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative w-full bg-[#000000] text-white py-20 md:py-28 border-t border-neutral-900"
    >
      <div className="w-full px-4 sm:px-6 lg:px-0">
        
        {/* ── Section Grid ──────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
          
          {/* ══════════════════════════════════════════════════════════════
              LEFT COLUMN — Narrative & Interactive Metadata (5 Cols)
              ══════════════════════════════════════════════════════════════ */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Section Tag */}
            <div className="inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-neutral-400">
                05 // Initiate Dialogue
              </p>
            </div>

            {/* Bold Headline */}
            <h2
              id="contact-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight"
            >
              Let&apos;s build something exceptional.
            </h2>

            {/* Context Narrative */}
            <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
              Have a high-impact product, an architectural challenge, or an
              engineering opening? Reach out directly—I typically review and reply
              within 24 hours.
            </p>

            {/* ── Click-To-Copy Email Pill ─────────────────────────────── */}
            <div className="pt-2">
              <div className="relative inline-flex items-center gap-3 rounded-xl border border-neutral-800 bg-neutral-950 p-2 sm:px-4 sm:py-3 max-w-full">
                <LuMail className="h-4 w-4 text-cyan-400 shrink-0" />
                <a
                  href={`mailto:${emailAddress}`}
                  className="font-mono text-xs sm:text-sm font-medium text-white hover:text-cyan-400 transition-colors truncate"
                >
                  {emailAddress}
                </a>

                {/* Polished Copy Button with Floating Tooltip */}
                <div className="relative shrink-0">
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    aria-label="Copy email address to clipboard"
                    className="transform-gpu will-change-transform inline-flex h-8 w-8 items-center justify-center rounded-lg border border-neutral-800 bg-neutral-900 text-neutral-300 hover:text-white hover:border-neutral-700 hover:bg-neutral-800 transition-all active:scale-90"
                  >
                    {copied ? (
                      <LuCheck className="h-4 w-4 text-emerald-400" />
                    ) : (
                      <LuCopy className="h-4 w-4 text-neutral-400" />
                    )}
                  </button>

                  {/* Temporary Fluid Tooltip */}
                  <AnimatePresence>
                    {copied && (
                      <motion.div
                        initial={{ opacity: 0, y: 6, scale: 0.92 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.92 }}
                        transition={{ duration: 0.18, ease: "easeOut" }}
                        className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 z-30 whitespace-nowrap rounded-md border border-neutral-700 bg-neutral-900 px-2.5 py-1 font-mono text-[10px] font-semibold text-white shadow-xl"
                      >
                        Copied!
                        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-1.5 w-1.5 rotate-45 border-b border-r border-neutral-700 bg-neutral-900" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Quick Metadata Stack */}
            <div className="pt-4 border-t border-neutral-900 space-y-3 font-mono text-xs text-neutral-500">
              <div className="flex items-center gap-2.5">
                <LuMapPin className="h-3.5 w-3.5 text-neutral-400 shrink-0" />
                <span className="text-neutral-400">Balagarh, West Bengal, India</span>
                <span className="text-neutral-600">(UTC +05:30)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <LuClock className="h-3.5 w-3.5 text-neutral-400 shrink-0" />
                <span>Response Time: &lt; 24 Hours</span>
              </div>
              <div className="flex items-center gap-2.5">
                <LuSparkles className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                <span className="text-emerald-400 font-medium">
                  Open for full-time roles &amp; contracts
                </span>
              </div>
            </div>

          </div>

          {/* ══════════════════════════════════════════════════════════════
              RIGHT COLUMN — Form with Animated Border Fields (7 Cols)
              ══════════════════════════════════════════════════════════════ */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-neutral-900 bg-neutral-950 p-6 sm:p-8">
              
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  /* ── Success State ─────────────────────────────────────── */
                  <motion.div
                    key="success-card"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="py-12 flex flex-col items-center justify-center text-center space-y-4"
                  >
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
                      <LuCheck className="h-6 w-6" />
                    </div>
                    <div className="space-y-1.5">
                      <h3 className="text-xl font-bold text-white tracking-tight">
                        Message sent successfully!
                      </h3>
                      <p className="max-w-sm text-sm text-neutral-400 leading-relaxed">
                        Thank you for reaching out. Your message has been routed to my
                        primary inbox, and I will be in touch shortly.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setStatus("idle")}
                      className="mt-4 transform-gpu will-change-transform inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-900 px-4 py-2 text-xs font-mono font-medium text-neutral-300 hover:text-white hover:border-neutral-700 transition-colors"
                    >
                      <span>Send another message</span>
                    </button>
                  </motion.div>
                ) : (
                  /* ── Form State ────────────────────────────────────────── */
                  <motion.form
                    key="contact-form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-5"
                    aria-label="Direct message contact form"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {/* Name Field */}
                      <AnimatedField
                        id="name"
                        label="Name"
                        type="text"
                        placeholder="Your Name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                      />

                      {/* Email Field */}
                      <AnimatedField
                        id="email"
                        label="Email Address"
                        type="email"
                        placeholder="name@example.com"
                        required
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>

                    {/* Message Field */}
                    <AnimatedTextarea
                      id="message"
                      label="Message"
                      placeholder="Share project parameters, goals, timeline, or relevant links..."
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                    />

                    {/* Error Banner */}
                    {status === "error" && errorMessage && (
                      <motion.div
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="rounded-lg border border-rose-500/30 bg-rose-500/10 px-3.5 py-2.5 text-xs text-rose-300"
                      >
                        {errorMessage}
                      </motion.div>
                    )}

                    {/* Submit Button */}
                    <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <button
                        type="submit"
                        disabled={status === "submitting"}
                        className="transform-gpu will-change-transform inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-xs sm:text-sm font-semibold text-black transition-all duration-200 hover:bg-neutral-200 hover:shadow-[0_0_24px_rgba(255,255,255,0.2)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-75 w-full sm:w-auto"
                      >
                        {status === "submitting" ? (
                          <span className="inline-flex items-center gap-2">
                            <span className="h-3.5 w-3.5 rounded-full border-2 border-black/30 border-t-black animate-spin" />
                            <span>Sending...</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-2">
                            <span>Send Message</span>
                            <LuSend className="h-3.5 w-3.5" />
                          </span>
                        )}
                      </button>

                      <p className="font-mono text-[11px] text-neutral-500 text-left sm:text-right">
                        DIRECT INBOX ROUTING // 0 SPAM
                      </p>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   ANIMATED FORM CONTROLS (Border Glow on Focus)
   ═══════════════════════════════════════════════════════════════════════════ */

interface AnimatedFieldProps {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function AnimatedField({
  id,
  label,
  type = "text",
  placeholder,
  required = false,
  value,
  onChange,
}: AnimatedFieldProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="space-y-1.5 w-full">
      <label
        htmlFor={id}
        className="block font-mono text-[11px] font-medium uppercase tracking-wider text-neutral-400"
      >
        {label} {required && <span className="text-cyan-400">*</span>}
      </label>
      <div className="relative rounded-xl p-px overflow-hidden bg-neutral-900 transition-colors">
        {/* Animated Neon Glow Border */}
        <motion.div
          aria-hidden="true"
          animate={{ opacity: isFocused ? 1 : 0 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="pointer-events-none absolute -inset-px rounded-xl bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500"
        />
        <input
          id={id}
          name={id}
          type={type}
          required={required}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="relative z-10 w-full rounded-[11px] bg-[#000000] px-3.5 py-2.5 text-sm text-white placeholder:text-neutral-600 focus:outline-none"
        />
      </div>
    </div>
  );
}

interface AnimatedTextareaProps {
  id: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  rows?: number;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

function AnimatedTextarea({
  id,
  label,
  placeholder,
  required = false,
  rows = 5,
  value,
  onChange,
}: AnimatedTextareaProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="space-y-1.5 w-full">
      <label
        htmlFor={id}
        className="block font-mono text-[11px] font-medium uppercase tracking-wider text-neutral-400"
      >
        {label} {required && <span className="text-cyan-400">*</span>}
      </label>
      <div className="relative rounded-xl p-px overflow-hidden bg-neutral-900 transition-colors">
        {/* Animated Neon Glow Border */}
        <motion.div
          aria-hidden="true"
          animate={{ opacity: isFocused ? 1 : 0 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="pointer-events-none absolute -inset-px rounded-xl bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500"
        />
        <textarea
          id={id}
          name={id}
          rows={rows}
          required={required}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="relative z-10 w-full rounded-[11px] bg-[#000000] px-3.5 py-2.5 text-sm text-white placeholder:text-neutral-600 focus:outline-none resize-none"
        />
      </div>
    </div>
  );
}
