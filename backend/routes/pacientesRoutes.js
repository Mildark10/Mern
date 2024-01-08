import express from 'express';
const router = express.Router();
import {agregarPaciente, obtenerPacientes,obtenerPaciente,actulizarPaciente,eliminarPaciente} from '../controllers/pacienteControllers.js';
import checkAuth from '../middleware/authMiddleware.js';

router.route('/')
    .post(checkAuth, agregarPaciente)
    .get(checkAuth,obtenerPacientes) ;

router.route('/:id')
    .get(checkAuth , obtenerPaciente)
    .put(checkAuth,actulizarPaciente)
    .delete(checkAuth,eliminarPaciente)

export default router;