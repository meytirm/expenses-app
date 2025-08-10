import {View} from "react-native";
import ExpensesList from "./ExpensesList";
import ExpensesSummary from "./ExpensesSummary";
import {ExpenseInterface} from "../../types";

function ExpensesOutput({expenses, periodName}: Props) {
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
    }
  ]
  return (
    <View>
      <ExpensesSummary periodName={periodName} expenses={DUMMY_EXPENSES}/>
      <ExpensesList expenses={expenses}/>
    </View>
  )
}

export default ExpensesOutput

interface Props {
  expenses: []
  periodName: string
}