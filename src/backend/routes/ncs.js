const express = require('express');
const router = express.Router();
const pool = require('../database');
const ContaCorrente = require('../models/ContaCorrente'); // Importa o modelo da conta corrente
const NC = require('../models/NC');
const EmpenhoNC = require('../models/EmpenhoNC');

// Rota para listar todas as NCs
router.get('/', async (req, res) => {
  try {
    const ncs = await NC.findAll();

    // Para cada NC, calcular corretamente o `valor_empenhado` e `saldo`
    const resultado = await Promise.all(
      ncs.map(async (nc) => {
        const valorEmpenhadoRaw =
          (await EmpenhoNC.sum('valor_utilizado', {
            where: { id_nc: nc.id },
          })) || 0;

        // 🔹 Garantir que os valores sejam corretamente formatados para 2 casas decimais
        const valorEmpenhado = parseFloat(valorEmpenhadoRaw).toFixed(2);
        const saldoRaw =
          parseFloat(nc.valor_original) -
          (parseFloat(nc.valor_recolhido) + parseFloat(valorEmpenhado));
        const saldo = saldoRaw.toFixed(2);

        return {
          ...nc.toJSON(),
          valor_original: parseFloat(nc.valor_original).toFixed(2), // Mantém .00
          valor_recolhido: parseFloat(nc.valor_recolhido).toFixed(2), // Mantém .00
          valor_empenhado: valorEmpenhado, // Agora sempre com 2 casas decimais
          saldo: saldo, // Agora sempre com 2 casas decimais
        };
      })
    );

    res.json(resultado);
  } catch (error) {
    console.error('❌ Erro ao buscar NCs:', error);
    res
      .status(500)
      .json({ error: 'Erro ao buscar NCs', details: error.message });
  }
});

// Rota para criar uma nova NC
router.post('/', async (req, res) => {
  try {
    const {
      n_nc,
      id_conta_corrente,
      ug,
      ugr,
      data_nc,
      descricao,
      valor_original,
    } = req.body;

    // Verifica se a conta corrente existe
    const contaCorrenteExiste = await ContaCorrente.findByPk(id_conta_corrente);
    if (!contaCorrenteExiste) {
      return res.status(400).json({ error: 'Conta Corrente não encontrada.' });
    }

    // Cria a NC no banco
    const novaNC = await NC.create({
      n_nc,
      id_conta_corrente,
      ug,
      ugr,
      data_nc,
      descricao,
      valor_original,
    });

    res.status(201).json(novaNC); // Retorna o registro criado
  } catch (error) {
    console.error('❌ Erro ao criar NC:', error);
    res.status(500).json({ error: 'Erro no servidor', details: error.message });
  }
});

module.exports = router;
