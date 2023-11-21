import React, {useState, useEffect} from 'react';
import {useFormik} from 'formik';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {Divider, Input, Select} from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AddPayee from '../../components/Payee/AddPayee';
import {useAppStateProvider} from '../../components/providers/AppStateProvider';
import GeneralHeader from '../../components/GeneralHeader';
import MainViewWrapper from '../../components/MainViewWrapper';
import SubContainer from '../../components/SubContainer';
import {widthPercentageToDP} from 'react-native-responsive-screen';

const ExpenseDetail = ({route}) => {
  const {name, amount, transactionType, date, reason} = route.params;

  return (
    <MainViewWrapper statusBgColor={'#6947cc'}>
      <GeneralHeader bgColor={'#6947cc'} title={'EXPENSE DETAIL'} />
      <SubContainer>
        {/* <View
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            backgroundColor:
              transactionType === 'Debit' ? '#438883' : '#F95B51',
            opacity: 0.7, // Adjust the opacity as needed (0 to 1)
          }}>
          <Text
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              ...styles.listText,
              color: transactionType === 'Debit' ? '#438883' : 'red',
              opacity: 1,
            }}>
            {transactionType === 'Debit' ? 'Income' : 'Expense'}
          </Text>
        </View> 
        // eslint-disable-next-line react-native/no-inline-styles*/}
        <View
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            marginTop: '5%',
            width: widthPercentageToDP(90),
            justifyContent: 'space-between',
            height: '50%',
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
            <Text style={styles.listText}>Date</Text>
            <Text style={styles.listMainText}>{date}</Text>
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
