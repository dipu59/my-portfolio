"use client";

import React, { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LuCopy, LuCheck, LuMail, LuSend, LuClock, LuMapPin, LuSparkles,
} from "react-icons/lu";

type FormStatus = "idle" | "submitting" | "success" | "error";
interface FormDataState { name: string; email: string; message: string; }

export function ContactSection() {
  const [formData, setFormData] = useState<FormDataState>({ name: "", email: "", message: "" });
  const [status, setStatus]       = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copied, setCopied]       = useState(false);
  const emailAddress = "12biswasdipu@gmail.com";

  const handleCopyEmail = async () => {
    try { await navigator.clipboard.writeText(emailAddress); } catch { /* silent */ }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (status === "error") { setErrorMessage(null); setStatus("idle"); }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "submitting") return;

    const trimmedName    = formData.name.trim();
    const trimmedEmail   = formData.email.trim();
    const trimmedMessage = formData.message.trim();

    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      setStatus("error"); setErrorMessage("Please complete all required fields."); return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setStatus("error"); setErrorMessage("Please provide a valid email address."); return;
    }

    setStatus("submitting"); setErrorMessage(null);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: trimmedName, email: trimmedEmail, message: trimmedMessage }),
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.error || "Unable to send message. Please try again.");
      }
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Failed to deliver message.");
    }
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative w-full text-white py-20 md:py-28"
      style={{ backgroundColor: "#030407", borderTop: "1px solid #1a2235" }}
    >
      <div className="w-full px-4 sm:px-6 lg:px-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">

          {/* LEFT — Narrative */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "#1558C9" }} />
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: "#64748b" }}>
                05 // Initiate Dialogue
              </p>
            </div>

            <h2
              id="contact-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight"
            >
              Let&apos;s build something{" "}
              <span style={{ color: "#D4FF24" }}>exceptional.</span>
            </h2>

            <p className="text-base sm:text-lg leading-relaxed" style={{ color: "#cbd5e1" }}>
              Have a high-impact product, an architectural challenge, or an engineering opening?
              Reach out directly—I typically review and reply within 24 hours.
            </p>

            {/* Click-to-Copy Email Pill */}
            <div className="pt-2">
              <div
                className="relative inline-flex items-center gap-3 rounded-xl p-2 sm:px-4 sm:py-3 max-w-full"
                style={{ border: "1px solid #1a2235", backgroundColor: "#0a0d14" }}
              >
                <LuMail className="h-4 w-4 shrink-0" style={{ color: "#1558C9" }} />
                <a
                  href={`mailto:${emailAddress}`}
                  className="font-mono text-xs sm:text-sm font-medium text-white truncate transition-colors"
                  onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#D4FF24"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#ffffff"; }}
                >
                  {emailAddress}
                </a>

                <div className="relative shrink-0">
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    aria-label="Copy email address to clipboard"
                    className="transform-gpu will-change-transform inline-flex h-8 w-8 items-center justify-center rounded-lg transition-all active:scale-90"
                    style={{ border: "1px solid #1a2235", backgroundColor: "#0f1420", color: "#94a3b8" }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.borderColor = "#1558C9";
                      (e.currentTarget as HTMLButtonElement).style.color = "#ffffff";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.borderColor = "#1a2235";
                      (e.currentTarget as HTMLButtonElement).style.color = "#94a3b8";
                    }}
                  >
                    {copied
                      ? <LuCheck className="h-4 w-4" style={{ color: "#D4FF24" }} />
                      : <LuCopy className="h-4 w-4" />
                    }
                  </button>

                  <AnimatePresence>
                    {copied && (
                      <motion.div
                        initial={{ opacity: 0, y: 6, scale: 0.92 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.92 }}
                        transition={{ duration: 0.18, ease: "easeOut" }}
                        className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 z-30 whitespace-nowrap rounded-md px-2.5 py-1 font-mono text-[10px] font-semibold text-white shadow-xl"
                        style={{ border: "1px solid #1a2235", backgroundColor: "#0a0d14" }}
                      >
                        Copied!
                        <span
                          className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-1.5 w-1.5 rotate-45"
                          style={{ border: "1px solid #1a2235", backgroundColor: "#0a0d14", borderTop: "none", borderLeft: "none" }}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Meta stack */}
            <div
              className="pt-4 space-y-3 font-mono text-xs sm:text-sm"
              style={{ borderTop: "1px solid #1a2235", color: "#64748b" }}
            >
              <div className="flex items-center gap-2.5">
                <LuMapPin className="h-3.5 w-3.5 shrink-0" style={{ color: "#94a3b8" }} />
                <span style={{ color: "#94a3b8" }}>Balagarh, West Bengal, India</span>
                <span style={{ color: "#64748b" }}>(UTC +05:30)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <LuClock className="h-3.5 w-3.5 shrink-0" style={{ color: "#94a3b8" }} />
                <span>Response Time: &lt; 24 Hours</span>
              </div>
              <div className="flex items-center gap-2.5">
                <LuSparkles className="h-3.5 w-3.5 shrink-0" style={{ color: "#D4FF24" }} />
                <span style={{ color: "#D4FF24", fontWeight: 500 }}>Open for full-time roles &amp; contracts</span>
              </div>
            </div>
          </div>

          {/* RIGHT — Form */}
          <div className="lg:col-span-7">
            <div
              className="rounded-2xl p-6 sm:p-8"
              style={{ border: "1px solid #1a2235", backgroundColor: "#0a0d14" }}
            >
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success-card"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="py-12 flex flex-col items-center justify-center text-center space-y-4"
                  >
                    <div
                      className="inline-flex h-12 w-12 items-center justify-center rounded-full"
                      style={{
                        backgroundColor: "rgba(212,255,36,0.10)",
                        border: "1px solid rgba(212,255,36,0.30)",
                        color: "#D4FF24",
                      }}
                    >
                      <LuCheck className="h-6 w-6" />
                    </div>
                    <div className="space-y-1.5">
                      <h3 className="text-xl font-bold text-white tracking-tight">Message sent successfully!</h3>
                      <p className="max-w-sm text-sm leading-relaxed" style={{ color: "#94a3b8" }}>
                        Thank you for reaching out. Your message has been routed to my
                        primary inbox, and I will be in touch shortly.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setStatus("idle")}
                      className="mt-4 transform-gpu will-change-transform inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-mono font-medium transition-colors"
                      style={{ border: "1px solid #1a2235", backgroundColor: "#0f1420", color: "#94a3b8" }}
                    >
                      <span>Send another message</span>
                    </button>
                  </motion.div>
                ) : (
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
                      <AnimatedField id="name"  label="Name"          type="text"  placeholder="Your Name"           required value={formData.name}  onChange={handleChange} />
                      <AnimatedField id="email" label="Email Address" type="email" placeholder="name@example.com"    required value={formData.email} onChange={handleChange} />
                    </div>
                    <AnimatedTextarea
                      id="message"
                      label="Message"
                      placeholder="Share project parameters, goals, timeline, or relevant links..."
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                    />

                    {status === "error" && errorMessage && (
                      <motion.div
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="rounded-lg px-3.5 py-2.5 text-xs"
                        style={{
                          border: "1px solid rgba(239,68,68,0.30)",
                          backgroundColor: "rgba(239,68,68,0.10)",
                          color: "#fca5a5",
                        }}
                      >
                        {errorMessage}
                      </motion.div>
                    )}

                    <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <button
                        type="submit"
                        disabled={status === "submitting"}
                        className="transform-gpu will-change-transform inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-xs sm:text-sm font-semibold transition-all duration-200 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-75 w-full sm:w-auto"
                        style={{
                          backgroundColor: "#1558C9",
                          color: "#ffffff",
                          boxShadow: "0 0 24px rgba(21,88,201,0.40)",
                        }}
                      >
                        {status === "submitting" ? (
                          <span className="inline-flex items-center gap-2">
                            <span
                              className="h-3.5 w-3.5 rounded-full border-2 animate-spin"
                              style={{ borderColor: "rgba(255,255,255,0.3)", borderTopColor: "#ffffff" }}
                            />
                            <span>Sending...</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-2">
                            <span>Send Message</span>
                            <LuSend className="h-3.5 w-3.5" />
                          </span>
                        )}
                      </button>

                      <p className="font-mono text-[11px] text-left sm:text-right" style={{ color: "#64748b" }}>
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
   ANIMATED FORM FIELDS
   ═══════════════════════════════════════════════════════════════════════════ */

interface AnimatedFieldProps {
  id: string; label: string; type?: string; placeholder?: string;
  required?: boolean; value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function AnimatedField({ id, label, type = "text", placeholder, required = false, value, onChange }: AnimatedFieldProps) {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <div className="space-y-1.5 w-full">
      <label htmlFor={id} className="block font-mono text-[11px] font-medium uppercase tracking-wider" style={{ color: "#64748b" }}>
        {label} {required && <span style={{ color: "#1558C9" }}>*</span>}
      </label>
      <div className="relative rounded-xl p-px overflow-hidden" style={{ backgroundColor: "#1a2235" }}>
        <motion.div
          aria-hidden="true"
          animate={{ opacity: isFocused ? 1 : 0 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="pointer-events-none absolute -inset-px rounded-xl"
          style={{ background: "linear-gradient(135deg, #1558C9, #D4FF24)" }}
        />
        <input
          id={id} name={id} type={type} required={required} value={value} onChange={onChange}
          onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="relative z-10 w-full rounded-[11px] px-3.5 py-2.5 text-sm text-white focus:outline-none"
          style={{ backgroundColor: "#030407", caretColor: "#1558C9" }}
        />
      </div>
    </div>
  );
}

interface AnimatedTextareaProps {
  id: string; label: string; placeholder?: string; required?: boolean;
  rows?: number; value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

function AnimatedTextarea({ id, label, placeholder, required = false, rows = 5, value, onChange }: AnimatedTextareaProps) {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <div className="space-y-1.5 w-full">
      <label htmlFor={id} className="block font-mono text-[11px] font-medium uppercase tracking-wider" style={{ color: "#64748b" }}>
        {label} {required && <span style={{ color: "#1558C9" }}>*</span>}
      </label>
      <div className="relative rounded-xl p-px overflow-hidden" style={{ backgroundColor: "#1a2235" }}>
        <motion.div
          aria-hidden="true"
          animate={{ opacity: isFocused ? 1 : 0 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="pointer-events-none absolute -inset-px rounded-xl"
          style={{ background: "linear-gradient(135deg, #1558C9, #D4FF24)" }}
        />
        <textarea
          id={id} name={id} rows={rows} required={required} value={value} onChange={onChange}
          onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="relative z-10 w-full rounded-[11px] px-3.5 py-2.5 text-sm text-white focus:outline-none resize-none"
          style={{ backgroundColor: "#030407", caretColor: "#1558C9" }}
        />
      </div>
    </div>
  );
}
