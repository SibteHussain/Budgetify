import React from 'react';
import {NativeBaseProvider} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';
import AppStateProvider from './src/components/providers/AppStateProvider';
import MyTabs from './src/navigatiors/TabNavigator';

function App(): JSX.Element {
  return (
    <AppStateProvider>
      <NativeBaseProvider>
        <NavigationContainer>
          <MyTabs />
        </NavigationContainer>
      </NativeBaseProvider>
    </AppStateProvider>
  );
}

export default App;
