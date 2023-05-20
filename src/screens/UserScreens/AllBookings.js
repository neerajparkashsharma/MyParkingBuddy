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
import React, {useState, useEffect} from 'react';
import {black} from 'react-native-paper/lib/typescript/styles/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import url from '../../commons/axiosUrl.js';
import {colors} from '../../commons/Colors';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Button} from 'react-native-paper';
import { TouchableOpacity, TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {getData} from '../../commons/Data.js';
import {useNavigation} from '@react-navigation/native';
import {SCREEN_WIDTH} from '../../components/units.js';
import Headerx from '../../components/header.js';

const AllBookings = props => {
  const navigation = useNavigation();
  const Item = ({Id, location, descriptionm, charges}) => {
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

  // const { id } = route.params;
  [listOfBookings, setListOfBookings] = useState([]);
  // const iddd = JSON.stringify(id);
  const [isLoading, setLoading] = useState(true);
  const [userid, setUserid] = useState();
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('userdata');

      if (value !== null) {
        setUserid(value);
        console.log('> } > >  > ' + value);

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
        style={{alignSelf: 'center', flex: 1}}
      />
    );
  }
  return (
    <View style={styles.container}>
      <Headerx
        navigation={props?.navigation}
        headerName={'Parking Bookings'}></Headerx>
      <View style={{marginBottom: 30}}></View>
     

      <ScrollView style={styles.popularWrapper}>
        {listOfBookings.map(item => (
          <TouchableWithoutFeedback key={item.id}>
            <View
              style={[
                styles.popularCardWrapper,
                {
                  marginTop: item.id == 1 ? 10 : 20,
                },
              ]}>
              <View>
                <View>
                
                  <View style={styles.popularTitlesWrapper}>
                    <Text style={styles.popularTitlesTitle}>
                  <Text style={{fontWeight:'bold'}}>LOCATION: </Text>{item.parking?.parkingLocation}
                    </Text>
                    <Text style={styles.popularTitlesWeight}>
                    </Text>
                  </View>
                </View>
                <View style={styles.popularCardBottom}>
                  <View style={styles.addPizzaButton}>
                    <Text
                      style={[
                        styles.popularTitlesTitle,
                        {fontWeight: 'bold', color: colors.white},
                      ]}>
                    PKR {item.parking.parkingCharges}/hour
                    </Text>
                  </View>
                  <View style={styles.ratingWrapper}>
                
                    <View>
                      <TouchableOpacity
                        onPress={() =>
                          props?.navigation.navigate('Camera2', {
                            bookingId: 1,
                          })
                        }>
                        <Text style={{color: colors.themeColor}}>Check In</Text>
                      </TouchableOpacity>
                      <TouchableOpacity>
                        <Text style={{color: colors.themeColor}}>
                          Check Out
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>

              <View style={styles.popularCardRight}>
                <Image source={item.image} style={styles.popularCardImage} />
              </View>
            </View>
          </TouchableWithoutFeedback>
        ))}
      </ScrollView>
    </View>

    // <View>
    //   <View style={{alignItems: 'center', top: 30}}>
    //     <Text style={{color: 'black', fontSize: 32, fontWeight: 'bold'}}>
    //       All Parking  Bookings
    //       {JSON.stringify(id)}
    //     </Text>
    //     </View>
    //         <View style={{alignItems:'center', top:50}}>

    //   <TouchableOpacity onPress={()=>navigation.navigate("Map",{id:iddd})}
    //      >
    //      <Text style={{color:'black',fontSize:30,color:'grey'}}> Book New</Text>
    //      </TouchableOpacity>
    //    </View>

    // { console.log(listOfBookings)}
    //          {listOfBookings.map(item => (

    //     <View  key={item.parking.id}
    //       style={{
    //         backgroundColor: 'white',
    //         padding: 60,
    //         top: 70,
    //         elevation: 3,
    //         alignItems: 'center',
    //         margin: 2,
    //       }}>
    //          <Text style={{color:'black', fontSize:24, fontWeight:'bold'}}>PARKING </Text>

    //       <Text
    //         style={{
    //           color: 'black',
    //           fontSize: 20,
    //           marginBottom: 5,
    //         }}>
    //        Location:  {item.parking.parkingLocation}
    //       </Text>

    //       <Text
    //        style={{
    //         color: 'black',
    //         fontSize: 20,
    //         marginBottom: 5,
    //       }}>
    //      Description:   {item.parking.description}
    //       </Text>

    //       <Text
    //     style={{
    //         color: 'black',
    //         fontSize: 20,
    //         marginBottom: 5,
    //       }}>
    //      Charges:   {item.parking.parkingCharges}
    //       </Text>
    //       <Button onPress={()=>navigation.navigate("Camera")}>
    //         Check In
    //     </Button>

    //     </View>

    //   ))}
    // </View>
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
