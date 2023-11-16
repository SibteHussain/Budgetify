import {Text, View} from 'native-base';
import React from 'react';
import {StyleSheet} from 'react-native';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/AntDesign';

const CreditCard = () => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.balanceContainer}>
        <Text style={styles.text}>Total Balance</Text>
        <Icon name="up" size={15} color="#fff" style={styles.icon} />
      </View>
      <Text style={styles.text}>PKR 250,000</Text>
      <View style={styles.bottomContainer}>
        <View style={styles.expenseContainer}>
          <View style={styles.incomeContainer}>
            <Icon name="arrowdown" size={15} color="#fff" />
            <Text style={styles.textLight}>Income</Text>
          </View>
          <Text style={styles.text}>PKR 250,000</Text>
        </View>
        <View style={styles.expenseContainer}>
          <View style={styles.incomeContainer}>
            <Icon name="arrowup" size={15} color="#fff" />
            <Text style={styles.textLight}>Expenses</Text>
          </View>
          <Text style={styles.text}>PKR 250,000</Text>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    // alignItems: 'space-around',
    backgroundColor: '#2F7E79',
    paddingVertical: 30,
    paddingHorizontal: 15,
    borderRadius: 15,
    minWidth: widthPercentageToDP(80),
    // position: 'absolute',
    // top: 200,
  },
  text: {color: '#fff', fontFamily: 'inter_regular', fontSize: 15},
  balanceContainer: {
    flexDirection: 'row',
  },
  icon: {marginTop: '5%', marginLeft: '1%'},
  bottomContainer: {
    flexDirection: 'row',
    alignItems: 'space-around',
    justifyContent: 'space-between',
    marginTop: '8%',
  },
  textLight: {color: '#fff', fontFamily: 'inter_light', fontSize: 12},
  incomeContainer: {flexDirection: 'row'},
  expenseContainer: {flexDirection: 'column'},
});
export default CreditCard;
