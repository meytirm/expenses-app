import {createContext, ReactNode, useEffect, useReducer, useState} from "react";
import {ExpenseInterface} from "../../types/expense";
import {ExpenseContextInterface} from "../../types/context-api";
import expensesReducer from "./expenses-reducer";
import {findAllExpenses} from "../../service/expense";

export const ExpensesContext = createContext<ExpenseContextInterface | null>(null)

function ExpensesContextProvider({children}: Props) {
  const [expensesState, dispatch] = useReducer(expensesReducer, [])
  const [loading, setLoading] = useState(false)

  function readExpense(expenses: ExpenseInterface[]) {
    dispatch({type: 'READ', payload: expenses})
  }

  function addExpense(expense: ExpenseInterface) {
    dispatch({type: 'ADDED', payload: expense})
  }

  function deleteExpense(id: string) {
    dispatch({type: 'DELETED', payload: id})
  }

  function updateExpense(expense: ExpenseInterface) {
    dispatch({type: 'UPDATED', payload: expense})
  }

  useEffect(() => {
    async function fetchExpenses() {
      setLoading(true)
      try {
        const expensesMapped: ExpenseInterface[] = []
        const response = await findAllExpenses()
        Object.keys(response.data).forEach(key => {
          const expense: ExpenseInterface = {
            id: key,
            date: new Date(response.data[key].date),
            description: response.data[key].description,
            amount: response.data[key].amount,
          }
          expensesMapped.push(expense)

          readExpense(expensesMapped)
        })
      } catch (e) {
        console.log(e)
      } finally {
        setLoading(false)
      }
    }

    fetchExpenses()
  }, []);

  return (
    <ExpensesContext.Provider value={{
      expenses: expensesState,
      addExpense,
      deleteExpense,
      updateExpense,
      loading
    }}>
      {children}
    </ExpensesContext.Provider>
  )
}

export default ExpensesContextProvider

interface Props {
  children: ReactNode
}