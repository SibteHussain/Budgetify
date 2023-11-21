import React, {useState, useEffect} from 'react';
import {Text, FlatList} from 'react-native';
import MainViewWrapper from '../../components/MainViewWrapper';
import GeneralHeader from '../../components/GeneralHeader';
import {useAppStateProvider} from '../../components/providers/AppStateProvider';
import TransactionCard from '../../components/home/TransactionCard';

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
      <FlatList
        data={filteredExpenses}
        renderItem={renderItem}
        key={item => item.id.toString()}
      />
    </MainViewWrapper>
  );
};

export default BeneficaryTransactions;
