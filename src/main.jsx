import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ThemeProvider } from "./contextapi/ThemeContext.jsx";
import { InvoiceProvider } from "./contextapi/InvoiceContext.jsx";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<ThemeProvider>
			<InvoiceProvider>
				<App />
			</InvoiceProvider>
		</ThemeProvider>
	</StrictMode>,
);
