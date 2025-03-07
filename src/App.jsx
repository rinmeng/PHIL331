import { Button } from "@/components/ui/Button";
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "@/components/Navbar";

function App() {
  // dark mode
  useEffect(() => {
    document.documentElement.classList.add("light");
  }, []);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<div>Home Page</div>} />
        <Route path="/about" element={<div>About</div>} />
        <Route path="/citation" element={<div>Citation Page</div>} />
        <Route path="/team" element={<div>Team Members</div>} />
      </Routes>
    </>
  );
}

export default App;
