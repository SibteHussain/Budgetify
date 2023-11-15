import {View} from 'native-base';
import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';

const OnboardingScreen = () => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.imageBackground}>
        <Image source={require('../../../assets/images/onboarding.png')} />
      </View>
      <View style={styles.headingContainer}>
        <Text style={styles.headingText}>Spend Smarter Save More</Text>
        <TouchableOpacity>
          <View style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Get Started</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imageBackground: {
    backgroundColor: '#EEF8F7',
  },
  mainContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '3%',
  },
  headingText: {
    color: '#438883',
    fontFamily: 'inter_bold',
  },
  headingContainer: {
    backgroundColor: 'white',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    borderRadius: 40,
    paddingVertical: 20,
    paddingHorizontal: 90,
    backgroundColor: '#3E7C78',
    marginTop: '2%',
  },
  buttonText: {
    color: '#fff',
  },
});

export default OnboardingScreen;
