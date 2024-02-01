/* eslint-disable no-unused-vars */
import { useContext } from "react";
import PacientesContext from "../context/PacientesProvaider";

export const usePacientes = ()=>{

    return useContext(PacientesContext)
}

