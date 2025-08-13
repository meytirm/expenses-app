import {StyleSheet, View} from "react-native";
import ExpensesList from "./ExpensesList";
import ExpensesSummary from "./ExpensesSummary";
import {GlobalStyles} from "../../constants/styles";
import {ExpenseInterface} from "../../types/expense";

function ExpensesOutput({periodName, expenses}: Props) {
  return (
    <View style={styles.container}>
      <ExpensesSummary periodName={periodName} expenses={expenses}/>
      <ExpensesList expenses={expenses}/>
    </View>
  )
}

export default ExpensesOutput

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary800
  }
})

interface Props {
  periodName: string,
  expenses: ExpenseInterface[]
}