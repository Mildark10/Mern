/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import { Link ,Navigate,useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import { useState } from "react"
import { Alerta } from "../components/Alerta"
import { clienteAxios } from "../config/axios"


export const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [alerta, setAlerta] = useState({});
    const navigate = useNavigate();

    const {setAuth} = useAuth()

    const handleSubmit = async (e) => {
        e.preventDefault();
     
        if ([email, password].includes('')) {
          setAlerta({
            msg: 'todo los campos son obligatorios',
            error: true,
          });
          return;
        }
     
        try {
          const { data } = await clienteAxios.post('veterinarios/login', { email, password });
     
          localStorage.setItem('token', data.token);
     
          setAuth( data );
     
          navigate('/admin');
          /*             setAlerta({
                    msg: data.response.msg
                }) */
        } catch (error) {
          setAlerta({
            msg: error.response.data.msg,
            error: true,
          });
        }
      };

    const { msg } = alerta
    return (
        <>
            <div className="">
                <h1 className="text-indigo-600 font-black text-4xl">Incia Sesion y Administra tus
                    <span className="text-indigo-950"> pacientes </span> </h1>
            </div>
            <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">

                {
                    msg && <Alerta
                        alerta={alerta}
                    />
                }

                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="" className="uppercase text-gray-500 block text-xl font-bold">Email</label>
                        <input
                            type="text"
                            placeholder="email Registro"
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                            value={email}
                            onChange={e=>setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <label htmlFor="" className="uppercase text-gray-500 block text-xl font-bold">password</label>
                        <input
                            type="password"
                            placeholder="ingrese contraseña"
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                            value={password}
                            onChange={e=>setPassword(e.target.value)}
                        />
                    </div>

                    <input
                        type="submit"
                        value="Iniciar Sesión"
                        className="bg-indigo-800 w-full py-3 
                    rounded-xl text-white uppercase font-bold cursor-pointer hover:bg-violet-800
                    mt-5
                   "
                    />
                </form>
                <nav className="mt-3 lg:flex lg:justify-between">
                    <Link to="/registrar" className="text-red-500 font-bold ">¿No tienes cuenta? , Registrate </Link>
                    <Link to="/olvide-password" className="text-red-500 font-bold "> Olvide Contraseña</Link>

                </nav>
            </div>
        </>
    )
}

