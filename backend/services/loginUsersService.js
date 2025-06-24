const { Usuario } = require('../models');
const bcrypt = require('bcrypt');


exports.loginConRol = async ({ correo, contraseña }, rolEsperado) => {
  console.log("Recibido en login:", correo, contraseña);

  if (!correo || !contraseña) {
    throw new Error('Correo y contraseña son obligatorios');
  }

  const usuario = await Usuario.findOne({ where: { correo } });
  if (!usuario) throw new Error('Correo no registrado');

  console.log("Hash guardado:", usuario.contraseña);

  if (usuario.rol !== rolEsperado) throw new Error('Rol incorrecto');

  const contrasenaValida = await bcrypt.compare(contraseña, usuario.contraseña);
  console.log("¿Contraseña válida?", contrasenaValida);

  if (!contrasenaValida) throw new Error('Contraseña incorrecta');

  return {
    mensaje: 'Login exitoso como ' + rolEsperado,
    usuario: {
      id: usuario.id,
      nombre: usuario.nombre,
      correo: usuario.correo,
      rol: usuario.rol
    }
  };
};
