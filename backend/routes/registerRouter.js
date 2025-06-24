const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');

// Registro por rol (sin que el usuario lo elija)
router.post('/admin', (req, res) => AuthController.registerWithRole(req, res, 'administrador'));
router.post('/conductor', (req, res) => AuthController.registerWithRole(req, res, 'conductor'));
router.post('/despachador', (req, res) => AuthController.registerWithRole(req, res, 'despachador'));
router.post('/usuario', (req, res) => AuthController.registerWithRole(req, res, 'usuario'));

module.exports = router;
