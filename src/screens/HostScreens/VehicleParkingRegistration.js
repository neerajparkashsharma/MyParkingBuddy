import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';

import React, { useState, useEffect, useRef } from 'react';
import { colors } from '../../commons/Colors';
import { View, Text, StyleSheet, TextInput, Dimensions } from 'react-native';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../components/units';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import KeyboardAvoidingView from 'react-native/Libraries/Components/Keyboard/KeyboardAvoidingView';
import Headerx from '../../components/header';
import axios from 'axios';
import url from '../../commons/axiosUrl'; 
import AsyncStorage from '@react-native-async-storage/async-storage';

const VehicleParkingRegistration = props => {
  const buttonTextStyle = {
    color: colors.themeColor,
  };

  const [parkingCharges, setParkingCharges] = useState('');
  const [checkInCode, setCheckInCode] = useState('');
  const [checkOutCode, setCheckOutCode] = useState('');
  const [cameraIpAddress, setCameraIpAddress] = useState('');

  const [showButton, setShowButton] = useState(false);
  const mapViewRef = useRef(null);
  const [region, setRegion] = useState(null);
  const [address, setAddress] = useState(null);
  const handleMarkerDragEnd = coordinate => {
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coordinate.latitude},${coordinate.longitude}&key=AIzaSyB5Ej1XMdsa5Vf1wVOl02VUpUZFnEJZAzs`,
    )
      .then(response => response.json())
      .then(data => {
        const address = data.results[0].formatted_address;
        setAddress(address);
        setRegion({
          ...region,
          latitude: coordinate.latitude,
          longitude: coordinate.longitude,
        });
      })
      .catch(error => console.error(error));
  };
  const handleSetLocation = () => {
    // Do something when the button is clicked, e.g. save the location
    // ...
    setShowButton(false);
  };

  const handleSubmit = async () => {


    if (
      parkingCharges === null ||
      checkInCode === null ||
      checkOutCode === null ||

      address === null ||
      region.latitude === null ||
      region.longitude === null ||
      hostId === null
    ) {
      console.log('One or more fields are null');
      return;
    }

    const hostId = await AsyncStorage.getItem('userdata');
    console.log('Submitting form...');
    console.log('Parking Charges:', parkingCharges);
    console.log('Check-In Code:', checkInCode);
    console.log('Check-Out Code:', checkOutCode);
    console.log('Address:', address);
    console.log('Latitude:', region.latitude);
    console.log('Longitude:', region.longitude);

    const payload = {
      parkingCharges: parkingCharges,
      checkInCode: checkInCode,
      checkOutCode: checkOutCode,
      parkingLocation: address,
      latitude: region.latitude,
      longitude: region.longitude,
      hostId: hostId,
      createdBy: hostId,
    };

    axios
      .post(`${url}parking`, payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(res => {
        console.log('res  -- ', res);
        alert('Parking Registered Successfully');
      })
      .catch(err => {
        console.log('err  -- ', err);
      });
  };

  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setRegion({
          latitude: latitude ? latitude : 0,
          longitude: longitude ? longitude : 0,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
        getAddress(latitude, longitude);
        console.log(position);
      },
      error => console.log(error),
    );
  }, []);

  const getAddress = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyB5Ej1XMdsa5Vf1wVOl02VUpUZFnEJZAzs`,
      );
      const data = await response.json();
      setAddress(data.results[0].formatted_address);
    } catch (error) {
      console.log(error);
    }
  };

  const [nextButtonDisabled, setNextButtonDisabled] = useState(true);

  useEffect(() => {
    if (parkingCharges && checkInCode && checkOutCode) {
      setNextButtonDisabled(false);
    } else {
      setNextButtonDisabled(true);
    }
  }, [parkingCharges, checkInCode, checkOutCode]);



  return (
    <>
      <Headerx
        headerName={'Parking Registration'}
        navigation={props?.navigation}
      />
      <View style={{ flex: 1 }}>
        <ProgressSteps
          activeStepIconBorderColor={colors.themeColor}
          progressBarColor={colors.gray}
          completedProgressBarColor={colors.themeColor}
          completedStepIconColor={colors.themeColor}
          activeLabelColor={colors.themeColor}
          completedLabelColor={colors.themeColor}
          disabledStepNumColor={colors.themeColor}
          activeStepNumColor={colors.white}
          completedStepNumColor={colors.themeColor}
          labelColor={colors.themeColor}
          activeStepIconColor={colors.themeColor}
          disabledStepIconBorderColor={colors.themeColor}>
          <ProgressStep
            label="Charges & Codes"
            nextBtnTextStyle={buttonTextStyle}
            previousBtnTextStyle={buttonTextStyle}
            nextBtnDisabled={nextButtonDisabled}

          >


            <KeyboardAvoidingView>
              <View style={styles.bodyContainer}>
                <View>
                  <Text style={styles.fieldTitle}>Parking Charges</Text>
                  <TextInput
                    style={styles.fieldContainer}
                    keyboardType="numeric"

                    placeholder={'Enter the Parking Charges'}
                    onChangeText={text =>
                      setParkingCharges(text)}
                    value={parkingCharges}
                  />
                </View>

                <View>
                  <Text style={styles.fieldTitle}>Check-In Code</Text>
                  <TextInput
                    style={styles.fieldContainer}
                    onChangeText={text => setCheckInCode(text)}
                    placeholder={'Enter the Check-In Code'}
                    value={checkInCode}
                  />
                </View>

                <View>
                  <Text style={styles.fieldTitle}>Check-In Code</Text>
                  <TextInput
                    style={styles.fieldContainer}
                    onChangeText={text => setCheckOutCode(text)}
                    placeholder={'Enter the Check-Out Code'}
                    value={checkOutCode}
                  />
                </View>

              </View>
            </KeyboardAvoidingView>
          </ProgressStep>
          <ProgressStep
            label="Location"
            nextBtnTextStyle={buttonTextStyle}
            previousBtnTextStyle={buttonTextStyle}>
            <View style={mapStyles.container}>
              {console.log(address)}
              {showButton && (
                <Button title="Set Location" onPress={handleSetLocation} />
              )}
              {region && (
                <MapView
                  style={mapStyles.map}
                  region={region}
                  showsUserLocation={true}
                  showsMyLocationButton={true}
                  showsCompass={true}
                  zoomEnabled={true}
                  zoomControlEnabled={true}
                  rotateEnabled={true}
                  scrollEnabled={true}
                  pitchEnabled={true}
                  initialRegion={region}
                  ref={mapViewRef}
                  onPress={e => {
                    handleMarkerDragEnd(e.nativeEvent.coordinate);
                  }}
                  onDoublePress={e => {
                    // mapViewRef.current.animateMarkerToCoordinate(region, 1000);
                    handleMarkerDragEnd(e.nativeEvent.coordinate);
                  }}>
                  {/* <Marker coordinate={region} draggable/> */}
                  <Marker
                    coordinate={region}
                    draggable
                    onDragEnd={e =>
                      handleMarkerDragEnd(e.nativeEvent.coordinate)
                    }
                  />
                </MapView>
              )}
              {address && <Text style={styles.address}>{address}</Text>}
            </View>
          </ProgressStep>
          <ProgressStep
            label="Confirm"
            nextBtnTextStyle={buttonTextStyle}
            previousBtnTextStyle={buttonTextStyle}
            onSubmit={handleSubmit}
          >
            <View style={{ alignItems: 'flex-start', paddingHorizontal: 30 }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>
                Confirm the following details:
              </Text>
              <Text style={styles.detailText}>
                Parking Charges:{' '}
                <Text style={styles.detailValueText}>
                  {parkingCharges == '' ? 'N/A' : parkingCharges}
                </Text>
              </Text>
              <Text style={styles.detailText}>
                Check-In Code:{' '}
                <Text style={styles.detailValueText}>
                  {checkInCode == '' ? 'N/A' : checkInCode}
                </Text>
              </Text>
              <Text style={styles.detailText}>
                Check-Out Code:{' '}
                <Text style={styles.detailValueText}>
                  {checkOutCode == '' ? 'N/A' : checkOutCode}
                </Text>
              </Text>
              <Text style={styles.detailText}>
                Camera IP Address:{' '}
                <Text style={styles.detailValueText}>
                  {cameraIpAddress == '' ? 'N/A' : cameraIpAddress}
                </Text>
              </Text>
              <Text style={styles.detailText}>
                Address:{' '}
                <Text style={styles.detailValueText}>{address}</Text>
              </Text>
              <Text style={styles.detailText}>
                Latitude:{' '}
                <Text style={styles.detailValueText}>{region?.latitude}</Text>
              </Text>
              <Text style={styles.detailText}>
                Longitude:{' '}
                <Text style={styles.detailValueText}>{region?.longitude}</Text>
              </Text>
            </View>
          </ProgressStep>

        </ProgressSteps>
      </View>
    </>
  );
};

export default VehicleParkingRegistration;
const styles = StyleSheet.create({
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
    color: colors.themeColor,
    marginTop: SCREEN_HEIGHT / 81,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  buttonContainer: {
    marginHorizontal: SCREEN_WIDTH / 12,
    marginTop: SCREEN_HEIGHT / 38,
  },
  detailText: {
    marginBottom: 5,
    color: colors.black,
    fontWeight: 'bold',
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
  },
  detailValueText: {
    fontWeight: '400',
    fontSize: 15,
  },
});

const mapStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  address: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
