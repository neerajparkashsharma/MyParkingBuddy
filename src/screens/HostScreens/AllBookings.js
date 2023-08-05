import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Touchable,
  Modal,
  Pressable,
} from 'react-native';
import { Divider } from '@react-native-material/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import url from '../../commons/axiosUrl';
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../../components/units.js';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import { colors } from '../../commons/Colors';
import Headerx from '../../components/header.js';
import QRCode from 'react-native-qrcode-svg';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { CameraRoll } from "@react-native-camera-roll/camera-roll";


import { captureScreen } from 'react-native-view-shot';


const AllBookings = props => {
  const [listOfBookings, setListOfBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userid, setUserid] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedQR, setSelectedQR] = useState(null);
  const [QRType, setQRType] = useState('');
  const openModal = (qrcode, type) => {
    setSelectedQR(qrcode);
    setModalVisible(true);
    setQRType(type);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedQR(null);
    setQRType(null);
  };

  const [walletAmount, setWalletAmount] = useState(0);

  const getWalletAmount = async (hostId) => {
    try {
      const response = await axios.get(url + `booking/wallet/${hostId}`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch wallet amount:', error);
      return 0;
    }
  };


  const takeScreenShot = () => {
    // To capture Screenshot
    captureScreen({
      // Either png or jpg (or webm Android Only), Defaults: png
      format: 'jpg',
      // Quality 0.0 - 1.0 (only available for jpg)
      quality: 0.8,
    }).then(
      // callback function to get the result URL of the screenshot
      async (uri) => {
        // setSavedImagePath(uri);
        try {


          // setSavedImagePath(QRType);
          await CameraRoll.save(uri, { type: 'photo', album: 'ParkingBuddy', ...(Platform.OS === 'android' && { fileName: QRType }) });
          alert("Saved to Gallery!")
          console.log('Screenshot saved to gallery');
        } catch (error) {
          console.error('Failed to save screenshot to gallery:', error);
        }
      },
      (error) => console.error('Oops, Something Went Wrong', error),
    );
  };




  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('userdata');

      if (value !== null) {
        setUserid(value);
        axios
          .get(url + 'parking/host/' + value)
          .then(function (response) {
            setLoading(false); 
            console.log(response.data);
            setListOfBookings(response.data);
          })
          .catch(function (error) {
            console.log(error);
          });

        const walletAmount = await getWalletAmount(value);
        setWalletAmount(walletAmount);
      }
    } catch (e) {
      alert(e);
    }
  };


  useEffect(() => {
    getData();
  }, [props]);





  return (
    <>
      {
        modalVisible ?
          (


            <View style={styles.modalContent}>
              <MaterialCommunityIcons style={{
                position: 'absolute',
                top: SCREEN_HEIGHT / 40,
                right: SCREEN_WIDTH / 10,
              }}
                onPress={closeModal}
                name='close'
                size={30}
              />
              <Text style={{ fontSize: 50, bottom: SCREEN_HEIGHT / 15, fontWeight: 'bold' }}>{QRType}</Text>



              <QRCode value={selectedQR} size={240}
              />


              <Pressable style={styles.closeButton} onPress={() => {
                takeScreenShot();
              }}>
                <Text style={styles.closeButtonText}>CAPTURE</Text>
              </Pressable>

            </View>

          )
          :
          (
            <>

              <Headerx navigation={props.navigation} headerName={'All Parkings'} />

              <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 10 }}>
                Wallet Amount: {walletAmount}
              </Text>

              <ScrollView>
                {

                  listOfBookings.length == 0 ? (
                    <>
                      <Text style={{
                        fontSize: 16,
                        color: 'gray',
                        textAlign: 'center',
                        marginTop: 20,
                      }}>No bookings available.</Text>
                      <TouchableOpacity style={
                        {
                          backgroundColor: colors.themeColor,
                          padding: 20,
                          borderRadius: 5,
                          marginTop: 20,
                          alignSelf: 'center',
                          color: 'white',
                          // opacity: 0.8,
                        }
                      } onPress={() => props.navigation.navigate("ParkingRegistration")}>
                        <Text style={{
                          color: 'white',
                          fontSize: 16,
                          fontWeight: 'bold',
                        }}>Create Parking</Text>
                      </TouchableOpacity>
                    </>
                  ) :
                    listOfBookings.map((item, index) => (


                      <View style={styles.container} key={item.createDate}>
                        <Text style={styles.titleText}>Parking #{index + 1}</Text>

                        <MaterialCommunityIcons
                          name='pencil'
                          size={30}
                          style={{ position: 'absolute', top: SCREEN_HEIGHT / 40, right: SCREEN_WIDTH / 10 }}
                          onPress={() => props.navigation.navigate('EditParking', { item: item })}
                        />

                        <Divider style={styles.divider} color="#BEBEBE" />

                        <View style={styles.rowContainer}>
                          <Text style={styles.labelText}>Check-In QR</Text>
                          <TouchableOpacity onPress={() => openModal(item.checkInCode, "CHECK IN QR")}>
                            <MaterialCommunityIcons
                              style={styles.qrIcon}
                              name="qrcode-scan"
                              color="black"
                              size={25}


                            />
                          </TouchableOpacity>

                        </View>

                        <View style={styles.rowContainer}>
                          <Text style={styles.labelText}>Check-Out QR</Text>
                          <TouchableOpacity onPress={() => item.checkOutCode == null ? alert("No Any Code is set") : openModal(item.checkOutCode, "CHECK OUT QR")}>
                            <MaterialCommunityIcons
                              style={styles.qrIcon}
                              name="qrcode-scan"
                              color="black"
                              size={25}


                            />
                          </TouchableOpacity>

                        </View>




                        <View style={styles.rowContainer}>
                          <Text style={styles.labelText}>Charges/hr:</Text>
                          <Text style={styles.valueText}>Rs. {item.parkingCharges}</Text>
                        </View>

                        <View style={styles.buttonsContainer}>
                          <Pressable style={styles.button} onPress={() => props?.navigation.navigate("ParkingBookingsDetails", {
                            parkingId: item.id
                          })}>
                            <Text style={styles.buttonText}>View Bookings</Text>
                          </Pressable>

                        </View>


                        <Divider
                          style={styles.divider}
                          color="#BEBEBE"
                          leadingInset={10}
                          trailingInset={10}
                        />

                        <View style={styles.locationContainer}>
                          <Entypo
                            style={styles.locationIcon}
                            name="location-pin"
                            color="red"
                            size={25}
                          />
                          <Text style={styles.locationText}>{item?.parkingLocation}</Text>
                        </View>

                      </View>
                    ))}


              </ScrollView>
            </>
          )
      }


    </>
  );
};

export default AllBookings;

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH / 1.05,
    alignSelf: 'center',
    height: SCREEN_HEIGHT / 1.9,
    backgroundColor: 'white',
    marginTop: 20,
    elevation: 5,
    marginBottom: 40,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  closeButton: {
    backgroundColor: colors.textDark,
    padding: 20,

    borderRadius: 5,
    alignSelf: 'center',
    marginBottom: 20,
    marginTop: 100,
  },
  crossButton: {
    position: 'absolute',
    top: 100, // Adjust the top position as needed
    left: 100, // Adjust the left position as needed
    // zIndex: 9999,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  titleText: {
    color: 'black',
    fontSize: 17,
    fontWeight: '500',
    alignSelf: 'center',
    marginTop: 10,
  },
  modalContent: {
    flex: 1,
    paddingTop: 50, // Adjust the top padding to create space for the fixed button

    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },

  qrCodeImage: {
    width: 200,
    height: 200,
  },
  divider: {
    marginTop: 20,
  },

  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },

  labelText: {
    fontSize: 15,
    fontWeight: '500',
    marginLeft: 20,
    color: '#585858',
  },

  valueText: {
    fontSize: 15,
    fontWeight: '500',
    marginRight: 20,
    color: '#585858',
  },

  locationContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 10,
  },

  locationIcon: {
    marginLeft: 25,
  },

  locationText: {
    fontSize: 15,
    flexWrap: 'wrap',
    alignSelf: 'center',
    marginRight: 30,
    marginLeft: 5,
    color: colors.themeColor,
  },

  qrCodeContainer: {
    backgroundColor: colors.themeColor,
    width: 72,
    height: 72,
    alignSelf: 'center',
    borderRadius: 35,
    top: SCREEN_HEIGHT / 26,
    elevation: 35,
    justifyContent: 'center',
    alignItems: 'center',
  }, buttonsContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  button: {
    backgroundColor: colors.themeColor,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
