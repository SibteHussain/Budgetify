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
import BeneficiaryCard from '../../components/Beneficiaries/BeneficiaryCard';

const BeneficiaryScreen = () => {
  const {payees} = useAppStateProvider();
  return (
    <MainViewWrapper statusBgColor={'#6947cc'}>
      <GeneralHeader bgColor={'#6947cc'} title={'BENEFICIARIES'} />
      {payees.length > 0 ? (
        payees.map(payee => (
          <BeneficiaryCard
            name={payee.name}
            email={payee.email}
            relation={payee.relation}
          />
        ))
      ) : (
        <Text>Add Payees</Text>
      )}
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

export default BeneficiaryScreen;
