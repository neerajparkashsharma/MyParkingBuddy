import React, { useState } from "react";
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


export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleClick = async () => {
        //validation
        if(email == '' || password == '' ){
          alert('Please fill all the fields');
          return false;
        }
        else{
          console.log("Inside else")
            axios.post('http://10.20.20.93:8019/login', { emailAddress:email,password:password},
            {headers: {
              'Content-Type': 'application/json',
            }})
            .then(response => alert(response.data))
            .catch(error => alert("Something went wrong: "+error));
            
            
        }
  }
  return (
    <View style={styles.container}>
       {/* <Image
                    resizeMode="contain"
                    style={{width: 4000, height: 400,resizeMode:'contain'}}
                    source={require('./assets/p1.png')}
                  /> */}


                   
 
      <Text style={{  paddingHorizontal: 10,
          color: '#613EEA',
fontWeight:'bold',fontSize:25,
          backgroundColor:'white',marginBottom:30}}>LOGIN</Text>
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
 

<TouchableOpacity

style={{left:120, top:0}}
        onPress={() => navigation.navigate("OnBoarding")}
      >
        <Text style={{color:'#613EEA'}}>Forgot Password?</Text>
      </TouchableOpacity>


      
      <TouchableOpacity style={styles.loginBtn}  onPress={() => handleClick(this)}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity><TouchableOpacity    onPress={() => navigation.push('SignUp')}>
   
        <Text >or <Text style={styles.SignUp}>Sign Up</Text> </Text>
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
    marginBottom: 40},

    inputView: {
      backgroundColor: "#f2f3f4",
      borderRadius: 5,
      width: "70%",
      height: 45,
      marginBottom: 20,
   
      alignItems: "flex-start",
    },
   
    TextInput: {
      height: 50,
      flex: 1,
      padding: 10,
      marginLeft: 20,
      color:'black',
      placeholderTextColor:'black'
    },
   
    SignUp: {
      height: 30,
      marginBottom: 80,
      color:"#613EEA"
    },
   
    loginBtn: {
      width: "70%",
      borderRadius: 5,
      height: 50,
      alignItems: "center",
      justifyContent: "center",
  marginBottom:70,
  top:30,
      backgroundColor: "#613EEA",
    },
  
    st:{
  
  color:"#00cca3",
  fontSize:20,
   marginRight:140,
  
  
  
    },
    st1:{
  
     color:"#00cca3",
     fontSize:20,
      marginRight:170,
     
     
     
       }
       ,
       
       loginText:{
  
  color:"#fff"
  
}
  });

