import React from "react";
import { useHistory } from "react-router-dom";
import classes from "./Header.module.css";
const Header = () => {
  const history = useHistory();
  const logoutHandler = () => {
    localStorage.removeItem("token");

    history.replace("/login");
  };
  return (
    <div className={classes.header}>
      <h1>Expense Tracker</h1>
      <button onClick={logoutHandler} className={classes.logoutbutton}>
        Logout
      </button>
    </div>
  );
};

export default Header;
