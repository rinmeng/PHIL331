import { Button } from "@/components/ui/Button";
import { useEffect } from "react";

function App() {
  // dark mode
  useEffect(() => {
    document.documentElement.classList.add("light");
  }, []);
  return (
    <>
      <div className="h-screen w-screen">
        <div className="flex flex-col items-center justify-center w-full text-center">
          <h1 className="text-4xl">Welcome to the PHIL331 Project</h1>
          <div>
            <Button variant="default">Click me!</Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
