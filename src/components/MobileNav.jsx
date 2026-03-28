import { NAV_IDS } from "../utils/helpers";

export default function MobileNav({ t, activeTab, setActiveTab }) {
  return (
    <nav className="mobile-nav">
      {NAV_IDS.map((id, i) => (
        <button
          key={id}
          onClick={() => setActiveTab(id)}
          style={{
            flex: 1, display: "flex", flexDirection: "column",
            alignItems: "center", gap: 2, padding: "6px 0",
            border: "none", background: "transparent",
            color: activeTab === id ? "#818cf8" : "#475569",
            cursor: "pointer", fontSize: 10,
            fontWeight: activeTab === id ? 700 : 500,
            transition: "color .2s",
          }}
        >
          <span style={{ fontSize: 20 }}>{t.navIcons[i]}</span>
          <span style={{ fontSize: 10 }}>{t.nav[i]}</span>
        </button>
      ))}
    </nav>
  );
}
