import {createSlice} from '@reduxjs/toolkit'

const initialExpenseState={expenses:[],totalExpense:0}
const expenseSlice = createSlice({
    name:'espenses',
    initialState:initialExpenseState,
    reducers:{
        addExpense(state,action){
            state.expenses=[...state.expenses,action.payload]
            console.log(action.payload);
            state.totalExpense=Number(state.totalExpense)+Number(action.payload.amount)
        },
        fetchingExpenses(state,action){
            state.expenses=action.payload
        },
        deleteExpense(state,action){
            const id= action.payload
            const newExpenses= [...state.expenses]
            newExpenses.forEach((item,index)=>{
                if(item.id===id){
                    state.totalExpense=Number(state.totalExpense-item.amount)
                    newExpenses.splice(index,1)
                }
            })
            state.expenses=newExpenses
        },
        updateExpense(state,action) {
            const data= action.payload
            const updatedExpense = [...state.expenses]
            updatedExpense.forEach((item)=>{
                if(item.id===data.id){
                    item.amount=data.amount
                    item.description=data.description
                    item.category=data.category

                }
            })
            state.expenses=updatedExpense
        }
    }
})




export const expenseActions = expenseSlice.actions

export default expenseSlice.reducer