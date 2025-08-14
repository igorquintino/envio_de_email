// server.js
const express = require('express');
const path = require('path');

const app = express();

// CORS (para permitir que outras origens chamem a API, se precisar)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

app.use(express.json());

// === Arquivos estáticos ===
// Coloque index2.html, styles.css, logo4.png etc. dentro de /public
const PUBLIC_DIR = path.join(__dirname, 'public');
app.use(express.static(PUBLIC_DIR));

// Servir a página na raiz (usa o seu index2.html)
app.get('/', (_req, res) => {
  res.sendFile(path.join(PUBLIC_DIR, 'index2.html'));
});

// === API ===
const DOWNLOAD_URL = 'https://drive.google.com/uc?export=download&id=15-_Blz44Xr-Nj4L-F4fVXikmVBpVnDVY';
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

app.post('/enviar-email', (req, res) => {
  const { email } = req.body || {};
  if (!email || !emailRegex.test(email)) {
    return res.status(400).json({ error: 'E-mail inválido.' });
  }
  return res.status(200).json({ downloadUrl: DOWNLOAD_URL });
});

// Redireciona direto pro currículo (opcional)
app.get('/curriculo', (_req, res) => {
  res.redirect(302, DOWNLOAD_URL);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
