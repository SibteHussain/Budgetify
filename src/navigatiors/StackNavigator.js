import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import OnboardingScreen from '../screens/onboarding/OnboardingScreen';
import HomeScreen from '../screens/home/HomeScreen';
import RegisterScreen from '../screens/onboarding/RegisterScreen';
import AddExpenseScreen from '../screens/addExpense/AddExpenseScreen';
import ShowExpenseScreen from '../screens/showExpense/ShowExpenseScreen';
const Stack = createStackNavigator();

const MyStack = () => {
  return (
    <Stack.Navigator
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
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="AddExpense" component={AddExpenseScreen} />
      <Stack.Screen name="showExpense" component={ShowExpenseScreen} />
    </Stack.Navigator>
  );
};
export default MyStack;
