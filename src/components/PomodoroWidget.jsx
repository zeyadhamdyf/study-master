import { useState, useEffect, useRef } from "react";
import { fmtT, playDone } from "../utils/helpers";

export default function PomodoroWidget({ t, onMinutes }) {
  const [mode, setMode]     = useState("work");
  const TIMES = { work: 25 * 60, short: 5 * 60, long: 15 * 60 };
  const [secs, setSecs]     = useState(TIMES.work);
  const [running, setRunning] = useState(false);
  const [cycles, setCycles] = useState(0);
  const iRef = useRef(null);

  useEffect(() => {
    setSecs(TIMES[mode]);
    setRunning(false);
    clearInterval(iRef.current);
  }, [mode]);

  useEffect(() => {
    if (running) {
      iRef.current = setInterval(() => {
        setSecs(s => {
          if (s <= 1) {
            clearInterval(iRef.current);
            setRunning(false);
            if (mode === "work") { onMinutes(25); setCycles(c => c + 1); playDone(); }
            return 0;
          }
          return s - 1;
        });
      }, 1000);
    } else {
      clearInterval(iRef.current);
    }
    return () => clearInterval(iRef.current);
  }, [running, mode]);

  const pct  = ((TIMES[mode] - secs) / TIMES[mode]) * 100;
  const r    = 54;
  const circ = 2 * Math.PI * r;

  return (
    <div style={{ background: "#1e293b", borderRadius: 20, padding: 24, border: "1px solid #334155" }}>
      {/* Mode tabs */}
      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        {[["work", t.wMode], ["short", t.sMode], ["long", t.lMode]].map(([k, l]) => (
          <button key={k} onClick={() => setMode(k)} style={{
            flex: 1, padding: "8px 0", borderRadius: 8, border: "none",
            background: mode === k ? "#6366f1" : "#0f172a",
            color: mode === k ? "#fff" : "#94a3b8",
            cursor: "pointer", fontSize: 12, fontWeight: 600,
          }}>{l}</button>
        ))}
      </div>

      {/* Circle timer */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
        <div style={{ position: "relative", width: 140, height: 140 }}>
          <svg width="140" height="140" style={{ transform: "rotate(-90deg)" }}>
            <circle cx="70" cy="70" r={r} fill="none" stroke="#0f172a" strokeWidth="8" />
            <circle cx="70" cy="70" r={r} fill="none"
              stroke={mode === "work" ? "#6366f1" : "#22c55e"}
              strokeWidth="8"
              strokeDasharray={circ}
              strokeDashoffset={circ - (pct / 100) * circ}
              strokeLinecap="round"
              style={{ transition: "stroke-dashoffset 1s linear" }}
            />
          </svg>
          <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <div style={{ fontSize: 28, fontWeight: 800, color: "#f1f5f9", fontVariantNumeric: "tabular-nums" }}>{fmtT(secs)}</div>
            <div style={{ fontSize: 11, color: "#64748b" }}>{mode === "work" ? t.focusLbl : t.breakLbl}</div>
          </div>
        </div>

        {/* Controls */}
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={() => setRunning(r => !r)} style={{
            padding: "10px 28px", borderRadius: 10, border: "none",
            background: running ? "#ef4444" : "#6366f1",
            color: "#fff", fontWeight: 700, cursor: "pointer", fontSize: 14,
          }}>{running ? t.pause : t.start}</button>
          <button onClick={() => { setSecs(TIMES[mode]); setRunning(false); }} style={{
            padding: "10px 16px", borderRadius: 10,
            border: "1px solid #334155", background: "transparent",
            color: "#94a3b8", cursor: "pointer",
          }}>↺</button>
        </div>

        <div style={{ color: "#64748b", fontSize: 12 }}>
          {t.cycles} <span style={{ color: "#6366f1", fontWeight: 700 }}>{cycles}</span>
        </div>
      </div>
    </div>
  );
}
