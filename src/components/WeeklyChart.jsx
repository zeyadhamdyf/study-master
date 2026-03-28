export default function WeeklyChart({ t, weekData }) {
  const max = Math.max(...weekData.map(d => d.mins), 60);

  return (
    <div style={{ background: "#1e293b", borderRadius: 20, padding: 24, border: "1px solid #334155" }}>
      <h3 style={{ color: "#f1f5f9", margin: "0 0 20px", fontSize: 16, fontWeight: 700 }}>{t.weekly}</h3>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 100 }}>
        {weekData.map((d, i) => (
          <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
            <div style={{ fontSize: 10, color: "#94a3b8" }}>{Math.round(d.mins / 60 * 10) / 10}h</div>
            <div style={{
              width: "100%", borderRadius: "4px 4px 0 0",
              height: `${(d.mins / max) * 80}px`, minHeight: 4,
              transition: "height .5s ease",
              background: d.isToday ? "linear-gradient(180deg,#818cf8,#6366f1)" : "#334155",
            }} />
            <div style={{
              fontSize: 10,
              color: d.isToday ? "#6366f1" : "#64748b",
              fontWeight: d.isToday ? 700 : 400,
            }}>{t.days[i]}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
