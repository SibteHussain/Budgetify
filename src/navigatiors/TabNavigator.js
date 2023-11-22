import React from 'react';
import {Platform} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import BeneficiaryScreen from '../screens/Beneficiaries/BeneficiaryScreen';
import Icon from 'react-native-vector-icons/AntDesign';
import TransactionsHistory from '../screens/Expense/TransactionsHistory';
import MyStack from './StackNavigator';

const Tab = createBottomTabNavigator();

const MyTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        headerShown: false,
        // eslint-disable-next-line react/no-unstable-nested-components
        tabBarIcon: () => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Beneficiaries') {
            iconName = 'user';
          } else if (route.name === 'Transactions') {
            iconName = 'calendar';
          }

          // Return the Icon component with the appropriate properties
          return <Icon name={iconName} size={25} color={'#fff'} />;
        },
        tabBarStyle: {
          height: Platform.OS === 'ios' ? 80 : 60,
          backgroundColor: '#6947cc',
        },
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#fff',
        tabBarLabelStyle: {
          fontFamily: 'inter_bold',
        },
      })}>
      <Tab.Screen name="Home" component={MyStack} />
      <Tab.Screen name="Beneficiaries" component={BeneficiaryScreen} />
      <Tab.Screen name="Transactions" component={TransactionsHistory} />
    </Tab.Navigator>
  );
};

export default MyTabs;
