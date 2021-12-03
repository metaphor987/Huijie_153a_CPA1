import React, { useState } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, View, Button, } from 'react-native';

import ValueProvider from './ValueContext';

import HomePage2 from './HomePage2'
import LoginPage from './LoginPage'
import CommentPage from './MyComments'
import WishList from './MyWishLists'

const Tab = createBottomTabNavigator();

const App = () => {
  const data =
    {name:"Huijie",
     email:"huijie@random.edu",
   }

  return (
    <ValueProvider value={data}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Home" component= {HomePage2} />
          <Tab.Screen name="Login" component= {LoginPage} />
          <Tab.Screen name="BookReviews" component= {CommentPage} />
          <Tab.Screen name="WishList" component= {WishList} />
        </Tab.Navigator>
      </NavigationContainer>
    </ValueProvider>
  )
}

export default App
