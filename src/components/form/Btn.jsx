// components/form/Btn.jsx
// Problem: button styles (primary / ghost / dark) are repeated and hover state
//          is managed inline with event handlers scattered across the tree.
// Solution: one component owns all button variants and hover logic.

import { useState } from "react";
import { brand } from "../../constants/theme";

const variants = {
  primary: (hov) => ({
    background: hov ? brand.purpleLight : brand.purple,
    color: "#FFFFFF",
  }),
  ghost: (hov, t) => ({
    background: hov ? t.border    : t.surfaceAlt,
    color:      hov ? t.heading   : t.label,
  }),
  dark: (hov) => ({
    background: hov ? "#1E2139" : "#373B53",
    color:      hov ? "#DFE3FA" : "#888EB0",
  }),
};

export function Btn({ variant = "primary", onClick, children, t }) {
  const [hov, setHov] = useState(false);
  const s = variants[variant](hov, t);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        ...s,
        border: "none",
        borderRadius: 24,
        padding: "14px 20px",
        fontWeight: 700,
        fontSize: 12,
        letterSpacing: "0.01em",
        cursor: "pointer",
        fontFamily: "inherit",
        whiteSpace: "nowrap",
        transition: "background 150ms ease, color 150ms ease",
      }}
    >
      {children}
    </button>
  );
}
