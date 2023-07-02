
import * as React from 'react';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  BackHandler
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../../commons/Colors';
import uuid from 'react-native-uuid';
import axios from 'axios';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../components/units';
import url from '../../commons/axiosUrl';
import { useIsFocused } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';

Feather.loadFont();
MaterialCommunityIcons.loadFont();



export default Home = props => {
  const [listOfBookings, setListOfBookings] = useState([]);
  const [userData, setUserData] = useState(null);
  const isFocused = useIsFocused();

  useEffect(() => {
    const backAction = () => {
      BackHandler.exitApp(); // Exit the app when back button is pressed
      return true; // Return true to prevent default back button behavior
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove(); // Clean up the event listener on unmount
  }, []);



  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('userdata');
      if (value !== null) {
        setUserData(value);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const fetchBookings = async () => {
    if (userData) {
      try {
        const response = await axios.get(
          `${url}parkingBookingRecords/customer/${userData}`
        );
        console.log('response');
        console.log(response.data);

        setListOfBookings(response.data);
      } catch (error) {
        console.log(error);
      }
    }
  };




  useEffect(() => {
    fetchBookings();
  }, [userData]);


  useEffect(() => {
    getData();
  }, []);


  const NavItems = [
    {
      id: 123,
      name: 'Find Parking',
      image: require('../../Images/icons8-parking-100.png'),
      screen: 'MyMap',
    },
    {
      id: 234,
      name: 'Your Wallet',
      image: require('../../Images/wallete.png'),
      screen: 'E-Wallet',
    },
    {
      id: 345,
      name: 'Your Bookings',
      image: require('../../Images/parkingbooking.png'),
      screen: 'AllBookings',
    },
  ];


  const renderCategoryItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {

          props?.navigation?.navigate(item.screen)

        }}
        style={[
          styles.categoryItemWrapper,
          {
            backgroundColor: item.selected ? colors.themeColor : colors.white,
            marginLeft: item.id == 1 ? 20 : 0,
          },
        ]}>
        <Image source={item.image} style={styles.categoryItemImage} />
        <Text style={styles.categoryItemTitle}>{item.name} </Text>
        <View
          style={[
            styles.categorySelectWrapper,
            {
              backgroundColor: item.selected ? colors.white : colors.themeColor,
            },
          ]}>
          <Feather
            name="chevron-right"
            size={13}
            style={styles.categorySelectIcon}
            color={item.selected ? colors.black : colors.white}
          />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}>
        <SafeAreaView>
          <View style={styles.headerWrapper}>
            <TouchableOpacity onPress={() => props?.navigation?.openDrawer()}>
              <Feather name="menu" size={24} color={colors.themeColor} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => props?.navigation?.navigate('Profile')}>
              <Image
                source={require('../../Images/user.png')}
                style={styles.profileImage}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </SafeAreaView>

        <View style={styles.titlesWrapper}>
          <Text style={styles.titlesSubtitle}>Find your Parking Space!</Text>

        </View>

        <View style={styles.categoriesWrapper}>
          <View style={styles.categoriesListWrapper}>
            <FlatList
              data={NavItems}
              showsHorizontalScrollIndicator={false}
              renderItem={renderCategoryItem}
              keyExtractor={item => item.id}
              horizontal={true}
            />
          </View>
        </View>
        <View style={[styles.popularWrapper]}>
          <View style={styles.headerWrapper}>
            <Text style={styles.titlesTitle}>Recent Bookings</Text>
            <TouchableOpacity onPress={() => props?.navigation?.navigate('AllBookings')}>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>

          {listOfBookings.length === 0 ? (
            <Text style={{ textAlign: 'center', marginTop: 20, fontSize: 18, color: colors.textDark }}>
              No bookings found
            </Text>
          ) : (
            <>
              {listOfBookings
                .filter((item, index) => index <= 4)
                .map((item, index) => {
                  const key = `${uuid.v4().toString()}${index.toString()}`;  

                  console.log(key);
                  return (
                    <TouchableWithoutFeedback key={key}>
                      <View
                        style={[
                          styles.popularCardWrapper,
                          {
                            marginTop: item?.parkingBookingRecords?.id == 1 ? 10 : 20,
                          },
                        ]}>
                        <View>
                          <View style={styles.tagWrapper}>
                            <View style={styles.tagText}>
                              <Text style={styles.tagText}>Total Charges: Rs. {item?.parkingBookingRecords?.totalParkingCharges == null ? "N/A" : item?.parkingBookingRecords?.totalParkingCharges}</Text>
                            </View>
                            <View style={styles.popularTitlesWrapper}>
                              <Text style={styles.popularTitlesTitle}>
                                {item?.parkingBookingRecords?.parking?.parkingLocation ? item?.parkingBookingRecords?.parking?.parkingLocation.toString().substring(0, 50) : "N/A"}
                              </Text>
                              <Text style={styles.popularTitlesWeight}>
                                <View style={styles.ratingWrapper}>

                                  <View>
                                    <View style={{ flexDirection: 'row', marginTop: 13 }}>
                                      {item?.bookingDates?.length > 1 &&
                                        item?.bookingDates?.map((i, index) => (
                                          <Text key={uuid.v4()}>
                                            {moment(i?.bookingDate).format('DD-MM-YYYY').toString()}
                                            {index !== item?.bookingDates?.length - 1 && ', '}
                                          </Text>
                                        ))}

                                      {item?.bookingDates?.length == 1 &&
                                        item?.bookingDates?.map((i, index) => (
                                          <Text key={uuid.v4()}>
                                            {moment(i?.bookingDate).format('DD-MM-YYYY').toString()}
                                          </Text>
                                        ))}
                                    </View>


                                  </View>
                                </View>
                              </Text>
                            </View>
                          </View>
                          <View style={styles.popularCardBottom}>
                            <View style={styles.addPizzaButton}>
                              <Text
                                style={[
                                  styles.popularTitlesTitle,
                                  { fontWeight: 'bold', color: colors.white },
                                ]}>
                                PKR{item?.parkingBookingRecords?.parking?.parkingCharges}/Day
                              </Text>
                            </View>

                            {
                              item.isExpired ?
                                <View style={styles.ratingWrapper}>
                                  <Text style={{ color: 'red' }}>Expired</Text>
                                </View>
                                :

                                null
                            }
                          </View>
                        </View>

                        <View style={styles.popularCardRight}>
                          <Image source={item.image} style={styles.popularCardImage} />
                        </View>
                      </View>
                    </TouchableWithoutFeedback>
                  );
                })}
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    alignItems: 'center',
  },
  profileImage: {
    width: SCREEN_WIDTH / 10,
    height: SCREEN_HEIGHT / 15,

    borderRadius: 35,
  }, tagWrapper: {
    // flexDirection: 'row',
    // alignItems: 'center',
    alignItems: 'flex-start',

    marginBottom: 5,
  },
  tagText: {
    backgroundColor: colors.themeColor,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: 'white',
    marginRight: 10,
  },
  dateText: {
    color: colors.themeColor,
  },
  timeText: {
    color: colors.themeColor,
  },
  titlesWrapper: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  titlesSubtitle: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 34,
    color: colors.themeColor,
    fontWeight: 'bold',
  },
  titlesTitle: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 23,
    color: colors.themeColor,
    marginTop: 5,
    fontWeight: '700',
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 30,
  },
  search: {
    flex: 1,
    marginLeft: 10,
    borderBottomColor: colors.textLight,
    borderBottomWidth: 2,
  },
  searchText: {
    fontFamily: 'Montserrat-Semibold',
    fontSize: 14,
    marginBottom: 5,
    color: colors.textLight,
  },
  categoriesWrapper: {
    marginTop: 30,
  },
  categoriesTitle: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 16,
    paddingHorizontal: 20,
  },
  categoriesListWrapper: {
    paddingTop: 15,
    paddingBottom: 20,
  },
  categoryItemWrapper: {
    backgroundColor: '#F5CA48',
    marginRight: 20,
    borderRadius: 20,

    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 1,

  },
  categoryItemImage: {
    width: 90,
    height: 90,
    marginTop: 25,
    alignSelf: 'center',
    marginHorizontal: 20,
  },
  categoryItemTitle: {
    textAlign: 'center',
    fontFamily: 'Montserrat-Medium',
    fontSize: 14,
    marginTop: 10,
  },
  categorySelectWrapper: {
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 20,
    width: 26,
    height: 26,
    borderRadius: 26,
    marginBottom: 20,
  },
  categorySelectIcon: {
    alignSelf: 'center',
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
    paddingHorizontal: 40,
    paddingVertical: 20,
    // borderTopRightRadius: 25,
    // borderBottomLeftRadius: 25,
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
});
