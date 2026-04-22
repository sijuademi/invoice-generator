// components/form/BillFromSection.jsx
// Problem: "Bill From" is a named section with its own heading and its own
//          subset of fields — mixing it into a parent makes that parent know
//          too much about sender-specific field names.
// Solution: own the "from" prefix and the section title here.

import { brand } from "../../constants/theme";
import { AddressFields } from "./AddressFields";

export function BillFromSection({ form, errors, setField, t }) {
  return (
    <section style={{ marginBottom: 40 }}>
      <p style={{
        color: brand.purple, fontSize: 12, fontWeight: 700,
        letterSpacing: "0.01em", margin: "0 0 20px",
      }}>
        Bill From
      </p>

      <AddressFields
        prefix="from"
        form={form}
        errors={errors}
        setField={setField}
        t={t}
      />
    </section>
  );
}
