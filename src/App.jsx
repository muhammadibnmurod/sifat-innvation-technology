import { MotionConfig } from "framer-motion";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import Stats from "./components/Stats.jsx";
import Remont from "./components/Remont.jsx";
import Partners from "./components/Partners.jsx";
import AboutUs from "./components/AboutUs.jsx";
import VideoSection from "./components/VideoSection.jsx";
import AskQuestionSection from "./components/AskQuestionSection.jsx";
import LatestNewsSection from "./components/LatestNewsSection.jsx";
import CtaBanner from "./components/CtaBanner.jsx";
import Footer from "./components/Footer.jsx";

function App() {
  // reducedMotion="user" makes Framer respect prefers-reduced-motion for all
  // transform-based animations automatically.
  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-surface font-body text-ink-soft">
        <Header />
        <main>
          <Hero />
          <Stats />
          <Remont />
          <AboutUs />
          <VideoSection />
          <Partners />
          <LatestNewsSection />
          <AskQuestionSection />
          <CtaBanner />
        </main>
        <Footer />
      </div>
    </MotionConfig>
  );
}

export default App;
