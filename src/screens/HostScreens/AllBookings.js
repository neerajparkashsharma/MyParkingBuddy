import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Divider } from "@react-native-material/core";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import url from '../../commons/axiosUrl';
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../../components/units.js';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import { colors } from '../../commons/Colors';
import Headerx from '../../components/header.js';

const AllBookings = props => {
  const [listOfBookings, setListOfBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userid, setUserid] = useState('');

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('userdata');

      if (value !== null) {
        setUserid(value);
        axios.get(url + 'parking/host/' + value)
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
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Headerx navigation={props.navigation} headerName={'All Parkings'} />
      <ScrollView>
        {listOfBookings.map(item => (
          <View style={styles.container} key={item.createDate}>
            <Text style={{ color: 'black', fontSize: 22, top: 10, fontWeight: '500', alignSelf: 'center' }}>Neeraj Parkash</Text>
            <Divider style={{ marginTop: 20 }} color="#BEBEBE" />
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 5 }}>
              <Text style={{ fontSize: 19, fontWeight: '700', color: colors.themeColor }}>Unique ID:</Text>
              <Text style={{ fontSize: 19, fontWeight: '700', color: colors.themeColor }}> CD-122-553</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
              <Text style={{ fontSize: 15, fontWeight: '500', marginLeft: 20, color: '#585858' }}>Check-In Time:</Text>
              <Text style={{ fontSize: 15, fontWeight: '500', marginRight: 20, color: '#585858' }}> 12:00:am</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontSize: 15, fontWeight: '500', marginLeft: 20, color: '#585858' }}>Check-Out Time:</Text>
              <Text style={{ fontSize: 15, fontWeight: '500', marginRight: 20, color: '#585858' }}> 12:00 pm</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontSize: 15, fontWeight: '500', marginLeft: 20, color: '#585858' }}>Specifications:</Text>
              <Text style={{ fontSize: 15, fontWeight: '500', marginRight: 48, color: '#585858' }}>None</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontSize: 15, fontWeight: '500', marginLeft: 20, color: '#585858' }}>Charges:</Text>
              <Text style={{ fontSize: 15, fontWeight: '500', marginRight: 58, color: '#585858' }}>500</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontSize: 15, fontWeight: '500', marginLeft: 20, color: '#585858' }}>Available:</Text>
              <Text style={{ fontSize: 15, fontWeight: '500', marginRight: 57, color: '#585858' }}>Yes</Text>
            </View>
            <Divider style={{ marginTop: 10 }} color="#BEBEBE" leadingInset={10} trailingInset={10} />
            <View style={{ justifyContent: 'center', flexDirection: 'row', marginTop: 10 }}>
              <Entypo style={{ marginLeft: 25 }} name="location-pin" color={'red'} size={25} />
              <Text style={{ fontSize: 15, flexWrap: 'wrap', alignSelf: 'center', marginRight: 30, marginLeft: 5, color: colors.themeColor }}>{item?.parkingLocation}</Text>
            </View>
            <View style={{ backgroundColor: colors.themeColor, width: 72, height: 72, alignSelf: 'center', borderRadius: 35, top: SCREEN_HEIGHT / 13, elevation: 35 }}>
              <MaterialCommunityIcons style={{ left: 15, top: 15 }} name='qrcode' color={'white'} size={40} />
            </View>
          </View>
        ))}
      </ScrollView>
    </>
  );
};

export default AllBookings;

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH / 1.05,
    alignSelf: 'center',
    height: SCREEN_HEIGHT / 1.90,
    backgroundColor: 'white',
    marginTop: 20,
    elevation: 5,
    marginBottom: 40,
    borderRadius: 10,
  },
});
