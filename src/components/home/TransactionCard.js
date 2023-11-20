import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {widthPercentageToDP} from 'react-native-responsive-screen';
const TransactionCard = ({name, amount, date}) => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.nameContainer}>
        <Text style={styles.nameText}>{name}</Text>
        <Text style={styles.dateText}>{date}</Text>
      </View>
      <Text
        style={{color: '#25A969', fontFamily: 'inter_semibold', fontSize: 18}}>
        {amount}
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: widthPercentageToDP(90),
    marginVertical: '1%',
  },
  nameText: {color: '#000', fontFamily: 'inter_medium', fontSize: 16},
  buttonContainer: {
    borderRadius: 40,
    paddingVertical: 20,
    paddingHorizontal: 90,
    backgroundColor: '#3E7C78',
    marginTop: '2%',
  },
  nameContainer: {
    flexDirection: 'column',
  },
  dateText: {
    color: '#666666',
    fontFamily: 'inter_regular',
    fontSize: 13,
  },
});
export default TransactionCard;
