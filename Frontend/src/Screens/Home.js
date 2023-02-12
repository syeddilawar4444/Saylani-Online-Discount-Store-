import React from 'react'
import {ImageBackground ,View,SafeAreaView,Text,Platform,StatusBar,Image}  from "react-native"



function Home(props) {
  return (
  //  <Text> dilawar</Text>
      <View style={{marginHorizontal:30,width:"100%",backgroundColor:"green" } } >
        <View>
          <Text>SAYLANI WELFARE</Text>
          <Image source={require('../')} />
        </View>
      <Text style={{ fontSize : 26}}>Home page</Text>
      <Text  style={{fontSize : 26}}>Project</Text>

      </View>
  )
}
// const styles = StyleSheet.create({

// })


export default Home