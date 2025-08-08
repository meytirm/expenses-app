import {View} from "react-native";
import ExpensesList from "./ExpensesList";
import ExpensesSummary from "./ExpensesSummary";

function ExpensesOutput({expenses}: Props) {
  return <View>
    <ExpensesSummary periodName={periodName} expenses={expenses} />
    <ExpensesList expenses={expenses} />
  </View>
}

export default ExpensesOutput

interface Props {
  expenses: []
}