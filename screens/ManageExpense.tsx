import {StyleSheet, View} from "react-native";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootStackParamList} from "../types";
import {useContext, useLayoutEffect} from "react";
import IconButton from "../components/common/IconButton";
import {GlobalStyles} from "../constants/styles";
import {ExpensesContext} from "../store/expenses/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";

type MealsOverviewProps = NativeStackScreenProps<RootStackParamList, 'ManageExpense'>;

function ManageExpense({navigation, route}: MealsOverviewProps) {
  const expenseContext = useContext(ExpensesContext)
  const editedExpenseId = route.params?.expenseId
  const isEditing = !!editedExpenseId

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense'
    })
  }, [navigation, isEditing]);

  function handleDeleteExpense() {
    if (expenseContext && editedExpenseId) {
      expenseContext.deleteExpense(editedExpenseId)
    }
    navigation.goBack()
  }

  function handleOnCancel() {
    navigation.goBack()
  }

  function confirmHandler() {
    if (isEditing) {
      if (expenseContext && editedExpenseId) {
          expenseContext.updateExpense({
            id: editedExpenseId,
            description: 'edited',
            amount: 99,
            date: new Date()
          })
      } else {
      }
    } else {
      if (expenseContext) {
        expenseContext.addExpense({
          description: 'it is a test',
          amount: 0,
          date: new Date()
        })
      }
    }
    navigation.goBack()
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        submitButtonLabel={isEditing ? 'Update' : 'Add'}
        onCancel={handleOnCancel}
      />
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