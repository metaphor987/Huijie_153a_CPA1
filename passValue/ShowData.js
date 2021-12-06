import React, { useState, useEffect, useContext }  from 'react';
import { View, Button,
         FlatList, StyleSheet,
         Text, TextInput } from 'react-native';
import {ValueContext} from './ValueContext';

const Data = () => {
  const {name} = useContext(ValueContext)


  return(
    <View>
      <Text style={{fontSize:20}}>currentValue.name is {name}</Text>
    </View>
  )
}

export default Data
