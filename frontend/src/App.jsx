/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthLayout } from './layout/AuthLayout';

import { Login } from "./paginas/Login";
import { Registrar } from "./paginas/Registrar";
import { ConfirmarCuenta } from "./paginas/ConfirmarCuenta";
import { OlvidePassword } from "./paginas/OlvidePassword";
import { NuevoPassword } from './paginas/NuevoPassword';
import { AuthProivader } from './context/AuthProvider';
import { RutaProtegida } from './layout/RutaProtegida';
import { AdministrarPacientes } from './paginas/AdministrarPacientes';





function App() {

  return (
    <BrowserRouter>
      <AuthProivader>
        <Routes>
          <Route path='/' element={<AuthLayout />}>
            <Route index element={<Login />} />
            <Route path='registrar' element={<Registrar />} />
            <Route path='olvide-password' element={<OlvidePassword />} />
            <Route path='olvide-password/:token' element={<NuevoPassword />} />
            <Route path='confirmar/:id' element={<ConfirmarCuenta />} />
           </Route>

           <Route path='/admin' element={<RutaProtegida />} >
           <Route index element={<AdministrarPacientes />} />
           </Route>

        

        </Routes>

      </AuthProivader>
    </BrowserRouter>
  )
}

export default App
