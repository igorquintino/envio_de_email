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
      user: 'SEU_EMAIL@gmail.com',
      pass: 'SUA_SENHA_DE_APP', // Use senha de app, não a senha comum
    },
  });

  const mailOptions = {
    from: 'Igor <SEU_EMAIL@gmail.com>',
    to: email,
    subject: 'Seu Currículo Perfeito chegou!',
    html: `
      <h2>Opa! Aqui é o Igor da Quintino Coders</h2>
      <p>Aqui está o link para baixar seu currículo:</p>
      <a href="https://seulink.com/curriculo.pdf" target="_blank">Clique aqui para baixar</a>
      <br><br>
      <p>Se quiser melhorar seu foco e rotina, conheça o <strong>Planner Dev Express</strong>.</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'E-mail enviado com sucesso!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao enviar e-mail.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
