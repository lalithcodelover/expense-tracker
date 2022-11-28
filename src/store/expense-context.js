import React, { useState, useEffect } from "react";
import axios from "axios";
const ExpenseContext = React.createContext({
  expensedata: [],
  addExpense: (expense) => {},
  deleteExpense: (id) => {},
  editExpense:(expense)=>{}
});

export const ExpenseContextProvider = (props) => {
  const [expenseData, setExpenseData] = useState([]);

  const addExpenseHandler = (expense) => {
    console.log(expense);
    setExpenseData((prev) => {
      return [...prev, expense];
    });
  };

  useEffect(() => {
    const fetchingData = async () => {
      const response = await axios.get(
        "https://expensetracker-0574-default-rtdb.firebaseio.com/expenses.json"
      );

      const temp = [];
      for (const key in response.data) {
        temp.push({
          id: key,
          amount: response.data[key].amount,
          description: response.data[key].description,
          category: response.data[key].category,
        });
      }

      setExpenseData(temp);
    };
    fetchingData();
  }, []);

  const deleteExpenseHandler = (id) => {
    axios.delete(
      `https://expensetracker-0574-default-rtdb.firebaseio.com/expenses/${id}.json`
    );

    let expenseitems = [...expenseData];
    expenseitems.forEach((expense, index) => {
      if (expense.id === id) {
        expenseitems.splice(index, 1);
        console.log(expenseitems);
        setExpenseData(expenseitems);
      }
    });
  };

  const editExpenseHandler=(expense)=>{
    
  }
  const values = {
    expensedata: expenseData,
    addExpense: addExpenseHandler,
    deleteExpense: deleteExpenseHandler,
    editExpense:editExpenseHandler
  };
  return (
    <ExpenseContext.Provider value={values}>
      {props.children}
    </ExpenseContext.Provider>
  );
};

export default ExpenseContext;
