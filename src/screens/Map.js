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
} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import useFocusEffect from '@react-navigation/native';
import Geolocation from '@react-native-community/geolocation';
import MapViewDirections from 'react-native-maps-directions';
import mapStyle from '../styles/Mapstyle.js';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import Geocoder from 'react-native-geocoding';  
import {white} from 'react-native-paper/lib/typescript/styles/colors.js';
import {Button} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import url from '../commons/axiosUrl.js';
import {useNavigation} from '@react-navigation/native';
import { colors } from '../commons/Colors.js';
import Headerx from '../components/header.js';
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

const MyMap = props => {

  const navigation = useNavigation();
  const [markers, setMarkers] = useState([]);
  const [currentUser, setCurrentUser] = useState();
  const [idd, setId] = useState();
  // const {id} = route.params;
const[uid,setUid]=useState();
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
       
        console.log("id"+value);

        setCurrentUser(value);

      }
    } catch (e) {
      alert(e);
      // error reading value
    }
  };

  useEffect(() =>{
   // setUid(iddd);
    
    axios
      .get(url + 'parking')
      .then(function (response) {
        // console.log(response.data);
        setMarkers(response.data);
       
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const placesRef = useRef();


  const Booking = (id) => {
   
    axios.post(url + 'parkingBookingRecords', {
      parking:{
        id:id
      },
      customer:{
        id:45
      }
    })

    .then(function (response) {
      console.log(response.data);
      alert("Booking Successfull");
      navigation.navigate('AllBookings')
    })
    .catch(function (error) {
      console.log("error"+error);
    });
  };
   

  
 

  const getAddress = () => {
    console.log(placesRef.current?.getAddressText());
  };

  const [latLong, setLatLong] = useState({
    latitude: 0,
    longitude: 0,
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
    
    
    <View style={{flex: 1,backgroundColor:colors.white}}>
        <Headerx navigation={props.navigation} headerName={"Find Parkings"}/>
   
      <MapView
        customMapStyle={mapStyle}
        mapType="standard"
        showMyLocationButton={true}
        showsUserLocation={true}
        provider={PROVIDER_GOOGLE}
        trackViewChanges={false}
        style={{flex: 1}}
        region={{
          latitude: latLong.latitude,
          longitude: latLong.longitude,
          latitudeDelta: 0.003,
          longitudeDelta: 0.003,
        }}>
        {markers.map((val, i) => {
          return (
            <Marker
              coordinate={{
                latitude: parseFloat(val.latitude),
                longitude: parseFloat(val.longitude),
                latitudeDelta: 0.003,
                longitudeDelta: 0.003,
              }}
              title={'Parking' + val.id}
              description={val.description}
              key={i}
              onPress={() => {
                setId(val.id);
                setCharges(val.parkingCharges);
                setShow(true);
              }}>
              <Icon
                name="car"
                size={30}
                color={'black'}
                onPress={() => {
                  setId(val.id);
                  setCharges(val.parkingCharges);
                }}
              />
            </Marker>
          );
        })}

        <Marker
          draggable
          coordinate={{
            latitude: latLong.latitude,
            longitude: latLong.longitude,
          }}
          title="My Location"
          description={
            latLong.latitude.toString() + ',' + latLong.longitude.toString()
          }
        />
      </MapView>
      

{show ? (
    
  //   <View
  //   style={{
  //     alignSelf: 'center',
  //     alignContent: 'center',
  //     backgroundColor: '#202B35',
  //     padding: 50,
  //     paddingHorizontal: 95,
  //     marginTop: 700,

  //     borderRadius: 5,
  //     alignItems: 'center',
  //     position: 'absolute',
  //   }}>
  //   <View style={{alignItems: 'center'}}>
  //     <Text
  //       style={{
  //         color: '#fff',
  //         fontSize: 30,
  //         marginBottom: 5,
  //       }}>
  //       Parking Available
  //     </Text>

  //     <Text>Charges: {charges} </Text>
  //     <View style={{flexDirection:'row'}}>
     
  //     </View>

      
  //     <Button style={{padding: 30}} onPress={()=>{Booking(idd)}}>
  //       <Text style={{fontSize: 30}}>Book Now</Text>
        
  //     </Button>
  //   </View>
  // </View>


  <View style={styles.bodyContainer}>
  <View style={styles.deliveryContainer}>
    <Text style={styles.deliverytext}>10 minutes left</Text>
    <Text style={styles.toText}>Delivery to Ibrahim Asgari</Text>
  </View>
  <View style={styles.lineContainer}>
    <View style={styles.progressLine} />
    <View style={styles.progressLine} />
    <View style={styles.progressLine} />
    <View
      style={[styles.progressLine, {backgroundColor: colors.gray}]}
    />
  </View>
  <View style={styles.detailContainer}>
    <View style={styles.motorContaniner}>
      {/* <Image
        source={require('../../assets/images/motor.png')}
        style={{tintColor: colors.ORANGE}}
      />
    </View> */}
    <View style={styles.detailTextContainer}>
      <Text style={styles.detailTitle}>Delivered your order</Text>
      <Text style={styles.detailSubTitle}>
        We deliver your goods to you in the shortes possible time.
      </Text>
    </View>
  </View>
  <View style={styles.bottomContainer}>
    <View style={styles.driverContainer}>
      {/* <Image
        source={require('../../assets/images/driverDefault.png')}
      /> */}
      <View style={{marginStart: SCREEN_WIDTH / 31}}>
        <Text style={styles.driverText}>Johan Hawn</Text>
        <Text style={styles.driverStatus}>Personal Courier</Text>
      </View>
    </View>
    <TouchableOpacity
      style={styles.phoneContainer}
   >
      <Icon name="phone-in-talk" size={25} color={colors.white} />
    </TouchableOpacity>
  </View>
</View>
</View>
  )
  :
  <View></View>
  
  }  
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
    backgroundColor: 'white',
    borderRadius: 5,
    width: '90%',
    height: 185,
    left: 30,
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderRadius: 15,

    position: 'absolute',
    top: 70,
  },

  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
    color: 'black',
    placeholderTextColor: 'black',
  },

  bodyContainer: {
    borderTopStartRadius: 24,
    borderTopEndRadius: 24,
    paddingHorizontal: SCREEN_WIDTH / 13,
    flex: 1,
    marginTop: SCREEN_HEIGHT / -81,
    backgroundColor: colors.white,
  },
  detailContainer: {
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 14,
    flexDirection: 'row',
    paddingVertical: SCREEN_HEIGHT / 58,
    paddingHorizontal: SCREEN_WIDTH / 23,
    marginTop: SCREEN_HEIGHT / 55,
  },
  motorContaniner: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 12,
    paddingHorizontal: SCREEN_WIDTH / 25,
    paddingVertical: SCREEN_HEIGHT / 54,
  },
  detailTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.black,
  },
  detailSubTitle: {
    fontSize: 12,
    color: colors.black,
    marginTop: SCREEN_HEIGHT / 102,
  },
  detailTextContainer: {
    flex: 1,
    marginStart: SCREEN_WIDTH / 31,
  },
  driverContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  driverText: {
    fontWeight: '600',
    color: colors.black,
  },
  driverStatus: {
    color: colors.gray,
    fontSize: 12,
    marginTop: SCREEN_HEIGHT / 101,
  },
  bottomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SCREEN_HEIGHT / 41,
    justifyContent: 'space-between',
  },
  phoneContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.themeColor,
    borderRadius: 14,
    paddingHorizontal: SCREEN_WIDTH / 31,
    paddingVertical: SCREEN_HEIGHT / 67,
    backgroundColor: colors.ORANGE,
  },
  markerContainer: {
    backgroundColor: colors.white,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SCREEN_WIDTH / 47,
    paddingVertical: SCREEN_HEIGHT / 101,
  },
  topBar: {
    position: 'absolute',
    left: SCREEN_WIDTH / 28,
    alignItems: 'center',
    marginTop: SCREEN_HEIGHT / 81,
  },

});

export default MyMap;
