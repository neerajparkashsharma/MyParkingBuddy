import React, { useState, useEffect } from 'react';
import { View, Image, ScrollView, StyleSheet, Text } from 'react-native';
// import RNFS from 'react-native-fs';
import Headerx from '../../components/header';

const NumberPlatesDetection = (props) => {
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
      <Headerx headerName={"Number Plate Detection"} navigation={props?.navigation} />
      <View style={styles.container}>
        <Text style={styles.dateTime}>Detected on: {dateTime}</Text>
        <Text style={styles.title}>Your Detected Number Plate</Text>
        <Image source={require('../../number_plate_detection_images/2b5f39ff-328f-4616-b57d-e579a00a6063.jpg')} style={styles.image} />
        
        <Text style={styles.label}>License Plate: NO.234SFD</Text>
      </View>
    </ScrollView>
  );
};

export default NumberPlatesDetection;

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
    width: 500,
    height: 500,
    resizeMode: 'cover',
    marginTop: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  }
});
