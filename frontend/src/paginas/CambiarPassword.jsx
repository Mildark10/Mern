

import { useState } from "react"
import { AdminNav } from "../components/AdminNav"
import { Alerta } from "../components/Alerta"
import { useAuth } from "../hooks/useAuth"



 export const CambiarPassword = () => {

    const {guardarPassword} = useAuth()

    const [alerta, setAlerta] = useState({})
    const [password, setPassword] = useState({
        pwd_actual : '',
        pwd_new : ' '
    })
 
    const handleSubmit = async(e) =>{
        e.preventDefault();

        if (Object.values(password).some(campo => campo === '')) {
            setAlerta({
                msg: 'Todos los campos son obligatorios',
                error : true
            });

            return;
        }

        if (password.pwd_new.length <6 ) {
            setAlerta({
                msg: 'El password debe contener al menos 6 caracteres',
                error : true
            });

            return;
        }

        const respuesta = await  guardarPassword(password)

        setAlerta(respuesta)
    }

    const {msg} = alerta; 
    return (
        <>
            <AdminNav />

            <h2 className="font-black text-3xl text-center mt-10">Cambiar Password</h2>
            <p className="text-xl mt-5 mb-10 text-center" >
                Modifica tu {''}
                <span className="text-indigo-600 font-bold"> Password aqui</span>
            </p>


            {
                    msg && <Alerta 
                        alerta={alerta}
                    />
                }
            <form 
                onSubmit={handleSubmit}
                      
                   >

                        <div className="my-3">
                            <label htmlFor="" className="uppercase font-bold text-gray-600">Password Actual</label>
                            <input 
                                type="text"
                                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                                name="pwd_actual"
                                placeholder="escribe el password actual"
                                onChange={e=>setPassword({
                                    ...password,
                                    [e.target.name] : e.target.value
                                })}
                            />
                        </div>

                        <div className="my-3">
                            <label htmlFor="" className="uppercase font-bold text-gray-600">Password Nuevo</label>
                            <input 
                                type="text"
                                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                                name="pwd_new"
                                placeholder="escribe tu nuevo password"
                                onChange={e=>setPassword({
                                    ...password,
                                    [e.target.name] : e.target.value
                                })}
                                
                            />
                        </div>
                        
                       
                        <input 
                            type="submit"
                            value="Actualizar Password"
                            className="bg-indigo-700 px-10 py-3 font-bold text-white rounded-lg uppercase w-full mt-5"
                        />

                    </form>

        </>
    )
}

