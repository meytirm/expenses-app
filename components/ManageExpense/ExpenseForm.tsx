import {StyleSheet, Text, View} from "react-native";
import UiInput from "../common/UiInput";

function ExpenseForm() {

  function changeAmountHandler(amount: string) {

  }

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <UiInput
          style={styles.rowInput}
          label="Amount"
          textInputConfig={{
            value: '',
            onChangeText: changeAmountHandler,
            keyboardType: 'decimal-pad'
          }}
        />
        <UiInput
          style={styles.rowInput}
          label="Date"
          textInputConfig={{
            value: '',
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: () => {
            }
          }}
        />
      </View>
      <UiInput
        label="Description"
        textInputConfig={{
          multiline: true,
          value: "",
          onChangeText: () => {
          },
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