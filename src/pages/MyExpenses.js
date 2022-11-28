// import axios from "axios";
import React, { useContext } from "react";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseContext from "../store/expense-context";
import classes from "./MyExpenses.module.css";

const MyExpenses = () => {
  const expenseCtx = useContext(ExpenseContext);

  const deleteExpenseHandler = (id) => {
    console.log(id)
    expenseCtx.deleteExpense(id)
  };

  const editExpenseHandler = (expense) => {
    console.log(expense);
    expenseCtx.editExpense(expense)
  };
console.log(expenseCtx.expensedata);
  const expenseList = expenseCtx.expensedata.map((expense) => {
    return (
      <li className={classes.expenseitem} key={expense.id}>
        <div>${expense.amount}</div>
        <div>{expense.description}</div>
        <div>{expense.category}</div>
        <button onClick={()=>deleteExpenseHandler(expense.id)} className={classes.deletebtn}>
          Delete
        </button>
        <button onClick={()=>editExpenseHandler(expense)} className={classes.editbtn}>
          Edit
        </button>
        <button>Submit</button>
      </li>
    );
  });

  return (
    <div className={classes.expensebox}>
      <h1>Expenses</h1>
      <ExpenseForm/>
      <div className={classes.expenseheading}>
        <div>Amount</div>
        <div>Description</div>
        <div>Category</div>
      </div>
      <ul className={classes.expenselist}>{expenseList}</ul>
    </div>
  );
};

export default MyExpenses;
