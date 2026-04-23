// components/form/AddressFields.jsx
// Problem: the exact same four-field address layout (street, then city/postcode/country
//          in a row) is needed for both "Bill From" and "Bill To".
// Solution: accept a field-name prefix and render once, using react-hook-form context.

import { useFormContext, Controller } from "react-hook-form";
import { useTheme } from "../../contextapi/ThemeContext";
import { themes } from "../../constants/theme";
import { FormInput } from "./FormInput";

export function AddressFields({ prefix }) {
	const {
		control,
		formState: { errors },
	} = useFormContext();
	const { isDark } = useTheme();
	const t = isDark ? themes.dark : themes.light;

	// Field names for nested address object (e.g., "senderAddress.street")
	const fieldName = (key) => `${prefix}.${key}`;

	return (
		<div>
			{/* Street — full width */}
			<div style={{ marginBottom: 20 }}>
				<Controller
					name={fieldName("street")}
					control={control}
					render={({ field }) => (
						<FormInput
							label="Street Address"
							value={field.value || ""}
							onChange={field.onChange}
							error={errors[prefix]?.street?.message}
							placeholder="e.g. 19 Union Terrace"
							t={t}
						/>
					)}
				/>
			</div>

			{/* City / Post Code / Country — three columns */}
			<div style={{ display: "flex", gap: 16 }}>
				<div style={{ flex: 1 }}>
					<Controller
						name={fieldName("city")}
						control={control}
						render={({ field }) => (
							<FormInput
								label="City"
								value={field.value || ""}
								onChange={field.onChange}
								error={errors[prefix]?.city?.message}
								placeholder="e.g. London"
								t={t}
							/>
						)}
					/>
				</div>
				<div style={{ flex: 1 }}>
					<Controller
						name={fieldName("postCode")}
						control={control}
						render={({ field }) => (
							<FormInput
								label="Post Code"
								value={field.value || ""}
								onChange={field.onChange}
								error={errors[prefix]?.postCode?.message}
								placeholder="e.g. E1 3EZ"
								t={t}
							/>
						)}
					/>
				</div>
				<div style={{ flex: 1 }}>
					<Controller
						name={fieldName("country")}
						control={control}
						render={({ field }) => (
							<FormInput
								label="Country"
								value={field.value || ""}
								onChange={field.onChange}
								error={errors[prefix]?.country?.message}
								placeholder="e.g. United Kingdom"
								t={t}
							/>
						)}
					/>
				</div>
			</div>
		</div>
	);
}
