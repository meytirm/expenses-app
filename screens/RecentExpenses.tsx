import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import {useContext, useEffect, useState} from "react";
import {ExpensesContext} from "../store/expenses/expenses-context";
import {getDateMinusDays} from "../utils/date";
import LoadingOverlay from "../components/common/LoadingOverlay";
import {ExpenseInterface} from "../types/expense";
import {findAllExpenses} from "../service/expense";

function RecentExpenses() {
  const [loading, setLoading] = useState(false)
  const expensesContext = useContext(ExpensesContext)
  if (!expensesContext) {
    throw new Error('ExpensesContext is not provided')
  }
  const {expenses, readExpense} = expensesContext
  const recentExpenses = expenses
    .filter((expense) => {
      const today = new Date()
      const dateSevenDaysAgo = getDateMinusDays(today, 7)

      return expense.date > dateSevenDaysAgo
    })

  useEffect(() => {
    async function fetchExpenses() {
      setLoading(true)
      try {
        const expensesMapped: ExpenseInterface[] = []
        const response = await findAllExpenses()
        Object.keys(response.data).forEach(key => {
          const expense: ExpenseInterface = {
            id: key,
            date: new Date(response.data[key].date),
            description: response.data[key].description,
            amount: response.data[key].amount,
          }
          expensesMapped.push(expense)

          readExpense(expensesMapped)
        })
      } catch (e) {
        console.log(e)
      } finally {
        setLoading(false)
      }
    }

    fetchExpenses()
  }, []);

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