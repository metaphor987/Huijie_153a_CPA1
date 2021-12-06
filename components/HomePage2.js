import React, {useState, useEffect, useContext} from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import {ValueContext} from './ValueContext';


const HomeScreen = () => {
  const {name} = useContext(ValueContext);

  return (
    <View style={styles.container}>
      <View style={{flex:2}}>
        <Image
          style={styles.myimage}
          source={require('./readingGIF.gif')}
          />
      </View>
      <View style={{flex:1}}>
        <View style={{alignItems:'center', justifyContent:'center', padding:30}}>
          <Text style={{fontSize:18}}>Hi, {name}</Text>
          <Text style={{fontSize:18}}>Write down your thoughts and ideas!</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    flex: 1,
  },
  myimage: {
    width:'100%',
    height:'100%',
    resizeMode:'cover',
  },
  myicon: {
    width:80,
    height:80,
  },
});

export default HomeScreen;
