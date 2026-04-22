import { motion } from "framer-motion";
import { Badge } from "../ui/Badge";
import { formatDate, formatCurrency } from "../../lib/utils";

const ChevronRight = () => (
  <svg width="7" height="10" viewBox="0 0 7 10" fill="none" aria-hidden className="hidden sm:block flex-shrink-0">
    <path d="M1 1l4.228 4.228L4.228 9.456" stroke="#7C5DFA" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export function InvoiceCard({ invoice, index, onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: index * 0.06 }}
    >
      <button
        type="button"
        onClick={onClick}
        className="invoice-card w-full text-left
                   flex flex-col sm:grid sm:grid-cols-[96px_1fr_1fr_120px_120px_16px]
                   items-center gap-y-3 sm:gap-4 p-6 sm:p-4 sm:px-8"
        aria-label={`Invoice ${invoice.id}, ${invoice.clientName}, ${formatCurrency(invoice.total)}, ${invoice.status}`}
      >
        {/* ID */}
        <span className="font-bold text-xs text-heading self-start sm:self-auto">
          <span className="text-label">#</span>{invoice.id}
        </span>

        {/* Mobile: due date + client name */}
        <div className="sm:hidden flex justify-between w-full">
          <span className="text-xs text-body">Due {formatDate(invoice.paymentDue)}</span>
          <span className="text-xs text-body">{invoice.clientName}</span>
        </div>

        {/* Desktop columns */}
        <span className="hidden sm:block text-xs text-body">
          Due {formatDate(invoice.paymentDue)}
        </span>
        <span className="hidden sm:block text-xs text-body">{invoice.clientName}</span>

        {/* Mobile: amount + badge */}
        <div className="sm:hidden flex justify-between items-center w-full">
          <span className="font-bold text-base text-heading">
            {formatCurrency(invoice.total)}
          </span>
          <Badge status={invoice.status} />
        </div>

        {/* Desktop: amount */}
        <span className="hidden sm:block font-bold text-sm text-heading text-right">
          {formatCurrency(invoice.total)}
        </span>

        {/* Desktop: badge */}
        <div className="hidden sm:flex justify-center">
          <Badge status={invoice.status} />
        </div>

        <ChevronRight />
      </button>
    </motion.div>
  );
}
