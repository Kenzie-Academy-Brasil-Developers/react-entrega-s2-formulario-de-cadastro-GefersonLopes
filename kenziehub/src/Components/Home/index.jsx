import { Link } from "react-router-dom";
import logo from "../imgComponents/login/logo.png";
import { Conteudo, Header, Line, Main } from "./styled";
import "./style.css";

export function Home({isLogged,setIsLogged}) {

  const dataSalve = JSON.parse(localStorage.getItem("salveData"));
  
  function close() {

    setIsLogged(undefined);
    localStorage.removeItem("salveData");

  }

  return (
    <>
      <Header>
        <nav>
          <img src={logo} alt="logo" />
        </nav>
        <Link to="/">
          <button onClick={close}>Sair</button>
        </Link>
      </Header>
      <Line></Line>
      <Main>
        <div className="main">
          <h1>Olá, {dataSalve.data.user?.name !== undefined ? dataSalve.data.user.name : dataSalve.data.name } </h1>
          <p>{dataSalve.data.user?.course_module !== undefined ? dataSalve.data.user?.course_module : dataSalve.data.course_module }</p>
        </div>
      </Main>
      <Line></Line>

      <div id="conteudo">
        <Conteudo>
          <h1>Que pena! Estamos em desenvolvimento :(</h1>
          <p>
            Nossa aplicação está em desenvolvimento, em breve teremos novidades
          </p>
        </Conteudo>
      </div>
    </>
  );
}
