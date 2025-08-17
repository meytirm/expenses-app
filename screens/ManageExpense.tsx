import {StyleSheet, View} from "react-native";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootStackParamList} from "../types";
import {useContext, useLayoutEffect, useState} from "react";
import IconButton from "../components/common/IconButton";
import {GlobalStyles} from "../constants/styles";
import {ExpensesContext} from "../store/expenses/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import {deleteExpense} from "../service/expense";
import LoadingOverlay from "../components/common/LoadingOverlay";
import {useHandleSubmit} from "../hooks/ManageExpense/useHandleSubmit";
import ErrorOverlay from "../components/common/ErrorOverlay";

type MealsOverviewProps = NativeStackScreenProps<RootStackParamList, 'ManageExpense'>;

function ManageExpense({navigation, route}: MealsOverviewProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const expenseContext = useContext(ExpensesContext)
  if (!expenseContext) {
    throw new Error('ExpensesContext is not provided')
  }
  const editedExpenseId = route.params?.expenseId
  const isEditing = !!editedExpenseId
  const {handleOnSubmit, submitLoading, submitError, setSubmitError} = useHandleSubmit(isEditing, editedExpenseId, navigation)

  const selectedExpense = expenseContext.expenses
    .find((expense => expense.id === editedExpenseId))

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense'
    })
  }, [navigation, isEditing]);

  async function handleDeleteExpense() {
    setLoading(true)
    if (expenseContext && editedExpenseId) {
      try {
        await deleteExpense(editedExpenseId)
        expenseContext.deleteExpense(editedExpenseId)
      } catch {
        setError('Could not delete expense!')
      } finally {
        setLoading(false)
      }
    }
    navigation.goBack()
  }

  function handleOnCancel() {
    navigation.goBack()
  }

  if (loading || submitLoading) {
    console.log('loading', loading)
    console.log('submitLoading', submitLoading)
    return <LoadingOverlay />
  }

  if (error || submitError) {
    console.log('error', error)
    console.log('submitError', submitError)
    return <ErrorOverlay message={error ? error : submitError} onConfirm={() => {
      setError(null)
      setSubmitError(null)
    }} />
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