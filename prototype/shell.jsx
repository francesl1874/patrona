// shell.jsx — sidebar, topbar, layout

const Sidebar = ({ activeView, setActiveView, activeClient, setActiveClient, clients, familyMode, mobileOpen, onClose }) => {
  if (familyMode) return <FamilySidebar activeView={activeView} setActiveView={setActiveView} mobileOpen={mobileOpen} onClose={onClose} />;

  const overview = [
    { id: 'today', label: 'Today', icon: 'home', count: 7 },
  ];
  const workspace = [
    { id: 'tasks', label: 'Tasks', icon: 'check', count: window.TASKS ? window.TASKS.filter(t => !t.done).length : 0 },
    { id: 'time', label: 'Time & billing', icon: 'receipt' },
    { id: 'calendar', label: 'Calendar', icon: 'calendar' },
    { id: 'inbox', label: 'Inbox', icon: 'inbox' },
  ];

  const handleNav = (id) => { setActiveView(id); onClose && onClose(); };
  const handleClient = (id) => { setActiveClient(id); onClose && onClose(); };

  return (
    <aside className={`sidebar ${mobileOpen ? 'open' : ''}`}>
      <div className="brand">
        <div className="brand-mark"><PatronaMark /></div>
        <div className="col">
          <div className="brand-name">Patrona</div>
          <div className="brand-sub">Care coordination</div>
        </div>
      </div>

      <div>
        <div className="side-section-label">Overview</div>
        <nav className="nav">
          {overview.map(n => (
            <button key={n.id} className={`nav-item ${activeView === n.id ? 'active' : ''}`} onClick={() => handleNav(n.id)}>
              <Icon name={n.icon} className="ico" />
              <span>{n.label}</span>
              {n.count != null && <span className="count">{n.count}</span>}
            </button>
          ))}
        </nav>
      </div>

      <div>
        <div className="side-section-label row spread" style={{paddingRight: 6}}>
          <span>Clients</span>
          <button className="btn ghost sm" style={{padding: '2px 6px'}} onClick={() => alert('We\'re currently building the client onboarding experience. Stay tuned!')}><Icon name="plus" size={12} /></button>
        </div>
        <div className="clients">
          {clients.map(c => (
            <button key={c.id} className={`client-row ${activeClient === c.id && activeView === 'notes' ? 'active' : ''}`} onClick={() => handleClient(c.id)}>
              <div className="avatar">{c.initials}</div>
              <div className="client-meta">
                <div className="client-name">{c.name}</div>
                <div className="client-status"><span className={`dot ${c.status}`}></span>{c.statusLabel}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="side-section-label">Workspace</div>
        <nav className="nav">
          {workspace.map(n => (
            <button key={n.id} className={`nav-item ${activeView === n.id ? 'active' : ''}`} onClick={() => handleNav(n.id)}>
              <Icon name={n.icon} className="ico" />
              <span>{n.label}</span>
              {n.count != null && <span className="count">{n.count}</span>}
            </button>
          ))}
        </nav>
      </div>

      <div className="me-card">
        <div className="avatar">PM</div>
        <div className="col" style={{minWidth: 0, flex: 1}}>
          <div style={{fontSize: 13, fontWeight: 500}}>Sarah Marshall</div>
          <div style={{fontSize: 11, color: 'var(--muted)'}}>CMC · 4 clients</div>
        </div>
        <button className="btn ghost icon"><Icon name="settings" size={14} /></button>
      </div>
    </aside>
  );
};

const FamilySidebar = ({ activeView, setActiveView, mobileOpen, onClose }) => {
  const nav = [
    { id: 'today', label: 'Today', icon: 'home' },
    { id: 'timeline', label: 'Mom\'s timeline', icon: 'activity' },
    { id: 'careplan', label: 'Care plan', icon: 'heart' },
    { id: 'capture', label: 'Log a call', icon: 'mic' },
    { id: 'tasks', label: 'What needs doing', icon: 'check' },
  ];
  const handleNav = (id) => { setActiveView(id); onClose && onClose(); };
  return (
    <aside className={`sidebar ${mobileOpen ? 'open' : ''}`}>
      <div className="brand">
        <div className="brand-mark"><PatronaMark /></div>
        <div className="col">
          <div className="brand-name">Patrona</div>
          <div className="brand-sub">For families</div>
        </div>
      </div>
      <div>
        <nav className="nav">
          {nav.map(n => (
            <button key={n.id} className={`nav-item ${activeView === n.id ? 'active' : ''}`} onClick={() => handleNav(n.id)}>
              <Icon name={n.icon} className="ico" />
              <span>{n.label}</span>
            </button>
          ))}
        </nav>
      </div>
      <div className="card" style={{padding: 14, background: 'var(--primary-soft)', border: 'none'}}>
        <div style={{fontFamily: 'var(--serif)', fontSize: 16, color: 'var(--primary-ink)', marginBottom: 4}}>Caring for Mom</div>
        <div style={{fontSize: 12, color: 'var(--primary-ink)', opacity: 0.8, lineHeight: 1.45}}>Shared with Marcus, Dana, and Kate. Everyone sees the same plan.</div>
      </div>
      <div className="me-card">
        <div className="avatar">DO</div>
        <div className="col" style={{minWidth: 0, flex: 1}}>
          <div style={{fontSize: 13, fontWeight: 500}}>Dana Okafor</div>
          <div style={{fontSize: 11, color: 'var(--muted)'}}>Daughter · primary</div>
        </div>
      </div>
    </aside>
  );
};

const TopBar = ({ breadcrumbs, right, onMenuToggle }) => (
  <div className="topbar">
    <button className="mobile-menu-btn" onClick={onMenuToggle}>
      <Icon name="menu" size={18} />
    </button>
    <div className="crumb">
      {breadcrumbs.map((b, i) => (
        <React.Fragment key={i}>
          {i > 0 && <span className="sep">/</span>}
          <span className={i === breadcrumbs.length - 1 ? 'here' : ''}>{b}</span>
        </React.Fragment>
      ))}
    </div>
    <div className="topbar-actions">{right}</div>
  </div>
);

Object.assign(window, { Sidebar, TopBar });
