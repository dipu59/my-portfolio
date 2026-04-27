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
    const message = String(formData.get("message") || "").trim();

    if (!name || !email || !message) {
      setStatus("error");
      setErrorMessage("Please fill in all required fields.");
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
        body: JSON.stringify({ name, email, message }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.error || "Failed to send message. Please try again.");
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
    <section id="contact" className="relative z-10 py-16">
      <div className="mx-auto max-w-2xl backdrop-blur-sm bg-black/30 border border-purple-500/20 rounded-3xl p-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-purple-300 to-green-300 bg-clip-text text-transparent">
            Drop Me a Line
          </h2>
          <p className="mt-4 text-purple-100/80 max-w-lg mx-auto">
            Let's make something amazing together! Whether it's a quick question or a big idea, 
            I promise to respond with more than just a robot auto-reply.
          </p>
        </div>

        <form 
          onSubmit={handleSubmit}
          className="space-y-6 max-w-md mx-auto"
        >
          <div className="space-y-4">
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
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-neutral-300 mb-1">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                className="w-full bg-black/40 border border-purple-500/30 rounded-xl px-4 py-3 text-purple-50 placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-green-400/50 focus:border-transparent transition-all hover:border-purple-400/50"
                placeholder="Tell me about your project..."
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-purple-500 to-green-500 text-black font-bold py-3 px-6 rounded-xl transition-all hover:shadow-lg hover:shadow-purple-500/30 disabled:opacity-70 disabled:cursor-not-allowed transform hover:scale-[1.02]"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Sending...
              </span>
            ) : "Send message"}
          </button>

          {status === "success" && (
            <div className="bg-emerald-500/10 text-emerald-100 px-4 py-3 rounded-lg border border-emerald-500/30">
              <p className="font-medium">Message sent successfully!</p>
              <p className="text-sm mt-1">I'll get back to you within 24 hours.</p>
            </div>
          )}

          {status === "error" && (
            <div className="bg-rose-500/10 text-rose-100 px-4 py-3 rounded-lg border border-rose-500/30">
              <p className="font-medium">Error sending message</p>
              <p className="text-sm mt-1">{errorMessage}</p>
            </div>
          )}

          <div className="text-center text-sm text-neutral-500 pt-4">
            <p>Alternatively, email me directly at:</p>
            <a 
              href="mailto:12biswasdipu@gmail.com" 
              className="text-sky-400 hover:text-sky-300 transition-colors"
            >
              12biswasdipu@gmail.com
            </a>
          </div>
        </form>
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
      <label htmlFor={id} className="block text-sm font-medium text-neutral-300 mb-1">
        {label}
        {required && <span className="text-rose-500 ml-1">*</span>}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full bg-black/40 border border-purple-500/30 rounded-xl px-4 py-3 text-purple-50 placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-green-400/50 focus:border-transparent transition-all hover:border-purple-400/50"
      />
    </div>
  );
}
