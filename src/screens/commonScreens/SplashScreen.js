import React, { useEffect } from 'react';
import { View, Animated, StyleSheet } from 'react-native';

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
      <Animated.Image
        source={require('../../Images/automobile-g51049ce43_1280.png')} // Replace with the image of the car
        style={[styles.car, carPosition.getLayout()]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  car: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
});

export default SplashScreen;
