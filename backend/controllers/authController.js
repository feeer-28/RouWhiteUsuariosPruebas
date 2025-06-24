const AuthService = require('../services/registerUsersService');

exports.registerWithRole = async (req, res, rol) => {
  try {
    const resultado = await AuthService.registrarUsuario(req.body, rol);
    res.status(201).json({ mensaje: resultado });
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
};
