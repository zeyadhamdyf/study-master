export default function AchievementBadge({ ach, earned, label, desc }) {
  return (
    <div style={{
      background: earned ? "linear-gradient(135deg,#6366f1,#8b5cf6)" : "#1e293b",
      border: `1px solid ${earned ? "#6366f1" : "#334155"}`,
      borderRadius: 12, padding: "12px 10px", textAlign: "center",
      opacity: earned ? 1 : 0.45, transition: "all .3s",
    }}>
      <div style={{ fontSize: 26 }}>{ach.icon}</div>
      <div style={{ color: "#f1f5f9", fontWeight: 700, fontSize: 12, marginTop: 4 }}>{label}</div>
      <div style={{ color: "#94a3b8", fontSize: 10, marginTop: 2 }}>{desc}</div>
      {earned && <div style={{ color: "#22c55e", fontSize: 10, marginTop: 4, fontWeight: 700 }}>✓</div>}
    </div>
  );
}
