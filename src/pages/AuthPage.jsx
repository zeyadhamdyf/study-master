import { useState } from "react";
import { useApp } from "../context/AppContext";

export default function AuthPage() {
  const { t, toggleLang, register, login } = useApp();
  const [mode, setMode]     = useState("login");
  const [form, setForm]     = useState({ name: "", email: "", password: "" });
  const [error, setError]   = useState("");
  const [quoteIdx]          = useState(() => Math.floor(Math.random() * 7));

  const handleSubmit = () => {
    setError("");
    const err = mode === "login"
      ? login({ email: form.email, password: form.password })
      : register(form);
    if (err) setError(err);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0f172a", display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
      <div style={{ width: "100%", maxWidth: 420 }}>

        {/* Lang toggle */}
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 16 }}>
          <button onClick={toggleLang} style={{ padding: "6px 14px", borderRadius: 8, border: "1px solid #334155", background: "#1e293b", color: "#94a3b8", cursor: "pointer", fontSize: 13, fontWeight: 600 }}>
            {t.langBtn}
          </button>
        </div>

        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ width: 72, height: 72, borderRadius: 20, background: "linear-gradient(135deg,#6366f1,#8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, margin: "0 auto 16px" }}>📚</div>
          <h1 style={{ color: "#f1f5f9", fontSize: 26, fontWeight: 800 }}>{t.appName}</h1>
          <p style={{ color: "#64748b", fontSize: 13, marginTop: 6 }}>{t.appSub}</p>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", background: "#1e293b", borderRadius: 12, padding: 4, marginBottom: 24 }}>
          {["login", "register"].map(m => (
            <button key={m} className="tab-btn" onClick={() => { setMode(m); setError(""); }} style={{
              flex: 1, padding: "10px 0", borderRadius: 9, border: "none",
              background: mode === m ? "#6366f1" : "transparent",
              color: mode === m ? "#fff" : "#64748b",
              fontWeight: 700, cursor: "pointer", fontSize: 14, transition: "all .2s",
            }}>
              {m === "login" ? t.login : t.register}
            </button>
          ))}
        </div>

        {/* Form card */}
        <div style={{ background: "#1e293b", borderRadius: 20, padding: 28, border: "1px solid #334155" }}>
          {mode === "register" && (
            <FormField label={t.fullName}>
              <input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder={t.namePh} style={inp(t.dir)} />
            </FormField>
          )}
          <FormField label={t.email}>
            <input type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} placeholder={t.emailPh} style={inp("ltr")} />
          </FormField>
          <FormField label={t.password} last>
            <input type="password" value={form.password} onChange={e => setForm(p => ({ ...p, password: e.target.value }))} onKeyDown={e => e.key === "Enter" && handleSubmit()} placeholder={t.passPh} style={inp()} />
          </FormField>

          {error && (
            <div style={{ color: "#ef4444", fontSize: 13, marginBottom: 16, padding: "10px 14px", background: "#ef444420", borderRadius: 8 }}>
              ⚠️ {error}
            </div>
          )}

          <button onClick={handleSubmit} style={{ width: "100%", padding: "13px 0", borderRadius: 12, border: "none", background: "linear-gradient(135deg,#6366f1,#8b5cf6)", color: "#fff", fontWeight: 800, fontSize: 16, cursor: "pointer" }}>
            {mode === "login" ? t.loginBtn : t.registerBtn}
          </button>
        </div>

        <p style={{ textAlign: "center", color: "#475569", fontSize: 12, marginTop: 20 }}>{t.quotes[quoteIdx]}</p>
      </div>
    </div>
  );
}

function FormField({ label, children, last }) {
  return (
    <div style={{ marginBottom: last ? 20 : 16 }}>
      <label style={{ color: "#94a3b8", fontSize: 13, fontWeight: 600, display: "block", marginBottom: 6 }}>{label}</label>
      {children}
    </div>
  );
}

const inp = (dir = "ltr") => ({
  width: "100%", padding: "12px 16px", borderRadius: 10,
  border: "1px solid #334155", background: "#0f172a",
  color: "#f1f5f9", fontSize: 14, direction: dir,
});
