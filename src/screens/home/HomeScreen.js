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
import Icon from 'react-native-vector-icons/AntDesign';

const HomeScreen = ({navigation}) => {
  const {navigate} = navigation;
  const {expenses} = useAppStateProvider();

  const renderItem = ({item}) => (
    <TransactionCard
      name={item.name}
      key={item.id}
      date={item.date}
      amount={item.amount}
      transactionType={item.transactionType}
    />
  );
  return (
    <View style={styles.mainContainer}>
      <View style={styles.topContainer}>
        <CreditCard />
        <View style={styles.transactionsContainer}>
          <Text style={styles.text}>Transaction History</Text>
        </View>
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
        <View style={styles.listContainer}>
          <Text style={styles.text}>No Previous Expenses Found</Text>
        </View>
      )}
      <TouchableOpacity onPress={() => navigate('AddExpense')}>
        <Icon name="pluscircle" size={60} color="#2F7E79" />
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
    height: heightPercentageToDP(45),
    paddingVertical: '2%',
  },
  transactionsContainer: {
    width: widthPercentageToDP(90),
    marginTop: '2%',
  },
  text: {
    color: '#fff',
    fontFamily: 'inter_semibold',
    fontSize: 18,
  },
  topContainer: {
    backgroundColor: '#429690',
    width: widthPercentageToDP(100),
    alignItems: 'center',
  },
});
export default HomeScreen;
