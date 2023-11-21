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

const generateRandomId = () => {
  // Generate a random alphanumeric id, e.g., using Date.now()
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

const ExpenseDetail = ({route}) => {
  const {name, amount, transactionType, date} = route.params;
  const {
    expenses,
    setExpenses,
    payees,
    expense,
    setExpense,
    income,
    setIncome,
  } = useAppStateProvider();
  console.log('expenses----', expenses);
  const [showModal, setShowModal] = useState(false);
  const formik = useFormik({
    initialValues: {
      id: generateRandomId(),
      name: '',
      amount: '',
      reason: '',
      date: new Date().toISOString().split('T')[0],
      transactionType: '',
    },
    onSubmit: async values => {
      try {
        // Update income and expense based on transactionType
        let updatedIncome = income;
        let updatedExpense = expense;

        if (values.transactionType === 'Debit') {
          updatedIncome += parseFloat(formik.values.amount);
          setIncome(updatedIncome);
        } else if (values.transactionType === 'Credit') {
          updatedExpense += parseFloat(formik.values.amount);
          setExpense(updatedExpense);
        }

        await AsyncStorage.setItem('income', JSON.stringify(updatedIncome));
        await AsyncStorage.setItem('expense', JSON.stringify(updatedExpense));

        // Retrieve existing expenses from AsyncStorage

        // Add the new expense to the existing expenses array
        const newExpenses = [...expenses, values];
        setExpenses(newExpenses);

        // Save the updated expenses array back to AsyncStorage
        await AsyncStorage.setItem('expenses', JSON.stringify(newExpenses));

        console.log('Values added');
      } catch (error) {
        console.log(error);
      }
    },
  });
  useEffect(() => {
    if (payees.length === 0) {
      setShowModal(true);
    }
  }, [payees, showModal]);

  return (
    <MainViewWrapper statusBgColor={'#6947cc'}>
      <GeneralHeader bgColor={'#6947cc'} title={name} />
      <SubContainer>
        <Text style={styles.text}>{`PKR ${amount}`}</Text>
        <Text style={styles.text}>Transaction Details</Text>
        <Text style={styles.listText}>Status</Text>
        <Text style={styles.listText}>
          {transactionType === 'Debit' ? 'Income' : 'Expense'}
        </Text>
        <Text style={styles.listText}>
          {transactionType === 'Debit' ? 'From' : 'To'}
        </Text>
        <Text style={styles.listText}>Date</Text>
        <Text style={styles.listText}>{date}</Text>
        <Divider width={widthPercentageToDP(90)} />
        <Text style={styles.listText}>
          {' '}
          {transactionType === 'Debit' ? 'Earnings' : 'Spending'}
        </Text>
        <Text style={styles.listText}>{`PKR ${amount}`}</Text>
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
});

export default ExpenseDetail;
