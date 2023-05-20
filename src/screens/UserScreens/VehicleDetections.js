import React, { useState, useEffect } from 'react';
import { View, Image, ScrollView, StyleSheet, Text } from 'react-native';
// import RNFS from 'react-native-fs';
import Headerx from '../../components/header';

const VehicleDetections = (props) => {
  const [dateTime, setDateTime] = useState('');

  useEffect(() => {
    const getCurrentDateTime = () => {
      const date = new Date();
      const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const formattedTime = `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`;
      setDateTime(`${formattedDate} ${formattedTime}`);
    }
    getCurrentDateTime();
  }, []);

  return (
    <ScrollView>
      <Headerx headerName={"Detected Vehicles"} navigation={props?.navigation} />
      <View style={styles.container}>
        <Text style={styles.dateTime}>Detected on: {dateTime}</Text>
        <Text style={styles.title}>Your Detected Vehicles</Text>
        <Image source={require('../../car_detection_images/0b30f6e0-deb5-4204-b270-06c7963c902b.jpg')} style={styles.image} />
        <Text style={styles.label}>Vehicle Type: Car</Text>
        <Text style={styles.label}>License Plate: XYZ-1234</Text>
      </View>
    </ScrollView>
  );
};

export default VehicleDetections;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  dateTime: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  image: {
    width: 300,
    height: 200,
    resizeMode: 'cover',
    marginTop: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  }
});
