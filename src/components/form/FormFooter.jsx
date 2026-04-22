// components/form/FormFooter.jsx
// Problem: footer button sets differ between "new" and "edit" modes, and the
//          layout logic (space-between vs right-aligned) was duplicated inline.
// Solution: receive the mode and render the correct buttons with the correct layout.

import { brand } from "../../constants/theme";
import { Btn } from "./Btn";

export function FormFooter({ mode, onDiscard, onDraft, onSave, t }) {
  const isEdit = mode === "edit";

  return (
    <div
      style={{
        padding: "20px 40px",
        background: t.surface,
        borderTop: `1px solid ${t.border}`,
        display: "flex",
        justifyContent: isEdit ? "flex-end" : "space-between",
        alignItems: "center",
        gap: 8,
        flexShrink: 0,
        boxShadow: `0 -8px 24px ${brand.purple}0f`,
      }}
    >
      {isEdit ? (
        <>
          <Btn variant="ghost" onClick={onDiscard} t={t}>Cancel</Btn>
          <Btn variant="primary" onClick={onSave}>Save Changes</Btn>
        </>
      ) : (
        <>
          <Btn variant="ghost" onClick={onDiscard} t={t}>Discard</Btn>
          <div style={{ display: "flex", gap: 8 }}>
            <Btn variant="dark" onClick={onDraft} t={t}>Save as Draft</Btn>
            <Btn variant="primary" onClick={onSave}>Save &amp; Send</Btn>
          </div>
        </>
      )}
    </div>
  );
}
