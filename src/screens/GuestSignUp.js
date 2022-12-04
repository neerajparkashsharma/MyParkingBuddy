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
  TouchableOpacity,ScrollView
} from "react-native";
 
export default function GuestSignUp({ navigation }) {
    const [name, setName] = useState("");
    const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [text, setText] = useState('');
  const [num, setNum] = React.useState('');

  const onChanged = (text) => {
    let newText = '';
    let numbers = '0123456789';

    for (var i=0; i < text.length; i++) {
        if(numbers.indexOf(text[i]) > -1 ) {
            newText = newText + text[i];
        }
       else {
     
    }}
    setNumber(newText);
}


  const handleClick = async () => {
    //validation
    if(name==''  || number == '' || email == '' || password == '' || number=='' ){
      alert('Please fill all the fields');
      return false;
    }
    else{
     
      axios.post(url+'api/register', { name:name,emailAddress:email,password:password,phoneNumber:number,role: {
        id: 2,
        name: "Customer"
    },}
      )
        .then(response => 
          {
          

           
          if(response.data == "User already exists"){

            alert("Email Address already registered!")
          } else
          {
            alert("Registration Successful!");
             navigation.navigate('Login');
            }
        
          }

          )
        
        .catch(error => alert("Something went wrong: "+error));

      
        
       
    }
}
  return (
   
    <View  style={styles.container}>
     
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
          placeholderTextColor="#613EEA"
         
          onChangeText={(name) => setName(name)}
        />
        
 
        
 </View>

 
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Enter Your Contact Number"
          placeholderTextColor="#613EEA"
        
          onChangeText={(number) => setNumber(number)}
        />
        </View>

   
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Enter Your Email"
          placeholderTextColor="#613EEA"
   
          onChangeText={(email) => setEmail(email)}
        />
      </View>
     
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
       placeholder="Enter your Password"
       placeholderTextColor="#613EEA"
     
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