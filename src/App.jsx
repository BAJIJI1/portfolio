import { useState } from "react";
import LoadingScreen from "./components/LoadingScreen";
import ScrollProgress from "./components/ui/ScrollProgress";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Journey from "./components/Journey";
import FutureVision from "./components/FutureVision";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Testimonials from "./components/Testimonials";
import Education from "./components/Education";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import useDarkMode from "./hooks/useDarkMode";

export default function App() {
  const [isDark, setIsDark] = useDarkMode();
  const [showLoader, setShowLoader] = useState(true);

  function handleLoaderComplete() {
    setShowLoader(false);
  }

  function replayLoader() {
    setShowLoader(true);
  }

  return (
    <>
      {showLoader && <LoadingScreen onComplete={handleLoaderComplete} />}
      <ScrollProgress />
      <Navbar isDark={isDark} setIsDark={setIsDark} onLogoClick={replayLoader} />
      <main>
        <Hero />
        <About />
        <Journey />
        <FutureVision />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
