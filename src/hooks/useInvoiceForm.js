// hooks/useInvoiceForm.js
// Problem: form state, validation logic, and item mutations are entangled with render code.
// Solution: extract everything into one hook; components only call what they need.

import { useState, useCallback } from "react";
import { emptyItem } from "../constants/invoiceDefaults";

function validate(form) {
	const e = {};
	if (!form.fromStreet) e.fromStreet = "can't be empty";
	if (!form.fromCity) e.fromCity = "can't be empty";
	if (!form.fromPostCode) e.fromPostCode = "can't be empty";
	if (!form.fromCountry) e.fromCountry = "can't be empty";
	if (!form.clientName) e.clientName = "can't be empty";
	if (!form.clientEmail) e.clientEmail = "can't be empty";
	if (!form.toStreet) e.toStreet = "can't be empty";
	if (!form.toCity) e.toCity = "can't be empty";
	if (!form.toPostCode) e.toPostCode = "can't be empty";
	if (!form.toCountry) e.toCountry = "can't be empty";
	if (!form.description) e.description = "can't be empty";
	form.items.forEach((item, i) => {
		if (!item.name) e[`item_${i}_name`] = "can't be empty";
		if (!item.price || isNaN(parseFloat(item.price)))
			e[`item_${i}_price`] = "invalid";
	});
	return e;
}

export function useInvoiceForm(initialData, { onSave, onDraft, onClose }) {
	const [form, setForm] = useState(initialData);
	const [errors, setErrors] = useState({});
	const [didSubmit, setDidSubmit] = useState(false);

	// Update a top-level field.
	const setField = useCallback(
		(field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value })),
		[],
	);

	// Update one property of one item row.
	const setItem = useCallback(
		(id, field) => (e) => {
			const value = e.target.value;
			setForm((f) => ({
				...f,
				items: f.items.map((item) =>
					item.id === id ? { ...item, [field]: value } : item,
				),
			}));
		},
		[],
	);

	const addItem = () =>
		setForm((f) => ({ ...f, items: [...f.items, emptyItem()] }));
	const removeItem = (id) =>
		setForm((f) => ({ ...f, items: f.items.filter((i) => i.id !== id) }));

	const handleSave = () => {
		setDidSubmit(true);
		const e = validate(form);
		setErrors(e);
		if (Object.keys(e).length === 0) onSave(form);
	};

	const handleDraft = () => onDraft(form); // drafts bypass validation
	const handleClose = () => onClose();

	return {
		form,
		errors,
		didSubmit,
		setField,
		setItem,
		addItem,
		removeItem,
		handleSave,
		handleDraft,
		handleClose,
	};
}
