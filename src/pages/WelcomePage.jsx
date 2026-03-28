import { useApp } from "../context/AppContext";

export default function WelcomePage() {
  const { t, welcomeMsg, setWelcomeMsg } = useApp();

  return (
    <div style={{ minHeight: "100vh", background: "#0f172a", display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
      <div style={{ textAlign: "center", maxWidth: 480, animation: "fadeIn .5s ease" }}>
        <div style={{ fontSize: 72, marginBottom: 16, display: "inline-block", animation: "bounce 1s infinite" }}>👋</div>
        <h1 style={{ color: "#f1f5f9", fontSize: 28, fontWeight: 800, marginBottom: 12 }}>{t.hello(welcomeMsg.name)}</h1>
        <div style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)", borderRadius: 20, padding: 28, margin: "20px 0" }}>
          <p style={{ color: "#fff", fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{t.welcomeSub}</p>
          <p style={{ color: "#e0e7ff", fontSize: 14 }}>{t.welcomeBody}</p>
        </div>
        <button
          onClick={() => setWelcomeMsg(null)}
          style={{ padding: "14px 40px", borderRadius: 14, border: "none", background: "#22c55e", color: "#fff", fontWeight: 800, fontSize: 16, cursor: "pointer" }}
        >
          {t.letsGo}
        </button>
      </div>
    </div>
  );
}
