import { forwardRef } from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cn } from "../../lib/utils";

// ── Label ─────────────────────────────────────────────────────────────────────
export function FieldLabel({
	className,
	error,
	children,
	rightSlot,
	...props
}) {
	return (
		<LabelPrimitive.Root
			className={cn(
				"flex items-center justify-between",
				"text-xs font-medium tracking-tight mb-1.5",
				error ? "text-brand-red" : "text-light-label",
				className,
			)}
			{...props}
		>
			{children}
			{error && (
				<span className="text-brand-red text-[10px] font-semibold italic">
					{error}
				</span>
			)}
			{!error && rightSlot}
		</LabelPrimitive.Root>
	);
}

// ── Input ─────────────────────────────────────────────────────────────────────
export const Input = forwardRef(function Input(
	{ className, error, ...props },
	ref,
) {
	return (
		<input
			ref={ref}
			className={cn(
				"w-full bg-surface-alt border rounded-sm",
				"text-light-heading text-xs font-bold px-4 py-3",
				"placeholder:text-muted outline-none",
				"transition-colors duration-150",
				"focus:border-brand-purple",
				error ? "border-brand-red" : "border-light-border",
				className,
			)}
			{...props}
		/>
	);
});

// ── FormField: label + input stacked ─────────────────────────────────────────
export function FormField({ label, error, htmlFor, children, className }) {
	return (
		<div className={cn("flex flex-col", className)}>
			<FieldLabel htmlFor={htmlFor} error={error}>
				{label}
			</FieldLabel>
			{children}
		</div>
	);
}
