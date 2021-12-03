import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, Image, View, TextInput, Button} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TestPage = () => {

  const [name, setName] = useState("")

  const save = async() => {
    try{
      await AsyncStorage.setItem("LoginName", name)
    }catch(err){
      alert(err);
    }
  }

  const load = async() => {
    try{
      let name = await AsyncStorage.getItem("LoginName")
      if (name != null){
        setName(name);
      }
    } catch(err){
      alert(err);
    }
  }

  const remove = async() => {
    try{
      await AsyncStorage.removeItem("LoginName")
    }catch(err){
      alert(err)
    }finally{
      setName("")
    }
  }

  useEffect(() => {
    load();
  }, []);

  return(
    <View style={styles.container}>
    {/*header*/}
      <View style={{flex:1,flexDirection:'row'}}>
        <View style={{flex:2}}></View>
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
          <Image
            style={styles.headericon}
            source={require('./login.jpg')}
          />
        </View>
        <View style={{flex:2,justifyContent:'center',alignItems:'center'}}>
          <Text style={styles.headerWord}>Login Page</Text>
        </View>
        <View style={{flex:2.5}}></View>
      </View>
    {/*Content*/}
      <View style={{flex:10,backgroundColor:'mistyrose'}}>
        <View style={{flex:1, padding: 15, justifyContent:'center', alignItems:'center',}}>
          <Text style={{fontSize:20, backgroundColor:'lightpink'}}>Previous Login Name:</Text>
          <Text style={{justifyContent:'center', alignItems:'center',}}>{name}</Text>
        </View>

        <View style={{flex:2, padding: 15, justifyContent:'center', alignItems:'center'}}>
          <Text style={{fontSize:20, backgroundColor:'lightpink'}}>What is your name?</Text>
          <TextInput
            style={{fontSize:20}}
            placeholder='Enter here!'
            onChangeText={(text)=>setName(text)}
          />
        </View>

        <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
          <Button
            color='blue'
            title='Save my name!'
            onPress={() => save()}
          />
        </View>

        <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
          <Button
            color='purple'
            title='Remove my name!'
            onPress={() => remove()}
          />
        </View>

        <View style={{flex:4}}></View>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  headericon: {
    width:50,
    height:50,
  },
  headerWord:{
    fontSize:18,
  },
});

export default TestPage;
