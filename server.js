const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');
require('dotenv').config();

const app = express();

// Força CORS manualmente para testes (aceita qualquer origem)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  next();
});

// Serve arquivos estáticos da pasta /public
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());

app.post('/enviar-email', async (req, res) => {
  const { email } = req.body;

  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'E-mail inválido.' });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: 'Igor <' + process.env.EMAIL_USER + '>',
    to: email,
    replyTo: 'igorcarvalho2907@gmail.com',
    subject: 'Seu Currículo Perfeito chegou!',
    html: `
      <div style="background-color: #0e0e0e; color: #fff; padding: 30px; font-family: Arial, sans-serif; line-height: 1.6;">
        <h2 style="color: #a855f7;">Seu Currículo Perfeito está aqui</h2>

        <p>Fala dev, tudo certo? Aqui está seu currículo gratuito:</p>
        <a href="https://docs.google.com/document/d/1vghl2xEi0bxohEVG7_Uf7wX-wDBBayDr/export?format=pdf"
           style="display:inline-block; background:#a855f7; color:#fff; padding:12px 24px; text-decoration:none; border-radius:6px; font-weight:bold; margin: 16px 0;">
          >> Baixar Currículo (PDF)
        </a>

        <hr style="border: 1px solid #333; margin: 32px 0;">

        <p>Agora me responde com sinceridade:</p>
        <p><strong>Você estuda todos os dias, mas sente que ainda não saiu do lugar?</strong></p>

        <p>Aproveitando que você está nessa fase, deixa eu te mostrar algo que pode destravar sua rotina como dev.</p>
        
        <p>Eu criei o <strong>Planner Dev Express</strong>, um planner feito especialmente pra quem está começando na programação.</p>

        <p>Ele inclui:</p>
        <ul style="color:#ccc;">
          <li>✅ Ideias de projetos</li>
          <li>✅ Roadmaps para estudar com direção</li>
          <li>✅ Colas de código para lembrar o que importa</li>
          <li>✅ Sites atualizados com vagas e oportunidades</li>
        </ul>

        <p>Dá uma olhada em como ele é por dentro:</p>

        <div style="display: flex; flex-wrap: wrap; gap: 10px; justify-content: center; margin: 20px 0;">
          <img src="https://i.imgur.com/U9nzRBR.png" width="280" style="border-radius: 8px;">
          <img src="https://i.imgur.com/r2EE0UL.jpeg" width="280" style="border-radius: 8px;">
          <img src="https://i.imgur.com/4HMyPLV.jpeg" width="280" style="border-radius: 8px;">
          <img src="https://i.imgur.com/klc8qM2.jpeg" width="280" style="border-radius: 8px;">
        </div>

        <a href="https://seulink.com/planner"
           style="display:inline-block; background:#a855f7; color:#fff; padding:14px 32px; text-decoration:none; border-radius:8px; font-weight:bold; font-size:16px; margin-top: 10px;">
          >> Quero conhecer o Planner Dev Express
        </a>

        <br><br>
        <p style="color: #aaa;">Tamo junto nessa jornada,<br>Igor | Quintino Coders</p>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Currículo enviado com sucesso!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao enviar e-mail.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
