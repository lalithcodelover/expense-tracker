import axios from "axios";
import { expenseActions } from "./expenseReducer";

export const fetchingData = () => {
  return async (dispatch) => {
    const fetchingExpenses = async () => {
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
      console.log(temp);
      // dispatch(expenseActions.addExpense(temp))
      return temp;
    };
    const expenses = await fetchingExpenses();
    dispatch(expenseActions.fetchingExpenses(expenses));
  };
};

export const postExpenses = (obj) => {
  return async (dispatch) => {
    const addingExpenses = async () => {
      const response = await axios.post(
        "https://expensetracker-0574-default-rtdb.firebaseio.com/expenses.json",
        obj
      );

      if (response.status === 200) {
        console.log(response.data);
        return response.data;
      }
    };
    const data = await addingExpenses();
    console.log(data);
    dispatch(expenseActions.addExpense({ id: data.name, ...obj }));
  };
};

export const deleteExpense = (id) => {
  return async (dispatch) => {
    const deleteingExpense = async () => {
      const response = axios.delete(
        `https://expensetracker-0574-default-rtdb.firebaseio.com/expenses/${id}.json`
      );
      if( response.status===200){
        console.log(response.data);
      }
    };
    await deleteingExpense()
    dispatch(expenseActions.deleteExpense(id))
  };
};

export const updateExpense=(data)=>{
  return async (dispatch)=>{
    const updatingExpense=async()=>{
      const response=await axios.put(
        `https://expensetracker-0574-default-rtdb.firebaseio.com/expenses/${data.id}.json`,
        {
          amount: data.amount,
          description: data.description,
          category: data.category,
        }
      );
      if(response.status){
        console.log(response.data);
      }
    }
    await updatingExpense()
    dispatch(expenseActions.updateExpense(data))
  }
}
