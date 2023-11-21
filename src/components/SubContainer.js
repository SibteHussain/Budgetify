/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StatusBar, View, StyleSheet} from 'react-native';
import {widthPercentageToDP} from 'react-native-responsive-screen';

const SubContainer = ({children, bgColor, statusBgColor}) => {
  return (
    <View
      style={[
        styles.mainContainer,

        // eslint-disable-next-line react-native/no-inline-styles
        {
          marginTop: '15%',
          backgroundColor: bgColor ? bgColor : '#6947cc',
        },
      ]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    flex: 1,
    justifyContent: 'flex-start',
    width: widthPercentageToDP('100'),
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
});
export default SubContainer;
