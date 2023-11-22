/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {View} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/AntDesign';

const GeneralHeader = ({title, bgColor, navigate}) => {
  const {goBack} = useNavigation();

  return (
    <View
      style={{
        ...styles.mainContainer,
        backgroundColor: bgColor ? bgColor : '#ffff',
      }}>
      <View style={styles.subContainer}>
        <TouchableOpacity onPress={() => goBack()}>
          <Icon name="left" size={15} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.text}>{title}</Text>
        <Text style={styles.text}>.</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backBtn: {
    alignItems: 'center',
    height: 50,
    justifyContent: 'center',
    width: 50,
  },

  mainContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    height: heightPercentageToDP(8),
    justifyContent: 'center',
    width: widthPercentageToDP(100),
  },
  text: {
    fontFamily: 'inter_bold',
    fontSize: 20,
    color: '#fff',
  },
  subContainer: {
    width: '95%',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    height: heightPercentageToDP(8),
  },
});

export default GeneralHeader;
