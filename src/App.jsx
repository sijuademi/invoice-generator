import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ThemeProvider } from "./contextapi/ThemeContext";
import { InvoiceProvider } from "./contextapi/InvoiceContext";
import AppLayout from "./AppLayout";
import Home from "./pages/Home";
import InvoiceDetailPage from "./pages/InvoiceDetailPage";

function PageTransition({ children, pageKey }) {
	return (
		<motion.div
			key={pageKey}
			initial={{ opacity: 0, x: 20 }}
			animate={{ opacity: 1, x: 0 }}
			exit={{ opacity: 0, x: -20 }}
			transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
			className="min-h-screen"
		>
			{children}
		</motion.div>
	);
}

function Router() {
	const [selectedId, setSelectedId] = useState(null);

	const goToDetail = (id) => setSelectedId(id);
	const goToList = () => setSelectedId(null);

	return (
		<AnimatePresence mode="wait">
			{selectedId ? (
				<PageTransition pageKey={`detail-${selectedId}`}>
					<InvoiceDetailPage invoiceId={selectedId} onBack={goToList} />
				</PageTransition>
			) : (
				<PageTransition pageKey="list">
					<Home onSelectInvoice={goToDetail} />
				</PageTransition>
			)}
		</AnimatePresence>
	);
}

export default function App() {
	return (
		<ThemeProvider>
			<InvoiceProvider>
				<AppLayout>
					<Router />
				</AppLayout>
			</InvoiceProvider>
		</ThemeProvider>
	);
}
