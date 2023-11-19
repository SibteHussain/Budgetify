import {View} from 'native-base';
import {Image, StyleSheet} from 'react-native';
import React from 'react';

const MainViewWrapper = ({children}) => {
  return (
    <View style={styles.imageContainer}>
      <Image source={require('../../assets/images/Header_bg.png')} />
      <View style={styles.container}>{children}</View>
    </View>
  );
};
const styles = StyleSheet.create({
  imageContainer: {
    alignItems: 'center',
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust the alpha channel for background transparency
  },
});
export default MainViewWrapper;
