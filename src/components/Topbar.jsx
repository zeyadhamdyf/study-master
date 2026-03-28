import Avatar from "./Avatar";

export default function Topbar({ t, currentUser, streak, notifs, onLogout, onToggleLang }) {
  return (
    <div style={{
      background: "#1e293b", borderBottom: "1px solid #334155",
      padding: "10px 16px", display: "flex", alignItems: "center",
      justifyContent: "space-between", position: "sticky", top: 0, zIndex: 80, flexShrink: 0,
    }}>
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ fontSize: 22 }}>📚</span>
        <span style={{ color: "#f1f5f9", fontWeight: 800, fontSize: 16 }}>{t.appName}</span>
      </div>

      {/* Right side */}
      <div className="topbar-right">
        <button onClick={onToggleLang} style={{
          padding: "5px 12px", borderRadius: 8, border: "1px solid #334155",
          background: "#6366f115", color: "#818cf8", cursor: "pointer",
          fontSize: 12, fontWeight: 700, whiteSpace: "nowrap",
        }}>{t.langBtn}</button>

        {notifs.length > 0 && (
          <div style={{ position: "relative", cursor: "default" }}>
            <span style={{ fontSize: 20 }}>🔔</span>
            <span style={{
              position: "absolute", top: -4, right: -4,
              width: 16, height: 16, background: "#ef4444", borderRadius: "50%",
              fontSize: 10, display: "flex", alignItems: "center", justifyContent: "center",
              color: "#fff", fontWeight: 700,
            }}>{notifs.length}</span>
          </div>
        )}

        <Avatar name={currentUser.name} size={34} />

        <div className="user-name" style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ color: "#f1f5f9", fontSize: 13, fontWeight: 700 }}>{currentUser.name}</span>
          <span style={{ color: "#64748b", fontSize: 11 }}>{t.streakDays(streak)}</span>
        </div>

        <button className="logout-btn" onClick={onLogout} style={{
          padding: "6px 12px", borderRadius: 8, border: "1px solid #334155",
          background: "transparent", color: "#94a3b8", cursor: "pointer", fontSize: 12,
        }}>{t.logout}</button>
      </div>
    </div>
  );
}
