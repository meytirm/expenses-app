import {StyleSheet, View} from "react-native";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootStackParamList} from "../types";
import {useLayoutEffect} from "react";
import IconButton from "../components/common/IconButton";
import {GlobalStyles} from "../constants/styles";
type MealsOverviewProps = NativeStackScreenProps<RootStackParamList, 'ManageExpense'>;

function ManageExpense({navigation, route}: MealsOverviewProps) {
  const editedExpenseId = route.params?.expenseId
  const isEditing = !!editedExpenseId

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense'
    })
  }, [navigation, isEditing]);

  function handleDeleteExpense() {

  }

  return (
    <View style={styles.container}>
      {
        isEditing && (
          <View style={styles.deleteContainer}>
            <IconButton
              icon="trash"
              onPress={handleDeleteExpense}
              size={36}
              color={GlobalStyles.colors.error500}
            />
          </View>
        )
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center'
  }
})

export default ManageExpense