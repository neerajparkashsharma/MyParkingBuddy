import React, { useEffect, useState } from 'react';
import Toast from 'react-native-toast-message';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Switch,
  Dimensions,
  BackHandler,
  SafeAreaView,
} from 'react-native';
import { NavigationActions } from '@react-navigation/compat';
import Icon from 'react-native-vector-icons/FontAwesome';

import url from '../../commons/axiosUrl.js';
import Headerx from '../../components/header.js';
import { colors } from '../../commons/Colors.js';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

export default function Login({ navigation }) {
  useEffect(() => {
    const backAction = () => {
      BackHandler.exitApp(); // Exit the app when the back button is pressed
      return true; // Return true to prevent default back button behavior
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove(); // Clean up the event listener on unmount
  }, []);

  const handleLogin = async (values) => {
    try {
      console.log(values);
      const response = await axios.post(
        `${url}api/authenticate`,
        { username: values.email, password: values.password },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log(response.data);

      if (response.data === 'User not found') {
        Toast.show({
          type: 'error',
          text1: 'User not found!',
          position: 'bottom',
        });
        return;
      }

      const { token, role } = response.data;

      if (!token) {
        Toast.show({
          type: 'error',
          text1: 'Invalid response: ' + response.data,
          position: 'bottom',
        });
        return;
      }

      await AsyncStorage.setItem('userdata', JSON.stringify(response.data?.id));
      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('role', role?.id?.toString() || '');

      if (role?.id === 1) {
        navigation.replace('HostDrawer');
      } else {
        navigation.replace('Drawer');
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        Toast.show({
          type: 'error',
          text1: 'Invalid Credentials',
          position: 'bottom',
        });
      } else {
        Toast.show({
          type: 'error',
          text1: 'Error: ' + error,
          position: 'bottom',
        });
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>LOGIN</Text>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={Yup.object({
          email: Yup.string().email('Invalid email address').required('Email is required'),
          password: Yup.string().required('Password is required'),
        })}
        onSubmit={(values, { setSubmitting }) => {
          handleLogin(values);
          setSubmitting(false);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <View>
            <View style={styles.inputView}>
              <Icon name="envelope" size={20} color="#613EEA" style={styles.icon} />
              <TextInput
                style={styles.textInput}
                placeholder="Enter Your Email"
                placeholderTextColor="#613EEA"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
              />
              {touched.email && errors.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}
            </View>

            <View style={styles.inputView}>
              <Icon name="lock" size={20} color="#613EEA" style={styles.icon} />
              <TextInput
                style={styles.textInput}
                placeholder="Enter your Password"
                placeholderTextColor="#613EEA"
                secureTextEntry={true}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
              />
              {touched.password && errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}
            </View>

            <TouchableOpacity
              style={styles.loginBtn}
              onPress={handleSubmit}
              disabled={isSubmitting}
            >
              <Text style={styles.loginText}>LOGIN</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>

      <View style={styles.bottomContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('OnBoarding')}>
          <Text style={styles.forgotPassword}>Forgot Password</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('SignUpOptions')}>
          <Text style={styles.signUp}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#613EEA',
    marginBottom: 30,
  },
  inputView: {
    flexDirection: 'row',
    height: 50,
    backgroundColor: '#f2f2f2',
    marginBottom: 20,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: SCREEN_WIDTH - 40,
  },
  textInput: {
    fontSize: 16,
    color: '#613EEA',
    marginLeft: 10,
    flex: 1,
  },
  icon: {
    marginRight: 10,
  },
  errorText: {
    color: 'red',
    marginTop: 5,
  },
  loginBtn: {
    height: 50,
    backgroundColor: '#613EEA',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  bottomContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  forgotPassword: {
    color: '#613EEA',
    fontSize: 16,
    marginRight: 10,
  },
  signUp: {
    color: '#613EEA',
    fontSize: 16,
    marginLeft: 10,
  },
  loginText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
