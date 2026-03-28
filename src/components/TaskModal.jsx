export default function TaskModal({ t, editTask, taskForm, setTaskForm, onSave, onClose }) {
  return (
    <div
      onClick={onClose}
      style={{ position: "fixed", inset: 0, background: "#00000085", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{ background: "#1e293b", borderRadius: 24, padding: 24, width: "100%", maxWidth: 460, border: "1px solid #334155", animation: "slideIn .25s ease", maxHeight: "90vh", overflowY: "auto" }}
      >
        <h3 style={{ color: "#f1f5f9", marginBottom: 18, fontSize: 18, fontWeight: 800 }}>
          {editTask ? t.editT : t.addT}
        </h3>

        {/* Title */}
        <Field label={t.fTitle}>
          <input
            value={taskForm.title}
            onChange={e => setTaskForm(p => ({ ...p, title: e.target.value }))}
            placeholder={t.tPh}
            style={inputStyle(t.dir)}
          />
        </Field>

        {/* Category */}
        <Field label={t.fCat}>
          <select value={taskForm.category} onChange={e => setTaskForm(p => ({ ...p, category: e.target.value }))} style={inputStyle()}>
            {t.cats.map(c => <option key={c}>{c}</option>)}
          </select>
        </Field>

        {/* Priority */}
        <Field label={t.fPri}>
          <select value={taskForm.priority} onChange={e => setTaskForm(p => ({ ...p, priority: e.target.value }))} style={inputStyle()}>
            {t.pris.map(p => <option key={p}>{p}</option>)}
          </select>
        </Field>

        {/* Deadline */}
        <Field label={t.fDead}>
          <input
            type="date"
            value={taskForm.deadline}
            onChange={e => setTaskForm(p => ({ ...p, deadline: e.target.value }))}
            style={{ ...inputStyle(), colorScheme: "dark" }}
          />
        </Field>

        {/* Notes */}
        <Field label={t.fNotes}>
          <textarea
            value={taskForm.notes}
            onChange={e => setTaskForm(p => ({ ...p, notes: e.target.value }))}
            placeholder={t.nPh}
            rows={2}
            style={{ ...inputStyle(t.dir), resize: "none" }}
          />
        </Field>

        <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
          <button onClick={onClose} style={{ flex: 1, padding: 12, borderRadius: 10, border: "1px solid #334155", background: "transparent", color: "#94a3b8", cursor: "pointer", fontWeight: 700 }}>
            {t.cancel}
          </button>
          <button onClick={onSave} style={{ flex: 2, padding: 12, borderRadius: 10, border: "none", background: "#6366f1", color: "#fff", cursor: "pointer", fontWeight: 800, fontSize: 15 }}>
            {editTask ? t.saveChg : t.addTaskBtn}
          </button>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <label style={{ color: "#94a3b8", fontSize: 12, fontWeight: 700, display: "block", marginBottom: 6 }}>{label}</label>
      {children}
    </div>
  );
}

const inputStyle = (dir = "ltr") => ({
  width: "100%", padding: "11px 14px", borderRadius: 10,
  border: "1px solid #334155", background: "#0f172a",
  color: "#f1f5f9", fontSize: 14, direction: dir,
});
