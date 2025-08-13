import {Text} from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import {useContext} from "react";
import {ExpensesContext} from "../store/expenses/expenses-context";
import {getDateMinusDays} from "../utils/date";

function RecentExpenses() {
  const expensesContext = useContext(ExpensesContext)
  const expenses = expensesContext ? expensesContext.expenses : []
  const recentExpenses = expenses
    .filter((expense) => {
      const today = new Date()
      const dateSevenDaysAgo = getDateMinusDays(today, 7)

      return expense.date > dateSevenDaysAgo
    })
  return <ExpensesOutput expenses={recentExpenses} periodName="Last 7 Days" />
}

export default RecentExpenses