import {FlatList} from "react-native";
import {ExpenseInterface} from "../../types/expense";
import ExpenseItem from "./ExpenseItem";

function renderExpenseItem(item: ExpenseInterface) {
  return <ExpenseItem expense={item} />
}

function ExpensesList({expenses}: Props) {
  return <FlatList
    data={expenses}
    renderItem={(itemData) => renderExpenseItem(itemData.item)}
    keyExtractor={(item) => item.id}
  />

}

export default ExpensesList

interface Props {
  expenses: ExpenseInterface[]
}