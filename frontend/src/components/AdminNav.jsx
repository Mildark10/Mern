import { Link } from "react-router-dom";


export const AdminNav = () => {
  return (
    <nav>
        <Link 
            to="/admin/perfil"
            className="font-bold uppercase text-gray-500 ml-2"
        >
            Perfil
        </Link>

        <Link 
            to="/admin/cambiar-password"
            className="font-bold uppercase text-gray-500 ml-3"
        >
            Cambiar Password
        </Link>

    </nav>
  )
}
