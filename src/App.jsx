import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from './components/Header.jsx'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
function App() {
  return (
    <BrowserRouter>
        <Header />
        <Navbar />
      <Routes>
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
