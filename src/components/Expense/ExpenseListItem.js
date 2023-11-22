import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const ExpenseListItem = ({text, mainText}) => {
  return (
    <View style={styles.listContainer}>
      <Text style={styles.listText}>{text}</Text>
      <Text style={styles.listMainText}>{mainText}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  listText: {
    color: '#fff',
    fontFamily: 'inter_medium',
    fontSize: 18,
  },
  listMainText: {
    color: '#fff',
    fontFamily: 'inter_medium',
    fontSize: 18,
  },
  listContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
export default ExpenseListItem;
