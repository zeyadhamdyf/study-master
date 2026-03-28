import { useApp } from "../context/AppContext";
import { ACHIEVEMENTS_DEF, PRIORITY_COLOR } from "../utils/helpers";

export default function Dashboard({ onAddTask }) {
  const { t, currentUser, tasks, completedTasks, streak, todayMins, getCatEmoji, toggleTask } = useApp();

  const [quoteIdx] = [Math.floor(Math.random() * t.quotes.length)];
  const [tipIdx]   = [Math.floor(Math.random() * t.tips.length)];

  const stats = { completedTasks, streak, todayMinutes: todayMins };
  const earnedCount = ACHIEVEMENTS_DEF.filter(a => a.condition(stats)).length;
  const todayTasks  = tasks.filter(tk => !tk.done).slice(0, 5);

  return (
    <div style={{ animation: "fadeIn .4s ease" }}>
      {/* Greeting */}
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ color: "#f1f5f9", fontSize: 24, fontWeight: 800, marginBottom: 4 }}>{t.hello(currentUser.name)}</h1>
        <p style={{ color: "#64748b", fontSize: 14 }}>{t.dashSub}</p>
      </div>

      {/* Quote */}
      <div style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)", borderRadius: 20, padding: 20, marginBottom: 20 }}>
        <div style={{ color: "#e0e7ff", fontSize: 11, fontWeight: 700, marginBottom: 6 }}>{t.motivation}</div>
        <div style={{ color: "#fff", fontSize: 16, fontWeight: 700 }}>"{t.quotes[quoteIdx]}"</div>
      </div>

      {/* Stat cards */}
      <div className="grid-4" style={{ marginBottom: 20 }}>
        {[
          { label: t.statCards[0], value: completedTasks,             icon: "✅", color: "#22c55e" },
          { label: t.statCards[1], value: `${streak} ${t.streakUnit}`, icon: "🔥", color: "#f59e0b" },
          { label: t.statCards[2], value: todayMins,                  icon: "⏱", color: "#6366f1" },
          { label: t.statCards[3], value: earnedCount,                icon: "🏅", color: "#ec4899" },
        ].map(s => (
          <div key={s.label} style={{ background: "#1e293b", borderRadius: 16, padding: 18, border: "1px solid #334155" }}>
            <div style={{ fontSize: 22 }}>{s.icon}</div>
            <div style={{ color: s.color, fontSize: 24, fontWeight: 800, marginTop: 8 }}>{s.value}</div>
            <div style={{ color: "#64748b", fontSize: 12, marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Today tasks */}
      <div style={{ background: "#1e293b", borderRadius: 20, padding: 20, border: "1px solid #334155", marginBottom: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <h3 style={{ color: "#f1f5f9", fontSize: 16, fontWeight: 700 }}>{t.todayTasks}</h3>
          <button onClick={onAddTask} style={{ padding: "6px 14px", borderRadius: 8, border: "none", background: "#6366f1", color: "#fff", cursor: "pointer", fontSize: 13, fontWeight: 700 }}>{t.addBtn}</button>
        </div>
        {todayTasks.length === 0 ? (
          <div style={{ textAlign: "center", color: "#475569", padding: "20px 0" }}>{t.noTasks}</div>
        ) : todayTasks.map(tk => (
          <div key={tk.id} className="task-card" style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 0", borderBottom: "1px solid #0f172a" }}>
            <input type="checkbox" checked={tk.done} onChange={() => toggleTask(tk.id)} style={{ width: 18, height: 18, accentColor: "#6366f1", cursor: "pointer", flexShrink: 0 }} />
            <span style={{ flex: 1, color: "#e2e8f0", fontSize: 14 }}>{getCatEmoji(tk.category)} {tk.title}</span>
            <span style={{ color: PRIORITY_COLOR[tk.priority], fontSize: 11, fontWeight: 700, padding: "2px 8px", background: `${PRIORITY_COLOR[tk.priority]}20`, borderRadius: 6, whiteSpace: "nowrap" }}>{tk.priority}</span>
          </div>
        ))}
      </div>

      {/* Tip */}
      <div style={{ background: "#1e293b", borderRadius: 20, padding: 20, border: "1px solid #22c55e40" }}>
        <div style={{ color: "#22c55e", fontSize: 11, fontWeight: 700, marginBottom: 8 }}>{t.tipDay}</div>
        <div style={{ display: "flex", gap: 12 }}>
          <span style={{ fontSize: 30, flexShrink: 0 }}>{t.tips[tipIdx].icon}</span>
          <div>
            <div style={{ color: "#f1f5f9", fontWeight: 700, marginBottom: 4 }}>{t.tips[tipIdx].title}</div>
            <div style={{ color: "#94a3b8", fontSize: 13, lineHeight: 1.5 }}>{t.tips[tipIdx].body}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
