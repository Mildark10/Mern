/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom';
import { Alerta } from "../components/Alerta";
import { clienteAxios } from "../config/axios";


export const NuevoPassword = () => {

  const [alerta, setAlerta] = useState({})
  const [password, setPassword] = useState('');
  const [tokenValido, setTokenValido] = useState(false);
  const [passwordModificado, setPasswordModificado] = useState(false)
  const params = useParams()
  const { token } = params;


  useEffect(() => {
    const comprobarToken = async () => {
      try {
        await clienteAxios(`/veterinarios/olvide-password/${token}`);
        setAlerta({
          msg: 'Token valido'
        })

        //si llega aqui le damos un valor de true al token

        setTokenValido(true)

      } catch (error) {
        setAlerta({
          msg: 'Hubo un error con el token',
          error: true
        })
      }
    }
    comprobarToken();

  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      setAlerta({
        msg: 'el password debe ser minimo de 6 caracteres',
        error: true
      })
    }

    try {
      const url = `/veterinarios/olvide-password/${token}`;
      const data = await clienteAxios.post(url, { password })
      setAlerta({
        msg: data.msg
      })

      setPasswordModificado(true);
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }
  }

  const { msg } = alerta;
  return (
    <>
      <div className="">
        <h1 className="text-indigo-600 font-black text-4xl">
          Restablece tu password y no pierdas acceso  a
          <span className="text-indigo-950"> tus pacientes </span> </h1>
      </div>

      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        {
          msg && <Alerta
            alerta={alerta}
          />
        }


        {tokenValido && (
          <>
            <form
              onSubmit={handleSubmit}
            >


              <div className="my-5">
                <label htmlFor="" className="uppercase text-gray-500 block text-xl font-bold">Nuevo Password</label>
                <input
                  type="password"
                  placeholder="ingrese contraseña"
                  className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
              <input
                type="submit"
                value="Guardar nuevo password"
                className="bg-indigo-800 w-full py-3 
                  rounded-xl text-white uppercase font-bold cursor-pointer hover:bg-violet-800
                  mt-5
                 "
              />
            </form>
          </>

        )}

        {passwordModificado && <Link 
          to="/" className="text-red-500 font-bold "> 
          Iniciar Sesión </Link>
        }
      </div>

    </>
  )
}

