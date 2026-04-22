// invoiceDefaults.js
// Problem: default / seed data is scattered and recreated inline wherever needed.
// Solution: one place to define the empty state and the edit seed.

const uid = () =>
	Math.random().toString(36).slice(2, 4).toUpperCase() +
	Math.floor(1000 + Math.random() * 9000);

export const emptyItem = () => ({ id: uid(), name: "", qty: 1, price: "" });

export const PAYMENT_TERMS = [
	{ value: "1", label: "Net 1 Day" },
	{ value: "7", label: "Net 7 Days" },
	{ value: "14", label: "Net 14 Days" },
	{ value: "30", label: "Net 30 Days" },
];

export const defaultInvoice = () => ({
	fromStreet: "",
	fromCity: "",
	fromPostCode: "",
	fromCountry: "",
	clientName: "",
	clientEmail: "",
	toStreet: "",
	toCity: "",
	toPostCode: "",
	toCountry: "",
	invoiceDate: new Date().toISOString().split("T")[0],
	paymentTerms: "30",
	description: "",
	items: [emptyItem()],
});

// Pre-filled data used when opening an existing invoice for editing.
export const editSeed = {
	fromStreet: "19 Union Terrace",
	fromCity: "London",
	fromPostCode: "E1 3EZ",
	fromCountry: "United Kingdom",
	clientName: "Alex Grim",
	clientEmail: "alexgrim@mail.com",
	toStreet: "84 Church Way",
	toCity: "Bradford",
	toPostCode: "BD1 9PB",
	toCountry: "United Kingdom",
	invoiceDate: "2021-08-21",
	paymentTerms: "30",
	description: "Graphic Design",
	items: [
		{ id: "A1", name: "Banner Design", qty: 1, price: "156.00" },
		{ id: "A2", name: "Email Design", qty: 2, price: "200.00" },
	],
};
