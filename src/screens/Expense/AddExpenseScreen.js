import React, {useState, useEffect} from 'react';
import {useFormik} from 'formik';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {Input, Select, TextArea} from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AddPayee from '../../components/Payee/AddPayee';
import {useAppStateProvider} from '../../components/providers/AppStateProvider';
import GeneralHeader from '../../components/GeneralHeader';
import MainViewWrapper from '../../components/MainViewWrapper';
import moment from 'moment';
import SubContainer from '../../components/SubContainer';
import DatePicker from 'react-native-date-picker';
import Icon from 'react-native-vector-icons/AntDesign';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

const generateRandomId = () => {
  // Generate a random alphanumeric id, e.g., using Date.now()
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

const AddExpenseScreen = () => {
  const {
    expenses,
    setExpenses,
    payees,
    expense,
    setExpense,
    income,
    setIncome,
  } = useAppStateProvider();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const formik = useFormik({
    initialValues: {
      id: generateRandomId(),
      name: '',
      amount: '',
      reason: '',
      date: moment(selectedDate).format('YYYY-MM-DDTHH:mm:ssZ'),
      transactionType: '',
      note: '',
      payeeId: 0,
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
        const newExpenses = [values, ...expenses];
        setExpenses(newExpenses);

        // Save the updated expenses array back to AsyncStorage
        await AsyncStorage.setItem('expenses', JSON.stringify(newExpenses));
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
      <GeneralHeader bgColor={'#6947cc'} title={'ADD EXPENSE'} />
      <SubContainer>
        <View style={styles.cardContainer}>
          <AddPayee showModal={showModal} setShowModal={setShowModal} />
          <View>
            <Select
              selectedValue={formik.values.name ? formik.values.name : 'N/A'}
              minWidth="200"
              accessibilityLabel="Choose Name"
              placeholder="Choose Name"
              _selectedItem={{
                bg: '#6947cc',
              }}
              mt={1}
              onValueChange={itemValue => {
                const selectedPayee = payees.find(
                  payee => payee.name === itemValue,
                );
                formik.setFieldValue('name', itemValue);
                formik.setFieldValue(
                  'payeeId',
                  selectedPayee ? selectedPayee.id : 0,
                );
              }}>
              {payees.length > 0 ? (
                payees.map(payee => (
                  <Select.Item
                    label={payee.name}
                    value={payee.name}
                    key={payee.id}
                  />
                ))
              ) : (
                <Select.Item label="N/A" value="N/A" key="N/A" />
              )}
            </Select>
            <View style={styles.payeeTextContainer}>
              <Text style={styles.text}>Can't find your payee? </Text>
              <TouchableOpacity onPress={() => setShowModal(true)}>
                {/*  eslint-disable-next-line react-native/no-inline-styles */}
                <Text style={{...styles.text, color: '#6947cc'}}>
                  Add a payee
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <Select
            selectedValue={formik.values.transactionType}
            minWidth={200}
            accessibilityLabel="Choose Transaction Type"
            placeholder="Choose Transaction Type"
            _selectedItem={{
              bg: '#6947cc',
            }}
            onValueChange={itemValue =>
              formik.setFieldValue('transactionType', itemValue)
            }>
            <Select.Item label="Debit" value="Debit" />
            <Select.Item label="Credit" value="Credit" />
          </Select>
          <Input
            value={moment(selectedDate).format('YYYY-MM-DD')}
            placeholder="Current Date"
            onPressIn={() => setOpen(true)}
            isDisabled={true}
            InputRightElement={
              <TouchableOpacity onPress={() => setOpen(true)}>
                {/*  eslint-disable-next-line react-native/no-inline-styles */}
                <View style={{marginRight: '4%'}}>
                  <Icon name="calendar" size={20} color="#000" />
                </View>
              </TouchableOpacity>
            }
          />
          <DatePicker
            modal
            open={open}
            date={selectedDate}
            onConfirm={input => {
              setOpen(false);
              setSelectedDate(input);
              formik.setFieldValue(
                'date',
                moment(input).format('YYYY-MM-DDTHH:mm:ssZ'),
              );
            }}
            onCancel={() => {
              setOpen(false);
            }}
          />
          <View style={styles.lowerFieldsContainer}>
            <Input
              placeholder="Amount"
              maxWidth={110}
              type="number"
              value={formik.values.amount}
              onChangeText={formik.handleChange('amount')}
              backgroundColor={'#fff'}
              mr={'1%'}
            />
            <Select
              selectedValue={formik.values.reason}
              minWidth={200}
              accessibilityLabel="Choose Reason"
              placeholder="Choose Reason"
              _selectedItem={{
                bg: '#6947cc',
              }}
              onValueChange={itemValue =>
                formik.setFieldValue('reason', itemValue)
              }>
              <Select.Item label="Loan" value="Loan" />
              <Select.Item label="Business" value="Business" />
              <Select.Item label="Transport" value="Transport" />
              <Select.Item label="Investment" value="Investment" />
              <Select.Item label="Goods" value="Goods" />
            </Select>

            {/* <Input
              placeholder="Reason"
              maxWidth={100}
              value={formik.values.reason}
              onChangeText={formik.handleChange('reason')}
            /> */}
          </View>
          <TextArea
            placeholder={'Note'}
            value={formik.values.note}
            onChangeText={formik.handleChange('note')}
            fontSize={12}
            backgroundColor={'#fff'}
            borderWidth={1}
            borderRadius={20}
            color={'grey'}
            fontWeight={800}
          />
          <TouchableOpacity onPress={formik.handleSubmit}>
            <View style={styles.buttonContainer}>
              <Text style={styles.buttonText}>Add</Text>
            </View>
          </TouchableOpacity>
        </View>
      </SubContainer>
    </MainViewWrapper>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: 'center',
    flex: 1,
  },
  text: {color: '#000', fontFamily: 'inter_medium', fontSize: 12},
  buttonContainer: {
    borderRadius: 40,
    paddingVertical: 20,
    alignItems: 'center',
    backgroundColor: '#6947cc',
    marginTop: '2%',
  },
  cardContainer: {
    backgroundColor: '#fff', // Set background color for the card
    borderRadius: 16, // Add border radius for rounded corners
    padding: 16, // Add padding for spacing inside the card
    marginVertical: 10, // Add margin for spacing between cards
    shadowColor: '#000', // Add shadow for a lift effect
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: widthPercentageToDP(90),
    height: heightPercentageToDP(60),
    justifyContent: 'space-between',
  },
  buttonText: {
    color: '#fff',
    fontFamily: 'inter_medium',
    fontSize: 14,
  },
  payeeTextContainer: {flexDirection: 'row', marginTop: '4%'},
  lowerFieldsContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'space-between',
  },
});

export default AddExpenseScreen;
