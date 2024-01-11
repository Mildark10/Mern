/* const express = require("express"); */
import express from "express";
import dotenv from 'dotenv';
import connectDB from "./config/db.js";
import VeterinarioRoutes from './routes/veterinarioRoutes.js';
import pacientesRoutes from './routes/pacientesRoutes.js';
import cors from 'cors'

const app = express();
app.use(express.json())

dotenv.config();

connectDB();

const dominiosPermitidos = ['http://localhost:5174'];

const corsOptions = {
    origin: function(origin, callback){
        if (dominiosPermitidos.indexOf(origin) !== -1 ) {
            //el orogin del request es permitido
            callback(null, true); //dos parametros uno indicando que no se encontro error y otro que es verdsdero q ese dominio es permitido
        }else{
            callback(new Error('no permitido por los cors'));
        }
    }
}


app.use(cors(corsOptions))

 app.use("/api/Veterinarios", VeterinarioRoutes) ;

 app.use("/api/Pacientes", pacientesRoutes) ;


const PORT = process.env.PORT || 4002;


app.listen(PORT, ()=>{
    console.log(`Estamos en el puerto ${PORT}`);
});

