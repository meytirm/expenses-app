import {FlatList} from "react-native";

function ExpensesList({expenses}: Props) {
  return <FlatList data={expenses} renderItem={} keyExtractor={}/>

}

export default ExpensesList

interface Props {
  expenses: []
}