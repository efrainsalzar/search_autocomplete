require('dotenv').config();
const { Pool } = require('pg');

// Validar variables de entorno
const requiredEnvVars = ['DB_HOST', 'DB_PORT', 'DB_USER', 'DB_PASSWORD', 'DB_NAME'];
requiredEnvVars.forEach(env => {
  if (!process.env[env]) throw new Error(`Falta la variable de entorno: ${env}`);
});

// Configuración optimizada del pool
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Manejo de errores
pool.on('error', (err) => {
  console.error('Error en el pool de PostgreSQL:', err);
});

// Test de conexión al iniciar
(async () => {
  try {
    const client = await pool.connect();
    console.log('Conexión a PostgreSQL establecida');
    client.release();
  } catch (err) {
    console.error('No se pudo conectar a PostgreSQL:', err);
    process.exit(1);
  }
})();

module.exports = pool;