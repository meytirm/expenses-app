import {StyleSheet, Text, View} from "react-native";
import UiInput from "../common/UiInput";
import {useState} from "react";

function ExpenseForm() {
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
  }
})

export default ExpenseForm