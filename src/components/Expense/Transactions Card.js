import {Text, View} from 'native-base';
import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/AntDesign';
import IconEntypo from 'react-native-vector-icons/Entypo';
import {useAppStateProvider} from '../providers/AppStateProvider';

const TransactionsCard = () => {
  const {income, expense, user} = useAppStateProvider();
  return (
    <View style={styles.mainContainer}>
      <View style={styles.balanceContainer}>
        <Text style={styles.text}>{user[0].name}</Text>
      </View>
      <Text style={styles.text}>Expense Tracker</Text>
      <View style={styles.bottomContainer}>
        <View style={styles.expenseContainer}>
          <View style={styles.incomeContainer}>
            <Icon name="arrowdown" size={15} color="#fff" />
            <Text style={styles.textLight}>Income</Text>
          </View>
          <Text style={styles.text}>{income}</Text>
        </View>
        <View style={styles.expenseContainer}>
          <View style={styles.incomeContainer}>
            <Icon name="arrowup" size={15} color="#fff" />
            <Text style={styles.textLight}>Expenses</Text>
          </View>
          <Text style={styles.text}>{expense}</Text>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    // alignItems: 'space-around',
    backgroundColor: '#431cb8',
    paddingVertical: 30,
    paddingHorizontal: 15,
    borderRadius: 15,
    width: widthPercentageToDP(90),
    marginVertical: '4%',
  },
  text: {color: '#fff', fontFamily: 'inter_regular', fontSize: 15},
  balanceContainer: {
    flexDirection: 'row',
    alignItems: 'space-between',
    justifyContent: 'space-between',
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
export default TransactionsCard;
