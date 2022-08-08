import { Route, Switch } from "react-router-dom";
import { Home } from "../Components/Home";
import { Login } from "../Components/Login";
import { Register } from "../Components/Register";
import { useState } from "react";

export function Rotes() {

  const [isLogged, setIsLogged] = useState(undefined);
  const [isError,setIsError] = useState(true);

  return (
    <>
      <Switch>
        <Route exact path="/">
          <Login isLogged={isLogged} setIsLogged={setIsLogged} isError={isError} setIsError={setIsError} />
        </Route>
      </Switch>

      <Switch>
        <Route exact path="/register">
          <Register isLogged={isLogged} setIsLogged={setIsLogged} isError={isError} setIsError={setIsError} />
        </Route>
      </Switch>

      <Switch>
        <Route exact path="/home">
          <Home isLogged={isLogged} setIsLogged={setIsLogged} />
        </Route>
      </Switch>
    </>
  );
}
