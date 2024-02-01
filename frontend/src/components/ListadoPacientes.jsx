import { usePacientes } from "../hooks/usePacientes"
import Paciente from "./Paciente";

export const ListadoPacientes = () => {

  const {pacientes} = usePacientes();
  console.log(pacientes);


  return (
    <>
      {pacientes.length? (
        <>
          <h2 className="font-black text-3xl text-center">Si hay pacientes</h2>
        <p className="text-xl mt-5 mb-10 text-center">
          Administra Tus {''}
         <span className="text-indigo-500 font-bold">
          pacientes y citas .
          </span> 
        </p>
        {
          pacientes.map(paciente=>(
            <Paciente 
              key={paciente._id}
              paciente = {paciente}
            />
          ))
        }
        </>

      ) :
      
      (
        <>
        <h2 className="font-black text-3xl text-center">No hay pacientes</h2>
        <p className="text-xl mt-5 mb-10 text-center">
          Comienza agregando Pacientes {''}
         <span className="text-indigo-500 font-bold">
         Y aparecerán en este apartado .
          </span> 
        </p>
        </>
      )}
    </>
  )
}