import {StyleSheet, Text, View} from "react-native";
import ExpensesList from "./ExpensesList";
import ExpensesSummary from "./ExpensesSummary";
import {GlobalStyles} from "../../constants/styles";
import {ExpenseInterface} from "../../types/expense";

function ExpensesOutput({periodName, expenses, fallbackMessage}: Props) {
  let content = <Text style={styles.fallbackMessage}>{fallbackMessage}</Text>

  if (expenses && expenses.length > 0) {
    content = <ExpensesList expenses={expenses}/>

  }

  return (
    <View style={styles.container}>
      <ExpensesSummary periodName={periodName} expenses={expenses}/>
      {content}
    </View>
  )
}

export default ExpensesOutput

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary800
  },
  fallbackMessage: {
    color: GlobalStyles.colors.white,
    textAlign: 'center',
    fontSize: 16,
    marginTop: 32
  }
})

interface Props {
  periodName: string
  expenses: ExpenseInterface[]
  fallbackMessage?: string
}