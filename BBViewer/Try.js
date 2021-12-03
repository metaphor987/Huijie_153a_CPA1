import React, { useState, useEffect } from "react";
import {SafeAreaView, View,Text,TextInput,
        Button,TouchableOpacity,
        FlatList,StyleSheet, ScrollView} from 'react-native'
import Axios from 'axios'

import ValueProvider,{useValue} from './ValueContext';

const Try = () => {
  const {currentValue} = useValue();
  const [names,setNames] = useState([]);


  useEffect(() => {
    // go out to the server and get the posts for the current bboard

    const getNames = async () => {
      let result = {data:[]}
      result =
        await Axios.post(
          currentValue.appURL+"/bboardNames",
        )
      setNames(result.data)
      return result.data
    }
    const bn = getNames()
  },[bboard])

  const Item = ({item}) => {
       const userid = currentValue.userid;
       const isAuthor = userid === item.author;

    return (
      <View style={{padding:10,margin:10,backgroundColor:"#ddd"}}>
        <Text style={{fontSize:24}}>{item.title}</Text>
        <Text>{item.text}</Text>
        <Text>{item.createdAt}</Text>
      </View>
    )
  }

  return (
    // use ScrollView outside them
    <ScrollView style={{flex:1}}>
    // the first red board: bboard name
      <View style={styles.input}>
        <Text style={{marginRight:10}}>Bboard</Text>
        <TextInput
            onChangeText={(text) => setBboard(text)}
            placeholder="bboard name"/>
      </View>
    //the second red board: add post

     //the blue board: shows in flatlist
      <View style={styles.posts}>
          <Text>
            BBoard n={""+posts.length}
          </Text>
          <FlatList
             style={{flex:1}}
             data = {posts}
             renderItem = {({item}) => (<Item item={item}/>)}
             keyExtractor = {(item) => item._id}
          />

          <Text>end of flatlist {JSON.stringify(posts,null,5)} </Text>

      </View>
    </ScrollView>
  )


}
