import React, { useState } from "react";
import Toast from "react-native-toast-message";
import axios from 'axios';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  Switch
} from "react-native";
import url from '../commons/axiosUrl.js';

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isEnabled, setIsEnabled] = useState(false);


    


  const handleClick = async () => {
        //validation
        if(email == '' || password == '' ){
          alert('Please fill all the fields');
          return false;
        }
        else{

            axios.post(url+'api/authenticate', { username:email,password:password}     ,
            {
            
              headers: {
                'Content-Type': 'application/json',
                
              }
            }     )
            .then(response => 
             
            {
            
           
              if(response.data == "User not found"){
                alert("User not found!");
              }

              if(response.data.token){
                
                alert("Login Successfull");

                navigation.navigate('Map')
              }
              else{

                alert("else - "+response.data)
              }
              }   
            
            )
            .catch(error => alert(error));
            
            
        }
  }
  return (
    <View style={styles.container}>


                   
 
      <Text style={{  paddingHorizontal: 10,
          color: '#613EEA',
fontWeight:'bold',fontSize:25,
          backgroundColor:'white',marginBottom:30}}>LOGIN</Text>
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
    
<Switch value={isEnabled} style={{marginLeft:-240}}  onValueChange={()=>{ setIsEnabled(isEnabled == true ? false: true);}} />
<Text style={{marginLeft:-180,color:"#613EEA"}}>Remember Me</Text>


<TouchableOpacity

style={{left:80, top:-22}}
        onPress={() => navigation.navigate("OnBoarding")}
      >
        <Text style={{color:'#613EEA'}}>Forgot Password?</Text>
      </TouchableOpacity>


      
      <TouchableOpacity style={styles.loginBtn}  onPress={() => handleClick(this)}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity><TouchableOpacity    onPress={() => navigation.push('SignUpOptions')}>
   
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

