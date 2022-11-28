import axios from "axios";
import React, { useContext, useRef } from "react";

import ExpenseContext from "../store/expense-context";
import classes from "./MyExpenses.module.css";

const MyExpenses = () => {
  const expenseCtx = useContext(ExpenseContext);
  const amountInputRef = useRef();
  const descriptionInputRef = useRef();
  const categoryInputRef = useRef();

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
          id: res.data.name,
          amount: amountInputRef.current.value,
          description: descriptionInputRef.current.value,
          category: categoryInputRef.current.value,
        };
        expenseCtx.addExpense(newExpense);

        amountInputRef.current.value = "";
        descriptionInputRef.current.value = "";
        categoryInputRef.current.value = "Select";
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteExpenseHandler = (id) => {
    console.log(id);
    expenseCtx.deleteExpense(id);
  };

  const editExpenseHandler = (expense) => {
    console.log(expense);
    // expenseCtx.editExpense(expense)
    amountInputRef.current.value = expense.amount;
    descriptionInputRef.current.value = expense.description;
    categoryInputRef.current.value = expense.category;
  };

  const updateExpenseHandler = async (expense) => {
    await axios.put(
      `https://expensetracker-0574-default-rtdb.firebaseio.com/expenses/${expense.id}.json`,
      {
        amount: amountInputRef.current.value,
        description: descriptionInputRef.current.value,
        category: categoryInputRef.current.value,
      }
    );
    let data = {
      id: expense.id,
      amount: amountInputRef.current.value,
      description: descriptionInputRef.current.value,
      category: categoryInputRef.current.value,
    };
    expenseCtx.updatedata(data);
  };

  console.log(expenseCtx.expensedata);
  const expenseList = expenseCtx.expensedata.map((expense) => {
    return (
      <li className={classes.expenseitem} key={expense.id}>
        <div>${expense.amount}</div>
        <div>{expense.description}</div>
        <div>{expense.category}</div>
        <button
          onClick={() => deleteExpenseHandler(expense.id)}
          className={classes.deletebtn}
        >
          Delete
        </button>
        <button
          onClick={() => editExpenseHandler(expense)}
          className={classes.editbtn}
        >
          Edit
        </button>
        <button onClick={updateExpenseHandler}>Update</button>
      </li>
    );
  });

  return (
    <div className={classes.expensebox}>
      <h1>Expenses</h1>
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
