import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Check for saved preference or system preference
    const saved = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    if (saved === "light" || (!saved && !prefersDark)) {
      setIsDark(false);
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
    } else {
      setIsDark(true);
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    }
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    
    if (newIsDark) {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="relative overflow-hidden rounded-full w-10 h-10"
      aria-label={isDark ? "Passa alla modalità chiara" : "Passa alla modalità scura"}
    >
      <Sun 
        className={`w-5 h-5 absolute transition-all duration-500 ${
          isDark 
            ? "opacity-0 rotate-90 scale-0" 
            : "opacity-100 rotate-0 scale-100 text-amber-500"
        }`}
      />
      <Moon 
        className={`w-5 h-5 absolute transition-all duration-500 ${
          isDark 
            ? "opacity-100 rotate-0 scale-100 text-primary" 
            : "opacity-0 -rotate-90 scale-0"
        }`}
      />
    </Button>
  );
};

export default ThemeToggle;
