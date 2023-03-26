// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, Button } from 'react-native';
// import NetInfo from '@react-native-community/netinfo';

// const port = '8042';

// export  function App() {
//   const [ip, setIp] = useState('');

//   useEffect(() => {
//     const getIP = () => {
//       NetInfo.fetch().then(state => {
//         setIp(state.details.ipAddress);
//       });
//     };

//     getIP();
//   }, []);

//   const url = `http://${ip}:${port}/`;

//   return (
//     <View style={styles.container}>
//       <Text style={styles.text}>IP Address: {ip}</Text>
//       <Button title="Get IP" onPress={() => NetInfo.fetch().then(state => setIp(state.details.ipAddress))} />
//     </View>
//   );
// }

// export default App().url;
 
export default url = 'http://172.15.2.135:8042/';