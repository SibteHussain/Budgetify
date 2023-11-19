import React, {useState, useEffect} from 'react';
import {useFormik} from 'formik';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {FormControl, Input, Modal, Select} from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AddPayee from '../../components/Payee/AddPayee';

const AddExpenseScreen = () => {
  const [showModal, setShowModal] = useState(false);
  const [payees, setPayees] = useState([]);
  const formik = useFormik({
    initialValues: {
      name: '',
      amount: '',
      reason: '',
    },
    onSubmit: async values => {
      try {
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

        // Save the updated expenses array back to AsyncStorage
        await AsyncStorage.setItem('expenses', JSON.stringify(newExpenses));

        console.log('Values added');
      } catch (error) {
        console.log(error);
      }
    },
  });
  useEffect(() => {
    getPayee();
  }, []);
  const getPayee = async () => {
    try {
      const savedUser = await AsyncStorage.getItem('payees');
      const currentUser = JSON.parse(savedUser);
      setPayees(currentUser);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(payees);
  return (
    <View style={styles.mainContainer}>
      <AddPayee showModal={showModal} setShowModal={setShowModal} />
      <Text style={styles.text}>ADD EXPENSE</Text>
      <Select
        selectedValue={formik.values.name}
        minWidth="200"
        accessibilityLabel="Choose Name"
        placeholder="Choose Name"
        _selectedItem={{
          bg: 'teal.600',
        }}
        mt={1}
        onValueChange={itemValue => formik.setFieldValue('name', itemValue)}>
        {payees.map(payee => (
          <Select.Item label={payee.name} value={payee.name} key={payee.id} />
        ))}
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
