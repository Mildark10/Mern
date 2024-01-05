import mongoose from "mongoose";
import generarID from "../helpers/GenerarId.js";

const veterinariaSchema = mongoose.Schema({

    nombre:{
        type : String,
        require: true,
        trim: true
    },
    password:{
        type:String,
        require:true
    },
    email:{
        type: String,
        require:true,
        unique:true,
        trim:true
    },
    telefono:{
        type:String,
        default: null,
        trim:true
    },
    web:{
        type:String,
        default:null
    },
    token:{
        type:String,
        default: generarID()
    },
    confirmado:{
        type:Boolean,
        default:false
    },

});

const Veterinario = mongoose.model('Veterinario',veterinariaSchema);
export default Veterinario;