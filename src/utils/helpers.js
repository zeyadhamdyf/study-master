export const ACHIEVEMENTS_DEF = [
  { id: "first_task", icon: "🎯", condition: (s) => s.completedTasks >= 1 },
  { id: "five_tasks", icon: "⚡", condition: (s) => s.completedTasks >= 5 },
  { id: "streak_3",   icon: "🔥", condition: (s) => s.streak >= 3 },
  { id: "study_2h",   icon: "⏰", condition: (s) => s.todayMinutes >= 120 },
  { id: "study_5h",   icon: "🏆", condition: (s) => s.todayMinutes >= 300 },
  { id: "ten_tasks",  icon: "💎", condition: (s) => s.completedTasks >= 10 },
];

export const PRIORITY_COLOR = {
  Low: "#22c55e", Medium: "#f59e0b", High: "#ef4444",
  "منخفض": "#22c55e", "متوسط": "#f59e0b", "عالي": "#ef4444",
};

export const NAV_IDS = ["dashboard", "tasks", "schedule", "pomodoro", "stats", "tips"];

export const uid   = () => Math.random().toString(36).slice(2);
export const fmtT  = (s) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
export const today = () => new Date().toISOString().slice(0, 10);

export const store = {
  get: (k, d) => { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch { return d; } },
  set: (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} },
};

export function playDone() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    [523, 659, 784].forEach((f, i) => {
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.connect(g); g.connect(ctx.destination);
      o.frequency.value = f; o.type = "sine";
      g.gain.setValueAtTime(0.3, ctx.currentTime + i * 0.12);
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.12 + 0.4);
      o.start(ctx.currentTime + i * 0.12);
      o.stop(ctx.currentTime + i * 0.12 + 0.4);
    });
  } catch {}
}
