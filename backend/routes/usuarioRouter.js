const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', usuarioController.crearUsuario);
router.get('/', authMiddleware,usuarioController.listarUsuarios);
router.get('/:id', authMiddleware,usuarioController.obtenerUsuarioPorId);
router.put('/:id', authMiddleware,usuarioController.actualizarUsuario);
router.delete('/:id', authMiddleware,usuarioController.eliminarUsuario);
router.post('/login', usuarioController.login);


<<<<<<< HEAD
module.exports = router;
=======
module.exports = router;
>>>>>>> origin/fernanda
