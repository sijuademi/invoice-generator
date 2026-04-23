import { cn } from "../../lib/utils";

const DOT_COLORS = {
	paid: "bg-status-paid",
	pending: "bg-status-pending",
	draft: "bg-status-draft dark:bg-white",
};

const BADGE_CLASSES = {
	paid: "badge-paid",
	pending: "badge-pending",
	draft: "badge-draft dark:text-white",
};

const BACKGROUND_CLASSES = {
	paid: "bg-[rgba(51,214,159,0.06)]",
	pending: "bg-[rgba(255,143,0,0.06)]",
	draft: "bg-[rgba(223,227,250,0.06)]",
};

export default function Badge({ status, className }) {
	return (
		<span
			className={cn(
				BADGE_CLASSES[status],
				BACKGROUND_CLASSES[status],
				"min-w-26 justify-center change",
				className,
			)}
		>
			<span
				className={cn("w-2 h-2 rounded-full", DOT_COLORS[status])}
				aria-hidden
			/>
			{status.charAt(0).toUpperCase() + status.slice(1)}
		</span>
	);
}
