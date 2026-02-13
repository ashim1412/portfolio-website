"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="w-9 h-9" />;
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle theme"
      className="relative w-9 h-9 flex items-center justify-center rounded-full border border-border hover:border-accent/50 text-muted hover:text-foreground transition-all duration-200 hover:bg-secondary"
    >
      {isDark ? (
        <Sun size={16} className="text-yellow-400" />
      ) : (
        <Moon size={16} className="text-blue-500" />
      )}
    </button>
  );
}
