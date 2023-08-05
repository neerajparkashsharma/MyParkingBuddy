import {
  View,
  Text,
  FlatListm,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Image,
  ScrollView,
  TouchableOpacity, TouchableWithoutFeedback
} from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import url from '../../commons/axiosUrl.js';
import { colors } from '../../commons/Colors';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../components/units.js';
import { useIsFocused } from '@react-navigation/native';
import Headerx from '../../components/header.js';
import moment from 'moment';


const ParkingBookings = props => {

  const { parkingId } = props.route.params;
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [listOfBookings, setListOfBookings] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [userid, setUserid] = useState();
  const getData = async () => {



    axios
      .get(url + 'parking/bookings/' + parkingId)

      .then(function (response) {
        setLoading(false);
        console.log(response);
        setListOfBookings(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });

  };

  useEffect(() => {
    getData();
  }, [isFocused]);


  const [timings, setTimings] = useState([]);
  const handleViewTimings = (item) => {
    console.log(item);

    axios.get(url + 'bookingVehicles/all/' + item.id).then((res) => {
      console.log(res.data);
      setTimings(res.data);
      // navigation.navigate('ViewTimings', { timings: res.data });
    }
    ).catch((err) => {

      console.log(err);
    }
    )
  }


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
        {listOfBookings.length == 0 ? (
          <Text style={{ textAlign: 'center', marginTop: 20, fontSize: 18, color: colors.textDark }}>
            No bookings found
          </Text>

        ) : (
          <>
            {listOfBookings.map((item) => (
              <TouchableWithoutFeedback key={item.id}>
                <View
                  style={[
                    styles.popularCardWrapper,
                    {
                      marginTop: 15, alignItems: 'center', // Align items to the center

                    },
                  ]}
                >
                  <View style={{ flexDirection: 'column' }}>
                    <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                      <Text
                        style={[
                          styles.popularTitlesTitle,
                          {
                            backgroundColor: item.isExpired ? '#FF0000' : '#613EEA',
                            borderRadius: 20,
                            paddingHorizontal: 10,
                            paddingVertical: 4,
                            alignSelf: 'flex-start',
                            color: 'white',
                            fontSize: 12,
                            marginRight: 10,
                          },
                        ]}
                      >
                        <Text style={{ fontWeight: 'bold' }}>Status: </Text>
                        {item.isExpired ? 'Expired' : 'Active'}
                      </Text>

                      <Text
                        style={[
                          styles.popularTitlesTitle,
                          {
                            backgroundColor: item.isExpired ? '#FF0000' : '#613EEA',
                            borderRadius: 20,
                            paddingHorizontal: 10,
                            paddingVertical: 4,
                            alignSelf: 'flex-start',
                            color: 'white',
                            fontSize: 12,
                          },
                        ]}
                      >
                        <Text style={{ fontWeight: 'bold' }}>$ Total Charges: </Text>
                        {item?.totalParkingCharges == null ? 'N/A' : 'Rs. ' + item.totalParkingCharges}
                      </Text>

                    </View>
                    {
                      item.isExpired ? null : (
                        <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                          <Text
                            style={[
                              styles.popularTitlesTitle,
                              {
                                backgroundColor: item.isExpired ? '#FF0000' : '#613EEA',
                                borderRadius: 20,
                                paddingHorizontal: 10,
                                paddingVertical: 4,
                                alignSelf: 'flex-start',
                                color: 'white',
                                fontSize: 12,
                                marginRight: 10,
                              },
                            ]}
                          >
                            <Text style={{ fontWeight: 'bold' }}>Check In Time: </Text>
                            {moment(item.parkFromDate).format("YYYY-MM-DD hh:mm A").toString().substring(11, 20)}
                          </Text>

                          <Text
                            style={[
                              styles.popularTitlesTitle,
                              {
                                backgroundColor: item.isExpired ? '#FF0000' : '#613EEA',
                                borderRadius: 20,
                                paddingHorizontal: 10,
                                paddingVertical: 4,
                                alignSelf: 'flex-start',
                                color: 'white',
                                fontSize: 12,
                              },
                            ]}
                          >
                            <Text style={{ fontWeight: 'bold' }}>Check Out Time: </Text>
                            {moment(item.parkToDate).format("YYYY-MM-DD hh:mm A").toString().substring(11, 20)}
                          </Text>

                        </View>
                      )
                    }


                    <View style={{ flexDirection: 'row', marginTop: 10, marginBottom: item.isExpired ? 10 : -3 }}>
                      <Icon name="location" size={20} color="green" style={{ marginRight: 5 }} />
                      <Text style={styles.popularTitlesTitle}>{item.parking?.parkingLocation}</Text>
                    </View>

                    <View style={{ flexDirection: 'row', marginTop: 13, marginBottom: item.isExpired ? 10 : -3 }}>
                      <Icon name="md-calendar-sharp" size={20} color={colors.primary} style={{ marginRight: 5 }} />
                      <Text style={[styles.popularTitlesTitle,
                      {
                        fontSize: 13,
                        fontWeight: '800'
                      }]}>{item.parkFromDate.toString().substring(0, 10)} - {item.parkToDate.toString().substring(0, 10)}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 13, marginBottom: item.isExpired ? 10 : -3 }}>
                     

                           
                      {/* {
                      timings.length == 0 ? null : (
                        <View style={{ flexDirection: 'row', marginTop: 10, marginBottom: item.isExpired ? 10 : -3 }}>
                          <Icon name="md-calendar-sharp" size={20} color={colors.black} style={{ marginRight: 5 }} />
                          <Text style={[styles.popularTitlesTitle,
                          {
                            fontSize: 13,
                            color:'black',
                            fontWeight: '800'
                          }]}>{timings[0].parkFromDate.toString().substring(0, 10)} - {timings[0].parkToDate.toString().substring(0, 10)}</Text>
                        </View>
                      )
                    }
                    */}
                    </View>


                    {/* <TouchableOpacity
                      style={[
                        styles.button,
                        {
                          backgroundColor: '#613EEA',
                          borderRadius: 20,
                          paddingHorizontal: 10,
                          paddingVertical: 4,
                          alignSelf: 'flex-start',
                          marginTop: 10
                          ,marginBottom:20
                        },
                      ]}
                      onPress={() => handleViewTimings(item)}
                    >
                      <Text style={{ color: 'white', fontSize: 12 }}>View Timings
                   


                      </Text>
                    </TouchableOpacity> */}

                    


                    {/* {item.isExpired ? null : (
                    <TouchableOpacity
                      style={{
                        backgroundColor: colors.themeColor,
                        borderRadius: 5,
                        paddingHorizontal: 0.04 * SCREEN_WIDTH,
                        paddingVertical: 0.03 * SCREEN_WIDTH,
                        width: SCREEN_WIDTH / 2.5,
                        marginTop: 10,
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        shadowColor: colors.black,
                        shadowOffset: {
                          width: 0,
                          height: 2,
                        },
                        shadowOpacity: 0.05,
                        shadowRadius: 10,
                        elevation: 2,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() => {
                        props?.navigation.navigate('BookingsParkingDetails', {
                          item: item.data,
                        });
                      }}
                    >
                      <Text style={{ ...styles.popularTitlesTitle, fontWeight: 'bold', color: colors.white, fontSize: 19 }}>
                        More Details
                      </Text>
                      <Icon name="information-circle-sharp" size={22} color={colors.white} style={{ marginLeft: 5 }} />
                    </TouchableOpacity>
                    )} */}


                  </View>
                </View>
              </TouchableWithoutFeedback>
            ))}

          </>
        )}
      </ScrollView>

    </View>


  );
};

export default ParkingBookings;
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
    fontSize: 13,
    flexWrap: 'wrap-reverse',
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
    width: SCREEN_WIDTH / 20,

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
