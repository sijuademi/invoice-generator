import { AnimatePresence, motion } from "framer-motion";
import { InvoiceForm } from "./InvoiceForm";

export default function InvoiceDrawer({
	open,
	mode,
	invoice,
	onClose,
	onSave,
	onDraft,
}) {
	return (
		<AnimatePresence>
			{open && (
				<>
					{/* Backdrop */}
					<motion.div
						key="backdrop"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.25 }}
						onClick={onClose}
						className="fixed inset-0 bg-[rgba(0,0,0,0.5)] z-20"
						aria-hidden="true"
					/>

					{/* Drawer panel */}
					<motion.div
						key="drawer"
						initial={{ x: "-100%" }}
						animate={{ x: 0 }}
						exit={{ x: "-100%" }}
						transition={{
							type: "tween",
							ease: [0.4, 0, 0.2, 1],
							duration: 0.3,
						}}
						className="
              fixed top-0 bottom-0 left-0 z-30
              /* Mobile: full width minus padding */
              w-full
              /* Tablet+: constrained width, offset for sidebar */
              sm:max-w-154
              /* Desktop: offset for sidebar */
              lg:left-18
              /* Bottom padding on mobile for the bottom sidebar */
              pb-18 lg:pb-0
              shadow-[16px_0_64px_rgba(0,0,0,0.25)]
            "
						role="dialog"
						aria-modal="true"
						aria-label={mode === "edit" ? "Edit invoice" : "New invoice"}
					>
						<InvoiceForm
							mode={mode}
							invoice={invoice}
							onClose={onClose}
							onSave={onSave}
							onDraft={onDraft}
						/>
					</motion.div>
				</>
			)}
		</AnimatePresence>
	);
}
