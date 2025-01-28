const express = require('express');
const sequelize = require('./config/database');

const app = express();
const PORT = process.env.PORT || 3000;

// Testar conexão com o banco de dados
sequelize
  .authenticate()
  .then(() => console.log('✅ Conectado ao banco de dados com sucesso!'))
  .catch((err) => console.error('❌ Erro ao conectar ao banco de dados:', err));

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
