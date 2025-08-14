// server.js
const express = require('express');

const app = express();

// CORS (liberado p/ facilitar integração do HTML hospedado em outro domínio)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

app.use(express.json());

// Link direto do Google Drive (download)
const DOWNLOAD_URL = 'https://drive.google.com/uc?export=download&id=15-_Blz44Xr-Nj4L-F4fVXikmVBpVnDVY';

// Rota de saúde (para não dar "Não é possível OBTER /")
app.get('/', (req, res) => {
  res.send('API online. Use POST /enviar-email ou GET /curriculo');
});

// Opcional: rota que redireciona direto pro arquivo
app.get('/curriculo', (req, res) => {
  return res.redirect(302, DOWNLOAD_URL);
});

// Regex simples pra e-mail
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Endpoint que valida e devolve o link de download
app.post('/enviar-email', (req, res) => {
  const { email } = req.body || {};
  if (!email || !emailRegex.test(email)) {
    return res.status(400).json({ error: 'E-mail inválido.' });
  }
  return res.status(200).json({ downloadUrl: DOWNLOAD_URL });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
