import React, {useCallback, useEffect, useRef, useState} from 'react';
import url from '../commons/axiosUrl.js';
import axios from 'axios';
import {
  View,
  Text,
  Linking,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
  Button,
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
// import {Camera, useCameraDevices} from 'react-native-vision-camera';
import {RNHoleView} from 'react-native-hole-view';

import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/Ionicons';
import Headerx from '../components/header.js';
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
console.disableYellowBox = true;
const VisionCamera = ({route, navigation}) => {
  const {bookingId} = route.params;

  const camera = useRef(null);
  const [Isactive, setIsActive] = useState(false);

  const [loading, setLoading] = useState(true);

  const onSuccess = e => {
    console.log(e.data);
    //console.log(Ischeckout);
   
      axios
        .post(url + 'bookingVehicles', {
          parkingBookingRecords: {id: JSON.stringify(bookingId)},

          checkIn: Date.now(),
          checkInInput: e.data,
        })

        .then(function (response) {
          alert('WAITING FOR VECHICLE TO BE PARKED');
        })
        .catch(function (error) {
          console.log('error' + error);
        });
    
   
    Alert.alert(e.data);
  };
  const makeSlideOutTranslation = (translationType, fromValue) => {
    return {
      from: {
        [translationType]: SCREEN_WIDTH * -0.18,
      },
      to: {
        [translationType]: fromValue,
      },
    };
  };
  const startScan = () => {
    console.log('first');
    setIsActive(!Isactive);
  };
  return (
    <View style={styles.container}>
    <Headerx navigation={navigation} headerName={'Scan QR-Mark Check'} />

    <QRCodeScanner
      showMarker
      reactivateTimeout={4}
      onRead={onSuccess}
      reactivate={Isactive}
      cameraStyle={{ height: SCREEN_HEIGHT }}
      customMarker={
        <View style={styles.scannerContainer}>
          <View style={styles.scannerHeader}>
            <Text style={styles.scannerHeaderText}>QR CODE FSCANNER</Text>
          </View>
          <View style={styles.scannerBody}>
            <View style={styles.leftAndRightOverlay} />
            <View style={styles.qrCodeContainer}>
              <Icon
                name="ios-scan-sharp"
                size={SCREEN_WIDTH * 0.6}
                color="white"
              />
              <Animatable.View
                style={styles.scanBar}
                direction="alternate-reverse"
                iterationCount="infinite"
                duration={1700}
                easing="linear"
                animation={makeSlideOutTranslation(
                  'translateY',
                  SCREEN_WIDTH * -0.5,
                )}
              />
            </View>
            <View style={styles.leftAndRightOverlay} />
          </View>
          <View style={styles.scannerFooter} />
        </View>
      }
    />
  </View>
  );
};

const overlayColor = 'rgba(0,0,0,0.5)'; // this gives us a black color with a 50% transparency
const rectDimensions = SCREEN_WIDTH * 0.65; // this is equivalent to 255 from a 393 device width
const rectBorderWidth = SCREEN_WIDTH * 0.005; // this is equivalent to 2 from a 393 device width
const rectBorderColor = 'purple';
const scanBarWidth = SCREEN_WIDTH * 0.46; // this is equivalent to 180 from a 393 device width
const scanBarHeight = SCREEN_WIDTH * 0.0025; //this is equivalent to 1 from a 393 device width
const scanBarColor = '#22FF00';
const iconScanColor = 'red';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scannerContainer: {
    flex: 1,
  },
  scannerHeader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  scannerHeaderText: {
    fontSize: 30,
    color: 'white',
  },
  scannerBody: {
    flex: 5,
    flexDirection: 'row',
  },
  qrCodeContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scanBar: {
    width: SCREEN_WIDTH * 0.6,
    height: 2,
    backgroundColor: 'white',
  },
  leftAndRightOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  scannerFooter: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
});


export default VisionCamera;
