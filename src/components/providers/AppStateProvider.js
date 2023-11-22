// ... (other imports)
import React, {useContext, useEffect, useState} from 'react';
import {Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

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
  const [selectedDate, setSelectedDate] = useState(
    moment().startOf('month').toDate(),
  );
  // Correct usage of useState for initialization
  const [user, setUser] = useState({
    name: 'Guest',
    id: 0,
    email: 'sample@sample.com',
  });
  const [loading, setLoading] = useState(true);

  // Other logic and state management...

  useEffect(() => {
    const fetchData = async () => {
      try {
        const savedExpenses = await AsyncStorage.getItem('expenses');
        const currentExpenses = JSON.parse(savedExpenses);
        setExpenses(currentExpenses || []);
      } catch (error) {
        console.error('Error fetching expenses data:', error);
        setExpenses([]);
      }
    };

    const fetchPayees = async () => {
      try {
        const savedPayees = await AsyncStorage.getItem('payees');
        const currentPayees = JSON.parse(savedPayees);
        setPayees(currentPayees || []);
      } catch (error) {
        console.error('Error fetching payees data:', error);
        setPayees([]);
      }
    };

    const fetchIncome = async () => {
      try {
        const savedIncome = await AsyncStorage.getItem('income');
        const currentIncome = JSON.parse(savedIncome);
        setIncome(currentIncome || 0);
      } catch (error) {
        console.error('Error fetching income data:', error);
        setIncome(0);
      }
    };

    const fetchUser = async () => {
      try {
        const savedUser = await AsyncStorage.getItem('user');
        const currentUser = JSON.parse(savedUser);
        setUser(
          currentUser || [
            {
              name: 'Guest',
              id: 0,
              email: 'sample@sample.com',
            },
          ],
        );
      } catch (error) {
        console.error('Error fetching user data:', error);
        setUser([
          {
            name: 'Guest',
            id: 0,
            email: 'sample@sample.com',
          },
        ]);
      } finally {
        setLoading(false); // Set loading to false whether the user data is fetched successfully or not
      }
    };

    const fetchExpense = async () => {
      try {
        const savedExpense = await AsyncStorage.getItem('expense');
        const currentExpense = JSON.parse(savedExpense);
        setExpense(currentExpense || 0);
      } catch (error) {
        console.error('Error fetching expense data:', error);
        setExpense(0);
      }
    };

    // Call the functions immediately when the component mounts
    fetchUser();
    fetchData();
    fetchPayees();
    fetchIncome();
    fetchExpense();

    // Note: If you want to run this effect whenever 'expenses' change, remove the dependency array altogether
  }, []);
  useEffect(() => {
    const savePayeesToStorage = async () => {
      try {
        await AsyncStorage.setItem('payees', JSON.stringify(payees));
      } catch (error) {
        // Handle error, e.g., log it or show a notification
        console.error('Error saving payees to AsyncStorage:', error);
      }
    };

    savePayeesToStorage();
  }, [payees]);
  useEffect(() => {
    const saveExpensesToStorage = async () => {
      try {
        await AsyncStorage.setItem('expenses', JSON.stringify(expenses));
      } catch (error) {
        // Handle error, e.g., log it or show a notification
        console.error('Error saving payees to AsyncStorage:', error);
      }
    };

    saveExpensesToStorage();
  }, [expenses]);

  const providerValue = {
    expenses,
    setExpenses,
    payees,
    setPayees,
    income,
    setIncome,
    expense,
    setExpense,
    user,
    setUser,
    loading, // Add loading state to indicate whether user data is still being fetched
    selectedDate,
    setSelectedDate,
  };

  // Render loading state or children based on whether user data has been fetched
  return (
    <CreateAppStateProviderContext.Provider value={providerValue}>
      {loading ? <Text>Loading...</Text> : children}
    </CreateAppStateProviderContext.Provider>
  );
};

export default AppStateProvider;
