const express = require('express');
const cors = require('cors');
const doctoresRoutes = require('./routes/doctores_route');
const pool = require('./config/connection');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Conexion 
app.set('db',pool);

// Rutas
app.use('/api/doctores', doctoresRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ 
    status: 'API funcionando',
    db_status: pool ? 'Conectado' : 'Error en DB'
  });
});

module.exports = app;