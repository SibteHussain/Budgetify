import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

const TransactionTabs = ({selectedInterval, onSelectTab}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
      }}>
      <TouchableOpacity onPress={() => onSelectTab('daily')}>
        <Text style={{color: selectedInterval === 'daily' ? 'blue' : 'black'}}>
          Daily
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onSelectTab('weekly')}>
        <Text style={{color: selectedInterval === 'weekly' ? 'blue' : 'black'}}>
          Weekly
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onSelectTab('monthly')}>
        <Text
          style={{color: selectedInterval === 'monthly' ? 'blue' : 'black'}}>
          Monthly
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onSelectTab('yearly')}>
        <Text style={{color: selectedInterval === 'yearly' ? 'blue' : 'black'}}>
          Yearly
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default TransactionTabs;
