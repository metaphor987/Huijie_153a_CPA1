import React, { useState, useContext, createContext } from "react";
import { StyleSheet, Text, View, Button, TextInput} from 'react-native';

export const ValueContext = createContext(null)

export const ValueProvider = ({value, children}) => {
  const [name, setName] = useState("");

  let changeInfo = (<View></View>)
  changeInfo = (
    <TextInput
      style={styles.input}
      placeholder='username'
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

const styles = StyleSheet.create({
  input: {
    width: 300,
    height: 40,
    padding: 5,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: 'black',
    marginBottom: 10,
  },
});
