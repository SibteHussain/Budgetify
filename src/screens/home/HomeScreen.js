import {Text, View} from 'native-base';
import React, {useState, useEffect} from 'react';
import {FlatList, Image, StyleSheet, TouchableOpacity} from 'react-native';
import CreditCard from '../../components/home/CreditCard';
import TransactionCard from '../../components/home/TransactionCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
const HomeScreen = ({navigation}) => {
  const {navigate} = navigation;
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
  console.log(expense);
  const renderItem = ({item}) => (
    <TransactionCard
      name={item.name}
      key={item.id}
      date={item.date}
      amount={item.amount}
    />
  );
  return (
    <View style={styles.mainContainer}>
      {/* <Image source={require('../../../assets/images/Header_bg.png')} /> */}
      <Text style={styles.text}>Budgetify</Text>
      <CreditCard />
      <Text>Transaction History</Text>
      {expense !== null ? (
        <FlatList
          data={expense.slice(0, 5)}
          renderItem={renderItem}
          // keyExtractor={item => item.id.toString()}
        />
      ) : (
        <Text style={styles.text}>No Previous Expenses Found</Text>
      )}
      <TouchableOpacity onPress={() => navigate('AddExpense')}>
        <Text>Add</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigate('showExpense')}>
        <Text>Check</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: 'center',
  },
  text: {color: '#000', fontFamily: 'inter_bold', fontSize: 45},
});
export default HomeScreen;
