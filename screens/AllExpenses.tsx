import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import {useContext} from "react";
import {ExpensesContext} from "../store/expenses/expenses-context";

function AllExpenses() {
  const expensesContext = useContext(ExpensesContext)
  const expenses = expensesContext ? expensesContext.expenses : []
  return <ExpensesOutput expenses={expenses} periodName="Total" />
}

export default AllExpenses