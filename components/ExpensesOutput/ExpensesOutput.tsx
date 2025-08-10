import {StyleSheet, View} from "react-native";
import ExpensesList from "./ExpensesList";
import ExpensesSummary from "./ExpensesSummary";
import {ExpenseInterface} from "../../types";
import {GlobalStyles} from "../../constants/styles";

function ExpensesOutput({periodName}: Props) {
  const DUMMY_EXPENSES: ExpenseInterface[] = [
    {
      id: 'e1',
      description: 'a pair of shoes',
      amount: 85.99,
      date: new Date('2021-12-19')
    },
    {
      id: 'e2',
      description: 'a pair of trousers',
      amount: 15.99,
      date: new Date('2022-05-30')
    },
    {
      id: 'e3',
      description: 'Some bananas',
      amount: 1.29,
      date: new Date('203-12-01')
    },
    {
      id: 'e4',
      description: 'Some bananas',
      amount: 1.29,
      date: new Date('203-12-01')
    },
    {
      id: 'e5',
      description: 'Some bananas',
      amount: 1.29,
      date: new Date('203-12-01')
    },
    {
      id: 'e6',
      description: 'Some bananas',
      amount: 1.29,
      date: new Date('203-12-01')
    },

  ]
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