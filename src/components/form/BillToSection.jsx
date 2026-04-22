// components/form/BillToSection.jsx
// Problem: "Bill To" has two extra fields (client name + email) before the
//          shared address block — co-locating them avoids drilling those
//          concerns back up to the parent.
// Solution: own the name/email fields and delegate the address to AddressFields.

import { brand } from "../../constants/theme";
import { FormInput } from "./FormInput";
import { AddressFields } from "./AddressFields";

export function BillToSection({ form, errors, setField, t }) {
  return (
    <section style={{ marginBottom: 40 }}>
      <p style={{
        color: brand.purple, fontSize: 12, fontWeight: 700,
        letterSpacing: "0.01em", margin: "0 0 20px",
      }}>
        Bill To
      </p>

      <div style={{ marginBottom: 20 }}>
        <FormInput
          label="Client's Name"
          value={form.clientName}
          onChange={setField("clientName")}
          error={errors.clientName}
          placeholder="e.g. Alex Grim"
          t={t}
        />
      </div>

      <div style={{ marginBottom: 20 }}>
        <FormInput
          label="Client's Email"
          type="email"
          value={form.clientEmail}
          onChange={setField("clientEmail")}
          error={errors.clientEmail}
          placeholder="e.g. alexgrim@mail.com"
          t={t}
        />
      </div>

      <AddressFields
        prefix="to"
        form={form}
        errors={errors}
        setField={setField}
        t={t}
      />
    </section>
  );
}
