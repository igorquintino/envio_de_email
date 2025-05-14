✅ Aqui está o README atualizado (sem CSV e com sugestão de expansão futura):
📬 Currículo Perfeito + Oferta do Planner – Envio Automático por E-mail
Esse projeto é uma aplicação Node.js com Express que envia automaticamente o Currículo Perfeito para programadores iniciantes, e junto oferece o Planner Dev Express com cupom de desconto exclusivo.

🚀 Funcionalidades
Recebe o e-mail do usuário via formulário front-end

Valida o e-mail e envia o conteúdo personalizado via Gmail

E-mail em HTML com link direto para o currículo (PDF) e prints do planner

Pronto para rodar localmente ou em produção (Highway, Railway, Render...)

🛠️ Tecnologias usadas
Node.js

Express.js

Nodemailer

dotenv

📁 Estrutura do Projeto
pgsql
Copiar
Editar
📦 raiz/
├── server.js
├── .env
└── public/
    └── index.html (opcional)
✅ Variáveis de Ambiente (.env)
Crie um arquivo .env com:

ini
Copiar
Editar
EMAIL_USER=seuemail@gmail.com
EMAIL_PASS=suasenhadeapp
⚠️ Use uma senha de aplicativo do Gmail.
Gere em: https://myaccount.google.com/apppasswords (após ativar verificação em duas etapas)

📦 Instalação
bash
Copiar
Editar
npm install
▶️ Executar localmente
bash
Copiar
Editar
node server.js
Servidor rodando em: http://localhost:3000

🌐 Endpoint principal
POST /enviar-email
Recebe o e-mail do usuário e envia o currículo com HTML personalizado.

json
Copiar
Editar
{
  "email": "exemplo@gmail.com"
}
📈 Expansões recomendadas
Integração com Google Sheets ou Notion para registrar os e-mails recebidos

Conexão com banco de dados (PostgreSQL ou MongoDB) para armazenamento durável

Integração com Zapier para automações de marketing

Criação de uma sequência de follow-up por e-mail

👨‍💻 Autor
Igor Quintino
Criador da Quintino Coders
