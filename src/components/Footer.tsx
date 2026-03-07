"use client";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-neutral-900/80 bg-black/95">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div className="space-y-1 text-sm">
          <p className="text-neutral-300">
            Designed &amp; built by{" "}
            <span className="font-medium text-neutral-50">Dipu Biswas</span>
          </p>
          <p className="text-xs text-neutral-500">
            Building fast, premium web experiences with React &amp; Next.js.
          </p>
        </div>

        <div className="flex flex-col gap-3 text-xs text-neutral-400 sm:items-end">
          <div className="flex flex-wrap gap-4 sm:justify-end">
            <a
              href="tel:+919239005171"
              className="hover:text-sky-400 transition-colors"
            >
              Phone: <span className="font-medium text-neutral-200">+91 92390 05171</span>
            </a>
            <a
              href="mailto:12biswasdipu@gmail.com"
              className="hover:text-sky-400 transition-colors"
            >
              Email:{" "}
              <span className="font-medium text-neutral-200">
                12biswasdipu@gmail.com
              </span>
            </a>
          </div>
          <p className="text-[11px] text-neutral-500">
            Balagarh, Hooghly, West Bengal, India
          </p>
          <p className="text-[11px] text-neutral-600">
            © {year} Dipu Biswas. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

