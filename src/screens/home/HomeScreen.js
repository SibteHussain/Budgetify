import {Text, View} from 'native-base';
import React from 'react';
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

const HomeScreen = ({navigation}) => {
  const {navigate} = navigation;
  const {expenses} = useAppStateProvider();

  const renderItem = ({item}) => (
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
  return (
    <MainViewWrapper statusBgColor={'#6947cc'}>
      <View style={styles.topContainer}>
        <CreditCard />
        <View style={styles.transactionsContainer}>
          <Text style={styles.text}>Recent Transactions</Text>
        </View>
      </View>
      {expenses.length > 0 ? (
        <View style={styles.listContainer}>
          <FlatList
            data={expenses.slice(0, 10)}
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
