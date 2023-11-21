import {Text, View} from 'native-base';
import React, {useState, useEffect} from 'react';
import {FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import CreditCard from '../../components/home/CreditCard';
import TransactionCard from '../../components/home/TransactionCard';
import {useAppStateProvider} from '../../components/providers/AppStateProvider';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/AntDesign';
import MainViewWrapper from '../../components/MainViewWrapper';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';

const HomeScreen = ({navigation}) => {
  const [open, setOpen] = useState(false);
  const {navigate} = navigation;
  const {expenses, selectedDate, setSelectedDate, setIncome, setExpense} =
    useAppStateProvider();
  const [filteredExpenses, setFilteredExpenses] = useState(expenses);
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
    let totalIncome = 0;

    if (filteredExpenses.length > 0) {
      totalIncome = filteredExpenses.reduce((accumulator, expense) => {
        const amount =
          expense.transactionType === 'Debit' && parseFloat(expense.amount);
        return isNaN(amount) ? accumulator : accumulator + amount;
      }, 0);
      setIncome(totalIncome);
    }

    let totalExpense = 0;

    if (filteredExpenses.length > 0) {
      totalExpense = filteredExpenses.reduce((accumulator, expense) => {
        const amount =
          expense.transactionType === 'Credit' && parseFloat(expense.amount);
        return isNaN(amount) ? accumulator : accumulator + amount;
      }, 0);
      setExpense(totalExpense);
    }
  }, [filteredExpenses, selectedDate, setIncome, setExpense]);
  const renderItem = ({item}) => (
    <TransactionCard
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
  return (
    <MainViewWrapper statusBgColor={'#6947cc'}>
      <DatePicker
        modal
        open={open}
        date={selectedDate}
        onConfirm={input => {
          setOpen(false);
          setSelectedDate(input);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
      <View style={styles.topContainer}>
        <CreditCard />
        <View style={styles.transactionsContainer}>
          <Text style={styles.text}>Transaction History</Text>
          <TouchableOpacity onPress={() => setOpen(true)}>
            <Icon name="calendar" size={22} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
      {filteredExpenses.length > 0 ? (
        <View style={styles.listContainer}>
          <FlatList
            data={filteredExpenses}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      ) : (
        <View style={styles.listContainer}>
          <Text style={styles.text}>No Previous Expenses Found</Text>
        </View>
      )}
      <TouchableOpacity onPress={() => navigate('AddExpense')}>
        <Icon name="pluscircle" size={60} color="#6947cc" />
      </TouchableOpacity>
    </MainViewWrapper>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: 'center',
  },
  headingText: {color: '#000', fontFamily: 'inter_semibold', fontSize: 25},
  listContainer: {
    height: heightPercentageToDP(51),
    paddingVertical: '2%',
  },
  transactionsContainer: {
    width: widthPercentageToDP(90),
    marginTop: '2%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    color: '#fff',
    fontFamily: 'inter_semibold',
    fontSize: 18,
  },
  topContainer: {
    backgroundColor: '#6947cc',
    width: widthPercentageToDP(100),
    alignItems: 'center',
  },
});
export default HomeScreen;
