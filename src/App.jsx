import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from './components/Header.jsx'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import Remont from "./components/Remont.jsx";
import Partners from "./components/Partners.jsx";
import AboutUs from "./components/AboutUs.jsx";
import VideoSection from "./components/VideoSection.jsx";
import AskQuestionSection from "./components/AskQuestionSection.jsx";
import  LatestNewsSection from "./components/LatestNewsSection.jsx";
import Footer from "./components/Footer.jsx";
function App() {
  return (
    <BrowserRouter>
        <Header />
        <Navbar />
        <Remont />
        <Partners />
        < AboutUs />
        < VideoSection />
        < AskQuestionSection />
        < LatestNewsSection />
        < Footer />
      <Routes>
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
