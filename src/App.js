import { Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import Header from "./Layout/Header";
import Login from "./pages/Login";
import UpdateProfile from "./pages/UpdateProfile";
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
        <Route path='/updateprofile'>
          <UpdateProfile/>
        </Route>
      </Switch>
    </Fragment>
  );
}

export default App;
