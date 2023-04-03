import React, { useEffect, useState } from 'react';
import {
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Text,
  FlatList,
  View, TimePickerAndroid, Button
} from 'react-native';
// import DateTimePicker from '@react-native-community/datetimepicker';

import Icon from 'react-native-vector-icons/MaterialIcons';
// import Intl from 'react-native-intl';
import FIcon from 'react-native-vector-icons/Feather';
import { colors } from '../../commons/Colors';

import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../../components/units';
import Headerx from '../../components/header';
import axios from 'axios';
import url from '../../commons/axiosUrl';

export default BookingParking = props => {

  // const [selectedTime, setSelectedTime] = useState(null);
  // const [showTimePicker, setShowTimePicker] = useState(false);

  // const onTimeChange = (event, selected) => {
  //   if (selected) {
  //     setSelectedTime(`${selected.getHours()}:${selected.getMinutes()}`);
  //   }
  //   setShowTimePicker(Platform.OS === 'ios');
  // };


  const [data, setData] = React.useState([]);
  const id = props.route.params?.id;

  const days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat'];
  const today = new Date();
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const dates = [];

  for (let i = 0; i < 7; i++) {
    const date = new Date();

    const today = new Date();
    date.setDate(today.getDate() + i);
    const formattedDate = `${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}`;
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
  ]

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

  const [selectedSecurity, setSelectedSecurity] = React.useState('');
  const [selectedDay, setSelectedDay] = React.useState('');
  const [selectedHour, setSelectedHour] = React.useState('');


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
    <TouchableOpacity style={selectedHour == name ? style.item2 : style.item}
      onPress={() => handleHourSelection(name)}
    >
      <Text style={selectedHour == name ? style.itemText2 : style.itemText}>
        {name}
      </Text>
    </TouchableOpacity>
  );

  const DaysRender = ({ name, selected }) => (
    <TouchableOpacity
      style={selectedDay == name ? style.item2 : style.item}
      onPress={() => handleDaySelection(name)}
    >
      <Text style={selectedDay == name ? style.itemText2 : style.itemText}>
        {name}
      </Text>
    </TouchableOpacity>
  );


  const ItemRender = ({ name, selected }) => (

    <TouchableOpacity style={selected == name ? style.item2 : style.item}
      onPress={() => handleDaySelection(name)}
    >
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


  const handleBooking = async () => {
    try {
      const userId = await AsyncStorage.getItem('userdata');
      const response = await axios.post('https://example.com/booking', {
        parking: {
          id: data?.id,

        },
        customer: {
          id: userId
        },
        parkFromDate: selectedDay,

      }
      );
      console.log(response.data);
      // handle the response data as needed
    } catch (error) {
      console.error(error);
      // handle errors as needed
    }
  };




  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        backgroundColor: 'white',
        paddingBottom: 70,
      }}>
      <Headerx
        navigation={props?.navigation}
        headerName={'Booking Parking'}></Headerx>
      <ImageBackground
        style={style.headerImage}
        source={require('../../Images/parking.jpeg')}>
        <View style={style.header}>
          <TouchableOpacity
            style={{
              backgroundColor: colors.themeColor,
              width: 50,
              height: 50,
              borderRadius: 12,
              marginRight: 5,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => console.log('object2')}>
            <FIcon
              name="phone-call"
              size={28}
              color={'white'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: colors.themeColor,
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
              backgroundColor: colors.silver,
              height: 50,
              width: 190,
              borderRadius: 12,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => console.log('object')}>
            <Text style={{
              color: colors.black,
              fontSize: 16,
              fontWeight: 'bold',

            }}>Hourly Charges: Rs. {data?.parkingCharges}</Text>
          </TouchableOpacity>

        </View>
      </ImageBackground>
      <View>
        <View
          style={{ marginTop: 20, paddingHorizontal: 10, flexDirection: 'row' }}>

        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ fontWeight: 'bold', fontSize: SCREEN_HEIGHT / 60, marginLeft: 15 }}>
            <Icon name="place" size={20} color={'red'} />
            {data?.parkingLocation}
          </Text> 
          <View style={{ flexDirection: 'row', marginLeft: 15 }}>
            <Icon name="star" size={25} color={'orange'} />
            <Icon name="star" size={25} color={'orange'} />
            <Icon name="star" size={25} color={'orange'} />
            <Icon name="star" size={25} color={'orange'} />
            <Icon name="star" size={25} color={'orange'} />
          </View>
        </View>

        <View style={{ marginTop: 23, paddingHorizontal: 20 }}>
          <Text
            style={{
              fontSize: 25,
              fontWeight: '600',
              color: colors.themeColor,
              marginBottom: 15,
            }}>
            Parking Days
          </Text>
          <ScrollView>
            <FlatList
              data={parking_days}
              renderItem={({ item }) => (
                <DaysRender name={item.name} selected={item.selected} />
              )}
              keyExtractor={item => item.id}
              ItemSeparatorComponent={Separator}
              horizontal={true}
              showsHorizontalScrollIndicator={false}

            />
          </ScrollView>

          <View
            style={{
              marginTop: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ flexDirection: 'row' }}>
                {/* <Icon name="star" size={20} color={'orange'} />
                <Icon name="star" size={20} color={COLORS.orange} />
                <Icon name="star" size={20} color={COLORS.orange} />
                <Icon name="star" size={20} color={COLORS.orange} />
                <Icon name="star" size={20} color={COLORS.grey} /> */}
              </View>
            </View>
          </View>
        </View>

        {/* <View style={{ marginTop: 23, paddingHorizontal: 20 }}>
          <Text
            style={{
              fontSize: 25,
              fontWeight: '600',
              color: colors.themeColor,
              marginBottom: 15,
            }}>
            Parking Hours
          </Text>
          <ScrollView>
            <FlatList
              data={parking_hours}
              renderItem={({ item }) => (
                <HoursRender name={item.name} selected={item.selected} />
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
            }}>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ flexDirection: 'row' }}>

              </View>
            </View>
          </View>
        </View> */}
        {/* <View
          style={{
            marginTop: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingLeft: 20,
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 23,
              fontWeight: '600',
              color: colors.themeColor,
              marginTop: 20,
            }}>
            Payment Accepted
          </Text>

          <View style={style.priceTag}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: 'white',
              }}>
              $200
            </Text>
          </View>
        </View> */}



        {/* <View style={{ marginTop: 20, paddingHorizontal: 20 }}>
          <ScrollView>
            <FlatList
              data={parking_hours}
              renderItem={({ item }) => (
                <ItemRender name={item.name} selected={item.selected} />
              )}
              keyExtractor={item => item.id}
              ItemSeparatorComponent={Separator}
              horizontal={true}
            />
          </ScrollView>
        </View> */}
      </View>
      <View style={{ marginTop: 23, paddingHorizontal: 20 }}>
        <Text
          style={{
            fontSize: 25,
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
          }}>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flexDirection: 'row' }}>
              {/* <Icon name="star" size={20} color={'orange'} />
                <Icon name="star" size={20} color={COLORS.orange} />
                <Icon name="star" size={20} color={COLORS.orange} />
                <Icon name="star" size={20} color={COLORS.orange} />
                <Icon name="star" size={20} color={COLORS.grey} /> */}
            </View>
          </View>
        </View>
        <View style={style.btn}>
          <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>
            Book Now
          </Text>
        </View>
      </View>
    </ScrollView>
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
    // borderBottomRightRadius: 40,
    // borderBottomLeftRadius: 40,
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

  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 12,
  },

  item: {
    padding: 8,

    width: 120,
    height: 80,

    borderColor: '#c0c0c0',
    borderRadius: 5,

    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item2: {
    padding: 8,

    width: 120,
    height: 80,
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
