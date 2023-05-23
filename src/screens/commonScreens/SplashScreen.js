import React, { useEffect } from 'react';
import { View, Animated, StyleSheet, ImageBackground, Image } from 'react-native';

const SplashScreen = ({ navigation }) => {
  const carPosition = new Animated.ValueXY({ x: -100, y: 0 });

  useEffect(() => {
    // Start the animation on component mount
    startDrivingAnimation();
  }, []);

  const startDrivingAnimation = () => {
    Animated.timing(carPosition, {
      toValue: { x: 400, y: 0 }, // Destination position of the car
      duration: 3000, // Duration of the animation in milliseconds
      useNativeDriver: false, // Make sure to set this to false for position animations
    }).start(() => {
      // Animation completed, navigate to the desired screen
      navigation.navigate('OnBoarding'); // Replace 'Home' with the screen you want to navigate to
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../../Images/logo.png')} style={styles.logo} />
      </View>
      <ImageBackground
        source={require('../../Images/road1.png')} // Replace with the path to your scenery image
        style={styles.backgroundImage}
      >
        <Animated.Image
          source={require('../../Images/carr.png')} // Replace with the image of the car
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
    top: 100,
    resizeMode: 'contain',
  },
});

export default SplashScreen;
