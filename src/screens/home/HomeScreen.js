import {Text, View} from 'native-base';
import React, {useState} from 'react';
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
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const {navigate} = navigation;
  const {expenses} = useAppStateProvider();

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
          setSelectedDate(moment(selectedDate).format('YYYY-MM-DDTHH:mm:ssZ'));
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
