import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
	return twMerge(clsx(inputs));
}

export function formatDate(dateStr) {
	if (!dateStr) return "";
	return new Date(dateStr).toLocaleDateString("en-GB", {
		day: "2-digit",
		month: "short",
		year: "numeric",
	});
}

export function formatCurrency(amount) {
	return new Intl.NumberFormat("en-GB", {
		style: "currency",
		currency: "GBP",
		minimumFractionDigits: 2,
	}).format(amount);
}

export function addDays(dateStr, days) {
	const date = new Date(dateStr);
	date.setDate(date.getDate() + days);
	return date.toISOString().split("T")[0];
}

export function generateId() {
	const L = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	return (
		L[Math.floor(Math.random() * 26)] +
		L[Math.floor(Math.random() * 26)] +
		Math.floor(1000 + Math.random() * 9000)
	);
}

export function computeTotal(items = []) {
	return items.reduce(
		(sum, i) =>
			sum + (parseFloat(i.price) || 0) * (parseInt(i.quantity, 10) || 0),
		0,
	);
}
