import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {Alert, Platform} from 'react-native';

import {
  createNativeStackNavigator,
  TransitionPresets,
} from '@react-navigation/native-stack';
import {Button, LogBox, Text, View} from 'react-native';

import HomeScreen from './src/Home/HomeScreen';


LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          gestureEnabled: true,
          gestureDirection: 'vertical',
        }}
        mode="modal">
       
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}
