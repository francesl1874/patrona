// app.jsx — main app + Tweaks

const { useState, useEffect } = React;

const TWEAKS_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "default",
  "showAI": true,
  "familyMode": false,
  "activeClient": "margaret"
}/*EDITMODE-END*/;

const SearchOverlay = ({ onClose, onSelectClient, onSelectView }) => {
  const [query, setQuery] = React.useState('');
  const inputRef = React.useRef(null);

  React.useEffect(() => { inputRef.current && inputRef.current.focus(); }, []);
  React.useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const q = query.toLowerCase().trim();
  const clients = q ? window.CLIENTS.filter(c =>
    (c.name + c.city + c.relation + c.diagnoses.join(' ') + c.statusLabel).toLowerCase().includes(q)
  ) : [];
  const tasks = q ? window.TASKS.filter(t => !t.done && (t.title + t.client).toLowerCase().includes(q)).slice(0, 5) : [];
  const activity = q ? window.ACTIVITY.filter(a => (a.title + a.excerpt + a.actor).toLowerCase().includes(q)).slice(0, 5) : [];
  const hasResults = clients.length || tasks.length || activity.length;

  return (
    <div style={{position: 'fixed', inset: 0, zIndex: 200, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: 80}}>
      <div style={{position: 'absolute', inset: 0, background: 'oklch(0.2 0 0 / 0.3)', backdropFilter: 'blur(2px)'}} onClick={onClose} />
      <div className="search-overlay-content" style={{position: 'relative', width: 560, background: 'var(--surface)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)', border: '1px solid var(--border)', overflow: 'hidden'}}>
        <div className="row" style={{padding: '14px 18px', gap: 10, borderBottom: '1px solid var(--border)'}}>
          <Icon name="search" size={16} className="muted" />
          <input
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search clients, tasks, activity…"
            style={{flex: 1, border: 'none', outline: 'none', fontSize: 15, background: 'transparent', color: 'var(--ink)'}}
          />
          <div className="kbd">esc</div>
        </div>
        {q && (
          <div style={{maxHeight: 400, overflowY: 'auto'}}>
            {!hasResults && (
              <div className="muted" style={{padding: 28, textAlign: 'center', fontSize: 13}}>No results for "{query}"</div>
            )}
            {clients.length > 0 && (
              <div>
                <div style={{padding: '10px 18px', fontSize: 11, fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--muted)', background: 'var(--bg-2)'}}>Clients</div>
                {clients.map(c => (
                  <button key={c.id} onClick={() => { onSelectClient(c.id); onClose(); }} style={{
                    display: 'flex', alignItems: 'center', gap: 12, padding: '10px 18px', width: '100%',
                    textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', borderBottom: '1px solid var(--border)',
                  }} onMouseEnter={e => e.currentTarget.style.background='var(--bg-2)'} onMouseLeave={e => e.currentTarget.style.background='transparent'}>
                    <div className="avatar">{c.initials}</div>
                    <div style={{flex: 1}}>
                      <div style={{fontSize: 13.5, fontWeight: 500}}>{c.name}</div>
                      <div className="muted" style={{fontSize: 11.5}}>{c.age} · {c.city} · {c.statusLabel}</div>
                    </div>
                    <Icon name="chevron" size={14} className="muted" />
                  </button>
                ))}
              </div>
            )}
            {tasks.length > 0 && (
              <div>
                <div style={{padding: '10px 18px', fontSize: 11, fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--muted)', background: 'var(--bg-2)'}}>Tasks</div>
                {tasks.map(t => (
                  <button key={t.id} onClick={() => { onSelectView('tasks'); onClose(); }} style={{
                    display: 'flex', alignItems: 'center', gap: 10, padding: '10px 18px', width: '100%',
                    textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', borderBottom: '1px solid var(--border)',
                  }} onMouseEnter={e => e.currentTarget.style.background='var(--bg-2)'} onMouseLeave={e => e.currentTarget.style.background='transparent'}>
                    <Icon name="check" size={13} className="muted" />
                    <div style={{flex: 1}}>
                      <div style={{fontSize: 13, fontWeight: 500}}>{t.title}</div>
                      <div className="muted" style={{fontSize: 11.5}}>{t.client} · {t.due}</div>
                    </div>
                    <span className={`tag ${t.priority === 'high' ? 'rose' : t.priority === 'med' ? 'amber' : ''}`}>{t.priority}</span>
                  </button>
                ))}
              </div>
            )}
            {activity.length > 0 && (
              <div>
                <div style={{padding: '10px 18px', fontSize: 11, fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--muted)', background: 'var(--bg-2)'}}>Activity</div>
                {activity.map(a => (
                  <div key={a.id} style={{padding: '10px 18px', borderBottom: '1px solid var(--border)', fontSize: 13}}>
                    <div style={{fontWeight: 500, marginBottom: 2}}>{a.title}</div>
                    <div className="muted" style={{fontSize: 11.5}}>{a.date} · {a.actor}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const App = () => {
  const [view, setView] = useState(() => {
    try { return localStorage.getItem('gcm:view') || 'capture'; } catch { return 'capture'; }
  });
  const [tweaks, setTweaks] = useState(TWEAKS_DEFAULTS);
  const [tweaksVisible, setTweaksVisible] = useState(false);
  const [tasksHighlighted, setTasksHighlighted] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    try { localStorage.setItem('gcm:view', view); } catch {}
  }, [view]);

  // Apply theme
  useEffect(() => {
    document.documentElement.dataset.theme = tweaks.theme;
  }, [tweaks.theme]);

  // Edit mode handshake
  useEffect(() => {
    const onMsg = (e) => {
      if (e.data?.type === '__activate_edit_mode') setTweaksVisible(true);
      else if (e.data?.type === '__deactivate_edit_mode') setTweaksVisible(false);
    };
    window.addEventListener('message', onMsg);
    window.parent.postMessage({type: '__edit_mode_available'}, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);

  const updateTweak = (key, value) => {
    setTweaks(t => ({...t, [key]: value}));
    window.parent.postMessage({type: '__edit_mode_set_keys', edits: {[key]: value}}, '*');
  };

  const client = window.CLIENTS.find(c => c.id === tweaks.activeClient) || window.CLIENTS[0];

  const openTasks = () => {
    setTasksHighlighted(true);
    setView('tasks');
    setTimeout(() => setTasksHighlighted(false), 2000);
  };

  const breadcrumbs = tweaks.familyMode
    ? ['Family', client.name.split(' ')[0], viewLabel(view, true)]
    : view === 'today'
      ? ['Sarah Marshall', viewLabel(view, false)]
      : ['Sarah Marshall', client.name, viewLabel(view, false)];

  if (showSplash) {
    return (
      <div style={{
        position: 'fixed', inset: 0, background: 'var(--bg)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        animation: 'fadeIn 0.5s ease',
      }}>
        <div style={{
          width: 64, height: 64, borderRadius: 16, background: 'var(--primary)', color: 'var(--bg)',
          display: 'grid', placeItems: 'center', marginBottom: 20,
        }}>
          <PatronaMark size={36} />
        </div>
        <div style={{fontFamily: 'var(--sans)', fontSize: 28, fontWeight: 600, letterSpacing: '-0.02em', marginBottom: 8}}>
          Welcome to Patrona
        </div>
        <div style={{color: 'var(--muted)', fontSize: 15, maxWidth: 360, textAlign: 'center', lineHeight: 1.5}}>
          Care coordination that works for everyone.
        </div>
      </div>
    );
  }

  return (
    <div className="app" data-screen-label={`${tweaks.familyMode ? 'Family' : 'GCM'} · ${viewLabel(view)}`}>
      <div className={`sidebar-backdrop ${mobileMenuOpen ? 'open' : ''}`} onClick={() => setMobileMenuOpen(false)} />
      <Sidebar
        activeView={view}
        setActiveView={setView}
        activeClient={tweaks.activeClient}
        setActiveClient={(id) => { updateTweak('activeClient', id); setView('notes'); }}
        clients={window.CLIENTS}
        familyMode={tweaks.familyMode}
        mobileOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
      <div className="main">
        <TopBar
          breadcrumbs={breadcrumbs}
          onMenuToggle={() => setMobileMenuOpen(o => !o)}
          right={<>
            <button className="btn ghost" onClick={() => setSearchOpen(true)}><Icon name="search" size={14} /></button>
            <button className="btn ghost" onClick={() => setView('inbox')}><Icon name="inbox" size={14} /></button>
            <button className="btn primary"><Icon name="plus" size={13} /> New</button>
          </>}
        />
        <div className="content" key={view + tweaks.familyMode}>
          {tweaks.familyMode ? (
            <FamilyView view={view} client={client} />
          ) : (
            <>
              {view === 'notes' && <ClientPage key={client.id} client={client} onOpenTasks={openTasks} />}
              {view === 'today' && <TodayView client={client} setView={setView} setActiveClient={(id) => { updateTweak('activeClient', id); setView('notes'); }} />}
              {view === 'tasks' && <TasksView highlighted={tasksHighlighted} />}
              {view === 'time' && <TimeView client={client} />}
              {view === 'calendar' && <CalendarView />}
              {view === 'inbox' && <InboxView />}
            </>
          )}
        </div>
      </div>
      {tweaksVisible && <TweaksPanel tweaks={tweaks} update={updateTweak} clients={window.CLIENTS} />}
      {searchOpen && <SearchOverlay
        onClose={() => setSearchOpen(false)}
        onSelectClient={(id) => { updateTweak('activeClient', id); setView('notes'); }}
        onSelectView={setView}
      />}
    </div>
  );
};

const viewLabel = (v, family) => {
  const map = {
    notes: 'Client',
    today: family ? 'Today' : 'Today',
    capture: family ? 'Log a call' : 'Call capture',
    timeline: 'Timeline',
    careplan: 'Care plan',
    tasks: 'Tasks',
    time: 'Time & billing',
    calendar: 'Calendar',
    inbox: 'Inbox',
  };
  return map[v] || v;
};

const TweaksPanel = ({ tweaks, update, clients }) => {
  const themes = [
    { id: 'default', color: 'oklch(0.56 0.12 40)' },
    { id: 'sage', color: 'oklch(0.52 0.08 165)' },
    { id: 'indigo', color: 'oklch(0.5 0.13 275)' },
    { id: 'plum', color: 'oklch(0.48 0.12 340)' },
  ];
  return (
    <div className="tweaks">
      <h4>Tweaks</h4>

      <div className="tweak-group">
        <div className="tweak-label">Accent color</div>
        <div className="swatches">
          {themes.map(t => (
            <button
              key={t.id}
              className={`swatch ${tweaks.theme === t.id ? 'active' : ''}`}
              style={{background: t.color}}
              onClick={() => update('theme', t.id)}
              title={t.id}
            />
          ))}
        </div>
      </div>

      <div className="tweak-group">
        <div className="tweak-label">View</div>
        <div className="segmented" style={{width: '100%'}}>
          <button
            className={!tweaks.familyMode ? 'active' : ''}
            onClick={() => update('familyMode', false)}
            style={{flex: 1}}
          >GCM</button>
          <button
            className={tweaks.familyMode ? 'active' : ''}
            onClick={() => update('familyMode', true)}
            style={{flex: 1}}
          >Family</button>
        </div>
      </div>

      <div className="tweak-group">
        <div className="switch-row">
          <div>
            <div style={{fontSize: 13, fontWeight: 500}}>AI side panel</div>
            <div style={{fontSize: 11, color: 'var(--muted)'}}>During live calls</div>
          </div>
          <div className={`switch ${tweaks.showAI ? 'on' : ''}`} onClick={() => update('showAI', !tweaks.showAI)} />
        </div>
      </div>

      <div className="tweak-group">
        <div className="tweak-label">Client persona</div>
        <div className="col" style={{gap: 2}}>
          {clients.map(c => (
            <button
              key={c.id}
              onClick={() => update('activeClient', c.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '6px 8px', borderRadius: 6,
                background: tweaks.activeClient === c.id ? 'var(--bg-2)' : 'transparent',
                textAlign: 'left', fontSize: 12.5,
              }}
            >
              <span className={`dot ${c.status}`} />
              <span style={{flex: 1}}>{c.name}</span>
              <span className="muted" style={{fontSize: 11}}>{c.age}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
