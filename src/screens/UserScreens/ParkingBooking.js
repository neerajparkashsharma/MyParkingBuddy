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
  TimePickerAndroid,
  Button,
  TextInput,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { debounce } from 'lodash';
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
import Slider from '@react-native-community/slider';
import { color } from 'react-native-reanimated';

export default BookingParking = props => {
  // Adjust the debounce delay as needed (e.g., 500 milliseconds)

  const [bookingDate, setBookingDate] = useState(new Date());

  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const handleCheckInChange = (event, selectedDate) => {
    setShowPicker(false);
    setCheckInTime(selectedDate);
  };


  const handleCheckoutChange = (event, selectedDate) => {
    setShowPicker(false);
    setCheckOutTime(selectedDate);
  };
  const [value, setValue] = useState(0);
  const [date1, setDate1] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const [checkInTime, setCheckInTime] = useState(new Date());
  const [checkOutTime, setCheckOutTime] = useState(new Date());

  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);


  const [data, setData] = React.useState([]);
  const [showCheckInTime, setShowCheckInTime] = useState(false);
  const [showCheckOutTime, setShowCheckOutTime] = useState(false);

  const id = props.route.params?.id;





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
  }, []);






  const [selectedHour, setSelectedHour] = React.useState('');
  const [selectedDates, setSelectedDates] = useState({});
  const [lastPressedDate, setLastPressedDate] = useState(null);
  const [lastPressedTime, setLastPressedTime] = useState(0);
  const [totalHours, setTotalHours] = useState(0);


  const handleBooking = async () => {
    try {

      calculateTotalHours();
      const filteredDates = Object.entries(selectedDates)
      .filter(([_, value]) => value.selected)
      .map(([date]) => date);

      console.log('booking DAte', filteredDates);
      const formattedStartTime = moment(fromDate + ' ' + checkInTime.toTimeString().split(' ')[0], 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss');
      const formattedToTime = moment(toDate + ' ' + checkOutTime.toTimeString().split(' ')[0], 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss');

     


      const userId = await AsyncStorage.getItem('userdata');
    


      const payload = {
        parkingId:data?.id,
        customerId:userId,
        bookingFromDateTime : formattedStartTime,
        bookingToDateTime : formattedToTime
      }
      const response = axios.post(`${url}book-parking`,payload).then(
        res => {
          console.log(res.data);
          alert('Booking Successful');
          props?.navigation.navigate('Home');
        }
      ).catch(err => {
        console.log(err);
      }
      )

    } catch (error) {
      console.error(error);
    }
  };


  const formatTime = (time) => {
    const options = { hour: 'numeric', minute: '2-digit', hour12: true };
    return time.toLocaleTimeString('en-US', options);
  };



  const LocalformatTime = (time) => {
    const options = { hour: 'numeric', minute: '2-digit', hour12: false };
    return time.toLocaleTimeString([], options);
  };

  const calculateTotalHours = () => {
    console.log('from-date', fromDate, 'to-date', toDate);
  
    // Validate if both from and to dates are selected
    if (!fromDate || !toDate) {
      console.log('Please select both from and to dates.');
      return;
    }
  
    const [fromYear, fromMonth, fromDay] = fromDate.split('-');
    const [toYear, toMonth, toDay] = toDate.split('-');
  
    const checkInDate = new Date(fromYear, fromMonth - 1, fromDay, checkInTime.getHours(), checkInTime.getMinutes(), checkInTime.getSeconds());
    const checkOutDate = new Date(toYear, toMonth - 1, toDay, checkOutTime.getHours(), checkOutTime.getMinutes(), checkOutTime.getSeconds());
  
    const timeDifferenceMs = checkOutDate - checkInDate;
    const hours = timeDifferenceMs / (1000 * 60 * 60);
  
    console.log('Total hours:', hours);
  
    return hours;
  };
  
  const debouncedCalculateTotalHours = debounce(calculateTotalHours, 500);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);


  const handleDayPress = (day) => {
    const selectedDate = day.dateString;

    // Check if both from and to dates are already selected
    if (fromDate && toDate) {
      // Clear the selections if a new date is pressed
      setFromDate(null);
      setToDate(null);
      setSelectedDates({});
    } else if (!fromDate) {
      // Select the first date (from date)
      setFromDate(selectedDate);
      const selectedDatesCopy = { [selectedDate]: { selected: true, selectedDotColor: 'orange' } };
      setSelectedDates(selectedDatesCopy);
    } else {
      // Select the second date (to date)
      setToDate(selectedDate);
      const selectedDatesCopy = { ...selectedDates };
      selectedDatesCopy[selectedDate] = { selected: true, selectedDotColor: 'orange' };
      setSelectedDates(selectedDatesCopy);

      // Validate the date range (optional)
      if (new Date(selectedDate) < new Date(fromDate)) {
        console.log('Invalid date range. "To" date should be after "From" date.');
        // You can show an error message or perform any other action here
        // You can also clear the selections and allow the user to select new dates
        setFromDate(null);
        setToDate(null);
        setSelectedDates({});
      } else {
        // Valid date range, perform any necessary actions here
        // You can calculate the duration, update the UI, etc.
        console.log('Selected date range:', fromDate, 'to', selectedDate);
      }
    }
  };

  const currentDate = moment().format('YYYY-MM-DD');




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
              onPress={() => console.log('object2')}>
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
              onPress={() => console.log('object')}>
              <Icon name="place" size={28} color={'white'} />
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                backgroundColor: '#e67300',
                height: 50,
                width: 190,
                borderRadius: 12,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => console.log('object')}>
              <Text
                style={{
                  color: "#fff",
                  fontSize: 16,
                  fontWeight: 'bold',
                }}>

              Hourly Charges: Rs. {data?.parkingCharges}
              </Text>
            </TouchableOpacity>
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
              Select From Date & To Date 
            </Text>

            <Calendar
              theme={{
                selectedDayBackgroundColor: colors.themeColor,
                monthTextColor: colors.themeColor,
                todayTextColor: colors.themeColor,
                arrowColor: colors.themeColor,
                monthTextFontSize: 20,
                dayTextColor: colors.themeColor,
              }}
              onDayPress={handleDayPress}
              minDate={currentDate} 
              markedDates={selectedDates}
            />



           

              
              <View style={{ marginTop: SCREEN_HEIGHT / 50 }}>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: '600',
                      color: colors.themeColor,
                      marginBottom: 15,
                    }}>
                    Check-In-Time
                  </Text>
                </View>

                <View style={{ backgroundColor: "#fff", borderRadius: 10, flexDirection: 'row', alignItems: 'center' }}>
                  <MIcon name="sort-clock-descending-outline" color={colors.themeColor} size={30} style={{ marginLeft: 10, marginRight: 5 }} />
                  <TextInput
                    placeholder={'Select Time'}
                    value={formatTime(checkInTime)}
                    onFocus={() =>{ 
                      setShowCheckInTime(true);
                      debouncedCalculateTotalHours();
                    
                    }}
                    style={{ flex: 1,color:colors.themeColor }}
                  />
                </View>


                <View style={{ marginTop: SCREEN_HEIGHT / 50 }}>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: '600',
                      color: colors.themeColor,
                      marginBottom: 15,
                    }}>
                    Check-Out-Time
                  </Text>
                </View>
                <View style={{ backgroundColor: "#fff", borderRadius: 10, flexDirection: 'row', alignItems: 'center' }}>
                  <MIcon name="sort-clock-ascending-outline" color={colors.themeColor} size={30} style={{ marginLeft: 10, marginRight: 5 }} />
                  <TextInput
                    placeholder={'Select Time'}
                    value={formatTime(checkOutTime)}
                    onFocus={() => {
                      setShowCheckOutTime(true)
                      debouncedCalculateTotalHours();

                    }}
                    style={{ flex: 1,color:colors.themeColor }}
                  />
                </View>

             

                {showCheckOutTime && (
                  <DateTimePicker
                    value={checkOutTime}
                    mode="time"
                    display="default"
                    onChange={(event, selectedTime) => {
                      setShowCheckOutTime(false);
                      setCheckOutTime(selectedTime || checkOutTime);
                    }}
                    style={{ color: colors.themeColor }}
                  />
                )}

                {showCheckInTime && (
                  <DateTimePicker
                    value={checkInTime}
                    mode="time"
                    display="default"
                    onChange={(event, selectedTime) => {
                      setShowCheckInTime(false);
                      setCheckInTime(selectedTime || checkInTime);
                    }}
                    style={{ color: colors.themeColor }}
                  />
                )}
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
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
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
