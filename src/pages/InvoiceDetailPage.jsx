import { useState } from "react";
import { motion } from "framer-motion";
import { useInvoices } from "../contextapi/InvoiceContext";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import { DeleteModal } from "../components/ui/DeleteModal";
import { InvoiceDrawer } from "../components/form/InvoiceDrawer";
import { formatCurrency, formatDate, cn } from "../lib/utils";
import { ChevronLeft } from "lucide-react";

// ── Back arrow ────────────────────────────────────────────────────────────────
// const BackArrow = () => (
// 	<svg width="7" height="10" viewBox="0 0 7 10" fill="none" aria-hidden>
// 		<path
// 			d="M6.342.886L2.114 5.114l4.228 4.228"
// 			stroke="#7C5DFA"
// 			strokeWidth="2"
// 			strokeLinecap="round"
// 		/>
// 	</svg>
// );

// ── Address block ─────────────────────────────────────────────────────────────
function AddressBlock({ address }) {
	if (!address) return null;
	return (
		<address className="not-italic text-body text-xs leading-loose">
			{address.street && <span className="block">{address.street}</span>}
			{address.city && <span className="block">{address.city}</span>}
			{address.postCode && <span className="block">{address.postCode}</span>}
			{address.country && <span className="block">{address.country}</span>}
		</address>
	);
}

// ── Meta cell ─────────────────────────────────────────────────────────────────
function MetaCell({ label, value, className }) {
	return (
		<div className={className}>
			<dt className="text-xs text-body mb-2">{label}</dt>
			<dd className="text-sm font-bold text-heading">{value}</dd>
		</div>
	);
}

// ── Items table ───────────────────────────────────────────────────────────────
function ItemsTable({ items, total }) {
	return (
		<div className="rounded-[8px] overflow-hidden mt-10">
			{/* Table body — light purple bg */}
			<div className="bg-surface-alt p-6 sm:p-8">
				{/* Header row — desktop only */}
				<div className="hidden sm:grid grid-cols-[1fr_64px_120px_120px] gap-4 mb-6">
					{["Item Name", "QTY.", "Price", "Total"].map((h, i) => (
						<span
							key={h}
							className={cn("text-xs text-body", i > 0 && "text-right")}
						>
							{h}
						</span>
					))}
				</div>

				{/* Rows */}
				<ul className="flex flex-col gap-5 sm:gap-4">
					{items.map((item) => (
						<li
							key={item.id}
							className="grid grid-cols-2 sm:grid-cols-[1fr_64px_120px_120px] gap-2 sm:gap-4 items-center"
						>
							<span className="text-xs font-bold text-heading">
								{item.name}
							</span>

							{/* Mobile: qty × price */}
							<span className="sm:hidden text-xs font-bold text-body text-right">
								{formatCurrency(item.total ?? item.price * item.quantity)}
							</span>
							<span className="sm:hidden text-xs text-body col-start-1">
								{item.quantity} × {formatCurrency(item.price)}
							</span>

							{/* Desktop */}
							<span className="hidden sm:block text-xs text-body text-right">
								{item.quantity}
							</span>
							<span className="hidden sm:block text-xs text-body text-right">
								{formatCurrency(item.price)}
							</span>
							<span className="hidden sm:block text-xs font-bold text-heading text-right">
								{formatCurrency(item.total ?? item.price * item.quantity)}
							</span>
						</li>
					))}
				</ul>
			</div>

			{/* Grand total — dark footer */}
			<div className="bg-[#373B53] dark:bg-[#0C0E16] rounded-b-[8px] px-6 sm:px-8 py-6 flex items-center justify-between">
				<span className="text-xs text-white">Amount Due</span>
				<span className="text-2xl font-bold text-white">
					{formatCurrency(total)}
				</span>
			</div>
		</div>
	);
}

// ── Desktop action buttons (inline in status bar) ────────────────────────────
function DesktopActions({ invoice, onEdit, onDelete, onMarkPaid }) {
	const isPaid = invoice.status === "paid";
	const isPending = invoice.status === "pending";
	return (
		<div className="hidden lg:flex items-center gap-2">
			{!isPaid && (
				<Button variant="ghost" onClick={onEdit}>
					Edit
				</Button>
			)}
			<Button variant="danger" onClick={onDelete}>
				Delete
			</Button>
			{isPending && (
				<Button variant="primary" onClick={onMarkPaid}>
					Mark as Paid
				</Button>
			)}
		</div>
	);
}

// ── Mobile action bar (fixed bottom) ─────────────────────────────────────────
function MobileActionBar({ invoice, onEdit, onDelete, onMarkPaid }) {
	const isPaid = invoice.status === "paid";
	const isPending = invoice.status === "pending";
	return (
		<div
			className="
        lg:hidden fixed bottom-0 left-0 right-0 z-20
        flex items-center gap-2 px-6 py-5
        bg-light-surface
        shadow-[0_-4px_16px_rgba(0,0,0,0.08)]
      "
		>
			{!isPaid && (
				<Button variant="ghost" onClick={onEdit}>
					Edit
				</Button>
			)}
			<Button variant="danger" onClick={onDelete}>
				Delete
			</Button>
			{isPending && (
				<Button
					variant="primary"
					onClick={onMarkPaid}
					className="ml-auto px-6 py-4"
				>
					Mark as Paid
				</Button>
			)}
		</div>
	);
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function InvoiceDetailPage({ invoiceId, onBack }) {
	const { getInvoice, updateInvoice, deleteInvoice, markAsPaid } =
		useInvoices();
	const [editOpen, setEditOpen] = useState(false);
	const [deleteOpen, setDeleteOpen] = useState(false);

	const invoice = getInvoice(invoiceId);

	if (!invoice) {
		return (
			<div className="max-w-182.5 mx-auto px-6 py-14 text-center text-body">
				Invoice not found.
			</div>
		);
	}

	const handleDelete = () => {
		deleteInvoice(invoiceId);
		setDeleteOpen(false);
		onBack();
	};

	const handleSave = (data) => {
		updateInvoice(invoiceId, data);
		setEditOpen(false);
	};

	// Draft passed through edit uses draft (same handler, status moves to pending)
	const handleDraft = (data) => {
		updateInvoice(invoiceId, data);
		setEditOpen(false);
	};

	return (
		<>
			<motion.div
				initial={{ opacity: 0, y: 12 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.25 }}
				className="max-w-182.5 mx-auto px-6 py-8 sm:py-14
                   pb-32 lg:pb-14 mb-20" /* space for mobile action bar */
			>
				{/* ── Go back ── */}
				<button
					onClick={onBack}
					className="flex items-center gap-4 text-xs font-bold text-heading hover:text-label
                     transition-colors mb-8 cursor-pointer
                     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple rounded"
				>
					{/* <BackArrow /> */}
					<ChevronLeft />
					Go back
				</button>

				{/* ── Status row ── */}
				<div
					className="flex items-center justify-between bg-surface rounded-[8px] px-6 sm:px-8 py-5 mb-4
                     shadow-card"
				>
					<span className="text-xs text-body">Status</span>
					<div className="flex items-center gap-4">
						<Badge status={invoice.status} />
						<DesktopActions
							invoice={invoice}
							onEdit={() => setEditOpen(true)}
							onDelete={() => setDeleteOpen(true)}
							onMarkPaid={() => markAsPaid(invoiceId)}
						/>
					</div>
				</div>

				{/* ── Main card ── */}
				<div className="bg-surface rounded-[8px] px-6 sm:px-8 pt-8 pb-10 shadow-card">
					{/* Top row: ID + sender */}
					<div className="flex flex-col sm:flex-row sm:justify-between gap-6 sm:gap-0 mb-8">
						<div>
							<p className="text-sm font-bold text-heading mb-1">
								<span className="text-label">#</span>
								{invoice.id}
							</p>
							<p className="text-xs text-body">{invoice.description}</p>
						</div>
						<AddressBlock address={invoice.senderAddress} />
					</div>

					{/* Meta grid */}
					<dl className="grid grid-cols-2 sm:grid-cols-3 gap-8 mb-10">
						<MetaCell
							label="Invoice Date"
							value={formatDate(invoice.createdAt)}
						/>
						<MetaCell
							label="Payment Due"
							value={formatDate(invoice.paymentDue)}
							className="row-start-2 sm:row-start-auto"
						/>

						<div className="row-span-2 sm:row-span-1">
							<dt className="text-xs text-body mb-2">Bill To</dt>
							<dd>
								<p className="text-sm font-bold text-heading mb-2">
									{invoice.clientName}
								</p>
								<AddressBlock address={invoice.clientAddress} />
							</dd>
						</div>

						<div className="col-span-2 sm:col-span-1">
							<dt className="text-xs text-body mb-2">Sent to</dt>
							<dd className="text-sm font-bold text-heading break-all">
								{invoice.clientEmail}
							</dd>
						</div>
					</dl>

					{/* Items table */}
					<ItemsTable items={invoice.items} total={invoice.total} />
				</div>
			</motion.div>

			{/* ── Mobile action bar (fixed bottom) ── */}
			<MobileActionBar
				invoice={invoice}
				onEdit={() => setEditOpen(true)}
				onDelete={() => setDeleteOpen(true)}
				onMarkPaid={() => markAsPaid(invoiceId)}
			/>

			{/* ── Edit drawer ── */}
			<InvoiceDrawer
				open={editOpen}
				mode="edit"
				invoice={invoice}
				onClose={() => setEditOpen(false)}
				onSave={handleSave}
				onDraft={handleDraft}
			/>

			{/* ── Delete confirmation modal ── */}
			<DeleteModal
				invoiceId={invoice.id}
				open={deleteOpen}
				onOpenChange={setDeleteOpen}
				onConfirm={handleDelete}
			/>
		</>
	);
}
