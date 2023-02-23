import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  StartScreen,
  GenesysCloudDemo,
  Settings,
  AdvanceSettings,
} from '../screens';

const RootStack = createStackNavigator();
createStackNavigator();

export const RootNavigator = () => (
  <RootStack.Navigator
    screenOptions={{
      presentation: 'card',
      headerShown: false,
      gestureEnabled: false,
    }}>
    <RootStack.Screen
      name="Start"
      component={StartScreen}
      options={{headerShown: false}}
    />
    <RootStack.Screen
      name="GenesysCloudDemo"
      component={GenesysCloudDemo}
      options={{headerShown: false}}
    />
    <RootStack.Screen
      name="Settings"
      component={Settings}
      options={{headerShown: false}}
    />
    <RootStack.Screen
      name="AdvanceSettings"
      component={AdvanceSettings}
      options={{headerShown: false}}
    />
  </RootStack.Navigator>
);
