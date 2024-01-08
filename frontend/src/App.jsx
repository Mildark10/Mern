/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import {BrowserRouter, Routes ,Route} from 'react-router-dom'
import { AuthLayout } from './layout/AuthLayout'

import { Login } from "./paginas/Login";
import { Registrar } from "./paginas/Registrar";
import { ConfirmarCuenta } from "./paginas/ConfirmarCuenta";
import { OlvidePassword } from "./paginas/OlvidePassword";
/*import { ConfirmarCuenta } from './paginas/ConfirmarCuenta'
import { OlvidePassword } from './paginas/OlvidePassword'
import { Registrar } from './paginas/Registrar' */


function App() {
 

  return (
   <BrowserRouter>
    <Routes>
      <Route path='/' element={<AuthLayout/>}>
         <Route index element={<Login/>}/>
       <Route path='registrar' element={<Registrar />} />
       <Route path='olvide-password' element={<OlvidePassword/>}/>
       <Route path='confirmar-cuenta' element={<ConfirmarCuenta/>}/>
    {/*     <Route path='olvide-password' element={<OlvidePassword/>}/>
        <Route path='confirmar-cuenta' element={<ConfirmarCuenta/>}/> */}
      </Route>
    </Routes>
   </BrowserRouter>
  )
}

export default App