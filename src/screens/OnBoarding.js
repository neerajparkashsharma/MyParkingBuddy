import React from 'react';

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
} from 'react-native';

import Swiper from 'react-native-swiper';

const OnBoarding = ({navigation}) => {
  return (
    <Swiper
      style={styles.wrapper}
      loop={false}
      dotStyle={{color: '#613EEA'}}
      showsButtons={true}>
      <View style={styles.slide}>
        <Image
          style={{
            top: 0,
            width: 150,
            height: 150,
            resizeMode: 'contain',
          }}
          source={require('../Images/logo.png')}
        />

        <Text
          style={{marginTop: 30, marginDown: 40, color: 'black', fontSize: 25}}>
          Welcome to Parking Buddy!
        </Text>
        <Image
          style={{
            width: 450,
            height: 250,
            marginTop: 30,
          }}
          source={require('../Images/Picture4.png')}
        />

        <TouchableOpacity
          style={{left: -150, bottom: -45, color: '#613EEA'}}
          onPress={() => navigation.push('Login')}>
          <Text style={{color: '#613EEA', fontWeight: 'bold'}}>SKIP</Text>
        </TouchableOpacity>

        {/* <Text style={{left:150, top:50, color:'#613EEA'}}>NEXT</Text> */}
      </View>

      <View style={styles.slide}>
        <Image
          style={{
            width: 250,
            height: 250,
            resizeMode: 'contain',
          }}
          source={require('../Images/Picture1.png')}
        />
        <Text style={styles.text}>Best Parking Spots</Text>
        <Text>Be our parking Buddy!</Text>
        <TouchableOpacity
          style={{left: -150, bottom: -140, color: '#613EEA'}}
          onPress={() => navigation.push('Login')}>
          <Text style={{color: '#613EEA', fontWeight: 'bold'}}>SKIP</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.slide}>
        <Image
          style={{
            width: 250,
            height: 250,
            resizeMode: 'contain',
          }}
          source={require('../Images/Picture2.png')}
        />
        <Text style={styles.text}>Quick Navigation</Text>
        <Text style={{fontSize: 15, marginTop: 20}}>Be our parking Buddy!</Text>
        <TouchableOpacity
          style={{left: -150, bottom: -130, color: '#613EEA'}}
          onPress={() => navigation.push('Login')}>
          <Text style={{color: '#613EEA', fontWeight: 'bold'}}>SKIP</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.slide}>
        <Image
          style={{width: 250, height: 250, resizeMode: 'contain'}}
          source={require('../Images/Picture3.png')}
        />
        <Text style={styles.text}>Easy Payment</Text>
        <Text style={{}}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit
        </Text>

        <TouchableOpacity
          style={{left: -150, bottom: -140, color: '#613EEA'}}
          onPress={() => navigation.push('Login')}>
          <Text style={{color: '#613EEA', fontWeight: 'bold'}}>SKIP</Text>
        </TouchableOpacity>
      </View>
    </Swiper>
  );
};

const styles = StyleSheet.create({
  wrapper: {},
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  text: {
    color: 'black',
    fontSize: 25,
  },
});
export default OnBoarding;
