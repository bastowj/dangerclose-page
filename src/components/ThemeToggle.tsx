"use client";

import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  // The resolved theme is unknowable during SSR, so the icon can only be picked
  // after mount. Reserve the button's footprint meanwhile to avoid a shift.
  if (!mounted) return <span className="nav-button" aria-hidden />;

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      className="nav-button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
    >
      {isDark ? (
        <SunIcon className="nav-theme-icon" />
      ) : (
        <MoonIcon className="nav-theme-icon" />
      )}
    </button>
  );
}
