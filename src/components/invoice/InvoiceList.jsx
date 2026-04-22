import { motion } from "framer-motion";
import { FileText } from "lucide-react";
import { InvoiceCard } from "./InvoiceCard";

function EmptyState({ filtered }) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center pt-24 px-8 text-center"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
    >
      <img
        src="/illustration-empty.svg"
        alt=""
        aria-hidden
        className="w-52 mb-10"
        onError={(e) => { e.target.style.display = "none"; }}
      />
      {/* Fallback icon */}
      <FileText size={80} className="text-border mb-10" aria-hidden />
      <h2 className="text-2xl font-bold text-heading mb-5">Nothing here</h2>
      <p className="text-body text-sm max-w-xs leading-relaxed">
        {filtered
          ? "No invoices match the current filter. Try selecting a different status."
          : "Create an invoice by clicking the New Invoice button and get started."}
      </p>
    </motion.div>
  );
}

export function InvoiceList({ invoices, isFiltered, onSelect }) {
  if (invoices.length === 0) {
    return <EmptyState filtered={isFiltered} />;
  }

  return (
    <ul className="flex flex-col gap-4" role="list">
      {invoices.map((inv, i) => (
        <li key={inv.id}>
          <InvoiceCard
            invoice={inv}
            index={i}
            onClick={() => onSelect?.(inv.id)}
          />
        </li>
      ))}
    </ul>
  );
}
