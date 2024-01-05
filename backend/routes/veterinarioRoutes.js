import express from "express";
const router = express.Router();

import {registrar , perfil , confirmar} from '../controllers/veterinarioControllers.js'

router.post("/", registrar); //envia datos al servidor

router.get("/perfil", perfil ) ; //obtiene datos del servidor

router.get("/confirmar/:token", confirmar ) 

export default router;