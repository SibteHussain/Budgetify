import {Text, View} from 'native-base';
import React from 'react';
import {StyleSheet} from 'react-native';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/AntDesign';
import {useAppStateProvider} from '../providers/AppStateProvider';

const TransactionsCard = ({filteredIncome, filteredExpense}) => {
  const {user} = useAppStateProvider();

  return (
    <View style={styles.mainContainer}>
      <View style={styles.balanceContainer}>
        <Text style={styles.text}>{user[0].name}</Text>
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.expenseContainer}>
          <View style={styles.incomeContainer}>
            <Icon name="arrowdown" size={17} color="#fff" />
            <Text style={styles.text}>Total Debit</Text>
          </View>
          <Text style={styles.textLight}>{`$${filteredIncome}`}</Text>
        </View>
        <View style={styles.expenseContainer}>
          <View style={styles.incomeContainer}>
            <Icon name="arrowup" size={17} color="#fff" />
            <Text style={styles.text}>Total Credit</Text>
          </View>
          <Text style={styles.textLight}>{`$${filteredExpense}`}</Text>
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
  text: {color: '#fff', fontFamily: 'inter_regular', fontSize: 18},
  balanceContainer: {
    flexDirection: 'row',
    alignItems: 'space-between',
    justifyContent: 'center',
  },
  icon: {marginTop: '5%', marginLeft: '1%'},
  bottomContainer: {
    flexDirection: 'row',
    alignItems: 'space-around',
    justifyContent: 'space-between',
    marginTop: '8%',
  },
  textLight: {
    color: '#fff',
    fontFamily: 'inter_light',
    fontSize: 15,
    marginTop: '2%',
  },
  incomeContainer: {flexDirection: 'row', alignItems: 'center'},
  expenseContainer: {flexDirection: 'column', alignItems: 'center'},
});
export default TransactionsCard;
