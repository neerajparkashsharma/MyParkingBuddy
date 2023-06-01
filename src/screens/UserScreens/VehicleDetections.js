//   // import React, { useState, useEffect } from 'react';
//   // import { View, Image, ScrollView, StyleSheet, Text } from 'react-native';
//   // import axios from 'axios';
//   // import url from '../../commons/axiosUrl';

//   // const VehicleDetections = (props) => {
//   //   const [dateTime, setDateTime] = useState('');
//   //   const [imageNames, setImageNames] = useState([]);
//   //   const folderPath = 'D%3A%5CNew%20folder%20%289%29%5CMyParkingBuddy%5Csrc%5Ccar_detection_images';


//   //   useEffect(() => {
//   //     const getCurrentDateTime = () => {
//   //       const date = new Date();
//   //       const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
//   //       const hours = date.getHours();
//   //       const minutes = date.getMinutes();
//   //       const formattedTime = `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`;
//   //       setDateTime(`${formattedDate} ${formattedTime}`);
//   //     }
//   //     getCurrentDateTime();

//   //     axios.get(`${url}images?directoryPath=${folderPath}`)
//   //       .then(response => {
//   //         // Assuming the response is an array of image names
//   //         setImageNames(response.data);
//   //       })
//   //       .catch(error => {
//   //         console.error('Error fetching image names:', error);
//   //       });
//   //   }, []);

//   //   return (
//   //     <ScrollView>
//   //       <View style={styles.container}>
//   //         <Text style={styles.dateTime}>Detected on: {dateTime}</Text>
//   //         <Text style={styles.title}>Your Detected Vehicles</Text>
//   //         {imageNames.map(imageName => (
//   //           <View key={imageName}>


//   //             <Image
//   //               source={{
//   //                 uri: `${folderPath}%2F${imageName}?raw=true}`
//   //               }}


//   //               style={styles.image}
//   //             />
//   //             <Text style={styles.label}>Image Name: {imageName}</Text>
//   //           </View>
//   //         ))}
//   //       </View>
//   //     </ScrollView>
//   //   );
//   // };

//   // export default VehicleDetections;

//   // const styles = StyleSheet.create({
//   //   container: {
//   //     flex: 1,
//   //     alignItems: 'center',
//   //     justifyContent: 'center',
//   //     padding: 10,
//   //   },
//   //   dateTime: {
//   //     fontSize: 16,
//   //     color: '#666',
//   //     marginBottom: 10,
//   //   },
//   //   title: {
//   //     fontSize: 20,
//   //     fontWeight: 'bold',
//   //     marginBottom: 10,
//   //   },
//   //   image: {
//   //     width: 300,
//   //     height: 200,
//   //     resizeMode: 'cover',
//   //     marginTop: 10,
//   //   },
//   //   label: {
//   //     fontSize: 16,
//   //     fontWeight: 'bold',
//   //     marginTop: 10,
//   //   }
//   // });


//   import React, { useState, useEffect } from 'react';
//   import { View, Image, ScrollView, StyleSheet, Text } from 'react-native';
//   import axios from 'axios';

//   const VehicleDetections = (props) => {
// //     const [images, setImages] = useState([]);
// //     const folderPath = 'D%3A%5CNew%20folder%20%289%29%5CMyParkingBuddy%5Csrc%5Ccar_detection_images';

// // //     useEffect(() => {
// // //       const downloadImages = async () => {
// // //         try {




// // //           const RNFetchBlob = (await import('rn-fetch-blob')).default;
// // //           const url = (await import('../../commons/axiosUrl')).default;

// // //           const response = await axios.get(`${url}images/files/?directoryPath=${folderPath}`, {
// // //             responseType: 'arraybuffer',  // Set the response type to 'arraybuffer'
// // //           });

// // //           const tempDir = `${RNFetchBlob.fs.dirs.CacheDir}/images`;

// // //           // Check if the directory exists, create it if it doesn't
// // //           const isDirExists = await RNFetchBlob.fs.isDir(tempDir);
// // //           if (!isDirExists) {
// // //             console.log(`Creating directory: ${tempDir}`);
// // //             await RNFetchBlob.fs.mkdir(tempDir);
// // //           } else {
// // //             console.log(`Directory already exists: ${tempDir}`);
// // //           }

// // //           if (response.status === 200) {
// // //             // console.log("...............",response)
// // //             const downloadedImages = [];

// // //             const parts = new FormData(response.body);
// // //             // console.log("...............",parts)
// // //             for (let i = 0; i < parts.length; i++) {
// // //               const part = parts[i];

// // //               const filename = `${tempDir}/image_${i}.jpg`;

// // //               try {
// // //                 console.log(`Saving image: ${filename}`);
// // //                 await RNFetchBlob.fs.writeFile(filename, part, 'base64');

// // //                 downloadedImages.push(filename);
// // //                 console.log(`Image ${i} saved successfully.`);
// // //               } catch (error) {
// // //                 console.log(`Error saving image ${i}:`, error);
// // //               }
// // //             }

// // //             console.log('Saved images:', downloadedImages);
// // //             setImages(downloadedImages);
// // //           }
// // //         } catch (error) {
// // //           console.log('Error:', error);
// // //         }
// // //       }

// // //       downloadImages();



// // //       axios.get('http://192.168.20.73:8042/images/files/', {
// // //   params: {
// // //     directoryPath: 'D:\\New folder (9)\\MyParkingBuddy\\src\\car_detection_images'
// // //   },
// // //   responseType: 'blob' // Set the response type to blob
// // // })
// // //   .then(response => {
// // //     // Create a FormData object
// // //     const formData = new FormData();

// // //     // Append the response data to the FormData object
// // //     formData.append('files', response.data);
// // //     // formData.append('files', response.data);
// // //     const filesArray = Array.from(formData.getAll('files'));
// // //     setImages(filesArray);

// // //   })
// // //   .catch(error => {
// // //     // Handle the GET request error
// // //     console.error(error);
// // //   });



// // //     }, []);


// //     return (
// //       <View>
// //        {images.map((file, index) => (
// //         <Image key={index} source={{ uri: `file://${file}` }} style={{ width: 200, height: 200 }} />
// //       ))}
// //       </View>
// //     );
// //   };

// return(
// <></>
// );
// }
// export default VehicleDetections;


import React, {useEffect, useState} from 'react';
import {ScrollView} from 'react-native';
import axios from 'axios';
import url from '../../commons/axiosUrl';
import {Card} from 'react-native-paper';

const VehicleDetections = ({props}) => {
  const [images, setImages] = useState([]);
  

  useEffect(() => {
    fetchImages();
  }, [props]);


  const fetchImages = async () => {
    try {
      const response = await axios.get(`${url}all`);
      setImages(response.data);
      console.log('...............', response.data);
    } catch (error) {
      console.log('Error fetching images:', error);
    }
  };
  return (
    <ScrollView>
      {images.map((base64Image, index) => {
        try {
          const imageUrl = `data:image/jpeg;base64,${base64Image}`;

          return (
            <Card
              key={index}
              style={{marginVertical: 10, borderRadius: 8, elevation: 4}}>
              <Card.Cover style={{height: 300}} source={{uri: imageUrl}} />
            </Card>
          );
        } catch (error) {
          console.log('Error rendering image:', error);
          return null;
        }
      })}
    </ScrollView>
  );
};
export default VehicleDetections;