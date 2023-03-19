import { StyleSheet, Text, View,Dimensions,Image } from 'react-native'
import React from 'react'
import { color } from 'react-native-reanimated';
import {colors} from '../../commons/Colors.js';
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

export default function AccessForParking() {
  return (
    <View>
      <Text style={{color:colors.themeColor,fontSize:25,fontWeight:'bold',textAlign:'center',marginTop:30,marginBottom:-20}}>Scan QR Code</Text>
      <View style={{backgroundColor:'white',width:SCREEN_WIDTH/1.05,height:SCREEN_HEIGHT/1.55, borderRadius:20, elevation:30,marginTop:SCREEN_HEIGHT/16,alignSelf:'center'}}>
      <Image
            style={{alignSelf: 'center', marginTop: 10}}
            source={require('../../Images/icons8-qr-code-100.png')}></Image>


<Text style={{textAlign:'center',color:colors.themeColor,fontSize:20,fontWeight:'bold'}}>NIMRAH ALI</Text>
<View style={{flexDirection:'row',justifyContent:'center'}}><Text style={{color:'black',fontSize:15,fontWeight:'bold',marginTop:10}}>Unique Id:</Text><Text style={{color:'black',marginTop:10,fontSize:15,fontWeight:'bold'}}> 56789090</Text></View>

<Text style={{textAlign:'center',color:colors.themeColor,fontSize:23,fontWeight:'bold',marginBottom:20,marginTop:5}}>Bookings Details</Text>
<View style={{flexDirection:'row',justifyContent:'space-around'}}><Text style={{color:'black',fontSize:15,fontWeight:'bold',marginTop:10}}>Check-In-Time</Text><Text style={{color:'black',fontSize:15,fontWeight:'bold',marginTop:10}}> 56789090</Text></View>
<View style={{flexDirection:'row',justifyContent:'space-around'}}><Text style={{color:'black',fontSize:15,fontWeight:'bold',marginTop:10}}>Check-Out-Time</Text><Text style={{color:'black',fontSize:15,fontWeight:'bold',marginTop:10}}> 56789090</Text></View>
<View style={{flexDirection:'row',justifyContent:'space-around'}}><Text style={{color:'black',fontSize:15,fontWeight:'bold',marginTop:10}}>Days:</Text><Text style={{color:'black',fontSize:15,fontWeight:'bold',marginTop:10}}> 56789090</Text></View>
      </View>
      <View style={{ height: 55,
    width: SCREEN_WIDTH / 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    left: SCREEN_WIDTH / 8,   
    marginBottom: 70,
    backgroundColor: colors.themeColor,
    marginHorizontal: 20,
    borderRadius: 10,}}>
          <Text style={{color:'white', fontSize: 18, fontWeight: 'bold'}}>
            Book Now
          </Text>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({})