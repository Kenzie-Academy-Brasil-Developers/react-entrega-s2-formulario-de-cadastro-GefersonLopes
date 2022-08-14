import axios from "axios";
import { RequestTechs } from "../Components/RequestTechs";
export let salve = "";

const url = "https://kenziehub.herokuapp.com/";

export function ler(data,setIsLogged,setIsError) {
  
  const email = data?.email;
  const password = data?.password;
  
  return data !== undefined && axios
  .post(url + "sessions", {
    email,
    password,
  })
  .then(function (response) {
    salve = response;
    localStorage.setItem("salveData", JSON.stringify(salve));
    localStorage.setItem("@token", JSON.stringify(salve.data.token));
    setIsLogged(true);
    return response
  })
  .catch(function (error) {
    setIsLogged(false);
    setIsError(true)
    console.log(error)
  });
};
