import ContactSection from "@/components/Contact";
import { HeroSection } from "../components/HeroSection";
import { ProjectsSection } from "../components/ProjectsSection";
import { SkillsSection } from "../components/SkillsSection";
import { Footer } from "../components/Footer";
import { AboutSection } from "../components/AboutSection";

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      {/* Premium dark hero section */}
      <HeroSection />

      {/* Projects section showcasing selected work */}
      <ProjectsSection />
      <AboutSection />
      <SkillsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
