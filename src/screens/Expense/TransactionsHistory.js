import React from 'react';

import {Text, View, StyleSheet} from 'react-native';
import {Divider} from 'native-base';

import GeneralHeader from '../../components/GeneralHeader';
import MainViewWrapper from '../../components/MainViewWrapper';
import SubContainer from '../../components/SubContainer';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import moment from 'moment';
import ExpenseListItem from '../../components/Expense/ExpenseListItem';
import TransactionsCard from '../../components/Expense/Transactions Card';

const TransactionsHistory = () => {
  return (
    <MainViewWrapper statusBgColor={'#6947cc'}>
      <GeneralHeader bgColor={'#6947cc'} title={'HISTORY'} />
      <View style={styles.topContainer}>
        <TransactionsCard></TransactionsCard>
      </View>
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
