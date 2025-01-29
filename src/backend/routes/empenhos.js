const express = require('express');
const router = express.Router();
const NC = require('../models/NC');
const Empenho = require('../models/Empenho');
const EmpenhoNC = require('../models/EmpenhoNC');
const ContaCorrente = require('../models/ContaCorrente'); // Adicione esta linha

router.post('/', async (req, res) => {
  try {
    const { n_empenho, id_conta_corrente, ug, data_empenho, valor_total, ncs } =
      req.body;

    if (
      !n_empenho ||
      !id_conta_corrente ||
      !ug ||
      !data_empenho ||
      !valor_total ||
      !ncs ||
      !ncs.length
    ) {
      return res
        .status(400)
        .json({ error: 'Dados inválidos. Todos os campos são obrigatórios.' });
    }

    // Criar o empenho
    const novoEmpenho = await Empenho.create({
      n_empenho,
      id_conta_corrente,
      ug,
      data_empenho,
      valor_original: valor_total,
    });

    let totalUtilizado = 0;
    for (const nc of ncs) {
      if (!nc.n_nc || !nc.valor_utilizado) {
        return res
          .status(400)
          .json({
            error: 'Cada NC precisa ter um número (n_nc) e um valor utilizado.',
          });
      }

      const { n_nc, valor_utilizado } = nc; // Pegando `n_nc` corretamente

      // Buscar a NC pelo número (n_nc)
      const ncEncontrada = await NC.findOne({ where: { n_nc } });

      // Verificar se a NC foi encontrada e pertence à conta corrente
      if (!ncEncontrada) {
        return res
          .status(400)
          .json({ error: `NC ${n_nc} não foi encontrada.` });
      }
      if (ncEncontrada.id_conta_corrente !== id_conta_corrente) {
        return res
          .status(400)
          .json({
            error: `NC ${n_nc} não pertence à conta corrente selecionada.`,
          });
      }

      // Verificar saldo disponível
      const saldoDisponivel =
        ncEncontrada.valor_original -
        (ncEncontrada.valor_recolhido + ncEncontrada.valor_empenhado);
      if (valor_utilizado > saldoDisponivel) {
        return res
          .status(400)
          .json({ error: `Saldo insuficiente na NC ${ncEncontrada.n_nc}.` });
      }

      // Criar relacionamento na tabela empenho_ncs
      await EmpenhoNC.create({
        id_empenho: novoEmpenho.id,
        n_empenho: novoEmpenho.n_empenho,
        ug_empenho: novoEmpenho.ug,
        id_nc: ncEncontrada.id, // 🔹 Agora garantimos que pegamos o ID da NC
        n_nc: ncEncontrada.n_nc,
        valor_utilizado,
      });

      // Atualizar valor empenhado na NC
      await NC.update(
        { valor_empenhado: ncEncontrada.valor_empenhado + valor_utilizado },
        { where: { id: ncEncontrada.id } }
      );

      totalUtilizado += valor_utilizado;
    }

    // Verificar se o total empenhado não ultrapassa o valor total do empenho
    if (totalUtilizado > valor_total) {
      return res
        .status(400)
        .json({ error: 'O valor total utilizado excede o valor do empenho.' });
    }

    res.status(201).json({ message: 'Empenho criado com sucesso!' });
  } catch (error) {
    console.error('❌ Erro ao criar empenho:', error);
    res
      .status(500)
      .json({ error: 'Erro ao criar empenho', details: error.message });
  }
});

module.exports = router;
