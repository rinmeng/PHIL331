import { Button } from "@/components/ui/Button";
import { useEffect } from "react";

function App() {
  // dark mode
  useEffect(() => {
    document.documentElement.classList.add("light");
  }, []);
  return (
    <>
      <div>
        <Button variant="secondary">Click me!</Button>
      </div>
    </>
  );
}

export default App;
