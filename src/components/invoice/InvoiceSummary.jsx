import { motion } from "framer-motion";
import Badge from "../ui/Badge";
import { formatDate, formatCurrency } from "../../lib/utils";
import { ChevronRight } from "lucide-react";
import Button from "../ui/Button";

export default function InvoiceSummary({ invoice, index, onClick }) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 16 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.25, delay: index * 0.06 }}
		>
			<button
				type="button"
				onClick={onClick}
				className="invoice-card w-full text-left rounded-lg
                   flex flex-col sm:grid sm:grid-cols-[96px_1fr_1fr_120px_120px_16px]
                   items-center gap-y-3 sm:gap-4 p-6 sm:p-4 sm:px-8"
				aria-label={`Invoice ${invoice.id}, ${invoice.clientName}, ${formatCurrency(invoice.total)}, ${invoice.status}`}
			>
				<span className="font-bold text-xs text-light-heading self-start sm:self-auto">
					<span className="text-light-body">#</span>
					{invoice.id}
				</span>

				{/* Mobile columns */}
				<div className="sm:hidden flex justify-between w-full">
					<span className="text-xs text-light-body">
						Due {formatDate(invoice.paymentDue)}
					</span>
					<span className="text-xs text-light-body">{invoice.clientName}</span>
				</div>

				{/* Desktop columns */}
				<span className="hidden sm:block text-xs text-light-body">
					Due {formatDate(invoice.paymentDue)}
				</span>
				<span className="hidden sm:block text-xs text-light-body">
					{invoice.clientName}
				</span>

				<div className="sm:hidden flex justify-between items-center w-full">
					<span className="font-bold text-base text-light-heading">
						{formatCurrency(invoice.total)}
					</span>
					<Badge status={invoice.status} />
				</div>

				<span className="hidden sm:block font-bold text-sm text-light-heading text-right">
					{formatCurrency(invoice.total)}
				</span>

				<div className="hidden sm:flex justify-center">
					<Badge status={invoice.status} />
				</div>

				<ChevronRight
					className="h-5 w-5 text-brand-purple hidden md:block"
					strokeWidth={3}
				/>
			</button>
		</motion.div>
	);
}
