import {FlatList, SectionListRenderItemInfo, Text} from "react-native";
import {ExpenseInterface} from "../../types";

function renderExpenseItem(item: ExpenseInterface) {
  return <Text>{item.description}</Text>
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