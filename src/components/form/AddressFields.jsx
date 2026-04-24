// import { useFormContext, Controller } from "react-hook-form";
// import { useTheme } from "../../contextapi/ThemeContext";
// import { themes } from "../../constants/theme";
// import { FormInput } from "./FormInput";

// export function AddressFields({ prefix }) {
// 	const {
// 		control,
// 		formState: { errors },
// 	} = useFormContext();
// 	const { isDark } = useTheme();
// 	const t = isDark ? themes.dark : themes.light;

// 	const fieldName = (key) => `${prefix}.${key}`;

// 	return (
// 		<div>
// 			<div style={{ marginBottom: 20 }}>
// 				<Controller
// 					name={fieldName("street")}
// 					control={control}
// 					render={({ field }) => (
// 						<FormInput
// 							label="Street Address"
// 							value={field.value || ""}
// 							onChange={field.onChange}
// 							error={errors[prefix]?.street?.message}
// 							placeholder="e.g. 19 Union Terrace"
// 							t={t}
// 						/>
// 					)}
// 				/>
// 			</div>

// 			<div style={{ display: "flex", gap: 16 }}>
// 				<div style={{ flex: 1 }}>
// 					<Controller
// 						name={fieldName("city")}
// 						control={control}
// 						render={({ field }) => (
// 							<FormInput
// 								label="City"
// 								value={field.value || ""}
// 								onChange={field.onChange}
// 								error={errors[prefix]?.city?.message}
// 								placeholder="e.g. London"
// 								t={t}
// 							/>
// 						)}
// 					/>
// 				</div>
// 				<div style={{ flex: 1 }}>
// 					<Controller
// 						name={fieldName("postCode")}
// 						control={control}
// 						render={({ field }) => (
// 							<FormInput
// 								label="Post Code"
// 								value={field.value || ""}
// 								onChange={field.onChange}
// 								error={errors[prefix]?.postCode?.message}
// 								placeholder="e.g. E1 3EZ"
// 								t={t}
// 							/>
// 						)}
// 					/>
// 				</div>
// 				<div style={{ flex: 1 }}>
// 					<Controller
// 						name={fieldName("country")}
// 						control={control}
// 						render={({ field }) => (
// 							<FormInput
// 								label="Country"
// 								value={field.value || ""}
// 								onChange={field.onChange}
// 								error={errors[prefix]?.country?.message}
// 								placeholder="e.g. United Kingdom"
// 								t={t}
// 							/>
// 						)}
// 					/>
// 				</div>
// 			</div>
// 		</div>
// 	);

import { useFormContext } from "react-hook-form";
import { FormField, Input } from "../ui/Input";

// Prevent digit keypresses on text-only fields.
// Allows letters, spaces, hyphens, apostrophes, accented characters, and all control keys.
const blockDigits = (e) => {
	if (/\d/.test(e.key) && !e.ctrlKey && !e.metaKey) e.preventDefault();
};

/**
 * prefix: "senderAddress" | "clientAddress"
 */
export function AddressFields({ prefix }) {
	const {
		register,
		formState: { errors },
	} = useFormContext();
	const e = errors[prefix] ?? {};

	return (
		<div className="flex flex-col gap-5">
			{/* Street — numbers allowed (e.g. "19 Union Terrace") */}
			<FormField
				label="Street Address"
				htmlFor={`${prefix}.street`}
				error={e.street?.message}
			>
				<Input
					id={`${prefix}.street`}
					error={e.street?.message}
					{...register(`${prefix}.street`)}
				/>
			</FormField>

			{/* City / Post Code / Country */}
			<div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
				{/* City — no digits */}
				<FormField
					label="City"
					htmlFor={`${prefix}.city`}
					error={e.city?.message}
				>
					<Input
						id={`${prefix}.city`}
						error={e.city?.message}
						onKeyDown={blockDigits}
						{...register(`${prefix}.city`)}
					/>
				</FormField>

				{/* Post Code — digits allowed */}
				<FormField
					label="Post Code"
					htmlFor={`${prefix}.postCode`}
					error={e.postCode?.message}
				>
					<Input
						id={`${prefix}.postCode`}
						error={e.postCode?.message}
						{...register(`${prefix}.postCode`)}
					/>
				</FormField>

				{/* Country — no digits */}
				<FormField
					label="Country"
					htmlFor={`${prefix}.country`}
					error={e.country?.message}
					className="col-span-2 sm:col-span-1"
				>
					<Input
						id={`${prefix}.country`}
						error={e.country?.message}
						onKeyDown={blockDigits}
						{...register(`${prefix}.country`)}
					/>
				</FormField>
			</div>
		</div>
	);
}
