import {StyleSheet, View} from "react-native";
import ExpensesList from "./ExpensesList";
import ExpensesSummary from "./ExpensesSummary";
import {ExpenseInterface} from "../../types/expense";
import {GlobalStyles} from "../../constants/styles";

function ExpensesOutput({periodName}: Props) {
  return (
    <View style={styles.container}>
      <ExpensesSummary periodName={periodName} expenses={DUMMY_EXPENSES}/>
      <ExpensesList expenses={DUMMY_EXPENSES}/>
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
  periodName: string
}