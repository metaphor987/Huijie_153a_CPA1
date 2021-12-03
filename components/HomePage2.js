import * as React from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';

import MyCommentsScreen from './MyComments'
import LoginScreen from './LoginPage'
import WishListScreen from './MyWishLists'
import {useValue} from './ValueContext';


const HomeScreen = () => {
  const {currentValue} = useValue();

  return (
    <View style={styles.container}>
      <View style={{flex:2}}>
        <Image
          style={styles.myimage}
          source={require('./ocean_homepage.jpg')}
          />
      </View>
      <View style={{flex:1}}>
        <View style={{alignItems:'center', justifyContent:'center', padding:30}}>
          <Text>Hi, {currentValue.name}</Text>
          <Text>Write down your thoughts and ideas!</Text>
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
