import React, { useState } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import axios from 'axios';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
 
export default function SignUp({ navigation }) {
    const [name, setName] = useState("");
    const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleClick = async () => {
    //validation
    if(name==''  || number == '' || email == '' || password == '' ){
      alert('Please fill all the fields');
      return false;
    }
    else{
     
        axios.post('http://10.20.20.93:8019/user', { name:name,phoneNumber:number,emailAddress:email,password:password},
        {headers: {
          'Content-Type': 'application/json',
        }})
        .then(response => alert(response.data))
        .then(response => navigation.navigate('Login'))
        .catch(error => alert("Something went wrong: "+error));
l
      
        
       
    }
}
  return (
    <View style={styles.container}>
     
       {/* <Image
                    resizeMode="contain"
                    style={{width: 330, height: 300,marginLeft:10,marginTop:50}}
                    source={require('./assets/Signup.png')}
                  /> */}
                  

      <Text style={{  paddingHorizontal: 10,
          color: '#613EEA',
fontWeight:'bold',fontSize:25,
          backgroundColor:'white',marginBottom:10}}>REGISTRATION</Text>
    

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          
          placeholder="Enter Your Name"
         
          onChangeText={(name) => setName(name)}
        />
        
 

 </View>

 
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Enter Your Contact Number"
        
          onChangeText={(number) => setNumber(number)}
        />
        </View>

   
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Enter Your Email"
   
          onChangeText={(email) => setEmail(email)}
        />
      </View>
     
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
       placeholder="Enter your Password"
     
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>
      
     

      <TouchableOpacity style={styles.loginBtn} onPress={() => handleClick(this)}>
        <Text style={styles.loginText}>SIGN UP</Text>
      </TouchableOpacity>
      <TouchableOpacity    onPress={() => navigation.push(
        'Login')}>
       <Text style={{
   marginTop:35,}}> or <Text style={styles.forgot_button}>Already Registered?</Text></Text>
      </TouchableOpacity>
 
    </View>
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    backgroundGradient: "vertical",
    backgroundGradientTop: "#333333",
    backgroundGradientBottom: "#666666"
 
  },
 
  image: {
    marginBottom: 40,
  },
 
  inputView: {
    backgroundColor: "#f2f3f4",
    borderRadius: 5,
   
    width: "70%",
    height: 45,
   
    marginBottom: 30,
 
    alignItems: "flex-start",
  },
 
  TextInput: {
    height: 50,
    flex: 1,
     color:"#black",
     placeholderTextColor:"#black",
    padding: 10,
    marginLeft: 20,
   
   
  },
 
  forgot_button: {
    height: 30,
   marginBottom:120,
   
   marginTop:35,
   color:'#613EEA',
   
  },
 
  loginBtn: {
    width: "70%",
    borderRadius: 5,
    height: 50,
    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "#613EEA",
  },

  st:{

color:"#2596be",
fontSize:20,
 marginRight:140,



  },
  st1:{

   color:"#2596be",
   fontSize:20,
    marginRight:170,
   
   
   
     },
     loginText:{

      color:"#fff"
}
})