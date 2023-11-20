import React, {useContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CreateAppStateProviderContext = React.createContext();

export function useAppStateProvider() {
  const state = useContext(CreateAppStateProviderContext);

  if (!state) {
    throw new Error('AppStateProvider must be used within AppStateProvider');
  }

  return state;
}
const AppStateProvider = ({children}) => {
  const [expenses, setExpenses] = useState([]);
  const [payees, setPayees] = useState([]);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const savedExpenses = await AsyncStorage.getItem('expenses');
        const currentExpenses = JSON.parse(savedExpenses);
        setExpenses(currentExpenses || []); // Set to an empty array if null or undefined
      } catch (error) {
        console.error('Error fetching user data:', error);
        setExpenses([]); // Set to an empty array in case of an error
      }
    };

    const fetchPayees = async () => {
      try {
        const savedPayees = await AsyncStorage.getItem('payees'); // Fix the typo here
        const currentPayees = JSON.parse(savedPayees);
        setPayees(currentPayees || []); // Set to an empty array if null or undefined
      } catch (error) {
        console.error('Error fetching payees data:', error);
        setPayees([]); // Set to an empty array in case of an error
      }
    };

    const fetchIncome = async () => {
      try {
        const savedIncome = await AsyncStorage.getItem('income'); // Fix the typo here
        const currentIncome = JSON.parse(savedIncome);
        setIncome(currentIncome || 0); // Set to an empty array if null or undefined
      } catch (error) {
        console.error('Error fetching payees data:', error);
        setIncome(0); // Set to an empty array in case of an error
      }
    };

    const fetchExpense = async () => {
      try {
        const savedExpense = await AsyncStorage.getItem('expense'); // Fix the typo here
        const currentExpense = JSON.parse(savedExpense);
        setExpense(currentExpense || 0); // Set to an empty array if null or undefined
      } catch (error) {
        console.error('Error fetching payees data:', error);
        setExpense(0); // Set to an empty array in case of an error
      }
    };

    fetchData(); // Call the function immediately when the component mounts
    fetchPayees();
    fetchIncome();
    fetchExpense();

    // Note: If you want to run this effect whenever 'expenses' change, remove the dependency array altogether
  }, []); // Empty dependency array ensures that the effect runs only once when the component mounts.

  const providerValue = {
    expenses,
    setExpenses,

    payees,
    setPayees,

    income,
    setIncome,

    expense,
    setExpense,
  };
  return (
    <CreateAppStateProviderContext.Provider value={providerValue}>
      {children}
    </CreateAppStateProviderContext.Provider>
  );
};

export default AppStateProvider;
