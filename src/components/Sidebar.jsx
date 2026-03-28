import { NAV_IDS } from "../utils/helpers";

export default function Sidebar({ t, activeTab, setActiveTab, todayMins, isRTL }) {
  return (
    <div className="sidebar" style={{
      background: "#1e293b",
      borderRight:  isRTL ? "none" : "1px solid #334155",
      borderLeft:   isRTL ? "1px solid #334155" : "none",
      padding: "16px 10px", gap: 4,
    }}>
      {NAV_IDS.map((id, i) => (
        <button
          key={id}
          className="nav-item"
          onClick={() => setActiveTab(id)}
          style={{
            display: "flex", alignItems: "center", gap: 10,
            padding: "10px 14px", borderRadius: 10, border: "none",
            background: activeTab === id ? "#6366f120" : "transparent",
            color: activeTab === id ? "#818cf8" : "#64748b",
            cursor: "pointer", fontWeight: activeTab === id ? 700 : 500,
            fontSize: 14, textAlign: isRTL ? "right" : "left",
            width: "100%", transition: "all .2s",
          }}
        >
          <span>{t.navIcons[i]}</span>{t.nav[i]}
        </button>
      ))}

      <div style={{ flex: 1 }} />

      {/* Today progress */}
      <div style={{ padding: "12px 14px", borderRadius: 10, background: "#6366f110", border: "1px solid #6366f120" }}>
        <div style={{ color: "#94a3b8", fontSize: 11, marginBottom: 4 }}>{t.todayStudy}</div>
        <div style={{ color: "#818cf8", fontWeight: 800, fontSize: 18 }}>
          {Math.floor(todayMins / 60)}h {todayMins % 60}m
        </div>
        <div style={{ marginTop: 6, background: "#0f172a", borderRadius: 4, height: 4 }}>
          <div style={{
            width: `${Math.min((todayMins / 240) * 100, 100)}%`,
            height: "100%", background: "#6366f1", borderRadius: 4, transition: "width .5s",
          }} />
        </div>
      </div>
    </div>
  );
}
