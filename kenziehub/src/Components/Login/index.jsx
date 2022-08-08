import logo from "../imgComponents/login/logo.png";
import { Div, DivImg } from "./styled";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ler } from "../../Request";
import { Error, Fetch } from "../Register/styled";
import errorImg from "../imgComponents/models/error.png";
import fetchImg from "../imgComponents/models/get.png";
import xImg from "../imgComponents/models/x.png";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export function Login({ isLogged, setIsLogged, isError, setIsError }) {
  const history = useHistory();

  const handleNavigation = (path) => {
    return history.push(path);
  };

  const schema = yup
    .object()
    .shape({
      email: yup.string().required("Preencha o campo"),
      password: yup.string().required("Preencha o campo"),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const onSubmit = (data) => {
    ler(data, isLogged, setIsLogged, isError, setIsError);
  };

  function closeError() {
    setIsError(false);
  }

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
            {errors.email?.message}
          </label>
          <label>
            <p>Senha</p>
            <input type="password" {...register("password")} />
            {errors.password?.message}
          </label>
          <button
            onClick={
              isLogged
                ? () => handleNavigation("/home")
                : () => handleNavigation("/")
            }
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
