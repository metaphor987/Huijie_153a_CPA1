import React, { useState, useEffect } from "react";
import { Button, StyleSheet, Text, TextInput, View, Image, FlatList } from "react-native";
import {useValue} from './ValueContext';

const MyComments = () => {

  const [noteList, setNoteList] = useState([]);
  const [result,setResult] = useState('waiting');
  const [answer, setAnswer] = useState('');
  const [date, setDate] = useState('');
  const {currentValue} = useValue();

  let responseView = (<View></View>)
  if (result=="waiting") {
    responseView = (
      <View style={styles.center}>
      <Button
          color="dodgerblue"
          title="Save This Book"
          onPress={()=> {
            setResult('')
            setNoteList([...noteList, {content:answer, date:date}])
          }}
      />
      </View>
    )
  } else {
    responseView =  (
      <View style={styles.center}>
          <Button
                color='green'
                title='Add Another One!'
                onPress = {() => {
                  setResult('waiting')
                  setAnswer('')
                  setDate('')
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
            source={require('./icon_wish.jpg')}
            />
        </View>
        <View style={{flex:2, alignItems:'center', justifyContent:'center'}}>
          <Text style={styles.headerWord}> Wish List by {currentValue.name}</Text>
        </View>
        <View style={{flex:2.5}}></View>
      </View>

{/*Content*/}
      <View style={{flex:10, backgroundColor:'powderblue'}}>
        <View style={{flex:2, margin:15, justifyContent:'center'}}>
          <TextInput
            style={{fontSize:15, margin:5}}
            placeholder='Add a book name!'
            onChangeText={text => {setAnswer(text)}}
            value={answer}
          />
          <TextInput
              style={{fontSize:15, margin:5}}
              placeholder='Categary'
              onChangeText={text => {setDate(text)}}
              value={date}
          />
        </View>

        <View style={{flex:1}}>
          {responseView}
        </View>

        <View style={{flex:0.5, flexDirection:'row', margin:15}}>
          <View style={{flex:2, alignItems:'center', justifyContent:'center'}}>
            <Text>Wish List</Text>
          </View>
          <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
            <Text>Catogary</Text>
          </View>
        </View>

        <View style={{flex:8,flexDirection:'row', margin:15}}>
          <View style={{flex:2, alignItems:'center', justifyContent:'center'}}>
            <FlatList
              data={noteList}
              renderItem={( {item} ) => (
                <Text>{item.content}</Text>
              )}
              />
          </View>
          <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
            <FlatList
              data={noteList}
              renderItem={( {item} ) => (
                <Text>{item.date}</Text>
              )}
              />
          </View>
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
    alignItems:'stretch',
    justifyContent:'center',
  },
});

export default MyComments
