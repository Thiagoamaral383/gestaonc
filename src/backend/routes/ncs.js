const express = require('express');
const router = express.Router();
const pool = require('../database');

// Rota para listar todas as NCs
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM ncs');
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Rota para criar uma nova NC
router.post('/', async (req, res) => {
  const { ug, ugr, data_nc, n_nc, pi, nd, descricao, responsaveis, valor } =
    req.body;
  try {
    const result = await pool.query(
      'INSERT INTO ncs (ug, ugr, data_nc, n_nc, pi, nd, descricao, responsaveis, valor) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
      [ug, ugr, data_nc, n_nc, pi, nd, descricao, responsaveis, valor]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
