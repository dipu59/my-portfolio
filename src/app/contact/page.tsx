import { ContactSection } from "@/components/Contact";
import { GlowingStars } from "@/components/ui/glowing-stars";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-900/10 to-black">
      <div className="container mx-auto px-4 py-24 relative">
        <GlowingStars />

        <div className="mb-16 text-center">
          <h1 className="text-5xl font-semibold tracking-tight text-neutral-50 sm:text-6xl">
            Contact
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-neutral-300/90 sm:text-lg">
            Share a few details and I&apos;ll reply within 24 hours.
          </p>
        </div>

        <ContactSection />

        <div className="absolute inset-x-0 top-0 h-[500px] bg-gradient-to-b from-purple-500/10 to-transparent pointer-events-none" />
      </div>
    </div>
  );
}
