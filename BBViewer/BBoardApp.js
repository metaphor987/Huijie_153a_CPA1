import React, { useState } from "react";
import { StyleSheet, Text, View, Button, } from 'react-native';

import ValueProvider from './ValueContext';
import BBoards from './BBoards'
//import Try from './Try'

const BBoardApp = () => {
  const data =
    {name:"",
     email:"",
     appURL: 'https://glacial-hamlet-05511.herokuapp.com',
     //appURL: 'http://127.0.0.1:3000',
     secret: "",
   }

  return (
    <ValueProvider value={data}>
      <BBoards/>
    </ValueProvider>
  )
}

export default BBoardApp
