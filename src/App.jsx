import { useState, useEffect } from "react";
import { AppProvider, useApp } from "./context/AppContext";
import { GLOBAL_CSS } from "./assets/styles";

// Pages
import AuthPage     from "./pages/AuthPage";
import WelcomePage  from "./pages/WelcomePage";
import Dashboard    from "./pages/Dashboard";
import TasksPage    from "./pages/TasksPage";
import SchedulePage from "./pages/SchedulePage";
import PomodoroPage from "./pages/PomodoroPage";
import StatsPage    from "./pages/StatsPage";
import TipsPage     from "./pages/TipsPage";

// Components
import Topbar    from "./components/Topbar";
import Sidebar   from "./components/Sidebar";
import MobileNav from "./components/MobileNav";
import TaskModal from "./components/TaskModal";
import Toast     from "./components/Toast";

// Hooks
import { useToast } from "./hooks/useToast";

// ── Inner app (needs context) ─────────────────────────────────────────────────
function Inner() {
  const {
    t, toggleLang,
    currentUser, welcomeMsg, logout,
    tasks, addTask, updateTask, deleteTask, toggleTask,
    streak, todayMins,
  } = useApp();

  const { toast, showToast } = useToast();

  const [activeTab,  setActiveTab]  = useState("dashboard");
  const [showModal,  setShowModal]  = useState(false);
  const [editTask,   setEditTask]   = useState(null);
  const [taskForm,   setTaskForm]   = useState({ title: "", category: "", priority: "", deadline: "", notes: "" });
  const [notifs,     setNotifs]     = useState([]);

  const isRTL      = t.dir === "rtl";
  const fontFamily = isRTL
    ? "'Segoe UI','Cairo','Tajawal',system-ui,sans-serif"
    : "'Segoe UI',system-ui,sans-serif";

  // ── deadline notifications ──
  useEffect(() => {
    const now    = Date.now();
    const alerts = tasks
      .filter(tk => !tk.done && tk.deadline)
      .filter(tk => { const d = new Date(tk.deadline).getTime() - now; return d > 0 && d < 86400000; })
      .map(tk => ({ id: tk.id, msg: t.notifDue(tk.title) }));
    setNotifs(alerts);
  }, [tasks, t]);

  // ── task modal helpers ──
  const openAdd = () => {
    setEditTask(null);
    setTaskForm({ title: "", category: t.cats[0], priority: t.pris[1], deadline: "", notes: "" });
    setShowModal(true);
  };

  const openEdit = (tk) => {
    setEditTask(tk);
    setTaskForm({ title: tk.title, category: tk.category, priority: tk.priority, deadline: tk.deadline || "", notes: tk.notes || "" });
    setShowModal(true);
  };

  const handleSave = () => {
    if (!taskForm.title.trim()) return;
    if (editTask) { updateTask(editTask.id, taskForm); showToast(t.toastUpd); }
    else          { addTask(taskForm);                 showToast(t.toastAdd); }
    setShowModal(false);
  };

  // wrap toggleTask to also show toast
  const handleToggle = (id) => {
    toggleTask(id, () => showToast(t.toastDone));
  };

  // ── show auth / welcome if needed ──
  if (!currentUser) return <AuthPage />;
  if (welcomeMsg)   return <WelcomePage />;

  // ── page map ──
  const pages = {
    dashboard: <Dashboard onAddTask={openAdd} />,
    tasks:     <TasksPage onAdd={openAdd} onEdit={openEdit} />,
    schedule:  <SchedulePage />,
    pomodoro:  <PomodoroPage />,
    stats:     <StatsPage />,
    tips:      <TipsPage />,
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0f172a", fontFamily, direction: t.dir, display: "flex", flexDirection: "column" }}>
      <style>{GLOBAL_CSS}</style>

      {/* Top bar */}
      <Topbar
        t={t}
        currentUser={currentUser}
        streak={streak}
        notifs={notifs}
        onLogout={logout}
        onToggleLang={toggleLang}
      />

      {/* Notification bar */}
      {notifs.length > 0 && (
        <div style={{ background: "#ef444415", borderBottom: "1px solid #ef444440", padding: "7px 16px", display: "flex", gap: 16, overflowX: "auto", flexShrink: 0 }}>
          {notifs.map(n => <span key={n.id} style={{ color: "#fca5a5", fontSize: 13, whiteSpace: "nowrap" }}>{n.msg}</span>)}
        </div>
      )}

      {/* Body */}
      <div className="main-layout">
        <Sidebar t={t} activeTab={activeTab} setActiveTab={setActiveTab} todayMins={todayMins} isRTL={isRTL} />
        <div className="content-area">
          {pages[activeTab]}
        </div>
      </div>

      {/* Mobile nav */}
      <MobileNav t={t} activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Task modal */}
      {showModal && (
        <TaskModal
          t={t}
          editTask={editTask}
          taskForm={taskForm}
          setTaskForm={setTaskForm}
          onSave={handleSave}
          onClose={() => setShowModal(false)}
        />
      )}

      {/* Toast */}
      <Toast toast={toast} isRTL={isRTL} />
    </div>
  );
}

// ── Root export ───────────────────────────────────────────────────────────────
export default function App() {
  return (
    <AppProvider>
      <Inner />
    </AppProvider>
  );
}
