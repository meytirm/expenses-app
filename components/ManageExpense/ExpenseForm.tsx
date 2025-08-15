import {StyleSheet, Text, View} from "react-native";
import UiInput from "../common/UiInput";
import {useState} from "react";
import UiButton from "../common/UiButton";

function ExpenseForm({onCancel, onSubmit, submitButtonLabel}: Props) {
  const [inputValues, setInputValues] = useState({
    amount: '',
    date: '',
    description: ''
  })

  function inputChangedHandler(inputIdentifier: keyof typeof inputValues, enteredValue: string) {
    setInputValues((currentInputValues) => {
      return {
        ...currentInputValues,
        [inputIdentifier]: enteredValue
      }
    })
  }

  function submitHandler() {
    onSubmit()
  }

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <UiInput
          style={styles.rowInput}
          label="Amount"
          textInputConfig={{
            value: inputValues.amount,
            onChangeText: (value) => inputChangedHandler('amount', value),
            keyboardType: 'decimal-pad'
          }}
        />
        <UiInput
          style={styles.rowInput}
          label="Date"
          textInputConfig={{
            value: inputValues.date,
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
          value: inputValues.description,
          onChangeText: (value) => inputChangedHandler('description', value),
        }}
      />
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
}