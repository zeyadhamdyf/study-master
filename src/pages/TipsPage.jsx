import { useApp } from "../context/AppContext";

export default function TipsPage() {
  const { t } = useApp();

  return (
    <div style={{ animation: "fadeIn .4s ease" }}>
      <h2 style={{ color: "#f1f5f9", fontSize: 22, fontWeight: 800, marginBottom: 6 }}>{t.tipsTitle}</h2>
      <p style={{ color: "#64748b", fontSize: 14, marginBottom: 20 }}>{t.tipsSub}</p>

      {/* Tips */}
      <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 24 }}>
        {t.tips.map((tip, i) => (
          <div key={i} style={{ background: "#1e293b", borderRadius: 18, padding: 20, border: "1px solid #334155", display: "flex", gap: 14 }}>
            <span style={{ fontSize: 32, flexShrink: 0 }}>{tip.icon}</span>
            <div>
              <div style={{ color: "#f1f5f9", fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{tip.title}</div>
              <div style={{ color: "#94a3b8", fontSize: 13, lineHeight: 1.6 }}>{tip.body}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Quotes */}
      <h3 style={{ color: "#f1f5f9", fontSize: 18, fontWeight: 800, marginBottom: 14 }}>{t.quotesTitle}</h3>
      <div className="grid-auto">
        {t.quotes.map((q, i) => (
          <div key={i} style={{
            background: i % 2 === 0 ? "#6366f120" : "#22c55e10",
            border: `1px solid ${i % 2 === 0 ? "#6366f140" : "#22c55e30"}`,
            borderRadius: 16, padding: 20,
          }}>
            <div style={{ color: i % 2 === 0 ? "#818cf8" : "#4ade80", fontSize: 22, marginBottom: 6 }}>"</div>
            <div style={{ color: "#e2e8f0", fontSize: 14, fontWeight: 600 }}>{q}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
