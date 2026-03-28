import { useApp } from "../context/AppContext";
import { PRIORITY_COLOR } from "../utils/helpers";

export default function TasksPage({ onAdd, onEdit }) {
  const { t, tasks, toggleTask, deleteTask, getCatEmoji } = useApp();

  return (
    <div style={{ animation: "fadeIn .4s ease" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h2 style={{ color: "#f1f5f9", fontSize: 22, fontWeight: 800 }}>{t.taskMgr}</h2>
        <button onClick={onAdd} style={{ padding: "10px 18px", borderRadius: 10, border: "none", background: "#6366f1", color: "#fff", cursor: "pointer", fontSize: 14, fontWeight: 700, whiteSpace: "nowrap" }}>
          {t.newTask}
        </button>
      </div>

      {tasks.length === 0 ? (
        <div style={{ textAlign: "center", color: "#475569", padding: "60px 0" }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>📭</div>
          <div>{t.noTasksYet}</div>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {tasks.map(tk => (
            <div key={tk.id} className="task-card" style={{ background: "#1e293b", borderRadius: 16, padding: 18, border: `1px solid ${tk.done ? "#22c55e30" : "#334155"}`, opacity: tk.done ? 0.7 : 1 }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                <input type="checkbox" checked={tk.done} onChange={() => toggleTask(tk.id)} style={{ width: 20, height: 20, accentColor: "#22c55e", cursor: "pointer", marginTop: 2, flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                    <span style={{ color: tk.done ? "#64748b" : "#f1f5f9", fontSize: 15, fontWeight: 700, textDecoration: tk.done ? "line-through" : "none", wordBreak: "break-word" }}>
                      {getCatEmoji(tk.category)} {tk.title}
                    </span>
                    <span style={{ color: PRIORITY_COLOR[tk.priority], fontSize: 11, fontWeight: 700, padding: "2px 8px", background: `${PRIORITY_COLOR[tk.priority]}20`, borderRadius: 6, whiteSpace: "nowrap" }}>{tk.priority}</span>
                    <span style={{ color: "#64748b", fontSize: 11, padding: "2px 8px", background: "#0f172a", borderRadius: 6, whiteSpace: "nowrap" }}>{tk.category}</span>
                  </div>
                  {tk.notes    && <div style={{ color: "#64748b", fontSize: 12, marginTop: 4 }}>{tk.notes}</div>}
                  {tk.deadline && <div style={{ color: "#f59e0b", fontSize: 12, marginTop: 4 }}>{t.due} {tk.deadline}</div>}
                </div>
                <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                  <button onClick={() => onEdit(tk)} style={{ padding: "6px 10px", borderRadius: 8, border: "1px solid #334155", background: "transparent", color: "#94a3b8", cursor: "pointer", fontSize: 12 }}>✏️</button>
                  <button onClick={() => deleteTask(tk.id)} style={{ padding: "6px 10px", borderRadius: 8, border: "1px solid #334155", background: "transparent", color: "#ef4444", cursor: "pointer", fontSize: 12 }}>🗑</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
