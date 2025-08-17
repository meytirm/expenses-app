import {ExpenseInterface} from "./expense";

export interface ExpenseContextInterface {
  expenses: ExpenseInterface[],
  addExpense: (expense: ExpenseInterface) => void
  deleteExpense: (expenseId: string) => void
  updateExpense: (expense: ExpenseInterface) => void
  readExpense: (expenses: ExpenseInterface[]) => void
}

export type ActionType =
  { type: 'ADDED', payload: ExpenseInterface } |
  { type: 'DELETED', payload: string } |
  { type: 'UPDATED', payload: ExpenseInterface } |
  { type: 'READ', payload: ExpenseInterface[] }