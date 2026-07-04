import Navbar from "@/components/Navbar";
import Hero from "@/sections/Hero";
import Marquee from "@/sections/Marquee";
import Projects from "@/sections/Projects";
import Experience from "@/sections/Experience";
import Testimonials from "@/sections/Testimonials";
import Skills from "@/sections/Skills";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0d0d0d] overflow-hidden">
      <Navbar />
      <Hero />
      <Marquee />
      <Projects />
      <Experience />
      <Testimonials />
      <Skills />
      <Footer />
    </main>
  );
}