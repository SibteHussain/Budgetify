import {Text, View} from 'native-base';
import React, {useState, useEffect} from 'react';
import {FlatList, Image, StyleSheet, TouchableOpacity} from 'react-native';
import CreditCard from '../../components/home/CreditCard';
import TransactionCard from '../../components/home/TransactionCard';
import {useAppStateProvider} from '../../components/providers/AppStateProvider';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

const HomeScreen = ({navigation}) => {
  const {navigate} = navigation;
  const {expenses} = useAppStateProvider();

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
      <Text style={styles.headingText}>Budgetify</Text>
      <CreditCard />
      <View style={styles.transactionsContainer}>
        <Text style={styles.text}>Transaction History</Text>
      </View>
      {expenses.length > 0 ? (
        <View style={styles.listContainer}>
          <FlatList
            data={expenses}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
          />
        </View>
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
  headingText: {color: '#000', fontFamily: 'inter_semibold', fontSize: 25},
  listContainer: {
    maxHeight: heightPercentageToDP(40),
    paddingVertical: '2%',
  },
  transactionsContainer: {
    width: widthPercentageToDP(90),
    marginTop: '2%',
  },
  text: {
    color: '#000',
    fontFamily: 'inter_semibold',
    fontSize: 18,
  },
});
export default HomeScreen;
