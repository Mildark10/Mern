import  jwt  from "jsonwebtoken";
import Veterinario from "../models/Veterinario.js";

const checkAuth = async (req, res, next) => {
    
    let token;


    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    
        try {
          
            token = req.headers.authorization.split(" ")[1];
            //obtener los datos a partir del jw token 
            const decoded = jwt.verify(token,process.env.JWT_SECRET);
            req.veterinario = await Veterinario.findById(decoded.id).select(
                "-password -token -confirmado"
            )
            
            return next();

        } catch (error) {
            const er = new Error(' token no valido')
            return res.status(403).json({ msj: er.message })
        }
    }
    if (!token) {
        const error = new Error('token inexistente')

        return res.status(403).json({ msj: error.message })   
    }

    next();
}

export default checkAuth;
