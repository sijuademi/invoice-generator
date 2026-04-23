import { useEffect } from "react";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";

import { invoiceSchema } from "../../lib/schema";
import { FormField, Input } from "../ui/Input";
import { Select } from "../ui/Select";
import Button from "../ui/Button";
import { AddressFields } from "./AddressFields";
import { ItemList } from "./ItemList";
import { cn } from "../../lib/utils";
import { ChevronLeft } from "lucide-react";

const PAYMENT_TERMS = [
	{ value: "1", label: "Net 1 Day" },
	{ value: "7", label: "Net 7 Days" },
	{ value: "14", label: "Net 14 Days" },
	{ value: "30", label: "Net 30 Days" },
];

const SectionTitle = ({ children }) => (
	<p className="text-xs font-bold text-brand-purple tracking-tight mb-5">
		{children}
	</p>
);

export function InvoiceForm({ mode, invoice, onClose, onSave, onDraft }) {
	const isEdit = mode === "edit";

	const defaultValues =
		isEdit && invoice
			? {
					senderAddress: invoice.senderAddress,
					clientName: invoice.clientName,
					clientEmail: invoice.clientEmail,
					clientAddress: invoice.clientAddress,
					createdAt: invoice.createdAt,
					paymentTerms: String(invoice.paymentTerms ?? 30),
					description: invoice.description,
					items: invoice.items.map((i) => ({
						id: i.id,
						name: i.name,
						quantity: i.quantity,
						price: i.price,
					})),
				}
			: {
					senderAddress: { street: "", city: "", postCode: "", country: "" },
					clientName: "",
					clientEmail: "",
					clientAddress: { street: "", city: "", postCode: "", country: "" },
					createdAt: new Date().toISOString().split("T")[0],
					paymentTerms: "30",
					description: "",
					items: [{ id: crypto.randomUUID(), name: "", quantity: 1, price: 0 }],
				};

	const methods = useForm({
		resolver: zodResolver(invoiceSchema),
		defaultValues,
		mode: "onSubmit",
	});

	const {
		register,
		handleSubmit,
		control,
		reset,
		formState: { errors },
	} = methods;

	// Reset form when switching between invoices
	useEffect(() => {
		reset(defaultValues);
	}, [invoice?.id]);

	
	useEffect(() => {
		const handleKeyDown = (e) => {
			if (e.key === "Escape") {
				e.preventDefault();
				onClose();
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [onClose]);

	
	const handleSend = handleSubmit((data) => onSave(data, "pending"));

	
	const handleSaveDraft = () => {
		const raw = methods.getValues();
		onDraft(raw);
	};

	
	const hasErrors = Object.keys(errors).length > 0;

	return (
		<FormProvider {...methods}>
			<form
				noValidate
				onSubmit={handleSend}
				className="flex flex-col h-full bg-light-surface overflow-hidden"
				style={{ borderRadius: "0 20px 20px 0" }}
				aria-label={isEdit ? "Edit invoice form" : "New invoice form"}
			>
				{/* ── Header ── */}
				<div className="px-6 sm:px-10 pt-8 shrink-0">
					<button
						type="button"
						onClick={onClose}
						className="flex sm:hidden items-center gap-3 font-bold text-light-heading hover:text-label transition-colors pb-6 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple rounded"
					>
						{/* <BackArrow /> */}
						<ChevronLeft className="text-brand-purple" size={16} />
						Go back
					</button>
					<h2 className="text-2xl font-bold tracking-tight text-light-heading mb-8">
						{isEdit ? (
							<>
								Edit <span className="text-body">#</span>
								{invoice?.id}
							</>
						) : (
							"New Invoice"
						)}
					</h2>
				</div>

				{/* ── Scrollable body ── */}
				<div className="flex-1 overflow-y-auto px-6 sm:px-10 space-y-10 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent pb-24 sm:pb-16 lg:pb-32">
					{/* Bill From */}
					<section>
						<SectionTitle>Bill From</SectionTitle>
						<AddressFields prefix="senderAddress" />
					</section>

					{/* Bill To */}
					<section>
						<SectionTitle>Bill To</SectionTitle>
						<div className="flex flex-col gap-5">
							<FormField
								label="Client's Name"
								htmlFor="clientName"
								error={errors.clientName?.message}
								className="text-light-label"
							>
								<Input
									id="clientName"
									placeholder="e.g. Alex Grim"
									error={errors.clientName?.message}
									{...register("clientName")}
								/>
							</FormField>
							<FormField
								label="Client's Email"
								htmlFor="clientEmail"
								error={errors.clientEmail?.message}
								className="text-light-label"
							>
								<Input
									id="clientEmail"
									type="email"
									placeholder="e.g. alexgrim@mail.com"
									error={errors.clientEmail?.message}
									{...register("clientEmail")}
								/>
							</FormField>
							<AddressFields prefix="clientAddress" />
						</div>
					</section>

					{/* Invoice Details */}
					<section>
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
							<FormField
								label="Invoice Date"
								htmlFor="createdAt"
								error={errors.createdAt?.message}
								className="text-light-label"
							>
								<Input
									className="text-light-body"
									id="createdAt"
									type="date"
									error={errors.createdAt?.message}
									{...register("createdAt")}
								/>
							</FormField>
							<FormField
								label="Payment Terms"
								htmlFor="paymentTerms"
								className="text-light-label"
							>
								<Controller
									name="paymentTerms"
									control={control}
									render={({ field }) => (
										<Select
											value={field.value}
											onValueChange={field.onChange}
											options={PAYMENT_TERMS}
											placeholder="Select terms"
										/>
									)}
								/>
							</FormField>
						</div>
						<FormField
							label="Project Description"
							htmlFor="description"
							error={errors.description?.message}
							className="text-light-label"
						>
							<Input
								id="description"
								placeholder="e.g. Graphic Design Service"
								error={errors.description?.message}
								{...register("description")}
							/>
						</FormField>
					</section>

					{/* Items */}
					<ItemList />
				</div>

				{/* ── Footer ── */}
				<div
					className={cn(
						"shrink-0 px-6 sm:px-10 py-5 fixed bottom-0",
						"bg-light-surface w-full sm:max-w-154",
						"shadow-[0_-8px_24px_rgba(72,84,159,0.06)]",
						isEdit
							? "flex justify-end gap-2"
							: "flex justify-between items-center",
					)}
				>
					{/* Validation summary */}
					<AnimatePresence>
						{hasErrors && (
							<motion.p
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								className="hidden sm:block text-[10px] font-semibold text-brand-red italic self-center"
							>
								— All fields must be filled in
							</motion.p>
						)}
					</AnimatePresence>

					{isEdit ? (
						<>
							<Button type="button" variant="ghost" onClick={onClose}>
								Cancel
							</Button>
							<Button type="submit">Save Changes</Button>
						</>
					) : (
						<>
							<Button type="button" variant="ghost" onClick={onClose}>
								Discard
							</Button>
							<div className="flex gap-4">
								<Button type="button" variant="dark" onClick={handleSaveDraft}>
									<span className="">Save as Draft</span>
								</Button>
								<Button type="submit">
									<span className="">Save &amp; Send</span>
								</Button>
							</div>
						</>
					)}
				</div>
			</form>
		</FormProvider>
	);
}
