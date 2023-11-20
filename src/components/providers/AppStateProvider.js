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

    fetchData(); // Call the function immediately when the component mounts

    // Note: If you want to run this effect whenever 'expenses' change, remove the dependency array altogether
  }, []); // Empty dependency array ensures that the effect runs only once when the component mounts.

  const providerValue = {
    expenses,
    setExpenses,
  };
  return (
    <CreateAppStateProviderContext.Provider value={providerValue}>
      {children}
    </CreateAppStateProviderContext.Provider>
  );
};

export default AppStateProvider;
