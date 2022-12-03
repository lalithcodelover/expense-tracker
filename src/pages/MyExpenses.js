import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteExpense,
  postExpenses,
  updateExpense,
} from "../store/expense_actions";
import { themeActions } from "../store/themeReducer";
import classes from "./MyExpenses.module.css";

const MyExpenses = () => {
  const expense = useSelector((state) => state.expense.expenses);
  const dispatch = useDispatch();
  const amountInputRef = useRef();
  const descriptionInputRef = useRef();
  const categoryInputRef = useRef();
  const [update, setUpdate] = useState(false);

  const premiumModeHandler = () => {
    dispatch(themeActions.toggle());
  };

  const changeThemeHandler = () => {
    dispatch(themeActions.toggle());
  };

  const theme = useSelector((state) => state.theme.isPremium);
  if (theme) {
    document.body.style.background = "rgb(44, 39, 39)";
  } else {
    document.body.style.background = "rgb(77, 158, 90)";
  }
  let totalExpenses = 0;
  expense.map(
    (expense) =>
      (totalExpenses = Number(totalExpenses) + Number(expense.amount))
  );

  const addExpenseHandler = (e) => {
    e.preventDefault();
    const obj = {
      amount: amountInputRef.current.value,
      description: descriptionInputRef.current.value,
      category: categoryInputRef.current.value,
    };

    dispatch(postExpenses(obj));

    amountInputRef.current.value = "";
    descriptionInputRef.current.value = "";
    categoryInputRef.current.value = "Select";
  };

  const deleteExpenseHandler = (id) => {
    dispatch(deleteExpense(id));
  };

  const editExpenseHandler = (expense) => {
    setUpdate(true);
    amountInputRef.current.value = expense.amount;
    descriptionInputRef.current.value = expense.description;
    categoryInputRef.current.value = expense.category;
  };

  const updateExpenseHandler = (expense) => {
    setUpdate(false);
    let data = {
      id: expense.id,
      amount: amountInputRef.current.value,
      description: descriptionInputRef.current.value,
      category: categoryInputRef.current.value,
    };
    dispatch(updateExpense(data));
    amountInputRef.current.value = "";
    descriptionInputRef.current.value = "";
    categoryInputRef.current.value = "Select";
  };

  const expenseList = expense.map((expense) => {
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
        <button
          onClick={() => updateExpenseHandler(expense)}
          className={classes.updatebtn}
        >
          Update
        </button>
      </li>
    );
  });
  console.log(expense);
  function download(expense) {
    if (expense.length > 0) {
      const headers = Object.keys(expense[0]).toString();
      const main = expense.map((item) => {
        return Object.values(item).toString();
      });
      const csv = [headers, ...main].join("\n");
      const blob = new Blob([csv]);
      const url = URL.createObjectURL(blob);
      return url;
    }
  }
  const url = download(expense);
  return (
    <div className={classes.expensebox}>
      {totalExpenses > 10000 && (
        <div className={classes.topbuttons}>
          <a href={url} download="expenses.csv" className={classes.downloadbtn}>
            Download file
          </a>
          <button onClick={changeThemeHandler} className={classes.themebtn}>
            {theme ? "Light Theme" : "Dark Theme"}
          </button>
          <button onClick={premiumModeHandler} className={classes.premiumbtn}>
            Activate Premium!!
          </button>
        </div>
      )}
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
          {!update && <button>Add Expense</button>}
        </form>
      </div>
      <div className={classes.expenseheading}>
        <div>Amount</div>
        <div>Description</div>
        <div>Category</div>
      </div>
      <ul className={classes.expenselist}>{expenseList}</ul>
      <div>Total Expense {totalExpenses}</div>
    </div>
  );
};

export default MyExpenses;
