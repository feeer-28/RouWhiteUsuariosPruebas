// routes/rutas.js
const express = require('express');
const router = express.Router();
const rutasController = require('../controllers/rutasController');

router.get('/', rutasController.obtenerRutas);

module.exports = router;
