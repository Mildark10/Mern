import { createContext,useState, useEffect } from "react";
import { clienteAxios } from "../config/axios";

const PacientesContext = createContext();

export const PacientesProvaider = ({children}) => {

    const [pacientes, setPacientes] = useState([]);

    //statepara editar paciente
    const [paciente , setPaciente] = useState({})



    useEffect(()=>{

        const ObtenerPacientes = async ()=>{
            try {
                const token = localStorage.getItem('token');

                if(!token) return

                const config = {
                    headers :{
                        "Content-Type" : "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }

                const {data} = await clienteAxios('/pacientes', config);

                setPacientes(data);

            } catch (error) {
                console.log(error);
            }
        }

        ObtenerPacientes();

    },[ ] );

    const guardarPacientes = async(paciente)=>{
        const token = localStorage.getItem('token');
        const config = {
            headers :{
                "Content-Type" : "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        //si hay id es porque existe ese paciente caso contrario se agrega al db
        if (paciente.id) {

            try {
                const {data} = await clienteAxios.put(`/pacientes/${paciente.id}`, paciente, config);
                const pacienteActualizado  = pacientes.map(pacienteState=> pacienteState._id === data._id ? data : pacienteState ) ;
                setPacientes(pacienteActualizado)

            } catch (error) {
                console.log(error);
            }

        }else{
            try {



    
                const {data}  = await clienteAxios.post('/pacientes', paciente , config)
               
                const {__v , ...pacienteAlmacenado} =data;
    
                console.log(pacienteAlmacenado);
    
                setPacientes([pacienteAlmacenado , ...pacientes]);
    
            } catch (error) {
                console.log(error.response.data.msg);
            }

        }

       
    }

    const setEdicion = (paciente) =>{
        setPaciente(paciente)
    }

    const eliminarPaciente = async(id) =>{
        const confirmar = confirm('¿Desea eliminar este registro?')
        if (confirmar) {
            try {
                const token = localStorage.getItem('token');
                const config = {
                    headers :{
                        "Content-Type" : "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
                const  {data} = await clienteAxios.delete(`/pacientes/${id}`, config);
                console.log(data);
                
                const pacienteActualizado = pacientes.filter(pacienteState => pacienteState._id !== id)

                setPacientes(pacienteActualizado)

            } catch (error) {
                
            }            
        }
    }

  return (


    <PacientesContext.Provider
        value={{
            pacientes,
            setPacientes,
            guardarPacientes,
            setEdicion, 
            paciente,
            eliminarPaciente
        }}
    >
        {children}
    </PacientesContext.Provider>

    )
}


export default PacientesContext;