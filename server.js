// server.js
const express = require('express');

const app = express();

// CORS básico (permite qualquer origem)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

app.use(express.json());

// Link direto do Google Drive (download)
const DOWNLOAD_URL = 'https://drive.google.com/uc?export=download&id=15-_Blz44Xr-Nj4L-F4fVXikmVBpVnDVY';

// Regex simples pra e-mail (evita só lixo óbvio)
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

app.post('/enviar-email', (req, res) => {
  const { email } = req.body || {};

  if (!email || !emailRegex.test(email)) {
    return res.status(400).json({ error: 'E-mail inválido.' });
  }

  // Em vez de enviar e-mail, retornamos o link direto
  return res.status(200).json({ downloadUrl: DOWNLOAD_URL });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
