import { cn } from "../../lib/utils";

const DOT_COLORS = {
	paid: "bg-status-paid",
	pending: "bg-status-pending",
	draft: "bg-status-draft",
};

const BADGE_CLASSES = {
	paid: "badge-paid",
	pending: "badge-pending",
	draft: "badge-draft",
};

const BACKGROUND_CLASSES = {
	paid: "bg-green-50",
	pending: "bg-orange-50",
	draft: "bg-gray-50",
};

export default function Badge({ status, className }) {
	return (
		<span
			className={cn(
				BADGE_CLASSES[status],
				BACKGROUND_CLASSES[status],
				"min-w-26 justify-center",
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
