import React, { useEffect, useState } from 'react';
import {
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Text,
  FlatList,
  View,
  TouchableWithoutFeedback,
  TimePickerAndroid,
  Button,
  TextInput,
  Linking,
} from 'react-native';
import { debounce, set } from 'lodash';
import moment from 'moment';
import Icon from 'react-native-vector-icons/MaterialIcons';
// import Intl from 'react-native-intl';
import FIcon from 'react-native-vector-icons/Feather';
import { colors } from '../../commons/Colors';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../../components/units';
import Headerx from '../../components/header';
import axios from 'axios';
import url from '../../commons/axiosUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Calendar, LocaleConfig } from 'react-native-calendars';
import { useIsFocused } from '@react-navigation/native';

export default ParkingBooking = props => {
  const isFocused = useIsFocused();

 
  const [data, setData] = React.useState([]);
  const id = props.route.params?.id;
  const [booked, setBooked] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${url}parking_dates_occupied/${id}`);
        const { data } = response;
        
        const bookedDates = data.map((item) => moment(item.date).format('YYYY-MM-DD'));

        setBooked(bookedDates);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();

    const interval = setInterval(fetchData, 60000); // Fetch data every 1 minute

    return () => {
      clearInterval(interval); // Clean up the interval on component unmount
    };
  }, [id]);








  useEffect(() => {
    axios
      .get(`${url}parking/${id}`)
      .then(res => {
        console.log(res.data);
        setData(res?.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [isFocused]);


 
  const [selectedDates, setSelectedDates] = useState([]); 

  const handleBooking = async () => {
    try {

 

      const userId = await AsyncStorage.getItem('userdata'); 
      console.log("inside handle booking")

      const payload = {
        parkingId: data?.id,
        customerId: userId,
        bookingDates: selectedDates,
      }
      console.log(payload, 'payload')


      const response = await axios.post(`${url}book-parking`, payload);

      if(response.data === 'Parking Booked Successfully'){
        alert('Parking Booked Successfully');
        props?.navigation.navigate('Home');
      }
      else{
        alert('Parking Already Booked');
        props?.navigation.navigate('Home');
      }


      setBooked(null);
      setSelectedDates([]);
      setData(null);
      

      // axios.post(`${url}book-parking`, payload).then(
      //   res => {
      //     console.log(res.data);
      //     if (res.data === 'Parking Booked Successfully')
      //       alert('Parking Booked Successfully');
      //     props?.navigation.navigate('Home');
      //   }


      // ).catch(err => {
      //   setError(err.response.data);


      // }
      // )

    } catch (error) {
      console.error(error);
    }

  

  };





  // const handleDayPress = (day) => {
  //   const selectedDate = day.dateString;

  //   // Check if both from and to dates are already selected
  //   if (fromDate && toDate) {
  //     // Clear the selections if a new date is pressed
  //     setFromDate(null);
  //     setToDate(null);
  //     setSelectedDates({});
  //   } else if (!fromDate) {
  //     // Select the first date (from date)
  //     setFromDate(selectedDate);
  //     const selectedDatesCopy = { [selectedDate]: { selected: true, selectedDotColor: 'orange' } };
  //     setSelectedDates(selectedDatesCopy);
  //   } else {
  //     // Select the second date (to date)
  //     setToDate(selectedDate);
  //     const selectedDatesCopy = { ...selectedDates };
  //     selectedDatesCopy[selectedDate] = { selected: true, selectedDotColor: 'orange' };
  //     setSelectedDates(selectedDatesCopy);

  //     // Validate the date range (optional)
  //     if (new Date(selectedDate) < new Date(fromDate)) {
  //       console.log('Invalid date range. "To" date should be after "From" date.');
  //       // You can show an error message or perform any other action here
  //       // You can also clear the selections and allow the user to select new dates
  //       setFromDate(null);
  //       setToDate(null);
  //       setSelectedDates({});
  //     } else {
  //       // Valid date range, perform any necessary actions here
  //       // You can calculate the duration, update the UI, etc.
  //       console.log('Selected date range:', fromDate, 'to', selectedDate);
  //     }
  //   }
  // };

  const currentDate = moment().format('YYYY-MM-DD');

  const handleDateSelect = (date) => {
    const updatedDates = [...selectedDates];
    if (selectedDates.includes(date)) {
      // Date already selected, remove it
      const index = updatedDates.indexOf(date);
      updatedDates.splice(index, 1);
    } else {
      // Date not selected, add it
      updatedDates.push(date);
    }
    setSelectedDates(updatedDates);
  };

  const getMarkedDates = (dates) => {

    const markedDates = {};


    booked?.forEach((date) => {

   

      markedDates[date] = { disabled: true, disableTouchEvent: true, dotColor: 'red', selectedDotColor: 'red', selected: false, 
      selectedColor: 'red'
    };
    });
    
    dates?.forEach((date) => {
      markedDates[date] = { selected: true, selectedColor:  colors.themeColor };
    });

   

    return markedDates;
  };


 

  return (

    <>
      <Headerx
        navigation={props?.navigation}
        headerName={'Booking Parking'}></Headerx>
      <ScrollView>

        <ImageBackground
          style={style.headerImage}
          source={require('../../Images/bg.jpg')}>
          <View style={style.header}>
            <TouchableOpacity
              style={{
                backgroundColor: '#0000ff',
                width: 50,
                height: 50,
                borderRadius: 12,
                marginRight: 5,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() =>


                Linking.openURL(`tel:${data?.contactNumber}`)

              }>
              <FIcon name="phone-call" size={28} color={'white'} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: '#cc0000',
                width: 50,
                height: 50,
                borderRadius: 12,
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 5,
              }}
              onPress={() =>


                //google maps

                Linking.openURL(`https://www.google.com/maps/dir/?api=1&destination=${data?.latitude},${data?.longitude}`)

              }>
              <Icon name="place" size={28} color={'white'} />
            </TouchableOpacity>

            <View
              style={{
                backgroundColor: colors.themeColor,
                height: 50,
                width: SCREEN_WIDTH/2,
                borderRadius: 12,
                justifyContent: 'center',
                alignItems: 'center',
              }}
>
                <Text
                style={{
                  color: "#fff",
                  fontSize: 16,
                  fontWeight: 'bold',
                }}>

                Per Day Charges: Rs. {data?.parkingCharges*24}
              </Text>
            </View>
          </View>
        </ImageBackground>

        <View>
          <View
            style={{
              marginTop: 20,
              paddingHorizontal: 10,
              flexDirection: 'row',
            }}></View>
          <View style={{ flexDirection: 'row' }}>
            <Text
              style={{
                fontWeight: '700',
                fontSize: SCREEN_HEIGHT / 45,
                marginLeft: 15,
                color: '#333333',
              }}>
              <Icon name="place" size={25} color={'#cc0000'} />
              {data?.parkingLocation}
            </Text>

          </View>

          <View style={{ marginTop: 23, paddingHorizontal: 20 }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: '600',
                color: colors.themeColor,
                marginBottom: 15,
              }}>
              Select Dates
            </Text>

            <View

              style={{
                borderRadius: 12,

              }}
            >
              <Calendar
                theme={{
                  selectedDayBackgroundColor: colors.themeColor,
                  monthTextColor: colors.themeColor,
                  todayTextColor: colors.themeColor,
                  arrowColor: colors.themeColor,
                  monthTextFontSize: 20,
                  dayTextColor: colors.themeColor,
                  disabledArrowColor: colors.themeColor,
                  textDayFontWeight: 'bold',
                  textMonthFontWeight: 'bold',
                  textDayHeaderFontWeight: 'bold',
                  textDayFontSize: 16,
                  textMonthFontSize: 16,
                  textDayHeaderFontSize: 16,

                }}
                disableAllTouchEventsForDisabledDays={true}
                minDate={currentDate}
                markedDates={getMarkedDates(selectedDates)}
                onDayPress={(day) => handleDateSelect(day.dateString)}
                hideExtraDays={true}
                showWeekNumbers={true}
                hideDayNames={false}
              />
            </View>

          </View>
        </View>




       

        <View style={{ marginTop: 23, paddingHorizontal: 20 }}>
          <TouchableOpacity style={style.btn} onPress={handleBooking}>
            <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>
              Book Now
            </Text>
          </TouchableOpacity>
        </View>



      </ScrollView>
    </>
  );
};

const style = StyleSheet.create({
  btn: {
    height: 55,
    width: SCREEN_WIDTH / 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    left: SCREEN_WIDTH / 6.5,
    marginBottom: 70,
    backgroundColor: colors.themeColor,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    fontSize: 20,
    flex: 1,
    marginRight: 10,
  },
  container1: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  calendarContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    width: 300, height: 200,

    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  priceTag: {
    height: 40,
    alignItems: 'center',
    marginLeft: SCREEN_WIDTH / 5,
    paddingLeft: 20,
    flex: 1,
    backgroundColor: colors.themeColor,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    flexDirection: 'row',
  },
  iconContainer: {
    position: 'absolute',
    height: 60,
    backgroundColor: 'grey',
    top: -30,
    right: 20,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerImage: {
    height: 250,
    top: 15,
    overflow: 'hidden',
  },
  header: {
    marginTop: 190,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 30,
    justifyContent: 'flex-start',
  },
  MainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },

  fieldTitle: {
    fontSize: 14,
    color: colors.gray,
  },

  bodyContainer: {
    marginHorizontal: SCREEN_WIDTH / 21,
    marginTop: SCREEN_HEIGHT / 25,
  },

  fieldContainer: {
    borderWidth: 1,
    borderColor: colors.themeColor,
    borderRadius: 10,
    paddingVertical: SCREEN_HEIGHT / 48,
    paddingLeft: SCREEN_WIDTH / 23,
    marginTop: SCREEN_HEIGHT / 67,
  },

  userName: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.gray,
  },

  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 12,
  },

  item: {
    padding: 8,

    width: 100,
    height: 50,

    borderColor: '#c0c0c0',
    borderRadius: 5,

    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item2: {
    padding: 8,

    width: 100,
    height: 50,
    backgroundColor: colors.themeColor,

    borderColor: '#c0c0c0',
    borderRadius: 5,

    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  itemText: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
  },

  itemText2: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
});
