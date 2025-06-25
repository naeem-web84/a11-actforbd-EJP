import React from "react";
import { IoSunny, IoMoon, IoDesktop } from "react-icons/io5";
import useTheme from "../hooks/useTheme";

const themes = ["dark", "light", "auto"];

export default function ThemeToggle() {
  const [theme, setTheme] = useTheme();

  const nextTheme = () => {
    const currentIndex = themes.indexOf(theme);
    return themes[(currentIndex + 1) % themes.length];
  };

  const iconMap = {
    light: <IoSunny size={24} />,
    dark: <IoMoon size={24} />,
    auto: <IoDesktop size={24} />,
  };

  return (
    <button
      aria-label="Toggle theme"
      className="btn btn-circle btn-sm bg-base-200 text-xl"
      onClick={() => setTheme(nextTheme())}
      title={`Switch to ${nextTheme()} mode`}
    >
      {iconMap[theme]}
    </button>
  );
}
