import {StyleSheet, Text, View} from "react-native";
import {ExpenseInterface} from "../../types/expense";
import {GlobalStyles} from "../../constants/styles";

function ExpensesSummary({periodName, expenses}: Props) {
  const expensesSum = expenses.reduce((accumulator, expense) => {
    return accumulator + expense.amount
  }, 0)
  return <View style={styles.container}>
    <Text style={styles.period}>{periodName}</Text>
    <Text style={styles.sum}>${expensesSum.toFixed(2)}</Text>
  </View>
}

export default ExpensesSummary

const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: GlobalStyles.colors.primary50,
    borderRadius: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  period: {
    fontSize: 12,
    color: GlobalStyles.colors.primary400,
  },
  sum: {
    fontSize: 16,
    fontWeight: 'bold',
    color: GlobalStyles.colors.primary500
  }
})

interface Props {
  periodName: string
  expenses: ExpenseInterface[]
}