import {
	createContext,
	useContext,
	useState,
	useEffect,
	useCallback,
} from "react";
import seedData from "../components/data/data.json";
import { generateId, addDays, computeTotal } from "../lib/utils";

const STORAGE_KEY = "invoice-app-data";
const InvoiceContext = createContext(null);

function loadInvoices() {
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		return raw ? JSON.parse(raw) : seedData;
	} catch {
		return seedData;
	}
}

function saveInvoices(list) {
	localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

function normaliseItems(items = []) {
	return items.map((item) => ({
		...item,
		id: item.id ?? crypto.randomUUID(),
		quantity: Number(item.quantity) || 0,
		price: Number(item.price) || 0,
		total: (Number(item.quantity) || 0) * (Number(item.price) || 0),
	}));
}

export function InvoiceProvider({ children }) {
	const [allInvoices, setAllInvoices] = useState(loadInvoices);
	const [filter, setFilter] = useState([]); // [] = show all

	// Persist every time allInvoices changes
	useEffect(() => {
		saveInvoices(allInvoices);
	}, [allInvoices]);

	// Public filtered list – this is what pages consume as "invoices"
	const invoices =
		filter.length === 0
			? allInvoices
			: allInvoices.filter((inv) => filter.includes(inv.status));

	// ── Read ────────────────────────────────────────────────────────────────────
	const getInvoice = useCallback(
		(id) => allInvoices.find((inv) => inv.id === id) ?? null,
		[allInvoices],
	);

	// ── Create ──────────────────────────────────────────────────────────────────
	const createInvoice = useCallback((formData, status = "pending") => {
		const items = normaliseItems(formData.items);
		const createdAt =
			formData.createdAt || new Date().toISOString().split("T")[0];
		const paymentTerms = Number(formData.paymentTerms) || 30;
		const invoice = {
			id: generateId(),
			createdAt,
			paymentDue: addDays(createdAt, paymentTerms),
			description: formData.description || "",
			paymentTerms,
			clientName: formData.clientName || "",
			clientEmail: formData.clientEmail || "",
			status,
			senderAddress: formData.senderAddress || {
				street: "",
				city: "",
				postCode: "",
				country: "",
			},
			clientAddress: formData.clientAddress || {
				street: "",
				city: "",
				postCode: "",
				country: "",
			},
			items,
			total: computeTotal(items),
		};
		setAllInvoices((prev) => [invoice, ...prev]);
		return invoice;
	}, []);

	// ── Update ──────────────────────────────────────────────────────────────────
	// Drafts automatically move to "pending" on save; paid invoices stay paid.
	const updateInvoice = useCallback((id, formData) => {
		setAllInvoices((prev) =>
			prev.map((inv) => {
				if (inv.id !== id) return inv;
				const items = normaliseItems(formData.items ?? inv.items);
				const paymentTerms = Number(formData.paymentTerms) || inv.paymentTerms;
				const createdAt = formData.createdAt || inv.createdAt;
				const nextStatus = inv.status === "draft" ? "pending" : inv.status;
				return {
					...inv,
					...formData,
					id,
					items,
					paymentTerms,
					createdAt,
					paymentDue: addDays(createdAt, paymentTerms),
					total: computeTotal(items),
					status: nextStatus,
				};
			}),
		);
	}, []);

	// ── Delete ──────────────────────────────────────────────────────────────────
	const deleteInvoice = useCallback((id) => {
		setAllInvoices((prev) => prev.filter((inv) => inv.id !== id));
	}, []);

	// ── Mark as Paid ────────────────────────────────────────────────────────────
	const markAsPaid = useCallback((id) => {
		setAllInvoices((prev) =>
			prev.map((inv) =>
				inv.id === id && inv.status === "pending"
					? { ...inv, status: "paid" }
					: inv,
			),
		);
	}, []);

	return (
		<InvoiceContext.Provider
			value={{
				invoices,
				allInvoices,
				filter,
				setFilter,
				getInvoice,
				createInvoice,
				updateInvoice,
				deleteInvoice,
				markAsPaid,
			}}
		>
			{children}
		</InvoiceContext.Provider>
	);
}

export const useInvoices = () => {
	const ctx = useContext(InvoiceContext);
	if (!ctx) throw new Error("useInvoices must be inside InvoiceProvider");
	return ctx;
};
