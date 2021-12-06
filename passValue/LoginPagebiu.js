import React, {useState, useEffect, useContext} from 'react';
import {StyleSheet, Text, Image, View, TextInput, Button} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useValue} from './ValueContext';
import {ValueContext} from './ValueContext';

const Login = () => {
  const {changeInfo} = useContext(ValueContext);
  const {name} = useContext(ValueContext);

  return(
    <View>
      <View>
      {changeInfo}
      </View>
        <Text>Current Name:{name}</Text>
      <View>
      </View>
    </View>
  )
}

export default Login;
