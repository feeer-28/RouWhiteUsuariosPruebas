// models/ruta.js
module.exports = (sequelize, DataTypes) => {
  const Ruta = sequelize.define('Ruta', {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    vigente: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    timestamps: false
  });

  Ruta.associate = (models) => {
    Ruta.belongsTo(models.Empresa, { foreignKey: 'empresaId' });
  };

  return Ruta;
};
