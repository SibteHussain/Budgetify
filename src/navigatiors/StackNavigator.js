import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import OnboardingScreen from '../screens/onboarding/OnboardingScreen';
import HomeScreen from '../screens/home/HomeScreen';
import RegisterScreen from '../screens/onboarding/RegisterScreen';
import AddExpenseScreen from '../screens/Expense/AddExpenseScreen';
import ShowExpenseScreen from '../screens/showExpense/ShowExpenseScreen';
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
      <Stack.Screen name="OnBoarding" component={OnboardingScreen} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="AddExpense" component={AddExpenseScreen} />
      <Stack.Screen name="showExpense" component={ShowExpenseScreen} />
      <Stack.Screen name="ExpenseDetail" component={ExpenseDetail} />
      <Stack.Screen
        name="BeneficiaryTransactions"
        component={BeneficaryTransactions}
      />
    </Stack.Navigator>
  );
};
export default MyStack;
