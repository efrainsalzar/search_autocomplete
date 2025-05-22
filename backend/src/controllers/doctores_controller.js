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
  // Validación: al menos un campo debe tener al menos 2 caracteres
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
    WHERE 1=1
  `;
  const params = [];
  let paramIndex = 1;

  if (nombre && nombre.length >= 2) {
    query += ` AND nombre ILIKE $${paramIndex++}`;
    params.push(`${nombre}%`); // Búsqueda desde el inicio (mejor para autocompletado)
  }

  if (apellido && apellido.length >= 2) {
    query += ` AND apellido ILIKE $${paramIndex++}`;
    params.push(`${apellido}%`);
  }

  if (especialidad && especialidad.length >= 2) {
    query += ` AND especialidad ILIKE $${paramIndex++}`;
    params.push(`${especialidad}%`);
  }

  query += ` LIMIT 10`; // Limita resultados para autocompletado

  try {
    const result = await pool.query(query, params);
    res.json(result.rows.map(row => new Doctor(row)));
  } catch (error) {
    console.error('Error en autocompletado:', error);
    res.status(500).json({ error: 'Error al buscar doctores' });
  }
}

/*// -------------------------
// Obtener un doctor por ID
async function getDoctorById(req, res) {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM doctores WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Doctor no encontrado' });
    }
    res.json(new Doctor(result.rows[0]));
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el doctor' });
  }
}

// Crear un nuevo doctor
async function createDoctor(req, res) {
  const {
    nombre,
    apellido,
    especialidad,
    telefono,
    email,
    fecha_nacimiento,
    fecha_contratacion,
    activo,
    salario
  } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO doctores 
        (nombre, apellido, especialidad, telefono, email, fecha_nacimiento, fecha_contratacion, activo, salario)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
       RETURNING *`,
      [
        nombre,
        apellido,
        especialidad,
        telefono,
        email,
        fecha_nacimiento,
        fecha_contratacion,
        activo,
        salario
      ]
    );
    res.status(201).json(new Doctor(result.rows[0]));
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el doctor' });
  }
}

// Actualizar un doctor
async function updateDoctor(req, res) {
  const { id } = req.params;
  const {
    nombre,
    apellido,
    especialidad,
    telefono,
    email,
    fecha_nacimiento,
    fecha_contratacion,
    activo,
    salario
  } = req.body;

  try {
    const result = await pool.query(
      `UPDATE doctores SET
        nombre = $1,
        apellido = $2,
        especialidad = $3,
        telefono = $4,
        email = $5,
        fecha_nacimiento = $6,
        fecha_contratacion = $7,
        activo = $8,
        salario = $9
       WHERE id = $10
       RETURNING *`,
      [
        nombre,
        apellido,
        especialidad,
        telefono,
        email,
        fecha_nacimiento,
        fecha_contratacion,
        activo,
        salario,
        id
      ]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Doctor no encontrado' });
    }
    res.json(new Doctor(result.rows[0]));
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el doctor' });
  }
}

// Eliminar un doctor
async function deleteDoctor(req, res) {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM doctores WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Doctor no encontrado' });
    }
    res.json({ mensaje: 'Doctor eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el doctor' });
  }
}*/

module.exports = {
  getAllDoctores,
  searchDoctores

  /*getDoctorById,
  createDoctor,
  updateDoctor,
  deleteDoctor,*/
};







