// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import {useDispatch} from 'react-redux'
// import { expenseActions } from "./expenseReducer";

// const ExpenseContext = React.createContext({
//   expensedata: [],
//   addExpense: (expense) => {},
//   deleteExpense: (id) => {},
//   editExpense: (expense) => {},
// });

// export const ExpenseContextProvider = (props) => {
//   const [expenseData, setExpenseData] = useState([]);

//   const addExpenseHandler = (expense) => {
//     console.log(expense);
//     setExpenseData((prev) => {
//       return [...prev, expense];
//     });
//   };


  
  
  //  const fetchingData = async () => {
  //     const response = await axios.get(
  //       "https://expensetracker-0574-default-rtdb.firebaseio.com/expenses.json"
  //     );

  //     const temp = [];
  //     for (const key in response.data) {
  //       temp.push({
  //         id: key,
  //         amount: response.data[key].amount,
  //         description: response.data[key].description,
  //         category: response.data[key].category,
  //       });
  //     }
  //       // dispatch(expenseActions.addExpense(temp))
  //     setExpenseData(temp);
  //   };
  //   fetchingData();
  

//   const deleteExpenseHandler = (id) => {
    // axios.delete(
    //   `https://expensetracker-0574-default-rtdb.firebaseio.com/expenses/${id}.json`
    // );

//     let expenseitems = [...expenseData];
//     expenseitems.forEach((expense, index) => {
//       if (expense.id === id) {
//         expenseitems.splice(index, 1);
//         console.log(expenseitems);
//         setExpenseData(expenseitems);
//       }
//     });
//   };

//   const updateDataHandler = (expense) => {
//     let expenseitems = [...expenseData];
//     expenseitems.forEach((item, index) => {
//       if (item.id === expense.id) {
//         expenseitems.splice(index, 1);
//         setExpenseData(() => {
//           return [...expenseitems, expense];
//         });
//       }
//     });
//   };

//   const values = {
//     expensedata: expenseData,
//     addExpense: addExpenseHandler,
//     deleteExpense: deleteExpenseHandler,
//     updatedata: updateDataHandler,
//   };
//   return (
//     <ExpenseContext.Provider value={values}>
//       {props.children}
//     </ExpenseContext.Provider>
//   );
// };

// export default ExpenseContext;

