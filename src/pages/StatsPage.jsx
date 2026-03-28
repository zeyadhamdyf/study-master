import { useApp } from "../context/AppContext";
import { ACHIEVEMENTS_DEF } from "../utils/helpers";
import WeeklyChart from "../components/WeeklyChart";
import AchievementBadge from "../components/AchievementBadge";

export default function StatsPage() {
  const { t, completedTasks, streak, todayMins, weekData, studyLog } = useApp();

  const stats       = { completedTasks, streak, todayMinutes: todayMins };
  const earnedAchs  = ACHIEVEMENTS_DEF.filter(a => a.condition(stats));
  const totalMins   = Object.values(studyLog).reduce((a, b) => a + b, 0);

  return (
    <div style={{ animation: "fadeIn .4s ease" }}>
      <h2 style={{ color: "#f1f5f9", fontSize: 22, fontWeight: 800, marginBottom: 20 }}>{t.statsTitle}</h2>

      <div className="grid-2" style={{ marginBottom: 20 }}>
        <WeeklyChart t={t} weekData={weekData} />

        {/* Achievements */}
        <div style={{ background: "#1e293b", borderRadius: 20, padding: 20, border: "1px solid #334155" }}>
          <h3 style={{ color: "#f1f5f9", marginBottom: 16, fontSize: 16, fontWeight: 700 }}>{t.achTitle}</h3>
          <div className="ach-grid">
            {ACHIEVEMENTS_DEF.map((a, i) => (
              <AchievementBadge
                key={a.id}
                ach={a}
                earned={earnedAchs.some(e => e.id === a.id)}
                label={t.achLabels[i]}
                desc={t.achDescs[i]}
              />
            ))}
          </div>
        </div>
      </div>

      {/* All-time */}
      <div style={{ background: "#1e293b", borderRadius: 20, padding: 20, border: "1px solid #334155" }}>
        <h3 style={{ color: "#f1f5f9", marginBottom: 16, fontSize: 16, fontWeight: 700 }}>{t.allTime}</h3>
        <div className="grid-4">
          {[
            { label: t.totalStudy, value: `${Math.round(totalMins / 60 * 10) / 10}h` },
            { label: t.tasksDone,  value: completedTasks },
            { label: t.bestStreak, value: `${streak} ${t.streakUnit}` },
            { label: t.todayLbl,   value: `${todayMins}m` },
          ].map(s => (
            <div key={s.label} style={{ background: "#0f172a", borderRadius: 12, padding: 16, textAlign: "center" }}>
              <div style={{ color: "#6366f1", fontSize: 20, fontWeight: 800 }}>{s.value}</div>
              <div style={{ color: "#64748b", fontSize: 12, marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
