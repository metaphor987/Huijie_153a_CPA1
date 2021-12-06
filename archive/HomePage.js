import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { StyleSheet, Text, View, Button, Image } from 'react-native';

import MyCommentsScreen from './MyComments'
import LoginScreen from './LoginPage'
import WishListScreen from './MyWishLists'


const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>

        <Stack.Screen
          name="Home"
          component={HomeScreen}
          //options={{ title: 'Welcome' }}
        />

        <Stack.Screen name="MyComments" component={MyCommentsScreen} />

        <Stack.Screen name="Login" component={LoginScreen} />

        <Stack.Screen name="WishList" component={WishListScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};


const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
    {/*Row 1. the background picture*/}
      <View style={{flex:2, backgroundColor:'yellow'}}>
        <Image
          style={styles.myimage}
          source={require('./ocean_homepage.jpg')}
        />
      </View>
    {/*Row 2*/}
      <View style={{flex:1, flexDirection: 'row',}}>
    {/*Row 2 Column 1*/}
        <View style={{flex:1,justifyContent:'center'}}>
    {/*Row 2 Column 1. Icon*/}
          <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <Image
              style={styles.myicon}
              source={require('./icon_comments.jpg')}
            />
          </View>
    {/*Row 2 Column 1. Button*/}
          <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
          <Button title="Book Reviews"
                  onPress={() => navigation.navigate('MyComments')}
          />
          </View>

        </View>
    {/*Row 2 Column 1*/}
        <View style={{flex:1,justifyContent:'center'}}>
    {/*Row 2 Column 2. Icon*/}
          <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <Image
              style={styles.myicon}
              source={require('./login.jpg')}
              />
          </View>
    {/*Row 2 Column 2. Button*/}
          <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <Button
              title="Login"
              onPress={() => navigation.navigate('Login')}/>
          </View>
        </View>

        {/*Row 3 Column 1*/}
            <View style={{flex:1,justifyContent:'center'}}>
        {/*Row 3 Column 1. Icon*/}
              <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <Image
                  style={styles.myicon}
                  source={require('./icon_wish.jpg')}
                />
              </View>
        {/*Row 3 Column 1. Button*/}
              <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
              <Button title="Wish List"
                      onPress={() => navigation.navigate('WishList')}
              />
              </View>

            </View>


      </View>
  </View>
  );
};

// ProfileScreen function is called with a JSON object
//  {navigation:..., route:...,  otherstuff}
const ProfileScreen = ({ navigation, route }) => {
  return <Text>{route.params.greeting}, this is {route.params.name}'s profile</Text>;
       // we're using the parameter name passed in from the HomeScreen
};

const styles = StyleSheet.create({
  container: {
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


export default MyStack;
