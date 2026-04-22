import { z } from "zod";

const addressSchema = z.object({
	street: z.string().min(1, "can't be empty"),
	city: z.string().min(1, "can't be empty"),
	postCode: z.string().min(1, "can't be empty"),
	country: z.string().min(1, "can't be empty"),
});

const itemSchema = z.object({
	name: z.string().min(1, "can't be empty"),
	quantity: z.coerce.number().min(1, "min 1"),
	price: z.coerce.number().min(0, "min 0"),
	total: z.coerce.number().optional(),
});

// Full validation (Save & Send / Save Changes)
export const invoiceSchema = z.object({
	senderAddress: addressSchema,
	clientName: z.string().min(1, "can't be empty"),
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
	items: [{ name: "", quantity: 1, price: 0, total: 0 }],
};
