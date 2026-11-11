import ScrollyCanvas from "@/components/ScrollyCanvas";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Education from "@/components/Education";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <div className="relative w-full bg-[#161616] text-[#F2F1ED]">
      {/* 1. The 500vh Sticky Scroller + Parallax Overlay */}
      <ScrollyCanvas />

      {/* 2. Selected Works & Case Studies Bento Grid */}
      <Projects />

      {/* 3. Technical Arsenal & Skills Matrix */}
      <Skills />

      {/* 4. Education & Academic Background */}
      <Education />

      {/* 5. Contact Call to Action */}
      <Contact />
    </div>
  );
}
