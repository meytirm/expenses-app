import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import {useContext} from "react";
import {ExpensesContext} from "../store/expenses/expenses-context";
import {getDateMinusDays} from "../utils/date";
import LoadingOverlay from "../components/common/LoadingOverlay";

function RecentExpenses() {
  const expensesContext = useContext(ExpensesContext)
  if (!expensesContext) {
    throw new Error('ExpensesContext is not provided')
  }
  const {expenses, loading} = expensesContext
  const recentExpenses = expenses
    .filter((expense) => {
      const today = new Date()
      const dateSevenDaysAgo = getDateMinusDays(today, 7)

      return expense.date > dateSevenDaysAgo
    })

  if (loading) {
    return <LoadingOverlay />
  }
  return <ExpensesOutput
    expenses={recentExpenses}
    periodName="Last 7 Days"
    fallbackMessage="No expenses found for the last 7 days"
  />
}

export default RecentExpenses