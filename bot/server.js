const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/enviar-email', async (req, res) => {
  const { email } = req.body;

  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'E-mail inválido.' });
  }

  // Configura o serviço de e-mail (ex: Gmail)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'igorcarvalho2907@gmail.com',
      pass: 'huig vybf nsdz bqmy', // Use senha de app, não a senha comum
    },
  });

  const mailOptions = {
    from: 'Igor <SEU_EMAIL@gmail.com>',
    to: email,
    replyTo: 'igorcarvalho2907@gmail.com',
    subject: 'Seu Currículo Perfeito chegou!',
    html: `
  <div style="background-color: #0e0e0e; color: #fff; padding: 30px; font-family: Arial, sans-serif; line-height: 1.6;">
    <h2 style="color: #a855f7;">Seu Currículo Perfeito está aqui</h2>

    <p>Fala dev, tudo certo? Aqui está seu currículo gratuito:</p>
    <a href="https://docs.google.com/document/d/1vghl2xEi0bxohEVG7_Uf7wX-wDBBayDr/export?format=pdf
" style="display:inline-block; background:#a855f7; color:#fff; padding:12px 24px; text-decoration:none; border-radius:6px; font-weight:bold; margin: 16px 0;">
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
      <img src="https://seulink.com/print1.png" width="180" style="border-radius: 8px;">
      <img src="https://seulink.com/print2.png" width="180" style="border-radius: 8px;">
      <img src="img 1.png" width="180" style="border-radius: 8px;">
      <img src="img 2.png" width="180" style="border-radius: 8px;">
    </div>

    <a href="https://seulink.com/planner" style="display:inline-block; background:#a855f7; color:#fff; padding:14px 32px; text-decoration:none; border-radius:8px; font-weight:bold; font-size:16px; margin-top: 10px;">
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
