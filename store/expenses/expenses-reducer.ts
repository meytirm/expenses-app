import {ExpenseInterface} from "../../types/expense";
import {ActionType} from "../../types/context-api";

export default function expensesReducer(state: ExpenseInterface[], action: ActionType) {
  switch (action.type) {
    case 'ADDED':
      const id = new Date().toString() + Math.random().toString()
      return [...state, {...action.payload, id}]
    case 'DELETED':
      return state.filter((expense) => expense.id !== action.payload)
    case 'UPDATED':
      const expenseIndex = state.findIndex(item => item.id === action.payload.id)
      if (expenseIndex === -1) {
        return state
      }
      const updatableExpense = state[expenseIndex]
      const updatedItem = {...updatableExpense, ...action.payload}
      const updatedExpenses = [...state]
      updatedExpenses[expenseIndex] = updatedItem
      return updatedExpenses

    default:
      return state
  }
}