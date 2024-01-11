
// eslint-disable-next-line no-unused-vars
import { Outlet } from "react-router-dom"
export const AuthLayout = () => {
  return (
    <>
      
        <main className="container mx-auto md:grid grid-cols-2 mt-14 p-7 gap-5">
        <Outlet/>
        </main>
    </>
  )
}
