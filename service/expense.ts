import {post} from "./http";
import {ExpenseInterface} from "../types/expense";

export function postExpense(expense: Omit<ExpenseInterface, 'id'>) {
  return post('https://expense-app-bc386-default-rtdb.firebaseio.com/expenses.json', expense)
}