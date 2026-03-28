import { useApp } from "../context/AppContext";
import PomodoroWidget from "../components/PomodoroWidget";

export default function PomodoroPage() {
  const { t, addStudyTime } = useApp();

  return (
    <div style={{ animation: "fadeIn .4s ease", maxWidth: 480, margin: "0 auto" }}>
      <h2 style={{ color: "#f1f5f9", fontSize: 22, fontWeight: 800, marginBottom: 20 }}>{t.pomTitle}</h2>

      <PomodoroWidget t={t} onMinutes={addStudyTime} />

      <div style={{ background: "#1e293b", borderRadius: 20, padding: 20, marginTop: 20, border: "1px solid #334155" }}>
        <h3 style={{ color: "#f1f5f9", marginBottom: 14, fontSize: 16 }}>{t.howWorks}</h3>
        {[
          [`🍅 25 min`, t.focusSess],
          [`☕ 5 min`,  t.shortBrk],
          [`🌿 15 min`, t.longBrk],
        ].map(([lbl, desc]) => (
          <div key={lbl} style={{ display: "flex", gap: 12, marginBottom: 10 }}>
            <span style={{ color: "#6366f1", fontWeight: 700, minWidth: 90, fontSize: 13 }}>{lbl}</span>
            <span style={{ color: "#94a3b8", fontSize: 13 }}>{desc}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
