import express from "express";
const router = express.Router();

import {registrar , perfil , confirmar , autenticar ,olvidePassword ,comprobarToken, nuevoPassword } from '../controllers/veterinarioControllers.js'
import checkAuth from "../middleware/authMiddleware.js";
//area publica
router.post("/", registrar); //envia datos al servidor Registrar usuario
router.get("/confirmar/:token", confirmar )    //confirmar cuenta de uusuario
router.post("/login", autenticar);              //autenticar cuenta de usuariio
router.post("/olvide-password", olvidePassword);
/* router.get("/olvide-password/:token",comprobarToken);
router.post("/olvide-password/:token",nuevoPassword); */
router.route("/olvide-password/:token").get(comprobarToken).post(nuevoPassword);
//area privada 
router.get("/perfil", checkAuth, perfil ) ; //obtiene datos del servidor 


export default router;