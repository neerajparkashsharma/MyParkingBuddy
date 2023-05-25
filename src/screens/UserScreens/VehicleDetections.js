import React, { useState, useEffect } from 'react';
import { View, Image, ScrollView, StyleSheet, Text } from 'react-native';
import axios from 'axios';
import url from '../../commons/axiosUrl';

const VehicleDetections = (props) => {
  const [dateTime, setDateTime] = useState('');
  const [imageNames, setImageNames] = useState([]);
  const folderPath = 'D%3A%5CNew%20folder%20%289%29%5CMyParkingBuddy%5Csrc%5Ccar_detection_images';


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

    axios.get(`${url}images?directoryPath=${folderPath}`)
      .then(response => {
        // Assuming the response is an array of image names
        setImageNames(response.data);
      })
      .catch(error => {
        console.error('Error fetching image names:', error);
      });
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.dateTime}>Detected on: {dateTime}</Text>
        <Text style={styles.title}>Your Detected Vehicles</Text>
        {imageNames.map(imageName => (
          <View key={imageName}>


            <Image
              source={{
                uri: `${folderPath}%2F${imageName}?raw=true}`
              }}
            

              style={styles.image}
            />
            <Text style={styles.label}>Image Name: {imageName}</Text>
          </View>
        ))}
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
