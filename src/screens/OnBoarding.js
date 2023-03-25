import React,{useEffect} from 'react';

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
  Button,
  Alert,
  Dimensions,
} from 'react-native';
import {colors} from '../commons/Colors';
import styles from '../styles/OnBoardingStyle';
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
import AsyncStorage from '@react-native-async-storage/async-storage';
const HeadingfontSize = SCREEN_WIDTH / 12 - 2;

import Swiper from 'react-native-swiper';

const OnBoarding = ({navigation}) => {

  useEffect(() => {
    const checkUserData = async () => {
      try {
        const value = await AsyncStorage.getItem('role');
        if (value !== null) {
          
          value == 1 ? navigation.navigate('HostDrawer') : navigation.navigate('Drawer');
        } else {
          console.log('no user data');
        }
      } catch (error) {
        console.log(error);
      }
    };
    checkUserData();
  }, []);

  return (
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
  );
};

export default OnBoarding;
