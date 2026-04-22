// components/form/AddressFields.jsx
// Problem: the exact same four-field address layout (street, then city/postcode/country
//          in a row) is needed for both "Bill From" and "Bill To".
// Solution: accept a field-name prefix ("from" | "to") and render once.

import { FormInput } from "./FormInput";

export function AddressFields({ prefix, form, errors, setField, t }) {
  const f = (name) => `${prefix}${name}`;   // e.g. "fromStreet" | "toStreet"

  return (
    <div>
      {/* Street — full width */}
      <div style={{ marginBottom: 20 }}>
        <FormInput
          label="Street Address"
          value={form[f("Street")]}
          onChange={setField(f("Street"))}
          error={errors[f("Street")]}
          placeholder="e.g. 19 Union Terrace"
          t={t}
        />
      </div>

      {/* City / Post Code / Country — three columns */}
      <div style={{ display: "flex", gap: 16 }}>
        <div style={{ flex: 1 }}>
          <FormInput
            label="City"
            value={form[f("City")]}
            onChange={setField(f("City"))}
            error={errors[f("City")]}
            placeholder="e.g. London"
            t={t}
          />
        </div>
        <div style={{ flex: 1 }}>
          <FormInput
            label="Post Code"
            value={form[f("PostCode")]}
            onChange={setField(f("PostCode"))}
            error={errors[f("PostCode")]}
            placeholder="e.g. E1 3EZ"
            t={t}
          />
        </div>
        <div style={{ flex: 1 }}>
          <FormInput
            label="Country"
            value={form[f("Country")]}
            onChange={setField(f("Country"))}
            error={errors[f("Country")]}
            placeholder="e.g. United Kingdom"
            t={t}
          />
        </div>
      </div>
    </div>
  );
}
