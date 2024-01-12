/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { useState } from "react"
import { Link } from "react-router-dom"
import {Alerta} from "../components/Alerta"
import { clienteAxios } from "../config/axios";



export const OlvidePassword = () => {
  const [email, setEmail] = useState('');
  const [alerta, setAlerta] = useState({});

  const handleSubmit = async e => {
    
    e.preventDefault();

    console.log(email);
    if (email === '') {
      setAlerta({ msg: 'El email es obligatorio', error: true })
      return;
    }

    try {
      const {data} = await clienteAxios.post('veterinarios/olvide-password',{email})
      setAlerta({
        msg:data.msg
      })
      console.log(data);
    } catch (error) {
      setAlerta({
        msg:error.response.data.msg,
        error: true
      })
    }

  }

  const { msg } = alerta;

  return (
    <>
      <div className="">
        <h1 className="text-indigo-600 font-black text-4xl">
          Recupera tu acceso  y no pierdas
          <span className="text-indigo-950"> tus pacientes </span> </h1>
      </div>

      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
      
        {
          msg && <Alerta
            alerta={alerta}
          />
        }


        <form 
          onSubmit={handleSubmit}
        >
          <div>
            <label htmlFor="" className="uppercase text-gray-500 block text-xl font-bold">Email</label>
            <input
              type="text"
              placeholder="ingrese su email"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          <input
            type="submit"
            value="Enviar Instrucciones"
            className="bg-indigo-800 w-full py-3 
                    rounded-xl text-white uppercase font-bold cursor-pointer hover:bg-violet-800
                    mt-5
                   "
          />
        </form>

        <nav className="mt-3 lg:flex lg:justify-between">
          <Link to="/" className="text-red-500 font-bold ">¿Ya tienes una cuenta? , Inicia Sesión </Link>
          <Link to="/registrar" className="text-red-500 font-bold ">¿No tienes cuenta? , Registrate </Link>

        </nav>

      </div>
    </>
  )
}

