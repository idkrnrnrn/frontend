import { useState, useLayoutEffect } from "react";
import { flushSync } from "react-dom";

export function useTheme() {
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme");
      if (saved === "dark" || saved === "light") return saved;
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    return "dark";
  });

  const isDark = theme === "dark";

  useLayoutEffect(() => {
    const root = window.document.documentElement;
    root.classList.toggle("dark", isDark);
    localStorage.setItem("theme", theme);
  }, [theme, isDark]);

  const toggleTheme = (e: React.MouseEvent) => {
    const isDarkNew = !isDark;

    if (
      !document.startViewTransition ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setTheme(isDarkNew ? "dark" : "light");
      return;
    }

    const x = e.clientX ?? window.innerWidth / 2;
    const y = e.clientY ?? window.innerHeight / 2;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    const transition = document.startViewTransition(() => {
      flushSync(() => setTheme(isDarkNew ? "dark" : "light"));
    });

    transition.ready.then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`,
      ];
      document.documentElement.animate(
        { clipPath: !isDarkNew ? [...clipPath].reverse() : clipPath },
        {
          duration: 500,
          easing: "ease-in-out",
          pseudoElement: !isDarkNew
            ? "::view-transition-old(root)"
            : "::view-transition-new(root)",
          fill: "both",
        },
      );
    });
  };

  return { isDark, toggleTheme };
}
