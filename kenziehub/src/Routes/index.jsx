import { Route, Switch } from "react-router-dom";
import { Home } from "../Components/Home";
import { Login } from "../Components/Login";
import { Register } from "../Components/Register";

export function Rotes() {

  return (
    <>
      <Switch>
        <Route exact path="/">
          <Login/>
        </Route>
      </Switch>

      <Switch>
        <Route exact path="/register">
          <Register/>
        </Route>
      </Switch>

      <Switch>
        <Route exact path="/home">
          <Home/>
        </Route>
      </Switch>
    </>
  );
}
