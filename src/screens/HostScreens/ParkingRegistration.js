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

const ParkingRegistration = props => {
  const [charges, setCharges] = useState('');
  const [checkin, setCheckin] = useState('');
  const [checkout, setCheckout] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocaiton] = useState('');
  const [uid, setUid] = useState('');

  const placesRef = useRef();
  const [latLong, setLatLong] = useState({
    latitude: 0,
    longitude: 0,
  });
  useEffect(() => {
    fetchLocation();
  }, []);

  const handleClick = async () => {
    //validation
    if (
      location == '' ||
      description == '' ||
      checkout == '' ||
      checkin == '' ||
      charges == ''
    ) {
      alert('Please fill all the fields');
      console.log(
        'locaiton' +
          location +
          'descr' +
          description +
          'checkout' +
          checkout +
          'check in' +
          checkin +
          'charges' +
          charges,
      );
      alert('Please fill all the fields');
      return false;
    } else {
      setUid(getData());
      console.log(
        checkin +
          '' +
          checkout +
          '' +
          charges +
          '' +
          description +
          '' +
          location +
          '' +
          uid,
      );
      axios
        .post(url + 'parking', {
          parkingLocation: location,
          parkingCharges: charges,
          description: description,
          latitude: latLong.latitude,
          longitude: latLong.longitude,
          checkInCode: checkin,
          checkOutCode: checkout,
          host: {id: uid},
        })

        .then(response => {
          alert(response.data);
          props.navigation.navigate('ParkingBookings+');
        })
        .catch(error => alert('Something went wrong: ' + error));
    }
  };

  const fetchLocation = async () => {
    const chckLocationPermission = PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    if (chckLocationPermission === PermissionsAndroid.RESULTS.GRANTED) {
      alert("You've access for the location");
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          Geolocation.getCurrentPosition(position => {
            let {latitude, longitude} = position.coords;

            setLatLong({
              latitude: latitude,
              longitude: longitude,
            });
          });
        } else if (granted === PermissionsAndroid.RESULTS.DENIED) {
          fetchLocation();
          console.log('ACCESS_FINE_LOCATION permission denied');
        } else if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
          // setModalState(!modalState);
        }
      } catch (err) {
        alert(err);
      }
    }
  };
  const [filePath, setFilePath] = useState();

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission',
          },
        );
        // If CAMERA Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else return true;
  };

  const requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs write permission',
          },
        );
        // If WRITE_EXTERNAL_STORAGE Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        alert('Write permission err', err);
      }
      return false;
    } else return true;
  };

  const captureImage = async type => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
      videoQuality: 'low',
      durationLimit: 30, //Video max duration in seconds
      saveToPhotos: true,
    };
    let isCameraPermitted = await requestCameraPermission();
    let isStoragePermitted = await requestExternalWritePermission();
    if (isCameraPermitted && isStoragePermitted) {
      launchCamera(options, response => {
        console.log('Response = ', response.assets.fileName);

        if (response.didCancel) {
          alert('User cancelled camera picker');
          return;
        } else if (response.errorCode == 'camera_unavailable') {
          alert('Camera not available on device');
          return;
        } else if (response.errorCode == 'permission') {
          alert('Permission not satisfied');
          return;
        } else if (response.errorCode == 'others') {
          alert(response.errorMessage);
          return;
        }
        console.log('base64 -> ', response.base64);
        console.log('uri -> ', response.uri);
        console.log('width -> ', response.width);
        console.log('height -> ', response.height);
        console.log('fileSize -> ', response.fileSize);
        console.log('type -> ', response.type);
        console.log('fileName -> ', response.fileName);
        setFilePath(response);
      });
    }
  };

  const chooseFile = type => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
    };
    launchImageLibrary(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        alert('User cancelled camera picker');
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        alert('Camera not available on device');
        return;
      } else if (response.errorCode == 'permission') {
        alert('Permission not satisfied');
        return;
      } else if (response.errorCode == 'others') {
        alert(response.errorMessage);
        return;
      }
      console.log('base64 -> ', response.base64);
      console.log('uri -> ', response.uri);
      console.log('width -> ', response.width);
      console.log('height -> ', response.height);
      console.log('fileSize -> ', response.fileSize);
      console.log('type -> ', response.type);
      console.log('fileName -> ', response.fileName);
      setFilePath(response);
    });
  };

  const [coordinate, setCoordinate] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 12.0922,
    longitudeDelta: 12.0421,
  });

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@userdata');
      if (value !== null) {
        value = JSON.parse(value);
        console.log(value);
      }
    } catch (e) {
      // error reading value
    }
  };
  return (
    <ScrollView style={styles.container}>
      <Headerx
        navigation={props.navigation}
        headerName={'Parking Registration'}
      />

      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Text
          style={{
            paddingHorizontal: 10,
            color: '#613EEA',
            fontWeight: 'bold',
            fontSize: 25,
            backgroundColor: 'white',
            marginTop: 30,
            marginBottom: 10,
            marginLeft: 30,
          }}>
          Register a new Parking
        </Text>

        <Text> </Text>

        {/* <QRCode
        value={'12312983'}
        size={250}
        color="black"
        backgroundColor="white"
        getRef={getRef}
        /> */}

        {/* <QRCode
        value={"1231231123"}
        size={250}
        color="black"
        backgroundColor="white"
       
        /> */}

        <TouchableOpacity style={styles.loginBtn} onPress={chooseFile}>
          <Text style={styles.loginText}>Attach Image</Text>
        </TouchableOpacity>

        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Enter parking Charges (per hr.)"
            placeholderTextColor={'#505050'}
            onChangeText={charges => setCharges(charges)}></TextInput>
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Add Check-in Code"
            placeholderTextColor={'#613EEA'}
            onChange={checkin => setCheckin(checkin)}></TextInput>
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Add Check-out Code"
            placeholderTextColor={'#613EEA'}
            onChange={checkout => setCheckout(checkout)}></TextInput>
        </View>

        <View style={styles.descriptionView}>
          <TextInput
            style={styles.descriptionInput}
            numberOfLines={5}
            multiline={true}
            placeholder="Description"
            placeholderTextColor={'#613EEA'}
            onChangeText={description =>
              setDescription(description)
            }></TextInput>
        </View>

        <GooglePlacesAutocomplete
          placeholder="Select Location"
          minLength={2}
          autoFocus={false}
          returnKeyType={'default'}
          fetchDetails={true}
          ref={placesRef}
          textInputProps={{
            onChangeText: text => {
              setLocaiton(text);
            },
            autoFocus: true,
            placeholderTextColor: '#613EEA',
            blurOnSubmit: false,

            height: 50,

            color: '#613EEA',

            padding: 10,
            marginLeft: 20,
            backgroundColor: '#f2f3f4',
          }}
          onPress={(data, details = null) => {
            console.log(details.geometry.location.lat);
            console.log(details.geometry.location.lng);

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
              borderRadius: 5,

              width: '70%',
              height: 50,

              marginBottom: 30,
              color: '#613EEA',

              alignItems: 'flex-start',
            },
            description: {
              color: '#613EEA',
              fontSize: 15,

              width: '70%',
              alignItems: 'flex-start',
              marginLeft: 20,
              padding: 5,
              flex: 1,
            },

            textInput: {color: '#613EEA'},
            predefinedPlacesDescription: {
              color: '#1faadb',
            },
          }}
        />

        <TouchableOpacity
          style={styles.submit}
          onPress={() => handleClick(this)}>
          <Text style={styles.loginText}>Submit Details</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ParkingRegistration;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    color:'#505050',

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
    marginTop: 30,
    marginBottom: 30,
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
