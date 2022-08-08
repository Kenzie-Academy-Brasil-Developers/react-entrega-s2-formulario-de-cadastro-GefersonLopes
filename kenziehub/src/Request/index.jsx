import axios from "axios";
export let salve = "";

export function ler(data,setIsLogged,setIsError) {

  const url = "https://kenziehub.herokuapp.com/";

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
    setIsLogged(true);
    return response
  })
  .catch(function (error) {
    setIsLogged(false);
    setIsError(true)
    console.log(error)
  });
}