import React, {useState, useEffect} from 'react';
import {Text, FlatList, StyleSheet} from 'react-native';
import MainViewWrapper from '../../components/MainViewWrapper';
import GeneralHeader from '../../components/GeneralHeader';
import {useAppStateProvider} from '../../components/providers/AppStateProvider';
import TransactionCard from '../../components/home/TransactionCard';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {View} from 'native-base';
import NoDataAvailable from '../../components/NoDataAvailable';

const BeneficaryTransactions = ({route}) => {
  const {id, navigate} = route.params;

  const {expenses} = useAppStateProvider();
  const [filteredExpenses, setFilteredExpenses] = useState(expenses);
  useEffect(() => {
    const filtered = expenses.filter(expense => {
      return expense.payeeId === id;
    });
    setFilteredExpenses(filtered);
  }, [expenses, id]);
  const renderItem = ({item}) => {
    return (
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
  };
  return (
    <MainViewWrapper statusBgColor={'#6947cc'}>
      <GeneralHeader bgColor={'#6947cc'} title={'TRANSACTIONS'} />
      <View style={styles.topContainer}>
        <View style={styles.textWrap}>
          <Text style={styles.text}>Transactions by this user</Text>
        </View>
      </View>
      {filteredExpenses.length > 0 ? (
        <FlatList
          data={filteredExpenses}
          renderItem={renderItem}
          key={item => item.id.toString()}
        />
      ) : (
        <NoDataAvailable />
      )}
    </MainViewWrapper>
  );
};
const styles = StyleSheet.create({
  text: {color: '#fff', fontFamily: 'inter_semibold', fontSize: 18},
  topContainer: {
    backgroundColor: '#6947cc',
    width: widthPercentageToDP(100),
    alignItems: 'center',
    paddingBottom: '3%',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-around',
    width: widthPercentageToDP(90),
  },
  textWrap: {
    backgroundColor: '#431cb8',
    padding: 15,
    borderRadius: 15,
  },
});
export default BeneficaryTransactions;
