import {View} from 'native-base';
import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';

const OnboardingScreen = ({navigation}) => {
  const {navigate} = navigation;
  return (
    <View style={styles.mainContainer}>
      <View style={styles.imageBackground}>
        <Image source={require('../../../assets/images/onboarding.png')} />
      </View>
      <View style={styles.headingContainer}>
        <Text style={styles.headingText}>Spend Smarter Save More</Text>
        <TouchableOpacity onPress={() => navigate('Register')}>
          <View style={styles.buttonContainer}>
            <Text style={styles.buttonText}>Get Started</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigate('Home')}>
          <Text style={styles.loginText}>Already have an account? Log In</Text>
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
    alignItems: 'center',
    height: '100%',
  },
  headingText: {
    color: '#438883',
    fontFamily: 'inter_bold',
    textAlign: 'center',
    width: '100%',
    fontSize: 40,
  },
  headingContainer: {
    backgroundColor: 'white',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    // height: '40%',
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
    fontFamily: 'inter_regular',
  },
  loginText: {
    color: '#000',
    marginTop: '5%',
  },
});

export default OnboardingScreen;
