import React, {useCallback, useEffect, useRef, useState} from 'react';
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
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
console.disableYellowBox = true;
const VisionCamera = () => {
  const camera = useRef(null);
  const [Isactive, setIsActive] = useState(false);
  // const devices = useCameraDevices();
  // const device = devices.back;
  const [loading, setLoading] = useState(true);
  // const [barcode,setBarcode] = useState('');
  // const [isScanned,setIsScanned] = useState(false);
  // const [frameProcessor, barcodes] = useScanBarcodes([BarcodeFormat.QR_CODE]);
  // const [frameProcessor, barcodes] = useScanBarcodes(BarcodeFormat.QR_CODE, {
  //   checkInverted: true,
  // });
  // const frameProcessor = useFrameProcessor((frame) => {
  //   'worklet';
  //   const detectedBarcodes = scanBarcodes(frame, [BarcodeFormat.QR_CODE], { checkInverted: true });
  //   // runOnJS(setBarcodes)(detectedBarcodes);
  // }, []);
  // const frameProcessor = useFrameProcessor((frame) => {
  //   'worklet'
  //   const qrCodes = scanQRCodes(frame)
  //   console.log(`QR Codes in Frame: ${qrCodes}`)
  // }, [])
  // const [barcode, setBarcode] = useState('');
  // const [hasPermission, setHasPermission] = useState(false);
  // const [isScanned, setIsScanned] = useState(false);
  // useEffect(() => {
  //   requestCameraPermission();
  // });
  // const requestCameraPermission = useCallback(async () => {
  //   const permission = await Camera.requestCameraPermission();
  //   if (permission === 'denied') await Linking.openSettings();
  //   setLoading(false);
  // }, []);
  // useEffect(() => {
  //   console.log("barcodes ->> ",detectedBarcodes)
  //   toggleActiveState();
  //  console.log("first")
  // }, [detectedBarcodes]);
  // const toggleActiveState = async () => {
  //   if (detectedBarcodes  && detectedBarcodes.length > 0 && isScanned === false) {
  //     setIsScanned(true);
  //     // setBarcode('');
  //     console.log("haha")
  //     detectedBarcodes.forEach(async scannedBarcode => {
  //       if (scannedBarcode.rawValue !== '') {
  //         setBarcode(scannedBarcode.rawValue);
  //         Alert.alert(barcode);
  //       }
  //     });
  //   }
  //   else{
  //     console.log("Else")
  //   }
  // };
  const onSuccess = e => {
    console.log(e.data);
    Alert.alert(e.data);
    // Linking.openURL(e.data).catch(err =>
    //   console.error('An error occured', err)
    // );
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
    // <View style={{flex: 1}}>
    //   {device == null ? (
    //     <ActivityIndicator size={20} color={'red'} />
    //   ) : (
    //     <>
    //       <Camera
    //         photo={true}
    //         style={{flex: 1}}
    //         device={device}
    //         isActive={true}
    //         frameProcessor={frameProcessor}
    //         frameProcessorFps={5}
    //       />
    //       {/* <RNHoleView
    //         holes={[
    //           {
    //             x: widthPercentageToDP('8.5%'),
    //             y: heightPercentageToDP('36%'),
    //             width: widthPercentageToDP('83%'),
    //             height: heightPercentageToDP('20%'),
    //             borderRadius: 10,
    //           },
    //         ]}
    //         style={styles.rnholeView}
    //       /> */}
    //       <View
    //         style={{
    //           position: 'absolute',
    //           alignItems: 'center',
    //           bottom: SIZES.padding,
    //           left: 0,
    //           right: 0,
    //         }}>
    //         <TouchableOpacity
    //           onPress={() => console.log('first')}
    //           style={{
    //             height: 60,
    //             width: 60,
    //             borderRadius: 30,
    //             alignItems: 'center',
    //             justifyContent: 'center',
    //             backgroundColor: Colors.White,
    //           }}>
    //           <CustomIcons
    //             name={'scan1'}
    //             type={'ant'}
    //             style={{fontSize: 30, color: Colors.lightPurple}}
    //           />
    //         </TouchableOpacity>
    //       </View>
    //     </>
    //   )}
    // </View>
    <QRCodeScanner
      showMarker
      reactivateTimeout={4}
      onRead={onSuccess}
      reactivate={Isactive}
      // bottomContent={()}
      cameraStyle={{height: SCREEN_HEIGHT}}
      customMarker={
        <View style={styles.rectangleContainer}>
          <View style={styles.topOverlay}>
            <Text style={{fontSize: 30, color: 'white'}}>QR CODE SCANNER</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View style={styles.leftAndRightOverlay} />
            <View style={styles.rectangle}>
              
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
          {/* <View style={{position:'relative',bottom:12}}>
            <Button title="Reactivate" onPress={startScan} />
          </View> */}
          <View style={styles.bottomOverlay} />
        </View>
      }
    />
  );
};
// // Styles:
// const styles = StyleSheet.create({
//   rnholeView: {
//     position: 'absolute',
//     width: '100%',
//     height: '100%',
//     alignSelf: 'center',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: 'rgba(0,0,0,0.5)',
//   },
// });
const overlayColor = 'rgba(0,0,0,0.5)'; // this gives us a black color with a 50% transparency
const rectDimensions = SCREEN_WIDTH * 0.65; // this is equivalent to 255 from a 393 device width
const rectBorderWidth = SCREEN_WIDTH * 0.005; // this is equivalent to 2 from a 393 device width
const rectBorderColor = 'purple';
const scanBarWidth = SCREEN_WIDTH * 0.46; // this is equivalent to 180 from a 393 device width
const scanBarHeight = SCREEN_WIDTH * 0.0025; //this is equivalent to 1 from a 393 device width
const scanBarColor = '#22FF00';
const iconScanColor = 'red'
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
    height: SCREEN_WIDTH ,
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
export default VisionCamera;