import React, { useState } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, View, Button, TextInput} from 'react-native';

import {ValueProvider} from './ValueContext';

import Login from './LoginPagebiu'
import Show from './ShowData'

const Tab = createBottomTabNavigator();

const App = () => {

  return (
    <ValueProvider>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Login" component= {Login}/>
          <Tab.Screen name="Show" component= {Show} />
        </Tab.Navigator>
      </NavigationContainer>
    </ValueProvider>
  )
}

export default App
