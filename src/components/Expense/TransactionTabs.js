/* eslint-disable react-native/no-inline-styles */
import {Divider} from 'native-base';
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {widthPercentageToDP} from 'react-native-responsive-screen';

const TransactionTabs = ({selectedInterval, onSelectTab}) => {
  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity onPress={() => onSelectTab('daily')}>
        <Text
          style={{
            ...styles.nameText,
            color: selectedInterval === 'daily' ? '#000' : '#fff',
          }}>
          Daily
        </Text>
      </TouchableOpacity>
      <Divider orientation="vertical" marginX={'3%'} />
      <TouchableOpacity onPress={() => onSelectTab('weekly')}>
        <Text
          style={{
            ...styles.nameText,
            color: selectedInterval === 'weekly' ? '#000' : '#fff',
          }}>
          Weekly
        </Text>
      </TouchableOpacity>
      <Divider orientation="vertical" marginX={'3%'} color={'#fff'} />
      <TouchableOpacity onPress={() => onSelectTab('monthly')}>
        <Text
          style={{
            ...styles.nameText,
            color: selectedInterval === 'monthly' ? '#000' : '#fff',
          }}>
          Monthly
        </Text>
      </TouchableOpacity>
      <Divider orientation="vertical" marginX={'3%'} />
      <TouchableOpacity onPress={() => onSelectTab('yearly')}>
        <Text
          style={{
            ...styles.nameText,
            color: selectedInterval === 'yearly' ? '#000' : '#fff',
          }}>
          Yearly
        </Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: widthPercentageToDP(60),
    backgroundColor: '#431cb8',
    borderRadius: 10,
    padding: 15,
  },
  nameText: {color: '#000', fontFamily: 'inter_medium', fontSize: 13},
});
export default TransactionTabs;
