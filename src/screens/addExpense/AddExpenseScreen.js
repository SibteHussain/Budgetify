import React from 'react';
import {useFormik} from 'formik';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {Input, Select} from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddExpenseScreen = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      amount: '',
      reason: '',
    },
    onSubmit: async values => {
      try {
        await AsyncStorage.setItem('expenses', JSON.stringify(values));
        console.log('Values added');
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <View style={styles.mainContainer}>
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
        <Select.Item label="UX Research" value="ux" />
        <Select.Item label="Web Development" value="web" />
        <Select.Item label="Cross Platform Development" value="cross" />
        <Select.Item label="UI Designing" value="ui" />
        <Select.Item label="Backend Development" value="backend" />
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
