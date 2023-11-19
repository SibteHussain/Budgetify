import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Text, View, StyleSheet} from 'react-native';
import {heightPercentageToDP} from 'react-native-responsive-screen';

const ShowExpenseScreen = () => {
  const [expense, setExpense] = useState([]);

  useEffect(() => {
    getUser();
  }, []); // Empty dependency array ensures that the effect runs only once when the component mounts.

  const getUser = async () => {
    try {
      const savedUser = await AsyncStorage.getItem('expenses');
      const currentUser = JSON.parse(savedUser);
      setExpense(currentUser);
    } catch (error) {
      console.log(error);
    }
  };
  console.log('expense=====', expense);
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.text}>{expense.name ? expense.name : 'No name'}</Text>
      <Text style={styles.text}>
        {expense.amount ? expense.amount : 'null'}
      </Text>
      <Text style={styles.text}>{expense.reason ? expense.reason : 'N/A'}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    alignItems: 'center',
    backgroundColor: 'red',
    height: heightPercentageToDP(100),
  },
  text: {color: '#000', fontFamily: 'inter_bold', fontSize: 45},
});
export default ShowExpenseScreen;
