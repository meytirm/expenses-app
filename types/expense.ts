export interface ExpenseInterface {
  id: string;
  description: string;
  amount: number;
  date: Date
}

export interface ExpenseInputFormValues {
  description: string;
  amount: number;
  date: Date;
}

export interface ExpenseCreateResponse {
  name: string
}

export interface ExpensesFindAllResponse {
    [id: string]: Omit<ExpenseInterface, 'id'>
}