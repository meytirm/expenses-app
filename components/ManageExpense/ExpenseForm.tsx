import {StyleSheet, Text, View} from "react-native";
import UiInput from "../common/UiInput";
import {useState} from "react";
import UiButton from "../common/UiButton";
import {ExpenseInputFormValues, ExpenseInterface} from "../../types/expense";
import {getFormattedDate} from "../../utils/date";
import {GlobalStyles} from "../../constants/styles";
import DateTimePicker, {DateTimePickerAndroid, DateTimePickerEvent} from '@react-native-community/datetimepicker';

function ExpenseForm({onCancel, submitButtonLabel, onSubmit, defaultValues}: Props) {
  const [showDatePicker, setShowDatePicker] = useState(false);
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

  function onChangeDateTimePicker(event: DateTimePickerEvent, selectedDate: Date | undefined) {
    const currentDate = selectedDate;
    if (currentDate && event.type === 'set') {
      inputChangedHandler('date', getFormattedDate(currentDate))
    }
    setShowDatePicker(false);
  }


  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <UiInput
          style={styles.rowInput}
          label="Amount"
          inValid={!inputs.amount.isValid}
          textInputConfig={{
            value: inputs.amount.value,
            onChangeText: (value) => inputChangedHandler('amount', value),
            keyboardType: 'decimal-pad'
          }}
        />
        <View onTouchStart={() => setShowDatePicker(true)}>
          <UiInput
            style={styles.rowInput}
            label="Date"
            inValid={!inputs.date.isValid}
            textInputConfig={{
              value: inputs.date.value,
              placeholder: "YYYY-MM-DD",
              maxLength: 10,
              readOnly: true,
            }}
          />
        </View>
      </View>
      <UiInput
        label="Description"
        inValid={!inputs.description.isValid}
        textInputConfig={{
          multiline: true,
          value: inputs.description.value,
          onChangeText: (value) => inputChangedHandler('description', value),
        }}
      />
      {
        formIsInvalid &&
          <Text style={styles.errorText}> Invalid input values - please check your entered data </Text>
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
      {showDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={new Date()}
          mode="date"
          is24Hour={false}
          onChange={onChangeDateTimePicker}
        />
      )}
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
  errorText: {
    textAlign: 'center',
    color: GlobalStyles.colors.error500,
    margin: 8
  }
})

export default ExpenseForm

interface Props {
  onCancel: () => void
  submitButtonLabel: string
  defaultValues?: ExpenseInterface
  onSubmit: (value: ExpenseInputFormValues) => void
}