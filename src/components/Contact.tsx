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
    const projectType = String(formData.get("projectType") || "").trim();
    const budget = String(formData.get("budget") || "").trim();
    const timeline = String(formData.get("timeline") || "").trim();

    if (!name || !email || !message) {
      setStatus("error");
      setErrorMessage("Please fill in your name, email, and message.");
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          subject,
          message,
          projectType,
          budget,
          timeline,
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.error || "Something went wrong. Please try again.");
      }

      setStatus("success");
      form.reset();
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Could not send your message. Please try again."
      );
    } finally {
      setStatus((current) => (current === "submitting" ? "idle" : current));
    }
  }

  const isSubmitting = status === "submitting";

  return (
    <section
      id="contact"
      className="relative isolate overflow-hidden py-20 px-4 sm:px-6 lg:px-8 bg-black"
    >
      <div className="mx-auto max-w-5xl grid gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] items-start">
        <div className="space-y-8">
          <div className="space-y-4">
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-neutral-500">
              Let&apos;s build something
            </p>
            <h2 className="text-3xl sm:text-4xl font-semibold text-neutral-50">
              Let&apos;s talk about your project
            </h2>
            <p className="text-sm sm:text-base text-neutral-300/90 max-w-xl">
              Send a short message and it will be delivered directly to{" "}
              <span className="font-mono text-sky-400">
                12biswasdipu@gmail.com
              </span>
              . I usually reply within a day.
            </p>
          </div>

          <div className="space-y-3 text-sm text-neutral-300/90">
            <p>
              Whether it&apos;s a new idea, a portfolio review, or a full
              product build, share as much context as you can and I&apos;ll
              follow up with next steps.
            </p>
            <p className="text-neutral-500">
              You can also reach me directly at{" "}
              <a
                href="mailto:12biswasdipu@gmail.com"
                className="font-medium text-sky-400 hover:text-sky-300 underline underline-offset-4 transition-colors"
              >
                12biswasdipu@gmail.com
              </a>
              .
            </p>
          </div>

          <div className="grid gap-4 text-xs text-neutral-300 sm:grid-cols-2">
            <div className="rounded-2xl border border-neutral-800/80 bg-neutral-950/70 px-4 py-4 shadow-[0_26px_80px_rgba(0,0,0,0.8)] transition-transform duration-300 ease-out hover:-translate-y-0.5">
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-500">
                Direct contact
              </p>
              <dl className="mt-3 space-y-2 text-sm">
                <div>
                  <dt className="text-neutral-400">Phone</dt>
                  <dd className="font-medium text-neutral-100">
                    <a
                      href="tel:+919239005171"
                      className="hover:text-sky-400 transition-colors"
                    >
                      +91 92390 05171
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-neutral-400">Email</dt>
                  <dd className="font-medium text-neutral-100">
                    <a
                      href="mailto:12biswasdipu@gmail.com"
                      className="hover:text-sky-400 transition-colors"
                    >
                      12biswasdipu@gmail.com
                    </a>
                  </dd>
                </div>
              </dl>
            </div>
            <div className="rounded-2xl border border-neutral-800/80 bg-neutral-950/70 px-4 py-4 shadow-[0_26px_80px_rgba(0,0,0,0.8)] transition-transform duration-300 ease-out hover:-translate-y-0.5">
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-500">
                Location
              </p>
              <p className="mt-3 text-sm font-medium text-neutral-100">
                Balagarh, Hooghly
              </p>
              <p className="text-sm text-neutral-400">
                West Bengal, India
              </p>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 -z-10 rounded-3xl bg-neutral-900/60 blur-2xl" />
          <div className="rounded-3xl border border-neutral-800/80 bg-neutral-950/95 backdrop-blur-2xl shadow-[0_40px_140px_rgba(0,0,0,0.9)] p-6 sm:p-8 transition-transform duration-500 ease-out hover:-translate-y-1">
            <form
              className="space-y-5"
              aria-label="Contact form"
              onSubmit={handleSubmit}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  id="name"
                  label="Name"
                  type="text"
                  placeholder="Your full name"
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

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="projectType"
                    className="block text-sm font-medium text-neutral-100"
                  >
                    Project type
                  </label>
                  <select
                    id="projectType"
                    name="projectType"
                    className="mt-1 w-full rounded-2xl border border-neutral-800/80 bg-neutral-950/90 px-3.5 py-2.5 text-sm text-neutral-50 placeholder:text-neutral-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/90 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select a project type
                    </option>
                    <option>Portfolio website</option>
                    <option>Business website</option>
                    <option>Landing page</option>
                    <option>E‑commerce</option>
                    <option>Dashboard / admin</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="budget"
                    className="block text-sm font-medium text-neutral-100"
                  >
                    Project budget (USD)
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    className="mt-1 w-full rounded-2xl border border-neutral-800/80 bg-neutral-950/90 px-3.5 py-2.5 text-sm text-neutral-50 placeholder:text-neutral-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/90 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select a range
                    </option>
                    <option>Under $500</option>
                    <option>$500 – $1,000</option>
                    <option>$1,000 – $3,000</option>
                    <option>$3,000 – $5,000</option>
                    <option>$5,000+</option>
                    <option>Not sure yet</option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="timeline"
                  className="block text-sm font-medium text-neutral-100"
                >
                  Ideal timeline
                </label>
                <input
                  id="timeline"
                  name="timeline"
                  type="text"
                  placeholder="For example: starting next month, launch in 6 weeks"
                  className="mt-1 w-full rounded-2xl border border-neutral-800/80 bg-neutral-950/90 px-3.5 py-2.5 text-sm text-neutral-50 placeholder:text-neutral-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/90 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                />
              </div>

              <Field
                id="subject"
                label="Subject"
                type="text"
                placeholder="Quick title for your message"
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
                  className="mt-1 w-full rounded-2xl border border-neutral-800/80 bg-neutral-950/90 px-3.5 py-2.5 text-sm text-neutral-50 placeholder:text-neutral-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/90 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                  placeholder="Share what you’re working on, what you need help with, and any links."
                />
                <p className="mt-1 text-[11px] text-neutral-500">
                  Your message will be sent directly to my inbox as an email.
                </p>
              </div>

              <div className="space-y-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="relative inline-flex w-full items-center justify-center rounded-2xl bg-neutral-50 px-4 py-2.5 text-sm font-medium text-black shadow-lg shadow-black/40 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-white disabled:cursor-not-allowed disabled:opacity-80"
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
                  No subscriptions or marketing lists—just a direct one‑to‑one
                  reply.
                </p>
              </div>

              <div aria-live="polite" className="space-y-2 text-xs">
                {status === "success" && (
                  <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-3 py-2 text-emerald-100">
                    <p className="font-medium">Message sent successfully.</p>
                    <p className="text-emerald-100/80">
                      Thanks for reaching out—I&apos;ll get back to you at the
                      email you provided.
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
        className="mt-1 w-full rounded-2xl border border-neutral-800/80 bg-neutral-950/90 px-3.5 py-2.5 text-sm text-neutral-50 placeholder:text-neutral-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/90 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
      />
    </div>
  );
}
