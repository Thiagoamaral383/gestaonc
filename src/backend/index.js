const express = require('express');
const sequelize = require('./config/database'); // Importa a conexão com o banco de dados

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para permitir JSON no body das requisições
app.use(express.json());

// Sincronizar modelos sem recriar tabelas
sequelize
  .sync()
  .then(() => console.log('✅ Banco de dados sincronizado com sucesso!'))
  .catch((error) => console.error('❌ Erro ao sincronizar banco:', error));

// 📌 Adicionar as Rotas Aqui
const ncsRoutes = require('./routes/ncs'); // Importa as rotas das NCs
const empenhosRoutes = require('./routes/empenhos'); //Importa as rotas dos Empenhos
app.use('/ncs', ncsRoutes); // Usa as rotas das NCs
app.use('/empenhos', empenhosRoutes);
// Criar outras rotas no futuro (Empenhos, Movimentações, etc.)
// const empenhosRoutes = require("./routes/empenhos");
// app.use("/empenhos", empenhosRoutes);

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
