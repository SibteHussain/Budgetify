import React, {useState, useEffect} from 'react';
import {useFormik} from 'formik';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {FormControl, Input, Modal, Select} from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AddPayee from '../../components/Payee/AddPayee';
import {useAppStateProvider} from '../../components/providers/AppStateProvider';

const generateRandomId = () => {
  // Generate a random alphanumeric id, e.g., using Date.now()
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

const AddExpenseScreen = () => {
  const {expenses, setExpenses, payees} = useAppStateProvider();
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
        let updatedIncome = expenses.income ? expenses.income : 0;
        let updatedExpense = expenses.expense ? expenses.expense : 0;

        if (values.transactionType === 'Debit') {
          updatedIncome += parseFloat(formik.values.amount);
        } else if (values.transactionType === 'Credit') {
          updatedExpense += parseFloat(formik.values.amount);
        }

        // Update the formik values with the calculated values
        formik.setFieldValue('income', updatedIncome);
        formik.setFieldValue('expense', updatedExpense);

        // Retrieve existing expenses from AsyncStorage
        const existingExpensesJSON = await AsyncStorage.getItem('expenses');
        let existingExpenses = [];

        if (existingExpensesJSON) {
          existingExpenses = JSON.parse(existingExpensesJSON);
          if (!Array.isArray(existingExpenses)) {
            existingExpenses = []; // If the stored value is not an array, initialize an empty array
          }
        }

        // Add the new expense to the existing expenses array
        const newExpenses = [...existingExpenses, values];
        setExpenses(newExpenses);

        // Save the updated expenses array back to AsyncStorage
        await AsyncStorage.setItem('expenses', JSON.stringify(newExpenses));

        console.log('Values added');
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <View style={styles.mainContainer}>
      <AddPayee showModal={showModal} setShowModal={setShowModal} />
      <Text style={styles.text}>ADD EXPENSE</Text>
      <Select
        selectedValue={formik.values.name ? formik.values.name : 'N/A'}
        minWidth="200"
        accessibilityLabel="Choose Name"
        placeholder="Choose Name"
        _selectedItem={{
          bg: 'teal.600',
        }}
        mt={1}
        onValueChange={itemValue => formik.setFieldValue('name', itemValue)}>
        {payees.length > 0 ? (
          payees.map(payee => (
            <Select.Item label={payee.name} value={payee.name} key={payee.id} />
          ))
        ) : (
          <Select.Item label="N/A" value="N/A" key="N/A" />
        )}
      </Select>
      <Select
        selectedValue={formik.values.transactionType}
        minWidth={200}
        accessibilityLabel="Choose Transaction Type"
        placeholder="Choose Transaction Type"
        _selectedItem={{
          bg: 'teal.600',
        }}
        mt={1}
        onValueChange={itemValue =>
          formik.setFieldValue('transactionType', itemValue)
        }>
        <Select.Item label="Debit" value="Debit" />
        <Select.Item label="Credit" value="Credit" />
      </Select>
      <Input
        placeholder="Amount"
        maxWidth={200}
        type="number"
        value={formik.values.amount}
        onChangeText={formik.handleChange('amount')}
      />
      <Input
        placeholder="Reason"
        maxWidth={200}
        value={formik.values.reason}
        onChangeText={formik.handleChange('reason')}
      />
      <TouchableOpacity onPress={() => setShowModal(true)}>
        <View style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Add Payee</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={formik.handleSubmit}>
        <View style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Register</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: 'center',
    flex: 1,
  },
  text: {color: '#000', fontFamily: 'inter_bold', fontSize: 45},
  buttonContainer: {
    borderRadius: 40,
    paddingVertical: 20,
    paddingHorizontal: 90,
    backgroundColor: '#3E7C78',
    marginTop: '2%',
  },
});

export default AddExpenseScreen;
