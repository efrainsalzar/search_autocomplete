const express = require('express');
const router = express.Router();
const doctoresController = require('../controllers/doctores_controller');

router.get('/', doctoresController.getAllDoctores); // Obtener todos los doctores
router.get('/buscar', doctoresController.searchDoctores); // Ruta de búsqueda dinámica



/*
router.get('/buscar_por_id/:id', doctoresController.getDoctorById); // Obtener un doctor por ID
router.post('/crear_doctor', doctoresController.createDoctor);
router.put('/actualizar/:id', doctoresController.updateDoctor);
router.delete('/borrar/:id', doctoresController.deleteDoctor);
*/

module.exports = router;