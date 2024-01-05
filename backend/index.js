/* const express = require("express"); */
import express from "express";
import dotenv from 'dotenv';
import connectDB from "./config/db.js";
import VeterinarioRoutes from './routes/veterinarioRoutes.js'
import router from "./routes/veterinarioRoutes.js";

const app = express();
app.use(express.json())

dotenv.config();
connectDB();

 app.use("/api/Veterinarios", VeterinarioRoutes) ;
/* app.use("/", (req, res)=>{
    res.send("holaaa")
}); */

const PORT = process.env.PORT || 4002;


app.listen(PORT, ()=>{
    console.log(`Estamos en el puerto ${PORT}`);
});

/* app.use( "/" , (req, res)=>{
    res.send("hola mundo");
});
 */
