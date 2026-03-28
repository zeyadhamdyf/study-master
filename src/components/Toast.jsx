export default function Toast({ toast, isRTL }) {
  if (!toast) return null;
  return (
    <div style={{
      position: "fixed",
      bottom: 70,
      right: isRTL ? "auto" : 20,
      left:  isRTL ? 20 : "auto",
      background: toast.type === "success" ? "#22c55e" : "#6366f1",
      color: "#fff", padding: "12px 20px", borderRadius: 12,
      fontWeight: 700, fontSize: 14, zIndex: 300,
      animation: "slideIn .3s ease",
      boxShadow: "0 8px 24px rgba(0,0,0,.4)",
      maxWidth: "calc(100vw - 40px)",
    }}>
      {toast.msg}
    </div>
  );
}
