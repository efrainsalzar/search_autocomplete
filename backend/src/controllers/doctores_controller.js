const pool = require('../config/connection');
const Doctor = require('../models/doctores_model');

// Obtener todos los doctores
async function getAllDoctores(req, res) {
  try {
    const result = await pool.query('SELECT * FROM doctores');
    const doctores = result.rows.map(row => new Doctor(row));
    res.json(doctores);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener doctores' });
  }
}
// Buscar doctores dinámicamente
async function searchDoctores(req, res) {
  const { nombre, apellido, especialidad } = req.query;

  if (
    (!nombre || nombre.length < 2) &&
    (!apellido || apellido.length < 2) &&
    (!especialidad || especialidad.length < 2)
  ) {
    return res.status(400).json({ 
      error: 'Debes proporcionar al menos un término con 2+ caracteres' 
    });
  }

  let query = `
    SELECT id, nombre, apellido, especialidad 
    FROM doctores
  `;
  const conditions = [];
  const params = [];

  if (nombre && nombre.length >= 2) {
    conditions.push(` unaccent(nombre) ILIKE unaccent($${params.length + 1})`);
    params.push(`${nombre}%`);
  }

  if (apellido && apellido.length >= 2) {
    conditions.push(`apellido ILIKE $${params.length + 1}`);
    params.push(`${apellido}%`);
  }

  if (especialidad && especialidad.length >= 2) {
    conditions.push(`especialidad ILIKE $${params.length + 1}`);
    params.push(`${especialidad}%`);
  }

  if (conditions.length > 0) {
    query += ' WHERE ' + conditions.join(' AND ');
  }

  query += ' LIMIT 10';

  try {
    const result = await pool.query(query, params);
    res.json(result.rows.map(row => new Doctor(row)));
  } catch (error) {
    console.error('Error en autocompletado:', {
      message: error.message,
      query,
      params
    });
    res.status(500).json({ error: 'Error al buscar doctores' });
  }
}



module.exports = {
  getAllDoctores,
  searchDoctores
};







