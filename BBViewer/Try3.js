import React, { useState, useEffect } from "react";
import {SafeAreaView, View,Text,TextInput,
        Button,TouchableOpacity,
        FlatList,StyleSheet, ScrollView} from 'react-native'
import Axios from 'axios'

const Try2 = () => {
  const [names, setNames] = useState([])
  const [posts, setPosts] = useState([])
  const [result, setResult] = useState('false')
  const [currBoard, setCurrBoard] = useState("")
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
       <View>
        <Text>For testing: Posts should not be shown</Text>
       </View>
     )
   } else {
     responseView =  (
       <View>
         <View>
            <Text>For testing: Posts should be shown</Text>
         </View>
         <View style={{flex:1}}>
             <FlatList
             style={{flex:1}}
             data = {posts}
             renderItem = {({item}) => (<Posts item={item}/>)}
             />
         </View>
       </View>
       )
   }

   useEffect(()=>{
     const getPosts = async () => {
       let postResult = {data:[]}
       result =
         await Axios.post(
           urlValue.appURL+"/posts",
           {bboard:currBoard}
         )
       setPosts(postResult.data)
       return postResult.data
     }
     const ps = getPosts()
   },[])

   const Item = ({item}) => {
     return (
       <View style={{padding:10,margin:10,backgroundColor:"#ddd"}}>
          <TouchableOpacity onPress={()=>{setResult('true')
                                          setCurrBoard({item})
                                          {responseView}}}>
           <Text>{item}</Text>
          </TouchableOpacity>
       </View>
     )
   }

   const Posts = ({item}) => {
     return (
       <View style={{padding:10,margin:10,backgroundColor:"#ddd"}}>
        <Text>{item.title}</Text>
        <Text>{item.text}</Text>
       </View>
     )
   }

   return(
     <View>
         <FlatList
            style={{flex:1}}
            data = {names}
            renderItem = {({item}) => (<Item item={item}/>)}
         />
         <Text>end of flatlist {JSON.stringify(names,null,5)} </Text>
     </View>
   )

}
export default Try2
