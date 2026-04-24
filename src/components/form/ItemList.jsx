import { useFieldArray, useFormContext } from "react-hook-form";
import { Input } from "../ui/Input";
import { cn } from "../../lib/utils";
import { Trash } from "lucide-react";

const blockDigits = (e) => {
	if (/\d/.test(e.key) && !e.ctrlKey && !e.metaKey) e.preventDefault();
};

const TrashIcon = () => (
	<svg width="13" height="16" viewBox="0 0 13 16" aria-hidden>
		<path
			d="M11.583 3.556v10.666c0 .982-.795 1.778-1.777 1.778H2.694a1.777 1.777 0 01-1.777-1.778V3.556h10.666zM8.473 0l.888.889H13v1.778H0V.889h3.64L4.528 0h3.945z"
			className="fill-light-body group-hover:fill-brand-red transition-colors"
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
			<h3 className="text-[18px] font-bold text-[#777F98] mb-5">Item List</h3>

			{fields.length > 0 && (
				<div className="hidden sm:grid sm:grid-cols-[1fr_64px_120px_80px_32px] gap-4 mb-3">
					{["Item Name", "Qty.", "Price", "Total", ""].map((h, i) => (
						<span key={i} className="text-xs text-light-label font-medium">
							{h}
						</span>
					))}
				</div>
			)}

			<div className="flex flex-col gap-6 sm:gap-4">
				{fields.map((field, idx) => {
					const iErr = Array.isArray(itemErrors) ? itemErrors[idx] : undefined;

					return (
						<div key={field.id}>
							<div
								className={cn(
									"grid gap-x-4 gap-y-3",
									// Mobile grid
									"grid-cols-[1fr_72px_80px_28px]",
									"[grid-template-areas:'name_name_name_del''qty_price_total_del']",
									// Desktop grid
									"sm:grid-cols-[1fr_64px_120px_80px_32px]",
									"sm:grid-rows-1",
									"sm:[grid-template-areas:'name_qty_price_total_del']",
									"sm:items-end",
								)}
							>
								<div className="[grid-area:name]">
									<label
										htmlFor={`items.${idx}.name`}
										className="sm:hidden block text-xs text-light-label font-medium mb-1.5"
									>
										Item Name
									</label>
									<Input
										id={`items.${idx}.name`}
										placeholder="Item name"
										error={iErr?.name?.message}
										onKeyDown={blockDigits}
										{...register(`items.${idx}.name`)}
									/>
								</div>

								<div className="[grid-area:qty]">
									<label
										htmlFor={`items.${idx}.quantity`}
										className="sm:hidden block text-xs text-light-label font-medium mb-1.5"
									>
										Qty.
									</label>
									<Input
										id={`items.${idx}.quantity`}
										inputMode="numeric"
										placeholder="1"
										className="text-center"
										error={iErr?.quantity?.message}
										{...register(`items.${idx}.quantity`)}
									/>
								</div>

								<div className="[grid-area:price]">
									<label
										htmlFor={`items.${idx}.price`}
										className="sm:hidden block text-xs text-light-label font-medium mb-1.5"
									>
										Price
									</label>
									<Input
										id={`items.${idx}.price`}
										inputMode="decimal"
										placeholder="0.00"
										error={iErr?.price?.message}
										{...register(`items.${idx}.price`)}
									/>
								</div>

								<div className="[grid-area:total] flex flex-col justify-end">
									<span className="sm:hidden text-xs text-light-label font-medium mb-1.5">
										Total
									</span>
									<span className="text-xs font-bold text-light-label py-3 leading-none">
										£{lineTotal(idx)}
									</span>
								</div>

								<button
									type="button"
									aria-label={`Remove item ${idx + 1}`}
									onClick={() => remove(idx)}
									className={cn(
										"[grid-area:del]",
										"group flex items-end justify-center pb-3.5",
										"row-span-2 sm:row-span-1",
										"cursor-pointer rounded",
										"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red",
									)}
								>
									<TrashIcon />
								</button>
							</div>

							{(iErr?.name || iErr?.quantity || iErr?.price) && (
								<ul className="mt-2 space-y-0.5">
									{iErr?.name?.message && (
										<li className="text-[10px] font-semibold italic text-brand-red">
											Name — {iErr.name.message}
										</li>
									)}
									{iErr?.quantity?.message && (
										<li className="text-[10px] font-semibold italic text-brand-red">
											Qty — {iErr.quantity.message}
										</li>
									)}
									{iErr?.price?.message && (
										<li className="text-[10px] font-semibold italic text-brand-red">
											Price — {iErr.price.message}
										</li>
									)}
								</ul>
							)}
						</div>
					);
				})}
			</div>

			<button
				type="button"
				onClick={() =>
					append({ id: crypto.randomUUID(), name: "", quantity: 1, price: "" })
				}
				className={cn(
					"mt-5 w-full py-3.5 rounded-[24px]",
					"bg-surface-alt hover:bg-border",
					"text-xs font-bold text-light-label hover:text-heading",
					"change cursor-pointer",
					"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple",
				)}
			>
				+ Add New Item
			</button>

			{typeof itemErrors?.message === "string" && (
				<p className="mt-3 text-[10px] font-semibold italic text-brand-red">
					— {itemErrors.message}
				</p>
			)}
		</section>
	);
}
