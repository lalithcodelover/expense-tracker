import React, { useState } from 'react'

const ExpenseContext = React.createContext({
 expenses:[],
 addExpense:(expense)=>{}
})

export const ExpenseContextProvider =(props)=>{
const [expenses,setExpenses] = useState([])
    const addExpenseHandler=(expense)=>{
        console.log(expense);
      setExpenses((prev)=>{
        return (
            [...prev,expense]
        )
      })
    }
    const values ={
        expenses:expenses,
        addExpense:addExpenseHandler
    }
    return (<ExpenseContext.Provider value={values}>{props.children}</ExpenseContext.Provider>
    )
}

export default ExpenseContext

