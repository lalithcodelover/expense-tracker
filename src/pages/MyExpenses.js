import React, { useContext, useRef } from "react";
import ExpenseContext from "../store/expense-context";
import classes from "./MyExpenses.module.css";
const MyExpenses = () => {
  const amountInputRef = useRef();
  const descriptionInputRef = useRef();
  const categoryInputRef = useRef();
  const expenseCtx = useContext(ExpenseContext);
  const addExpenseHandler = (e) => {
    e.preventDefault();

    const newExpense = {
      id: Math.random(),
      amount: amountInputRef.current.value,
      description: descriptionInputRef.current.value,
      category: categoryInputRef.current.value,
    };
    expenseCtx.addExpense(newExpense);
  };

  const expenseList = expenseCtx.expenses.map((expense) => {
    return (
      <li className={classes.expenseitem} key={expense.id}>
        <div>${expense.amount}</div>
        <div>{expense.description}</div>
        <div>{expense.category}</div>
      </li>
    );
  });

  return (
    <div className={classes.expensebox}>
      <h1>Expenses</h1>
      <form onSubmit={addExpenseHandler} className={classes.expenseform}>
        <label htmlFor="amount">Money Spent</label>
        <input type="text" id="amount" ref={amountInputRef} />
        <label htmlFor="description">Description</label>
        <input type="text" id="description" ref={descriptionInputRef} />
        <label htmlFor="category">Category</label>
        <select name="category" id="category" ref={categoryInputRef}>
          <option value="food">Food</option>
          <option value="fuel">Fuel</option>
          <option value="movie">Movie</option>
          <option value="medicine">Medicine</option>
          <option value="entertainment">Entertainment</option>
          <option value="education">Education</option>
        </select>
        <button>Add Expense</button>
      </form>
      <div className={classes.expenseheading}>
        <h2>Amount</h2>
        <h2 className={classes.description}>Description</h2>
        <h2 >Category</h2>
      </div>
      <ul className={classes.expenselist}>{expenseList}</ul>
    </div>
  );
};

export default MyExpenses;
