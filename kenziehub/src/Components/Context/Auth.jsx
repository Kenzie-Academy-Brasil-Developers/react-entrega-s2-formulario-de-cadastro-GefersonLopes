import { createContext, useState } from "react";

export const Context = createContext();

export const AuthProvider = ({ children }) => {
    
  const [isLogged, setIsLogged] = useState(undefined);
  const [isError, setIsError] = useState(true);
  const [tecnology, setTecnology] = useState([]);
  const [isModal, setIsModal] = useState(false);

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
      }}
    >
      {children}
    </Context.Provider>
  );
};
