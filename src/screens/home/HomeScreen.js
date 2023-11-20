import {Text, View} from 'native-base';
import React, {useState, useEffect} from 'react';
import {FlatList, Image, StyleSheet, TouchableOpacity} from 'react-native';
import CreditCard from '../../components/home/CreditCard';
import TransactionCard from '../../components/home/TransactionCard';
import {useAppStateProvider} from '../../components/providers/AppStateProvider';

const HomeScreen = ({navigation}) => {
  const {navigate} = navigation;
  const {expenses, setExpenses} = useAppStateProvider();

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
      {expenses !== null ? (
        <FlatList
          data={expenses}
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
  text: {color: '#000', fontFamily: 'inter_semibold', fontSize: 25},
});
export default HomeScreen;
