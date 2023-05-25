import React, {useEffect, useState} from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {colors} from '../commons/Colors';
import styles from '../styles/OnBoardingStyle';
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
import AsyncStorage from '@react-native-async-storage/async-storage';
const HeadingfontSize = SCREEN_WIDTH / 12 - 2;
import axios from 'axios';
import Swiper from 'react-native-swiper';
import url from '../commons/axiosUrl';

const OnBoarding = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const checkUserData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
           
          console.log("token",token)
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          
          
          axios.post(`${url}authenticate/token`)
            .then(response => {
              
              const role = response.data.role;
              role === 1 ? navigation.navigate('HostDrawer') : navigation.navigate('Drawer');
            })
            .catch(error => {
              navigation.navigate("Login")
              
              console.log(error.response.data)
              console.log('Authentication failed:', error);
            });
        } else {
          console.log('No token found');
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    checkUserData();
  }, []);
  

  return (
    <>
      {loading ? (
        <View
          style={{flex: 1, alignContent: 'center', justifyContent: 'center'}}>
          <ActivityIndicator size="large" color={colors.themeColor} />
          <Text
            style={{
              alignSelf: 'center',
              marginTop: 10,
              color: colors.themeColor,
            }}>
            Loading...
          </Text>
        </View>
      ) : (
        <Swiper
          arrowColor="white"
          style={styles.wrapper}
          loop={false}
          dotStyle={{color: colors.themeColor}}
          showsButtons={true}>
          <View style={styles.slide}>
            <Image style={styles.logo} source={require('../Images/logo.png')} />

            <Text
              style={{
                marginTop: SCREEN_HEIGHT / 47,
                color: 'black',
                fontSize: HeadingfontSize,
                fontWeight: 'bold',
              }}>
              WELCOME
            </Text>
            <Text
              style={{
                fontSize: SCREEN_WIDTH / 20 - 5,
                marginTop: 20,
                fontWeight: '500',
                color: colors.themeColor,
              }}>
              TO PARKING BUDDY
            </Text>

            <Image
              style={styles.picture4}
              source={require('../Images/Picture4.png')}
            />

            <TouchableOpacity
              style={styles.skip}
              onPress={() => navigation.navigate('Login')}>
              <Text style={{color: colors.themeColor, fontWeight: 'bold'}}>
                SKIP{' '}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.slide}>
            <Image
              style={styles.picture1}
              source={require('../Images/Picture1.png')}
            />
            <Text style={styles.text}>Best Parking Spots</Text>
            <Text>Be our parking Buddy!</Text>
            <TouchableOpacity
              style={styles.skip}
              onPress={() => navigation.navigate('Login')}>
              <Text style={{color: colors.themeColor, fontWeight: 'bold'}}>
                SKIP
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.slide}>
            <Image
              style={styles.picture2}
              source={require('../Images/Picture2.png')}
            />
            <Text style={styles.text}>Quick Navigation</Text>
            <Text style={{fontSize: 15, marginTop: 20, color: 'black'}}>
              Be our parking Buddy!
            </Text>
            <TouchableOpacity
              style={styles.skip}
              onPress={() => navigation.navigate('Login')}>
              <Text style={{color: colors.themeColor, fontWeight: 'bold'}}>
                SKIP
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.slide}>
            <Image
              style={styles.picture3}
              source={require('../Images/Picture3.png')}
            />
            <Text style={styles.text}>Easy Payment</Text>
            <Text style={{fontSize: 15, marginTop: 20, color: 'black'}}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit
            </Text>

            <TouchableOpacity
              style={styles.skip}
              onPress={() => navigation.navigate('Login')}>
              <Text style={{color: colors.themeColor, fontWeight: 'bold'}}>
                SKIP
              </Text>
            </TouchableOpacity>
          </View>
        </Swiper>
      )}
    </>
  );
};

export default OnBoarding;
