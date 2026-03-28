export const GLOBAL_CSS = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html { font-size: 16px; }
  body { background: #0f172a; }
  input, select, textarea { outline: none; font-family: inherit; }
  input:focus, select:focus, textarea:focus { border-color: #6366f1 !important; }
  input::placeholder, textarea::placeholder { color: #475569; }
  ::-webkit-scrollbar { width: 5px; height: 5px; }
  ::-webkit-scrollbar-track { background: #0f172a; }
  ::-webkit-scrollbar-thumb { background: #334155; border-radius: 3px; }

  @keyframes fadeIn  { from { opacity:0; transform:translateY(8px) }  to { opacity:1; transform:translateY(0) } }
  @keyframes slideIn { from { opacity:0; transform:translateY(-10px) } to { opacity:1; transform:translateY(0) } }
  @keyframes bounce  { 0%,100% { transform:translateY(0) } 50% { transform:translateY(-14px) } }

  .tab-btn:hover    { background: #1e293b !important; }
  .task-card        { transition: transform .2s, box-shadow .2s; }
  .task-card:hover  { transform: translateY(-2px); box-shadow: 0 4px 20px rgba(99,102,241,.15); }
  .nav-item:hover   { background: #6366f115 !important; color: #818cf8 !important; }

  /* ── Layout ── */
  .sidebar      { display: flex; flex-direction: column; width: 200px; flex-shrink: 0; }
  .main-layout  { display: flex; flex: 1; min-height: 0; }
  .content-area { flex: 1; padding: 24px; overflow-y: auto; }

  /* ── Grids ── */
  .grid-2    { display: grid; grid-template-columns: repeat(2, 1fr);                         gap: 16px; }
  .grid-4    { display: grid; grid-template-columns: repeat(4, 1fr);                         gap: 16px; }
  .grid-auto { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));   gap: 16px; }
  .ach-grid  { display: grid; grid-template-columns: repeat(3, 1fr);                         gap: 10px; }

  /* ── Mobile nav ── */
  .mobile-nav   { display: none; }
  .topbar-right { display: flex; align-items: center; gap: 10px; }

  /* ── Responsive ── */
  @media (max-width: 900px) {
    .sidebar    { display: none; }
    .mobile-nav {
      display: flex;
      position: fixed; bottom: 0; left: 0; right: 0;
      background: #1e293b;
      border-top: 1px solid #334155;
      z-index: 90;
      padding: 6px 0 calc(6px + env(safe-area-inset-bottom));
    }
    .content-area { padding: 16px; padding-bottom: 80px; }
    .grid-4   { grid-template-columns: repeat(2, 1fr); }
    .ach-grid { grid-template-columns: repeat(2, 1fr); }
  }
  @media (max-width: 600px) {
    .grid-2    { grid-template-columns: 1fr; }
    .grid-auto { grid-template-columns: 1fr; }
    .content-area { padding: 12px; padding-bottom: 80px; }
    .topbar-right .user-name  { display: none; }
    .topbar-right .logout-btn { display: none; }
  }
  @media (max-width: 400px) {
    .grid-4   { grid-template-columns: repeat(2, 1fr); }
    .ach-grid { grid-template-columns: repeat(2, 1fr); }
  }
`;
