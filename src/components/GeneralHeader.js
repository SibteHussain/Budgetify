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
      <TouchableOpacity onPress={() => goBack()} style={styles.backBtn}>
        <Icon name="left" size={15} color="#fff" />
      </TouchableOpacity>
      <View style={styles.titleText}>
        <Text style={styles.text}>{title}</Text>
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
  hamburgerContainer: {alignItems: 'center'},

  mainContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    height: heightPercentageToDP(8),
    justifyContent: 'flex-start',
    width: widthPercentageToDP(100),
  },
  titleText: {
    marginLeft: widthPercentageToDP(18),
  },
  text: {
    fontFamily: 'inter_bold',
    fontSize: 20,
    color: '#fff',
  },
});

export default GeneralHeader;
