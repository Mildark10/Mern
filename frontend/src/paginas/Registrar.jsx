/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import { useState } from "react";
import { Link } from "react-router-dom";
import { Alerta } from "../components/Alerta";
import axios from "axios";
import { clienteAxios } from "../config/axios";




export const Registrar = () => {

    // eslint-disable-next-line no-unused-vars
    const [nombre, setNombre] = useState('');
    // eslint-disable-next-line no-unused-vars
    const [email, setEmail] = useState('');

    // eslint-disable-next-line no-unused-vars
    const [password, setPassword] = useState('');
    // eslint-disable-next-line no-unused-vars
    const [repetirpassword, setRepetirpassword] = useState('');

    // eslint-disable-next-line no-unused-vars
    const [alerta, setAlerta] = useState({});

    const handleSubmit = async e => {
        e.preventDefault();
        console.log('enviando formulario');
        if ([nombre, email, password, repetirpassword].includes('')) {
            //   console.log('hay campos vacios');
            setAlerta({ msg: 'hay campos vacios', error: true })
            return; //detenemos la ejecucion del codigo 
        }

        if (password !== repetirpassword) {
            //    console.log('los passwords no son iguales');
            setAlerta({ msg: 'los passwords no son iguales', error: true })
            return;
        }

        if (password.length < 6) {
            //    console.log('los passwords no son iguales');
            setAlerta({ msg: 'El password es muy corto, agregar minimo 6 caracteres', error: true })
            return;
        }

        setAlerta({})

        try {

            await clienteAxios.post('/veterinarios', { nombre, email, password });
            setAlerta({
                msg: 'Creado correctamente , revise tu email',
                error: false
            })

        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
            //                console.log(error.response);
        }
    }

    const { msg } = alerta

    return (
        <>
            <div className="">
                <h1 className="text-indigo-600 font-black text-4xl">
                    Crea tu cuenta  y Administra
                    <span className="text-indigo-950"> tus pacientes </span> </h1>
            </div>

            <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">

                {
                    msg && <Alerta
                        alerta={alerta}
                    />
                }

                <form onSubmit={handleSubmit} >

                    <div>
                        <label htmlFor="" className="uppercase text-gray-500 block text-xl font-bold mt-2 mr-2">Nombre</label>
                        <input
                            type="text"
                            placeholder="ingrese nombre"
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                            value={nombre}
                            onChange={e => setNombre(e.target.value)}
                        />
                    </div>

                    <div>
                        <label htmlFor="" className="uppercase text-gray-500 block text-xl font-bold">Email</label>
                        <input
                            type="text"
                            placeholder="ingrese su email "
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>



                    <div>
                        <label htmlFor="" className="uppercase text-gray-500 block text-xl font-bold">Password</label>
                        <input
                            type="password"
                            placeholder="ingrese contraseña"
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>

                    <div>
                        <label htmlFor="" className="uppercase text-gray-500 block text-xl font-bold  mt-2"> Repita su password</label>
                        <input
                            type="password"
                            placeholder="repita su contraseña"
                            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                            value={repetirpassword}
                            onChange={e => setRepetirpassword(e.target.value)}
                        />
                    </div>

                    <input
                        type="submit"
                        value="Crear Cuenta"
                        className="bg-indigo-800 w-full py-3 
                    rounded-xl text-white uppercase font-bold cursor-pointer hover:bg-violet-800
                    mt-5
                   "
                    />
                </form>
                <nav className="mt-3 lg:flex lg:justify-between">
                    <Link to="/" className="text-red-500 font-bold ">¿Ya tienes una cuenta? , Inicia Sesión </Link>
                    <Link to="/olvide-password" className="text-red-500 font-bold "> Olvide Contraseña</Link>

                </nav>
            </div>

        </>
    )
}

