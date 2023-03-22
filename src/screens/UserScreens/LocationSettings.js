import { StyleSheet, Text, View,TextInput ,TouchableOpacity} from 'react-native'
import React,{useState} from 'react'
import Headerx from '../../components/header'
import {colors} from '../../commons/Colors'
import {SCREEN_WIDTH,SCREEN_HEIGHT} from '../../components/units'
import axios from 'axios'
import url from '../../commons/axiosUrl'
import AsyncStorage from '@react-native-async-storage/async-storage'
const LocationSettings = props => {
    const [location, setLocation] = useState('')  
    const submit = async () => { 
      const value = await AsyncStorage.getItem('userdata'); // Add "await" before AsyncStorage.getItem since it returns a Promise
      console.log("location");
      try { // Use a try-catch block instead of .catch to handle errors
        const res = await axios.post(`${url}update/location/${location}/${value}`); // Use "await" before the axios.post call
        console.log(res.data);
        props.navigation.navigate('Home');
      } catch (err) {
        console.log(err);
      }
    };

    return (
    <View>
      <Headerx navigation={props?.navigation} headerName={'Settings'}></Headerx>
      <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Enter Your Desired Radius for Parking"
            placeholderTextColor="#613EEA"
            onChange={(location) => setLocation(location)}
            value={location}
            // onChangeText={(email)}
            // value={email}
          />
        </View>

        <TouchableOpacity
          style={styles.loginBtn}   
          onPress={submit}
        >
          <Text style={styles.loginText}>Save</Text>
        </TouchableOpacity>
        

    </View>
  )
}

export default LocationSettings

const styles = StyleSheet.create({


    inputView: {
        backgroundColor: colors.lightgray,
        borderRadius: 5,
        borderColor: colors.themeColor,
        width: SCREEN_WIDTH / 1.2,
        height: SCREEN_HEIGHT / 15,
    left: SCREEN_WIDTH / 11,
        marginBottom: 10,
        marginTop:20,
    elevation: 5,
        alignItems: 'flex-start',
      },
    
      TextInput: {
        height: SCREEN_HEIGHT / 15,
        flex: 1,
        color: colors.themeColor,
    
        padding: SCREEN_HEIGHT / 50,
        marginLeft: 20,
      },
      loginBtn: {
        width: '70%',
        borderRadius: 5,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 70,
        top: 30,
        left: SCREEN_WIDTH / 7,
        backgroundColor: '#613EEA',
      },
      loginText: {
        color: '#fff',
      },
    

})