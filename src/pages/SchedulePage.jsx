import { useState } from "react";
import { useApp } from "../context/AppContext";

export default function SchedulePage() {
  const { t, tasks } = useApp();
  const [schedHours, setSchedHours] = useState("9");

  const buildSchedule = () => {
    const pending = tasks.filter(tk => !tk.done).slice(0, 6);
    const startH  = parseInt(schedHours) || 9;
    const sched   = [];
    let cursor    = startH * 60;
    pending.forEach((tk, i) => {
      sched.push({ time: cursor, label: tk.title, type: "study" });
      cursor += 60;
      if (i < pending.length - 1) {
        sched.push({ time: cursor, label: "☕", type: "break" });
        cursor += 30;
      }
    });
    return sched;
  };

  const fmtST = (mins) => {
    const h  = Math.floor(mins / 60) % 24;
    const m  = mins % 60;
    const ap = h >= 12 ? "PM" : "AM";
    return `${h % 12 || 12}:${String(m).padStart(2, "0")} ${ap}`;
  };

  const isRTL    = t.dir === "rtl";
  const schedule = buildSchedule();

  return (
    <div style={{ animation: "fadeIn .4s ease" }}>
      <h2 style={{ color: "#f1f5f9", fontSize: 22, fontWeight: 800, marginBottom: 20 }}>{t.smartSched}</h2>

      {/* Hour picker */}
      <div style={{ background: "#1e293b", borderRadius: 20, padding: 20, marginBottom: 20, border: "1px solid #334155" }}>
        <label style={{ color: "#94a3b8", fontSize: 13, fontWeight: 600, display: "block", marginBottom: 8 }}>{t.startAt}</label>
        <input
          type="number" value={schedHours} onChange={e => setSchedHours(e.target.value)}
          min="0" max="23"
          style={{ width: 90, padding: "10px 14px", borderRadius: 10, border: "1px solid #334155", background: "#0f172a", color: "#f1f5f9", fontSize: 16, fontWeight: 700 }}
        />
      </div>

      {schedule.length === 0 ? (
        <div style={{ textAlign: "center", color: "#475569", padding: "40px 0" }}>{t.addFirst}</div>
      ) : (
        <div style={{ position: "relative", paddingLeft: isRTL ? 0 : 20, paddingRight: isRTL ? 20 : 0 }}>
          <div style={{ position: "absolute", [isRTL ? "right" : "left"]: 9, top: 0, bottom: 0, width: 2, background: "#334155" }} />
          {schedule.map((s, i) => (
            <div key={i} style={{ display: "flex", gap: 16, marginBottom: 14, position: "relative" }}>
              <div style={{ position: "absolute", [isRTL ? "right" : "left"]: -20, top: 14, width: 12, height: 12, borderRadius: "50%", background: s.type === "break" ? "#22c55e" : "#6366f1", border: "2px solid #0f172a" }} />
              <div style={{ background: "#1e293b", borderRadius: 14, padding: "14px 18px", flex: 1, border: `1px solid ${s.type === "break" ? "#22c55e30" : "#6366f130"}` }}>
                <div style={{ color: "#64748b", fontSize: 12, fontWeight: 700 }}>{fmtST(s.time)}</div>
                <div style={{ color: s.type === "break" ? "#22c55e" : "#f1f5f9", fontWeight: 700, fontSize: 14, marginTop: 2 }}>
                  {s.type === "break" ? `${s.label} Break` : `📖 ${s.label}`}
                </div>
                <div style={{ color: "#475569", fontSize: 11, marginTop: 2 }}>
                  {s.type === "break" ? t.breakMin : t.focusMin}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
