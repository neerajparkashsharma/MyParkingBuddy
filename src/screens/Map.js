import React, {useCallback, useState, useEffect,useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  PermissionsAndroid,
  TextInput,
} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import useFocusEffect from '@react-navigation/native';
import Geolocation from '@react-native-community/geolocation';
import MapViewDirections from 'react-native-maps-directions';
import mapStyle from '../styles/Mapstyle.js';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import Geocoder from 'react-native-geocoding';

const MyMap = () => {


  const placesRef = useRef();


  const getAddress = () => {
    console.log(placesRef.current?.getAddressText());
  };



  const [latLong, setLatLong] = useState({
    latitude: 0,
    longitude: 0,
  });
  useEffect(() => {
    fetchLocation();
  }, []);

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
  return (

    <View style={{flex:1}}>
    <MapView
      customMapStyle={mapStyle}
      mapType="standard"
      showMyLocationButton={true}
      showsUserLocation={true}
      provider={PROVIDER_GOOGLE}
      trackViewChanges={false}
      style={{flex: 1}}

      // initialRegion={{
      //   latitude: 37.78825,
      //   longitude: -122.4324,
      //   latitudeDelta: 0.0922,
      //   longitudeDelta: 0.0421,

      // }
      // }

      region={{
        latitude: latLong.latitude,
        longitude: latLong.longitude,
        latitudeDelta: 0.003,
        longitudeDelta: 0.003,
      }}>
      <Marker
     draggable
    
        coordinate={{latitude: latLong.latitude, longitude: latLong.longitude}}
        title="My Location"
        description={
          latLong.latitude.toString() + ',' + latLong.longitude.toString()
        }
      />
    </MapView>

     {/* <TextInput style={styles.TextInput} placeholder="Enter Location"  />
      </View> */}

<GooglePlacesAutocomplete


  placeholder='Enter Location'
  minLength={2}
  autoFocus={false}
  
  returnKeyType={'default'}
  fetchDetails={true}
  ref={placesRef}
  textInputProps={{
    autoFocus: true,
    blurOnSubmit: false,
  }}
  
  onPress={(data, details = null) => {
  

    console.log(data);
    console.log(details);


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
      backgroundColor: 'grey',
    },
    textInput: {
      height: 38,
      color: '#5d5d5d',
      fontSize: 16,
    },
    predefinedPlacesDescription: {
      color: '#1faadb',
    },
  }}
/>
</View>

  );
};

const styles = StyleSheet.create({
  container: {
    // ...StyleSheet.absoluteFillObject,
    flex: 1, //the container will fill the whole screen.
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  inputView: {
    backgroundColor: "white",
    borderRadius: 5,
    width: "90%",
    height: 185,
 left: 30,
 borderLeftWidth: 4,
  borderRightWidth: 4,
  borderRadius: 15,
 
   
    position:'absolute',top:70
  },
 
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
    color:'black',
    placeholderTextColor:'black'
  },


});

export default MyMap;

