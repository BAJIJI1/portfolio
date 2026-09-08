import { useEffect, useState } from "react";

const STORAGE_KEY = "bb-portfolio-theme";

function getInitialTheme() {
  if (typeof window === "undefined") return false;
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored) return stored === "dark";
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export default function useDarkMode() {
  const [isDark, setIsDark] = useState(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    window.localStorage.setItem(STORAGE_KEY, isDark ? "dark" : "light");
  }, [isDark]);

  return [isDark, setIsDark];
}
