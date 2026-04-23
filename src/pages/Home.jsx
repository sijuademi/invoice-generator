import { div } from "framer-motion/client";
import EmptyInvoice from "../components/EmptyInvoice";
import Header from "../components/Header";
import { useState } from "react";
import { useInvoices } from "../contextapi/InvoiceContext";
import { AnimatePresence, motion } from "framer-motion";
import InvoiceSummary from "../components/invoice/InvoiceSummary";
import InvoiceDrawer from "../components/form/InvoiceDrawer";

function Home({ onSelectInvoice }) {
	const { invoices, filter, setFilter, createInvoice } = useInvoices();
	const [drawerOpen, setDrawerOpen] = useState(false);

	const handleSave = (data) => {
		createInvoice(data, "pending");
		setDrawerOpen(false);
	};

	const handleDraft = (data) => {
		createInvoice(data, "draft");
		setDrawerOpen(false);
	};

	const count = invoices.length;
	const subtitle =
		filter.length > 0
			? `${count} ${filter.join(" & ")} invoice${count !== 1 ? "s" : ""}`
			: `${count} invoice${count !== 1 ? "s" : ""}`;
	return (
		<>
			<div className=" px-6 md:px-12  lg:ps-30 lg:pe-40 lg:px-0 xl:ps-63 xl:pe-88">
				<Header setDrawerOpen={setDrawerOpen} />

				<AnimatePresence mode="wait">
					{count === 0 ? (
						<motion.div
							key="empty"
							initial={{ opacity: 0, y: 12 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0 }}
						>
							<EmptyInvoice />
						</motion.div>
					) : (
						<motion.div key="list" className="flex flex-col gap-3">
							{invoices.map((inv, i) => (
								<InvoiceSummary
									key={inv.id}
									invoice={inv}
									index={i}
									onClick={() => onSelectInvoice(inv.id)}
								/>
							))}
						</motion.div>
					)}
				</AnimatePresence>
			</div>

			<InvoiceDrawer
				open={drawerOpen}
				mode="new"
				onClose={() => setDrawerOpen(false)}
				onSave={handleSave}
				onDraft={handleDraft}
			/>
		</>
	);
}

export default Home;
