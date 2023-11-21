import React from 'react';

import {Text, View, StyleSheet} from 'react-native';
import {Divider} from 'native-base';

import GeneralHeader from '../../components/GeneralHeader';
import MainViewWrapper from '../../components/MainViewWrapper';
import SubContainer from '../../components/SubContainer';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import moment from 'moment';
import ExpenseListItem from '../../components/Expense/ExpenseListItem';

const ExpenseDetail = ({route}) => {
  const {name, amount, transactionType, date, reason} = route.params;

  return (
    <MainViewWrapper statusBgColor={'#6947cc'}>
      <GeneralHeader bgColor={'#6947cc'} title={'EXPENSE DETAIL'} />
      <SubContainer>
        <View
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            marginTop: '5%',
            width: widthPercentageToDP(90),
            justifyContent: 'space-between',
            height: '55%',
          }}>
          {/* <Text style={styles.text}>{`PKR ${amount}`}</Text> */}
          <Text style={styles.text}>Transaction Details</Text>

          <ExpenseListItem
            text="Status"
            mainText={transactionType === 'Debit' ? 'Income' : 'Expense'}
          />
          <ExpenseListItem
            text={transactionType === 'Debit' ? 'From' : 'To'}
            mainText={name}
          />
          <ExpenseListItem
            text="Time"
            mainText={moment.utc(date).local().fromNow()}
          />
          <ExpenseListItem
            text="Date"
            mainText={moment().format('MMM Do YYYY')}
          />
          <ExpenseListItem text="Reason" mainText={reason} />
          <Divider width={widthPercentageToDP(90)} />
          <ExpenseListItem
            text={transactionType === 'Debit' ? 'Earnings' : 'Spending'}
            mainText={`PKR ${amount}`}
          />
        </View>
      </SubContainer>
    </MainViewWrapper>
  );
};

const styles = StyleSheet.create({
  text: {color: '#fff', fontFamily: 'inter_semibold', fontSize: 24},
  buttonContainer: {
    borderRadius: 40,
    paddingVertical: 20,
    paddingHorizontal: 90,
    backgroundColor: '#3E7C78',
    marginTop: '2%',
  },
  listText: {
    color: '#fff',
    fontFamily: 'inter_medium',
    fontSize: 18,
  },
  listMainText: {
    color: '#000',
    fontFamily: 'inter_medium',
    fontSize: 18,
  },
  listContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default ExpenseDetail;
