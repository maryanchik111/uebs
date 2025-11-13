import Hero from "./components/client/hero";
import NextLectureSection from "./components/client/next-lecture-section";
import FormatSection from "./components/client/format-section";
import ProgramSection from "./components/client/program-section";

export default function Home() {
  return (
    <main>
      <Hero />
      <NextLectureSection />
      <FormatSection />
      <ProgramSection />
    </main>
  );
}
