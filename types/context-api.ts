import {ExpenseInterface} from "./expense";

export interface ExpenseContextInterface {
  expenses: ExpenseInterface[],
  addExpense: (expense: Omit<ExpenseInterface, 'id'>) => void
  deleteExpense: (expenseId: string) => void
  updateExpense: (expense: ExpenseInterface) => void
}

export type ActionType =
  { type: 'ADDED', payload: Omit<ExpenseInterface, 'id'> } |
  { type: 'DELETED', payload: string } |
  { type: 'UPDATED', payload: ExpenseInterface }