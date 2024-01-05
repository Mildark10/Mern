import Veterinario from '../models/Veterinario.js';


const registrar  =  async (req,res)=>{

//   usuarios registrados
const {emil} = req.body;


const emailRegistrados = await Veterinario.findOne({emil});


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
   // console.log(req.body); 
    res.json({ URL:"mostrando perfil"});
    
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

export{
    registrar,
    perfil,
    confirmar
}