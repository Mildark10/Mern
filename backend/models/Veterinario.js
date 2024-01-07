import mongoose from "mongoose";
import bcrypth from 'bcrypt';
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


veterinariaSchema.methods.comprobarPassword = async function(passwordFormulario){

    return await bcrypth.compare(passwordFormulario , this.password)

};

veterinariaSchema.pre('save',async function(next){
    //si ya tiene un hash ya no lo vuelve a hashear
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypth.genSalt(10);
    this.password = await bcrypth.hash(this.password , salt);
})

const Veterinario = mongoose.model('Veterinario',veterinariaSchema);
export default Veterinario;