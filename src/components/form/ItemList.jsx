import { useFieldArray, useFormContext } from "react-hook-form";
import { Input, FormField } from "../ui/Input";
// import Button from "../ui/Button";
import { cn } from "../../lib/utils";

const TrashIcon = () => (
	<svg width="13" height="16" viewBox="0 0 13 16" aria-hidden>
		<path
			d="M11.583 3.556v10.666c0 .982-.795 1.778-1.777 1.778H2.694a1.777 1.777 0 01-1.777-1.778V3.556h10.666zM8.473 0l.888.889H13v1.778H0V.889h3.64L4.528 0h3.945z"
			className="fill-body group-hover:fill-brand-red transition-colors"
		/>
	</svg>
);

export function ItemList() {
	const {
		register,
		control,
		watch,
		formState: { errors },
	} = useFormContext();

	const { fields, append, remove } = useFieldArray({ control, name: "items" });

	const watchItems = watch("items");

	const lineTotal = (idx) => {
		const item = watchItems?.[idx];
		if (!item) return "0.00";
		return ((Number(item.quantity) || 0) * (Number(item.price) || 0)).toFixed(
			2,
		);
	};

	const itemErrors = errors.items;

	return (
		<section>
			<h3 className="text-[18px] font-bold text-[#777F98] mb-4">Item List</h3>

			{/* Column headers — hidden on mobile */}
			{fields.length > 0 && (
				<div className="hidden sm:grid grid-cols-[1fr_64px_120px_80px_32px] gap-3 mb-2">
					{["Item Name", "Qty.", "Price", "Total", ""].map((h, i) => (
						<span key={i} className="text-xs text-label font-medium">
							{h}
						</span>
					))}
				</div>
			)}

			{/* Rows */}
			<div className="flex flex-col gap-4 sm:gap-3">
				{fields.map((field, idx) => {
					const iErr = Array.isArray(itemErrors) ? itemErrors[idx] : undefined;
					return (
						<div
							key={field.id}
							className="grid grid-cols-[1fr_64px_32px] sm:grid-cols-[1fr_64px_120px_80px_32px] gap-3 items-end"
						>
							{/* Name */}
							<div className="col-span-3 sm:col-span-1">
								<span className="sm:hidden text-xs text-label font-medium block mb-[6px]">
									Item Name
								</span>
								<Input
									placeholder="Item name"
									error={iErr?.name?.message}
									{...register(`items.${idx}.name`)}
								/>
							</div>

							{/* Qty */}
							<div>
								<span className="sm:hidden text-xs text-label font-medium block mb-[6px]">
									Qty.
								</span>
								<Input
									type="number"
									min="1"
									placeholder="1"
									className="text-center"
									error={iErr?.quantity?.message}
									{...register(`items.${idx}.quantity`)}
								/>
							</div>

							{/* Price — hidden on mobile, shown next to qty */}
							<div className="hidden sm:block">
								<Input
									type="number"
									min="0"
									step="0.01"
									placeholder="0.00"
									error={iErr?.price?.message}
									{...register(`items.${idx}.price`)}
								/>
							</div>

							{/* Total */}
							<div className="hidden sm:flex items-center text-xs font-bold text-label pb-[14px]">
								£{lineTotal(idx)}
							</div>

							{/* Delete */}
							<button
								type="button"
								aria-label={`Remove item ${idx + 1}`}
								onClick={() => remove(idx)}
								className="group flex items-end pb-[14px] justify-center cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red rounded"
							>
								<TrashIcon />
							</button>

							{/* Mobile: price row */}
							<div className="sm:hidden col-span-3 grid grid-cols-2 gap-3">
								<FormField
									label="Price"
									htmlFor={`items.${idx}.price`}
									error={iErr?.price?.message}
								>
									<Input
										id={`items.${idx}.price`}
										type="number"
										min="0"
										step="0.01"
										placeholder="0.00"
										error={iErr?.price?.message}
										{...register(`items.${idx}.price`)}
									/>
								</FormField>
								<div className="flex flex-col justify-end pb-1">
									<span className="text-xs text-label font-medium mb-[6px]">
										Total
									</span>
									<span className="text-xs font-bold text-label py-3">
										£{lineTotal(idx)}
									</span>
								</div>
							</div>
						</div>
					);
				})}
			</div>

			{/* Add button */}
			<button
				type="button"
				onClick={() =>
					append({ id: crypto.randomUUID(), name: "", quantity: 1, price: 0 })
				}
				className={cn(
					"mt-4 w-full py-[14px] rounded-[24px]",
					"bg-surface-alt hover:bg-border",
					"text-xs font-bold text-label hover:text-heading",
					"transition-colors duration-150 cursor-pointer",
					"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple",
				)}
			>
				+ Add New Item
			</button>

			{/* Array-level error */}
			{typeof itemErrors?.message === "string" && (
				<p className="mt-3 text-[10px] font-semibold text-brand-red italic">
					— {itemErrors.message}
				</p>
			)}
		</section>
	);
}
