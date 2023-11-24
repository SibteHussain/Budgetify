/* eslint-disable react-native/no-inline-styles */
// AddExpenseScreen.js
import React, {useState, useEffect} from 'react';
import {useFormik} from 'formik';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {Input, TextArea} from 'native-base';
import AddPayee from '../../components/Payee/AddPayee';
import {useAppStateProvider} from '../../components/providers/AppStateProvider';
import GeneralHeader from '../../components/GeneralHeader';
import MainViewWrapper from '../../components/MainViewWrapper';
import moment from 'moment';
import SubContainer from '../../components/SubContainer';
import {useNavigation} from '@react-navigation/native';
import DatePicker from 'react-native-date-picker';
import Icon from 'react-native-vector-icons/AntDesign';
import {ExpenseValidationSchema} from '../../utils/ValidationSchemas';
import useToastHook from '../../utils/useToastHook';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import SelectField from '../../components/SelectField';

const generateRandomId = () =>
  Date.now().toString(36) + Math.random().toString(36).substr(2);

const AddExpenseScreen = () => {
  const {goBack} = useNavigation();
  const {expenses, setExpenses, payees} = useAppStateProvider();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const {showToast} = useToastHook();

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
    onSubmit: handleSubmit,
  });

  useEffect(() => setShowModal(payees.length === 0), [payees]);

  function handleSubmit(values) {
    try {
      ExpenseValidationSchema.validateSync(values, {abortEarly: false});
      const newExpenses = [values, ...expenses];
      setExpenses(newExpenses);
      goBack();
      showToast('success', 'Transaction added successfully', 'bottom');
    } catch (error) {
      const errorMessages = error.errors;
      errorMessages.forEach(errorMessage =>
        showToast('error', errorMessage, 'bottom'),
      );
    }
  }

  return (
    <MainViewWrapper statusBgColor="#6947cc">
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
      <GeneralHeader bgColor="#6947cc" title="ADD EXPENSE" />
      <SubContainer>
        <View style={styles.cardContainer}>
          <AddPayee showModal={showModal} setShowModal={setShowModal} />
          <View>
            <SelectField
              label="Name"
              selectedValue={formik.values.name}
              onValueChange={itemValue => {
                const selectedPayee = payees.find(
                  payee => payee.name === itemValue,
                );
                formik.setValues({
                  ...formik.values,
                  name: itemValue,
                  payeeId: selectedPayee ? selectedPayee.id : 0,
                });
              }}
              items={payees.map(payee => ({
                label: payee.name,
                value: payee.name,
              }))}
            />
            <View style={styles.payeeTextContainer}>
              <Text style={styles.text}>Can't find your payee? </Text>
              <TouchableOpacity onPress={() => setShowModal(true)}>
                <Text style={{...styles.text, color: '#6947cc'}}>
                  Add a payee
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <SelectField
            label="Transaction Type"
            selectedValue={formik.values.transactionType}
            onValueChange={itemValue =>
              formik.setFieldValue('transactionType', itemValue)
            }
            items={[
              {label: 'Debit', value: 'Debit'},
              {label: 'Credit', value: 'Credit'},
            ]}
          />
          <Input
            value={moment(selectedDate).format('YYYY-MM-DD')}
            placeholder="Current Date"
            onPressIn={() => setOpen(true)}
            isDisabled={true}
            InputRightElement={
              <TouchableOpacity onPress={() => setOpen(true)}>
                <View style={{marginRight: '4%'}}>
                  <Icon name="calendar" size={20} color="#000" />
                </View>
              </TouchableOpacity>
            }
          />
          <View style={styles.lowerFieldsContainer}>
            <Input
              placeholder="Amount"
              maxWidth={110}
              type="number"
              value={formik.values.amount}
              onChangeText={value => formik.setFieldValue('amount', value)}
              backgroundColor="#fff"
              mr="1%"
              onBlur={formik.handleBlur('amount')}
              error={formik.errors.amount}
            />

            <SelectField
              label="Reason"
              selectedValue={formik.values.reason}
              onValueChange={itemValue =>
                formik.setFieldValue('reason', itemValue)
              }
              items={[
                {label: 'Shopping', value: 'Shopping'},
                {label: 'Grocery', value: 'Grocery'},
                {label: 'Business', value: 'Business'},
                {label: 'Investment', value: 'Investment'},
                {label: 'Food', value: 'Food'},
                {label: 'Loan', value: 'Loan'},
                {label: 'Transport', value: 'Transport'},
              ]}
            />
          </View>
          <TextArea
            placeholder="Note"
            value={formik.values.note}
            onChangeText={value => formik.setFieldValue('note', value)}
            fontSize={12}
            backgroundColor="#fff"
            borderWidth={1}
            borderRadius={20}
            color="grey"
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
  mainContainer: {alignItems: 'center', flex: 1},
  text: {color: '#000', fontFamily: 'inter_medium', fontSize: 12},
  buttonContainer: {
    borderRadius: 40,
    paddingVertical: 20,
    alignItems: 'center',
    backgroundColor: '#6947cc',
    marginTop: '2%',
  },
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: widthPercentageToDP(90),
    height: heightPercentageToDP(60),
    justifyContent: 'space-between',
  },
  buttonText: {color: '#fff', fontFamily: 'inter_medium', fontSize: 14},
  payeeTextContainer: {flexDirection: 'row', marginTop: '4%'},
  lowerFieldsContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'space-between',
  },
});

export default AddExpenseScreen;
