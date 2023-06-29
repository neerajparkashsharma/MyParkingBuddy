import React, { useEffect, useState } from 'react';
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
  Dimensions
} from 'react-native';
import Headerx from '../../components/header.js';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { NavigationActions } from '@react-navigation/compat';

import url from '../../commons/axiosUrl.js';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../commons/Colors.js';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

export default function Login({ navigation }) {

 

 

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
    try {
      // Validation
      if (email === '' || password === '') {
        alert('Please fill all the fields');
        return;
      }

      const response = await axios.post(
        `${url}api/authenticate`,
        { username: email, password: password },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log(response.data);

      if (response.data === 'User not found') {
        alert('User not found!');
        return;
      }

      const { token, role } = response.data;

      if (!token) {
        alert('Invalid response: ' + response.data);
        return;
      }
      

      setEmail('');
      setPassword('');

      await AsyncStorage.setItem('userdata',JSON.stringify(response.data?.id))
      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('role', role?.id?.toString() || '');

     

      if (role?.id == 1) {

        
      //   const resetAction = NavigationActions.reset({
      //     index: 0,
      //     routes: [{ name: 'HostDrawer' }],
      //   });
        
        // navigation.dispatch( 
        //   NavigationActions.navigate({
        //     routeName: 'HostDrawer',
        //     action: NavigationActions.navigate({ routeName: 'HostDrawer' }),
        //   })
        // );

        navigation.replace('HostDrawer');

      } else {
       
     
        navigation.replace('Drawer');
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        alert('Invalid Credentials');
      } else {
        alert('Error: ' + error);
      }
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
     
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
 


        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => handleClick(this)}>
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <TouchableOpacity onPress={() => navigation.navigate('OnBoarding')}>
            <Text style={{ color: '#613EEA', right: 60, fontSize: 16, }}>Forgot Password</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.push('SignUpOptions')}>

            <Text style={styles.SignUp}>Sign Up</Text>

          </TouchableOpacity>
        </View>
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
    top: SCREEN_HEIGHT / 6,
  },

  image: {
    marginBottom: 40,
  },
  inputView: {
    backgroundColor: colors.lightgray,
    borderRadius: 5,
    elevation: 15,
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
    left: 60,
    fontSize: 16,

  },

  loginBtn: {
    width: '70%',
    borderRadius: 5,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 70,
    top: 10,
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
