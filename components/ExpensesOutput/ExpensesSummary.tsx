import {Text, View} from "react-native";
import {ExpenseInterface} from "../../types";

function ExpensesSummary({periodName, expenses}: Props) {
  const expensesSum = expenses.reduce((accumulator, expense) => {
    return accumulator + expense.amount
  }, 0)
  return <View>
    <Text>{periodName}</Text>
    <Text>${expensesSum.toFixed(2)}</Text>
  </View>
}

export default ExpensesSummary

interface Props {
  periodName: string
  expenses: ExpenseInterface[]
}