import { Moon } from "lucide-react";
import { useTheme } from "../../contextapi/ThemeContext";

function ThemeToggle() {
	const { toggleTheme } = useTheme();
	return (
		<button
			onClick={toggleTheme}
			className="p-2 transition-colors duration-300 hover:text-primary-light lg:mb-8 mr-6.5 lg:mr-0"
			aria-label="Toggle Theme"
		>
			<Moon className="h-5 w-5 text-light-label" />
		</button>
	);
}

export default ThemeToggle;
