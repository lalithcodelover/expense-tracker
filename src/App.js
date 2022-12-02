import { Fragment, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import Header from "./Layout/Header";
import ForgotPassword from "./pages/ForgotPassword";
import Login from "./pages/Login";
import MyExpenses from "./pages/MyExpenses";
import UpdateProfile from "./pages/UpdateProfile";
import Welcome from "./pages/Welcome";
import { fetchingData } from "./store/expense_actions";

function App() {
    
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchingData());
  }, [dispatch]);
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
        <Route path="/expenses">
          <MyExpenses />
        </Route>
        <Route path="/updateprofile">
          <UpdateProfile />
        </Route>
        <Route path="/resetpassword">
          <ForgotPassword />
        </Route>
      </Switch>
    </Fragment>
  );
}

export default App;
