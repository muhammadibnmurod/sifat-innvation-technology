import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from './components/Header.jsx'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import Remont from "./components/Remont.jsx";
import Partners from "./components/Partners.jsx";
function App() {
  return (
    <BrowserRouter>
        <Header />
        <Navbar />
        <Remont />
        <Partners />
      <Routes>
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
