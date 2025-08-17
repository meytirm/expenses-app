import {get, post} from "./http";
import {ExpenseCreateResponse, ExpenseInterface} from "../types/expense";
import {AxiosResponse} from "axios";

export function createExpense(expense: Omit<ExpenseInterface, 'id'>) {
  return post<ExpenseCreateResponse, Omit<ExpenseInterface, 'id'>>('/expenses.json', expense)
}

export function findAllExpenses() {
  return get('/expenses.json')
}