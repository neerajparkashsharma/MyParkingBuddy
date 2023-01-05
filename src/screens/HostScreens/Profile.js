import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Image,
    ScrollView,TouchableOpacity
  } from 'react-native';
  import React from 'react';
  import Icon from 'react-native-vector-icons/MaterialIcons'

import {colors} from '../../commons/Colors';
import {SCREEN_HEIGHT,SCREEN_WIDTH} from '../../components/units';
import Headerx from '../../components/header';

  const Profile =props => {
   
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
         <Headerx navigation={props.navigation} headerName={"Your Profile"}/>
          <View style={styles.titleContainer}>
            <Text style={ {fontSize: 26,
      fontWeight: 'bold',marginTop:50,
      color: colors.themeColor}}>Shariq</Text>
            <Text style={styles.editText}>Edit Profile</Text>
          </View>
          <View style={styles.bodyContainer}>
            <View>
              <Text style={styles.fieldTitle}>Full Name</Text>
              <View style={styles.fieldContainer}>
                <Text style={styles.userName}>Shariq</Text>
              </View>
            </View>
            <View style={{marginTop: SCREEN_HEIGHT / 50}}>
              <Text style={styles.fieldTitle}>E-mail</Text>
              <View style={styles.fieldContainer}>
                <Text style={styles.userName}>shariq@gmail.com</Text>
              </View>
            </View>
            <View style={{marginTop: SCREEN_HEIGHT / 50}}>
              <Text style={styles.fieldTitle}>Phone Number</Text>
              <View style={styles.fieldContainer}>
                <Text style={styles.userName}>+9310 1234567</Text>
              </View>
            </View>
          </View>
           <View style={styles.buttonContainer}>
           <TouchableOpacity style={{width: '70%',
    borderRadius: 5,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 70,
    top: 30,
    backgroundColor: '#613EEA'}}>
            <Text style={{color:'white'}}>Update</Text>
            </TouchableOpacity>
          </View> 
        </ScrollView>
      </SafeAreaView>
    );
  };
  export default Profile;
  const profilecardstyles = StyleSheet.create({
    container: {
      backgroundColor: colors.white,
      borderRadius: 100,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      paddingHorizontal: SCREEN_WIDTH / 37,
      paddingVertical: SCREEN_HEIGHT / 81,
   
    },
    cameraContainer: {
      backgroundColor: colors.white,
      borderRadius: 100,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: SCREEN_WIDTH / 41,
      paddingVertical: SCREEN_HEIGHT / 90,
      position: 'absolute',
      right: SCREEN_WIDTH / 75,
      bottom: SCREEN_HEIGHT / 81,
    },
  });
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.white,
    },
    image: {
      alignSelf: 'center',
      height: SCREEN_HEIGHT /5
    },
    profie: {
      position: 'absolute',
      bottom: SCREEN_HEIGHT / 41,
      left: 0,
      right: 0,
    },
    userName: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.gray,
    },
    titleContainer: {
      alignItems: 'center',
      marginTop: SCREEN_HEIGHT / -500,
    },
    editText: {
      color: colors.gray,
      marginTop: SCREEN_HEIGHT / 81,
    },
    fieldContainer: {
      borderWidth: 1,
      borderColor: colors.themeColor,
      borderRadius: 10,
      paddingVertical: SCREEN_HEIGHT / 48,
      paddingLeft: SCREEN_WIDTH / 23,
      marginTop: SCREEN_HEIGHT / 67,
    },
    bodyContainer: {
      marginHorizontal: SCREEN_WIDTH / 21,
      marginTop: SCREEN_HEIGHT / 25,
    },
    fieldTitle: {
      fontSize: 14,
      color: colors.gray,
    },
    buttonContainer: {
      marginHorizontal: SCREEN_WIDTH / 12,
      marginTop: SCREEN_HEIGHT / 38,
    },
  });