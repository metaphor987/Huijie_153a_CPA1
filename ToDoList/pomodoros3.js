import React, { useState, useEffect }  from 'react';
import { View, Button,
         FlatList, StyleSheet,
         Text, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';


const Pomodoros = () => {
  const [dateTime,setDateTime] = useState(moment().format("DD/MM/YYYY"));
  const [book,setBook] = useState("")
  const [review,setReview] = useState("")
  const [pomodoros,setPomodoros]= useState([])

  // this loads in the data after the app has been rendered
  useEffect(() => {getData()}
           ,[])

  const getData = async () => {
        try {
          // the '@profile_info' can be any string
          const jsonValue = await AsyncStorage.getItem('@pomodoros')
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
            setDateTime(dateTime)
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
          await AsyncStorage.setItem('@pomodoros', jsonValue)
          console.log('just stored '+jsonValue)
        } catch (e) {
          console.log("error in storeData ")
          console.dir(e)
          // saving error
        }
  }

  const clearAll = async () => {
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
      <View style={{flex:1}}>
           <Text>{item.dateTime}</Text>
      </View>
      <View style={{flex:3}}>
           <Text>{item.book}</Text>
      </View>
      <View style={{flex:1}}>
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
         dateTime is ({dateTime})
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
      <Text style={styles.headerText}>Pomodoros</Text>
      <Text style={{fontSize:12}}>
          Enter the info for your current pomodoro below
      </Text>

      <View style={{flexDirection:'row',
                    margin:20,
                    justifyContent:'space-around'}}>
            <TextInput // for the date/time
              style={{fontSize:12}}
              placeholder="Date"
              onChangeText={text => {
                   setDateTime(text);
                 }}
              value = {dateTime}
            />

            <TextInput // for the goal
              style={{fontSize:12}}
              placeholder="Book"
              onChangeText={text => {
                   setBook(text);
                 }}
              value = {book}
            />

            <TextInput // for the result
              style={{fontSize:12}}
              placeholder="Book Review"
              onChangeText={text => {
                   setReview(text);
                 }}
              value = {review}
            />
        </View>
        <View style={{flexDirection:'row',
                      justifyContent:'space-around'}}>
        <Button
               title={"Record"}
               color="blue"
               onPress = {() => {
                 const newPomodoros =
                   pomodoros.concat(
                     {'dateTime':dateTime,
                      'book':book,
                      'review':review,
                      'added':new Date()
                   })
                 setPomodoros(newPomodoros)
                 storeData(newPomodoros)
                 setDateTime(moment().format("DD/MM/YYYY"))
                 setBook("")
                 setReview("")
               }}
               />
        <Button
                title={"Clear"}
                color="red"
                onPress = {() => {
                  clearAll()
                  setPomodoros([])
                }}
                />

      </View>


      <View style={{flexDirection:'row', backgroundColor:'lightgray'}}>
        <View style={{flex:1, alignItems:'center'}}>
          <Text style={{fontSize:20,}}>Date</Text>
        </View>
        <View style={{flex:3, alignItems:'center'}}>
          <Text style={{fontSize:20,}}>Book</Text>
        </View>
        <View style={{flex:1, alignItems:'center'}}>
          <Text style={{fontSize:20,}}>Book Reviews</Text>
        </View>
      </View>

      <FlatList
        data={pomodoros}
        renderItem={renderPomodoro}
        keyExtractor={item => item.dateTime}
      />

      {debug?debugView: <Text></Text>}

    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'column',
    backgroundColor: '#eee',
    justifyContent: 'center',
    textAlign:'left',
    marginTop:20,
    padding:20,
  },
  pomodoro:{
    flexDirection:'row',
    justifyContent:'space-between',
  },
  headerText: {
    textAlign:'center',
    backgroundColor:'#aaa',
    fontSize: 32,
    padding:10,
    color: 'blue'
  },

});


export default Pomodoros;
