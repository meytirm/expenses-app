import {StyleSheet, View} from "react-native";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootStackParamList} from "../types";
import {useContext, useLayoutEffect} from "react";
import IconButton from "../components/common/IconButton";
import {GlobalStyles} from "../constants/styles";
import {ExpensesContext} from "../store/expenses/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import {ExpenseInputFormValues} from "../types/expense";
import {createExpense, deleteExpense, updateExpense} from "../service/expense";

type MealsOverviewProps = NativeStackScreenProps<RootStackParamList, 'ManageExpense'>;

function ManageExpense({navigation, route}: MealsOverviewProps) {
  const expenseContext = useContext(ExpensesContext)
  const editedExpenseId = route.params?.expenseId
  const isEditing = !!editedExpenseId

  const selectedExpense = expenseContext?.expenses
    .find((expense => expense.id === editedExpenseId))

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense'
    })
  }, [navigation, isEditing]);

  async function handleDeleteExpense() {
    if (expenseContext && editedExpenseId) {
      try {
        await deleteExpense(editedExpenseId)
        expenseContext.deleteExpense(editedExpenseId)
      } catch (e) {
        console.log(e)
      }
    }
    navigation.goBack()
  }

  function handleOnCancel() {
    navigation.goBack()
  }

  async function handleOnSubmit(expenseData: ExpenseInputFormValues) {
    if (!expenseContext) return;
    if (isEditing) {
      try {
        await updateExpense(editedExpenseId, expenseData)
        expenseContext.updateExpense({
          id: editedExpenseId,
          ...expenseData
        })
      } catch (e) {
        console.log(e)
      }
    } else {
      try {
        const response = await createExpense(expenseData)
        const id = response.data.name
        expenseContext.addExpense({...expenseData, id})
      } catch (e) {
        console.log(e)
      }
    }
    navigation.goBack()
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        submitButtonLabel={isEditing ? 'Update' : 'Add'}
        defaultValues={selectedExpense}
        onCancel={handleOnCancel}
        onSubmit={handleOnSubmit}
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