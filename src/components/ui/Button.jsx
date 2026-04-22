import { forwardRef } from "react";
import { cn } from "../../lib/utils";

const VARIANTS = {
	primary: "btn-primary",
	danger: "btn-danger",
	ghost: "btn-ghost",
	dark: "btn-dark",
};

function Button({ variant = "primary", className, children, ...props }, ref) {
	return (
		<button ref={ref} className={cn(VARIANTS[variant], className)} {...props}>
			{children}
		</button>
	);
}

export default forwardRef(Button);
