import {View} from "react-native";
import UiInput from "../common/UiInput";

function ExpenseForm() {

  function changeAmountHandler(amount: string) {

  }

  return (
    <View>
      <UiInput
        textInputConfig={{
          label: "Amount",
          value: '',
          onChangeText: changeAmountHandler,
          keyboardType: 'decimal-pad'
        }}
      />
      <UiInput
        textInputConfig={{
          value: '',
          label: "Date",
          placeholder: "YYYY-MM-DD",
          maxLength: 10,
          onChangeText: () => {
          }
        }}
      />
      <UiInput
        textInputConfig={{
          multiline: true,
          label: "Description",
          value: "",
          onChangeText: () => {
          },
        }}
      />
    </View>
  )
}

export default ExpenseForm