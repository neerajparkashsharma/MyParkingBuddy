import {
  View,
  Text,
  FlatListm,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Image,
  ScrollView
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { black } from 'react-native-paper/lib/typescript/styles/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import url from '../../commons/axiosUrl.js';
import { colors } from '../../commons/Colors';
import Icon from 'react-native-vector-icons/Ionicons';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button } from 'react-native-paper';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { getData } from '../../commons/Data.js';
import { useNavigation } from '@react-navigation/native';
import { SCREEN_WIDTH } from '../../components/units.js';
import Headerx from '../../components/header.js';

const AllBookings = props => {
  const navigation = useNavigation();
  const Item = ({ Id, location, descriptionm, charges }) => {
    return (
      <View style={styles.item} key={Id}>
        {console.log(Id)}
        <Text style={styles.txt}>Location: {location}</Text>
        <Text style={styles.txt}>Description: {descriptionm}</Text>

        <Button
          onPress={() =>
            navigation.navigate('Camera', {
              bookingId: Id,
            })
          }>
          <Text style={styles.txt}> Check In ✔</Text>
        </Button>

        <Button
          onPress={() =>
            navigation.navigate('Camera2', {
              bookingId: Id,
            })
          }>
          <Text style={styles.txt}> Check Out ✔</Text>
        </Button>
      </View>
    );
  };

  [listOfBookings, setListOfBookings] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [userid, setUserid] = useState();
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('userdata');

      if (value !== null) {
        setUserid(value);

        axios
          .get(url + 'parkingBookingRecords/customer/' + value)

          .then(function (response) {
            setLoading(false);
            console.log(response);
            setListOfBookings(response.data);
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    } catch (e) {
      alert(e);
      // error reading value
    }
  };

  useEffect(() => {
    getData();
  }, []);



  if (isLoading) {
    return (
      <ActivityIndicator
        size="large"
        color="#0000ff"
        style={{ alignSelf: 'center', flex: 1 }}
      />
    );
  }
  return (
    <View style={styles.container}>
      <Headerx
        navigation={props?.navigation}
        headerName={'Parking Bookings'}></Headerx>
      <View style={{ marginBottom: 30 }}>


      </View>


      <ScrollView style={styles.popularWrapper}>
        {listOfBookings.map(item => (
          <TouchableWithoutFeedback key={item.id}>
            <View
              style={[
                styles.popularCardWrapper,
                {
                  marginTop: item.id == 1 ? 10 : 20,
                },
              ]}
            >

              <View style={{ flexDirection: 'column' }}>
                <View style={{ flexDirection: 'row' }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                    <Text style={[styles.popularTitlesTitle, {
                      backgroundColor: item.isExpired ? '#FF0000' : '#613EEA',
                      borderRadius: 20,
                      paddingHorizontal: 10,
                      paddingVertical: 4,
                      alignSelf: 'flex-start',
                      color: 'white',
                      fontSize: 12,
                      marginRight: 10,
                    }]}>
                      <Text style={{ fontWeight: 'bold' }}>Status: </Text>
                      {item.isExpired ? 'Expired' : 'Active'}
                    </Text>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                    <Text style={[styles.popularTitlesTitle, {
                      backgroundColor: item.isExpired ? '#FF0000' : '#613EEA',
                      borderRadius: 20,
                      paddingHorizontal: 10,
                      paddingVertical: 4,
                      alignSelf: 'flex-start',
                      color: 'white',
                      fontSize: 12,
                      marginRight: 10,
                    }]}>
                      <Text style={{ fontWeight: 'bold' }}>$ Total Charges: </Text>
                      {item?.totalParkingCharges == null ? "N/A" : "Rs. " + item.totalParkingCharges}
                    </Text>
                  </View>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                  <Icon name="location" size={20} color="red" style={{ marginRight: 5 }} />
                  <Text style={styles.popularTitlesTitle}>{item.parking?.parkingLocation}</Text>
                </View>
                {
                  item.isExpired ? null :
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignSelf: 'center', marginTop: 30 }}>
                      <TouchableOpacity style={{
                        flexDirection: 'row', alignItems: 'center', backgroundColor: '#613EEA',
                        borderRadius: 5,
                        paddingHorizontal: 13,
                        paddingVertical: 10,
                        width: 200,
                        
                        fontSize: 12,
                        marginRight: 10,
                      }}
                      
                        onPress={props?.navigation.navigate('Camera', {
                          bookingId: item.id,
                        })
                        }
                      >
                        <Icon name="checkmark-outline" size={25} color={'white'} style={{ marginRight: 5 }} />
                        <Text style={{
                          backgroundColor: '#613EEA',
                          borderRadius: 5,
                          paddingHorizontal: 13,
                          paddingVertical: 10,

                          color: 'white',
                          fontSize: 12,
                          marginRight: 10,
                        }}>
                          Check In
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={{
                        flexDirection: 'row', alignItems: 'center', backgroundColor: '#613EEA',
                        borderRadius: 5,
                        paddingHorizontal: 13,
                        paddingVertical: 10,
                        width: 200,

                        color: 'white',
                        fontSize: 12,
                        marginRight: 10,
                      }}>
                        <Icon name="checkmark-done-outline" size={25} color={'white'} style={{ marginRight: 5 }} />
                        <Text style={[styles.popularTitlesTitle, {
                          backgroundColor: '#613EEA',
                          borderRadius: 5,
                          paddingHorizontal: 13,
                          paddingVertical: 10,

                          color: 'white',
                          fontSize: 12,
                          marginRight: 10,
                        }]}>
                         Check Out 
                        </Text>
                      </TouchableOpacity>
                    </View>
                }


                <View style={styles.popularCardBottom}>
                  {item.isExpired ? null : (
                    <View style={styles.addPizzaButton}>
                      <View style={{ flexDirection: 'row', alignItems: 'center',textAlign:'center',justifyContent:'center' }}>
                        <Text style={[styles.popularTitlesTitle, { fontWeight: 'bold', color: colors.white,fontSize:19 }]}>
                          MORE DETAILS
                        </Text>
                        <Icon name="information-circle-sharp" size={22} color={colors.white} style={{ marginLeft: 5 }} />

                      </View>
                    </View>
                  )}
                </View>

              </View>
            </View>


          </TouchableWithoutFeedback>

        ))}
      </ScrollView>

    </View>


  );
};

export default AllBookings;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 2,
  },
  item: {
    backgroundColor: '#613EEA',
    opacity: 0.8,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  txt: {
    color: 'white',
    fontSize: 17,
    fontWeight: 'bold',
  },
  popularWrapper: {
    paddingHorizontal: 20,
  },
  popularTitle: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 16,
  },
  popularCardWrapper: {
    backgroundColor: colors.white,
    borderRadius: 5,
    paddingTop: 20,
    paddingLeft: 20,
    flexDirection: 'row',
    overflow: 'hidden',
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  popularTopWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  popularTopText: {
    marginLeft: 10,
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
  },
  popularTitlesWrapper: {
    marginTop: 20,
  },
  popularTitlesTitle: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
    color: colors.textDark,
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
    paddingHorizontal: SCREEN_WIDTH / 8,
    paddingVertical: 20,
    textAlign: 'center',
    width: SCREEN_WIDTH / 1,
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
  checkInOutButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkInOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#613EEA',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginRight: 10,
  },
  checkInOutButtonText: {
    color: 'white',
    marginLeft: 5,
  },
});
