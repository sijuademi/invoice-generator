// components/form/InvoiceDetailsSection.jsx
// Problem: invoice-level metadata (date, terms, description) has nothing to do
//          with billing addresses yet was lumped together with them.
// Solution: isolate these three fields so their grouping is explicit.

import { PAYMENT_TERMS } from "../../constants/invoiceDefaults";
import { FormInput } from "./FormInput";
import { FormSelect } from "./FormSelect";

export function InvoiceDetailsSection({ form, errors, setField, t }) {
  return (
    <section style={{ marginBottom: 40 }}>
      {/* Date and terms side by side */}
      <div style={{ display: "flex", gap: 16, marginBottom: 20 }}>
        <div style={{ flex: 1 }}>
          <FormInput
            label="Invoice Date"
            type="date"
            value={form.invoiceDate}
            onChange={setField("invoiceDate")}
            t={t}
          />
        </div>
        <div style={{ flex: 1 }}>
          <FormSelect
            label="Payment Terms"
            value={form.paymentTerms}
            onChange={setField("paymentTerms")}
            options={PAYMENT_TERMS}
            t={t}
          />
        </div>
      </div>

      {/* Description — full width */}
      <FormInput
        label="Project Description"
        value={form.description}
        onChange={setField("description")}
        error={errors.description}
        placeholder="e.g. Graphic Design Service"
        t={t}
      />
    </section>
  );
}
