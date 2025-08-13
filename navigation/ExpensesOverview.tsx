import {GlobalStyles} from "../constants/styles";
import IconButton from "../components/common/IconButton";
import RecentExpenses from "../screens/RecentExpenses";
import {Ionicons} from "@expo/vector-icons";
import AllExpenses from "../screens/AllExpenses";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {RootStackParamList} from "../types";

const BottomTabs = createBottomTabNavigator<RootStackParamList>()

function ExpensesOverview() {
  return (
    <BottomTabs.Navigator
      screenOptions={({navigation}) => ({
        headerStyle: {backgroundColor: GlobalStyles.colors.primary500},
        headerTintColor: GlobalStyles.colors.white,
        tabBarStyle: {backgroundColor: GlobalStyles.colors.primary500},
        tabBarActiveTintColor: GlobalStyles.colors.accent500,
        headerRight: ({tintColor}) => {
          return (
            <IconButton icon="add" onPress={() => {
              navigation.navigate('ManageExpense', {})
            }} size={24} color={tintColor} />
          )
        }
      })}
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
          title: 'All Expenses',
          tabBarLabel: 'All',
          tabBarIcon: ({color, size}) =>
            <Ionicons name="calendar" size={size} color={color}/>
        }}
      />
    </BottomTabs.Navigator>
  )
}
export default ExpensesOverview