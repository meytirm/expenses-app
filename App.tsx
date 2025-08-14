import {StatusBar} from 'expo-status-bar';
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import ManageExpense from "./screens/ManageExpense";
import {GlobalStyles} from "./constants/styles";
import {RootStackParamList} from "./types";
import ExpensesOverview from "./navigation/ExpensesOverview";
import ExpensesContextProvider from "./store/expenses/expenses-context";

const Stack = createNativeStackNavigator<RootStackParamList>()


export default function App() {
  return (
    <>
      <StatusBar style="light"/>
      <ExpensesContextProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{
            headerStyle: {backgroundColor: GlobalStyles.colors.primary500},
            headerTintColor: GlobalStyles.colors.white,
          }} >
            <Stack.Screen
              name="ExpensesOverview"
              component={ExpensesOverview}
              options={{
                headerShown: false
              }}
            />
            <Stack.Screen
              name="ManageExpense"
              component={ManageExpense}
              options={{
                presentation: 'modal'
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ExpensesContextProvider>
    </>
  );
}
