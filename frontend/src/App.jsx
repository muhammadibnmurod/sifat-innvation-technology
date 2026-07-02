import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import { Loader2 } from "lucide-react";
import { SiteDataProvider } from "./lib/SiteDataContext.jsx";
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

// Admin panel is code-split — it never loads for public visitors.
const AdminApp = lazy(() => import("./admin/AdminApp.jsx"));

function PublicSite() {
  return (
    <SiteDataProvider>
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
    </SiteDataProvider>
  );
}

function App() {
  // reducedMotion="user" makes Framer respect prefers-reduced-motion for all
  // transform-based animations automatically.
  return (
    <MotionConfig reducedMotion="user">
      <Routes>
        <Route path="/" element={<PublicSite />} />
        <Route
          path="/admin/*"
          element={
            <Suspense
              fallback={
                <div className="flex min-h-screen items-center justify-center bg-surface">
                  <Loader2 className="h-8 w-8 animate-spin text-brand-500" />
                </div>
              }
            >
              <AdminApp />
            </Suspense>
          }
        />
      </Routes>
    </MotionConfig>
  );
}

export default App;
