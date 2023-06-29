import {
  View,
  Text,
  StyleSheet,
  TextInput,
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


const AllBookings = props => {
  const isFocused = useIsFocused();

  const [listOfBookings, setListOfBookings] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [userid, setUserid] = useState();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');

  const filterBookings = () => {
    const filtered = listOfBookings.filter(item =>
      item?.parkingBookingRecords?.parking?.parkingLocation?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    console.log(filtered, 'filtered');
    setFilteredBookings(filtered);
  };

  const sortBookings = () => {
    const sortedBookings = [...listOfBookings];
    sortedBookings.sort((a, b) => {
      const dateA = a.bookingDates[0]?.bookingDate;
      const dateB = b.bookingDates[0]?.bookingDate;

      if (sortOrder === 'asc') {
        return moment(dateA).diff(moment(dateB));
      } else {
        return moment(dateB).diff(moment(dateA));
      }
    });

    setListOfBookings(sortedBookings);
  };



  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('userdata');

      if (value !== null) {
        setUserid(value);
        axios
          .get(url + 'parkingBookingRecords/customer/' + value)
          .then(function (response) {
            setLoading(false);
            setListOfBookings(response.data);
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    } catch (e) {
      alert(e);
    }
  };

  useEffect(() => {
    getData();
  }, [isFocused]);



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

      <View style={styles.searchContainer}>
        <Icon name="search-outline" size={20} color="gray" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search by location"
          placeholderTextColor="gray"
          value={searchQuery}
          onChangeText={(text) => {
            setSearchQuery(text);
            filterBookings();
          }}
          onEndEditing={filterBookings}
        />
        <View style={styles.sortButtonContainer}>
          <TouchableOpacity
            onPress={() => {
              setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
              sortBookings();
            }}
            style={styles.sortButton}
          >
            <Icon
              name={sortOrder === 'asc' ? 'arrow-up-outline' : 'arrow-down-outline'}
              size={20}
              color={colors.themeColor}
            />
          </TouchableOpacity>
        </View>
      </View>

      {searchQuery.length > 0 ? (
        <ScrollView style={styles.popularWrapper}>
          {filteredBookings.length == 0 ? (
            <Text style={{ textAlign: 'center', marginTop: 20, fontSize: 18, color: colors.textDark }}>
              No bookings found
            </Text>

          ) : (
            <>
              {filteredBookings.map((item) => (
                <TouchableWithoutFeedback key={item?.parkingBookingRecords?.id}>
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
                              backgroundColor: item?.parkingBookingRecords?.isExpired ? '#FF0000' : '#613EEA',
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
                          {item?.parkingBookingRecords?.isExpired ? 'Expired' : 'Active'}
                        </Text>

                        <Text
                          style={[
                            styles.popularTitlesTitle,
                            {
                              backgroundColor: item?.parkingBookingRecords?.isExpired ? '#FF0000' : '#613EEA',
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
                          {item?.parkingBookingRecords?.totalParkingCharges == null ? 'N/A' : 'Rs. ' + item?.parkingBookingRecords?.totalParkingCharges}
                        </Text>

                      </View>
                      {
                        item?.parkingBookingRecords?.isExpired ? null : (
                          <View style={{ flexDirection: 'row', marginBottom: 10 }}>

                          </View>
                        )
                      }


                      <View style={{ flexDirection: 'row', marginTop: 10, marginBottom: item?.parkingBookingRecords?.isExpired ? 10 : -3 }}>
                        <Icon name="location" size={20} color="green" style={{ marginRight: 5 }} />
                        <Text style={styles.popularTitlesTitle}>{item?.parkingBookingRecords?.parking?.parkingLocation}</Text>
                      </View>

                      <View style={{ flexDirection: 'row', marginTop: 13, marginBottom: item?.parkingBookingRecords?.isExpired ? 10 : -3 }}>
                        <Icon name="md-calendar-sharp" size={20} color={colors.primary} style={{ marginRight: 5 }} />
                        <Text style={[styles.popularTitlesTitle,
                        {
                          fontSize: 13,
                          fontWeight: '800'
                        }]}>

                          {item?.bookingDates?.length > 1 && item?.bookingDates?.map((i) => (
                            <Text style={{ fontSize: 13, fontWeight: '800' }} key={i?.bookingDate || item?.id}>
                              {
                                moment(i?.bookingDate).format('DD-MM-YYYY').toString()
                              }
                            </Text>
                          ))
                            .reduce((prev, curr) => [prev, ', ', curr])
                          }

                          {item?.bookingDates?.length == 1 && item?.bookingDates?.map((i) => (
                            <Text style={{ fontSize: 13, fontWeight: '800' }} key={i?.bookingDate || item?.id}>
                              {
                                moment(i?.bookingDate).format('DD-MM-YYYY').toString()
                              }
                            </Text>
                          ))
                          }

                          {item?.bookingDates?.length == 0 ? 'N/A' : null}




                        </Text>
                      </View>


                      {item?.parkingBookingRecords?.isExpired ? null : (
                        <View style={{ flexDirection: 'row', marginTop: 30 }}>
                          <TouchableOpacity
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              backgroundColor: '#613EEA',
                              borderRadius: 6,
                              paddingHorizontal: 0.04 * SCREEN_WIDTH,
                              paddingVertical: 0.003 * SCREEN_HEIGHT,
                              marginRight: 10,
                              marginBottom: 10,
                            }}
                            onPress={() => {
                              props?.navigation.navigate('Check In QR Scanner', {
                                bookingId: item?.parkingBookingRecords?.id,
                                userId: userid,
                                parkingId: item?.parkingBookingRecordsparking?.id,

                              });
                            }}
                          >
                            <Icon name="checkmark-outline" size={0.05 * SCREEN_WIDTH} color={'white'} style={{ marginRight: 0.02 * SCREEN_WIDTH }} />
                            <Text
                              style={{
                                backgroundColor: '#613EEA',
                                borderRadius: 5,
                                color: 'white',
                                fontSize: 0.03 * SCREEN_WIDTH,
                                marginRight: 10,
                              }}
                            >
                              Check In
                            </Text>
                          </TouchableOpacity>

                          <TouchableOpacity
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              backgroundColor: '#613EEA',
                              borderRadius: 5,
                              paddingHorizontal: 0.04 * SCREEN_WIDTH,
                              paddingVertical: 0.03 * SCREEN_WIDTH,
                              marginRight: 10,
                              marginBottom: 10,

                            }}

                            onPress={() => {
                              props?.navigation.navigate('Check Out QR Scanner', {
                                bookingId: item?.parkingBookingRecordsid,
                                userId: userid,
                                parkingId: item?.parkingBookingRecordsparking?.id,
                              });
                            }}

                          >
                            <Icon name="checkmark-done-outline" size={0.05 * SCREEN_WIDTH} color={'white'} style={{ marginRight: 0.02 * SCREEN_WIDTH }} />
                            <Text
                              style={{
                                backgroundColor: '#613EEA',
                                borderRadius: 5,
                                color: 'white',
                                fontSize: 0.03 * SCREEN_WIDTH,
                                marginRight: 10,
                              }}
                            >
                              Check Out
                            </Text>
                          </TouchableOpacity>

                          <TouchableOpacity style={{ flexDirection: 'row', marginTop: 10 }}

                            onPress={() => {
                              props?.navigation.navigate('ChatRoom', {
                                bookingId: item?.parkingBookingRecordsid,
                                userId: userid,
                                parki8ngId: item?.parkingBookingRecordsparking?.id,

                              });
                            }}
                          >
                            <Text style={[styles.popularTitlesTitle,
                            {
                              color: colors.themeColor,
                              fontSize: 13,
                              fontWeight: '800'
                            }]}>Chat</Text>

                            <Icon name="md-chatbubble-ellipses-outline" size={0.07 * SCREEN_WIDTH} color={colors.themeColor} style={{ marginRight: 0.02 * SCREEN_WIDTH }} />

                          </TouchableOpacity>

                        </View>
                      )}



                    </View>
                  </View>
                </TouchableWithoutFeedback>
              ))}

            </>
          )}
        </ScrollView>
      )
        :
        (
          <ScrollView style={styles.popularWrapper}>
            {listOfBookings.length == 0 ? (
              <Text style={{ textAlign: 'center', marginTop: 20, fontSize: 18, color: colors.textDark }}>
                No bookings found
              </Text>

            ) : (
              <>
                {listOfBookings.map((item) => (


                  <TouchableWithoutFeedback key={item?.parkingBookingRecords?.id}>
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
                                backgroundColor: item?.parkingBookingRecords?.isExpired ? '#FF0000' : '#613EEA',
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
                            {item?.parkingBookingRecords?.isExpired ? 'Expired' : 'Active'}
                          </Text>

                          <Text
                            style={[
                              styles.popularTitlesTitle,
                              {
                                backgroundColor: item?.parkingBookingRecords?.isExpired ? '#FF0000' : '#613EEA',
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
                            {item?.parkingBookingRecords?.totalParkingCharges == null ? 'N/A' : 'Rs. ' + item?.parkingBookingRecords?.totalParkingCharges}
                          </Text>

                        </View>
                        {
                          item?.parkingBookingRecords?.isExpired ? null : (
                            <View style={{ flexDirection: 'row', marginBottom: 10 }}>

                            </View>
                          )
                        }


                        <View style={{ flexDirection: 'row', marginTop: 10, marginBottom: item?.parkingBookingRecords?.isExpired ? 10 : -3 }}>
                          <Icon name="location" size={20} color="green" style={{ marginRight: 5 }} />
                          <Text style={styles.popularTitlesTitle}>{item?.parkingBookingRecords?.parking?.parkingLocation}</Text>
                        </View>

                        <View style={{ flexDirection: 'row', marginTop: 13, marginBottom: item?.parkingBookingRecords?.isExpired ? 10 : -3 }}>
                          <Icon name="md-calendar-sharp" size={20} color={colors.primary} style={{ marginRight: 5 }} />
                          <Text style={[styles.popularTitlesTitle,
                          {
                            fontSize: 13,
                            fontWeight: '800'
                          }]}>

                            {item?.bookingDates?.length > 1 && item?.bookingDates?.map((i) => (
                              <Text style={{ fontSize: 13, fontWeight: '800' }} key={i?.bookingDate || item?.id}>
                                {
                                  moment(i?.bookingDate).format('DD-MM-YYYY').toString()
                                }
                              </Text>
                            ))
                              .reduce((prev, curr) => [prev, ', ', curr])
                            }

                            {item?.bookingDates?.length == 1 && item?.bookingDates?.map((i) => (
                              <Text style={{ fontSize: 13, fontWeight: '800' }} key={i?.bookingDate || item?.id}>
                                {
                                  moment(i?.bookingDate).format('DD-MM-YYYY').toString()
                                }
                              </Text>
                            ))
                            }

                            {item?.bookingDates?.length == 0 ? 'N/A' : null}




                          </Text>
                        </View>


                        {item?.parkingBookingRecords?.isExpired ? null : (
                          <View style={{ flexDirection: 'row', marginTop: 30 }}>
                            <TouchableOpacity
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                backgroundColor: '#613EEA',
                                borderRadius: 6,
                                paddingHorizontal: 0.04 * SCREEN_WIDTH,
                                paddingVertical: 0.003 * SCREEN_HEIGHT,
                                marginRight: 10,
                                marginBottom: 10,
                              }}
                              onPress={() => {
                                props?.navigation.navigate('Check In QR Scanner', {
                                  bookingId: item?.parkingBookingRecords?.id,
                                  userId: userid,
                                  parkingId: item?.parkingBookingRecordsparking?.id,

                                });
                              }}
                            >
                              <Icon name="checkmark-outline" size={0.05 * SCREEN_WIDTH} color={'white'} style={{ marginRight: 0.02 * SCREEN_WIDTH }} />
                              <Text
                                style={{
                                  backgroundColor: '#613EEA',
                                  borderRadius: 5,
                                  color: 'white',
                                  fontSize: 0.03 * SCREEN_WIDTH,
                                  marginRight: 10,
                                }}
                              >
                                Check In
                              </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                backgroundColor: '#613EEA',
                                borderRadius: 5,
                                paddingHorizontal: 0.04 * SCREEN_WIDTH,
                                paddingVertical: 0.03 * SCREEN_WIDTH,
                                marginRight: 10,
                                marginBottom: 10,

                              }}

                              onPress={() => {
                                props?.navigation.navigate('Check Out QR Scanner', {
                                  bookingId: item?.parkingBookingRecordsid,
                                  userId: userid,
                                  parkingId: item?.parkingBookingRecordsparking?.id,
                                });
                              }}

                            >
                              <Icon name="checkmark-done-outline" size={0.05 * SCREEN_WIDTH} color={'white'} style={{ marginRight: 0.02 * SCREEN_WIDTH }} />
                              <Text
                                style={{
                                  backgroundColor: '#613EEA',
                                  borderRadius: 5,
                                  color: 'white',
                                  fontSize: 0.03 * SCREEN_WIDTH,
                                  marginRight: 10,
                                }}
                              >
                                Check Out
                              </Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{ flexDirection: 'row', marginTop: 10 }}

                              onPress={() => {
                                props?.navigation.navigate('ChatRoom', {
                                  bookingId: item?.parkingBookingRecordsid,
                                  userId: userid,
                                  parki8ngId: item?.parkingBookingRecordsparking?.id,

                                });
                              }}
                            >
                              <Text style={[styles.popularTitlesTitle,
                              {
                                color: colors.themeColor,
                                fontSize: 13,
                                fontWeight: '800'
                              }]}>Chat</Text>

                              <Icon name="md-chatbubble-ellipses-outline" size={0.07 * SCREEN_WIDTH} color={colors.themeColor} style={{ marginRight: 0.02 * SCREEN_WIDTH }} />

                            </TouchableOpacity>

                          </View>
                        )}



                      </View>
                    </View>
                  </TouchableWithoutFeedback>
                ))}

              </>
            )}
          </ScrollView>
        )
      }

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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: 'black',
  },
  searchIcon: {
    marginRight: 10,
  },
  noBookingsText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
    color: 'darkgray',
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
