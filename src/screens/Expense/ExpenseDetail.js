import React from 'react';

import {Text, View, StyleSheet} from 'react-native';
import {Divider} from 'native-base';

import GeneralHeader from '../../components/GeneralHeader';
import MainViewWrapper from '../../components/MainViewWrapper';
import SubContainer from '../../components/SubContainer';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import moment from 'moment';

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
          <View style={styles.listContainer}>
            <Text style={styles.listText}>Status</Text>
            <Text style={styles.listMainText}>
              {transactionType === 'Debit' ? 'Income' : 'Expense'}
            </Text>
          </View>
          <View style={styles.listContainer}>
            <Text style={styles.listText}>
              {transactionType === 'Debit' ? 'From' : 'To'}
            </Text>
            <Text style={styles.listMainText}>{name}</Text>
          </View>
          <View style={styles.listContainer}>
            <Text style={styles.listText}>Time</Text>
            <Text style={styles.listMainText}>
              {' '}
              {moment.utc(date).local().fromNow()}
            </Text>
          </View>
          <View style={styles.listContainer}>
            <Text style={styles.listText}>Date</Text>
            <Text style={styles.listMainText}>
              {moment().format('MMM Do YYYY')}
            </Text>
          </View>
          <View style={styles.listContainer}>
            <Text style={styles.listText}>Reason</Text>
            <Text style={styles.listMainText}>{reason}</Text>
          </View>
          <Divider width={widthPercentageToDP(90)} />
          <View style={styles.listContainer}>
            <Text style={styles.listText}>
              {' '}
              {transactionType === 'Debit' ? 'Earnings' : 'Spending'}
            </Text>
            <Text style={styles.listMainText}>{`PKR ${amount}`}</Text>
          </View>
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
