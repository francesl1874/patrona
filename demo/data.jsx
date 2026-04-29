// data.jsx — shared data for the GCM prototype

const CLIENTS = [
  {
    id: 'margaret',
    name: 'Margaret Okafor',
    initials: 'MO',
    age: 82,
    city: 'Brookline, MA',
    status: 'sage',
    statusLabel: 'Stable',
    relation: 'Mother of Dana Okafor',
    dob: 'Mar 14, 1944',
    diagnoses: ['Hypertension', 'Early-stage Alzheimer\'s', 'Osteoarthritis (L knee)'],
    livingSituation: 'Lives alone · 2BR apartment · Daughter Dana lives 1.2 mi away',
    allergies: ['Penicillin (rash)'],
    pcp: 'Dr. Linda Hsu, MD · Beth Israel',
    openTasks: 4,
    medications: [
      { id: 'm1', name: 'Lisinopril', dose: '10 mg', schedule: 'Once daily · morning', purpose: 'Blood pressure', lastFilled: 'Apr 2', next: 'May 2', status: 'ok' },
      { id: 'm2', name: 'Donepezil', dose: '5 mg', schedule: 'Once daily · bedtime', purpose: 'Cognition', lastFilled: 'Mar 28', next: 'Apr 27', status: 'refill-soon' },
      { id: 'm3', name: 'Acetaminophen', dose: '500 mg', schedule: 'As needed · max 3/day', purpose: 'Knee pain', lastFilled: 'Apr 10', next: 'OTC', status: 'ok' },
      { id: 'm4', name: 'Vitamin D3', dose: '1000 IU', schedule: 'Once daily · with food', purpose: 'Bone health', lastFilled: 'Mar 15', next: 'OTC', status: 'ok' },
    ],
    carePlan: [
      { area: 'Cognitive', goal: 'Maintain current MMSE score (24) through Q3', owner: 'Dr. Hsu + family', due: 'Review Jul 15' },
      { area: 'Mobility', goal: 'PT twice weekly; unassisted walking 30 min/day', owner: 'Kate (caregiver)', due: 'Ongoing' },
      { area: 'Social', goal: 'Senior center 2x/week; family dinner Sundays', owner: 'Dana + GCM', due: 'Ongoing' },
      { area: 'Safety', goal: 'Install grab bars in bathroom; med lockbox', owner: 'GCM', due: 'By Apr 30', flag: true },
    ],
  },
  {
    id: 'arthur',
    name: 'Arthur Whitfield',
    initials: 'AW',
    age: 88,
    city: 'Newton, MA',
    status: 'amber',
    statusLabel: 'Needs attention',
    relation: 'Father of James Whitfield',
    dob: 'Aug 2, 1938',
    diagnoses: ['CHF (Stage C)', 'Atrial fibrillation', 'Macular degeneration', 'Chronic kidney disease (Stage 3)', 'Gout'],
    livingSituation: 'Assisted living · Lakeside Manor · Son visits weekly',
    allergies: ['Sulfa drugs', 'Shellfish'],
    pcp: 'Dr. Rafael Monteiro, MD · MGH Cardiology',
    openTasks: 7,
    medications: [
      { id: 'm1', name: 'Furosemide', dose: '40 mg', schedule: 'Twice daily', purpose: 'CHF / fluid', lastFilled: 'Apr 8', next: 'May 8', status: 'ok' },
      { id: 'm2', name: 'Warfarin', dose: '5 mg', schedule: 'Once daily · evening', purpose: 'A-fib', lastFilled: 'Apr 1', next: 'May 1', status: 'monitor' },
      { id: 'm3', name: 'Metoprolol', dose: '25 mg', schedule: 'Twice daily', purpose: 'Heart rate', lastFilled: 'Mar 20', next: 'Apr 19', status: 'refill-soon' },
      { id: 'm4', name: 'Lisinopril', dose: '5 mg', schedule: 'Once daily · morning', purpose: 'Blood pressure / renal', lastFilled: 'Apr 10', next: 'May 10', status: 'ok' },
      { id: 'm5', name: 'Allopurinol', dose: '100 mg', schedule: 'Once daily', purpose: 'Gout prevention', lastFilled: 'Apr 5', next: 'May 5', status: 'ok' },
      { id: 'm6', name: 'Potassium Chloride', dose: '20 mEq', schedule: 'Once daily · with food', purpose: 'Electrolyte (diuretic adj.)', lastFilled: 'Apr 8', next: 'May 8', status: 'ok' },
    ],
    carePlan: [
      { area: 'Cardiac', goal: 'Weight daily; escalate if +3 lb in 2 days', owner: 'Lakeside staff', due: 'Ongoing', flag: true },
      { area: 'Cardiac', goal: 'INR check biweekly; target range 2.0–3.0', owner: 'Dr. Monteiro', due: 'Next: Apr 25' },
      { area: 'Vision', goal: 'Ophthalmology follow-up for macular degeneration injection', owner: 'GCM', due: 'Apr 24', flag: true },
      { area: 'Renal', goal: 'Quarterly labs (BMP, GFR). Adjust Furosemide if needed', owner: 'Dr. Monteiro + GCM', due: 'Jun 1' },
      { area: 'Social', goal: 'Weekly FaceTime with son James; activity program at Lakeside', owner: 'Lakeside staff + GCM', due: 'Ongoing' },
      { area: 'Mobility', goal: 'Chair exercises 3x/week with Lakeside PT', owner: 'Lakeside Manor', due: 'Ongoing' },
    ],
  },
  {
    id: 'vivian',
    name: 'Vivian Park',
    initials: 'VP',
    age: 79,
    city: 'Cambridge, MA',
    status: 'sage',
    statusLabel: 'Stable',
    relation: 'Mother of Helen Park',
    dob: 'Nov 11, 1946',
    diagnoses: ['Type 2 Diabetes', 'Mild depression', 'Hypothyroidism', 'Osteoarthritis (bilateral hips)'],
    livingSituation: 'Lives with daughter Helen · 3BR home in Cambridge',
    allergies: ['Latex'],
    pcp: 'Dr. Aisha Patel, MD · Cambridge Health',
    openTasks: 4,
    medications: [
      { id: 'm1', name: 'Metformin', dose: '500 mg', schedule: 'Twice daily · with meals', purpose: 'Diabetes', lastFilled: 'Apr 5', next: 'May 5', status: 'ok' },
      { id: 'm2', name: 'Sertraline', dose: '50 mg', schedule: 'Once daily · morning', purpose: 'Mood', lastFilled: 'Apr 2', next: 'May 2', status: 'ok' },
      { id: 'm3', name: 'Levothyroxine', dose: '75 mcg', schedule: 'Once daily · empty stomach', purpose: 'Thyroid', lastFilled: 'Apr 3', next: 'May 3', status: 'ok' },
      { id: 'm4', name: 'Acetaminophen', dose: '500 mg', schedule: 'As needed · max 3/day', purpose: 'Hip pain', lastFilled: 'Apr 10', next: 'OTC', status: 'ok' },
      { id: 'm5', name: 'Vitamin B12', dose: '1000 mcg', schedule: 'Once daily', purpose: 'Supplement (metformin adj.)', lastFilled: 'Mar 25', next: 'OTC', status: 'ok' },
    ],
    carePlan: [
      { area: 'Metabolic', goal: 'HbA1c < 7.0; glucose log daily', owner: 'Helen + Dr. Patel', due: 'Review Jun 1' },
      { area: 'Mood', goal: 'Weekly check-ins; reassess medication Jun', owner: 'Dr. Patel', due: 'Jun 1' },
      { area: 'Thyroid', goal: 'TSH recheck in 6 weeks after dose adjustment', owner: 'Dr. Patel', due: 'May 15' },
      { area: 'Mobility', goal: 'Water aerobics 2x/week at Cambridge Y; daily walks with Helen', owner: 'Helen + GCM', due: 'Ongoing' },
      { area: 'Social', goal: 'Korean church group Sundays; painting class Wednesdays', owner: 'Helen', due: 'Ongoing' },
    ],
  },
  {
    id: 'harold',
    name: 'Harold Jensen',
    initials: 'HJ',
    age: 85,
    city: 'Somerville, MA',
    status: 'rose',
    statusLabel: 'Urgent: hospital discharge',
    relation: 'Uncle of Sarah Jensen',
    dob: 'Jun 30, 1940',
    diagnoses: ['Parkinson\'s', 'Recent hip fracture (Apr 15)', 'Depression', 'Benign prostatic hyperplasia', 'Chronic insomnia'],
    livingSituation: 'Discharged to rehab Apr 18 · Returning home Apr 30 · 1BR apartment, 2nd floor walk-up',
    allergies: ['Codeine', 'Ibuprofen (GI bleed risk)'],
    pcp: 'Dr. Omar Khalil, MD · Somerville Primary',
    openTasks: 12,
    medications: [
      { id: 'm1', name: 'Carbidopa-Levodopa', dose: '25/100 mg', schedule: '3x daily', purpose: 'Parkinson\'s', lastFilled: 'Apr 16', next: 'May 16', status: 'ok' },
      { id: 'm2', name: 'Oxycodone', dose: '5 mg', schedule: 'Every 6h PRN · 10 day supply', purpose: 'Post-op pain', lastFilled: 'Apr 18', next: 'Taper Apr 28', status: 'monitor' },
      { id: 'm3', name: 'Apixaban', dose: '2.5 mg', schedule: 'Twice daily', purpose: 'DVT prevention', lastFilled: 'Apr 18', next: 'May 18', status: 'ok' },
      { id: 'm4', name: 'Mirtazapine', dose: '15 mg', schedule: 'Once daily · bedtime', purpose: 'Depression / sleep', lastFilled: 'Apr 16', next: 'May 16', status: 'ok' },
      { id: 'm5', name: 'Tamsulosin', dose: '0.4 mg', schedule: 'Once daily · after dinner', purpose: 'Prostate', lastFilled: 'Apr 10', next: 'May 10', status: 'ok' },
      { id: 'm6', name: 'Docusate Sodium', dose: '100 mg', schedule: 'Twice daily', purpose: 'Stool softener (opioid adj.)', lastFilled: 'Apr 18', next: 'OTC', status: 'ok' },
      { id: 'm7', name: 'Calcium + Vitamin D', dose: '600/400 mg', schedule: 'Twice daily', purpose: 'Bone healing', lastFilled: 'Apr 18', next: 'OTC', status: 'ok' },
    ],
    carePlan: [
      { area: 'Post-op', goal: 'Home safety eval before Apr 30 discharge', owner: 'GCM', due: 'Apr 28', flag: true },
      { area: 'Post-op', goal: 'Pain management taper, transition off oxycodone by Apr 28', owner: 'Dr. Khalil + GCM', due: 'Apr 28', flag: true },
      { area: 'Rehab', goal: 'In-home PT 3x/week for 6 weeks', owner: 'GCM to coordinate', due: 'Starts May 1' },
      { area: 'Caregiver', goal: '24/7 aide first 2 weeks; taper to 12h', owner: 'Sarah + GCM', due: 'Apr 30' },
      { area: 'Safety', goal: 'Assess 2nd-floor walk-up feasibility; discuss temp relocation or stair lift', owner: 'GCM + family', due: 'Apr 26', flag: true },
      { area: 'Mood', goal: 'Weekly depression screening during recovery; adjust mirtazapine PRN', owner: 'Dr. Khalil', due: 'Ongoing' },
      { area: 'Parkinson\'s', goal: 'Neurology follow-up to reassess motor function post-fracture', owner: 'GCM to schedule', due: 'May 15' },
    ],
  },
];

// Transcript lines for the live call simulation (Margaret's case)
const TRANSCRIPT_SCRIPT = [
  { speaker: 'Dana', time: '00:04', text: "Hi Sarah, thanks for calling back. I wanted to talk about Mom's doctor visit yesterday." },
  { speaker: 'GCM', time: '00:09', text: "Of course. How did the appointment with Dr. Hsu go?" },
  { speaker: 'Dana', time: '00:14', text: "It went okay. Her blood pressure was 142 over 88, which is higher than last month. Dr. Hsu wants to bump her Lisinopril from 10 to 20 mg." },
  { speaker: 'GCM', time: '00:25', text: "Got it. I'll update the care plan and coordinate with the pharmacy. Was there anything else?" },
  { speaker: 'Dana', time: '00:32', text: "Yes, Mom's been more forgetful the last two weeks. She left the stove on twice. I'm getting worried." },
  { speaker: 'GCM', time: '00:42', text: "That's important. Let's set up the stove auto-shutoff we discussed, and I'll check if it's time to increase her Donepezil. I'll also schedule a home safety re-eval." },
  { speaker: 'Dana', time: '00:58', text: "Thank you. Also, could you talk to Kate about getting Mom to the senior center Thursday? Kate's been skipping it." },
  { speaker: 'GCM', time: '01:07', text: "I'll call Kate today. And I'll loop in your brother Marcus on the medication changes." },
  { speaker: 'Dana', time: '01:14', text: "Perfect. One more thing, the long-term care insurance reimbursement hasn't come through for March." },
  { speaker: 'GCM', time: '01:21', text: "I'll follow up with Genworth this afternoon and send you an update by end of day." },
];

// Activity timeline for selected client (Margaret)
const ACTIVITY = [
  { id: 'a1', date: 'Today · 2:14 PM', type: 'call', actor: 'Dana Okafor (daughter)', title: 'Family check-in call', meta: '14 min · auto-noted', excerpt: 'Discussed BP reading at Dr. Hsu visit. Medication adjustment approved. Concern raised about stove safety.', ai: true },
  { id: 'a2', date: 'Today · 11:30 AM', type: 'message', actor: 'Kate Nguyen (caregiver)', title: 'Text from caregiver', meta: 'Inbound SMS', excerpt: '"Margaret didn\'t want to go to the senior center today. Said she was tired. Took her for a walk instead."' },
  { id: 'a3', date: 'Yesterday', type: 'visit', actor: 'Margaret Okafor', title: 'PCP visit · Dr. Linda Hsu', meta: 'Summary received', excerpt: 'BP 142/88 (elevated). Mild cognitive decline noted. Rx: increase Lisinopril to 20 mg. Refer ophthalmology.' },
  { id: 'a4', date: 'Yesterday', type: 'automated', actor: 'System', title: 'Refill reminder sent to CVS Brookline', meta: 'Automated', excerpt: 'Donepezil 5mg · Auto-sent 7 days before refill window per care plan.' },
  { id: 'a5', date: 'Apr 18', type: 'call', actor: 'Marcus Okafor (son)', title: 'Check-in with Marcus', meta: '8 min · auto-noted', excerpt: 'Marcus confirmed he can attend Sunday dinner. Discussed care plan updates from Dr. Hsu visit. No concerns from his side.', ai: true },
  { id: 'a6', date: 'Apr 16', type: 'note', actor: 'You (Sarah Marshall, CMC)', title: 'Monthly family update drafted', meta: '6 min · billable', excerpt: 'Sent to Dana and Marcus. Included March activity, upcoming appts, and insurance status.' },
  { id: 'a7', date: 'Apr 14', type: 'call', actor: 'Genworth LTC Insurance', title: 'Reimbursement inquiry', meta: '22 min · billable', excerpt: 'Escalated March claim to Tier 2. Case #LTC-4482019. Follow-up scheduled.' },
  { id: 'a8', date: 'Apr 12', type: 'visit', actor: 'You (Sarah Marshall, CMC)', title: 'Home visit: Margaret Okafor', meta: '90 min · billable', excerpt: 'Routine home visit. Reviewed medications with Margaret. Kitchen clean, fridge stocked. Margaret was alert and conversational. Noted loose bathroom mat. Recommended replacement.' },
  { id: 'a9', date: 'Apr 11', type: 'task', actor: 'System', title: 'Safety eval task auto-created', meta: 'From prior call', excerpt: 'Triggered by: "Dana mentioned Mom forgot to lock the door twice."' },
  { id: 'a10', date: 'Apr 9', type: 'automated', actor: 'System', title: 'Appointment confirmed: Dr. Hsu Apr 19', meta: 'Automated', excerpt: 'Confirmation sent via portal. Dana added as authorized contact for visit summary.' },
  { id: 'a11', date: 'Apr 7', type: 'call', actor: 'Kate Nguyen (caregiver)', title: 'Caregiver weekly check-in', meta: '12 min · billable', excerpt: 'Kate reports Margaret has been sleeping well. Appetite is good. She refused to do her PT exercises Tuesday, says her knee hurts. Kate offered to try a walk instead.', ai: true },
  { id: 'a12', date: 'Apr 4', type: 'message', actor: 'Dana Okafor (daughter)', title: 'Text from Dana', meta: 'Inbound SMS', excerpt: '"Hi Sarah, just checking, did Mom\'s Vitamin D get refilled? She said the bottle is almost empty."' },
  { id: 'a13', date: 'Apr 2', type: 'note', actor: 'You (Sarah Marshall, CMC)', title: 'Insurance documentation update', meta: '18 min · billable', excerpt: 'Prepared Genworth LTC claim for March services. Attached time log, care plan summary, and physician referral documentation.' },
];

const TASKS = [
  { id: 't1', client: 'Margaret Okafor', title: 'Coordinate Lisinopril dose change with CVS Brookline', due: 'Today', priority: 'high', source: 'From call with Dana, 2:14 PM', done: false },
  { id: 't2', client: 'Margaret Okafor', title: 'Schedule home safety re-evaluation', due: 'This week', priority: 'high', source: 'From call with Dana, 2:14 PM', done: false },
  { id: 't3', client: 'Margaret Okafor', title: 'Call Kate re: senior center Thursdays', due: 'Today', priority: 'med', source: 'From call with Dana, 2:14 PM', done: false },
  { id: 't4', client: 'Margaret Okafor', title: 'Follow up with Genworth on March reimbursement', due: 'Today', priority: 'med', source: 'From call with Dana, 2:14 PM', done: false },
  { id: 't5', client: 'Arthur Whitfield', title: 'Confirm ophthalmology appointment for Apr 24', due: 'Today', priority: 'high', source: 'Care plan', done: false },
  { id: 't6', client: 'Arthur Whitfield', title: 'Review weight trend with Lakeside Manor nurse', due: 'Today', priority: 'high', source: 'Auto-alert · weight +3.2 lb', done: false },
  { id: 't7', client: 'Arthur Whitfield', title: 'Schedule INR lab draw for Apr 25', due: 'This week', priority: 'med', source: 'Care plan · biweekly', done: false },
  { id: 't8', client: 'Arthur Whitfield', title: 'Call James re: father\'s weight gain concern', due: 'Today', priority: 'med', source: 'From Lakeside auto-alert', done: false },
  { id: 't9', client: 'Harold Jensen', title: 'Complete home safety eval before Apr 30 discharge', due: 'Apr 28', priority: 'high', source: 'Discharge plan', done: false },
  { id: 't10', client: 'Harold Jensen', title: 'Arrange 24/7 home aide starting Apr 30', due: 'Apr 26', priority: 'high', source: 'Discharge plan', done: false },
  { id: 't11', client: 'Harold Jensen', title: 'Assess stair lift options for 2nd-floor apartment', due: 'Apr 26', priority: 'high', source: 'From rehab team note', done: false },
  { id: 't12', client: 'Harold Jensen', title: 'Coordinate oxycodone taper plan with Dr. Khalil', due: 'This week', priority: 'high', source: 'Care plan · pain mgmt', done: false },
  { id: 't13', client: 'Harold Jensen', title: 'Confirm in-home PT referral (starts May 1)', due: 'Apr 28', priority: 'med', source: 'Discharge plan', done: false },
  { id: 't14', client: 'Harold Jensen', title: 'Schedule neurology follow-up for Parkinson\'s reassessment', due: 'May 5', priority: 'med', source: 'Care plan', done: false },
  { id: 't15', client: 'Vivian Park', title: 'Send monthly family update to Helen', due: 'Apr 22', priority: 'low', source: 'Recurring', done: true },
  { id: 't16', client: 'Vivian Park', title: 'Confirm TSH lab appointment for May 15', due: 'This week', priority: 'med', source: 'Care plan · thyroid', done: false },
  { id: 't17', client: 'Vivian Park', title: 'Check in on water aerobics attendance with Helen', due: 'Apr 24', priority: 'low', source: 'Care plan · mobility', done: false },
  { id: 't18', client: 'Vivian Park', title: 'Home visit: glucose log review and mood check-in', due: 'Apr 22', priority: 'med', source: 'Recurring · biweekly', done: false },
];

const TIME_ENTRIES = [
  { id: 'te1', client: 'Margaret Okafor', date: 'Apr 20', task: 'Family call with Dana Okafor', duration: 14, rate: 250, billable: true, auto: true },
  { id: 'te2', client: 'Margaret Okafor', date: 'Apr 20', task: 'Care plan update: Lisinopril dose', duration: 6, rate: 250, billable: true, auto: true },
  { id: 'te3', client: 'Margaret Okafor', date: 'Apr 20', task: 'Pharmacy coordination (CVS)', duration: 8, rate: 250, billable: true, auto: false },
  { id: 'te4', client: 'Margaret Okafor', date: 'Apr 19', task: 'Genworth LTC follow-up', duration: 22, rate: 250, billable: true, auto: true },
  { id: 'te5', client: 'Margaret Okafor', date: 'Apr 18', task: 'Check-in call with Marcus Okafor', duration: 8, rate: 250, billable: true, auto: true },
  { id: 'te6', client: 'Margaret Okafor', date: 'Apr 16', task: 'Monthly family update, March', duration: 45, rate: 250, billable: true, auto: false },
  { id: 'te7', client: 'Margaret Okafor', date: 'Apr 14', task: 'Genworth LTC claim, March services', duration: 22, rate: 250, billable: true, auto: true },
  { id: 'te8', client: 'Margaret Okafor', date: 'Apr 12', task: 'Home visit: Margaret Okafor', duration: 90, rate: 250, billable: true, auto: false },
  { id: 'te9', client: 'Margaret Okafor', date: 'Apr 11', task: 'Senior center enrollment paperwork', duration: 18, rate: 250, billable: true, auto: false },
  { id: 'te10', client: 'Margaret Okafor', date: 'Apr 9', task: 'Dr. Hsu appointment confirmation', duration: 5, rate: 250, billable: true, auto: true },
  { id: 'te11', client: 'Margaret Okafor', date: 'Apr 7', task: 'Caregiver check-in call with Kate', duration: 12, rate: 250, billable: true, auto: true },
  { id: 'te12', client: 'Margaret Okafor', date: 'Apr 4', task: 'Vitamin D refill coordination', duration: 4, rate: 250, billable: true, auto: true },
  { id: 'te13', client: 'Margaret Okafor', date: 'Apr 2', task: 'Insurance documentation prep', duration: 18, rate: 250, billable: true, auto: false },
  { id: 'te14', client: 'Arthur Whitfield', date: 'Apr 20', task: 'Lakeside Manor weight alert review', duration: 10, rate: 250, billable: true, auto: true },
  { id: 'te15', client: 'Arthur Whitfield', date: 'Apr 20', task: 'Call to James Whitfield re: weight concern', duration: 8, rate: 250, billable: true, auto: true },
  { id: 'te16', client: 'Arthur Whitfield', date: 'Apr 18', task: 'Ophthalmology appointment scheduling', duration: 12, rate: 250, billable: true, auto: false },
  { id: 'te17', client: 'Arthur Whitfield', date: 'Apr 15', task: 'Lakeside Manor staff coordination', duration: 20, rate: 250, billable: true, auto: false },
  { id: 'te18', client: 'Arthur Whitfield', date: 'Apr 11', task: 'INR results review with Dr. Monteiro', duration: 8, rate: 250, billable: true, auto: true },
  { id: 'te19', client: 'Arthur Whitfield', date: 'Apr 8', task: 'Monthly family update to James', duration: 15, rate: 250, billable: true, auto: false },
  { id: 'te20', client: 'Harold Jensen', date: 'Apr 20', task: 'Rehab facility check-in call', duration: 18, rate: 250, billable: true, auto: true },
  { id: 'te21', client: 'Harold Jensen', date: 'Apr 19', task: 'Home aide agency intake paperwork', duration: 35, rate: 250, billable: true, auto: false },
  { id: 'te22', client: 'Harold Jensen', date: 'Apr 18', task: 'Discharge planning meeting (hospital)', duration: 45, rate: 250, billable: true, auto: false },
  { id: 'te23', client: 'Harold Jensen', date: 'Apr 17', task: 'Call with Dr. Khalil re: pain management', duration: 12, rate: 250, billable: true, auto: true },
  { id: 'te24', client: 'Harold Jensen', date: 'Apr 16', task: 'Stair lift vendor research and calls', duration: 25, rate: 250, billable: true, auto: false },
  { id: 'te25', client: 'Harold Jensen', date: 'Apr 15', task: 'Hospital visit: post-surgery check', duration: 40, rate: 250, billable: true, auto: false },
  { id: 'te26', client: 'Vivian Park', date: 'Apr 20', task: 'Monthly family update to Helen', duration: 12, rate: 250, billable: true, auto: false },
  { id: 'te27', client: 'Vivian Park', date: 'Apr 14', task: 'Home visit: glucose log review', duration: 45, rate: 250, billable: true, auto: false },
  { id: 'te28', client: 'Vivian Park', date: 'Apr 10', task: 'Call with Dr. Patel re: thyroid labs', duration: 8, rate: 250, billable: true, auto: true },
  { id: 'te29', client: 'Vivian Park', date: 'Apr 7', task: 'Cambridge Y water aerobics enrollment', duration: 15, rate: 250, billable: true, auto: false },
];

const DRAFT_MESSAGE = {
  to: 'Dana Okafor',
  channel: 'SMS',
  subject: 'Today\'s update on your mom',
  body: `Hi Dana, quick recap from today's call:

• Dr. Hsu's new Lisinopril dose (20 mg) is being sent to CVS Brookline. I'll confirm pickup.
• Home safety re-eval is scheduled for Friday at 2 pm.
• I'll call Kate tonight about the senior center Thursdays.
• Genworth escalation is in. I'll have an update by end of day tomorrow.

Any questions, text me anytime.

- Sarah`,
};


const POST_VISIT_NOTES = {
  margaret: [
    { date: 'Apr 12', type: 'Home visit', text: 'Routine home visit. Reviewed medications with Margaret. Kitchen clean, fridge stocked. She was alert and conversational. Noted loose bathroom mat. Recommended replacement. Dana stopped by during visit.' },
    { date: 'Mar 28', type: 'Home visit', text: 'Margaret was quieter than usual. Kate reports she skipped PT twice last week, says her knee hurts. Checked med organizer, mostly on track. Discussed senior center schedule for April.' },
    { date: 'Mar 14', type: 'Phone check-in', text: 'Quick call with Margaret. She sounded well, mentioned enjoying Sunday dinner with the family. Reminded her about Dr. Hsu appointment next month.' },
  ],
  arthur: [
    { date: 'Apr 16', type: 'In-person visit', text: 'Arthur in good spirits but favoring left foot, possible gout flare. Staff aware. Reviewed medication timing with nurse. Room clean, well-kept. He mentioned missing his garden. Worth exploring raised bed option with Lakeside.' },
    { date: 'Apr 2', type: 'In-person visit', text: 'Biweekly check-in. Arthur participated in chair exercises today. Appetite improved from last visit. Weight stable at 184.0 lb.' },
    { date: 'Mar 19', type: 'In-person visit', text: 'Arthur was tired today, didn\'t sleep well. Nurse confirmed he was up twice overnight. INR stable. Discussed increasing activity program engagement with Lakeside activities director.' },
  ],
  vivian: [
    { date: 'Apr 14', type: 'Home visit', text: 'Glucose log reviewed. Readings mostly 110–130 range, well controlled. Vivian seemed cheerful, showed me a painting from Wednesday class. Hip pain manageable. Helen reports mom is sleeping better since sertraline adjustment.' },
    { date: 'Mar 31', type: 'Home visit', text: 'TSH came back at 4.8, slightly elevated. Dr. Patel adjusting levothyroxine dose. Vivian says she\'s been skipping water aerobics because of hip pain. Suggested she try the warm pool sessions instead.' },
    { date: 'Mar 17', type: 'Phone check-in', text: 'Helen called. Vivian had a low mood day, didn\'t want to leave the house. Discussed with Dr. Patel, holding on sertraline for now. Encouraged Helen to keep the painting class routine going.' },
  ],
  harold: [
    { date: 'Apr 18', type: 'Hospital / discharge planning', text: 'Met with discharge team at rehab facility. Harold is weight-bearing with walker, good progress. Pain controlled with oxycodone but taper starts Apr 28. Main concern: 2nd floor walk-up apartment. Discussed stair lift vs. temporary relocation with family.' },
    { date: 'Apr 15', type: 'Hospital visit', text: 'Post-surgery check. Harold alert and oriented. Pain 4/10 with medication. Parkinson\'s tremor seems slightly worse since surgery, will need neuro follow-up. Mood okay but quiet. Asked about his cat. Neighbor is feeding.' },
  ],
};

const VISIT_GENERATED = {
  margaret: {
    bullets: [
      'Margaret was alert and conversational; medication adherence has improved since the last visit.',
      'Loose bathroom mat noted near the tub, recommended immediate removal or replacement with a non-slip option.',
      'Dana confirmed she has been driving Margaret to PT twice weekly; kitchen clean and fridge well-stocked.',
      'Overall stable; bathroom safety remains a concern pending grab bar installation.',
    ],
    todos: [
      { text: 'Replace loose bathroom mat with non-slip alternative', priority: 'high' },
      { text: 'Follow up on grab bar installation timeline', priority: 'high' },
      { text: 'Confirm PT attendance log with Dana', priority: 'med' },
      { text: 'Update care plan: note medication adherence improvement', priority: 'low' },
    ],
  },
  arthur: {
    bullets: [
      'Arthur was alert and in good spirits but favoring his left foot, consistent with a possible gout flare; facility staff are aware and monitoring.',
      'Medication timing reviewed with the floor nurse, all doses on schedule; weight stable at 184 lb and INR within target.',
      'Skipped two chair exercise sessions last week, attributed to foot discomfort.',
      'Raised garden bed option discussed with the Lakeside activities director, who is receptive to the idea.',
    ],
    todos: [
      { text: 'Check with Dr. Monteiro on gout flare management', priority: 'high' },
      { text: 'Follow up with Lakeside re: raised garden bed proposal', priority: 'med' },
      { text: 'Coordinate modified exercise plan during gout flare', priority: 'med' },
      { text: 'Schedule FaceTime with James for Sunday', priority: 'low' },
    ],
  },
  vivian: {
    bullets: [
      'Glucose readings mostly 110 to 130, well controlled on the current Metformin dose.',
      'Hip pain remains manageable with acetaminophen and is not limiting her daily walks with Helen.',
      'Helen reports Vivian has been sleeping better since the sertraline adjustment last month.',
      'Cheerful visit; Vivian showed a watercolor painting from Wednesday class and appeared socially engaged.',
    ],
    todos: [
      { text: 'Confirm TSH lab appointment for May 15', priority: 'med' },
      { text: 'Send glucose log summary to Dr. Patel before next visit', priority: 'med' },
      { text: 'Check in with Helen on water aerobics attendance', priority: 'low' },
    ],
  },
  harold: {
    bullets: [
      'Harold is weight-bearing with a walker and making good progress per the PT team; pain controlled at 3/10.',
      'Oxycodone taper begins Apr 28, transitioning to acetaminophen only.',
      'Parkinson\'s tremor is slightly more pronounced since surgery and warrants a neurology follow-up.',
      'Family is leaning toward temporary relocation to the nephew\'s home while a stair lift is installed at the apartment.',
    ],
    todos: [
      { text: 'Confirm temporary relocation plan with nephew Sarah Jensen', priority: 'high' },
      { text: 'Get stair lift installation quotes, schedule for May', priority: 'high' },
      { text: 'Coordinate oxycodone taper start date with Dr. Khalil', priority: 'high' },
      { text: 'Schedule neurology follow-up for Parkinson\'s reassessment', priority: 'med' },
      { text: 'Arrange 24/7 home aide for first 2 weeks post-discharge', priority: 'high' },
    ],
  },
};

const CONVERSATIONS = {
  margaret: [
    {
      contact: 'Dana Okafor', relation: 'Daughter', channel: 'sms',
      messages: [
        { id: 'm1', from: 'Sarah', time: 'Apr 20 · 2:45 PM', body: 'Hi Dana, quick recap from today\'s call:\n\n• Dr. Hsu\'s new Lisinopril dose (20 mg) is being sent to CVS Brookline. I\'ll confirm pickup.\n• Home safety re-eval is scheduled for Friday at 2 pm.\n• I\'ll call Kate tonight about the senior center Thursdays.\n• Genworth escalation is in. I\'ll have an update by end of day tomorrow.\n\nAny questions, text me anytime.\n\n- Sarah', ai: true, event: 'After call with Dana' },
        { id: 'm2', from: 'Dana', time: 'Apr 20 · 3:02 PM', body: 'Thanks Sarah, can you also check on Mom\'s eye appointment?' },
        { id: 'm3', from: 'Sarah', time: 'Apr 20 · 3:15 PM', body: 'Of course! I\'ll check with Dr. Hsu\'s office and get back to you.' },
        { id: 'm4', from: 'Dana', time: 'Apr 18 · 9:10 AM', body: 'Hey Sarah, just wanted to let you know Marcus is coming to Sunday dinner. Mom seems excited.' },
        { id: 'm5', from: 'Sarah', time: 'Apr 16 · 4:30 PM', body: 'Hi Dana, sent you the March update. Let me know if anything looks off. Marcus is cc\'d too.', ai: true, event: 'Monthly family update' },
        { id: 'm6', from: 'Dana', time: 'Apr 4 · 11:22 AM', body: 'Hi Sarah, just checking, did Mom\'s Vitamin D get refilled? She said the bottle is almost empty.' },
        { id: 'm7', from: 'Sarah', time: 'Apr 4 · 12:05 PM', body: 'Yep, picked it up yesterday! Kate will bring it over this afternoon.' },
      ],
    },
    {
      contact: 'Kate Nguyen', relation: 'Caregiver', channel: 'sms',
      messages: [
        { id: 'k1', from: 'Kate', time: 'Apr 20 · 11:30 AM', body: 'Margaret didn\'t want to go to the senior center today. Said she was tired. Took her for a walk instead.' },
        { id: 'k2', from: 'Sarah', time: 'Apr 20 · 11:45 AM', body: 'Thanks for letting me know Kate. A walk is great. Can you try again Thursday? Dana mentioned it\'s important for her routine.' },
        { id: 'k3', from: 'Kate', time: 'Apr 14 · 3:00 PM', body: 'Margaret did her PT exercises today! First time this week. She complained about her knee but got through it.' },
        { id: 'k4', from: 'Sarah', time: 'Apr 14 · 3:20 PM', body: 'That\'s great news. Keep encouraging her. I\'ll mention it to Dana.' },
      ],
    },
    {
      contact: 'Dr. Linda Hsu', relation: 'PCP, Beth Israel', channel: 'email',
      messages: [
        { id: 'h1', from: 'Sarah', time: 'Apr 20 · 3:30 PM', body: 'Dr. Hsu, following up on Margaret Okafor\'s visit yesterday. Dana confirmed the Lisinopril increase to 20mg. I\'m coordinating with CVS Brookline. Also wanted to flag two stove-left-on incidents in the past two weeks. Should we consider a Donepezil adjustment at the next visit?', ai: true, event: 'After call with Dana' },
        { id: 'h2', from: 'Dr. Hsu', time: 'Apr 19 · 5:15 PM', body: 'Sarah, visit summary attached. BP 142/88, up from last month. Increasing Lisinopril to 20mg. Mild cognitive decline noted on exam. Let\'s discuss Donepezil at her next quarterly. Also referring to ophthalmology.' },
      ],
    },
  ],
  arthur: [
    {
      contact: 'James Whitfield', relation: 'Son', channel: 'sms',
      messages: [
        { id: 'j1', from: 'Sarah', time: 'Apr 20 · 3:00 PM', body: 'Hi James, update from our call:\n\n• Dad\'s weight is up 3.2 lb in 2 days. I\'ve contacted Dr. Monteiro about adjusting his Furosemide.\n• Eye appointment confirmed for Apr 24. Lakeside will arrange transport.\n• INR draw set for Apr 25.\n• Metoprolol refill being coordinated with CVS Newton.\n\nI\'ll check in with the Lakeside activities team about getting him more engaged.\n\n- Sarah', ai: true, event: 'After call with James' },
        { id: 'j2', from: 'James', time: 'Apr 20 · 3:30 PM', body: 'Got it, thanks for the update on Dad. I\'ll call this weekend.' },
        { id: 'j3', from: 'Sarah', time: 'Apr 15 · 5:00 PM', body: 'Hi James, April update attached. Dad\'s been in good spirits overall. A few things to watch: possible gout flare (left foot), and he skipped chair exercises twice last week. INR is stable.', ai: true, event: 'Monthly family update' },
        { id: 'j4', from: 'James', time: 'Apr 15 · 6:20 PM', body: 'Thanks Sarah. The gout thing worries me. He used to get bad flares. Is the allopurinol working?' },
        { id: 'j5', from: 'Sarah', time: 'Apr 15 · 6:45 PM', body: 'It\'s been helping. This might just be a mild one. I\'ll keep an eye on it and flag Dr. Monteiro if it gets worse.' },
      ],
    },
    {
      contact: 'Lakeside Manor', relation: 'Facility staff', channel: 'app',
      messages: [
        { id: 'l1', from: 'Lakeside', time: 'Apr 20 · 8:14 AM', body: 'ALERT: Arthur Whitfield weight 187.4 lb this AM vs. 184.2 lb on Apr 18. Exceeds CHF threshold. Staff notified care team.' },
        { id: 'l2', from: 'Sarah', time: 'Apr 20 · 8:30 AM', body: 'Thanks for the alert. I\'m calling Dr. Monteiro and James today. Please continue daily weights and let me know if there are any other changes.' },
        { id: 'l3', from: 'Lakeside', time: 'Apr 16 · 10:00 AM', body: 'Arthur skipped chair exercises again today. Said his foot hurts. Nurse checked, mild swelling left foot.' },
        { id: 'l4', from: 'Sarah', time: 'Apr 16 · 10:30 AM', body: 'Noted, thanks. Might be a gout flare. I\'ll mention it at my visit this afternoon.' },
      ],
    },
  ],
  vivian: [
    {
      contact: 'Helen Park', relation: 'Daughter', channel: 'sms',
      messages: [
        { id: 'hp1', from: 'Sarah', time: 'Apr 20 · 11:00 AM', body: 'Hi Helen, monthly update for you:\n\n• Mom\'s glucose has been well controlled (110-130 range)\n• She loved the painting class on Wednesday\n• TSH lab scheduled for May 15 (thyroid recheck)\n• Water aerobics is going well at the Cambridge Y\n\nOverall she\'s doing great. Let me know if you notice anything.\n\n- Sarah', ai: true, event: 'Monthly family update' },
        { id: 'hp2', from: 'Helen', time: 'Apr 20 · 11:30 AM', body: 'Thanks Sarah! Mom did great at water aerobics today. She loved the warm pool.' },
        { id: 'hp3', from: 'Helen', time: 'Apr 16 · 8:00 PM', body: 'Hey Sarah, Mom seemed a little down today. Didn\'t want to go on our walk. Not sure if it\'s the hip or mood.' },
        { id: 'hp4', from: 'Sarah', time: 'Apr 16 · 8:30 PM', body: 'Thanks for flagging that Helen. Could be either. I\'ll check in with Dr. Patel about her sertraline. Has she been sleeping okay?' },
        { id: 'hp5', from: 'Helen', time: 'Apr 16 · 8:45 PM', body: 'Sleep has actually been better since the dose change. Just the mood dip today.' },
      ],
    },
    {
      contact: 'Dr. Aisha Patel', relation: 'PCP, Cambridge Health', channel: 'email',
      messages: [
        { id: 'dp1', from: 'Sarah', time: 'Apr 14 · 5:00 PM', body: 'Dr. Patel, glucose log from today\'s home visit attached. Readings 110-130 range, well controlled on Metformin 500mg BID. Helen reports improved sleep since sertraline adjustment. One low mood day noted Apr 16 but otherwise stable. TSH recheck scheduled May 15.', ai: true, event: 'After home visit' },
        { id: 'dp2', from: 'Dr. Patel', time: 'Apr 10 · 2:00 PM', body: 'Sarah, TSH came back at 4.8. Slightly elevated. I\'m bumping levothyroxine to 88mcg. Recheck in 6 weeks. Let me know if Vivian reports any symptoms.' },
      ],
    },
  ],
  harold: [
    {
      contact: 'Rehab facility', relation: 'Current care', channel: 'app',
      messages: [
        { id: 'r1', from: 'Rehab', time: 'Apr 20 · 9:00 AM', body: 'Harold Jensen update: weight-bearing with walker, good progress. PT recommends continued rehab through Apr 30. Pain managed at 3/10.' },
        { id: 'r2', from: 'Sarah', time: 'Apr 20 · 9:30 AM', body: 'Great to hear. I\'m working on the discharge plan for Apr 30. Home aide lined up. Will the PT team provide a home exercise plan?' },
        { id: 'r3', from: 'Rehab', time: 'Apr 18 · 4:00 PM', body: 'Discharge planning meeting notes: Harold cleared for home with walker. Recommends in-home PT 3x/week. Stairs are a concern.' },
      ],
    },
    {
      contact: 'Dr. Omar Khalil', relation: 'PCP, Somerville Primary', channel: 'email',
      messages: [
        { id: 'ok1', from: 'Sarah', time: 'Apr 18 · 6:00 PM', body: 'Dr. Khalil, discharge planning update for Harold Jensen. He\'s cleared to go home Apr 30 with walker. Main concerns: oxycodone taper (starting Apr 28), 2nd floor walk-up access, and Parkinson\'s tremor seems slightly worse post-surgery. Would like to discuss the pain taper plan and get a neurology referral.', ai: true, event: 'After discharge meeting' },
        { id: 'ok2', from: 'Dr. Khalil', time: 'Apr 17 · 3:00 PM', body: 'Sarah, oxycodone taper plan attached. Transition to acetaminophen by Apr 28. Agree on neurology referral. I can put that in.' },
      ],
    },
  ],
};

// Pending AI drafts (triggered by events, awaiting GCM review)
const PENDING_DRAFTS = {
  margaret: [
    { id: 'pd1', to: 'Dana Okafor', channel: 'sms', event: 'Call ended with Dana (2:14 PM)', body: 'Hi Dana, quick recap from today\'s call:\n\n• Dr. Hsu\'s new Lisinopril dose (20 mg) is being sent to CVS Brookline. I\'ll confirm pickup.\n• Home safety re-eval is scheduled for Friday at 2 pm.\n• I\'ll call Kate tonight about the senior center Thursdays.\n• Genworth escalation is in. I\'ll have an update by end of day tomorrow.\n\nAny questions, text me anytime.\n\n- Sarah' },
  ],
  arthur: [
    { id: 'pd2', to: 'James Whitfield', channel: 'sms', event: 'Call ended with James (2:14 PM)', body: 'Hi James, update from our call:\n\n• Dad\'s weight is up 3.2 lb in 2 days. I\'ve contacted Dr. Monteiro about adjusting his Furosemide.\n• Eye appointment confirmed for Apr 24. Lakeside will arrange transport.\n• INR draw set for Apr 25.\n• Metoprolol refill being coordinated with CVS Newton.\n\nI\'ll check in with the Lakeside activities team about getting him more engaged.\n\n- Sarah' },
  ],
  vivian: [],
  harold: [],
};

Object.assign(window, { CLIENTS, TRANSCRIPT_SCRIPT, ACTIVITY, TASKS, TIME_ENTRIES, DRAFT_MESSAGE, POST_VISIT_NOTES, VISIT_GENERATED, CONVERSATIONS, PENDING_DRAFTS });
