import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";
import Button from "./Button";

export function DeleteModal({ invoiceId, open, onOpenChange, onConfirm }) {
	return (
		<Dialog.Root open={open} onOpenChange={onOpenChange}>
			<AnimatePresence>
				{open && (
					<Dialog.Portal forceMount>
						{/* Backdrop */}
						<Dialog.Overlay asChild>
							<motion.div
								className="fixed inset-0 bg-black/50 z-40"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
							/>
						</Dialog.Overlay>

						{/* Modal panel */}
						<Dialog.Content asChild>
							<motion.div
								role="alertdialog"
								aria-modal="true"
								className="fixed z-50 top-1/2 left-1/2 w-[calc(100%-48px)] max-w-120
                           bg-light-surface rounded-invoice p-12 shadow-xl
                           focus:outline-none"
								initial={{ opacity: 0, scale: 0.95, x: "-50%", y: "-50%" }}
								animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
								exit={{ opacity: 0, scale: 0.95, x: "-50%", y: "-50%" }}
								transition={{ duration: 0.2 }}
							>
								<Dialog.Title className="text-2xl font-bold text-light-heading mb-3">
									Confirm Deletion
								</Dialog.Title>
								<Dialog.Description className="text-modal text-sm leading-relaxed mb-8">
									Are you sure you want to delete invoice #{invoiceId}? This
									action cannot be undone.
								</Dialog.Description>

								<div className="flex justify-end gap-2">
									<Dialog.Close asChild>
										<Button variant="ghost">Cancel</Button>
									</Dialog.Close>
									<Button variant="danger" onClick={onConfirm}>
										Delete
									</Button>
								</div>
							</motion.div>
						</Dialog.Content>
					</Dialog.Portal>
				)}
			</AnimatePresence>
		</Dialog.Root>
	);
}
