'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    static associate(models) {
      //asociar
    }
  }

  Usuario.init({
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    correo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    contraseña: {
      type: DataTypes.STRING,
      allowNull: false
    },
    telefono: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            is: /^[0-9]+$/i ,// Validación solo numbers
            is: /^\d{10}$/ // validacion 10 numbers

        }
    },
    rol: {
      type: DataTypes.ENUM('admin', 'despachador', 'conductor', 'usuario'),
      defaultValue: 'usuario',
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Usuario',
    tableName: 'Usuarios',
    hooks: {
      beforeCreate: async (usuario) => {
        usuario.contraseña = await bcrypt.hash(usuario.contraseña, 10);
      },
      beforeUpdate: async (usuario) => {
        if (usuario.changed('contraseña')) {
          usuario.contraseña = await bcrypt.hash(usuario.contraseña, 10);
        }
      }
    }
  });

  return Usuario;
<<<<<<< HEAD
};
=======
};
>>>>>>> origin/fernanda
