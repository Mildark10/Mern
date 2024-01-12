/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars

import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Alerta } from "../components/Alerta";
import { clienteAxios } from "../config/axios";


export const ConfirmarCuenta = () => {
  //declaracion para los cambios de estado en cuanto la pagina cargue la info
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [alerta, setAlerta] = useState({});

  //se obtiene el id del link de envio en este cao el token de confirmacioin
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    const confirmarCuenta = async () => {
      try {
        console.log(id);

        // eslint-disable-next-line no-unused-vars
        const url = (`/veterinarios/confirmar/${id}`);
        // eslint-disable-next-line no-unused-vars
        const { data } = await clienteAxios(url);
        console.log('data', data);
        setCuentaConfirmada(true)

        setAlerta({
          msg: data.msg
        })

      } catch (error) {
        console.log(error);
        setAlerta({
          msg: error.response.data.msg,
          error: true
        })
      }
      setCargando(false)
    }

    confirmarCuenta();
  }, []);

  return (

    <>
      <div className="">
        <h1 className="text-indigo-600 font-black text-4xl">
          Confirma tu cuenta y comienza a administrar
          <span className="text-indigo-950"> tus pacientes </span> </h1>
      </div>

      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        {!cargando && <Alerta
          alerta={alerta}
        />}

        {cuentaConfirmada && (
          <Link to="/" className="text-red-500 font-bold "> Inicia Sesión </Link>
        )

        }
      </div>

    </>
  )
}

