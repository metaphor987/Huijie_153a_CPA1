import React, { useState, useEffect } from "react";
import { Button, StyleSheet, Text, TextInput, View, Image, FlatList } from "react-native";
import {useValue} from './ValueContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MyComments = () => {

  const [noteList, setNoteList] = useState([]);
  const [result,setResult] = useState('waiting');
  const [answer, setAnswer] = useState('');
  const [bookName, setBookName] = useState('');
  const [date, setDate] = useState('');
  const [numNewPosts,setNumNewPosts] = useState(0)

  const {currentValue} = useValue();

  const storeData = async(value) => {
    console.log(storeData)
    await AsyncStorage.setItem(currentValue.email, noteList)
    setNumNewPosts(numNewPosts+1)
  }

  const getData = async () => {
    console.log(getData)
    const jsonValue = await AsyncStorage.getItem(currentValue.email)
    if (jsonValue != null){
      setNoteList(jsonValue);
    }
  }

  const removeData = async () => {
    console.log(removeData)
    await AsyncStorage.removeItem(currentValue.email)
  }

  useEffect(() => {
    getData();
  }, [currentValue.email, numNewPosts]);

  let responseView = (<View></View>)
  if (result=="waiting") {
    responseView = (
      <View style={styles.center}>
      <Button
          color="dodgerblue"
          title="Save This Note"
          onPress={()=> {
            setResult('')
            setNoteList([...noteList, {content:answer, date:date, name:bookName, key:numNewPosts}])
            setNumNewPosts(numNewPosts+1)
          }}
      />
      </View>
    )
  } else {
    responseView =  (
      <View style={styles.center}>
          <Button
                color='green'
                title='Add Another Book Review'
                onPress = {() => {
                  setResult('waiting')
                  setAnswer('')
                  setDate('')
                  setBookName('')
                }}

            />
        </View>
      )
  }

  return (
    <View style={styles.container}>
{/*header*/}
      <View style={{flex:1,flexDirection:'row'}}>
        <View style={{flex:2}}></View>
        <View style={{flex:1,alignItems:'flex-end', justifyContent:'center'}}>
          <Image
            style={styles.headericon}
            source={require('./icon_comments.jpg')}
            />
        </View>
        <View style={{flex:2, alignItems:'center', justifyContent:'center'}}>
          <Text style={styles.headerWord}> Book Reviews of {currentValue.name} </Text>
        </View>
        <View style={{flex:2.5}}></View>
      </View>

{/*Content*/}
      <View style={{flex:10, backgroundColor:'powderblue'}}>
        <View style={{flex:2, margin:15, justifyContent:'center'}}>
          <TextInput
            style={{fontSize:15, margin:5}}
            placeholder='Book Name'
            onChangeText={text => {setBookName(text)}}
            value={bookName}
          />
          <TextInput
            style={{fontSize:15, margin:5}}
            placeholder='Your comments'
            onChangeText={text => {setAnswer(text)}}
            value={answer}
          />
          <TextInput
              style={{fontSize:15, margin:5}}
              placeholder='Date'
              onChangeText={text => {setDate(text)}}
              value={date}
          />
        </View>

        <View style={{flex:0.5}}>
          {responseView}
        </View>

        <View style={{flex:0.5, flexDirection:'row', margin:15, backgroundColor:'lightcyan'}}>
          <View style={{flex:1}}>
            <Text>Book</Text>
          </View>
          <View style={{flex:4}}>
            <Text>Comments</Text>
          </View>
          <View style={{flex:1}}>
            <Text>Date</Text>
          </View>
        </View>

        <View style={{flex:8,flexDirection:'row', margin:15}}>
          <View style={{flex:1}}>
            <FlatList
              data={noteList}
              renderItem={( {item} ) => (
                <Text>{item.name}</Text>
              )}
              keyExtractor = {(item) => item.key}
              />
          </View>
          <View style={{flex:4}}>
            <FlatList
              data={noteList}
              renderItem={( {item} ) => (
                <Text>{item.content}</Text>
              )}
              keyExtractor = {(item) => item.key}
              />
          </View>
          <View style={{flex:1}}>
            <FlatList
              data={noteList}
              renderItem={( {item} ) => (
                <Text>{item.date}</Text>
              )}
              keyExtractor = {(item) => item.key}
              />
          </View>
        </View>

        <View>
        <Button
          color='blue'
          title='Save all my!'
          onPress={() => storeData()}
        />
        <Button
          color='green'
          title='Delete all my!'
          onPress={() => removeData()}
        />
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
  },
  headericon: {
    width:50,
    height:50,
  },
  headerWord:{
    fontSize:18,
  },
  center:{
    alignItems:'center',
    justifyContent:'center',
  },
});

export default MyComments
