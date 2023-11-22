import React, {useState, useEffect} from 'react';

import {Text, View, StyleSheet, FlatList} from 'react-native';

import GeneralHeader from '../../components/GeneralHeader';
import MainViewWrapper from '../../components/MainViewWrapper';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import moment from 'moment';
import TransactionsCard from '../../components/Expense/TransactionsCard';
import TransactionTabs from '../../components/Expense/TransactionTabs';
import {useAppStateProvider} from '../../components/providers/AppStateProvider';
import TransactionCard from '../../components/home/TransactionCard';

const TransactionsHistory = ({navigation}) => {
  const {navigate} = navigation;
  const {expenses, setExpenses} = useAppStateProvider();
  const [filteredExpenses, setFilteredExpenses] = useState(expenses);
  const [selectedInterval, setSelectedInterval] = useState('daily');
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const filtered = expenses.filter(expense => {
      const expenseDate = moment(expense.date).startOf('day');
      const selectedDateFormatted = moment(selectedDate).startOf('day');
      const currentDate = moment().startOf('day');

      return (
        expenseDate.isSameOrAfter(selectedDateFormatted) &&
        expenseDate.isSameOrBefore(currentDate)
      );
    });

    setFilteredExpenses(filtered);
  }, [expenses, selectedDate]);

  useEffect(() => {
    if (selectedInterval === 'daily') {
      setSelectedDate(moment().startOf('day'));
    } else if (selectedInterval === 'weekly') {
      setSelectedDate(moment().startOf('week'));
    } else if (selectedInterval === 'monthly') {
      setSelectedDate(moment().startOf('month'));
    } else if (selectedInterval === 'yearly') {
      setSelectedDate(moment().startOf('year'));
    }
  }, [selectedInterval]);

  const renderItem = ({item}) => {
    console.log(item);
    return (
      <TransactionCard
        id={item.id}
        name={item.name}
        key={item.id}
        date={item.date}
        amount={item.amount}
        transactionType={item.transactionType}
        reason={item.reason}
        note={item.note}
        navigate={navigate}
      />
    );
  };
  return (
    <MainViewWrapper statusBgColor={'#6947cc'}>
      <GeneralHeader bgColor={'#6947cc'} title={'HISTORY'} />
      <View style={styles.topContainer}>
        <TransactionsCard />
        <TransactionTabs
          selectedInterval={selectedInterval}
          onSelectTab={setSelectedInterval}
        />
      </View>
      <FlatList
        data={filteredExpenses}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </MainViewWrapper>
  );
};

const styles = StyleSheet.create({
  text: {color: '#fff', fontFamily: 'inter_semibold', fontSize: 24},
  topContainer: {
    backgroundColor: '#6947cc',
    width: widthPercentageToDP(100),
    alignItems: 'center',
  },
});

export default TransactionsHistory;
