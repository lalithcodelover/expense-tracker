import { Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import Header from "./Layout/Header";
import Login from "./pages/Login";
import Welcome from "./pages/Welcome";

function App() {
  return (
    <Fragment>
      <Header />
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/welcome">
          <Welcome />
        </Route>
      </Switch>
    </Fragment>
  );
}

export default App;
