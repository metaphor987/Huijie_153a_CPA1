import React, { useState } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, View, Button, } from 'react-native';
import {ValueProvider} from './ValueContext';

import HomePage from './HomePage2'
import LoginPage from './LoginPage3'
import CommentPage from './BookReviews'
import WishList from './WishList'
import MyTabBar from './TabBar.js'

const Tab = createBottomTabNavigator();

const App = () => {

  return (
    <ValueProvider>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Home" component= {HomePage} />
          <Tab.Screen name="Login" component= {LoginPage} />
          <Tab.Screen name="BookReviews" component= {CommentPage} />
          <Tab.Screen name="WishList" component= {WishList} />
        </Tab.Navigator>
      </NavigationContainer>
    </ValueProvider>
  )
}

export default App
