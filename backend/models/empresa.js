// models/empresa.js
module.exports = (sequelize, DataTypes) => {
  const Empresa = sequelize.define('Empresa', {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    timestamps: false //  Esto desactiva createdAt y updatedAt
  });

  Empresa.associate = (models) => {
    Empresa.hasMany(models.Ruta, { foreignKey: 'empresaId' });
  };

  return Empresa;
};
