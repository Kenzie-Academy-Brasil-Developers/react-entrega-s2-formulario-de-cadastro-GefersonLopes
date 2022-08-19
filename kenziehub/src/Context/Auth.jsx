import { createContext, useState } from "react";
import { Home } from "../Components/Home";
import { Login } from "../Components/Login";
import { Register } from "../Components/Register";
import { CreateTecnology } from "../Components/CreateTecnology";
import {RemoveTech } from "../Components/RemoveTech";
import { ler } from "../Request";

export const Context = createContext();

export const AuthProvider = ({ children }) => {
    
  const [isLogged, setIsLogged] = useState(undefined);
  const [isError, setIsError] = useState(true);
  const [tecnology, setTecnology] = useState([]);
  const [isModal, setIsModal] = useState(false);
  const [techsList,setTechsList] = useState([]);

  return (
    <Context.Provider
      value={{
        isLogged,
        setIsLogged,
        isError,
        setIsError,
        tecnology,
        setTecnology,
        isModal,
        setIsModal,
        Home,
        Login,
        Register,
        CreateTecnology,
        techsList,
        setTechsList,
        RemoveTech,
        ler,
      }}
    >
      {children}
    </Context.Provider>
  );
};