// views.jsx — remaining views: Today, Timeline, CarePlan, Tasks, Time & Billing

// ============ TODAY ============
const TodayView = ({ client, setView, setActiveClient }) => {
  const allClients = window.CLIENTS;
  const allTasks = window.TASKS;
  const openTasks = allTasks.filter(t => !t.done);

  return (
    <div className="page wide">
      <div className="page-hd">
        <div className="page-eyebrow">Tuesday · April 20</div>
        <h1 className="page-title">Good afternoon, Sarah.</h1>
        <div className="page-sub">{allClients.length} clients · {openTasks.length} open tasks · 2 flags needing attention</div>
      </div>

      <div className="today-pair" style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20}}>
        <div className="card" style={{padding: 20}}>
          <div className="row spread" style={{marginBottom: 14}}>
            <div className="row" style={{gap: 8}}>
              <Icon name="alert" size={14} style={{color: 'var(--rose)'}} />
              <span style={{fontSize: 12, fontWeight: 500, letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--muted)'}}>Flags</span>
            </div>
            <span className="tag rose">2 new</span>
          </div>
          <div className="col" style={{gap: 10}}>
            <FlagRow client="Arthur Whitfield" issue="Weight +3.2 lb in 2 days" source="Lakeside Manor auto-alert · 8:14 AM" />
            <FlagRow client="Harold Jensen" issue="Discharge in 10 days, home safety eval not scheduled" source="Care plan deadline" />
          </div>
        </div>

        <div className="card" style={{padding: 20}}>
          <div className="row spread" style={{marginBottom: 14}}>
            <div className="row" style={{gap: 8}}>
              <Icon name="phone" size={14} className="muted" />
              <span style={{fontSize: 12, fontWeight: 500, letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--muted)'}}>Coming up</span>
            </div>
          </div>
          <div className="col" style={{gap: 10}}>
            <UpcomingRow time="2:00 PM" title="Call: James Whitfield" sub="Arthur's weight alert follow-up" active onClick={() => setView('capture')} />
            <UpcomingRow time="3:30 PM" title="Home visit: Vivian Park" sub="Cambridge · 2 hr block" />
            <UpcomingRow time="5:00 PM" title="Pharmacy callback" sub="CVS Newton · Metoprolol Rx" />
          </div>
        </div>
      </div>

      {/* Client roster */}
      <div className="card roster-table" style={{padding: 0, overflow: 'hidden', marginBottom: 20}}>
        <div style={{padding: '14px 20px', borderBottom: '1px solid var(--border)', background: 'var(--bg-2)'}}>
          <div className="row spread">
            <div style={{fontSize: 12, fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--muted)'}}>All clients</div>
            <span className="muted" style={{fontSize: 12}}>{allClients.length} total</span>
          </div>
        </div>
        <div className="roster-header" style={{display: 'grid', gridTemplateColumns: '2fr 1fr 1.2fr 100px 80px', padding: '8px 20px', fontSize: 11, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 500, borderBottom: '1px solid var(--border)'}}>
          <div>Client</div><div>Status</div><div>Location</div><div>Open tasks</div><div></div>
        </div>
        {allClients.map(c => {
          const cTasks = allTasks.filter(t => t.client === c.name && !t.done).length;
          return (
            <button key={c.id} className="roster-row" onClick={() => setActiveClient(c.id)} style={{
              display: 'grid', gridTemplateColumns: '2fr 1fr 1.2fr 100px 80px',
              padding: '14px 20px', borderBottom: '1px solid var(--border)',
              alignItems: 'center', width: '100%', textAlign: 'left',
              background: 'transparent', cursor: 'pointer', fontSize: 13,
              transition: 'background 0.12s ease',
            }} onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-2)'}
               onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
              <div className="row" style={{gap: 10}}>
                <div className="avatar">{c.initials}</div>
                <div>
                  <div style={{fontWeight: 500}}>{c.name}</div>
                  <div className="muted" style={{fontSize: 11.5}}>{c.age} · {c.relation}</div>
                </div>
              </div>
              <div><span className={`tag ${c.status}`}>{c.statusLabel}</span></div>
              <div className="muted" style={{fontSize: 12.5}}>{c.city}</div>
              <div>{cTasks > 0 ? <span className="mono" style={{fontWeight: 500}}>{cTasks}</span> : <span className="muted">—</span>}</div>
              <div style={{textAlign: 'right'}}><Icon name="chevron" size={14} className="muted" /></div>
            </button>
          );
        })}
      </div>

      <div className="today-pair" style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16}}>
        <div className="card" style={{padding: 20}}>
          <div className="row spread" style={{marginBottom: 14}}>
            <div>
              <div style={{fontFamily: 'var(--serif)', fontSize: 18}}>Drafts awaiting approval</div>
              <div className="muted" style={{fontSize: 12, marginTop: 2}}>AI-drafted on your behalf. Review and send.</div>
            </div>
          </div>
          <DraftMessageCard />
        </div>

        <div className="card soft" style={{padding: 20}}>
          <div className="row spread" style={{marginBottom: 10}}>
            <div style={{fontSize: 12, fontWeight: 500, letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--muted)'}}>Automated this morning</div>
            <span className="ai-label"><Icon name="sparkle" size={10} /> Patrona handled 23 things</span>
          </div>
          <div className="auto-stat-grid" style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12}}>
            <AutoStat value="12" label="refill reminders sent" />
            <AutoStat value="7" label="appointments confirmed" />
            <AutoStat value="4" label="family updates drafted" />
          </div>
        </div>
      </div>
    </div>
  );
};

const FlagRow = ({ client, issue, source }) => (
  <div className="row" style={{gap: 12, padding: '10px 12px', background: 'var(--rose-soft)', borderRadius: 8, border: '1px solid oklch(0.88 0.04 20)'}}>
    <Icon name="alert" size={14} style={{color: 'var(--rose)', flexShrink: 0}} />
    <div style={{flex: 1, minWidth: 0}}>
      <div style={{fontSize: 13, fontWeight: 500}}>{client} · {issue}</div>
      <div style={{fontSize: 11.5, color: 'oklch(0.4 0.08 20)'}}>{source}</div>
    </div>
    <button className="btn sm">Review</button>
  </div>
);

const UpcomingRow = ({ time, title, sub, active, onClick }) => (
  <button onClick={onClick} className="row" style={{
    gap: 12, padding: '10px 12px', borderRadius: 8, textAlign: 'left', width: '100%',
    background: active ? 'var(--primary-soft)' : 'transparent',
    border: active ? '1px solid oklch(0.85 0.06 40)' : '1px solid transparent',
  }}>
    <div className="mono" style={{fontSize: 12, minWidth: 58, color: active ? 'var(--primary-ink)' : 'var(--muted)'}}>{time}</div>
    <div style={{flex: 1}}>
      <div style={{fontSize: 13, fontWeight: 500}}>{title}</div>
      <div style={{fontSize: 11.5, color: 'var(--muted)'}}>{sub}</div>
    </div>
    {active && <span className="tag primary">Now</span>}
  </button>
);

const AutoStat = ({ value, label }) => (
  <div style={{padding: '14px 16px', background: 'var(--surface)', borderRadius: 10, border: '1px solid var(--border)'}}>
    <div style={{fontFamily: 'var(--serif)', fontSize: 28, letterSpacing: '-0.02em'}}>{value}</div>
    <div className="muted" style={{fontSize: 12, marginTop: 2}}>{label}</div>
  </div>
);

// ============ DRAFT MESSAGE ============
const DraftMessageCard = () => {
  const [body, setBody] = React.useState(window.DRAFT_MESSAGE.body);
  const [sent, setSent] = React.useState(false);
  const [editing, setEditing] = React.useState(false);

  if (sent) {
    return (
      <div className="fade-in" style={{padding: '14px 16px', background: 'var(--sage-soft)', borderRadius: 10, display: 'flex', alignItems: 'center', gap: 10, color: 'oklch(0.35 0.06 150)'}}>
        <Icon name="check" size={14} /> Sent to Dana Okafor · Logged in timeline · 2 min billable
      </div>
    );
  }

  return (
    <div style={{border: '1px solid var(--border)', borderRadius: 10, overflow: 'hidden'}}>
      <div className="row spread" style={{padding: '10px 14px', background: 'var(--bg-2)', borderBottom: '1px solid var(--border)'}}>
        <div className="row" style={{gap: 8, fontSize: 12.5}}>
          <Icon name="message" size={13} className="muted" />
          <span className="muted">To:</span>
          <span style={{fontWeight: 500}}>Dana Okafor</span>
          <span className="muted">· SMS</span>
        </div>
        <span className="ai-label"><Icon name="sparkle" size={10} /> drafted from today's call</span>
      </div>
      <div className="ai-block" style={{padding: '14px 16px'}}>
        {editing ? (
          <textarea className="textarea" value={body} onChange={e => setBody(e.target.value)} rows={9} />
        ) : (
          <div style={{fontSize: 13.5, lineHeight: 1.6, whiteSpace: 'pre-wrap', fontFamily: 'var(--serif)', color: 'var(--ink-2)'}}>{body}</div>
        )}
      </div>
      <div className="row spread" style={{padding: '10px 14px', borderTop: '1px solid var(--border)', background: 'var(--bg-2)'}}>
        <button className="btn ghost sm" onClick={() => setEditing(e => !e)}>
          <Icon name="edit" size={12} /> {editing ? 'Done editing' : 'Edit'}
        </button>
        <div className="row" style={{gap: 6}}>
          <button className="btn ghost sm">Skip</button>
          <button className="btn primary sm" onClick={() => setSent(true)}>
            <Icon name="send" size={12} /> Send
          </button>
        </div>
      </div>
    </div>
  );
};

// ============ TIMELINE ============
const TimelineView = ({ client }) => {
  const [filter, setFilter] = React.useState('all');
  const [search, setSearch] = React.useState('');
  const filters = [
    { id: 'all', label: 'All' },
    { id: 'call', label: 'Calls' },
    { id: 'message', label: 'Messages' },
    { id: 'visit', label: 'Visits' },
    { id: 'note', label: 'Notes' },
    { id: 'automated', label: 'Automated' },
  ];

  const items = window.ACTIVITY.filter(a =>
    (filter === 'all' || a.type === filter) &&
    (search === '' || (a.title + a.excerpt + a.actor).toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="page wide">
      <div className="page-hd">
        <div className="page-eyebrow">{client.name}'s timeline</div>
        <h1 className="page-title">Everything, in one place.</h1>
        <div className="page-sub">Every call, visit, message, and action, captured automatically and shared across the care team.</div>
      </div>

      <div className="row" style={{gap: 10, marginBottom: 20, flexWrap: 'wrap'}}>
        <div style={{position: 'relative', flex: 1, minWidth: 200, maxWidth: 360}}>
          <Icon name="search" size={14} style={{position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)'}} />
          <input className="input" style={{paddingLeft: 34}} placeholder="Search timeline…" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div className="segmented">
          {filters.map(f => (
            <button key={f.id} className={filter === f.id ? 'active' : ''} onClick={() => setFilter(f.id)}>{f.label}</button>
          ))}
        </div>
      </div>

      <div className="card" style={{padding: '8px 0'}}>
        {items.length === 0 && <div className="muted" style={{padding: 40, textAlign: 'center'}}>No matching activity.</div>}
        {items.map((item, i) => <TimelineRow key={item.id} item={item} last={i === items.length - 1} />)}
      </div>
    </div>
  );
};

const typeMeta = {
  call: { icon: 'phone', color: 'var(--primary)' },
  message: { icon: 'message', color: 'var(--sage)' },
  visit: { icon: 'home2', color: 'var(--ink)' },
  note: { icon: 'file', color: 'var(--muted)' },
  automated: { icon: 'sparkle', color: 'var(--primary)' },
  task: { icon: 'check', color: 'var(--amber)' },
};

const TimelineRow = ({ item, last }) => {
  const m = typeMeta[item.type] || typeMeta.note;
  return (
    <div className="timeline-row" style={{display: 'grid', gridTemplateColumns: '160px 44px 1fr', padding: '14px 24px', borderBottom: last ? 'none' : '1px solid var(--border)', gap: 12}}>
      <div className="timeline-date muted" style={{fontSize: 12, paddingTop: 4}}>{item.date}</div>
      <div style={{display: 'flex', justifyContent: 'center', position: 'relative'}}>
        <div style={{
          width: 28, height: 28, borderRadius: '50%',
          background: 'var(--surface)', border: '1px solid var(--border)',
          display: 'grid', placeItems: 'center', color: m.color, zIndex: 1,
        }}>
          <Icon name={m.icon} size={13} />
        </div>
        {!last && <div style={{position: 'absolute', top: 28, bottom: -14, left: '50%', width: 1, background: 'var(--border)'}} />}
      </div>
      <div>
        <div className="row spread" style={{marginBottom: 3}}>
          <div style={{fontSize: 13.5, fontWeight: 500}}>{item.title}</div>
          <div className="row" style={{gap: 6}}>
            {item.ai && <span className="ai-label"><Icon name="sparkle" size={9} /> AI</span>}
            <span className="muted" style={{fontSize: 11.5}}>{item.meta}</span>
          </div>
        </div>
        <div className="muted" style={{fontSize: 12, marginBottom: 6}}>{item.actor}</div>
        <div style={{fontSize: 13, lineHeight: 1.55, color: 'var(--ink-2)', fontFamily: item.ai ? 'var(--serif)' : 'inherit'}}>{item.excerpt}</div>
      </div>
    </div>
  );
};

// ============ CARE PLAN ============
const CarePlanView = ({ client }) => {
  const [tab, setTab] = React.useState('meds');
  return (
    <div className="page wide">
      <div className="page-hd">
        <div className="row" style={{gap: 16, alignItems: 'flex-start', flexWrap: 'wrap'}}>
          <div className="avatar xl">{client.initials}</div>
          <div style={{flex: 1, minWidth: 200}}>
            <div className="page-eyebrow">Care plan · last updated today</div>
            <h1 className="page-title">{client.name}</h1>
            <div className="page-sub">{client.age} · {client.city} · {client.relation}</div>
          </div>
          <div className="row" style={{gap: 8}}>
            <button className="btn"><Icon name="download" size={13} /> Export</button>
            <button className="btn primary"><Icon name="edit" size={13} /> Edit plan</button>
          </div>
        </div>
      </div>

      <div className="careplan-layout" style={{display: 'grid', gridTemplateColumns: '1fr 280px', gap: 20}}>
        <div>
          <div className="segmented" style={{marginBottom: 14}}>
            <button className={tab === 'meds' ? 'active' : ''} onClick={() => setTab('meds')}>Medications</button>
            <button className={tab === 'goals' ? 'active' : ''} onClick={() => setTab('goals')}>Goals & areas</button>
            <button className={tab === 'providers' ? 'active' : ''} onClick={() => setTab('providers')}>Providers</button>
          </div>

          {tab === 'meds' && <MedList meds={client.medications} />}
          {tab === 'goals' && <GoalsList goals={client.carePlan} />}
          {tab === 'providers' && <ProvidersList client={client} />}
        </div>

        <div className="col" style={{gap: 14}}>
          <InfoCard title="Diagnoses">
            <ul style={{margin: 0, padding: '0 0 0 18px', fontSize: 13, lineHeight: 1.7}}>
              {client.diagnoses.map((d, i) => <li key={i}>{d}</li>)}
            </ul>
          </InfoCard>
          <InfoCard title="Living situation">
            <div style={{fontSize: 13, lineHeight: 1.5}}>{client.livingSituation}</div>
          </InfoCard>
          <InfoCard title="Allergies">
            {client.allergies.length ? (
              <div className="col" style={{gap: 4}}>{client.allergies.map((a, i) => <span key={i} className="tag rose">{a}</span>)}</div>
            ) : <div className="muted" style={{fontSize: 13}}>None on file</div>}
          </InfoCard>
          <InfoCard title="Primary care">
            <div style={{fontSize: 13, lineHeight: 1.5}}>{client.pcp}</div>
          </InfoCard>
        </div>
      </div>
    </div>
  );
};

const InfoCard = ({ title, children }) => (
  <div className="card" style={{padding: 14}}>
    <div style={{fontSize: 11, color: 'var(--muted)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 8, fontWeight: 500}}>{title}</div>
    {children}
  </div>
);

const MedList = ({ meds }) => {
  const [editing, setEditing] = React.useState(null);
  return (
    <div className="card med-table" style={{padding: 0, overflow: 'hidden'}}>
      <div className="med-header" style={{display: 'grid', gridTemplateColumns: '2fr 1fr 2fr 1.2fr 90px', padding: '10px 16px', background: 'var(--bg-2)', borderBottom: '1px solid var(--border)', fontSize: 11, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 500}}>
        <div>Medication</div><div>Dose</div><div>Schedule</div><div>Next refill</div><div></div>
      </div>
      {meds.map(m => (
        <div key={m.id}>
          <div className="med-row" style={{display: 'grid', gridTemplateColumns: '2fr 1fr 2fr 1.2fr 90px', padding: '14px 16px', borderBottom: '1px solid var(--border)', alignItems: 'center', gap: 8}}>
            <div>
              <div style={{fontSize: 13.5, fontWeight: 500}}>{m.name}</div>
              <div className="muted" style={{fontSize: 11.5}}>{m.purpose}</div>
            </div>
            <div className="mono" style={{fontSize: 12.5}}>{m.dose}</div>
            <div style={{fontSize: 12.5, color: 'var(--ink-2)'}}>{m.schedule}</div>
            <div>
              {m.status === 'refill-soon' && <span className="tag amber">Refill soon · {m.next}</span>}
              {m.status === 'monitor' && <span className="tag rose">Monitor</span>}
              {m.status === 'ok' && <span className="muted" style={{fontSize: 12}}>{m.next}</span>}
            </div>
            <button className="btn ghost sm" onClick={() => setEditing(editing === m.id ? null : m.id)}>
              <Icon name="edit" size={12} /> Edit
            </button>
          </div>
          {editing === m.id && (
            <div className="fade-in" style={{padding: '14px 18px', background: 'var(--bg-2)', borderBottom: '1px solid var(--border)'}}>
              <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 10}}>
                <div><div className="muted" style={{fontSize: 11, marginBottom: 4}}>Dose</div><input className="input" defaultValue={m.dose} /></div>
                <div><div className="muted" style={{fontSize: 11, marginBottom: 4}}>Schedule</div><input className="input" defaultValue={m.schedule} /></div>
              </div>
              <div className="ai-block" style={{fontSize: 12.5, marginBottom: 12}}>
                <span className="ai-label"><Icon name="sparkle" size={10} /> Suggestion</span> Dr. Hsu recommended increasing Lisinopril to 20 mg yesterday. Apply change?
              </div>
              <div className="row" style={{gap: 8}}>
                <button className="btn sm">Cancel</button>
                <button className="btn primary sm">Save & notify care team</button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

const GoalsList = ({ goals }) => (
  <div className="col" style={{gap: 10}}>
    {goals.map((g, i) => (
      <div key={i} className="card" style={{padding: 16}}>
        <div className="row spread" style={{marginBottom: 6}}>
          <div className="row" style={{gap: 8}}>
            <span className="tag">{g.area}</span>
            {g.flag && <span className="tag rose">Flagged</span>}
          </div>
          <span className="muted" style={{fontSize: 12}}>{g.due}</span>
        </div>
        <div style={{fontSize: 14, fontFamily: 'var(--serif)', lineHeight: 1.5, marginBottom: 6}}>{g.goal}</div>
        <div className="muted" style={{fontSize: 12}}>Owner: {g.owner}</div>
      </div>
    ))}
  </div>
);

const ProvidersList = ({ client }) => (
  <div className="card soft" style={{padding: 28, textAlign: 'center'}}>
    <div className="muted" style={{fontSize: 13}}>Providers view: Dr. Hsu, ophthalmology, PT, pharmacy.</div>
  </div>
);

// ============ TASKS ============
const TasksView = ({ highlighted }) => {
  const [tasks, setTasks] = React.useState(() => window.TASKS.map(t => ({...t})));

  const toggle = (id) => setTasks(ts => ts.map(t => t.id === id ? {...t, done: !t.done} : t));

  const groups = {
    Today: tasks.filter(t => t.due === 'Today'),
    'This week': tasks.filter(t => t.due === 'This week'),
    Upcoming: tasks.filter(t => !['Today', 'This week'].includes(t.due)),
  };

  return (
    <div className="page">
      <div className="page-hd">
        <div className="page-eyebrow">Tasks across all clients</div>
        <h1 className="page-title">What needs doing.</h1>
        <div className="page-sub">Tasks extracted automatically from calls, visits, and the care plan. Check one off and we'll update everyone.</div>
      </div>

      {Object.entries(groups).map(([label, list]) => list.length > 0 && (
        <div key={label} style={{marginBottom: 24}}>
          <div style={{fontSize: 12, color: 'var(--muted)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8, fontWeight: 500}}>{label} · {list.filter(t => !t.done).length}</div>
          <div className="card" style={{padding: 0, overflow: 'hidden'}}>
            {list.map((t, i) => (
              <div key={t.id} style={{
                padding: '14px 18px', display: 'flex', alignItems: 'flex-start', gap: 12,
                borderBottom: i === list.length - 1 ? 'none' : '1px solid var(--border)',
                opacity: t.done ? 0.5 : 1,
                background: highlighted && label === 'Today' && !t.done ? 'var(--primary-soft)' : 'transparent',
              }}>
                <button onClick={() => toggle(t.id)} style={{
                  width: 18, height: 18, borderRadius: 5,
                  border: `1.5px solid ${t.done ? 'var(--sage)' : 'var(--border-strong)'}`,
                  background: t.done ? 'var(--sage)' : 'transparent',
                  color: 'white', display: 'grid', placeItems: 'center',
                  flexShrink: 0, marginTop: 2, cursor: 'pointer',
                }}>
                  {t.done && <Icon name="check" size={11} />}
                </button>
                <div style={{flex: 1}}>
                  <div style={{fontSize: 13.5, fontWeight: 500, textDecoration: t.done ? 'line-through' : 'none', marginBottom: 2}}>{t.title}</div>
                  <div className="muted" style={{fontSize: 11.5}}>{t.client} · <span className="ai-glyph">✦</span> {t.source}</div>
                </div>
                <span className={`tag ${t.priority === 'high' ? 'rose' : t.priority === 'med' ? 'amber' : ''}`}>{t.priority}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

// ============ TIME & BILLING ============
const TimeView = () => {
  const [invoiced, setInvoiced] = React.useState(false);
  const entries = window.TIME_ENTRIES;
  const totalMin = entries.reduce((s, e) => s + e.duration, 0);
  const total = (totalMin / 60) * 250;

  return (
    <div className="page wide">
      <div className="page-hd">
        <div className="row spread" style={{alignItems: 'flex-end', flexWrap: 'wrap', gap: 12}}>
          <div>
            <div className="page-eyebrow">Time & billing · Margaret Okafor · April</div>
            <h1 className="page-title">{(totalMin / 60).toFixed(1)} hrs · ${total.toFixed(0)}</h1>
            <div className="page-sub">Every minute captured automatically. Invoice when you're ready.</div>
          </div>
          <button className="btn accent" onClick={() => setInvoiced(true)}>
            <Icon name="receipt" size={13} /> Generate invoice
          </button>
        </div>
      </div>

      {invoiced && <InvoicePreview entries={entries} total={total} totalMin={totalMin} onClose={() => setInvoiced(false)} />}

      <div className="stat-grid" style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 20}}>
        <StatCard label="Auto-captured" value={`${entries.filter(e => e.auto).length} of ${entries.length}`} sub="From calls, drafts, and visits" />
        <StatCard label="Billable minutes" value={totalMin} sub="All tracked this cycle" />
        <StatCard label="Rate" value="$250/hr" sub="Care coordination · CMC" />
      </div>

      <div className="card time-table" style={{padding: 0, overflow: 'hidden'}}>
        <div className="time-header" style={{display: 'grid', gridTemplateColumns: '90px 1fr 110px 100px 100px', padding: '10px 18px', background: 'var(--bg-2)', borderBottom: '1px solid var(--border)', fontSize: 11, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 500}}>
          <div>Date</div><div>Activity</div><div>Duration</div><div>Source</div><div style={{textAlign: 'right'}}>Amount</div>
        </div>
        {entries.map(e => (
          <div key={e.id} className="time-row" style={{display: 'grid', gridTemplateColumns: '90px 1fr 110px 100px 100px', padding: '12px 18px', borderBottom: '1px solid var(--border)', alignItems: 'center', fontSize: 13}}>
            <div className="muted" style={{fontSize: 12}}>{e.date}</div>
            <div style={{fontWeight: 500}}>{e.task}</div>
            <div className="mono">{e.duration} min</div>
            <div>{e.auto ? <span className="ai-label"><Icon name="sparkle" size={10} /> auto</span> : <span className="muted" style={{fontSize: 11.5}}>manual</span>}</div>
            <div className="mono" style={{textAlign: 'right'}}>${((e.duration / 60) * e.rate).toFixed(2)}</div>
          </div>
        ))}
        <div className="time-footer" style={{display: 'grid', gridTemplateColumns: '1fr 100px', padding: '14px 18px', background: 'var(--bg-2)', alignItems: 'center'}}>
          <div style={{fontWeight: 500}}>Total · April 1–20</div>
          <div className="mono" style={{textAlign: 'right', fontSize: 15, fontWeight: 600}}>${total.toFixed(2)}</div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ label, value, sub }) => (
  <div className="card" style={{padding: 16}}>
    <div style={{fontSize: 11, color: 'var(--muted)', letterSpacing: '0.06em', textTransform: 'uppercase', fontWeight: 500, marginBottom: 4}}>{label}</div>
    <div style={{fontFamily: 'var(--serif)', fontSize: 28, letterSpacing: '-0.02em'}}>{value}</div>
    <div className="muted" style={{fontSize: 12, marginTop: 2}}>{sub}</div>
  </div>
);

const InvoicePreview = ({ entries, total, totalMin, onClose }) => (
  <div className="fade-in card" style={{padding: 28, marginBottom: 20, background: 'var(--surface)', boxShadow: 'var(--shadow)'}}>
    <div className="row spread" style={{marginBottom: 20}}>
      <div>
        <div style={{fontFamily: 'var(--serif)', fontSize: 24, letterSpacing: '-0.02em'}}>Invoice #2026-041</div>
        <div className="muted" style={{fontSize: 13, marginTop: 2}}>For Dana Okafor · Apr 1–20, 2026</div>
      </div>
      <div className="row" style={{gap: 8}}>
        <button className="btn"><Icon name="download" size={13} /> PDF</button>
        <button className="btn"><Icon name="send" size={13} /> Email</button>
        <button className="btn ghost" onClick={onClose}><Icon name="x" size={13} /></button>
      </div>
    </div>
    <div className="invoice-2col" style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, padding: '14px 0', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', marginBottom: 18}}>
      <div>
        <div className="muted" style={{fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4}}>From</div>
        <div style={{fontSize: 13.5}}>Sarah Marshall, CMC</div>
        <div className="muted" style={{fontSize: 12.5}}>Patrona Care Coordination · LLC</div>
      </div>
      <div>
        <div className="muted" style={{fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4}}>Bill to</div>
        <div style={{fontSize: 13.5}}>Dana Okafor</div>
        <div className="muted" style={{fontSize: 12.5}}>On behalf of Margaret Okafor</div>
      </div>
    </div>
    <div className="row spread" style={{fontSize: 13, marginBottom: 4}}><div>Care coordination · {entries.length} activities</div><div className="mono">{totalMin} min</div></div>
    <div className="row spread" style={{fontSize: 13, marginBottom: 12}}><div className="muted">Rate</div><div className="mono muted">$250.00 / hr</div></div>
    <div className="row spread" style={{fontSize: 16, fontWeight: 600, paddingTop: 12, borderTop: '1px solid var(--border)'}}>
      <div>Total due</div><div className="mono">${total.toFixed(2)}</div>
    </div>
    <div className="ai-block" style={{marginTop: 16, fontSize: 12.5}}>
      <span className="ai-label"><Icon name="sparkle" size={10} /> Note</span> 35% of this invoice is LTC-insurance eligible. I've prepared the Genworth claim packet. Review before sending.
    </div>
  </div>
);

// ============ FAMILY VIEW ============
const FamilyView = ({ view, client }) => {
  if (view === 'today') return <FamilyToday client={client} />;
  if (view === 'timeline') return <FamilyTimeline client={client} />;
  if (view === 'careplan') return <CarePlanView client={client} />;
  if (view === 'capture') return <FamilyCapture client={client} />;
  if (view === 'tasks') return <TasksView />;
  return <FamilyToday client={client} />;
};

const FamilyToday = ({ client }) => (
  <div className="page">
    <div className="page-hd">
      <div className="page-eyebrow">Good afternoon, Dana</div>
      <h1 className="page-title">Mom's doing okay today.</h1>
      <div className="page-sub">Here's what's happened, what's coming up, and what could use your help.</div>
    </div>

    <div className="card" style={{padding: 20, marginBottom: 16, background: 'var(--primary-soft)', border: 'none'}}>
      <div className="row" style={{gap: 14}}>
        <div className="avatar lg" style={{background: 'white', border: '2px solid white'}}>{client.initials}</div>
        <div style={{flex: 1}}>
          <div style={{fontFamily: 'var(--serif)', fontSize: 20, color: 'var(--primary-ink)'}}>Margaret · feeling stable</div>
          <div style={{fontSize: 13.5, color: 'var(--primary-ink)', opacity: 0.85, marginTop: 4, lineHeight: 1.5}}>Kate took her for a walk at 11 today. BP reading this morning was 138/84, slightly high, being monitored. New medication dose starts tomorrow.</div>
        </div>
      </div>
    </div>

    <div className="card" style={{padding: 20, marginBottom: 16}}>
      <div style={{fontFamily: 'var(--serif)', fontSize: 18, marginBottom: 14}}>This week</div>
      <div className="col" style={{gap: 10}}>
        <UpcomingRow time="Thu" title="Senior center · 10 AM" sub="Kate will drive. Mom has skipped last 2, could you call her tonight?" active />
        <UpcomingRow time="Fri" title="Home safety re-eval · 2 PM" sub="Sarah + contractor · stove auto-shutoff install" />
        <UpcomingRow time="Sat" title="Family dinner" sub="Usual, nothing to do" />
      </div>
    </div>

    <div className="card" style={{padding: 20}}>
      <div className="row spread" style={{marginBottom: 12}}>
        <div style={{fontFamily: 'var(--serif)', fontSize: 18}}>What Sarah handled today</div>
        <span className="muted" style={{fontSize: 12}}>So you don't have to</span>
      </div>
      <div className="col" style={{gap: 8}}>
        <FamilyTaskDone text="Coordinated new Lisinopril dose with CVS Brookline" />
        <FamilyTaskDone text="Scheduled home safety re-eval (Friday 2 PM)" />
        <FamilyTaskDone text="Called Kate about Thursday senior center" />
        <FamilyTaskDone text="Followed up with Genworth LTC insurance" />
      </div>
    </div>
  </div>
);

const FamilyTaskDone = ({ text }) => (
  <div className="row" style={{gap: 10, fontSize: 13.5}}>
    <div style={{width: 16, height: 16, borderRadius: '50%', background: 'var(--sage)', color: 'white', display: 'grid', placeItems: 'center', flexShrink: 0}}>
      <Icon name="check" size={10} />
    </div>
    <div style={{color: 'var(--ink-2)'}}>{text}</div>
  </div>
);

const FamilyTimeline = ({ client }) => <TimelineView client={client} />;

const FamilyCapture = ({ client }) => (
  <div className="page">
    <div className="page-hd">
      <div className="page-eyebrow">Log a call or visit</div>
      <h1 className="page-title">Tell us what happened.</h1>
      <div className="page-sub">Record a call, upload a voice memo, or just type a note. We'll turn it into a care update and share with Sarah and the team.</div>
    </div>
    <div className="card" style={{padding: 28, textAlign: 'center', marginBottom: 16}}>
      <div style={{
        width: 72, height: 72, borderRadius: '50%',
        background: 'var(--primary)',
        color: 'white',
        display: 'grid', placeItems: 'center',
        margin: '0 auto 16px',
        cursor: 'pointer',
      }}>
        <Icon name="mic" size={28} />
      </div>
      <div className="serif" style={{fontSize: 20}}>Tap to record</div>
      <div className="muted" style={{fontSize: 13, marginTop: 6}}>Works while you're in the car, on a walk, anywhere.</div>
    </div>
    <div className="card" style={{padding: 20}}>
      <div style={{fontSize: 13, fontWeight: 500, marginBottom: 8}}>Or type a quick note</div>
      <textarea className="textarea" placeholder="Mom was a little quiet at dinner tonight but ate well. Mentioned her knee hurt walking up stairs…" />
    </div>
  </div>
);

// ============ CLIENT NOTES (for recurring clients) ============
const ClientNotesView = ({ client }) => {
  const [postVisitNotes, setPostVisitNotes] = React.useState('');
  const [postVisitAudio, setPostVisitAudio] = React.useState(false);
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [generated, setGenerated] = React.useState(null);
  const clientTasks = window.TASKS.filter(t => t.client === client.name).map(t => ({...t}));
  const [tasks, setTasks] = React.useState(clientTasks);
  const refillSoon = client.medications.filter(m => m.status === 'refill-soon' || m.status === 'monitor');
  const visitNotes = (window.POST_VISIT_NOTES || {})[client.id] || [];
  const mockGenerated = (window.VISIT_GENERATED || {})[client.id] || null;

  const [genError, setGenError] = React.useState(null);

  const generate = async () => {
    if (isGenerating || (!postVisitNotes.trim() && !mockGenerated)) return;
    setIsGenerating(true);
    setGenError(null);
    try {
      const result = await window.patronaGenerate('visit-note', {
        notes: postVisitNotes,
        client,
        previousNotes: visitNotes,
      });
      if (result) {
        setGenerated(result);
      } else {
        // Mock mode — use hardcoded data with a small delay
        await new Promise(r => setTimeout(r, 1400));
        setGenerated(mockGenerated || {
          bullets: ['Visit note generated from your observations. Review and approve before saving.'],
          todos: [{ text: 'Follow up on observations from visit', priority: 'med' }],
        });
      }
    } catch (err) {
      console.error('Generation failed:', err);
      setGenError(err.message);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="page" style={{maxWidth: 900}}>

      {/* Post-visit notes */}
      <div className="card" style={{overflow: 'hidden', marginBottom: 20}}>
        <div className="row spread notes-header-controls" style={{padding: '12px 18px', borderBottom: '1px solid var(--border)', flexWrap: 'wrap'}}>
          <div style={{fontSize: 11, fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--muted)'}}>Post-visit notes</div>
          <div className="row" style={{gap: 10, flexWrap: 'wrap'}}>
            <div className="segmented">
              <button className={!postVisitAudio ? 'active' : ''} onClick={() => setPostVisitAudio(false)}>Type</button>
              <button className={postVisitAudio ? 'active' : ''} onClick={() => setPostVisitAudio(true)}>Voice</button>
            </div>
            {!generated ? (
              <button className="btn accent" onClick={generate} disabled={isGenerating} style={{padding: '7px 14px', fontSize: 13}}>
                {isGenerating ? (
                  <span className="mono" style={{fontSize: 11}}>Generating…</span>
                ) : (
                  <><Icon name="sparkle" size={13} /> Generate case note & to-dos</>
                )}
              </button>
            ) : (
              <span className="tag sage" style={{padding: '4px 10px'}}>✓ Generated</span>
            )}
          </div>
        </div>
        {!postVisitAudio ? (
          <textarea
            value={postVisitNotes}
            onChange={e => setPostVisitNotes(e.target.value)}
            placeholder={`What happened during the visit with ${client.name.split(' ')[0]}? Observations, concerns, next steps…`}
            style={{minHeight: 120, border: 'none', outline: 'none', padding: '16px 20px', fontSize: 13, lineHeight: 1.7, color: 'var(--ink-2)', fontFamily: 'var(--sans)', resize: 'vertical', background: 'transparent', width: '100%'}}
          />
        ) : (
          <div style={{minHeight: 120, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, padding: 28}}>
            <div style={{width: 56, height: 56, borderRadius: '50%', background: 'var(--primary)', color: 'white', display: 'grid', placeItems: 'center', cursor: 'pointer'}}>
              <Icon name="mic" size={22} />
            </div>
            <div style={{fontSize: 14, fontWeight: 500}}>Tap to dictate</div>
            <div className="muted" style={{fontSize: 12}}>Record your post-visit observations.</div>
          </div>
        )}
        {isGenerating && (
          <div style={{height: 3, background: 'var(--bg-2)', overflow: 'hidden'}}>
            <div style={{height: '100%', background: 'var(--primary)', width: '60%', animation: 'generateBar 1.4s ease forwards'}} />
            <style>{`@keyframes generateBar { from { width: 0%; } to { width: 100%; } }`}</style>
          </div>
        )}
        {genError && (
          <div style={{padding: '12px 20px', background: 'var(--rose-soft)', color: 'oklch(0.4 0.08 20)', fontSize: 13, borderTop: '1px solid var(--border)'}}>
            Generation failed: {genError}. <button onClick={generate} style={{textDecoration: 'underline', color: 'inherit', background: 'none', border: 'none', cursor: 'pointer', font: 'inherit'}}>Retry</button>
          </div>
        )}
        {generated && (
          <div style={{borderTop: '1px solid var(--border)'}}>
            <div style={{padding: '18px 20px', borderBottom: '1px solid var(--border)'}}>
              <div className="row spread" style={{marginBottom: 10}}>
                <span className="ai-label"><Icon name="sparkle" size={10} /> Case note · AI draft</span>
                <div className="row" style={{gap: 6}}>
                  <button className="btn ghost sm"><Icon name="edit" size={12} /> Edit</button>
                  <button className="btn sm primary"><Icon name="check" size={12} /> Approve</button>
                </div>
              </div>
              <ul style={{margin: 0, paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 5}}>
                {(generated.bullets || []).map((b, i) => (
                  <li key={i} style={{fontSize: 13.5, lineHeight: 1.6, fontFamily: 'var(--serif)', color: 'var(--ink-2)'}}>{b}</li>
                ))}
              </ul>
            </div>
            <div style={{padding: '18px 20px'}}>
              <div style={{fontSize: 11, fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 10}}>
                Extracted to-dos · {generated.todos.length} found
              </div>
              <div className="col" style={{gap: 6}}>
                {generated.todos.map((todo, i) => (
                  <div key={i} className="row" style={{gap: 10, padding: '10px 14px', background: 'var(--bg-2)', borderRadius: 8}}>
                    <div style={{width: 16, height: 16, borderRadius: 4, border: '1.5px solid var(--border-strong)', flexShrink: 0}} />
                    <div style={{flex: 1, fontSize: 13.5}}>{todo.text}</div>
                    <span className={`tag ${todo.priority === 'high' ? 'rose' : todo.priority === 'med' ? 'amber' : ''}`}>{todo.priority}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        {!generated && visitNotes.length > 0 && (
          <div style={{borderTop: '1px solid var(--border)', padding: '14px 20px'}}>
            <div style={{fontSize: 11, fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 10}}>Previous visit notes</div>
            <div className="col" style={{gap: 10}}>
              {visitNotes.map((note, i) => (
                <div key={i} style={{padding: '10px 14px', background: 'var(--bg-2)', borderRadius: 8}}>
                  <div className="row spread" style={{marginBottom: 4}}>
                    <div style={{fontSize: 12, fontWeight: 500}}>{note.date}</div>
                    <span className="muted" style={{fontSize: 11}}>{note.type}</span>
                  </div>
                  <div style={{fontSize: 13, lineHeight: 1.55, color: 'var(--ink-2)'}}>{note.text}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

    </div>
  );
};

// ============ CLIENT PAGE (header + sub-nav + content) ============
const ClientPage = ({ client, onOpenTasks }) => {
  const [section, setSection] = React.useState('dashboard');
  const nav = [
    { id: 'dashboard', label: 'Dashboard', icon: 'home' },
    { id: 'notes', label: 'Notes', icon: 'file' },
    { id: 'capture', label: 'Call capture', icon: 'mic' },
    { id: 'messages', label: 'Messages', icon: 'message' },
    { id: 'careplan', label: 'Care plan', icon: 'heart' },
    { id: 'timeline', label: 'Timeline', icon: 'activity' },
  ];

  return (
    <div style={{display: 'flex', flexDirection: 'column', height: '100%'}}>
      <div className="client-header">
        <div className="avatar xl">{client.initials}</div>
        <div style={{flex: 1}}>
          <h1 style={{fontFamily: 'var(--sans)', fontSize: 26, fontWeight: 600, letterSpacing: '-0.02em', margin: 0, lineHeight: 1.2}}>{client.name}</h1>
          <div className="muted" style={{fontSize: 13, marginTop: 4}}>{client.age} · {client.city} · {client.relation}</div>
        </div>
        <span className={`tag ${client.status}`}>{client.statusLabel}</span>
      </div>
      <div className="client-body" style={{display: 'flex', flex: 1, overflow: 'hidden'}}>
        <nav className="client-subnav">
          {nav.map(n => (
            <button key={n.id} className={`client-subnav-item ${section === n.id ? 'active' : ''}`} onClick={() => setSection(n.id)}>
              <Icon name={n.icon} size={15} className="ico" />
              {n.label}
            </button>
          ))}
        </nav>
        <div style={{flex: 1, overflowY: 'auto'}}>
          {section === 'dashboard' && <ClientDashboard client={client} setSection={setSection} />}
          {section === 'messages' && <ClientMessages client={client} />}
          {section === 'notes' && <ClientNotesView client={client} />}
          {section === 'capture' && <CallCapture client={client} onOpenTasks={onOpenTasks} />}
          {section === 'timeline' && <TimelineView client={client} />}
          {section === 'careplan' && <CarePlanView client={client} />}
        </div>
      </div>
    </div>
  );
};

// ============ CLIENT DASHBOARD ============
const ClientDashboard = ({ client, setSection }) => {
  const clientTasks = window.TASKS.filter(t => t.client === client.name);
  const openTasks = clientTasks.filter(t => !t.done);
  const refillSoon = client.medications.filter(m => m.status === 'refill-soon' || m.status === 'monitor');
  const flaggedGoals = client.carePlan.filter(g => g.flag);
  const visitNotes = (window.POST_VISIT_NOTES || {})[client.id] || [];

  return (
    <div className="page" style={{maxWidth: 900}}>
      {/* Quick stats */}
      <div className="grid-4col" style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 20}}>
        <div className="card" style={{padding: 14, textAlign: 'center'}}>
          <div style={{fontFamily: 'var(--serif)', fontSize: 24}}>{client.diagnoses.length}</div>
          <div className="muted" style={{fontSize: 11.5}}>Diagnoses</div>
        </div>
        <div className="card" style={{padding: 14, textAlign: 'center'}}>
          <div style={{fontFamily: 'var(--serif)', fontSize: 24}}>{client.medications.length}</div>
          <div className="muted" style={{fontSize: 11.5}}>Medications</div>
        </div>
        <div className="card" style={{padding: 14, textAlign: 'center'}}>
          <div style={{fontFamily: 'var(--serif)', fontSize: 24}}>{openTasks.length}</div>
          <div className="muted" style={{fontSize: 11.5}}>Open tasks</div>
        </div>
        <div className="card" style={{padding: 14, textAlign: 'center'}}>
          <div style={{fontFamily: 'var(--serif)', fontSize: 24}}>{flaggedGoals.length}</div>
          <div className="muted" style={{fontSize: 11.5}}>Flagged goals</div>
        </div>
      </div>

      <div className="grid-2col" style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16}}>
        {/* Flagged goals */}
        {flaggedGoals.length > 0 && (
          <div className="card" style={{padding: 16}}>
            <div className="row spread" style={{marginBottom: 12}}>
              <div style={{fontSize: 12, fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--muted)'}}>Flagged goals</div>
              <button className="btn ghost sm" onClick={() => setSection('careplan')}>View care plan</button>
            </div>
            <div className="col" style={{gap: 8}}>
              {flaggedGoals.map((g, i) => (
                <div key={i} style={{padding: '10px 12px', background: 'var(--rose-soft)', borderRadius: 8, border: '1px solid oklch(0.88 0.04 20)'}}>
                  <div className="row" style={{gap: 6, marginBottom: 3}}>
                    <span className="tag rose" style={{fontSize: 10}}>Flag</span>
                    <span style={{fontSize: 12, fontWeight: 500}}>{g.area}</span>
                    <span className="muted" style={{fontSize: 11}}>· {g.due}</span>
                  </div>
                  <div style={{fontSize: 12.5, color: 'var(--ink-2)', lineHeight: 1.4}}>{g.goal}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Medication alerts */}
        <div className="card" style={{padding: 16}}>
          <div className="row spread" style={{marginBottom: 12}}>
            <div style={{fontSize: 12, fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--muted)'}}>Medications</div>
            <span className="muted" style={{fontSize: 12}}>{client.medications.length} active</span>
          </div>
          {refillSoon.length > 0 ? (
            <div className="col" style={{gap: 6}}>
              {refillSoon.map(m => (
                <div key={m.id} className="row" style={{gap: 8, padding: '8px 10px', background: 'var(--bg-2)', borderRadius: 6, fontSize: 12.5}}>
                  <span className={`tag ${m.status === 'monitor' ? 'rose' : 'amber'}`}>{m.status === 'monitor' ? 'Monitor' : 'Refill soon'}</span>
                  <span style={{fontWeight: 500}}>{m.name}</span>
                  <span className="muted">{m.dose}</span>
                </div>
              ))}
              <div className="muted" style={{fontSize: 12, marginTop: 2}}>{client.medications.filter(m => m.status === 'ok').length} medications stable</div>
            </div>
          ) : (
            <div className="muted" style={{fontSize: 13}}>All medications stable</div>
          )}
        </div>
      </div>

      <div className="grid-2col" style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16}}>
        {/* Open tasks */}
        <div className="card" style={{padding: 16}}>
          <div className="row spread" style={{marginBottom: 12}}>
            <div style={{fontSize: 12, fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--muted)'}}>Open tasks</div>
            <span className="muted" style={{fontSize: 12}}>{openTasks.length} open</span>
          </div>
          <div className="col" style={{gap: 6}}>
            {openTasks.slice(0, 4).map(t => (
              <div key={t.id} className="row" style={{gap: 8, fontSize: 12.5}}>
                <span className={`tag ${t.priority === 'high' ? 'rose' : t.priority === 'med' ? 'amber' : ''}`}>{t.priority}</span>
                <span style={{flex: 1}}>{t.title}</span>
              </div>
            ))}
            {openTasks.length > 4 && <div className="muted" style={{fontSize: 12}}>+{openTasks.length - 4} more</div>}
            {openTasks.length === 0 && <div className="muted" style={{fontSize: 13}}>No open tasks</div>}
          </div>
        </div>

        {/* Recent visit notes */}
        <div className="card" style={{padding: 16}}>
          <div className="row spread" style={{marginBottom: 12}}>
            <div style={{fontSize: 12, fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--muted)'}}>Recent notes</div>
            <button className="btn ghost sm" onClick={() => setSection('notes')}>Add note</button>
          </div>
          <div className="col" style={{gap: 8}}>
            {visitNotes.slice(0, 3).map((note, i) => (
              <div key={i} style={{padding: '8px 10px', background: 'var(--bg-2)', borderRadius: 6}}>
                <div className="row spread" style={{marginBottom: 3}}>
                  <span style={{fontSize: 11.5, fontWeight: 500}}>{note.date}</span>
                  <span className="muted" style={{fontSize: 10.5}}>{note.type}</span>
                </div>
                <div style={{fontSize: 12, color: 'var(--ink-2)', lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden'}}>{note.text}</div>
              </div>
            ))}
            {visitNotes.length === 0 && <div className="muted" style={{fontSize: 13}}>No visit notes yet</div>}
          </div>
        </div>
      </div>

      {/* Client info */}
      <div className="info-3col" style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginTop: 16}}>
        <InfoCard title="Living situation">
          <div style={{fontSize: 13, lineHeight: 1.5}}>{client.livingSituation}</div>
        </InfoCard>
        <InfoCard title="Primary care">
          <div style={{fontSize: 13, lineHeight: 1.5}}>{client.pcp}</div>
        </InfoCard>
        <InfoCard title="Allergies">
          {client.allergies.length ? (
            <div className="col" style={{gap: 4}}>{client.allergies.map((a, i) => <span key={i} className="tag rose">{a}</span>)}</div>
          ) : <div className="muted" style={{fontSize: 13}}>None on file</div>}
        </InfoCard>
      </div>
    </div>
  );
};

// ============ CLIENT MESSAGES ============
const ClientMessages = ({ client }) => {
  const conversations = (window.CONVERSATIONS || {})[client.id] || [];
  const pendingDrafts = (window.PENDING_DRAFTS || {})[client.id] || [];
  const [activeThread, setActiveThread] = React.useState(conversations.length ? 0 : -1);
  const [composeOpen, setComposeOpen] = React.useState(false);
  const [composeBody, setComposeBody] = React.useState('');
  const [composeChannel, setComposeChannel] = React.useState('sms');

  const channelIcon = (ch) => ch === 'email' ? 'send' : ch === 'app' ? 'sparkle' : 'message';
  const channelLabel = (ch) => ch === 'email' ? 'Email' : ch === 'app' ? 'In-app' : 'SMS';

  const thread = activeThread >= 0 ? conversations[activeThread] : null;

  return (
    <div className="messages-layout" style={{display: 'flex', height: '100%', overflow: 'hidden'}}>
      {/* Thread list */}
      <div className="messages-thread-list" style={{width: 260, borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column', flexShrink: 0}}>
        <div style={{padding: '12px 14px', borderBottom: '1px solid var(--border)'}}>
          <button className="btn accent" style={{width: '100%', justifyContent: 'center'}} onClick={() => setComposeOpen(true)}>
            <Icon name="plus" size={13} /> New message
          </button>
        </div>
        {pendingDrafts.length > 0 && (
          <div style={{padding: '8px 10px', borderBottom: '1px solid var(--border)'}}>
            <div style={{fontSize: 10.5, fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 6, padding: '0 4px'}}>Drafts from Patrona</div>
            {pendingDrafts.map((d, i) => (
              <button key={d.id} onClick={() => { setComposeOpen(true); setComposeBody(d.body); setComposeChannel(d.channel); }} style={{
                display: 'block', width: '100%', textAlign: 'left', padding: '8px 10px',
                background: 'var(--primary-soft)', borderRadius: 6, border: 'none', cursor: 'pointer', marginBottom: 4,
              }}>
                <div className="row" style={{gap: 6, marginBottom: 2}}>
                  <span className="ai-label" style={{fontSize: 10}}><Icon name="sparkle" size={9} /> Draft</span>
                  <span style={{fontSize: 11, fontWeight: 500, color: 'var(--primary-ink)'}}>{d.to}</span>
                </div>
                <div style={{fontSize: 11, color: 'var(--primary-ink)', opacity: 0.7, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>{d.event}</div>
              </button>
            ))}
          </div>
        )}
        <div style={{flex: 1, overflowY: 'auto'}}>
          {conversations.map((conv, i) => (
            <button key={i} onClick={() => { setActiveThread(i); setComposeOpen(false); }} style={{
              display: 'block', width: '100%', textAlign: 'left', padding: '12px 14px',
              borderBottom: '1px solid var(--border)', cursor: 'pointer', border: 'none',
              background: activeThread === i && !composeOpen ? 'var(--bg-2)' : 'transparent',
            }}>
              <div className="row" style={{gap: 8, marginBottom: 3}}>
                <span style={{fontSize: 13, fontWeight: 500, flex: 1}}>{conv.contact}</span>
                <Icon name={channelIcon(conv.channel)} size={12} className="muted" />
              </div>
              <div className="muted" style={{fontSize: 11}}>{conv.relation}</div>
              <div style={{fontSize: 11.5, color: 'var(--ink-2)', marginTop: 4, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>
                {conv.messages[0] && conv.messages[0].body.split('\n')[0]}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Thread / compose view */}
      <div style={{flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden'}}>
        {composeOpen ? (
          <div style={{flex: 1, display: 'flex', flexDirection: 'column'}}>
            <div style={{padding: '14px 20px', borderBottom: '1px solid var(--border)', background: 'var(--bg-2)'}}>
              <div className="row" style={{gap: 10}}>
                <span className="muted" style={{fontSize: 12}}>To:</span>
                <input className="input" style={{flex: 1, padding: '6px 10px'}} placeholder="Contact name..." />
                <div className="segmented">
                  {['sms', 'email', 'app'].map(ch => (
                    <button key={ch} className={composeChannel === ch ? 'active' : ''} onClick={() => setComposeChannel(ch)}>
                      <Icon name={channelIcon(ch)} size={11} /> {channelLabel(ch)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div style={{flex: 1, padding: '16px 20px'}}>
              {composeBody && (
                <div className="ai-block" style={{marginBottom: 12, fontSize: 12}}>
                  <span className="ai-label"><Icon name="sparkle" size={10} /> Patrona drafted this for you. Edit before sending.</span>
                </div>
              )}
              <textarea
                value={composeBody}
                onChange={e => setComposeBody(e.target.value)}
                placeholder="Type your message..."
                style={{width: '100%', minHeight: 200, border: 'none', outline: 'none', fontSize: 13.5, lineHeight: 1.7, color: 'var(--ink-2)', fontFamily: 'var(--sans)', resize: 'vertical', background: 'transparent'}}
              />
            </div>
            <div className="row spread" style={{padding: '12px 20px', borderTop: '1px solid var(--border)'}}>
              <button className="btn ghost" onClick={() => { setComposeOpen(false); setComposeBody(''); }}>Cancel</button>
              <button className="btn primary" onClick={() => { setComposeOpen(false); setComposeBody(''); }}>
                <Icon name="send" size={13} /> Send via {channelLabel(composeChannel)}
              </button>
            </div>
          </div>
        ) : thread ? (
          <div style={{flex: 1, display: 'flex', flexDirection: 'column'}}>
            <div style={{padding: '14px 20px', borderBottom: '1px solid var(--border)', background: 'var(--bg-2)'}}>
              <div className="row" style={{gap: 10}}>
                <div style={{flex: 1}}>
                  <div style={{fontSize: 14, fontWeight: 500}}>{thread.contact}</div>
                  <div className="muted" style={{fontSize: 12}}>{thread.relation} · {channelLabel(thread.channel)}</div>
                </div>
                <button className="btn sm" onClick={() => { setComposeOpen(true); setComposeChannel(thread.channel); }}>
                  <Icon name="send" size={12} /> Reply
                </button>
              </div>
            </div>
            <div style={{flex: 1, overflowY: 'auto', padding: '16px 20px'}}>
              <div className="col" style={{gap: 16}}>
                {[...thread.messages].reverse().map(msg => (
                  <div key={msg.id} style={{
                    maxWidth: '80%',
                    alignSelf: msg.from === 'Sarah' ? 'flex-end' : 'flex-start',
                    display: 'flex', flexDirection: 'column',
                  }}>
                    {msg.ai && (
                      <div className="ai-label" style={{fontSize: 10, marginBottom: 4, alignSelf: 'flex-end'}}>
                        <Icon name="sparkle" size={9} /> {msg.event}
                      </div>
                    )}
                    <div style={{
                      padding: '10px 14px', borderRadius: 12, fontSize: 13, lineHeight: 1.55,
                      whiteSpace: 'pre-wrap',
                      background: msg.from === 'Sarah' ? 'var(--ink)' : 'var(--surface)',
                      color: msg.from === 'Sarah' ? 'var(--bg)' : 'var(--ink)',
                      border: msg.from === 'Sarah' ? 'none' : '1px solid var(--border)',
                    }}>
                      {msg.body}
                    </div>
                    <div className="muted" style={{fontSize: 10.5, marginTop: 4, alignSelf: msg.from === 'Sarah' ? 'flex-end' : 'flex-start'}}>
                      {msg.from === 'Sarah' ? 'You' : msg.from} · {msg.time}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div style={{flex: 1, display: 'grid', placeItems: 'center', color: 'var(--muted)', fontSize: 13}}>
            Select a conversation or start a new message
          </div>
        )}
      </div>
    </div>
  );
};

// ============ CALENDAR (placeholder) ============
const CalendarView = () => (
  <div className="page">
    <div className="page-hd">
      <div className="page-eyebrow">Workspace</div>
      <h1 className="page-title">Calendar</h1>
      <div className="page-sub">Upcoming visits, calls, and appointments across all clients.</div>
    </div>
    <div className="card" style={{padding: 0, overflow: 'hidden'}}>
      <div style={{padding: '14px 20px', borderBottom: '1px solid var(--border)', background: 'var(--bg-2)'}}>
        <div style={{fontSize: 12, fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--muted)'}}>This week · April 20–26</div>
      </div>
      {[
        { day: 'Tue 20', time: '2:00 PM', title: 'Call: James Whitfield', sub: 'Arthur · weight alert follow-up' },
        { day: 'Tue 20', time: '3:30 PM', title: 'Home visit: Vivian Park', sub: 'Cambridge · glucose log review' },
        { day: 'Wed 21', time: '10:00 AM', title: 'Call: Helen Park', sub: 'Vivian · TSH lab follow-up' },
        { day: 'Thu 22', time: '9:00 AM', title: 'Rehab check-in: Harold Jensen', sub: 'Phone · discharge planning' },
        { day: 'Thu 22', time: '2:00 PM', title: 'Home visit: Margaret Okafor', sub: 'Brookline · routine biweekly' },
        { day: 'Fri 23', time: '11:00 AM', title: 'Dr. Monteiro office call', sub: 'Arthur · Furosemide adjustment' },
        { day: 'Sat 24', time: '10:00 AM', title: 'Ophthalmology: Arthur Whitfield', sub: 'Newton Eye Associates · transport from Lakeside' },
      ].map((e, i) => (
        <div key={i} className="calendar-row" style={{display: 'grid', gridTemplateColumns: '80px 80px 1fr', padding: '12px 20px', borderBottom: '1px solid var(--border)', alignItems: 'center', fontSize: 13}}>
          <div className="muted" style={{fontSize: 12}}>{e.day}</div>
          <div className="mono" style={{fontSize: 12, color: 'var(--muted)'}}>{e.time}</div>
          <div>
            <div style={{fontWeight: 500}}>{e.title}</div>
            <div className="muted" style={{fontSize: 11.5}}>{e.sub}</div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// ============ INBOX (aggregate across all clients) ============
const InboxView = () => {
  // Flatten all conversations into a single list of latest messages per thread
  const allConvos = window.CONVERSATIONS || {};
  const allDrafts = window.PENDING_DRAFTS || {};
  const threads = [];
  const draftCount = Object.values(allDrafts).reduce((s, d) => s + d.length, 0);

  Object.entries(allConvos).forEach(([clientId, convos]) => {
    const cl = window.CLIENTS.find(c => c.id === clientId);
    convos.forEach(conv => {
      const latest = conv.messages[0];
      if (latest) {
        threads.push({
          contact: conv.contact,
          client: cl ? cl.name : clientId,
          channel: conv.channel,
          time: latest.time,
          preview: latest.body.split('\n')[0],
          from: latest.from,
          unread: latest.from !== 'Sarah',
        });
      }
    });
  });

  return (
    <div className="page">
      <div className="page-hd">
        <div className="page-eyebrow">Workspace</div>
        <h1 className="page-title">Inbox</h1>
        <div className="page-sub">{threads.length} conversations across {window.CLIENTS.length} clients{draftCount > 0 ? ` · ${draftCount} AI drafts waiting` : ''}</div>
      </div>

      {draftCount > 0 && (
        <div className="card" style={{padding: 16, marginBottom: 16, background: 'var(--primary-soft)', border: 'none'}}>
          <div className="row" style={{gap: 10}}>
            <Icon name="sparkle" size={14} style={{color: 'var(--primary)'}} />
            <div style={{flex: 1}}>
              <div style={{fontSize: 13, fontWeight: 500, color: 'var(--primary-ink)'}}>{draftCount} messages drafted by Patrona</div>
              <div style={{fontSize: 12, color: 'var(--primary-ink)', opacity: 0.8}}>Review and send from each client's Messages tab.</div>
            </div>
          </div>
        </div>
      )}

      <div className="card" style={{padding: 0, overflow: 'hidden'}}>
        {threads.map((t, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 14, padding: '14px 20px',
            borderBottom: '1px solid var(--border)',
            background: t.unread && t.from !== 'Sarah' ? 'var(--primary-soft)' : 'transparent',
          }}>
            {t.unread && t.from !== 'Sarah' && <div className="pulse" style={{width: 6, height: 6}} />}
            {(!t.unread || t.from === 'Sarah') && <div style={{width: 6}} />}
            <div style={{flex: 1, minWidth: 0}}>
              <div className="row spread" style={{marginBottom: 2}}>
                <div className="row" style={{gap: 8}}>
                  <span style={{fontSize: 13, fontWeight: t.unread ? 600 : 500}}>{t.contact}</span>
                  <span className="muted" style={{fontSize: 11}}>· {t.client}</span>
                </div>
                <div className="row" style={{gap: 6}}>
                  <Icon name={t.channel === 'email' ? 'send' : t.channel === 'app' ? 'sparkle' : 'message'} size={11} className="muted" />
                  <div className="muted" style={{fontSize: 11.5}}>{t.time.split(' · ')[0]}</div>
                </div>
              </div>
              <div className="muted" style={{fontSize: 12.5, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>{t.preview}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

Object.assign(window, { TodayView, TimelineView, CarePlanView, TasksView, TimeView, FamilyView, ClientNotesView, ClientPage, ClientMessages, CalendarView, InboxView });
