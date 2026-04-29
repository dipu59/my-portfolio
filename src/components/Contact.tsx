"use client";

import { useState, type FormEvent } from "react";

type FormStatus = "idle" | "submitting" | "success" | "error";

export function ContactSection() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;

    setStatus("submitting");
    setErrorMessage(null);

    const form = event.currentTarget;
    const formData = new FormData(form);

    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const subject = String(formData.get("subject") || "").trim();
    const message = String(formData.get("message") || "").trim();

    if (!name || !email || !message) {
      setStatus("error");
      setErrorMessage("Please fill in your name, email, and message.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(
          data?.error || "Something went wrong. Please try again."
        );
      }

      setStatus("success");
      form.reset();
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "An unexpected error occurred. Please try again."
      );
    }
  }

  const isSubmitting = status === "submitting";

  return (
    <section id="contact" className="bg-black px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <div className="space-y-4">
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-neutral-500">
              Contact
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-neutral-50 sm:text-4xl">
              Let&apos;s work together
            </h2>
            <p className="text-sm leading-relaxed text-neutral-300/90 sm:text-base">
              Tell me what you&apos;re building and what you need. I usually
              reply within 24 hours.
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-neutral-400">
              <a
                href="mailto:12biswasdipu@gmail.com"
                className="text-neutral-200 underline underline-offset-4 decoration-neutral-700 hover:decoration-neutral-400 transition-colors"
              >
                12biswasdipu@gmail.com
              </a>
              <a
                href="tel:+919239005171"
                className="text-neutral-200 underline underline-offset-4 decoration-neutral-700 hover:decoration-neutral-400 transition-colors"
              >
                +91 92390 05171
              </a>
            </div>
          </div>

          <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-5 sm:p-6">
            <form
              className="space-y-4"
              aria-label="Contact form"
              onSubmit={handleSubmit}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  id="name"
                  label="Name"
                  type="text"
                  placeholder="Your name"
                  required
                />
                <Field
                  id="email"
                  label="Email"
                  type="email"
                  placeholder="you@example.com"
                  required
                />
              </div>

              <Field
                id="subject"
                label="Subject (optional)"
                type="text"
                placeholder="What’s this about?"
              />

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-neutral-100"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  className="mt-1 w-full rounded-xl border border-neutral-800 bg-black px-3.5 py-2.5 text-sm text-neutral-50 placeholder:text-neutral-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/90 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                  placeholder="A few lines about your goals, timeline, and any links."
                />
                <p className="mt-1 text-[11px] text-neutral-500">
                  This message is sent directly to my inbox.
                </p>
              </div>

              <div className="space-y-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex w-full items-center justify-center rounded-xl bg-neutral-50 px-4 py-2.5 text-sm font-medium text-black transition-colors hover:bg-white disabled:cursor-not-allowed disabled:opacity-80"
                  aria-label="Send message"
                >
                  <span className={isSubmitting ? "hidden" : "inline-flex"}>
                    Send message
                  </span>
                  <span
                    className={
                      isSubmitting ? "inline-flex items-center gap-2" : "hidden"
                    }
                  >
                    <span className="h-3 w-3 animate-spin rounded-full border-2 border-black border-t-neutral-50" />
                    Sending…
                  </span>
                </button>
                <p className="text-xs text-neutral-500">
                  No spam—just a direct reply.
                </p>
              </div>

              <div aria-live="polite" className="space-y-2 text-xs">
                {status === "success" && (
                  <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-3 py-2 text-emerald-100">
                    <p className="font-medium">Message sent.</p>
                    <p className="text-emerald-100/80">
                      Thanks—I'll reply to the email you provided.
                    </p>
                  </div>
                )}
                {status === "error" && (
                  <div className="rounded-xl border border-rose-500/40 bg-rose-500/10 px-3 py-2 text-rose-100">
                    <p className="font-medium">Couldn&apos;t send message.</p>
                    <p className="text-rose-100/80">
                      {errorMessage ||
                        "Something went wrong. Please try again, or email me directly."}
                    </p>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

type FieldProps = {
  id: string;
  label: string;
  type: string;
  placeholder?: string;
  required?: boolean;
};

function Field({ id, label, type, placeholder, required }: FieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-neutral-100"
      >
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        placeholder={placeholder}
        className="mt-1 w-full rounded-xl border border-neutral-800 bg-black px-3.5 py-2.5 text-sm text-neutral-50 placeholder:text-neutral-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/90 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
      />
    </div>
  );
}

