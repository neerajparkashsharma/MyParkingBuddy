import { View, Text,StyleSheet,ActivityIndicator } from 'react-native'
import React,{useEffect,useCallback} from 'react'

import { Camera, frameRateIncluded } from 'react-native-vision-camera';
import {useCameraDevices} from 'react-native-vision-camera';


import { useScanBarcodes, BarcodeFormat } from 'vision-camera-code-scanner';

export default function Cameras() {

    const [barcode, setBarcode] = React.useState('');
const [hasPermission, setHasPermission] = React.useState(false);
const [isScanned, setIsScanned] = React.useState(false);

    const devices = useCameraDevices()
    const device = devices.back
    const [frameProcessor, barcodes] = useScanBarcodes([
        BarcodeFormat.ALL_FORMATS, {checkInverted: false}
         // You can only specify a particular format
      ]);

      useEffect(() => {
        toggleActiveState();
        return () => {
          barcodes;
        };
      }, [barcodes]);
    
    const toggleActiveState = async () => {
        if (barcodes && barcodes.length > 0 && isScanned === false) {
          setIsScanned(true);
          // setBarcode('');
          console.log("inside");

        


          barcodes.forEach(async (scannedBarcode) => {
            if (scannedBarcode.rawValue !== '') {
              setBarcode(scannedBarcode.rawValue);
              alert(barcode);
              console.log(barcode);
            }
            console.log("inside");
          });
        }
      };


    useEffect(() => {
        requestCameraPermission();
      });
      const requestCameraPermission = useCallback(async () => {
        const permission = await Camera.requestCameraPermission();
        if (permission === 'denied') await Linking.openSettings();
        // setLoading(false);
      }, []);


    return (
        <View style={{flex:1}}>
        {device == null ? (
            <ActivityIndicator size={20} color={'red'} />
          ) : (
            <>
              <Camera
                photo={true}
               
                style={StyleSheet.absoluteFill}
                device={device}
          isActive={!isScanned}
// frameProcessor={frameProcessor}
          frameProcessorFps={10}
                
              />
            

</>
    
    )
    
  
}
</View>


    )
}const styles = StyleSheet.create({
    barcodeTextURL: {
      fontSize: 20,
      color: 'white',
      fontWeight: 'bold',
    },
  });