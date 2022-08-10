

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './screens/home';
import Detail from './screens/detail';

const Stack = createStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen 
        name='Home' 
        component={Home}
        />
        <Stack.Screen 
        name='Detail' 
        component={Detail} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
