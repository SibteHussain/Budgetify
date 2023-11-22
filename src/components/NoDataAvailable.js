import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {heightPercentageToDP} from 'react-native-responsive-screen';

const NoDataAvailable = () => {
  return (
    <View style={styles.expenseContainer}>
      <Text style={styles.expenseText}>No Data Found</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  expenseContainer: {
    justifyContent: 'center',
    height: heightPercentageToDP(52),
  },
  expenseText: {color: '#000', fontFamily: 'inter_semibold', fontSize: 40},
});
export default NoDataAvailable;
