import {StyleSheet, View} from "react-native";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootStackParamList} from "../types";
import {useContext, useLayoutEffect} from "react";
import IconButton from "../components/common/IconButton";
import {GlobalStyles} from "../constants/styles";
import {ExpensesContext} from "../store/expenses/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import {ExpenseInputFormValues} from "../types/expense";
import {createExpense} from "../service/expense";

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

  function handleDeleteExpense() {
    if (expenseContext && editedExpenseId) {
      expenseContext.deleteExpense(editedExpenseId)
    }
    navigation.goBack()
  }

  function handleOnCancel() {
    navigation.goBack()
  }

  async function handleOnSubmit(expenseData: ExpenseInputFormValues) {
    if (!expenseContext) return;
    if (isEditing) {
      expenseContext.updateExpense({
        id: editedExpenseId,
        ...expenseData
      })
    } else {
      try {
        await createExpense(expenseData)
      } catch (e) {
        console.log(e)
      }
      expenseContext.addExpense(expenseData)
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