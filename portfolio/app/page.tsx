import ScrollyCanvas from '@/components/ScrollyCanvas';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import Education from '@/components/Education';
import Contact from '@/components/Contact';

export default function Home() {
  return (
    <main className="bg-[#121212] min-h-screen text-white">
      <ScrollyCanvas />
      <Skills />
      <Projects />
      <Education />
      <Contact />
    </main>
  );
}
