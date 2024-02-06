import { useState , useEffect } from "react";
import { Alerta } from "./Alerta";
import { usePacientes } from "../hooks/usePacientes";


export const Formulario = () => {
  const [nombre, setNombre] = useState('');
  const [propietario, setPropietario] = useState('');
  const [email, setEmail] = useState('');
  const [fechas, setFecha] = useState('');
  const [sintomas, setSintomas] = useState('');
  const [alerta, setAlerta] = useState({});
  const [id,setId] = useState(null)

  const {guardarPacientes, paciente} = usePacientes();

  //use effect para editar a los pacientes
    useEffect(()=>{

      if (paciente?.nombre) {
        setNombre(paciente.nombre);
        setPropietario(paciente.propietario);
        setEmail(paciente.email);
        setFecha(paciente.fechas);
        setSintomas(paciente.sintomas);
        setId(paciente._id)

      }

    },[paciente])


  const handleSubmit = e => {
    e.preventDefault();
    if ([nombre, propietario, email, fechas, sintomas].includes('')) {
      console.log('Hay Al Menos un campo vacio');
      
      setAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true
      })
      return;
    }
    console.log('feeeeeee',fechas);
    guardarPacientes({nombre, propietario, email, fechas, sintomas,id})
    setAlerta({
      msg: 'Guardado Correctamente'
    });

    setNombre('');
    setPropietario('');
    setEmail('');
    setFecha('');
    setSintomas('')

  }


  const { msg } = alerta;


  return (
    <>
      <p className="text-lg text-center mb-10">
        Añade tus pacientes y {''}
        <span className="text-indigo-600 font-bold">Administralos</span>
      </p>

      {msg && <Alerta
        alerta={alerta}
      />}

      <form
        className="bg-white py-10 px-5 mb-10  shadow-md rounded-md"
        onSubmit={handleSubmit}
      >
        <div className="mb-5">
          <label htmlFor="mascota" className="text-gray-700 font-bold">
            Nombre de Mascota</label>
          <input
            id="mascota"
            type="text"
            placeholder="Nombre de mascota"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={nombre}
            onChange={e => setNombre(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="propietario" className="text-gray-700 font-bold">
            Nombre del Propietario</label>
          <input
            id="propietario"
            type="text"
            placeholder="Nombre de propietario"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={propietario}
            onChange={e => setPropietario(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="email" className="text-gray-700 font-bold">
            Email</label>
          <input
            id="email"
            type="text"
            placeholder="Ingrese email"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="fechas"
            className="text-gray-700 font-bold">
            Fecha Alta
          </label>
          <input
            id="fechas"
            type="date"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={fechas}
            onChange={e => setFecha(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="sintomas"
            className="text-gray-700 font-bold">
            Sintomas
          </label>

          <textarea
            id="sintomas"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={sintomas}
            onChange={e => setSintomas(e.target.value)}
          />
        </div>

        <input
          type="submit"
          className="bg-indigo-600 w-full p-3  text-white uppercase font-bold hover:bg-indigo-700
                    cursor-pointer transition-colors"
       
          value={id? 'Guardar Cambios' : 'Agregar Paciente'}
        />

      </form>

    </>
  )
}
