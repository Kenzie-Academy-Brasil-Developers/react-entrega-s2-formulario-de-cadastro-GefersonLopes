import { useContext } from "react";
import { Route, Switch } from "react-router-dom";
import { Context } from "../Context/Auth";

export function Rotes() {
  const { Home, Login, Register } = useContext(Context);
  

  return (
    <>
      <Switch>
        <Route exact path="/" component={Login} />
      </Switch>

      <Switch>
        <Route exact path="/register" component={Register} />
      </Switch>

      <Switch>
        <Route exact path="/home" component={Home}/>
      </Switch>
    </>
  );
}
