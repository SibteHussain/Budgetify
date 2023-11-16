import React from 'react';
import {StyleSheet} from 'react-native';
import OnboardingScreen from './src/screens/onboarding/OnboardingScreen';
import {NativeBaseProvider, StatusBar, View} from 'native-base';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {NavigationContainer} from '@react-navigation/native';
import MyStack from './src/navigatiors/StackNavigator';

function App(): JSX.Element {
  return (
    <NativeBaseProvider>
      <StatusBar backgroundColor={'#000'} />
      <NavigationContainer>
        <MyStack>
          <OnboardingScreen />
        </MyStack>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  mainContainer: {backgroundColor: '#fff', height: heightPercentageToDP(100)},
});

export default App;
