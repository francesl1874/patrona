// ai.jsx — AI generation layer (Claude API via proxy)

window.PATRONA_CONFIG = {
  apiUrl: '/api/generate',
  useMockData: true,           // global default — flip to false to hit real Claude for every flow
  realFlows: ['visit-note'],   // flows that bypass useMockData and always call real Claude (when proxy has API key)
};

// ============ SYSTEM PROMPTS ============

const SYSTEM_PROMPTS = {
  'visit-note': `You are a world-class geriatric care manager with 20+ years of experience and a background as a registered nurse. You write case notes the way a seasoned clinician does: precise, warm, and grounded in what you actually observed. Your notes sound like a human wrote them, not a form letter.

Given a care manager's raw post-visit notes, produce a brief case note and a list of actionable to-do items.

Format the case note as 3-5 bullet points. Each bullet is one sentence covering a single key observation from this visit: client status, clinical findings, safety concerns, or notable interactions. Do not summarize the care plan, reference history not mentioned in the notes, or add boilerplate. Write in third person. Never use em dashes.

The to-do items should be concrete, actionable follow-ups extracted only from this visit's notes. Assign priority: "high" for urgent or safety-related items, "med" for routine follow-ups, "low" for nice-to-haves. Aim for 3-5 items max.

Do not provide medical advice. Flag anything that requires physician review.`,

  'call-capture': `You are Patrona, an AI assistant for geriatric care managers (GCMs). Given a transcript of a call between a care manager and a family member or provider, produce:
1. A 2-3 sentence narrative summary of the call
2. Key clinical/actionable facts extracted from the call
3. Follow-up tasks with priority and suggested due dates

For key facts, identify: vital signs, medication changes, safety concerns, appointment details, and family concerns. Include trend indicators where relevant ("amber" for concerning, "rose" for urgent/critical).

For tasks, assign priority: "high" for urgent or safety items, "med" for standard follow-ups, "low" for informational.

Do not provide medical advice. Flag anything that requires physician review.`,

  'intake': `You are Patrona, an AI assistant for geriatric care managers (GCMs). Given raw intake notes for a new geriatric care client, produce a structured case summary, care plan, and task list.

For the summary, assess: living situation, functional concerns, family dynamics, immediate risks, and open questions.

For the care plan, create goal-oriented intervention plans with timeframes. Each care plan item MUST include a "source" field containing a brief verbatim quote from the original intake notes that supports that goal.

For tasks, create concrete next steps with owners, due dates, and priorities. Each task MUST include a "source" field with a brief quote from the notes.

Do not provide medical advice. Flag anything that requires physician review.`,
};

// ============ TOOL SCHEMAS ============

const TOOL_SCHEMAS = {
  'visit-note': {
    name: 'generate_visit_note',
    description: 'Generate a case note and to-do items from post-visit observations',
    input_schema: {
      type: 'object',
      properties: {
        bullets: {
          type: 'array',
          items: { type: 'string', description: 'One sentence covering a single observation from this visit' },
          description: '3-5 bullet points, each a single sentence, covering only what happened during this visit',
        },
        todos: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              text: { type: 'string', description: 'Actionable to-do item' },
              priority: { type: 'string', enum: ['high', 'med', 'low'] },
            },
            required: ['text', 'priority'],
          },
        },
      },
      required: ['bullets', 'todos'],
    },
  },
  'call-capture': {
    name: 'generate_call_summary',
    description: 'Generate a summary, key facts, and tasks from a call transcript',
    input_schema: {
      type: 'object',
      properties: {
        summary: { type: 'string', description: 'Narrative summary, 2-3 sentences' },
        keyFacts: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              label: { type: 'string', description: 'Fact category (e.g., "BP reading", "Rx change")' },
              value: { type: 'string', description: 'The fact value' },
              change: { type: 'string', description: 'Trend indicator text, if applicable' },
              detail: { type: 'string', description: 'Additional context, if no change' },
              trend: { type: 'string', enum: ['amber', 'rose'], description: 'Trend severity color, if applicable' },
            },
            required: ['label', 'value'],
          },
        },
        tasks: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'number' },
              title: { type: 'string' },
              due: { type: 'string' },
              priority: { type: 'string', enum: ['high', 'med', 'low'] },
            },
            required: ['id', 'title', 'due', 'priority'],
          },
        },
      },
      required: ['summary', 'keyFacts', 'tasks'],
    },
  },
  'intake': {
    name: 'generate_intake_plan',
    description: 'Generate a case summary, care plan, and tasks from intake notes',
    input_schema: {
      type: 'object',
      properties: {
        summary: {
          type: 'object',
          properties: {
            livingSituation: { type: 'string' },
            functionalLimits: { type: 'string' },
            familyDynamics: { type: 'string' },
            immediateRisks: { type: 'array', items: { type: 'string' } },
            openQuestions: { type: 'array', items: { type: 'string' } },
          },
          required: ['livingSituation', 'functionalLimits', 'familyDynamics', 'immediateRisks', 'openQuestions'],
        },
        carePlan: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              goal: { type: 'string' },
              interventions: { type: 'array', items: { type: 'string' } },
              timeframe: { type: 'string' },
              source: { type: 'string', description: 'Brief verbatim quote from intake notes' },
            },
            required: ['goal', 'interventions', 'timeframe', 'source'],
          },
        },
        tasks: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'number' },
              text: { type: 'string' },
              owner: { type: 'string' },
              due: { type: 'string' },
              priority: { type: 'string', enum: ['high', 'med', 'low'] },
              done: { type: 'boolean' },
              source: { type: 'string', description: 'Brief quote from intake notes' },
            },
            required: ['id', 'text', 'owner', 'due', 'priority', 'source'],
          },
        },
      },
      required: ['summary', 'carePlan', 'tasks'],
    },
  },
};

// ============ MESSAGE BUILDERS ============

function buildClientContext(client) {
  const lines = [
    `Client: ${client.name}, ${client.age}, ${client.city}`,
    `Relation: ${client.relation}`,
    `Diagnoses: ${client.diagnoses.join(', ')}`,
    `Living situation: ${client.livingSituation}`,
    `PCP: ${client.pcp}`,
  ];
  if (client.allergies.length) lines.push(`Allergies: ${client.allergies.join(', ')}`);
  if (client.medications.length) {
    lines.push('Medications:');
    client.medications.forEach(m => lines.push(`  - ${m.name} ${m.dose} (${m.purpose}), ${m.schedule}`));
  }
  if (client.carePlan.length) {
    lines.push('Current care plan goals:');
    client.carePlan.forEach(g => lines.push(`  - [${g.area}] ${g.goal} (owner: ${g.owner}, due: ${g.due})${g.flag ? ' ⚑ FLAGGED' : ''}`));
  }
  return lines.join('\n');
}

function buildUserMessage(flow, payload) {
  if (flow === 'visit-note') {
    const parts = [buildClientContext(payload.client)];
    if (payload.previousNotes && payload.previousNotes.length) {
      parts.push('\nPrevious visit notes:');
      payload.previousNotes.forEach(n => parts.push(`[${n.date} · ${n.type}] ${n.text}`));
    }
    parts.push(`\nPost-visit notes to process:\n${payload.notes}`);
    return parts.join('\n');
  }

  if (flow === 'call-capture') {
    const parts = [buildClientContext(payload.client)];
    parts.push(`\nCall with: ${payload.caller}`);
    parts.push('\nTranscript:');
    payload.transcript.forEach(line => {
      parts.push(`[${line.time}] ${line.speaker === 'GCM' ? 'Care Manager' : line.speaker}: ${line.text}`);
    });
    return parts.join('\n');
  }

  if (flow === 'intake') {
    const parts = [];
    if (payload.client) {
      parts.push(`Client: ${payload.client.name}, ${payload.client.age}, ${payload.client.city}`);
      parts.push(`Relation: ${payload.client.relation}`);
    }
    parts.push(`\nIntake notes:\n${payload.notes}`);
    return parts.join('\n');
  }

  return payload.notes || '';
}

// ============ MAIN GENERATE FUNCTION ============

window.patronaGenerate = async function(flow, payload) {
  const config = window.PATRONA_CONFIG;

  // realFlows only apply on localhost — production has no API proxy.
  const isLocal = ['localhost', '127.0.0.1'].includes(window.location.hostname);
  const useMock = !(isLocal && config.realFlows?.includes(flow)) && config.useMockData;
  if (useMock) {
    return null;
  }

  const systemPrompt = SYSTEM_PROMPTS[flow];
  const tool = TOOL_SCHEMAS[flow];
  const userMessage = buildUserMessage(flow, payload);

  if (!systemPrompt || !tool) {
    throw new Error(`Unknown flow: ${flow}`);
  }

  const requestBody = {
    model: 'claude-sonnet-4-6',
    max_tokens: 2048,
    system: systemPrompt,
    tools: [tool],
    tool_choice: { type: 'tool', name: tool.name },
    messages: [{ role: 'user', content: userMessage }],
  };

  const response = await fetch(config.apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const errBody = await response.text();
    throw new Error(`API error ${response.status}: ${errBody}`);
  }

  const data = await response.json();

  // Extract tool_use result
  const toolUse = data.content && data.content.find(c => c.type === 'tool_use');
  if (!toolUse || !toolUse.input) {
    throw new Error('No tool_use response received');
  }

  return toolUse.input;
};
