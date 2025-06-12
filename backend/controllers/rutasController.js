// controllers/rutasController.js
const db = require('../models');

exports.obtenerRutas = async (req, res) => {
  try {
    const empresas = await db.Empresa.findAll({
      include: {
        model: db.Ruta,
        where: { vigente: true },
        required: false
      }
    });

    res.json(empresas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener las rutas' });
  }
};
