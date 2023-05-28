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

import Icon from 'react-native-vector-icons/MaterialIcons';
// import Intl from 'react-native-intl';
import FIcon from 'react-native-vector-icons/Feather';
import { colors } from '../../commons/Colors';

import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../../components/units';
import Headerx from '../../components/header';
import axios from 'axios';
import url from '../../commons/axiosUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Calendar, LocaleConfig } from 'react-native-calendars';
import Slider from '@react-native-community/slider';
import { color } from 'react-native-reanimated';

export default BookingParking = props => {

  const [bookingDate, setBookingDate] = useState(new Date());

  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const handleBookingDateChange = (event, selectedDate) => {
    setShowPicker(false);
    setBookingDate(selectedDate || bookingDate);
  };
  const handleDateChange = (event, selectedDate) => {
    setShowPicker(false);
    setDate(selectedDate || date);
  };
  const [fromValue, setFromValue] = useState(0);
  const [toValue, setToValue] = useState(0);
  const [value, setValue] = useState(0);
  const [date1, setDate1] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  const [data, setData] = React.useState([]);
  const [showCheckInTime, setShowCheckInTime] = useState(false);
  const id = props.route.params?.id;

  const days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat'];
  const today = new Date();
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const dates = [];

  for (let i = 0; i < 7; i++) {
    const date = new Date();

    const today = new Date();
    date.setDate(today.getDate() + i);
    const formattedDate = `${days[date.getDay()]}, ${months[date.getMonth()]
      } ${date.getDate()}`;
    dates.push(formattedDate);
  }

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

  const parking_hours = [
    {
      id: 1,
      name: '30 mins',
      selected: selectedHour === '30 mins' ? true : false,
    },
    {
      id: 2,
      name: '1 hour',
      selected: selectedHour === '1 hour' ? true : false,
    },
    {
      id: 3,
      name: '1.5 hours',
      selected: selectedHour === '1.5 hours' ? true : false,
    },
    {
      id: 4,
      name: '2 hours',
      selected: selectedHour === '2 hours' ? true : false,
    },
    {
      id: 5,
      name: '2.5 hours',
      selected: selectedHour === '2.5 hours' ? true : false,
    },
    {
      id: 6,
      name: '3 hours',
      selected: selectedHour === '3 hours' ? true : false,
    },
    {
      id: 7,
      name: '4 hours',
      selected: selectedHour === '4 hours' ? true : false,
    },
  ];

  const parking_days = [
    {
      id: 1,
      name: dates[0],
      selected: false,
    },
    {
      id: 2,
      name: dates[1],
      selected: false,
    },
    {
      id: 3,
      name: dates[2],
      selected: false,
    },
    {
      id: 4,
      name: dates[3],
      selected: false,
    },
  ];

  const Security = [
    {
      id: 1,
      icon: 'camera',
      name: 'Location With Camera ',
      selected: false,
    },
    {
      id: 2,
      icon: 'camera-off',
      name: 'Location Without Camera',
      selected: false,
    },
  ];

  const [time, setTime] = useState('');

  const handleTimeChange = newTime => {
    // Ensure that the input only contains numbers
    const regex = /^[0-9]*$/;
    if (regex.test(newTime)) {
      // Add a colon after the first two digits if it's not already there
      if (newTime.length === 2 && !newTime.includes(':')) {
        newTime += ':';
      }
      setTime(newTime);
    }
  };

  const [selectedSecurity, setSelectedSecurity] = React.useState('');
  const [selectedDay, setSelectedDay] = React.useState('');
  const [selectedHour, setSelectedHour] = React.useState('');
  const [selectedDates, setSelectedDates] = useState({});
  const [lastPressedDate, setLastPressedDate] = useState(null);
  const [lastPressedTime, setLastPressedTime] = useState(0);

  const handleSecuritySelection = name => {
    setSelectedSecurity(name);
  };

  const handleDaySelection = name => {
    setSelectedDay(name);
  };

  const handleHourSelection = name => {
    setSelectedHour(name);
  };

  const HoursRender = ({ name, selected }) => (
    <TouchableOpacity
      style={selectedHour == name ? style.item2 : style.item}
      onPress={() => handleHourSelection(name)}>
      <Text style={selectedHour == name ? style.itemText2 : style.itemText}>
        {name}
      </Text>
    </TouchableOpacity>
  );

  const DaysRender = ({ name, selected }) => (
    <TouchableOpacity
      style={selectedDay == name ? style.item2 : style.item}
      onPress={() => handleDaySelection(name)}>
      <Text style={selectedDay == name ? style.itemText2 : style.itemText}>
        {name}
      </Text>
    </TouchableOpacity>
  );

  const ItemRender = ({ name, selected }) => (
    <TouchableOpacity
      style={selected == name ? style.item2 : style.item}
      onPress={() => handleDaySelection(name)}>
      <Text style={selected == true ? style.itemText2 : style.itemText}>
        {name}
      </Text>
    </TouchableOpacity>
  );

  const SecurityOptions = ({ name, selected, icon }) => (
    <TouchableOpacity
      style={selectedSecurity == name ? style.item2 : style.item}
      onPress={() => handleSecuritySelection(name)}>
      <FIcon
        name={icon}
        size={25}
        color={selectedSecurity == name ? 'white' : 'black'}
      />
    </TouchableOpacity>
  );

  const Separator = () => {
    return (
      <View
        style={{
          height: 50,
          width: 10,

          backgroundColor: 'white',
        }}
      />
    );
  };

  const [selected, setSelected] = useState('');

  const handleBooking = async () => {
    try {
      console.log('booking DAte', bookingDate);
      console.log('booking start time', startTime);
      console.log('booking end time', endTime);
      console.log('booking parking id', data?.id);

      const userId = await AsyncStorage.getItem('userdata');
      // const response = await axios
      //   .post(`${url}parkingbooking/`, {
      //     parkingId: data?.id,
      //     customerId: userId,
      //     bookingDate: bookingDate,
      //     bookingStartTime: startTime,
      //     bookingEndTime: endTime,
      //   })
      //   .then(res => {
      //     console.log(res.data);

      //     alert('Booking Successful');
      //     props?.navigation.navigate('Home');
      //   });
    } catch (error) {
      console.error(error);
    }
  };

  const handleStartTimeChange = text => {
    setStartTime(text);
  };

  const handleEndTimeChange = text => {
    setEndTime(text);
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
              backgroundColor:'#0000ff',
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
              backgroundColor:'#e67300',
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
              color:'#333333',
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
            Parking Days
          </Text>

          <Calendar
            theme={{
              selectedDayBackgroundColor: colors.themeColor,
              monthTextColor: colors.themeColor,
              todayTextColor: colors.themeColor,
              arrowColor: colors.themeColor,
              // calendarContainerStyle: styles.calendarContainer,
              monthTextFontSize: 20,
              dayTextColor: colors.themeColor,
            }}
            onDayPress={day => {
              const selectedDate = day.dateString;
              const currentTime = new Date().getTime();
              if (
                selectedDate === lastPressedDate &&
                currentTime - lastPressedTime < 500
              ) {
                const selectedDatesCopy = { ...selectedDates };
                delete selectedDatesCopy[selectedDate];
                setSelectedDates(selectedDatesCopy);
                setLastPressedDate(null);
                setLastPressedTime(0);
              } else {
                const selectedDatesCopy = { ...selectedDates };
                selectedDatesCopy[selectedDate] = {
                  selected: true,
                  disableTouchEvent: true,
                  selectedDotColor: 'orange',
                };
                setSelectedDates(selectedDatesCopy);
                setLastPressedDate(selectedDate);
                setLastPressedTime(currentTime);
              }
            }}
            markedDates={selectedDates}
          />

      

          <View
            style={{
              marginTop: 10,
              // flexDirection: 'row',
              // justifyContent: 'space-between',
            }}>
            <View style={styles.bodyContainer}>
              <View style={{ marginTop: SCREEN_HEIGHT / 50 }}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: '600',
                    color: colors.themeColor,
                    marginBottom: 15,
                  }}>
                  Duration
                </Text>
              </View>
            </View>

            <View style={{backgroundColor:"#fff",  borderRadius:15,height:SCREEN_HEIGHT/4}}>
              <View style={{ flex: 1, flexDirection: 'row',marginTop:30 }}>
      
              <Slider
style={{width: 370, height: 40,}}
minimumValue={1}
maximumValue={100}
minimumTrackTintColor="black"
maximumTrackTintColor="#000000"
/>


              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'center',marginBottom:20 }}>
                <Text style={{ fontSize: 16, fontWeight: '600',color:'#333333' }}>Your Charges: </Text>
                <Text style={{ fontSize: 16, fontWeight: '600',color:'#333333' }}>{value * data.parkingCharges }</Text>
              </View>
            </View>

            <View style={styles.bodyContainer}>
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
              <View style={{backgroundColor:"#fff",borderRadius:10,}}>
                <TextInput
                  placeholder={'Select Time'}
                  value={date.toLocaleString()}
                  onFocus={() => setShowPicker(true)}
                />
                 
                {showPicker && (
                  <DateTimePicker
                    value={date1}
                    mode="time"
                    display="default"
                    onChange={handleDateChange}
                    style={{ color: '#007AFF' }}
                  />
                )}
              </View>
            </View>
          </View>
        </View>
      </View>

      <View style={{ marginTop: 23, paddingHorizontal: 20 }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: '600',
            color: colors.themeColor,
            marginBottom: 15,
          }}>
          Security
        </Text>
        <ScrollView>
          <FlatList
            data={Security}
            renderItem={({ item }) => (
              <SecurityOptions
                name={item.name}
                selected={item.selected}
                icon={item.icon}
              />
            )}
            keyExtractor={item => item.id}
            ItemSeparatorComponent={Separator}
            horizontal={true}
          />
        </ScrollView>

        <View
          style={{
            marginTop: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor:'#fff'
          }}>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flexDirection: 'row' }}></View>
          </View>
        </View>
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
