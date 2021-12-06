import React, {useState, useEffect, useContext} from 'react';
import {ValueContext} from './ValueContext';

import {StyleSheet, Text, Image, View, TextInput, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';



const TestPage = () => {

  const {changeInfo} = useContext(ValueContext);
  const {name} = useContext(ValueContext);
  const [previous, setPrevious] = useState('');

  const save = async(previous) => {
    try{
      previous = name
      console.log(previous)
      await AsyncStorage.setItem("PreviousName", previous)
      const ans = await AsyncStorage.getItem("PreviousName")
      console.log(ans)
      console.log("This is what in the key")
    }catch(err){
      alert(err);
    }
  }

  const load = async() => {
    try{
      const ans = await AsyncStorage.getItem("PreviousName")
      if (ans != null){
        setPrevious(ans);
        console.log(ans);
        console.log("load is running")
      } else {
        console.log("ans is null")
      }
    } catch(err){
      alert(err);
    }
  }

  const remove = async() => {
    try{
      console.log("remove is running")
      await AsyncStorage.removeItem("PreviousName")
    }catch(err){
      alert(err)
    } finally{
      setPrevious("")
    }
  }

  useEffect(() => {
    load();
  }, []);


  return(
    <View style={styles.container}>
      <View style={{flex:2, backgroundColor:'', justifyContent:'center', alignItems:'center'}}>
          <Text style={styles.header}>Login Page</Text>
      </View>

      <View style={{flex:2, backgroundColor:''}}>
      <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
          <Text style={{fontSize:20,}}>What is your name?</Text>
      </View>
      <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
          {changeInfo}
          <Text>Previous Username: {previous}</Text>
      </View>
      </View>

      <View style={{flex:1, backgroundColor:'',justifyContent:'center'}}>
        <TouchableOpacity
            style={styles.button}
            onPress={() => {setPrevious(name)
                            save(previous)}}
        >
          <Text>Save my name!</Text>
        </TouchableOpacity>
      </View>
      <View style={{flex:1, backgroundColor:'',justifyContent:'center'}}>
        <TouchableOpacity
            style={styles.button}
            onPress={() => remove()}
        >
          <Text>Remove my name!</Text>
        </TouchableOpacity>
      </View>
      <View style={{flex:2}}></View>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
    margin:30,
  },
  header:{
    fontSize:25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    alignItems: "center",
    backgroundColor: "#3498db",
    margin:10,
    padding: 10,
    borderRadius: 15,
    shadowColor:'#2a2a2a',
    shadowOpacity:0.15,
    shadowRadius:4,
    shadowOffset:{
      width:0,
      height:2
    },
    elevation:2,
  },
});

export default TestPage;
