/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import {useState, useEffect, createContext}  from 'react'
import { clienteAxios } from '../config/axios';


const AuthContext = createContext();
const AuthProivader = ({children}) =>{

    const [cargando, setCargando] = useState(true);
    const [auth , setAuth] = useState({});

    useEffect(()=>{
        const autenticarUsuario = async()=>{
            const token = localStorage.getItem('token');

            if (!token) {
                setCargando(false)    
                return
            }

            //emular a postamn para autenticar el token
            const config = {
                headers :{
                    "Content-Type" : "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            try {
                const { data } = await clienteAxios('/veterinarios/perfil',config)
                
                setAuth(data)
            } catch (error) {
                console.log(error);
                setAuth({})
               
            }

            setCargando(false)
        }

        autenticarUsuario()
    },[ ]);

    const cerrarSesion = ()=>{
        localStorage.removeItem('token');
        setAuth({});
    }

    return(
        <AuthContext.Provider
        
            value={{
                auth,
                setAuth,
                cargando,
                cerrarSesion
            }}
        >
            {children}

        </AuthContext.Provider>
    )

}

export{
    AuthProivader
}

export default AuthContext;