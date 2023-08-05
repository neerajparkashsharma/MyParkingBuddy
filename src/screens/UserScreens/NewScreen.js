import React, {useCallback, useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  PermissionsAndroid,
  TextInput,
  Fragment,
  Dimensions,
  TouchableOpacity,
  FlatList,
  ActivityIndicator
} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import useFocusEffect from '@react-navigation/native';
import Geolocation from '@react-native-community/geolocation';
import MapViewDirections from 'react-native-maps-directions';
import mapStyle from '../../styles/Mapstyle';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import Geocoder from 'react-native-geocoding';
import {white} from 'react-native-paper/lib/typescript/styles/colors.js';
import {Button} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import url from '../../commons/axiosUrl.js';
import {useNavigation} from '@react-navigation/native';
import {colors} from '../../commons/Colors.js';
import Headerx from '../../components/header.js';
import {color} from 'react-native-reanimated';
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

const NewScreen = (props) => {
  const [selectedMarker, setSelectedMarker] = useState(null);
const [modalVisible, setModalVisible] = useState(false);
const [mapInitialized, setMapInitialized] = useState(false);
const navigation = useNavigation();
const [location, setLocation] = useState('');
const [markers, setMarkers] = useState([]);
const [currentUser, setCurrentUser] = useState();
const [idd, setId] = useState();
const [uid, setUid] = useState();
const [charges, setCharges] = useState();
const [show, setShow] = useState(false);
const [latLong, setLatLong] = useState({
  latitude: 24.8607333,
  longitude: 67.001135,
});

const [Loading, setLoading] = useState(false);

const [locationRadius, setLocationRadius] = useState();

useEffect(() => {

  AsyncStorage.getItem('location').then((value) => {
    setLocationRadius(value);
  } 
  );

}, []);
  

const fetchLocation = useCallback(async () => {
  try {
    const chckLocationPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    if (chckLocationPermission === PermissionsAndroid.RESULTS.GRANTED) {
      alert("You've access for the location");
    } else {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(position => {
          const {latitude, longitude} = position.coords;
          console.log('latitude', latitude);
          console.log('longitude', longitude);

          setLatLong({
            latitude,
            longitude,
          });
        });
      } else if (granted === PermissionsAndroid.RESULTS.DENIED) {
        fetchLocation();
        console.log('ACCESS_FINE_LOCATION permission denied');
      } else if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
        console.log('ACCESS_FINE_LOCATION permission revoked by user');
      }
    }
  } catch (err) {
    alert(err);
  }
}, []);

useEffect(() => {
  Geolocation.getCurrentPosition(
    position => {
      console.log('object', position);
      setLatLong({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    },
    error => {
      if (error.code === 1) {
        console.log('error', error);
        // show a prompt to the user to grant the location permission
      } else if (error.code === 2) {
        console.log('error', error);
        // show a prompt to the user to turn on the location services
      } else if (error.code === 3) {
        console.log('error', error);
        // increase the maximum age value for the location provider
      } else {
        // handle the error gracefully
      }
    },
    {maximumAge: 10000},
  );

  fetchLocation();
}, []);

useEffect(() => {
    setLoading(true);
  const getData = async () => {
    try {

      const value = await AsyncStorage.getItem('userdata');
      if (value !== null) {
        console.log(value);
        console.log('id' + value);
        setCurrentUser(value);
        axios.get(`${url}parking/${latLong?.latitude}/${latLong?.longitude}?userId=${value}`)
          .then(res => {
            console.log('res', res.data);
            setMarkers(res.data);
            setLoading(false);
          })
       
          .catch(err => {
            console.log(err);
            setLoading(false);
          });
      } else {
        console.log('no user data');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const intervalId = setInterval(() => {
    // setLoading(true);
    getData();
    
  }, 5000); // Execute the code every 5 seconds

  return () => clearInterval(intervalId); // Clear the interval on component unmount

}, []); 





  return (
<>
  <Headerx headerName="Find Parking Places" navigation={navigation} />
  <View style={{ marginTop: 20 }} />

  <MapView
    customMapStyle={mapStyle}
    mapType="standard"
    showsUserLocation={true}
    showsMyLocationButton={true}
    initialRegion={{
      latitude: latLong.latitude,
      longitude: latLong.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }}

    style={{
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT,
      flex: 1,
    }}
  >
    {markers.map((val, i) => {
     
      return (
        <Marker
          coordinate={{
            latitude:  parseFloat(val?.latitude),
            longitude: parseFloat(val?.longitude),
          }}
          title={`Parking ${val.id}`}
          description={val.description}
          key={i}
          onPress={() => {
            setId(val?.id);
            setCharges(val.parkingCharges);
          }}
        >
          <Icon
            name="car-brake-parking"
            size={40}
            color={colors.themeColor}
            onPress={() => {
              setId(val.id);
              setCharges(val.parkingCharges);
            }}
          />
        </Marker>
      );
    })}
  </MapView>

  <View>
    <Text
      style={[
        EWalletStyles.popularTitlesTitle,
        {
          color: colors.themeColor,
          left: SCREEN_WIDTH / 10,
          marginTop: 20,
          marginBottom: 10,
          fontWeight: 'bold',
          fontSize: 20,
        },
      ]}
    >
      PARKING PLACES FOR YOU
    </Text>
  </View>

 {Loading ? (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
      }}
    >
      <ActivityIndicator size="large" color={colors.themeColor} />
    </View>
  ) : (


  <FlatList
    style={{ flex: 0.8 }}
    data={markers}
    renderItem={({ item }) => (

     <>
     
      <TouchableOpacity style={EWalletStyles.popularCardWrapper}>
        <View>
          <View style={EWalletStyles.popularTopWrapper}>
            <Text style={EWalletStyles.popularTopText}>
                
              {item.parkingLocation?.substring(0, 70)}...
            </Text>
          </View>

          <View style={EWalletStyles.popularTitlesWrapper}>
            <Text style={EWalletStyles.popularTitlesTitle}>
              PKR {item.parkingCharges}
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: colors.white,
                width: 120,
                position: 'absolute',
                height: 30,
                marginTop: SCREEN_HEIGHT / 300,
                borderRadius: 15,
                borderColor: 'black',
                left: SCREEN_WIDTH / 2.5,
              }}
              onPress={() => {
                console.log('parking id', item?.id);
                props.navigation.navigate('BookParking', { id:  item?.id })
              }}
              
              >
              <Text
                style={{
                  textAlign: 'center',
                  top: 5,
                  fontSize: 12,
                  fontWeight: 'bold',
                  color: colors.themeColor,
                }}>
                BOOK NOW
              </Text>
            </TouchableOpacity>

            <Text style={EWalletStyles.popularTitlesWeight}></Text>
          </View>
        </View>
      </TouchableOpacity>
      </>
    )}
    keyExtractor={(item) => item.id.toString()}
  />
  )}

</>
  );
};

export default NewScreen;
const EWalletStyles = StyleSheet.create({
  popularTitle: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 16,
  },
  popularCardWrapper: {
    backgroundColor: colors.themeColor,
    borderRadius: 5,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    height: SCREEN_HEIGHT / 5,
    paddingTop: 20,
    paddingLeft: 20,
    width: SCREEN_WIDTH / 1.2,
    marginTop: 10,
    flexDirection: 'row',
    overflow: 'hidden',
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    alignSelf: 'center',
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  popularTopWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  popularTopText: {
    fontWeight: '700',
    fontSize: SCREEN_WIDTH / 38,
    color: colors.white,
  },
  popularTitlesWrapper: {
    marginTop: 20,
  },
  popularTitlesTitle: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 30,
    fontWeight: '700',
    color: colors.white,
  },
  popularTitlesWeight: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 12,
    color: colors.textLight,
    marginTop: 5,
  },
  popularCardBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginLeft: -20,
  },
  addPizzaButton: {
    backgroundColor: colors.themeColor,
    paddingHorizontal: 40,
    paddingVertical: 20,
    borderTopRightRadius: 25,
    borderBottomLeftRadius: 25,
  },
  ratingWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
  },
  rating: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 12,
    color: colors.textDark,
    marginLeft: 5,
  },
  popularCardRight: {
    marginLeft: 40,
  },
  popularCardImage: {
    width: 210,
    height: 125,
    resizeMode: 'contain',
  },
});



