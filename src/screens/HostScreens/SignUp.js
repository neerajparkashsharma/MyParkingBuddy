import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Icon from 'react-native-vector-icons/FontAwesome';
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

const SignUpSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  number: Yup.string().required('Contact number is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const SignUp = ({ navigation }) => {
  const handleSubmit = (values) => {
    axios
      .post(url + 'api/register', {
        name: values.name,
        phoneNumber: values.number,
        emailAddress: values.email,
        password: values.password,
        role: {
          id: 1,
          name: 'Host',
        },
      })
      .then((response) => {
        if (response.data === 'User already exists') {
          alert('Email Address already registered!');
        } else {
          alert('Registration Successful!');
          navigation.navigate('Login');
        }
      })
      .catch((error) => alert('Something went wrong: ' + error));
  };

  return (
    <SafeAreaView style={styles.container}>

      <Headerx
      headerName={'Register as a Parking Host'}
      navigation={navigation}
      />
      <View style={styles.form}>
        <Text style={styles.title}>Register as a Parking Host</Text>

        <Formik
          initialValues={{ name: '', number: '', email: '', password: '' }}
          validationSchema={SignUpSchema}
          onSubmit={handleSubmit}
        >
          {({ values, handleChange, handleSubmit, errors, touched }) => (
            <>
              <View style={styles.inputView}>
                <Icon name="user" size={20} color="#613EEA" style={styles.icon} />
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.TextInput}
                    placeholder="Enter Your Name"
                    placeholderTextColor="#613EEA"
                    onChangeText={handleChange('name')}
                    value={values.name}
                  />
                </View>
              </View>
              {touched.name && errors.name && (
                <Text style={styles.errorText}>{errors.name}</Text>
              )}

              <View style={styles.inputView}>
                <Icon name="phone" size={20} color="#613EEA" style={styles.icon} />
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.TextInput}
                    placeholder="Enter Your Contact Number"
                    placeholderTextColor="#613EEA"
                    keyboardType="numeric"
                    onChangeText={handleChange('number')}
                    value={values.number}
                  />
                </View>
              </View>
              {touched.number && errors.number && (
                <Text style={styles.errorText}>{errors.number}</Text>
              )}

              <View style={styles.inputView}>
                <Icon name="envelope" size={20} color="#613EEA" style={styles.icon} />
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.TextInput}
                    placeholder="Enter Your Email"
                    placeholderTextColor="#613EEA"
                    onChangeText={handleChange('email')}
                    value={values.email}
                  />
                </View>
              </View>
              {touched.email && errors.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}

              <View style={styles.inputView}>
                <Icon name="lock" size={20} color="#613EEA" style={styles.icon} />
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.TextInput}
                    placeholder="Enter your Password"
                    placeholderTextColor="#613EEA"
                    secureTextEntry={true}
                    onChangeText={handleChange('password')}
                    value={values.password}
                  />
                </View>
              </View>
              {touched.password && errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}

              <TouchableOpacity style={styles.loginBtn} onPress={handleSubmit}>
                <Text style={styles.loginText}>SIGN UP</Text>
              </TouchableOpacity>
            </>
          )}
        </Formik>

        <TouchableOpacity onPress={() => navigation.push('Login')}>
          <Text style={styles.forgot_button}>Already Registered?</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  form: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    paddingHorizontal: 10,
    color: '#613EEA',
    fontWeight: '600',
    fontSize: SCREEN_WIDTH / 20,
    backgroundColor: 'white',
    marginBottom: 40,
  },
  inputView: {
    backgroundColor: '#F0F0F0',
    borderRadius: 5,
    elevation: 2,
    width: SCREEN_WIDTH / 1.2,
    height: SCREEN_HEIGHT / 15,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginLeft: 10,
  },
  inputContainer: {
    flex: 1,
  },
  TextInput: {
    height: SCREEN_HEIGHT / 15,
    flex: 1,
    color: '#613EEA',
    padding: SCREEN_HEIGHT / 50,
    marginLeft: 10,
  },
  errorText: {
    color: 'red',
    marginLeft: 10,
    fontSize: 12,
  },
  loginBtn: {
    width: SCREEN_WIDTH / 1.2,
    borderRadius: 5,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#613EEA',
    marginTop: 20,
  },
  loginText: {
    color: '#fff',
  },
  forgot_button: {
    color: '#613EEA',
    marginTop: 20,
  },
});

export default SignUp;
