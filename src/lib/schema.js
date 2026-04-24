import { z } from "zod";

const noDigits = (msg = "no numbers allowed") =>
	z.string().refine((val) => !/\d/.test(val), { message: msg });

const textField = (emptyMsg = "can't be empty") =>
	z
		.string()
		.min(1, emptyMsg)
		.refine((val) => !/\d/.test(val), { message: "no numbers allowed" });

const addressSchema = z.object({
	street: z.string().min(1, "can't be empty"),
	city: textField(),
	postCode: z.string().min(1, "can't be empty"),
	country: textField(),
});

export const itemSchema = z.object({
	id: z.string().optional(),
	name: textField(),
	quantity: z.coerce.number().min(1, "min 1"),
	price: z.coerce.number().min(0, "min 0"),
	total: z.coerce.number().optional(),
});

export const invoiceSchema = z.object({
	senderAddress: addressSchema,
	clientName: textField(),
	clientEmail: z.string().email("invalid email"),
	clientAddress: addressSchema,
	createdAt: z.string().min(1, "can't be empty"),
	paymentTerms: z.coerce.number(),
	description: z.string().min(1, "can't be empty"),
	items: z.array(itemSchema).min(1, "An item must be added"),
});

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
