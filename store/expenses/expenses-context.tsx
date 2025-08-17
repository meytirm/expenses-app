import {createContext, ReactNode, useReducer} from "react";
import {ExpenseInterface} from "../../types/expense";
import {ExpenseContextInterface} from "../../types/context-api";
import expensesReducer from "./expenses-reducer";

export const ExpensesContext = createContext<ExpenseContextInterface | null>(null)

function ExpensesContextProvider({children}: Props) {
  const [expensesState, dispatch] = useReducer(expensesReducer, [])

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

  return (
    <ExpensesContext.Provider value={{
      expenses: expensesState,
      addExpense,
      deleteExpense,
      updateExpense,
      readExpense
    }}>
      {children}
    </ExpensesContext.Provider>
  )
}

export default ExpensesContextProvider

interface Props {
  children: ReactNode
}