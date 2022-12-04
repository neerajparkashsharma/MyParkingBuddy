import { View, Text,Image,TouchableOpacity } from 'react-native'
import React from 'react'

const SignUpOptions = ({navigation}) => {
  return (
    <View  style={{top:30, alignItems:'center'}}>
        

        <Text style={{fontSize:30, fontWeight:'bold',color:'black'}}> Select <Text style={{fontSize:30, fontWeight:'bold',color:'#613EEA'}}>Account</Text> </Text>
      
        <TouchableOpacity style={{flexDirection:"row",alignItems:'center',justifyContent:'center'}} onPress={()=>navigation.navigate("SignUp")}>

       <Image style={{top:30,width:'100%',border:2,height:150}} source={require('../Images/host.png')}/>
</TouchableOpacity>
<Text style={{top:45,fontSize:25,  fontWeight:'bold',color:'black'}} onPress={()=>navigation.navigate("SignUp")}>Parking Host</Text>


<Text style={{top:55,fontSize:17,  fontWeight:'bold',color:'#613EEA'}}> OR </Text>
<TouchableOpacity style={{flexDirection:"row",alignItems:'center',justifyContent:'center'}} onPress={()=>navigation.navigate("GuestSignUp")}>

<Image style={{top:57,width:'100%',border:2,height:150}} source={require('../Images/spaceuser.png')}/>
</TouchableOpacity>
<Text style={{top:95,fontSize:25,  fontWeight:'bold',color:'black'}}  onPress={()=>navigation.navigate("GuestSignUp")}>Register as a Space User</Text>


    </View>
  )
}

export default SignUpOptions