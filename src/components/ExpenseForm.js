import axios from "axios";
import React, { useRef, useContext } from "react";
import ExpenseContext from "../store/expense-context";
import classes from "./ExpenseForm.module.css";
const ExpenseForm = (props) => {
  const amountInputRef = useRef();
  const descriptionInputRef = useRef();
  const categoryInputRef = useRef();
  const expenseCtx = useContext(ExpenseContext);
  const addExpenseHandler = (e) => {
    e.preventDefault();


    axios
      .post(
        "https://expensetracker-0574-default-rtdb.firebaseio.com/expenses.json",
        {
          amount: amountInputRef.current.value,
          description: descriptionInputRef.current.value,
          category: categoryInputRef.current.value,
        }
      )
      .then((res) => {
        console.log(res.data.name);
        const newExpense = {
            id:res.data.name,
            amount: amountInputRef.current.value,
            description: descriptionInputRef.current.value,
            category: categoryInputRef.current.value,
          };
          expenseCtx.addExpense(newExpense);

          amountInputRef.current.value=''
          descriptionInputRef.current.value=''
          categoryInputRef.current.value='Select'
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let data ={
    amount:amountInputRef.current.value,
          description:descriptionInputRef.current.value,
          category:categoryInputRef.current.value

  }
props.formdata(data)
  return (
    <div>
      <form onSubmit={addExpenseHandler} className={classes.expenseform}>
        <label htmlFor="amount">Money Spent</label>
        <input type="text" id="amount" ref={amountInputRef} />
        <label htmlFor="description">Description</label>
        <input type="text" id="description" ref={descriptionInputRef} />
        <label htmlFor="category">Category</label>
        <select name="category" id="category" ref={categoryInputRef}>
        <option value="Select">Select One</option>
          <option value="Food">Food</option>
          <option value="Fuel">Fuel</option>
          <option value="Movie">Movie</option>
          <option value="Medicine">Medicine</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Education">Education</option>
        </select>
        <button>Add Expense</button>
      </form>
    </div>
  );
};

export default ExpenseForm;
