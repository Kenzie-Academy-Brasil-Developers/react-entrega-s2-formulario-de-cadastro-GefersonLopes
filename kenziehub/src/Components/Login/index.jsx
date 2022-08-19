import logo from "../imgComponents/login/logo.png";
import { Div, DivImg } from "./styled";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Error, Fetch } from "../Register/styled";
import errorImg from "../imgComponents/models/error.png";
import fetchImg from "../imgComponents/models/get.png";
import xImg from "../imgComponents/models/x.png";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useContext } from "react";
import { Context } from "../../Context/Auth";
import axios from "axios";

export let salve = "";
export function Login() {
  //Importando funções e os hooks por contexto
  const {
    isLogged,
    setIsLogged,
    isError,
    setIsError,
    setToken,
  } = useContext(Context);

  //requisição yup
  const schema = yup
    .object()
    .shape({
      email: yup.string().required("Preencha o campo"),
      password: yup.string().required("Preencha o campo"),
    })
    .required();

  //Capturar dados do formulario
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const onSubmit = (data) => {
    ler(data, setIsLogged, setIsError,setToken);
  };

  //fechar componente de erro
  function closeError() {
    setIsError(false);
  }

  ////////////////////////////////////////////////////
  ////////////////////////////////////////////////////
  //Requisição Login//

  const history = useHistory();
  function ler(data,setIsLogged,setIsError) {
  
    const email = data?.email;
    const password = data?.password;
    const url = "https://kenziehub.herokuapp.com/";
  
    //fazer o loguin caso tenha feito corretamente
    const handleNavigation = (path) => {
      return history.push(path);
    };
  
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
  
      handleNavigation("/home")
      return response
    })
    .catch(function (error) {
      handleNavigation("/")
      setIsLogged(false);
      setIsError(true)
      console.log(error)
    });
  };
  

  return (
    <>
      {isLogged === false && isError === true && (
        <Error className="ruim">
          <button onClick={closeError}>
            <img src={xImg} alt="" />
          </button>
          <div className="container-card">
            <img className="logo" src={errorImg} alt="" />
            <p>Email e/ou senha incorreta/s</p>
          </div>
          <div className="color-red"></div>
        </Error>
      )}

      {isLogged === true && (
        <Fetch className="bom">
          <div className="container-card">
            <img className="logo" src={fetchImg} alt="" />
            <p>
              Aperte em entrar novamente
              <br />e acesse sua conta ;)
            </p>
          </div>
          <div className="color-green"></div>
        </Fetch>
      )}

      <DivImg>
        <img src={logo} alt="logo" />
      </DivImg>

      <Div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h3>Login</h3>
          <label>
            <p>Email</p>
            <input type="email" {...register("email")} />
            {errors.email && <p>{errors.email.message}</p>}
          </label>
          <label>
            <p>Senha</p>
            <input type="password" {...register("password")} />
            {errors.password && <p>{errors.password.message}</p>}
          </label>
          <button
            type="submit"
            className="btnEntrar"
          >
            Entrar
          </button>
          <div>
            <p className="mensage">Ainda não possui uma conta?</p>
            <Link to="/register">
              <button type="submit" className="btnCadastrar">
                Cadastrar
              </button>
            </Link>
          </div>
        </form>
      </Div>
    </>
  );
}
