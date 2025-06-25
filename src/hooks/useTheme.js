import { useEffect, useState } from "react";

export default function useTheme() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "auto";
  });

  useEffect(() => {
    const root = document.documentElement;

    const applyTheme = (newTheme) => {
      if (newTheme === "auto") {
        const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        root.setAttribute("data-theme", systemDark ? "dark" : "light");
      } else {
        root.setAttribute("data-theme", newTheme);
      }
    };

    applyTheme(theme);
    localStorage.setItem("theme", theme);

    if (theme === "auto") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const systemChange = () => {
        applyTheme("auto");
      };
      mediaQuery.addEventListener("change", systemChange);
      return () => mediaQuery.removeEventListener("change", systemChange);
    }
  }, [theme]);

  return [theme, setTheme];
}
