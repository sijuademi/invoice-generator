import { useState } from "react";
import * as Popover from "@radix-ui/react-popover";
import * as Checkbox from "@radix-ui/react-checkbox";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../lib/utils";

const STATUSES = ["draft", "pending", "paid"];

const CheckIcon = () => (
	<svg width="10" height="8" viewBox="0 0 10 8">
		<path
			d="M1 4l3 3 5-6"
			stroke="#fff"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			fill="none"
		/>
	</svg>
);

const ChevronIcon = ({ open }) => (
	<motion.svg
		animate={{ rotate: open ? 180 : 0 }}
		transition={{ duration: 0.2 }}
		width="11"
		height="7"
		viewBox="0 0 11 7"
		fill="none"
	>
		<path
			d="M1 1l4.228 4.228L9.456 1"
			stroke="#7C5DFA"
			strokeWidth="2"
			strokeLinecap="round"
		/>
	</motion.svg>
);

export default function FilterDropdown({ filter, onChange }) {
	const [open, setOpen] = useState(false);

	const toggle = (status) => {
		onChange(
			filter.includes(status)
				? filter.filter((s) => s !== status)
				: [...filter, status],
		);
	};

	return (
		<Popover.Root open={open} onOpenChange={setOpen}>
			<Popover.Trigger asChild>
				<button
					className={cn(
						"flex items-center gap-3 font-bold text-light-heading",
						"hover:text-label transition-colors cursor-pointer",
						"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple rounded",
					)}
					aria-label="Filter invoices by status"
				>
					<span className="hidden sm:inline">Filter by status</span>
					<span className="sm:hidden">Filter</span>
					<ChevronIcon open={open} />
				</button>
			</Popover.Trigger>

			<AnimatePresence>
				{open && (
					<Popover.Portal forceMount>
						<Popover.Content asChild sideOffset={12} align="center">
							<motion.div
								initial={{ opacity: 0, y: -8 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -8 }}
								transition={{ duration: 0.18 }}
								className={cn(
									"z-30 bg-light-surface rounded-[8px] p-6 md:pe-12",
									"shadow-[0_10px_20px_rgba(72,84,159,0.25)]",
									"outline-none",
								)}
							>
								<div className="flex flex-col gap-4">
									{STATUSES.map((status) => {
										const checked = filter.includes(status);
										return (
											<div key={status} className="flex items-center gap-3">
												<Checkbox.Root
													id={`filter-${status}`}
													checked={checked}
													onCheckedChange={() => toggle(status)}
													className={cn(
														"size-4 rounded-xs border flex items-center justify-center",
														"transition-colors duration-150 cursor-pointer",
														"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple",
														checked
															? "bg-brand-purple border-brand-purple"
															: "bg-surface-alt border-border hover:border-brand-purple",
													)}
												>
													<Checkbox.Indicator>
														<CheckIcon />
													</Checkbox.Indicator>
												</Checkbox.Root>
												<label
													htmlFor={`filter-${status}`}
													className="text-xs font-bold text-light-heading capitalize cursor-pointer select-none"
												>
													{status}
												</label>
											</div>
										);
									})}
								</div>
							</motion.div>
						</Popover.Content>
					</Popover.Portal>
				)}
			</AnimatePresence>
		</Popover.Root>
	);
}
