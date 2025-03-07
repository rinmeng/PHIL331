import { Button } from "@/components/ui/Button";
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Citation from "@/pages/Citation";
import Team from "@/pages/Team";

function App() {
  // dark mode
  useEffect(() => {
    document.documentElement.classList.add("light");
  }, []);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/citation" element={<Citation />} />
        <Route path="/team" element={<Team />} />
      </Routes>
    </>
  );
}

export default App;
