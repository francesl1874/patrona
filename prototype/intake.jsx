// intake.jsx — Caret-style intake flow, Fern design language

const IntakeView = ({ client, onComplete }) => {
  const [notes, setNotes] = React.useState(window.INTAKE_NOTES);
  const [audioMode, setAudioMode] = React.useState(false);
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [hasPlan, setHasPlan] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [progressLabel, setProgressLabel] = React.useState('');
  const [tab, setTab] = React.useState('summary');
  const [tasks, setTasks] = React.useState(window.INTAKE_GENERATED.tasks);
  const [genData, setGenData] = React.useState(null);

  // Run cosmetic progress animation
  const runProgressAnimation = () => {
    const stages = [
      { pct: 15, label: 'Parsing intake notes…' },
      { pct: 35, label: 'Extracting clinical context…' },
      { pct: 55, label: 'Drafting care plan…' },
      { pct: 75, label: 'Generating task list…' },
      { pct: 90, label: 'Cross-referencing sources…' },
    ];
    stages.forEach((s, i) => {
      setTimeout(() => { setProgress(s.pct); setProgressLabel(s.label); }, 400 * (i + 1));
    });
  };

  const generate = async () => {
    if (isGenerating) return;
    setIsGenerating(true);
    setProgress(0);
    runProgressAnimation();
    try {
      const result = await window.patronaGenerate('intake', { notes, client });
      if (result) {
        setGenData(result);
        if (result.tasks) setTasks(result.tasks);
      } else {
        // Mock mode — wait for animation
        await new Promise(r => setTimeout(r, 2800));
      }
    } catch (err) {
      console.error('Intake generation failed:', err);
    }
    setProgress(100);
    setProgressLabel('Done');
    setTimeout(() => { setIsGenerating(false); setHasPlan(true); }, 400);
  };

  const reset = () => { setHasPlan(false); setProgress(0); setGenData(null); };

  return (
    <div className="page wide">
      <div className="page-hd">
        <div className="row spread" style={{alignItems: 'flex-start'}}>
          <div>
            <div className="page-eyebrow">Intake · {client.name}</div>
            <h1 className="page-title">Let's get to know {client.name.split(' ')[0]}.</h1>
            <div className="page-sub">Paste or dictate intake notes. Patrona will draft a case summary, care plan, and task list. All cited, all reviewable.</div>
          </div>
          {hasPlan && <button className="btn" onClick={reset}>Reset</button>}
        </div>
      </div>

      <div style={{display: 'flex', flexDirection: 'column', gap: 16}}>
        {/* Top: intake notes */}
        <div className="card" style={{display: 'flex', flexDirection: 'column', overflow: 'hidden'}}>
          <div className="row spread" style={{padding: '12px 18px', borderBottom: '1px solid var(--border)'}}>
            <div style={{fontSize: 11, fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--muted)'}}>Intake notes</div>
            <div className="row" style={{gap: 10}}>
              <div className="segmented">
                <button className={!audioMode ? 'active' : ''} onClick={() => setAudioMode(false)}>Type</button>
                <button className={audioMode ? 'active' : ''} onClick={() => setAudioMode(true)}>Voice</button>
              </div>
              {!hasPlan ? (
                <button
                  className="btn accent"
                  onClick={generate}
                  disabled={isGenerating}
                  style={{padding: '7px 14px', fontSize: 13}}
                >
                  {isGenerating ? (
                    <><span className="mono" style={{fontSize: 11}}>{progressLabel}</span></>
                  ) : (
                    <><Icon name="sparkle" size={13} /> Generate with Patrona</>
                  )}
                </button>
              ) : (
                <span className="tag sage" style={{padding: '4px 10px'}}>✓ Draft ready</span>
              )}
            </div>
          </div>
          {!audioMode ? (
            <textarea
              value={notes}
              onChange={e => setNotes(e.target.value)}
              style={{minHeight: 200, border: 'none', outline: 'none', padding: '16px 20px', fontSize: 13, lineHeight: 1.7, color: 'var(--ink-2)', fontFamily: 'var(--sans)', resize: 'vertical', background: 'transparent'}}
            />
          ) : (
            <div style={{minHeight: 200, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, padding: 32}}>
              <div style={{width: 64, height: 64, borderRadius: '50%', background: 'var(--primary)', color: 'white', display: 'grid', placeItems: 'center', cursor: 'pointer'}}>
                <Icon name="mic" size={26} />
              </div>
              <div style={{fontSize: 15, fontWeight: 500}}>Tap to dictate</div>
              <div className="muted" style={{fontSize: 12, textAlign: 'center'}}>We'll transcribe as you talk.</div>
            </div>
          )}
          {isGenerating && (
            <div style={{height: 3, background: 'var(--bg-2)', overflow: 'hidden'}}>
              <div style={{height: '100%', background: 'var(--primary)', width: `${progress}%`, transition: 'width 0.35s ease'}} />
            </div>
          )}
        </div>

        {/* Bottom: output */}
        <div className="card" style={{display: 'flex', flexDirection: 'column', overflow: 'hidden', minHeight: 420}}>
          {!hasPlan && !isGenerating && (
            <div style={{flex: 1, display: 'grid', placeItems: 'center', padding: 60, textAlign: 'center'}}>
              <div>
                <div style={{width: 56, height: 56, borderRadius: '50%', background: 'var(--primary-soft)', color: 'var(--primary)', display: 'grid', placeItems: 'center', margin: '0 auto 14px'}}>
                  <Icon name="sparkle" size={22} />
                </div>
                <div style={{fontSize: 18, fontWeight: 600, marginBottom: 6}}>Ready to generate</div>
                <div className="muted" style={{fontSize: 13, maxWidth: 360, margin: '0 auto', lineHeight: 1.55}}>Hit <b>Generate with Patrona</b> to produce a case summary, care plan, and task list.</div>
              </div>
            </div>
          )}
          {isGenerating && !hasPlan && (
            <div style={{flex: 1, display: 'grid', placeItems: 'center', padding: 60}}>
              <div style={{textAlign: 'center'}}>
                <div className="muted" style={{fontSize: 13}}>{progressLabel}</div>
              </div>
            </div>
          )}
          {hasPlan && (
            <>
              <div style={{display: 'flex', gap: 0, padding: '0 24px', borderBottom: '1px solid var(--border)'}}>
                {['summary', 'careplan', 'tasks'].map(t => (
                  <button key={t} onClick={() => setTab(t)} style={{
                    padding: '14px 16px', fontSize: 13.5,
                    fontWeight: tab === t ? 600 : 500,
                    color: tab === t ? 'var(--ink)' : 'var(--muted)',
                    borderBottom: tab === t ? '2px solid var(--ink)' : '2px solid transparent',
                    marginBottom: -1, textTransform: 'capitalize',
                  }}>
                    {t === 'careplan' ? 'Care plan' : t === 'summary' ? 'Case summary' : 'Tasks'}
                  </button>
                ))}
              </div>
              <div style={{flex: 1, overflowY: 'auto', padding: '28px 32px'}}>
                {tab === 'summary' && <IntakeSummary data={genData ? genData.summary : null} />}
                {tab === 'careplan' && <IntakePlan data={genData ? genData.carePlan : null} />}
                {tab === 'tasks' && <IntakeTasks tasks={tasks} setTasks={setTasks} />}
              </div>
              {tab === 'tasks' && (
                <div style={{padding: '14px 24px', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'flex-end', gap: 8}}>
                  <button className="btn">Save as draft</button>
                  <button className="btn accent" onClick={() => onComplete && onComplete()}>
                    <Icon name="check" size={13} /> Approve & open client
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const IntakeSummary = ({ data }) => {
  const s = data || window.INTAKE_GENERATED.summary;
  return (
    <div className="col" style={{gap: 18}}>
      <div className="row" style={{gap: 10, marginBottom: 4}}>
        <span className="ai-label"><Icon name="sparkle" size={10} /> AI draft · review required</span>
      </div>
      <IntakeField label="Living situation & status">{s.livingSituation}</IntakeField>
      <IntakeField label="Functional concerns">{s.functionalLimits}</IntakeField>
      <IntakeField label="Family dynamics">{s.familyDynamics}</IntakeField>
      <IntakeField label="Immediate risks">
        <div style={{display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 4}}>
          {s.immediateRisks.map((r, i) => <span key={i} className="tag rose">{r}</span>)}
        </div>
      </IntakeField>
      <IntakeField label="Open questions">
        <ul style={{margin: 0, paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 4}}>
          {s.openQuestions.map((q, i) => <li key={i} style={{fontSize: 13, lineHeight: 1.55, color: 'var(--ink-2)'}}>{q}</li>)}
        </ul>
      </IntakeField>
    </div>
  );
};

const IntakeField = ({ label, children }) => (
  <div>
    <div style={{fontSize: 10.5, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--muted)', marginBottom: 6}}>{label}</div>
    <div className="ai-block" style={{fontSize: 13.5, lineHeight: 1.65, color: 'var(--ink-2)', fontFamily: 'var(--serif)'}}>{children}</div>
  </div>
);

const IntakePlan = ({ data }) => {
  const carePlan = data || window.INTAKE_GENERATED.carePlan;
  return (
  <div className="col" style={{gap: 10}}>
    <div className="row" style={{gap: 10, marginBottom: 4}}>
      <span className="ai-label"><Icon name="sparkle" size={10} /> AI draft · click source to verify</span>
    </div>
    {carePlan.map((item, i) => (
      <div key={i} className="card" style={{padding: '14px 16px', borderLeft: '3px solid var(--primary)'}}>
        <div className="row spread" style={{marginBottom: 8}}>
          <div style={{fontSize: 13.5, fontWeight: 600, flex: 1}}>
            {item.goal} <Source text={item.source} />
          </div>
          <span className="tag">{item.timeframe}</span>
        </div>
        <ul style={{margin: 0, paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 3}}>
          {item.interventions.map((iv, j) => <li key={j} style={{fontSize: 12.5, lineHeight: 1.55, color: 'var(--ink-2)'}}>{iv}</li>)}
        </ul>
      </div>
    ))}
  </div>
  );
};

const Source = ({ text }) => {
  const [show, setShow] = React.useState(false);
  return (
    <span style={{position: 'relative', display: 'inline-block'}}>
      <span onClick={() => setShow(s => !s)} className="tag primary" style={{fontSize: 9.5, cursor: 'pointer', marginLeft: 6, verticalAlign: 'middle', padding: '1px 6px'}}>source</span>
      {show && (
        <div onClick={() => setShow(false)} style={{
          position: 'absolute', bottom: 'calc(100% + 6px)', left: 0,
          background: 'var(--ink)', color: 'var(--bg)',
          fontSize: 11.5, lineHeight: 1.5, borderRadius: 8,
          padding: '10px 12px', width: 240, fontWeight: 400,
          boxShadow: 'var(--shadow-lg)', zIndex: 100,
        }}>
          <div style={{fontSize: 9.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', opacity: 0.6, marginBottom: 4}}>From intake</div>
          "{text}"
        </div>
      )}
    </span>
  );
};

const IntakeTasks = ({ tasks, setTasks }) => (
  <div className="col" style={{gap: 6}}>
    <div className="row" style={{gap: 10, marginBottom: 4}}>
      <span className="ai-label"><Icon name="sparkle" size={10} /> Extracted by Patrona · {tasks.filter(t => !t.done).length} open</span>
    </div>
    {tasks.map(t => (
      <div key={t.id} style={{display: 'flex', alignItems: 'flex-start', gap: 12, padding: '11px 14px', background: 'var(--bg-2)', borderRadius: 8, opacity: t.done ? 0.5 : 1}}>
        <button onClick={() => setTasks(ts => ts.map(x => x.id === t.id ? {...x, done: !x.done} : x))} style={{
          width: 18, height: 18, borderRadius: 5, marginTop: 1, flexShrink: 0,
          border: `1.5px solid ${t.done ? 'var(--sage)' : 'var(--border-strong)'}`,
          background: t.done ? 'var(--sage)' : 'transparent',
          color: 'white', display: 'grid', placeItems: 'center', cursor: 'pointer',
        }}>{t.done && <Icon name="check" size={11} />}</button>
        <div style={{flex: 1}}>
          <div style={{fontSize: 13, fontWeight: 500, textDecoration: t.done ? 'line-through' : 'none', marginBottom: 3}}>{t.text}</div>
          <div className="row" style={{gap: 8, flexWrap: 'wrap'}}>
            <span className={`tag ${t.priority === 'high' ? 'rose' : t.priority === 'med' ? 'amber' : ''}`}>{t.priority}</span>
            <span className="muted" style={{fontSize: 11.5}}>Due {t.due} · {t.owner}</span>
          </div>
        </div>
      </div>
    ))}
  </div>
);

window.IntakeView = IntakeView;
