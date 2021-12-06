import React, {useState, useEffect, useContext} from 'react';
import {ValueContext} from './ValueContext';

import { View, Button,
         FlatList, StyleSheet,
         Text, TextInput, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Pomodoros = () => {
  const [book,setBook] = useState("")
  const [review,setReview] = useState("")
  const [pomodoros,setPomodoros]= useState([])
  const {name} = useContext(ValueContext);

  // this loads in the data after the app has been rendered
  useEffect(() => {getData()}
           ,[name])

  const getData = async () => {
        try {
          // the '@profile_info' can be any string
          const jsonValue = await AsyncStorage.getItem('@wl'+name)
          let data = null
          if (jsonValue!=null) {
            data = JSON.parse(jsonValue)
            setPomodoros(data)
            console.log('just set Info, Name and Email')
          } else {
            console.log('just read a null value from Storage')
            // this happens the first time the app is loaded
            // as there is nothing in storage...
            setPomodoros([])
            setBook("")
            setReview("")
          }
        } catch(e) {
          console.log("error in getData ")
          // this shouldn't happen, but its good practice
          // to check for errors!
          console.dir(e)
          // error reading value
        }
  }

  const storeData = async (value) => {
        try {
          const jsonValue = JSON.stringify(value)
          await AsyncStorage.setItem('@wl'+name, jsonValue)
          console.log('just stored '+jsonValue)
        } catch (e) {
          console.log("error in storeData ")
          console.dir(e)
          // saving error
        }
  }

  const remove = async (name) => {
        try {
          console.log('remove items only for this key')
          const key = '@wl' + name
          console.log(key)
          await AsyncStorage.removeItem('@wl'+name)
        } catch(e) {
          console.log("error in removeData ")
          console.dir(e)
          // clear error
        }
  }

  const clearAll = async (name) => {
        try {
          console.log('in clearData')
          await AsyncStorage.clear()
        } catch(e) {
          console.log("error in clearData ")
          console.dir(e)
          // clear error
        }
  }


// Each Pomorodo in the FlatList will be rendered as follows:
  const renderPomodoro = ({item}) => {
    return (
      <View style={styles.pomodoro}>
      <View style={{flex:1, alignItems:'flex-start'}}>
           <Text>{item.book}</Text>
      </View>
      <View style={{flex:1, alignItems:'flex-end'}}>
           <Text>{item.review}</Text>
      </View>
      </View>
    )
  }

// We can set debug to true if we want to see all of the state variables
  let debug=true
  const debugView =
    (<View>
      <Text style={styles.headerText}>
        DEBUGGING INFO
      </Text>
        <Text>
           num of posts is ({pomodoros.length})
      </Text>
      <Text>
         author is ({name})
      </Text>
      <Text>
         goal is ({book})
      </Text>
      <Text>
         result is ({review})
      </Text>
      <Text>
         pomodoros is {JSON.stringify(pomodoros)}
      </Text>
  </View>);

  // here is where we render the app
  return (

    <View style={styles.container}>
      <View style={{flex:3,backgroundColor:'',justifyContent:'center',}}>
      <Text style={{fontSize:18}}>Hi, {name}</Text>
      <Text style={{fontSize:18}}>
          Save a book to your wish list!
      </Text>
      <Text> </Text>

      <TextInput // for the goal
        style={styles.input}
        placeholder="Book"
        onChangeText={text => {
             setBook(text);
           }}
        value = {book}
      />
      <TextInput // for the result
        style={styles.input}
        placeholder="Book Types"
        onChangeText={text => {
             setReview(text);
           }}
        value = {review}
      />
      <TouchableOpacity
          style={styles.button}
          onPress={() => {
            const newPomodoros =
              pomodoros.concat(
                {'author':name,
                 'book':book,
                 'review':review,
                 'added':new Date()
              })
            setPomodoros(newPomodoros)
            storeData(newPomodoros)
            setBook("")
            setReview("")
          }}
          >
          <Text>Record</Text>

        </TouchableOpacity>

      </View>

      <View style={{flex:4, backgroundColor:''}}>
      <FlatList
        data={pomodoros}
        renderItem={renderPomodoro}
        keyExtractor={item => item.added}
      />
      </View>

      <View style={{flex:1, backgroundColor:'',flexDirection:'row'}}>
        <View style={{flex:1}}>
        <TouchableOpacity
            style={styles.buttonDelete}
            onPress={() => {
              remove(name)
              setPomodoros([])
            }}
        >
          <Text>Delete My WishList</Text>
        </TouchableOpacity>
        </View>

        <View style={{flex:1}}>
        <TouchableOpacity
            style={styles.buttonClear}
            onPress={() => {
              clearAll()
              setPomodoros([])
            }}
        >
          <Text>Clear All Data</Text>
        </TouchableOpacity>
        </View>
      </View>

    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
    margin:15,
  },
  pomodoro:{
    flexDirection:'row',
    padding:10,
    margin:5,
    backgroundColor: '#C7e4e8',
    borderRadius: 10,
    borderColor: 'black',
  },
  input: {
    width: 300,
    height: 30,
    padding: 5,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: 'black',
    marginBottom: 10,

  },
  button: {
    alignItems:'center',
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
  buttonDelete:{
    alignItems:'center',
    backgroundColor: "navajowhite",
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
  buttonClear:{
    alignItems:'center',
    backgroundColor: "ivory",
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


export default Pomodoros;
