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
  const {name, amount, transactionType, date, reason, note} = route.params;

  return (
    <MainViewWrapper statusBgColor={'#6947cc'}>
      <GeneralHeader bgColor={'#6947cc'} title={'EXPENSE DETAIL'} />
      <SubContainer>
        <View
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            ...styles.detailContainer,
            height: note !== '' ? '75%' : '60%',
          }}>
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
          {note !== '' && (
            <View style={styles.noteConteiner}>
              <Text style={styles.text}>Note</Text>
              <View style={styles.noteTextContainer}>
                <Text style={styles.noteText}>{note}</Text>
              </View>
            </View>
          )}
        </View>
      </SubContainer>
    </MainViewWrapper>
  );
};

const styles = StyleSheet.create({
  text: {color: '#fff', fontFamily: 'inter_semibold', fontSize: 24},
  detailContainer: {
    marginTop: '5%',
    width: widthPercentageToDP(90),
    justifyContent: 'space-between',
  },
  noteConteiner: {
    alignItems: 'center',
    width: widthPercentageToDP(90),
  },
  noteTextContainer: {
    alignItems: 'flex-start',
    width: widthPercentageToDP(90),
  },
  noteText: {
    color: '#fff',
    fontFamily: 'inter_regular',
    fontSize: 15,
  },
});

export default ExpenseDetail;
