import React from 'react';
import {NativeBaseProvider} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';
import MyStack from './src/navigatiors/StackNavigator';
import AppStateProvider from './src/components/providers/AppStateProvider';

function App(): JSX.Element {
  return (
    <AppStateProvider>
      <NativeBaseProvider>
        <NavigationContainer>
          <MyStack />
        </NavigationContainer>
      </NativeBaseProvider>
    </AppStateProvider>
  );
}

export default App;
