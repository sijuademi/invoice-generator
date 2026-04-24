import { z } from "zod";

// Reusable refinement — rejects strings that contain any digit
const noDigits = (msg = "no numbers allowed") =>
	z.string().refine((val) => !/\d/.test(val), { message: msg });

// Text-only field: non-empty + no digits
const textField = (emptyMsg = "can't be empty") =>
	z
		.string()
		.min(1, emptyMsg)
		.refine((val) => !/\d/.test(val), { message: "no numbers allowed" });

const addressSchema = z.object({
	street: z.string().min(1, "can't be empty"), // streets can have numbers
	city: textField(),
	postCode: z.string().min(1, "can't be empty"), // postcodes need numbers
	country: textField(),
});

export const itemSchema = z.object({
	id: z.string().optional(),
	name: textField(), // item names: no digits
	quantity: z.coerce.number().min(1, "min 1"),
	price: z.coerce.number().min(0, "min 0"),
	total: z.coerce.number().optional(),
});

// Full validation (Save & Send / Save Changes)
export const invoiceSchema = z.object({
	senderAddress: addressSchema,
	clientName: textField(), // client name: no digits
	clientEmail: z.string().email("invalid email"),
	clientAddress: addressSchema,
	createdAt: z.string().min(1, "can't be empty"),
	paymentTerms: z.coerce.number(),
	description: z.string().min(1, "can't be empty"),
	items: z.array(itemSchema).min(1, "An item must be added"),
});

// Draft validation — all fields optional
export const draftSchema = invoiceSchema.partial();

export const defaultValues = {
	senderAddress: { street: "", city: "", postCode: "", country: "" },
	clientName: "",
	clientEmail: "",
	clientAddress: { street: "", city: "", postCode: "", country: "" },
	createdAt: new Date().toISOString().split("T")[0],
	paymentTerms: 30,
	description: "",
	items: [{ name: "", quantity: 1, price: "", total: 0 }],
};
