// icons.jsx — minimal line icons
const Icon = ({ name, size = 16, className = '', style = {} }) => {
  const paths = {
    home: <><path d="M3 10.5L10 4l7 6.5V16a1 1 0 01-1 1h-3v-5H8v5H4a1 1 0 01-1-1v-5.5z" strokeWidth="1.4"/></>,
    inbox: <><path d="M3 12v3a1 1 0 001 1h12a1 1 0 001-1v-3M3 12l2-6a1 1 0 011-.75h8a1 1 0 011 .75l2 6M3 12h3.5l1 2h5l1-2H17" strokeWidth="1.4"/></>,
    users: <><circle cx="7" cy="8" r="2.5" strokeWidth="1.4"/><path d="M3 16c0-2.5 2-4 4-4s4 1.5 4 4" strokeWidth="1.4"/><circle cx="13.5" cy="7.5" r="2" strokeWidth="1.4"/><path d="M12 13.5c.5-.3 1.2-.5 2-.5 1.8 0 3 1 3 3" strokeWidth="1.4"/></>,
    clock: <><circle cx="10" cy="10" r="7" strokeWidth="1.4"/><path d="M10 6v4l2.5 1.5" strokeWidth="1.4"/></>,
    pill: <><rect x="3" y="7" width="14" height="6" rx="3" strokeWidth="1.4" transform="rotate(-25 10 10)"/><path d="M7 6.5L13 13.5" strokeWidth="1.4"/></>,
    calendar: <><rect x="3" y="4" width="14" height="13" rx="1.5" strokeWidth="1.4"/><path d="M7 2v4M13 2v4M3 8h14" strokeWidth="1.4"/></>,
    receipt: <><path d="M4 2v16l2-1.5L8 18l2-1.5L12 18l2-1.5L16 18V2" strokeWidth="1.4"/><path d="M7 7h6M7 10h6M7 13h4" strokeWidth="1.4"/></>,
    phone: <><path d="M4 4a1 1 0 011-1h2.5l1.5 3.5-2 1.2c.8 2 2.3 3.5 4.3 4.3l1.2-2L16 11.5V14a1 1 0 01-1 1c-5.5 0-11-5.5-11-11z" strokeWidth="1.4"/></>,
    message: <><path d="M3 5a1 1 0 011-1h12a1 1 0 011 1v8a1 1 0 01-1 1H9l-4 3v-3H4a1 1 0 01-1-1V5z" strokeWidth="1.4"/></>,
    plus: <><path d="M10 4v12M4 10h12" strokeWidth="1.4"/></>,
    search: <><circle cx="9" cy="9" r="5" strokeWidth="1.4"/><path d="M13 13l3.5 3.5" strokeWidth="1.4"/></>,
    filter: <><path d="M3 5h14M6 10h8M9 15h2" strokeWidth="1.4"/></>,
    check: <><path d="M4 10l4 4 8-8" strokeWidth="1.6"/></>,
    x: <><path d="M5 5l10 10M15 5L5 15" strokeWidth="1.4"/></>,
    dot: <><circle cx="10" cy="10" r="1.5" fill="currentColor"/></>,
    more: <><circle cx="5" cy="10" r="1.2" fill="currentColor"/><circle cx="10" cy="10" r="1.2" fill="currentColor"/><circle cx="15" cy="10" r="1.2" fill="currentColor"/></>,
    arrow: <><path d="M4 10h12M12 6l4 4-4 4" strokeWidth="1.4"/></>,
    alert: <><path d="M10 2l8 14H2L10 2z" strokeWidth="1.4"/><path d="M10 8v4M10 14v.01" strokeWidth="1.4"/></>,
    sparkle: <><path d="M10 3l1.5 4.5L16 9l-4.5 1.5L10 15l-1.5-4.5L4 9l4.5-1.5L10 3z" strokeWidth="1.2"/></>,
    file: <><path d="M5 2h7l4 4v12a1 1 0 01-1 1H5a1 1 0 01-1-1V3a1 1 0 011-1z" strokeWidth="1.4"/><path d="M12 2v4h4" strokeWidth="1.4"/></>,
    send: <><path d="M3 10L17 3l-4 14-3.5-5L3 10z" strokeWidth="1.4"/></>,
    edit: <><path d="M3 17l4-1 9-9-3-3-9 9-1 4z" strokeWidth="1.4"/></>,
    download: <><path d="M10 3v10M5 9l5 5 5-5M3 17h14" strokeWidth="1.4"/></>,
    shield: <><path d="M10 2l7 3v5c0 4-3 7-7 8-4-1-7-4-7-8V5l7-3z" strokeWidth="1.4"/></>,
    heart: <><path d="M10 16S3 12 3 7a3.5 3.5 0 017-1 3.5 3.5 0 017 1c0 5-7 9-7 9z" strokeWidth="1.4"/></>,
    home2: <><path d="M3 10l7-6 7 6v7a1 1 0 01-1 1H4a1 1 0 01-1-1v-7z" strokeWidth="1.4"/></>,
    mic: <><rect x="8" y="3" width="4" height="9" rx="2" strokeWidth="1.4"/><path d="M5 10a5 5 0 0010 0M10 15v2" strokeWidth="1.4"/></>,
    settings: <><circle cx="10" cy="10" r="2.5" strokeWidth="1.4"/><path d="M10 3v2M10 15v2M3 10h2M15 10h2M5 5l1.5 1.5M13.5 13.5L15 15M5 15l1.5-1.5M13.5 6.5L15 5" strokeWidth="1.4"/></>,
    activity: <><path d="M3 10h3l2-5 3 10 2-5h4" strokeWidth="1.4"/></>,
    pause: <><rect x="6" y="4" width="2.5" height="12" fill="currentColor"/><rect x="11.5" y="4" width="2.5" height="12" fill="currentColor"/></>,
    play: <><path d="M6 4l10 6-10 6V4z" fill="currentColor"/></>,
    stop: <><rect x="5" y="5" width="10" height="10" fill="currentColor"/></>,
    chevron: <><path d="M7 5l5 5-5 5" strokeWidth="1.4"/></>,
    chevronDown: <><path d="M5 8l5 5 5-5" strokeWidth="1.4"/></>,
    menu: <><path d="M3 6h14M3 10h14M3 14h14" strokeWidth="1.4"/></>,
  };
  return (
    <svg className={className} style={style} width={size} height={size} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      {paths[name] || paths.dot}
    </svg>
  );
};

// Patrona logo — a sheltering arc over a warm circle (guardian motif)
const PatronaMark = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{display: 'block'}}>
    {/* sheltering arc */}
    <path d="M4 13.5 Q4 6 12 6 Q20 6 20 13.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
    {/* held figure */}
    <circle cx="12" cy="15.5" r="2.6" fill="currentColor"/>
  </svg>
);

window.Icon = Icon;
window.PatronaMark = PatronaMark;
