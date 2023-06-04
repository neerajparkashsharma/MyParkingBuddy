import React, { useEffect } from 'react';
import { View, Animated, StyleSheet, ImageBackground, Image } from 'react-native';
import { SCREEN_HEIGHT } from '../../components/units';

const SplashScreen = ({ navigation }) => {

  const carPosition = new Animated.ValueXY({ x: -100, y: 0 });

  useEffect(() => {
    startDrivingAnimation();
  }, []);

  const startDrivingAnimation = () => {
    Animated.timing(carPosition, {
      toValue: { x: 400, y: 0 },
      duration: 3000,
      useNativeDriver: false,
    }).start(() => {
      navigation.navigate('OnBoarding');
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../../Images/logo.png')} style={styles.logo} />
      </View>
      <ImageBackground
        source={require('../../Images/road1.png')}
        style={styles.backgroundImage}
      >
        <Animated.Image
          source={require('../../Images/carr.png')}
          style={[styles.car, { transform: [{ translateX: carPosition.x }, { translateY: carPosition.y }] }]}
        />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  logo: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  car: {
    width: 200,
    height: 200,
    top: SCREEN_HEIGHT / 10,
    resizeMode: 'contain',
  },
});

export default SplashScreen;
