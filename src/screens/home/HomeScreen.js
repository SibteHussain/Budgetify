import {Text, View} from 'native-base';
import React from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import CreditCard from '../../components/home/CreditCard';
const HomeScreen = ({navigation}) => {
  const {navigate} = navigation;
  return (
    <View style={styles.mainContainer}>
      {/* <Image source={require('../../../assets/images/Header_bg.png')} /> */}
      <Text style={styles.text}>Budgetify</Text>
      <CreditCard />
      <Text>Transaction History</Text>
      <TouchableOpacity onPress={() => navigate('AddExpense')}>
        <Text>Add</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigate('showExpense')}>
        <Text>Check</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: 'center',
  },
  text: {color: '#000', fontFamily: 'inter_bold', fontSize: 45},
});
export default HomeScreen;
