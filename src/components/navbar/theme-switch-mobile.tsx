"use client";

import { Computer, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeSwitchMobile() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="border rounded-lg mt-4 w-full flex items-center justify-between shadow-sm">
      <button
        className={`${theme === "system" ? "bg-brand/10 text-brand" : "hover:text-brand"} w-full flex items-center justify-center py-4 transition`}
        onClick={() => setTheme("system")}
        aria-label="system-theme"
      >
        <Computer size={16} aria-hidden={true} />
      </button>
      <button
        className={`${theme === "light" ? "bg-brand/10 text-brand" : "hover:text-brand"} w-full flex items-center justify-center py-4 transition border-x`}
        onClick={() => setTheme("light")}
        aria-label="light-theme"
      >
        <Sun size={16} aria-hidden={true} />
      </button>
      <button
        className={`${theme === "dark" ? "bg-brand/10 text-brand" : "hover:text-brand"} w-full flex items-center justify-center py-4 transition`}
        onClick={() => setTheme("dark")}
        aria-label="dark-theme"
      >
        <Moon size={16} aria-hidden={true} />
      </button>
    </div>
  );
}
