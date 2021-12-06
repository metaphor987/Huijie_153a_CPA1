import React, { useState, useContext, createContext } from "react";
import { StyleSheet, Text, View, Button, TextInput} from 'react-native';

export const ValueContext = createContext(null)

export const ValueProvider = ({value, children}) => {
  const [name, setName] = useState("");

  let changeInfo = (<View></View>)
  changeInfo = (
    <TextInput
      placeholder='User Name'
      onChangeText={text => {setName(text)}}
      value={name}
    />
  )

  return (
    <ValueContext.Provider value = {{name, changeInfo}}>
      {children}
    </ValueContext.Provider>
  )
}
