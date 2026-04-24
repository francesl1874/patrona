// capture.jsx — Live call capture + auto-note generation (HERO)

const CallCapture = ({ client, onOpenTasks }) => {
  const [state, setState] = React.useState('idle'); // idle | live | ended
  const [elapsed, setElapsed] = React.useState(0);
  const [transcript, setTranscript] = React.useState([]);
  const [notesReady, setNotesReady] = React.useState(false);
  const [notesVisible, setNotesVisible] = React.useState(false);
  const [extractedTasks, setExtractedTasks] = React.useState([]);
  const [generatedData, setGeneratedData] = React.useState(null);
  const transcriptRef = React.useRef(null);

  // Advance transcript on a timer during 'live'
  React.useEffect(() => {
    if (state !== 'live') return;
    const tick = setInterval(() => setElapsed(e => e + 1), 1000);
    return () => clearInterval(tick);
  }, [state]);

  React.useEffect(() => {
    if (state !== 'live') return;
    const script = window.TRANSCRIPT_SCRIPT;
    if (transcript.length >= script.length) return;
    const timer = setTimeout(() => {
      setTranscript(t => [...t, script[t.length]]);
    }, transcript.length === 0 ? 400 : 1400 + Math.random() * 600);
    return () => clearTimeout(timer);
  }, [state, transcript.length]);

  // Auto-scroll transcript
  React.useEffect(() => {
    if (transcriptRef.current) {
      transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight;
    }
  }, [transcript.length]);

  const start = () => {
    setState('live');
    setElapsed(0);
    setTranscript([]);
    setNotesReady(false);
    setNotesVisible(false);
    setExtractedTasks([]);
  };

  const MOCK_CALL_DATA = {
    summary: 'Family check-in with daughter Dana Okafor (14 min). Key outcomes from yesterday\'s PCP visit: elevated BP (142/88) prompting Lisinopril dose change to 20 mg. Family reports increased forgetfulness with two stove incidents, escalating to home safety re-evaluation and Donepezil review. Caregiver attendance and LTC reimbursement follow-ups also discussed.',
    keyFacts: [
      { label: 'BP reading', value: '142/88 mmHg', change: '↑ from 128/82 avg', trend: 'amber' },
      { label: 'Rx change', value: 'Lisinopril 10 → 20 mg', detail: 'Per Dr. Hsu, Beth Israel' },
      { label: 'Safety event', value: 'Stove left on, 2 incidents in 2 weeks', trend: 'rose' },
      { label: 'Family concern', value: 'Progressive forgetfulness', detail: 'Dana requests Donepezil review' },
    ],
    tasks: [
      { id: 1, title: 'Coordinate Lisinopril dose change (10→20 mg) with CVS Brookline', due: 'Today', priority: 'high' },
      { id: 2, title: 'Schedule home safety re-evaluation (stove concern)', due: 'This week', priority: 'high' },
      { id: 3, title: 'Call Kate re: senior center attendance Thursdays', due: 'Today', priority: 'med' },
      { id: 4, title: 'Loop Marcus into medication change update', due: 'Today', priority: 'med' },
      { id: 5, title: 'Follow up with Genworth on March LTC reimbursement', due: 'Today', priority: 'med' },
    ],
  };

  const end = async () => {
    setState('ended');
    try {
      const result = await window.patronaGenerate('call-capture', {
        client,
        caller: 'Dana Okafor (daughter)',
        transcript,
      });
      if (result) {
        setGeneratedData(result);
        setExtractedTasks(result.tasks || []);
      } else {
        // Mock mode
        await new Promise(r => setTimeout(r, 1400));
        setGeneratedData(MOCK_CALL_DATA);
        setExtractedTasks(MOCK_CALL_DATA.tasks);
      }
    } catch (err) {
      console.error('Call capture generation failed:', err);
      setGeneratedData(MOCK_CALL_DATA);
      setExtractedTasks(MOCK_CALL_DATA.tasks);
    }
    setNotesReady(true);
    setNotesVisible(true);
  };

  const reset = () => {
    setState('idle');
    setTranscript([]);
    setElapsed(0);
    setNotesReady(false);
    setNotesVisible(false);
    setExtractedTasks([]);
    setGeneratedData(null);
  };

  const fmtTime = (s) => `${Math.floor(s/60)}:${String(s%60).padStart(2,'0')}`;

  return (
    <div className="page">
      <div className="page-hd">
        <div className="page-eyebrow">Call capture</div>
        <h1 className="page-title">Live call with Dana Okafor</h1>
        <div className="page-sub">Margaret's daughter · Primary family contact · Last spoke Apr 16</div>
      </div>

      {/* Call control surface */}
      <div className="card" style={{padding: 0, overflow: 'hidden', marginBottom: 20}}>
        <div className="call-control" style={{
          padding: '24px 28px',
          display: 'flex', alignItems: 'center', gap: 20,
          background: state === 'live' ? 'linear-gradient(180deg, oklch(0.98 0.02 40) 0%, var(--surface) 100%)' : 'var(--surface)',
          borderBottom: state !== 'idle' ? '1px solid var(--border)' : 'none',
        }}>
          <div style={{position: 'relative'}}>
            <div className="avatar lg" style={{width: 56, height: 56, fontSize: 20}}>DO</div>
            {state === 'live' && <div className="pulse" style={{position: 'absolute', bottom: 0, right: 0}} />}
          </div>
          <div style={{flex: 1}}>
            <div className="row" style={{gap: 10, marginBottom: 3}}>
              <div style={{fontSize: 16, fontWeight: 600}}>Dana Okafor</div>
              {state === 'live' && <span className="tag" style={{background: 'var(--primary)', color: 'white', borderColor: 'var(--primary)'}}>● Recording</span>}
              {state === 'ended' && <span className="tag sage">Ended</span>}
            </div>
            <div className="muted" style={{fontSize: 13}}>
              {state === 'idle' && 'Ready to start · Audio + transcript will auto-save to Margaret\'s file'}
              {state === 'live' && `Connected · ${fmtTime(elapsed)} elapsed · Transcribing live`}
              {state === 'ended' && `Call ended · ${fmtTime(elapsed)} · Processing notes…`}
            </div>
          </div>
          <div className="row" style={{gap: 8}}>
            {state === 'idle' && (
              <button className="btn accent" onClick={start}>
                <Icon name="phone" size={14} /> Start call
              </button>
            )}
            {state === 'live' && (
              <>
                <button className="btn"><Icon name="pause" size={12} /> Pause</button>
                <button className="btn accent" onClick={end}>
                  <Icon name="stop" size={12} /> End & auto-note
                </button>
              </>
            )}
            {state === 'ended' && (
              <button className="btn" onClick={reset}>New call</button>
            )}
          </div>
        </div>

        {/* Live transcript */}
        {state !== 'idle' && (
          <div className="capture-split" style={{display: 'grid', gridTemplateColumns: '1fr 320px', minHeight: 380}}>
            <div className="capture-transcript" style={{borderRight: '1px solid var(--border)'}}>
              <div style={{padding: '14px 20px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 8}}>
                <Icon name="activity" size={14} className="muted" />
                <div style={{fontSize: 12, fontWeight: 500, color: 'var(--muted)', letterSpacing: '0.04em', textTransform: 'uppercase'}}>Transcript</div>
                {state === 'live' && <div className="pulse" style={{marginLeft: 'auto'}} />}
              </div>
              <div ref={transcriptRef} style={{padding: '16px 20px', maxHeight: 340, overflowY: 'auto'}}>
                {transcript.map((line, i) => (
                  <div key={i} className="fade-in" style={{marginBottom: 14, display: 'flex', gap: 12}}>
                    <div className="mono muted-2" style={{fontSize: 10.5, minWidth: 40, paddingTop: 3}}>{line.time}</div>
                    <div style={{flex: 1}}>
                      <div style={{fontSize: 11.5, fontWeight: 600, color: line.speaker === 'GCM' ? 'var(--primary-ink)' : 'var(--ink-2)', marginBottom: 2, letterSpacing: '0.02em'}}>
                        {line.speaker === 'GCM' ? 'You (Sarah)' : line.speaker}
                      </div>
                      <div style={{fontSize: 13.5, lineHeight: 1.55, color: 'var(--ink)'}}>{line.text}</div>
                    </div>
                  </div>
                ))}
                {state === 'live' && transcript.length < window.TRANSCRIPT_SCRIPT.length && (
                  <div className="row" style={{gap: 6, color: 'var(--muted)', fontSize: 12, fontStyle: 'italic', paddingLeft: 52}}>
                    <TypingDots /> listening…
                  </div>
                )}
              </div>
            </div>
            {/* Realtime AI side panel */}
            <div className="capture-ai-panel" style={{background: 'var(--bg-2)', padding: '14px 18px'}}>
              <div style={{padding: '0 0 10px', display: 'flex', alignItems: 'center', gap: 8}}>
                <Icon name="sparkle" size={14} style={{color: 'var(--primary)'}} />
                <div style={{fontFamily: 'var(--serif)', fontSize: 13, fontStyle: 'italic', color: 'var(--primary-ink)'}}>Catching in real time</div>
              </div>
              <RealtimeInsights count={transcript.length} done={state === 'ended'} />
            </div>
          </div>
        )}
      </div>

      {/* Auto-generated notes */}
      {state === 'ended' && (
        <div className="fade-in" style={{marginBottom: 20}}>
          {!notesReady ? (
            <div className="card" style={{padding: 40, textAlign: 'center'}}>
              <div className="row" style={{justifyContent: 'center', gap: 10, color: 'var(--muted)'}}>
                <TypingDots /> Generating case note, extracting tasks, updating care plan…
              </div>
            </div>
          ) : (
            <GeneratedNotes data={generatedData} tasks={extractedTasks} onOpenTasks={onOpenTasks} />
          )}
        </div>
      )}

      {state === 'idle' && <CaptureEmptyState />}
    </div>
  );
};

const TypingDots = () => (
  <span style={{display: 'inline-flex', gap: 3}}>
    {[0, 1, 2].map(i => (
      <span key={i} style={{
        width: 4, height: 4, borderRadius: 50, background: 'currentColor',
        animation: `typing 1.2s ease-in-out ${i * 0.15}s infinite`,
      }} />
    ))}
    <style>{`@keyframes typing { 0%, 60%, 100% { opacity: 0.2; } 30% { opacity: 1; } }`}</style>
  </span>
);

const RealtimeInsights = ({ count, done }) => {
  // Progressive reveal of insights as transcript grows
  const all = [
    { at: 2, type: 'medication', text: 'BP reading 142/88 flagged', detail: 'Higher than Mar avg (128/82)' },
    { at: 3, type: 'action', text: 'Lisinopril dose change noted', detail: '10 → 20 mg · Rx coordination queued' },
    { at: 5, type: 'risk', text: 'Safety concern: stove left on', detail: 'Proposing home safety re-eval' },
    { at: 6, type: 'medication', text: 'Donepezil review suggested', detail: 'Per cognitive concern from family' },
    { at: 7, type: 'contact', text: 'Kate + Marcus need a follow-up', detail: 'Adding to task queue' },
    { at: 9, type: 'billing', text: 'Genworth LTC follow-up', detail: 'Recurring issue, case #LTC-4482019' },
  ];
  const visible = all.filter(a => count >= a.at);

  return (
    <div className="col" style={{gap: 10}}>
      {visible.length === 0 && (
        <div className="muted" style={{fontSize: 12, fontStyle: 'italic'}}>Insights will appear here as the call progresses.</div>
      )}
      {visible.map((ins, i) => (
        <div key={i} className="fade-in ai-block" style={{fontSize: 12.5}}>
          <div style={{fontWeight: 500, marginBottom: 2}}>
            <TypeChip type={ins.type} /> {ins.text}
          </div>
          <div className="muted" style={{fontSize: 11.5, lineHeight: 1.4}}>{ins.detail}</div>
        </div>
      ))}
    </div>
  );
};

const TypeChip = ({ type }) => {
  const map = {
    medication: { label: 'Meds', cls: 'primary' },
    action: { label: 'Action', cls: 'sage' },
    risk: { label: 'Risk', cls: 'rose' },
    contact: { label: 'Contact', cls: '' },
    billing: { label: 'Billing', cls: 'amber' },
  };
  const m = map[type] || map.contact;
  return <span className={`tag ${m.cls}`} style={{marginRight: 4}}>{m.label}</span>;
};

const GeneratedNotes = ({ data, tasks, onOpenTasks }) => {
  const [approving, setApproving] = React.useState(false);

  return (
    <div className="card" style={{padding: 0, overflow: 'hidden'}}>
      <div className="spread" style={{padding: '18px 24px', borderBottom: '1px solid var(--border)'}}>
        <div className="row" style={{gap: 10}}>
          <Icon name="sparkle" size={14} style={{color: 'var(--primary)'}} />
          <span className="ai-label">Auto-generated · review before saving</span>
        </div>
        <div className="row" style={{gap: 6}}>
          <button className="btn sm"><Icon name="edit" size={12} /> Edit</button>
          <button className="btn sm primary" onClick={() => setApproving(true)}>
            <Icon name="check" size={12} /> Approve & save
          </button>
        </div>
      </div>

      {approving && (
        <div className="fade-in" style={{padding: '10px 24px', background: 'var(--sage-soft)', color: 'oklch(0.35 0.06 150)', fontSize: 12.5, borderBottom: '1px solid var(--border)'}}>
          ✓ Case note saved · {tasks.length} tasks created · 14 min logged as billable · Care plan updated
        </div>
      )}

      <div style={{padding: '24px 28px'}}>
        {/* Summary */}
        <SectionLabel>Summary</SectionLabel>
        <div style={{fontSize: 14.5, lineHeight: 1.6, marginBottom: 24, fontFamily: 'var(--serif)', color: 'var(--ink-2)'}}>
          {data && data.summary ? data.summary : 'Generating summary…'}
        </div>

        {/* Key facts */}
        {data && data.keyFacts && data.keyFacts.length > 0 && (
          <>
            <SectionLabel>Key facts captured</SectionLabel>
            <div className="col" style={{gap: 1, marginBottom: 24, borderRadius: 8, overflow: 'hidden', border: '1px solid var(--border)'}}>
              {data.keyFacts.map((f, i) => <KeyFact key={i} label={f.label} value={f.value} change={f.change} detail={f.detail} trend={f.trend} />)}
            </div>
          </>
        )}

        {/* Tasks */}
        <SectionLabel>Tasks extracted <span style={{color: 'var(--muted)', fontWeight: 400, textTransform: 'none', letterSpacing: 0, marginLeft: 6}}>· {tasks.length} found, editable</span></SectionLabel>
        <div className="col" style={{gap: 6, marginBottom: 24}}>
          {tasks.map(t => (
            <div key={t.id} className="row" style={{gap: 10, padding: '10px 14px', background: 'var(--bg-2)', borderRadius: 8}}>
              <div style={{
                width: 16, height: 16, borderRadius: 4,
                border: '1.5px solid var(--border-strong)',
                flexShrink: 0,
              }} />
              <div style={{flex: 1, fontSize: 13.5}}>{t.title}</div>
              <span className="tag">{t.due}</span>
              <span className={`tag ${t.priority === 'high' ? 'rose' : 'amber'}`}>{t.priority}</span>
            </div>
          ))}
        </div>

        {/* Billing */}
        <div className="spread" style={{padding: '14px 16px', background: 'var(--bg-2)', borderRadius: 10}}>
          <div className="row" style={{gap: 10}}>
            <Icon name="clock" size={16} className="muted" />
            <div>
              <div style={{fontSize: 13, fontWeight: 500}}>14 min logged automatically</div>
              <div style={{fontSize: 11.5, color: 'var(--muted)'}}>Billable · Rate $250/hr · Est $58.33</div>
            </div>
          </div>
          <button className="btn ghost sm">Adjust</button>
        </div>

        <div className="divider" />
        <div className="row" style={{gap: 10}}>
          <button className="btn primary" onClick={onOpenTasks}><Icon name="check" size={13} /> Review tasks</button>
          <button className="btn"><Icon name="send" size={13} /> Draft family update</button>
          <button className="btn ghost"><Icon name="file" size={13} /> View full transcript</button>
        </div>
      </div>
    </div>
  );
};

const SectionLabel = ({ children }) => (
  <div style={{
    fontSize: 11,
    color: 'var(--muted)',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    marginBottom: 10,
    fontWeight: 500,
  }}>{children}</div>
);

const KeyFact = ({ label, value, change, detail, trend }) => (
  <div className="row" style={{
    gap: 14, padding: '12px 14px',
    background: 'var(--surface)',
    borderBottom: '1px solid var(--border)',
  }}>
    <div style={{minWidth: 120, fontSize: 12, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.04em'}}>{label}</div>
    <div style={{flex: 1, fontSize: 13.5, fontWeight: 500}}>{value}</div>
    {change && <span className={`tag ${trend || ''}`}>{change}</span>}
    {detail && !change && <div style={{fontSize: 12, color: 'var(--muted)'}}>{detail}</div>}
  </div>
);

const CaptureEmptyState = () => (
  <div className="card soft" style={{padding: 40, textAlign: 'center'}}>
    <div style={{
      width: 56, height: 56, borderRadius: '50%',
      background: 'var(--primary-soft)',
      color: 'var(--primary)',
      display: 'grid', placeItems: 'center',
      margin: '0 auto 16px',
    }}>
      <Icon name="mic" size={22} />
    </div>
    <div className="serif" style={{fontSize: 22, marginBottom: 6}}>Ready when you are.</div>
    <div className="muted" style={{fontSize: 14, maxWidth: 420, margin: '0 auto'}}>
      Start the call and we'll transcribe, capture key facts, and draft your case note. You review, then approve.
    </div>
  </div>
);

window.CallCapture = CallCapture;
