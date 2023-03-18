import React, {useCallback, useState, useEffect, useRef} from 'react';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import Icon from 'react-native-vector-icons/FontAwesome';
import url from '../../commons/axiosUrl';
import axios from 'axios';
import Geocoder from 'react-native-geocoding';
import Geolocation from '@react-native-community/geolocation';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';

import QRCode from 'react-native-qrcode-svg';

import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Platform,
  PermissionsAndroid,
  TextInput,
} from 'react-native';

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {ScrollView} from 'react-native-gesture-handler';
import Headerx from '../../components/header';

import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../components/units';
import {colors} from '../../commons/Colors';

const ParkingRegistrationPage2 = props => {
  const [charges, setCharges] = useState('');
  const [checkin, setCheckin] = useState('');
  const [checkout, setCheckout] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [uid, setUid] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const placesRef = useRef();
  const [latLong, setLatLong] = useState({
    latitude: 0,
    longitude: 0,
  });

  const submitDetails = () => {
  
    console.log("Charges =>>",charges);
    console.log("Location =>>",location);
    console.log("LatLong =>>",latLong.latitude+" "+latLong.longitude);


    const payload = {
        parkingCharges: charges,
        parkingLocation: location.description,
        latitude: latLong.latitude,
        longitude: latLong.longitude,
    
    };


    axios
        .post(url + 'parking', payload)

        .then(response => {
          alert(response.data);
          props?.navigation.goBack();
          setCharges('');
            setLocation('');
            
        })
        .catch(error => alert('Something went wrong: ' + error));
    }


  return (
    <View style={{backgroundColor: 'white',flex:1}}>
      <View style={{backgroundColor: '#fff'}}>
        <View style={styles.container}>
          <Headerx
            navigation={props?.navigation}
            headerName={'Parking Registration'}
          />
          <Text
            style={{
              paddingHorizontal: 10,
              color: '#613EEA',
              fontWeight: 'bold',
              fontSize: 25,
              backgroundColor: 'white',
              textAlign: 'center',
              marginTop: SCREEN_HEIGHT / 25,
              marginBottom: SCREEN_HEIGHT / 25,
            }}>
            Register a new Parking
          </Text>

          <SafeAreaView style={styles.container}>
            <View style={formstyles.bodyContainer}>
              <View>
                <View>
                  <Text style={formstyles.fieldTitle}>
                    Enter Parking Chargers (Per hour)
                  </Text>
                  <TextInput
                    style={formstyles.fieldContainer}
                    placeholderTextColor={colors.themeColor}
                    placeholder="Enter Charges"
                    value={charges}
                    keyboardAppearance="dark"
                    keyboardType="numeric"
                    onChangeText={charges => setCharges(charges)}></TextInput>
                </View>
                {/* <View style={{ marginTop: SCREEN_HEIGHT / 30 }}>
                <Text style={formstyles.fieldTitle}>
                  Enter Code for Check-Out
                </Text>
                <TextInput
                  style={formstyles.fieldContainer}
                  placeholder="Enter Code for Check-In"
                  placeholderTextColor={'#613EEA'}
                  value={checkin}
                  onChange={(checkin) => setCheckin(checkin)}
                />
              </View>

              <View style={{ marginTop: SCREEN_HEIGHT / 30 }}>
                <Text style={formstyles.fieldTitle}>
                  Enter Code for Check-Out
                </Text>
                <TextInput
                  style={formstyles.fieldContainer}
                  placeholder="Enter Code for Check-Out"
                  placeholderTextColor={'#613EEA'}
                  value={checkout}
                  onChange={(checkout) => setCheckout(checkout)}
                />
              </View> */}
              </View>
            </View>
          </SafeAreaView>

          <TouchableOpacity style={styles.submit} onPress={()=>submitDetails()}>
            <Text style={styles.loginText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
      <GooglePlacesAutocomplete
        placeholder="Enter Parking Location"
        minLength={2}
        autoFocus={false}
        returnKeyType={'default'}
        //   filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities

        fetchDetails={true}
        ref={placesRef}

        textInputProps={{
          onChangeText: text => {
            setLocation(text);
          },

          autoFocus: true,
          placeholderTextColor: '#613EEA',
          blurOnSubmit: false,

          color: '#613EEA',
          padding: 10,
          marginLeft: 20,
          backgroundColor: '#f2f3f4',
        }}
        onPress={(data, details = null) => {
          console.log(details.geometry.location.lat);
          console.log(details.geometry.location.lng);

          setLocation(data);

          setLatLong({
            latitude: details.geometry.location.lat,
            longitude: details.geometry.location.lng,
          });
        }}
        query={{
          key: 'AIzaSyDUsfGK5aTpPQ1ik_1ncS2eFPN6DoOd2vw',
          language: 'en',
        }}
        styles={{
          textInputContainer: {
            backgroundColor: '#f2f3f4',
            borderRadius: 10,
            height:70,
            width:'90%',
            
            alignSelf: 'center',
            textAlign:'center',
            justifyContent:'center',
          },
          description: {
            color: '#613EEA',
            fontSize: 15,

            alignItems: 'flex-start',
            marginLeft: 20,
            padding: 5,
            flex: 1,
          },

          textInput: {color: '#613EEA',justifyContent: 'center',top:9},
          predefinedPlacesDescription: {
            color: '#1faadb',
          },
        }}
      />
    </View>
  );
};

export default ParkingRegistrationPage2;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },

  image: {
    marginBottom: 40,
  },

  descriptionView: {
    backgroundColor: '#f2f3f4',
    borderRadius: 5,

    width: '70%',
    height: 100,

    marginBottom: 30,

    alignItems: 'flex-start',
  },
  inputView: {
    backgroundColor: '#f2f3f4',
    borderRadius: 5,

    width: '70%',
    height: 55,

    marginBottom: 30,

    alignItems: 'flex-start',
  },

  TextInput: {
    height: 50,
    flex: 1,
    color: '#613EEA',

    padding: 10,
    marginLeft: 20,
  },

  descriptionInput: {
    height: 100,
    flex: 1,
    color: '#613EEA',

    padding: 10,
    marginLeft: 20,
  },
  forgot_button: {
    height: 30,
    marginBottom: 120,

    marginTop: 35,
    color: '#613EEA',
  },

  loginBtn: {
    width: '70%',
    borderRadius: 5,
    height: 50,
    marginBottom: 30,
    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: '#613EEA',
  },

  submit: {
    width: '70%',
    borderRadius: 5,
    height: 50,

    alignSelf: 'center',
    top: 190,

    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: '#613EEA',
  },
  ImageBtn: {
    width: '70%',
    borderRadius: 5,
    height: 50,
    bottom: 30,
    top: -10,
    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: '#613EEA',
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

const formstyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  image: {
    alignSelf: 'center',
    height: SCREEN_HEIGHT / 5,
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
    backgroundColor: '#f2f3f4',
    borderRadius: 10,
    paddingVertical: SCREEN_HEIGHT / 48,
    paddingLeft: SCREEN_WIDTH / 23,
    marginTop: SCREEN_HEIGHT / 67,
  },
  bodyContainer: {
    marginHorizontal: SCREEN_WIDTH / 21,
    marginTop: SCREEN_HEIGHT / 10,
  },
  fieldTitle: {
    fontSize: 14,
    color: colors.themeColor,
  },
  buttonContainer: {
    marginHorizontal: SCREEN_WIDTH / 12,
    marginTop: SCREEN_HEIGHT / 38,
  },
});
