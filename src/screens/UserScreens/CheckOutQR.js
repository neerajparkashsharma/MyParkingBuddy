import React, { useCallback, useEffect, useRef, useState } from 'react';
import url from '../../commons/axiosUrl';
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
import { RNCamera } from 'react-native-camera';
import { RNHoleView } from 'react-native-hole-view';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/Ionicons';
import Headerx from '../../components/header.js';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
console.disableYellowBox = true;

const CheckOutQR = (props) => {
  const { bookingId, userId, parkingId } = props.route.params;
  const [isActive, setIsActive] = useState(true);
  const [isRequestInProgress, setIsRequestInProgress] = useState(false);

  const onSuccess = (e) => {
    if (isRequestInProgress) return; // Prevent multiple requests

    setIsRequestInProgress(true); // Set the flag to indicate the request is in progress

    axios
      .post(url + 'booking/checkout', {
        parkingId: parkingId,
        checkOutCode: e.data,
        bookingId: bookingId,
        userId: userId,
      })
      .then(function (response) {
        setIsRequestInProgress(false); // Reset the flag
        setIsActive(false);
        alert('Check Out Successful');
        props.navigation.navigate('Home');
      })
      .catch(function (error) {
        setIsRequestInProgress(false); // Reset the flag
        alert('Please scan the correct QR code');
        setIsActive(true);
        props.navigation.navigate('Home');
        console.log('error' + error);
      });
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
    setIsActive(!isActive);
  };

  return (
    <View style={{ flex: 1, padding: 10, justifyContent: 'flex-start', alignItems: 'center' }}>
      <QRCodeScanner
        showMarker
        reactivateTimeout={4}
        onRead={onSuccess}
        reactivate={true}
        cameraStyle={{ height: SCREEN_HEIGHT }}
        customMarker={
          <View style={styles.rectangleContainer}>
            <View style={styles.topOverlay}>
              <Text style={{ fontSize: 30, color: 'white' }}>QR CODE SCANNER</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <View style={styles.leftAndRightOverlay} />
              <View style={styles.rectangle}>
                <Icon name="ios-scan-sharp" size={SCREEN_WIDTH * 0.6} color="white" />
                <Animatable.View
                  style={styles.scanBar}
                  direction="alternate-reverse"
                  iterationCount="infinite"
                  duration={1700}
                  easing="linear"
                  animation={makeSlideOutTranslation('translateY', SCREEN_WIDTH * -0.5)}
                />
              </View>
              <View style={styles.leftAndRightOverlay} />
            </View>
            <View style={styles.bottomOverlay} />
          </View>
        }
      />
    </View>
  );
};

const overlayColor = 'rgba(0,0,0,0.5)';
const rectDimensions = SCREEN_WIDTH * 0.65;
const rectBorderWidth = SCREEN_WIDTH * 0.005;
const rectBorderColor = 'purple';
const scanBarWidth = SCREEN_WIDTH * 0.46;
const scanBarHeight = SCREEN_WIDTH * 0.0025;
const scanBarColor = '#22FF00';
const iconScanColor = 'red';

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
  rectangleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  rectangle: {
    height: rectDimensions,
    width: rectDimensions,
    borderWidth: rectBorderWidth,
    borderColor: rectBorderColor,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  topOverlay: {
    flex: 1,
    height: SCREEN_WIDTH,
    width: SCREEN_WIDTH,
    backgroundColor: overlayColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomOverlay: {
    flex: 1,
    height: SCREEN_WIDTH,
    width: SCREEN_WIDTH,
    backgroundColor: overlayColor,
    paddingBottom: SCREEN_WIDTH * 0.25,
  },
  leftAndRightOverlay: {
    height: SCREEN_WIDTH * 0.65,
    width: SCREEN_WIDTH,
    backgroundColor: overlayColor,
  },
  scanBar: {
    width: scanBarWidth,
    height: scanBarHeight,
    backgroundColor: scanBarColor,
  },
});

export default CheckOutQR;
