import {Alert, StyleSheet, Text, View} from "react-native";
import UiInput from "../common/UiInput";
import {useState} from "react";
import UiButton from "../common/UiButton";
import {ExpenseInputFormValues, ExpenseInterface} from "../../types/expense";
import {getFormattedDate} from "../../utils/date";

function ExpenseForm({onCancel, submitButtonLabel, onSubmit, defaultValues}: Props) {
  const [inputs, setInputs] = useState({
    amount: {
      value: defaultValues ? defaultValues.amount.toString() : '',
      isValid: true,
    },
    date: {
      value: defaultValues ? getFormattedDate(defaultValues.date) : '',
      isValid: true,
    },
    description: {
      value: defaultValues ? defaultValues.description : '',
      isValid: true
    },
  })

  function inputChangedHandler(inputIdentifier: keyof typeof inputs, enteredValue: string) {
    setInputs((currentInputs) => {
      return {
        ...currentInputs,
        [inputIdentifier]: {value: enteredValue, isValid: true}
      }
    })
  }

  function submitHandler() {
    const expenseData = {
      amount: +inputs.amount.value,
      date: new Date(inputs.date.value),
      description: inputs.description.value,
    }

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0
    const dateIsValid = expenseData.date.toString() !== 'Invalid Date'
    const descriptionIsValid = expenseData.description.trim().length > 0

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      setInputs((currentInputs) => {
        return {
          amount: {
            value: currentInputs.amount.value, isValid: amountIsValid
          },
          date: {
            value: currentInputs.date.value, isValid: dateIsValid
          },
          description: {
            value: currentInputs.description.value, isValid: descriptionIsValid
          }
        }
      })
      return
    }
    onSubmit(expenseData)
  }

  const formIsInvalid =
    !inputs.amount.isValid ||
    !inputs.date.isValid ||
    !inputs.description.isValid

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <UiInput
          style={styles.rowInput}
          label="Amount"
          textInputConfig={{
            value: inputs.amount.value,
            onChangeText: (value) => inputChangedHandler('amount', value),
            keyboardType: 'decimal-pad'
          }}
        />
        <UiInput
          style={styles.rowInput}
          label="Date"
          textInputConfig={{
            value: inputs.date.value,
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: (value) => inputChangedHandler('date', value),
          }}
        />
      </View>
      <UiInput
        label="Description"
        textInputConfig={{
          multiline: true,
          value: inputs.description.value,
          onChangeText: (value) => inputChangedHandler('description', value),
        }}
      />
      {
        formIsInvalid &&
          <Text> Invalid input values - please check your entered data </Text>
      }
      <View style={styles.buttons}>
        <UiButton
          style={styles.button}
          mode="flat"
          onPress={onCancel}>
          Cancel
        </UiButton>
        <UiButton
          style={styles.button}
          onPress={submitHandler}>
          {submitButtonLabel}
        </UiButton>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  form: {
    marginTop: 60,
  },
  inputsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  rowInput: {
    flex: 1
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
})

export default ExpenseForm

interface Props {
  onCancel: () => void
  submitButtonLabel: string
  defaultValues?: ExpenseInterface
  onSubmit: (value: ExpenseInputFormValues) => void
}