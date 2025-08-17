import {ExpenseInputFormValues} from "../../types/expense";
import {createExpense, updateExpense} from "../../service/expense";
import {useContext, useState} from "react";
import {ExpensesContext} from "../../store/expenses/expenses-context";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {RootStackParamList} from "../../types";

type NavigationType = NativeStackNavigationProp<RootStackParamList, "ManageExpense", undefined>

export function useHandleSubmit(isEditing: boolean, editedExpenseId: string | undefined, navigation: NavigationType) {
  const expenseContext = useContext(ExpensesContext)
  const [submitLoading, setSubmitLoading] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  async function handleOnSubmit(expenseData: ExpenseInputFormValues) {
    if (!expenseContext) {
      throw new Error('ExpensesContext is not provided')
    }
    setSubmitLoading(true)
    if (isEditing && editedExpenseId) {
      try {
        await updateExpense(editedExpenseId, expenseData)
        expenseContext.updateExpense({
          id: editedExpenseId,
          ...expenseData
        })
      } catch {
        setSubmitError('Could not update expense!')
      } finally {
        setSubmitLoading(false)
      }
    } else {
      try {
        const response = await createExpense(expenseData)
        const id = response.data.name
        expenseContext.addExpense({...expenseData, id})
      } catch {
        setSubmitError('Could not create expense!')
      } finally {
        setSubmitLoading(false)
      }
    }
    navigation.goBack()
  }

  return {handleOnSubmit, submitLoading, submitError, setSubmitError}

}