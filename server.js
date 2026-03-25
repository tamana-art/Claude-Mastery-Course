const express = require('express');
const Anthropic = require('@anthropic-ai/sdk');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(express.json({ limit: '1mb' }));
app.use(express.static(path.join(__dirname)));

// ═══════════════════════════════════════
//  USAGE TRACKING
// ═══════════════════════════════════════

const USAGE_FILE = path.join(__dirname, 'usage.json');

function loadUsage() {
  try {
    return JSON.parse(fs.readFileSync(USAGE_FILE, 'utf8'));
  } catch {
    return { totalInputTokens: 0, totalOutputTokens: 0, totalRequests: 0, estimatedCost: 0, byUser: {}, history: [] };
  }
}

function saveUsage(usage) {
  fs.writeFileSync(USAGE_FILE, JSON.stringify(usage, null, 2));
}

// Sonnet pricing: $3/M input, $15/M output
function estimateCost(inputTokens, outputTokens) {
  return (inputTokens / 1_000_000) * 3 + (outputTokens / 1_000_000) * 15;
}

app.get('/api/usage', (req, res) => {
  res.json(loadUsage());
});

app.get('/api/has-key', (req, res) => {
  res.json({ hasKey: !!process.env.ANTHROPIC_API_KEY });
});

app.get('/api/config', (req, res) => {
  res.json({
    hasKey: !!process.env.ANTHROPIC_API_KEY,
    trackingWebhook: process.env.TRACKING_WEBHOOK || ''
  });
});

app.post('/api/chat', async (req, res) => {
  const { messages, system, apiKey, userId } = req.body;
  const key = apiKey || process.env.ANTHROPIC_API_KEY;

  if (!key) {
    return res.status(401).json({ error: 'No API key provided' });
  }

  const client = new Anthropic({ apiKey: key });

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  try {
    const stream = await client.messages.stream({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2048,
      system,
      messages,
    });

    for await (const event of stream) {
      if (event.type === 'content_block_delta' && event.delta?.text) {
        res.write(`data: ${JSON.stringify({ text: event.delta.text })}\n\n`);
      }
    }

    // Track usage from the final message
    const finalMessage = await stream.finalMessage();
    if (finalMessage?.usage) {
      const usage = loadUsage();
      const inp = finalMessage.usage.input_tokens || 0;
      const out = finalMessage.usage.output_tokens || 0;
      const cost = estimateCost(inp, out);

      usage.totalInputTokens += inp;
      usage.totalOutputTokens += out;
      usage.totalRequests += 1;
      usage.estimatedCost += cost;

      // Track per user
      const user = userId || 'unknown';
      if (!usage.byUser[user]) usage.byUser[user] = { inputTokens: 0, outputTokens: 0, requests: 0, cost: 0 };
      usage.byUser[user].inputTokens += inp;
      usage.byUser[user].outputTokens += out;
      usage.byUser[user].requests += 1;
      usage.byUser[user].cost += cost;

      // Keep last 100 entries in history
      usage.history.push({ timestamp: new Date().toISOString(), user, inputTokens: inp, outputTokens: out, cost: cost.toFixed(4) });
      if (usage.history.length > 100) usage.history = usage.history.slice(-100);

      saveUsage(usage);
    }

    res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
    res.end();
  } catch (err) {
    const msg = err?.message || 'API request failed';
    if (!res.headersSent) {
      res.status(500).json({ error: msg });
    } else {
      res.write(`data: ${JSON.stringify({ error: msg })}\n\n`);
      res.end();
    }
  }
});

// ═══════════════════════════════════════
//  ADMIN — Generate user links & setup
// ═══════════════════════════════════════

app.get('/admin', (req, res) => {
  res.send(`<!DOCTYPE html>
<html lang="en"><head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Claude Mastery — Admin</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'DM Sans', system-ui, sans-serif; background: #0a0a0f; color: #e8e6f0; padding: 40px; max-width: 700px; margin: 0 auto; }
  h1 { font-size: 28px; margin-bottom: 8px; }
  .sub { color: #9896a8; font-size: 14px; margin-bottom: 32px; }
  .section { background: #16162a; border: 1px solid rgba(255,255,255,0.08); border-radius: 14px; padding: 24px; margin-bottom: 24px; }
  .section h2 { font-size: 16px; color: #d4a053; margin-bottom: 16px; }
  label { display: block; font-size: 13px; color: #9896a8; margin-bottom: 6px; }
  input, textarea { width: 100%; padding: 10px 14px; background: #0f0f18; border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; color: #e8e6f0; font-size: 14px; margin-bottom: 14px; font-family: monospace; }
  button { padding: 10px 20px; background: #d4a053; border: none; border-radius: 8px; color: #0a0a0f; font-weight: 600; cursor: pointer; font-size: 14px; }
  button:hover { opacity: 0.9; }
  .link-list { margin-top: 12px; }
  .link-item { background: #0f0f18; border: 1px solid rgba(255,255,255,0.06); border-radius: 8px; padding: 12px 16px; margin-bottom: 8px; display: flex; justify-content: space-between; align-items: center; }
  .link-url { font-family: monospace; font-size: 13px; color: #d4a053; word-break: break-all; }
  .link-user { font-size: 14px; font-weight: 600; margin-bottom: 4px; }
  .copy-btn { padding: 6px 14px; font-size: 12px; background: rgba(212,160,83,0.15); color: #d4a053; border: 1px solid rgba(212,160,83,0.3); border-radius: 6px; cursor: pointer; flex-shrink: 0; margin-left: 12px; }
  .copy-btn:hover { background: rgba(212,160,83,0.25); }
  .success { color: #4ade80; font-size: 13px; margin-top: 8px; display: none; }
  .step { background: rgba(212,160,83,0.06); border-left: 3px solid #d4a053; padding: 12px 16px; border-radius: 0 8px 8px 0; margin-bottom: 12px; font-size: 13px; color: #9896a8; line-height: 1.6; }
  .step strong { color: #e8e6f0; }
  a { color: #d4a053; }
</style>
</head><body>
<h1>Claude Mastery — Admin</h1>
<p class="sub">Generate unique links, set up progress tracking</p>

<div class="section">
  <h2>Step 1: Set Up Google Sheet Tracking</h2>
  <div class="step"><strong>1.</strong> Open your Google Sheet: <a href="https://docs.google.com/spreadsheets/d/1zL1yn7VVrRbZV_8GFmO9cUGxU1A1eEA8B_cVQxsK9hE" target="_blank">Claude Mastery — Progress Tracker</a></div>
  <div class="step"><strong>2.</strong> Go to <strong>Extensions → Apps Script</strong></div>
  <div class="step"><strong>3.</strong> Delete any code there and paste the contents of <code>apps-script.js</code> from the course folder</div>
  <div class="step"><strong>4.</strong> Click <strong>Deploy → New Deployment</strong> → Type: Web app → Execute as: Me → Access: Anyone → Deploy</div>
  <div class="step"><strong>5.</strong> Copy the deployment URL and paste it below:</div>
  <label>Google Apps Script Webhook URL</label>
  <input type="text" id="webhook-url" placeholder="https://script.google.com/macros/s/...../exec">
  <button onclick="saveWebhook()">Save Webhook URL</button>
  <div class="success" id="webhook-success">Saved! The course will now track progress to your Google Sheet.</div>
</div>

<div class="section">
  <h2>Step 2: Set Shared API Key</h2>
  <p style="font-size:13px; color:#9896a8; margin-bottom:14px;">Enter an API key here and it'll be baked into the course — users won't need to enter one themselves.</p>
  <label>Anthropic API Key</label>
  <input type="password" id="shared-api-key" placeholder="sk-ant-...">
  <button onclick="saveApiKey()">Save API Key</button>
  <div class="success" id="apikey-success">Saved! Users will skip the API key prompt.</div>
</div>

<div class="section">
  <h2>Step 3: Generate User Links</h2>
  <p style="font-size:13px; color:#9896a8; margin-bottom:14px;">Create a unique link for each person taking the course. Their progress will show up in your Google Sheet.</p>
  <label>Name (e.g., ajmal, victoria)</label>
  <input type="text" id="user-name" placeholder="ajmal">
  <button onclick="generateLink()">Generate Link</button>
  <div class="link-list" id="link-list"></div>
</div>

<div class="section">
  <h2>Generated Links</h2>
  <div id="all-links"><p style="color:#5e5c6e; font-size:13px;">No links generated yet.</p></div>
</div>

<div class="section">
  <h2>API Usage &amp; Costs</h2>
  <p style="font-size:13px; color:#9896a8; margin-bottom:14px;">Live usage tracking for your API key. Updates every time someone sends a message.</p>
  <div id="usage-display"><p style="color:#5e5c6e; font-size:13px;">Loading...</p></div>
  <button onclick="loadUsage()" style="margin-top:12px;">Refresh Usage</button>
</div>

<script>
  // Load saved links
  const saved = JSON.parse(localStorage.getItem('cm-admin-links') || '[]');
  renderLinks();

  function saveWebhook() {
    const url = document.getElementById('webhook-url').value.trim();
    if (!url) return;
    localStorage.setItem('cm-tracking-webhook', url);
    document.getElementById('webhook-success').style.display = 'block';
  }

  function saveApiKey() {
    const key = document.getElementById('shared-api-key').value.trim();
    if (!key || !key.startsWith('sk-')) { alert('Enter a valid API key starting with sk-'); return; }
    localStorage.setItem('cm-shared-api-key', key);
    document.getElementById('apikey-success').style.display = 'block';
  }

  function generateLink() {
    const name = document.getElementById('user-name').value.trim().toLowerCase().replace(/[^a-z0-9]/g, '');
    if (!name) return;
    const id = name + '-' + Math.random().toString(36).substring(2, 8);
    const baseUrl = window.location.origin;
    const link = baseUrl + '?user=' + id;
    saved.push({ name, id, link, created: new Date().toLocaleDateString() });
    localStorage.setItem('cm-admin-links', JSON.stringify(saved));
    document.getElementById('user-name').value = '';
    renderLinks();
  }

  function renderLinks() {
    const el = document.getElementById('all-links');
    if (saved.length === 0) {
      el.innerHTML = '<p style="color:#5e5c6e; font-size:13px;">No links generated yet.</p>';
      return;
    }
    el.innerHTML = saved.map((l, i) => \`
      <div class="link-item">
        <div>
          <div class="link-user">\${l.name.charAt(0).toUpperCase() + l.name.slice(1)}</div>
          <div class="link-url">\${l.link}</div>
        </div>
        <button class="copy-btn" onclick="copyLink(\${i})">Copy</button>
      </div>
    \`).join('');
  }

  function copyLink(i) {
    navigator.clipboard.writeText(saved[i].link);
    const btns = document.querySelectorAll('.copy-btn');
    btns[i].textContent = 'Copied!';
    setTimeout(() => btns[i].textContent = 'Copy', 2000);
  }

  // Load API usage
  async function loadUsage() {
    try {
      const res = await fetch('/api/usage');
      const data = await res.json();
      const el = document.getElementById('usage-display');

      const totalCost = (data.estimatedCost || 0).toFixed(4);
      const users = Object.entries(data.byUser || {});

      el.innerHTML = \`
        <div style="display:grid; grid-template-columns:repeat(3,1fr); gap:12px; margin-bottom:16px;">
          <div style="background:#0f0f18; border:1px solid rgba(255,255,255,0.06); border-radius:8px; padding:14px; text-align:center;">
            <div style="font-size:24px; font-weight:700; color:#d4a053;">\${data.totalRequests || 0}</div>
            <div style="font-size:11px; color:#9896a8; margin-top:4px;">Total Messages</div>
          </div>
          <div style="background:#0f0f18; border:1px solid rgba(255,255,255,0.06); border-radius:8px; padding:14px; text-align:center;">
            <div style="font-size:24px; font-weight:700; color:#4ade80;">$\${totalCost}</div>
            <div style="font-size:11px; color:#9896a8; margin-top:4px;">Estimated Cost</div>
          </div>
          <div style="background:#0f0f18; border:1px solid rgba(255,255,255,0.06); border-radius:8px; padding:14px; text-align:center;">
            <div style="font-size:24px; font-weight:700; color:#67e8f9;">\${((data.totalInputTokens || 0) + (data.totalOutputTokens || 0)).toLocaleString()}</div>
            <div style="font-size:11px; color:#9896a8; margin-top:4px;">Total Tokens</div>
          </div>
        </div>
        \${users.length > 0 ? \`
          <div style="font-size:13px; color:#9896a8; margin-bottom:8px; font-weight:600;">Per User</div>
          \${users.map(([name, u]) => \`
            <div class="link-item" style="flex-direction:column; align-items:flex-start; gap:6px;">
              <div style="display:flex; justify-content:space-between; width:100%;">
                <span class="link-user">\${name}</span>
                <span style="color:#4ade80; font-family:monospace; font-size:13px;">$\${(u.cost || 0).toFixed(4)}</span>
              </div>
              <div style="font-size:12px; color:#5e5c6e;">\${u.requests} messages · \${(u.inputTokens + u.outputTokens).toLocaleString()} tokens</div>
            </div>
          \`).join('')}
        \` : '<p style="color:#5e5c6e; font-size:13px;">No usage recorded yet.</p>'}
      \`;
    } catch (err) {
      document.getElementById('usage-display').innerHTML = '<p style="color:#f87171; font-size:13px;">Could not load usage data. Make sure the server is running.</p>';
    }
  }
  loadUsage();

  // Pre-fill saved values
  const existingWebhook = localStorage.getItem('cm-tracking-webhook');
  if (existingWebhook) {
    document.getElementById('webhook-url').value = existingWebhook;
    document.getElementById('webhook-success').style.display = 'block';
    document.getElementById('webhook-success').textContent = 'Webhook is configured and active.';
  }
  const existingKey = localStorage.getItem('cm-shared-api-key');
  if (existingKey) {
    document.getElementById('shared-api-key').value = existingKey;
    document.getElementById('apikey-success').style.display = 'block';
    document.getElementById('apikey-success').textContent = 'API key is set. Users will skip the prompt.';
  }
</script>
</body></html>`);
});

const PORT = process.env.PORT || 3456;
app.listen(PORT, () => {
  console.log(`\n  Claude Mastery Course`);
  console.log(`  ─────────────────────`);
  console.log(`  Running at: http://localhost:${PORT}`);
  console.log(`  Admin panel: http://localhost:${PORT}/admin\n`);
});
