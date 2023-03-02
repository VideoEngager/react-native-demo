import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  StartScreen,
  GenesysCloudDemo,
  Settings,
  AdvanceSettings,
} from '../screens';
import {SettingsProvider} from '../contexts/Settings';
import {InteractionProvider} from '../contexts/Interaction';

const RootStack = createStackNavigator();
createStackNavigator();

export const RootNavigator = () => (
  <SettingsProvider>
    <InteractionProvider>
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
    </InteractionProvider>
  </SettingsProvider>
);
