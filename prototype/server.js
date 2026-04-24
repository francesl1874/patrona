// server.js — Local dev server + Claude API proxy
// Usage: ANTHROPIC_API_KEY=sk-... node server.js
// Serves static files on http://localhost:8080 and proxies /api/generate to Anthropic

const http = require('http');
const fs = require('fs');
const path = require('path');
const https = require('https');

const PORT = 8080;
const API_KEY = process.env.ANTHROPIC_API_KEY || '';

const MIME = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.jsx': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
};

const server = http.createServer((req, res) => {
  // CORS headers for all responses
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // API proxy endpoint
  if (req.method === 'POST' && req.url === '/api/generate') {
    if (!API_KEY) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'ANTHROPIC_API_KEY not set. Start server with: ANTHROPIC_API_KEY=sk-... node server.js' }));
      return;
    }

    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      let payload;
      try {
        payload = JSON.parse(body);
      } catch (e) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid JSON' }));
        return;
      }

      const postData = JSON.stringify(payload);
      const options = {
        hostname: 'api.anthropic.com',
        path: '/v1/messages',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': API_KEY,
          'anthropic-version': '2023-06-01',
          'Content-Length': Buffer.byteLength(postData),
        },
      };

      const proxyReq = https.request(options, (proxyRes) => {
        res.writeHead(proxyRes.statusCode, { 'Content-Type': 'application/json' });
        proxyRes.pipe(res);
      });

      proxyReq.on('error', (e) => {
        res.writeHead(502, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Proxy error: ' + e.message }));
      });

      proxyReq.write(postData);
      proxyReq.end();
    });
    return;
  }

  // Static file serving
  let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);
  const ext = path.extname(filePath);
  const contentType = MIME[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('Not found');
      return;
    }
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`Patrona dev server running at http://localhost:${PORT}`);
  if (API_KEY) {
    console.log('Claude API proxy active at /api/generate');
  } else {
    console.log('No ANTHROPIC_API_KEY set — AI generation will use mock data');
    console.log('To enable: ANTHROPIC_API_KEY=sk-... node server.js');
  }
});
