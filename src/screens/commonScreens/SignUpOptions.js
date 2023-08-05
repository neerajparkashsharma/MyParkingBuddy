import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';
import React from 'react';
import {colors} from '../../commons/Colors';
import Headerx from '../../components/header';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
const SignUpOptions = ({navigation}) => {
  return (
<>    

<SafeAreaView style={{flex:1,backgroundColor:colors.white}}>   
<Headerx navigation={navigation} headerName={"Sign Up Options"}/>
<Text style={{flex:0.2, fontSize:SCREEN_WIDTH/19,color:colors.black,fontWeight:'500',textAlign:'center',top:SCREEN_WIDTH/20}}>Who are <Text style={{color:colors.themeColor,fontWeight:'bold', fontSize:SCREEN_WIDTH/20}}> YOU?</Text> </Text>
     <View style={{ flex: 2,justifyContent:'space-between'}}>
      <TouchableWithoutFeedback  onPress={() => navigation.navigate('SignUp')}>
        <View style={homecardstyles.container}>
          <Image
            resizeMode="contain"
            source={require('../../Images/host.png')}
            borderTopLeftRadius={15}
            borderTopRightRadius={15}
            style={homecardstyles.image}
          /> 
        </View>
       
      </TouchableWithoutFeedback>
      <Text style={{alignSelf:'center', fontSize: 20, fontWeight: 'bold', color: colors.themeColor,bottom:20}}>PARKING HOST</Text>
       
      <TouchableWithoutFeedback  onPress={() => navigation.navigate('GuestSignUp')}>
        <View style={homecardstyles.container2}>
          <Image
            resizeMode="contain"
            source={require('../../Images/carparking.jpg')}
            borderTopLeftRadius={15}
            borderTopRightRadius={15}
            style={homecardstyles.image1}
          />
        </View>
      </TouchableWithoutFeedback> 
      <Text style={{alignSelf:'center', fontSize: 20, fontWeight: 'bold', color: colors.themeColor,bottom:20}}>SPACE USER</Text>
       
    </View>
    </SafeAreaView>
    </>

    // <View style={{top: 30, alignItems: 'center'}}>
    //   <Image
    //     style={{
    //       top: 0,
    //       width: 80,
    //       height: 80,
    //       resizeMode: 'contain',
    //     }}
    //     source={require('../Images/logo.png')}
    //   />

    //   <Text style={{top:30, fontSize: 25, fontWeight: 'bold', color: 'black'}}>
    //     {' '}
    //     Select{' '}
    //     <Text style={{top:30, fontSize: 25, fontWeight: 'bold', color: '#613EEA'}}>
    //       Account
    //     </Text>{' '}
    //   </Text>

    //   <TouchableOpacity
    //     style={{
    //       flexDirection: 'row',

    //       borderWidth: 1,
    //       borderColor: 'rgba(0,0,0,0.2)',
    //       alignItems: 'center',
    //       justifyContent: 'center',
    //       width: 100,
    //       height: 100,
    //       top: 50,
    //       shadowColor: 'black',
    //       shadowOffset: {width: -2, height: 4},
    //       shadowOpacity: 0.2,
    //       shadowRadius: 3,
    //       elevation: 15,
    //     }}
    //     onPress={() => navigation.navigate('SignUp')}>
    //     <Image
    //       style={{
    //         width: 90,
    //         height: 90,
    //         alignItems: 'center',
    //         justifyContent: 'center',
    //       }}
    //       source={require('../Images/host.png')}
    //     />
    //   </TouchableOpacity>
    //   <Text
    //     style={{top: 65, fontSize: 20, fontWeight: 'bold', color: 'black'}}
    //     onPress={() => navigation.navigate('SignUp')}>
    //     Parking Host
    //   </Text>

    //   <Text
    //     style={{top: 80, fontSize: 17, fontWeight: 'bold', color: '#613EEA'}}>
    //     {' '}
    //     OR{' '}
    //   </Text>
    //   <TouchableOpacity
    //     style={{
    //       flexDirection: 'row',

    //       borderWidth: 1,
    //       borderColor: 'rgba(0,0,0,0.2)',
    //       alignItems: 'center',
    //       justifyContent: 'center',
    //       width: 100,
    //       height: 100,
    //       shadowColor: 'black',
    //       shadowOffset: {width: -2, height: 4},
    //       shadowOpacity: 0.2,
    //       shadowRadius: 3,
    //       elevation: 15,
    //       top: 100,
    //     }}
    //     onPress={() => navigation.navigate('GuestSignUp')}>
    //     <Image
    //       style={{
    //         width: 90,
    //         height: 90,
    //         alignItems: 'center',
    //         justifyContent: 'center',
    //       }}
    //       source={require('../Images/spaceuser.png')}
    //     />
    //   </TouchableOpacity>
    //   <Text
    //     style={{top: 120, fontSize: 20, fontWeight: 'bold', color: 'black'}}
    //     onPress={() => navigation.navigate('GuestSignUp')}>
    //     Register as a Space User
    //   </Text>
    // </View>
  );
};

export default SignUpOptions;

const homecardstyles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH / 2,
    borderRadius: 15,
    flexDirection: 'row',
   
    backgroundColor: colors.white,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    marginHorizontal: SCREEN_WIDTH / 46,

    alignSelf: 'center',

    justifyContent: 'center',
    
  },
  container2: {
    width: SCREEN_WIDTH / 2,
    borderRadius: 15,
    flexDirection: 'row',
   
   
    
    
    marginHorizontal: SCREEN_WIDTH / 46,

    alignSelf: 'center',

    justifyContent: 'center',
    
  },
  title: {
    color: colors.black,
    fontSize: 15,
    lineHeight: 15,
    fontWeight: 'bold',
  },
  bodyContainer: {
    marginTop: SCREEN_HEIGHT / 67,
    marginLeft: SCREEN_WIDTH / 31,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SCREEN_HEIGHT / 135,
  },
  deliveryText: {
    marginLeft: SCREEN_WIDTH / 75,
  },
  rateContainer: {
    position: 'absolute',
    top: SCREEN_HEIGHT / 81,
    left: SCREEN_WIDTH / 34,
  },
  favoriteContainer: {
    position: 'absolute',
    top: SCREEN_HEIGHT / 81,
    right: SCREEN_WIDTH / 34,
  },
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: SCREEN_HEIGHT / 50,
  },
  card: {
    marginLeft: SCREEN_WIDTH / 47,
  },
  image: {
    height: SCREEN_HEIGHT / 3.5,
    width: SCREEN_WIDTH / 1.2,
    borderRadius: 15,
  },
  image1: {
    height: SCREEN_HEIGHT / 3.5,
    width: SCREEN_WIDTH / 1.2,
    bottom:20,
    borderRadius: 15,
  },
});
const categorycardstyles = StyleSheet.create({
  container: {
    backgroundColor: colors.purple,
    borderRadius: 5,
    alignItems: 'center',

    justifyContent: 'center',
    paddingHorizontal: SCREEN_WIDTH / 53,
    paddingVertical: SCREEN_HEIGHT / 116,
  },
  title: {
    color: colors.white,
    fontSize: 13,
    fontWeight: 'bold',
  },
});
