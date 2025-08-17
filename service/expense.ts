import {del, get, post, put} from "./http";
import {ExpenseCreateResponse, ExpenseInterface, ExpensesFindAllResponse} from "../types/expense";

export function createExpense(expense: Omit<ExpenseInterface, 'id'>) {
  return post<ExpenseCreateResponse, Omit<ExpenseInterface, 'id'>>('/expenses.json', expense)
}

export function findAllExpenses() {
  return get<ExpensesFindAllResponse>('/expenses.json')
}

export function deleteExpense(id: string) {
  return del(`/expenses/${id}.json`)
}

export function updateExpense(id: string, expense: Omit<ExpenseInterface, 'id'>) {
  return put(`/expenses/${id}.json`, expense)
}
