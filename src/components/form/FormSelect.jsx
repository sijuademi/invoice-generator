// components/form/FormSelect.jsx
// Problem: the native <select> loses all visual consistency with FormInput
//          (focus ring colour, chevron icon, font weight).
// Solution: wrap it once here so it looks and behaves identically to FormInput.

import { useState } from "react";
import { brand } from "../../constants/theme";

export function FormSelect({ label, value, onChange, options, t }) {
  const [focused, setFocused] = useState(false);

  return (
    <div>
      <label
        style={{
          display: "block",
          fontSize: 12,
          fontWeight: 500,
          color: t.label,
          marginBottom: 6,
          letterSpacing: "0.01em",
        }}
      >
        {label}
      </label>

      <div style={{ position: "relative" }}>
        <select
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            width: "100%",
            boxSizing: "border-box",
            appearance: "none",
            background: t.surfaceAlt,
            border: `1px solid ${focused ? brand.purple : t.border}`,
            borderRadius: 4,
            color: t.heading,
            fontSize: 12,
            fontWeight: 700,
            padding: "12px 40px 12px 16px",
            outline: "none",
            cursor: "pointer",
            fontFamily: "inherit",
            transition: "border-color 150ms ease",
          }}
        >
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>

        {/* Custom chevron — always purple, never intercepted by pointer events */}
        <svg
          style={{
            position: "absolute",
            right: 16,
            top: "50%",
            transform: "translateY(-50%)",
            pointerEvents: "none",
          }}
          width="11"
          height="7"
          viewBox="0 0 11 7"
        >
          <path
            d="M1 1l4.228 4.228L9.456 1"
            stroke={brand.purple}
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
}
