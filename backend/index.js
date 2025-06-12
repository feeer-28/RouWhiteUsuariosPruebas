const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./models');

app.use(cors());
app.use(express.json());

app.use('/api/rutas', require('./routes/rutas'));

db.sequelize.sync().then(() => {
  console.log('Base de datos sincronizada');
  app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
  });
});
