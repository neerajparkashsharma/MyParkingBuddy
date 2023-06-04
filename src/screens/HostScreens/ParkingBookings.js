import {
    View,
    Text,
    FlatListm,
    StyleSheet,
    FlatList,
    ActivityIndicator,
    Image,TouchableOpacity,TouchableWithoutFeedback,
    ScrollView
  } from 'react-native';
import React, { useEffect, useState } from 'react'
import Headerx from '../../components/header';
import axios from 'axios';
import url from '../../commons/axiosUrl';
import { colors } from '../../commons/Colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../components/units';
// import { TouchableOpacity } from 'react-native-gesture-handler';
const ParkingBookings = (props) => {

    const { parkingId } = props.route.params;

    const [parkingBookings, setParkingBookings] = useState([]);

    useEffect(() => {

        axios.get(`${url}parking/bookings/${parkingId}`).then(res => {
            console.log(res.data);
            setParkingBookings(res.data);
        }
        ).catch(err => {
            console.log(err);
        }
        )

    }, [props])


    return (
        <>
        <View style={styles.topContainer}>
    
            <TouchableOpacity
                onPress={() => {props?.navigation.goBack() }}>
                <Icon name="chevron-left" size={SCREEN_WIDTH / 15} color={colors.themeColor} />
            </TouchableOpacity>
            <Text style={styles.topTitle}>Parking Booking Details</Text>
             
        </View>
        
        <ScrollView style={styles.popularWrapper}>
        {parkingBookings.map(item => (
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
                  {/* <Ic   on name="location" size={20} color="red" style={{ marginRight: 5 }} /> */}
                  <Text style={styles.popularTitlesTitle}>{item.parking?.parkingLocation}</Text>
                </View>
               

              
              </View>
            </View>


          </TouchableWithoutFeedback>

        ))}
      </ScrollView>

        </>
    )
}

export default ParkingBookings

const styles = StyleSheet.create({
    topContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginTop: SCREEN_HEIGHT / 34,
    

    },
    topTitle: {
        color: colors.themeColor,
        fontSize: SCREEN_WIDTH / 23,
        fontWeight: '500',
        textAlign: 'center',
    },

})