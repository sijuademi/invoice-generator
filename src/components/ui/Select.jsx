import * as SelectPrimitive from "@radix-ui/react-select";
import { cn } from "../../lib/utils";

const ChevronDown = () => (
	<svg width="11" height="7" viewBox="0 0 11 7" fill="none">
		<path
			d="M1 1l4.228 4.228L9.456 1"
			stroke="#7C5DFA"
			strokeWidth="2"
			strokeLinecap="round"
		/>
	</svg>
);

export function Select({
	value,
	onValueChange,
	options,
	placeholder,
	className,
}) {
	return (
		<SelectPrimitive.Root value={value} onValueChange={onValueChange}>
			<SelectPrimitive.Trigger
				className={cn(
					"flex w-full items-center justify-between",
					"bg-surface-alt border border-border rounded-sm",
					"text-heading text-xs font-bold px-4 py-3",
					"outline-none transition-colors duration-150",
					"focus:border-brand-purple data-[state=open]:border-brand-purple",
					"cursor-pointer",
					className,
				)}
			>
				<SelectPrimitive.Value placeholder={placeholder} />
				<SelectPrimitive.Icon>
					<ChevronDown />
				</SelectPrimitive.Icon>
			</SelectPrimitive.Trigger>

			<SelectPrimitive.Portal>
				<SelectPrimitive.Content
					position="popper"
					sideOffset={4}
					className={cn(
						"z-50 w-[var(--radix-select-trigger-width)]",
						"bg-surface rounded-[8px] shadow-card overflow-hidden",
						"border border-border",
					)}
				>
					<SelectPrimitive.Viewport>
						{options.map((opt) => (
							<SelectPrimitive.Item
								key={opt.value}
								value={opt.value}
								className={cn(
									"px-4 py-3 text-xs font-bold text-heading",
									"cursor-pointer outline-none select-none",
									"border-b border-border last:border-none",
									"hover:text-brand-purple transition-colors",
									"data-[highlighted]:text-brand-purple data-[highlighted]:bg-surface-alt",
								)}
							>
								<SelectPrimitive.ItemText>{opt.label}</SelectPrimitive.ItemText>
							</SelectPrimitive.Item>
						))}
					</SelectPrimitive.Viewport>
				</SelectPrimitive.Content>
			</SelectPrimitive.Portal>
		</SelectPrimitive.Root>
	);
}
