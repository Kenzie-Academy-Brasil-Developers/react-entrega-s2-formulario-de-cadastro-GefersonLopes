import { Link } from "react-router-dom";
import logo from "../imgComponents/login/logo.png";
import fetchImg from "../imgComponents/models/get.png";
import errorImg from "../imgComponents/models/error.png";
import xImg from "../imgComponents/models/x.png";
import { DivCadastrar, DivImgCadastrar, Fetch, Error, Main } from "./styled";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import YupPassword from "yup-password";
import axios from "axios";
YupPassword(yup);

export function Register({ isLogged, setIsLogged, isError, setIsError }) {

  const schema = yup
    .object()
    .shape({
      name: yup.string().required(),
      email: yup.string().required("Escreva um email").email("Deve ser email"),
      password: yup
        .string()
        .min(8)
        .minUppercase(1)
        .minRepeating(2)
        .minWords(1)
        .password()
        .required(),
      passwordConfirmation: yup
        .string()
        .oneOf([yup.ref("password"), null], "Senhas não coincidem"),
      bio: yup.string().max(100),
      contact: yup.string(),
      course_module: yup.string(),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => {

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

  function closeError() {
    setIsError(false);
  }

  return (
    <Main>
      <div>
        <DivImgCadastrar>
          <img src={logo} alt="logo" />
          <Link to="/">
            <button>Voltar</button>
          </Link>
        </DivImgCadastrar>

        <DivCadastrar>
          <form onSubmit={handleSubmit(onSubmit)}>
            <h3>Crie sua conta</h3>
            <p className="message">Rapido e grátis, vamos nessa</p>
            <label>
              <p>Nome</p>
              <input placeholder="Digite aqui seu nome" {...register("name")} />
            </label>
            <label>
              <p>Email</p>
              <input
                placeholder="DIgite aqui seu email"
                {...register("email")}
              />
              {errors.email?.message}
            </label>
            <label>
              <p>Senha</p>
              <input
                type="password"
                placeholder="Digite aqui sua senha"
                {...register("password")}
              />
              {errors.password?.message}
            </label>
            <label>
              <p>Confirmar senha</p>
              <input
                type="password"
                placeholder="Confirme sua senha"
                {...register("passwordConfirmation")}
              />
              {errors.passwordConfirmation?.message}
            </label>
            <label>
              <p>Bio</p>
              <input
                type="bio"
                placeholder="Fale sobre você"
                {...register("bio")}
              />
            </label>
            <label>
              <p>Contato</p>
              <input
                type="contact"
                placeholder="Opção de contato"
                {...register("contact")}
              />
            </label>
            <label>
              <p>Selecionar módulo</p>
              <select name="" id="" {...register("course_module")}>
                <option value="Primeiro módulo (Introdução ao Frontend)">
                  Primeiro módulo (Introdução ao Frontend)
                </option>
                <option value="Segundo módulo (Frontend Avançado)">
                  Segundo módulo (Frontend Avançado)
                </option>
                <option value="Terceiro módulo (Introdução ao Backend)">
                  Terceiro módulo (Introdução ao Backend)
                </option>
                <option value="Quarto módulo (Backend Avançado)">
                  Quarto módulo (Backend Avançado)
                </option>
              </select>
            </label>
            {isLogged ? (
              <Link to="/home">
                <button type="submit" className="btnRegister">
                  Cadastrar
                </button>
              </Link>
            ) : (
              <button type="submit" className="btnRegister">
                Cadastrar
              </button>
            )}
          </form>
        </DivCadastrar>
      </div>
      {isLogged && (
        <Fetch className="bom">
          <div className="container-card">
            <img className="logo" src={fetchImg} alt="" />
            <p>
              Conta criada com sucesso! <br /> Clique novamente em cadastrar
            </p>
          </div>
          <div className="color-green"></div>
        </Fetch>
      )}

      {isLogged === false && isError && (
        <Error className="ruim">
          <button onClick={closeError}>
            <img src={xImg} alt="" />
          </button>
          <div className="container-card">
            <img className="logo" src={errorImg} alt="" />
            <p>Ops! Algo deu errado</p>
          </div>
          <div className="color-red"></div>
        </Error>
      )}
    </Main>
  );
}
