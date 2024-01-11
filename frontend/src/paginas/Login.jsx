// eslint-disable-next-line no-unused-vars
import { Link } from "react-router-dom"

export const Login = () => {
  return (
    <>
       <div className="">
        <h1 className="text-indigo-600 font-black text-4xl">Incia Sesion y Administra tus 
            <span className="text-indigo-950"> pacientes </span> </h1>
       </div>
        <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
            <form action="">
                <div>
                    <label htmlFor="" className="uppercase text-gray-500 block text-xl font-bold">Email</label>
                    <input
                        type="text"
                        placeholder="email Registro"
                        className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                    />
                </div>

                <div>
                    <label htmlFor="" className="uppercase text-gray-500 block text-xl font-bold">password</label>
                    <input
                        type="password"
                        placeholder="ingrese contraseña"
                        className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                    />
                </div>

                <input 
                   type="submit"
                   value= "Iniciar Sesión"
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

