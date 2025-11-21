import React, { useEffect, useState } from "react";

function ThemeToggle() {
  const themes = ["light", "dark", "blue"];
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const saved = localStorage.getItem("theme") || "light";
    setTheme(saved);
    updateBodyClass(saved);
  }, []);

  const updateBodyClass = (themeName) => {
    document.body.classList.remove("light", "dark", "blue", "purple");
    if (themeName && themeName !== "light") {
      document.body.classList.add(themeName);
    }
  };

  const toggleTheme = () => {
    const index = themes.indexOf(theme);
    const nextTheme = themes[(index + 1) % themes.length];
    setTheme(nextTheme);
    updateBodyClass(nextTheme);
    localStorage.setItem("theme", nextTheme);
  };

  const getIcon = () => {
    switch (theme) {
      case "dark": return "🌙";
      case "blue": return "💙";
      default: return "☀️";
    }
  };

  return (
    <button className="theme-toggle" onClick={toggleTheme} title="Cambiar tema">
      {getIcon()}
    </button>
  );
}

export default ThemeToggle;
