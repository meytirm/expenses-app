import {ExpenseInterface} from "../../types/expense";
import {ActionType} from "../../types/context-api";

export default function expensesReducer(state: ExpenseInterface[], action: ActionType) {
  switch (action.type) {
    case 'READ': {
      const inverted = action.payload.reverse()
      return inverted
    }
    case 'ADDED': {
      return [...state, action.payload]
    }
    case 'DELETED': {
      return state.filter((expense) => expense.id !== action.payload)
    }
    case 'UPDATED': {
      return state.map((expense) => {
        if (expense.id === action.payload.id) {
          return action.payload
        }
        return expense
      })
    }
    default: {
      return state
    }
  }
}