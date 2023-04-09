// import {
//   StyleSheet,
//   Text,
//   View,
//   TextInput,
//   Image,
//   Dimensions,ScrollView
// } from 'react-native';
// import React from 'react';
// import {colors} from '../../commons/Colors';
// // import {ScrollView} from 'react-native-gesture-handler';
// const SCREEN_HEIGHT = Dimensions.get('window').height;
// const SCREEN_WIDTH = Dimensions.get('window').width;
// export default function Alerts() {
//   return (
//     <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
//       <View>
//         <Text
//           style={{
//             alignSelf: 'center',
//             fontWeight: 'bold',
//             fontSize: 25,
//             color: colors.themeColor,
//           }}>
//           Alerts
//         </Text>
//        </View>
//         <View
//   style={{
//     backgroundColor: 'white',
//     width: '100%',
//     height: 'auto',
//     alignSelf: 'center',
//     marginTop: 10,
//     elevation: 15,
//     flexDirection: 'row',
//     padding: 10,
//     flexWrap: 'wrap',
//   }}>
//   <View style={{ flexDirection: 'row', alignItems: 'center' , flexWrap:'wrap'}}>
//     {/* <Image
//       style={{ marginRight: 10 , width:60,height:60,borderRadius:5}}
//       source={require('../../Images/images.jpg')}
//     /> */}
//     <View style={{flexDirection:'column'}}>
//     <Text style={{fontSize:20,fontWeight:'700',color:colors.themeColor}}>Image</Text>
//     <Text
//       style={{
//         fontWeight: 'bold',
//         fontSize: 11,
//         flexWrap: 'wrap',
//         color: colors.themeColor,
//       }}>
//       You should get familiar with the components that are already built in. You
//       are able to extend React Native to support those tags but it is weird to
//       able to extend React Native to support those tags but it is weird to
//       able to extend React Native to support those tags but it is weird to
//       able to extend React Native to support those tags but it is weird to
//       able to extend React Native to support those tags but it is weird to

//     </Text>
//     </View>
//   </View>
// </View>

// </ScrollView>

//   );
// }

// const styles = StyleSheet.create({});
import React from 'react';
import {View, Text, Image, ScrollView} from 'react-native';
import Headerx from '../../components/header';
import {colors} from '../../commons/Colors';
import {SCREEN_HEIGHT} from '../../components/units';

const Alerts = (props) => {
  return (
    <View style={{backgroundColor: 'white'}}>
      <Headerx navigation={props?.navigation} headerName={'Alerts'}></Headerx>

      <ScrollView>
        <View
          style={{
            BackgroundColor: 'white',
            flexDirection: 'row',
            height: 'auto',
            padding: 10,
            borderColor: 'grey',
            borderBottomWidth: 0.5,
          }}>
          <Image
            style={{marginRight: 10, width: 50, height: 50, borderRadius: 5}}
            source={require('../../Images/icons8-warning-100.png')}
          />
          <View style={{flex: 0.9, flexDirection: 'column'}}>
            <Text style={{fontSize: 20, fontWeight: '550', color: '#000000'}}>
              Hello World!
            </Text>

            <Text style={{fontSize: 15, fontWeight: '600', color: '#595959'}}>
              Hello World! able to extend React Native to support those tags but
              t those t
            </Text>
          </View>
        </View>

      </ScrollView>
    </View>
  );
};

export default Alerts;
