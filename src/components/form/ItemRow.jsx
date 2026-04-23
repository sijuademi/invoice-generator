import { useState } from "react";
import { brand } from "../../constants/theme";
import { FormInput } from "./FormInput";

function TrashButton({ onClick, t }) {
	const [hov, setHov] = useState(false);
	return (
		<button
			onClick={onClick}
			onMouseEnter={() => setHov(true)}
			onMouseLeave={() => setHov(false)}
			style={{
				background: "none",
				border: "none",
				cursor: "pointer",
				padding: "4px 6px",
				display: "flex",
				alignItems: "center",
				alignSelf: "flex-end",
				paddingBottom: 14,
			}}
		>
			<svg width="13" height="16" viewBox="0 0 13 16">
				<path
					d="M11.583 3.556v10.666c0 .982-.795 1.778-1.777 1.778H2.694a1.777 1.777 0 01-1.777-1.778V3.556h10.666zM8.473 0l.888.889H13v1.778H0V.889h3.64L4.528 0h3.945z"
					fill={hov ? brand.red : t.body}
					style={{ transition: "fill 150ms" }}
				/>
			</svg>
		</button>
	);
}

export function ItemRow({ item, index, onChange, onRemove, errors, t }) {
	const lineTotal = (parseFloat(item.price) || 0) * item.qty;

	return (
		<div
			style={{
				display: "grid",
				gridTemplateColumns: "1fr 64px 120px 80px 32px",
				gap: 12,
				alignItems: "end",
				marginBottom: 16,
			}}
		>
			<FormInput
				value={item.name}
				onChange={onChange(item.id, "name")}
				error={errors[`item_${index}_name`]}
				placeholder="Item name"
				t={t}
			/>
			<FormInput
				type="number"
				value={item.qty}
				onChange={onChange(item.id, "qty")}
				placeholder="1"
				t={t}
				inputStyle={{ textAlign: "center" }}
			/>
			<FormInput
				type="number"
				value={item.price}
				onChange={onChange(item.id, "price")}
				error={errors[`item_${index}_price`]}
				placeholder="0.00"
				t={t}
			/>

			{/* Derived total — read-only */}
			<div
				style={{
					display: "flex",
					alignItems: "center",
					height: "100%",
					paddingBottom: 2,
					color: t.label,
					fontSize: 12,
					fontWeight: 700,
				}}
			>
				{lineTotal.toFixed(2)}
			</div>

			<TrashButton onClick={() => onRemove(item.id)} t={t} />
		</div>
	);
}
