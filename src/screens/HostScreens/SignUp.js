import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import url from '../../commons/axiosUrl.js';

import axios from 'axios';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Headerx from '../../components/header.js';
import { colors } from '../../commons/Colors.js';
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
export default function SignUp({navigation}) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [text, setText] = useState('');
  const [num, setNum] = React.useState('');

  const handleClick = async () => {
    //validation
    if (name == '' || number == '' || email == '' || password == '') {
      alert('Please fill all the fields');
      return false;
    } else {
      axios
        .post(url + 'api/register', {
          name: name,
          phoneNumber: number,
          emailAddress: email,
          password: password,
          role: {
            id: 1,
            name: 'Host',
          },
        })

        .then(response => {
          if (response.data == 'User already exists') {
            alert('Email Address already registered!');
          } else {
            alert('Registration Successful!');
            navigation.navigate('Login');
          }
        })
        .catch(error => alert('Something went wrong: ' + error));
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <Headerx navigation={navigation} headerName={'Sign Up'} />

      <View style={styles.form}>
   
      <Text
        style={{
          paddingHorizontal: 10,
          color: colors.themeColor,
          fontWeight: '600',
          fontSize: SCREEN_WIDTH/20,
          backgroundColor: 'white',
          marginBottom: 40,
        }}>
        Register as a Parking Host
      </Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Enter Your Name"
          placeholderTextColor="#613EEA"
          onChangeText={name => setName(name)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Enter Your Contact Number"
          placeholderTextColor="#613EEA"
          keyboardType="numeric"
          onChangeText={number => setNumber(number)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Enter Your Email"
          placeholderTextColor="#613EEA"
          onChangeText={email => setEmail(email)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Enter your Password"
          placeholderTextColor="#613EEA"
          secureTextEntry={true}
          onChangeText={password => setPassword(password)}
        />
      </View>

      <TouchableOpacity
        style={styles.loginBtn}
        onPress={() => handleClick(this)}>
        <Text style={styles.loginText}>SIGN UP</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.push('Login')}>
        <Text
          style={{
            marginTop: 35,
          }}>
          {' '}
          or <Text style={styles.forgot_button}>Already Registered?</Text>
        </Text>
      </TouchableOpacity>
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
   backgroundColor: colors.white,
  },

  form: {
    flex:0.9,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  image: {
    marginBottom: 40,
  },

  inputView: {
    backgroundColor: colors.lightgray,
    borderRadius: 5,
elevation:15,
    width: SCREEN_WIDTH/1.2,
    height: SCREEN_HEIGHT/15,

    marginBottom: 30,

    alignItems: 'flex-start',
  },

  TextInput: {
    height:  SCREEN_HEIGHT/15,
    flex: 1,
    color:  colors.themeColor,
    
    padding: SCREEN_HEIGHT/50,
    marginLeft: 20,
  },

  forgot_button: {
    height: 30,
    marginBottom: 120,

    marginTop: 35,
    color: colors.themeColor,
  },

  loginBtn: {
    width: SCREEN_WIDTH/1.2,
    borderRadius: 5,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: colors.themeColor,
  },

  st: {
    color: '#2596be',
    fontSize: 20,
    marginRight: 140,
  },
  st1: {
    color: '#2596be',
    fontSize: 20,
    marginRight: 170,
  },
  loginText: {
    color: '#fff',
  },
});
