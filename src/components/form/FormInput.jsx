// components/form/FormInput.jsx
// Problem: every field duplicates the label/error markup, focus ring colour logic,
//          and border-colour transitions.
// Solution: one component that accepts a label, value, error, and forwards the rest.

import { useState } from "react";
import { brand } from "../../constants/theme";

export function FormInput({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  error,
  t,
  inputStyle = {},
}) {
  const [focused, setFocused] = useState(false);

  return (
    <div>
      {/* Label row — shows error message on the right when present */}
      <label
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 12,
          fontWeight: 500,
          color: error ? brand.red : t.label,
          marginBottom: 6,
          letterSpacing: "0.01em",
        }}
      >
        {label}
        {error && (
          <span style={{ color: brand.red, fontSize: 10, fontWeight: 600 }}>
            {error}
          </span>
        )}
      </label>

      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: "100%",
          boxSizing: "border-box",
          background: t.surfaceAlt,
          border: `1px solid ${error ? brand.red : focused ? brand.purple : t.border}`,
          borderRadius: 4,
          color: t.heading,
          fontSize: 12,
          fontWeight: 700,
          padding: "12px 16px",
          outline: "none",
          fontFamily: "inherit",
          transition: "border-color 150ms ease",
          ...inputStyle,
        }}
      />
    </div>
  );
}
