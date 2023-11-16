import {Text, View} from 'native-base';
import React from 'react';
import {Image, StyleSheet} from 'react-native';
import CreditCard from '../../components/home/CreditCard';
const HomeScreen = () => {
  return (
    <View style={styles.mainContainer}>
      {/* <Image source={require('../../../assets/images/Header_bg.png')} /> */}
      <Text style={styles.text}>Budgetify</Text>
      <CreditCard />
      <Text>Transaction History</Text>
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
