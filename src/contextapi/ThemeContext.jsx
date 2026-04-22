import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
	const [isDark, setIsDark] = useState(() => {
		// Check local storage or system preference on initial load
		const saved = localStorage.getItem("invoice-theme");
		if (saved) return saved === "dark";
		return window.matchMedia("(prefers-color-scheme: dark)").matches;
	});

	useEffect(() => {
		const root = window.document.documentElement;
		if (isDark) {
			root.classList.add("dark");
			localStorage.setItem("invoice-theme", "dark");
		} else {
			root.classList.remove("dark");
			localStorage.setItem("invoice-theme", "light");
		}
	}, [isDark]);

	const toggleTheme = () => setIsDark((prev) => !prev);

	return (
		<ThemeContext.Provider value={{ isDark, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	);
};

export const useTheme = () => useContext(ThemeContext);
