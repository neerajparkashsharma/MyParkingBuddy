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
  TouchableHighlight,
  ScrollView,
} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import useFocusEffect from '@react-navigation/native';
import Geolocation from '@react-native-community/geolocation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import {colors} from '../../commons/Colors';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {mapStyle} from '../../styles/Mapstyle';
import {FlatList} from 'react-native-gesture-handler';  


import {useNavigation} from '@react-navigation/native';
import Headerx from '../../components/header';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;


const FindParking = () => {
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const navigation = useNavigation();
  const [location, setLocaiton] = useState('');
  const [markers, setMarkers] = useState([]);
  const [currentUser, setCurrentUser] = useState();
  const [idd, setId] = useState();
  // const {id} = route.params;
  const [uid, setUid] = useState();
  const [charges, setCharges] = useState();

  const [show, setShow] = useState(false);
  //const iddd = parseFloat(JSON.stringify(id));

  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        setLatLong({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      error => {
        console.log(error);
      },
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );

    fetchLocation();
  }, []);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('userdata');
      if (value !== null) {
        console.log(value);

        console.log('id' + value);

        setCurrentUser(value);
      }
    } catch (e) {
      alert(e);
      // error reading value
    }
  };

  useEffect(() => {
    // setUid(iddd);

    axios
      .get(url + 'parking')
      .then(function (response) {
   
        setMarkers(response.data);

        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const placesRef = useRef();

  const Booking = id => {
    axios
      .post(url + 'parkingBookingRecords', {
        parking: {
          id: id,
        },
        customer: {
          id: 45,
        },
      })

      .then(function (response) {
        console.log(response.data);
        alert('Booking Successfull');
        navigation.navigate('AllBookings');
      })
      .catch(function (error) {
        console.log('error' + error);
      });
  };

  const getAddress = () => {
    console.log(placesRef.current?.getAddressText());
  };

  const [latLong, setLatLong] = useState({
    latitude: 24.8607333,
    longitude: 67.001135,
  });

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
            console.log('latitude', latitude);
            console.log('longitude', longitude);

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
    <>

    <Headerx headerName={"Find Parking Places"} navigation={navigation}></Headerx>
    <View style={{marginTop:20}}>

    </View>

    {/* <View style={{backgroundColor:'white'}}>
        <Text>Back</Text>
    </View> */}
    {/* <Headerx headerName={"Find Parking Places"} navigation={navigation}></Headerx>  */}
      <MapView
        customMapStyle={mapStyle}
        mapType="standard"
        showsUserLocation={true}
        showsMyLocationButton={true}
        style={{
          flex: 1.5,
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height,
        }}
        initialRegion={{
          latitude: latLong?.latitude,
          longitude: latLong?.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        {markers.map((val, i) => {
          
          return (
            <Marker
              coordinate={{
                latitude: parseFloat(val.latitude),
                longitude: parseFloat(val.longitude),
                latitudeDelta: 0.903,
                longitudeDelta: 0.903,
              }}
              // title={'Parking' + val.id}
              description={val.description}
              key={i}
              onPress={() => {
                setId(val.id);
                setCharges(val.parkingCharges);
              
              }}>
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
          ]}>
          PARKING PLACES FOR YOU
        </Text>
      </View>
      <FlatList
        style={{flex: 0.2}}
        data={markers}
        renderItem={({item}) => (
          <TouchableOpacity style={EWalletStyles.popularCardWrapper}
         
          >
            <View>
              <View style={EWalletStyles.popularTopWrapper}>
                <Text style={EWalletStyles.popularTopText}>
                  {item.parkingLocation.substring(0, 70)}...
                   
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
                    left:
                      SCREEN_WIDTH / 2.5,
                
                  }}>
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
        )}
        keyExtractor={item => item.id}
      />
    </>
  );
};

export default FindParking;
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
