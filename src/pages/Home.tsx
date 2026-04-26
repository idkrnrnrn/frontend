import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { AnimatePresence } from "motion/react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
import HighEndDotField from "../components/HighEndDotField";
import LandingView from "../components/views/LandingView";
import RegisterView from "../components/views/RegisterView";

export default function Home() {
  const { isDark, toggleTheme } = useTheme();
  const [view, setView] = useState<"landing" | "register">("landing");
  const navigate = useNavigate();

  // Scroll detection to transition from landing to register
  useEffect(() => {
    if (view !== "landing") return;

    const handleGesture = (delta: number) => {
      if (delta > 30) {
        setView("register");
      }
    };

    let touchStartY = 0;
    const handleWheel = (e: WheelEvent) => handleGesture(e.deltaY);
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    const handleTouchMove = (e: TouchEvent) => {
      handleGesture(touchStartY - e.touches[0].clientY);
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [view]);

  return (
    <div className="relative min-h-screen w-full bg-background text-foreground overflow-hidden font-sans flex flex-col">
      <HighEndDotField isDark={isDark} />

      {/* Theme Switcher */}
      <button
        onClick={toggleTheme}
        className="absolute top-6 right-6 z-50 flex size-10 items-center justify-center rounded-full border border-border bg-surface text-muted-foreground transition-all hover:scale-105 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        aria-label="Toggle theme"
      >
        {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
      </button>

      {/* Main Content Area - Centered for Maximum Negative Space */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center w-full px-6 py-20 text-center">
        <AnimatePresence mode="wait">
          {view === "landing" && <LandingView key="landing" />}
          {view === "register" && (
            <RegisterView
              key="register"
              onContinue={() => navigate("/dashboard")}
            />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
