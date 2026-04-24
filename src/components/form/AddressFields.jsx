import { useFormContext } from "react-hook-form";
import { FormField, Input } from "../ui/Input";

const blockDigits = (e) => {
	if (/\d/.test(e.key) && !e.ctrlKey && !e.metaKey) e.preventDefault();
};

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

			<div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
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
