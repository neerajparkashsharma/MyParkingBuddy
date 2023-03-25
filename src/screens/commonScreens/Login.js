import React, {useEffect, useState} from 'react';
import Toast from 'react-native-toast-message';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  Switch,
  Dimensions,
} from 'react-native';
import Headerx from '../../components/header.js';
import {Formik} from 'formik';
import * as Yup from 'yup';

import url from '../../commons/axiosUrl.js';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors} from '../../commons/Colors.js';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

export default function Login({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isEnabled, setIsEnabled] = useState(false);
  const [idd, setId] = useState();

  const storeData = async value => {
    try {
      console.log('VALUES LoGIN =>>', value);
      await AsyncStorage.setItem('userdata', value.toString());
    } catch (e) {
      // saving error
    }
  };



  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('userdata');
      if (value !== null) {
        value = JSON.parse(value);
        console.log(value);
      }
    } catch (e) {
      // error reading value
    }
  };

  const handleClick = async () => {
    //validation
    if (email == '' || password == '') {
      alert('Please fill all the fields');
      return false;
    } else {
      axios
        .post(
          url + 'api/authenticate',
          {username: email, password: password},
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        )
        .then(response => {
          console.log(response.data);
          if (response.data == 'User not found') {
            alert('User not found!');
          }

          if (response.data.token) {
            setEmail('');
            setPassword('');
            storeData(response.data.id);
            AsyncStorage.setItem('token', response.data.token);
            AsyncStorage.setItem('role', response.data.role.id.toString());
            response.data.role == null
              ? alert('Something went wrong')
              : response.data.role.id == 1
              ? navigation.replace('HostDrawer')
              : navigation.replace('Drawer');
          } else {
            alert('else - ' + response.data);
          }
        })
        .catch(error =>
          alert(error.response.status == 404 ? 'Invalid Credentials' : error),
        );
    }
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
      {/* <Headerx navigation={navigation} headerName={'Login'} /> */}
      <View style={styles.container}>
        <Text
          style={{
            paddingHorizontal: 10,
            color: '#613EEA',
            fontWeight: 'bold',
            fontSize: 25,
            backgroundColor: 'white',
            marginBottom: 30,
          }}>
          LOGIN
        </Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Enter Your Email"
            placeholderTextColor="#613EEA"
            onChangeText={email => setEmail(email)}
            value={email}
          />
        </View>

        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Enter your Password"
            value={password}
            placeholderTextColor="#613EEA"
            secureTextEntry={true}
            onChangeText={password => setPassword(password)}
          />
        </View>

        {/* <Switch
        value={isEnabled}
        style={{marginLeft: -240}}
        onValueChange={() => {
          setIsEnabled(isEnabled == true ? false : true);
        }}
      /> */}
        {/* <Text style={{marginLeft: -180, color: '#613EEA'}}>Remember Me</Text> */}

        <TouchableOpacity onPress={() => navigation.navigate('OnBoarding')}>
          <Text style={{color: '#613EEA'}}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => handleClick(this)}>
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.push('SignUpOptions')}>
          <Text>
            or <Text style={styles.SignUp}>Sign Up</Text>{' '}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundGradient: 'vertical',
    backgroundGradientTop: '#333333',
    backgroundGradientBottom: '#666666',
  },

  image: {
    marginBottom: 40,
  },
  inputView: {
    backgroundColor: colors.lightgray,
    borderRadius: 5,

    width: SCREEN_WIDTH / 1.2,
    height: SCREEN_HEIGHT / 15,

    marginBottom: 30,

    alignItems: 'flex-start',
  },

  TextInput: {
    height: SCREEN_HEIGHT / 15,
    flex: 1,
    color: colors.themeColor,

    padding: SCREEN_HEIGHT / 50,
    marginLeft: 20,
  },

  SignUp: {
    height: SCREEN_HEIGHT - 630,
    marginBottom: 80,
    color: '#613EEA',
  },

  loginBtn: {
    width: '70%',
    borderRadius: 5,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 70,
    top: 30,
    backgroundColor: '#613EEA',
  },

  st: {
    color: '#00cca3',
    fontSize: 20,
    marginRight: 140,
  },
  st1: {
    color: '#00cca3',
    fontSize: 20,
    marginRight: 170,
  },
  loginText: {
    color: '#fff',
  },
});
