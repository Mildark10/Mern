import Veterinario from '../models/Veterinario.js';
import generarJWT from '../helpers/generarJWT.js';
import generarID from '../helpers/GenerarId.js';

const registrar  =  async (req,res)=>{

//   usuarios registrados
const {email} = req.body;


const emailRegistrados = await Veterinario.findOne({email});


if (emailRegistrados) {
    const error = new Error("usuario con email ya registrado");

    return res.status(400).json({msg: error.message});
}

    try {
        //guardar nuevo veterinario

        const veterinario = new Veterinario(req.body);

        const veterinarioGuardado = await veterinario.save(); 

        console.log(veterinarioGuardado);

    } catch (error) {
        console.log(error);
    }

    
    res.json({ msg : "Registrando usuarios"})
    
}

const perfil  =  (req,res)=>{
    const {veterinario} = req;
    //console.log('estamos en perfil'); 
   res.json({ perfil : veterinario});
    
}




const confirmar  = async  (req,res)=>{

    const {token} = req.params;

    const usuarioConfirmar = await  Veterinario.findOne({token});

    if (!usuarioConfirmar) {
        const error = new Error("Token no valido");

        return res.status(404).json({msg : error.message})
    }
    console.log(usuarioConfirmar);

    try {
        usuarioConfirmar.token = null;
        usuarioConfirmar.confirmado = true;
        await usuarioConfirmar.save();

        res.json({msg: "confirmando cuenta"});
        console.log(usuarioConfirmar);

    } catch (error) {
        console.log(error);
    }
     
 }

 const autenticar  = async  (req,res)=>{

    const {email , password} = req.body;

    const usuario = await Veterinario.findOne({email});
    console.log(email);

    if (!usuario) {
        const error = new Error("usuario no existe")

        return res.status(403).json({msg: error.message});
    }

    if (!usuario.confirmado) {
        const error = new Error("usuario no ha confirmado su cuenta")

        return res.status(403).json({msg: error.message});
    }

     //autenticar Usuario
     
     if (await usuario.comprobarPassword(password)) {
        //autentincar con JWT
        res.json({token:generarJWT(usuario.id)})

        console.log('Pass correcto');
     }else{
        const error = new Error("password incorrecto")

        return res.status(403).json({msg: error.message});
     }
 }

 const olvidePassword = async (req,res)=>{
    const {email} = req.body;
    const existeVeterinario = await Veterinario.findOne({email}); //si no existe vota => F
    if (!existeVeterinario) {
        const error = new Error("El usuario no existe") ;
        return res.status(400).json({msg: error.message});
    }

    try {
        existeVeterinario.token = generarID();
        await existeVeterinario.save();
        res.json({ msg : "Hemos enviado un gmail con las instrucciones"});
    } catch (error) {
        
    }
    
 }

 const comprobarToken = async (req,res)=>{
    const {token} = req.params ; // params hace referencia a la url , y body informacion de un formulario
    const tokenValido = await Veterinario.findOne({token}) ;

    if (tokenValido) {

        res.json({ msg : "Token valido y usuario existente"});
        
    }else{
        const error = new Error("Token invalido") ;
       return  res.status(400).json({ msg : error.message});
    }

    console.log(token);
 }

 const nuevoPassword =  async(req,res)=>{

        const {token} = req.params;
        const {password} = req.body;

        const veterinario = await Veterinario.findOne({token});
        if (!veterinario) {
            const error = new Error("Hubo un error") ;
            return res.status(400).json({msg: error.message});
        }

        try {
            veterinario.token = null;
            veterinario.password = password;
            await veterinario.save();

            res.json({ msg : "Password ha sido modificado correctamente"});
        } catch (error) {
            console.log(error);
        }
        
 }


export{
    registrar,
    perfil,
    confirmar, 
    autenticar,
    olvidePassword,
    comprobarToken,
    nuevoPassword
   
}