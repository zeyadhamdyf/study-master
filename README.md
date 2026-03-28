# 📚 StudyMaster — Engineer Zeyad Hamdy's Study System

A fully responsive, bilingual (Arabic / English) study management app.

## 🚀 Quick Start

```bash
npx create-react-app study-master
cd study-master

# Replace src/ with the provided src/ folder, then:
npm start
```

Open [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
study-master/
├── public/
└── src/
    ├── App.jsx                  ← Root: wires everything together
    │
    ├── context/
    │   └── AppContext.jsx        ← Global state (auth, tasks, study log, lang)
    │
    ├── hooks/
    │   └── useToast.js           ← Toast notification hook
    │
    ├── utils/
    │   ├── translations.js       ← All EN/AR text strings
    │   └── helpers.js            ← uid, today, store, playDone, constants
    │
    ├── assets/
    │   └── styles.js             ← Global CSS (responsive grid, animations)
    │
    ├── components/               ← Reusable UI pieces
    │   ├── Avatar.jsx
    │   ├── AchievementBadge.jsx
    │   ├── Toast.jsx
    │   ├── PomodoroWidget.jsx
    │   ├── WeeklyChart.jsx
    │   ├── TaskModal.jsx
    │   ├── Topbar.jsx
    │   ├── Sidebar.jsx
    │   └── MobileNav.jsx
    │
    └── pages/                    ← Full page views
        ├── AuthPage.jsx
        ├── WelcomePage.jsx
        ├── Dashboard.jsx
        ├── TasksPage.jsx
        ├── SchedulePage.jsx
        ├── PomodoroPage.jsx
        ├── StatsPage.jsx
        └── TipsPage.jsx
```

## ✨ Features
- 🌐 Arabic / English toggle (RTL support)
- 📱 Fully responsive — mobile bottom nav, desktop sidebar
- ✅ Task manager (add, edit, delete, complete, priority, deadline)
- 📅 Smart scheduler (auto-builds daily timetable)
- 🍅 Pomodoro timer with sound effects
- 📊 Weekly progress chart + achievements
- 💡 Tips & motivational quotes
- 🔔 Deadline notifications
- 💾 LocalStorage persistence
