import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { LANGS } from "../utils/translations";
import { uid, today, store, playDone } from "../utils/helpers";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  // ── language ──
  const [lang, setLang] = useState(() => store.get("sma_lang", "en"));
  const t = LANGS[lang];
  const toggleLang = () => {
    const nl = lang === "en" ? "ar" : "en";
    setLang(nl);
    store.set("sma_lang", nl);
  };

  // ── auth ──
  const [users, setUsers]             = useState(() => store.get("sma_users", []));
  const [currentUser, setCurrentUser] = useState(() => store.get("sma_current", null));
  const [welcomeMsg, setWelcomeMsg]   = useState(null);

  const register = ({ name, email, password }) => {
    if (!name || !email || !password) return t.errFields;
    if (users.find(u => u.email === email)) return t.errEmail;
    const user = { id: uid(), name, email, password: btoa(password) };
    setUsers(p => [...p, user]);
    setCurrentUser(user);
    setWelcomeMsg({ name });
    return null;
  };

  const login = ({ email, password }) => {
    const user = users.find(u => u.email === email && u.password === btoa(password));
    if (!user) return t.errLogin;
    setCurrentUser(user);
    setWelcomeMsg({ name: user.name });
    return null;
  };

  const logout = () => { setCurrentUser(null); setWelcomeMsg(null); };

  // ── tasks ──
  const [tasks, setTasks] = useState(() => store.get("sma_tasks", []));

  const addTask    = (form) => setTasks(p => [...p, { id: uid(), ...form, done: false, createdAt: Date.now() }]);
  const updateTask = (id, form) => setTasks(p => p.map(tk => tk.id === id ? { ...tk, ...form } : tk));
  const deleteTask = (id) => setTasks(p => p.filter(tk => tk.id !== id));
  const toggleTask = (id, onDone) => {
    setTasks(p => p.map(tk => {
      if (tk.id !== id) return tk;
      const next = !tk.done;
      if (next) { playDone(); setCompletedTasks(c => c + 1); onDone?.(); }
      return { ...tk, done: next };
    }));
  };

  // ── study log / streak ──
  const [studyLog,       setStudyLog]       = useState(() => store.get("sma_study_log", {}));
  const [streak,         setStreak]         = useState(() => store.get("sma_streak", 0));
  const [completedTasks, setCompletedTasks] = useState(() => store.get("sma_completed", 0));

  const addStudyTime = useCallback((mins) => {
    const key = today();
    setStudyLog(p => ({ ...p, [key]: (p[key] || 0) + mins }));
  }, []);

  const todayMins = studyLog[today()] || 0;

  const weekData = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(); d.setDate(d.getDate() - (6 - i));
    const key = d.toISOString().slice(0, 10);
    return { mins: studyLog[key] || 0, isToday: key === today() };
  });

  // ── persist ──
  useEffect(() => { store.set("sma_users",     users);          }, [users]);
  useEffect(() => { store.set("sma_current",   currentUser);    }, [currentUser]);
  useEffect(() => { store.set("sma_tasks",     tasks);          }, [tasks]);
  useEffect(() => { store.set("sma_study_log", studyLog);       }, [studyLog]);
  useEffect(() => { store.set("sma_streak",    streak);         }, [streak]);
  useEffect(() => { store.set("sma_completed", completedTasks); }, [completedTasks]);

  // ── helpers ──
  const getCatEmoji = (cat) => {
    const idx = t.cats.indexOf(cat);
    if (idx >= 0) {
      const enKey = LANGS.en.cats[idx];
      return LANGS.en.catEmoji[enKey] || "📌";
    }
    return t.catEmoji?.[cat] || "📌";
  };

  return (
    <AppContext.Provider value={{
      lang, t, toggleLang,
      users, currentUser, welcomeMsg, setWelcomeMsg,
      register, login, logout,
      tasks, addTask, updateTask, deleteTask, toggleTask,
      studyLog, streak, completedTasks, todayMins, weekData,
      addStudyTime, getCatEmoji,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
