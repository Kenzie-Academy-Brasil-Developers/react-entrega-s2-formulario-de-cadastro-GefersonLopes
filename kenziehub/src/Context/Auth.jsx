import { createContext, useEffect, useState } from "react";
import { CreateTecnology } from "../Components/CreateTecnology";
import { RemoveTech } from "../Components/RemoveTech";
import axios from "axios";
import { useHistory } from "react-router-dom";

export const Context = createContext();

export const AuthProvider = ({ children }) => {
  ///////////////////////////////////////////////////////////////////////////////////////////////
  /* Constantes Gerais */
  let salve = "";
  const url = "https://kenziehub.herokuapp.com/";
  const tokenUser = JSON.parse(localStorage.getItem("@token"));
  const configToken = {
    headers: { Authorization: `Bearer ${tokenUser}` },
  };

  ///////////////////////////////////////////////////////////////////////////////////////////////
  /* States gerais */
  const [isLogged, setIsLogged] = useState(undefined);
  const [isError, setIsError] = useState(true);
  const [tecnology, setTecnology] = useState([]);
  const [isModal, setIsModal] = useState(false);
  const [techsList, setTechsList] = useState([]);
  const [token, setToken] = useState("");
  /////////////////////////////////////////////////////////////////////////////////////////////////
  /* Função Criar Tecnologias */
  const modalTrue = () => setIsModal(!isModal);

  const onSubmit = (data) => {
    const title = data?.title;
    const status = data?.status;

    axios
      .post(
        url + "users/techs",
        {
          title,
          status,
        },
        { headers: { Authorization: `Bearer ${tokenUser}` } }
      )
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  /////////////////////////////////////////////////////////////////////////////////////////////////
  /* Função da Home */

  function close() {
    setIsLogged(undefined);
    localStorage.clear();
  }
  /////////////////////////////////////////////////////////////////////////////////////////////////
  /* Função Loguin */

  const history = useHistory();
  function ler(data, setIsLogged, setIsError) {
    const email = data?.email;
    const password = data?.password;

    const handleNavigation = (path) => {
      return history.push(path);
    };

    return (
      data !== undefined &&
      axios
        .post(url + "sessions", {
          email,
          password,
        })
        .then(function (response) {
          salve = response;
          localStorage.setItem("salveData", JSON.stringify(salve));
          localStorage.setItem("@token", JSON.stringify(salve.data.token));
          setIsLogged(true);

          handleNavigation("/home");
          return response;
        })
        .catch(function (error) {
          handleNavigation("/");
          setIsLogged(false);
          setIsError(true);
          console.log(error);
        })
    );
  }

  //fechar componente de erro
  function closeError() {
    setIsError(false);
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////
  /* Função Main */

  function LeadTechs() {
    useEffect(() => {
      axios
        .get(url + "profile", configToken)
        .then(function (response) {
          const data = response.data.techs;
          setTechsList(data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }, [techsList]);
  }
  ///////////////////////////////////////////////////////////////////////////////////////////////

  const onSubmitRegister = (data) => {
    const name = data?.name;
    const email = data?.email;
    const password = data?.password;
    const bio = data?.bio;
    const contact = data?.contact;
    const course_module = data?.course_module;

    axios
      .post("https://kenziehub.herokuapp.com/users", {
        name,
        email,
        password,
        bio,
        contact,
        course_module,
      })
      .then((res) => {
        setIsLogged(true);
        localStorage.setItem("salveData", JSON.stringify(res));
      })
      .catch((err) => {
        setIsLogged(false);
        setIsError(true);
      });
  };
  ///////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////

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
        CreateTecnology,
        techsList,
        setTechsList,
        RemoveTech,
        token,
        setToken,
        modalTrue,
        onSubmit,
        url,
        tokenUser,
        close,
        salve,
        ler,
        closeError,
        configToken,
        LeadTechs,
        onSubmitRegister,
      }}
    >
      {children}
    </Context.Provider>
  );
};
