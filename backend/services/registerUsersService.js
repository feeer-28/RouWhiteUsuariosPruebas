const { Usuario } = require('../models');
const bcrypt = require('bcrypt');

function validarCorreo(correo) {
  return /^[a-zA-Z0-9._%+-]+@(gmail|hotmail|outlook)\.com$/.test(correo);
}

function validarContrasena(contraseña) {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/.test(contraseña);
}

function validartelefono(telefono) {
  return /^[0-9]{10}$/.test(telefono);
}

exports.registrarUsuario = async (data, rol) => {
  const { nombre, correo, contraseña, telefono } = data;

  if (!nombre || !correo || !contraseña || !telefono) {
    throw new Error('Todos los campos son obligatorios');
  }

  if (!validarCorreo(correo)) {
    throw new Error('Correo inválido. Solo se aceptan gmail, hotmail u outlook');
  }

  if (!validarContrasena(contraseña)) {
    throw new Error('Contraseña débil. Debe tener mayúscula, minúscula, número y mínimo 8 caracteres');
  }

  if (!validartelefono(telefono)) {
    throw new Error('El número de telefono debe tener 10 dígitos');
  }

  const yaExiste = await Usuario.findOne({ where: { correo } });
  if (yaExiste) {
    throw new Error('Este correo ya está registrado');
  }

  const contrasenaHash = await bcrypt.hash(contraseña, 10);

  await Usuario.create({
    nombre,
    correo,
    contraseña: contrasenaHash,
    telefono,
    rol // se asigna automáticamente desde la ruta
  });

  return 'Usuario registrado exitosamente como ' + rol;
};
