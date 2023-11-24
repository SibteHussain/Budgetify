import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import HomeScreen from '../screens/home/HomeScreen';
import AddExpenseScreen from '../screens/Expense/AddExpenseScreen';
import ExpenseDetail from '../screens/Expense/ExpenseDetail';
import BeneficaryTransactions from '../screens/Beneficiaries/BeneficiaryTransactions';
const Stack = createStackNavigator();

const MyStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={'HomeScreen'}
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: '#3E7C78',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="AddExpense" component={AddExpenseScreen} />
      <Stack.Screen name="ExpenseDetail" component={ExpenseDetail} />
      <Stack.Screen
        name="BeneficiaryTransactions"
        component={BeneficaryTransactions}
      />
    </Stack.Navigator>
  );
};
export default MyStack;
