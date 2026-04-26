import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { AnimatePresence } from "motion/react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
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
