import React from "react";
import { useHistory } from "react-router-dom";
import {useDispatch,useSelector} from 'react-redux'
import classes from "./Header.module.css";
import { authActions } from "../store/authReducer";
const Header = () => {
  const dispatch = useDispatch()
  const history = useHistory();
  const token =useSelector(state=>state.auth.token)

  const logoutHandler = () => {
    localStorage.removeItem("token");
    dispatch(authActions.logout())
    history.replace("/login");
  };
  const goToExpensePage=()=>{
  // const token=  localStorage.getItem('token')

    if(token){
      history.replace('/expenses')
    }
    else{
      history.replace('/login')
    }
  }
  return (
    <div className={classes.header}>
      <h1>Expense Tracker</h1>
      <h2 onClick={goToExpensePage} className={classes.expensepage}>My Expenses</h2>
      <button onClick={logoutHandler} className={classes.logoutbutton}>
        Logout
      </button>
    </div>
  );
};

export default Header;
