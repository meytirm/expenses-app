import {StatusBar} from 'expo-status-bar';
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import ManageExpenses from "./screens/ManageExpenses";
import RecentExpenses from "./screens/RecentExpenses";
import AllExpenses from "./screens/AllExpenses";
import {GlobalStyles} from "./constants/styles";
import {Ionicons} from "@expo/vector-icons"
import IconButton from "./components/common/IconButton";

const Stack = createNativeStackNavigator()
const BottomTabs = createBottomTabNavigator()

function ExpensesOverview() {

  function handleOnPress() {

  }

  return (
    <BottomTabs.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: GlobalStyles.colors.primary500},
        headerTintColor: GlobalStyles.colors.white,
        tabBarStyle: {backgroundColor: GlobalStyles.colors.primary500},
        tabBarActiveTintColor: GlobalStyles.colors.accent500,
        headerRight: ({tintColor}) => {
          return (
            <IconButton icon="add" onPress={handleOnPress} size={24} color={tintColor} />
          )
        }
      }}
    >
      <BottomTabs.Screen
        name="RecentExpenses"
        component={RecentExpenses}
        options={{
          title: 'Recent Expenses',
          tabBarLabel: 'Recent',
          tabBarIcon: ({color, size}) =>
            <Ionicons name="hourglass" size={size} color={color}/>
        }}
      />
      <BottomTabs.Screen
        name="AllExpenses"
        component={AllExpenses}
        options={{
          title: 'Recent Expenses',
          tabBarLabel: 'Recent',
          tabBarIcon: ({color, size}) =>
            <Ionicons name="calendar" size={size} color={color}/>
        }}
      />
    </BottomTabs.Navigator>
  )
}

export default function App() {
  return (
    <>
      <StatusBar style="auto"/>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="ExpensesOverview"
            component={ExpensesOverview}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen name="ManageExpenses" component={ManageExpenses}/>
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
