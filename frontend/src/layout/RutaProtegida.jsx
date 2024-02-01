/* eslint-disable no-unused-vars */
import { Outlet, useNavigate } from 'react-router-dom';
 
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
 
import { useAuth } from '../hooks/useAuth';
 
export const RutaProtegida = () => {
  const { auth, cargando } = useAuth();
  console.log(auth);
  const navigate = useNavigate();
 
  if (cargando) return 'Cargando ...... ';
 
  return (
    <>
      <Header />
      {auth && auth._id ? (
        <main className="container mx-auto mt-10 pl-2">
          <Outlet />
        </main>
      ) : (
        navigate('/')
      )}
 
      <Footer />
    </>
  );
};