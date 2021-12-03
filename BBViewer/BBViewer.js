import React, { useState, useEffect } from "react";
import {SafeAreaView, View,Text,TextInput,
        Button,TouchableOpacity,
        FlatList,StyleSheet, ScrollView} from 'react-native'
import Axios from 'axios'

const BBViewer = () => {
  const [names, setNames] = useState([])
  const [posts, setPosts] = useState([])
  const [result, setResult] = useState('false')
  const [bboard, setBboard] = useState("")
  const [size, setSize] = useState(0)
  const [fresh, setFresh] = useState(0)
  //the url
  const urlValue =
    {name:"",
     email:"",
     appURL: 'https://glacial-hamlet-05511.herokuapp.com',
     secret: "",
   }

   let responseView = (<View></View>)
   if (result=="false") {
     responseView = (
       <View></View>
     )
   } else {
     responseView =  (
       <View>
         <View style={{flex:1}}>
             <FlatList
             style={{flex:1}}
             data = {posts}
             renderItem = {({item}) => (<Posts item={item}/>)}
             keyExtractor = {(item) => item._id}
             />
         </View>
       </View>
       )
   }

   useEffect(() => {
     const getNames = async () => {
       let result = {data:[]}
       result =
         await Axios.get(
           urlValue.appURL+"/bboardNames",
         )
       setNames(result.data)
       setSize(result.data.length)
       return result.data
     }
     const ps = getNames()
   },[fresh])

   useEffect(()=>{
     const getPosts = async () => {
       let postResult = {data:[]}
       postResult =
         await Axios.post(
           urlValue.appURL+"/posts",
           {bboard:bboard}
         )
       setPosts(postResult.data)
       return postResult.data
     }
     const ns = getPosts()
   },[bboard])

   const Item = ({item}) => {
     return (
       <View style={{padding:5,margin:5,backgroundColor:'black'}}>
          <TouchableOpacity onPress={()=>{setResult('true'), setBboard(item)}}>
           <Text style={{color:'red',fontSize:15}}>{item}</Text>
          </TouchableOpacity>
       </View>
     )
   }

   const Posts = ({item}) => {
     return (
       <View style={{padding:10,margin:10,backgroundColor:"#ddd"}}>
        <Text style={{fontSize:20}}>{item.title}</Text>
        <Text>{item.text}</Text>
       </View>
     )
   }

   return(
     <ScrollView
        nestedScrollEnabled={true}
        style={{flex:1, margin:15,padding:30}}>
        <View style={{flex:2, backgroundColor:'black', alignItems:'center', justifyContent:'center'}}>
          <Text style={{fontSize:30,color:'red'}}>BBViewer</Text>
        </View>

        <View style={{flex:1, flexDirection:'row'}}>
          <View style={{flex:1, backgroundColor:'blue', justifyContent:'center',alignItems:'center'}}>
          <TouchableOpacity
            onPress = {() => setFresh(fresh+1)}
          >
            <Text style={{fontSize:15, color:'white'}}>REFRESH BBOARDS</Text>
          </TouchableOpacity>
          </View>

          <ScrollView
             nestedScrollEnabled={true}
             style={{flex:3}}
             horizontal={true}>
          <FlatList
             contentContainerStyle={styles.list}
             style={{flex:1}}
             data = {names}
             renderItem = {({item}) => (<Item item={item}/>)}
             keyExtractor = {(item) => item}
          />
          </ScrollView>
        </View>

        <View style={{flex:1, flexDirection:'row'}}>
          <View style={{flex:1}}>
            <Text style={{fontSize:20,}}>Selected BBoard:</Text>
          </View>
          <View style={{flex:1, alignItems:'flex-start',}}>
            <Text style={{fontSize:20, backgroundColor:'black', color:'red'}}>{bboard}</Text>
          </View>
        </View>

        <View style={{flex:3}}>
          {responseView}
        </View>

        <View style={{flex:1}}>
          <Text>DEBUGGING</Text>
          <Text>bb:{bboard}</Text>
          <Text>show:{result}</Text>
          <Text>bbs.length:{size}</Text>
          <Text>posts = {JSON.stringify(posts,null,5)} </Text>
        </View>
     </ScrollView>
   )

}

const styles = StyleSheet.create({
  list: {
    alignItems: 'center',
    flexDirection: 'row',
  }
});

export default BBViewer
