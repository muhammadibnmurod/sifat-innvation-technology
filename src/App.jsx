import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from './components/Header.jsx'
import Home from './pages/Home.jsx'
function App() {
  return (
    <BrowserRouter>
        <Header />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
