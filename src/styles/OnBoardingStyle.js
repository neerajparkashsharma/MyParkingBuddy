
import { StyleSheet, Dimensions } from 'react-native';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
const HeadingfontSize = SCREEN_WIDTH / 12 - 2;



 export default styles = StyleSheet.create({
    wrapper: {
      backgroundColor: 'white',
    },
    
    logo: {
     
        top: 0,
        width:  SCREEN_WIDTH / 2.5,
        height: SCREEN_HEIGHT / 7,
        resizeMode: 'contain',
     
    },

    picture1:{

      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT / 3.5,
      justifyContent: 'center',
      resizeMode: 'center'
    },

    picture2:{
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT / 3.5,
      justifyContent: 'center',
      resizeMode: 'center'
    },

    picture3:{
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT / 3.5,
      top: SCREEN_HEIGHT / 70,
      resizeMode: 'center'
    },

    picture4:{
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT / 3.5,
      top: SCREEN_HEIGHT / 20,
      resizeMode: 'cover'
    },
    
    slide: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  
    text: {
      color: 'black',
      fontSize: HeadingfontSize,
    },
    skip: {
      alignSelf: 'flex-end',
      right: SCREEN_WIDTH / 25,
      
      position: 'absolute',
      top: 20,
      fontSize:13,
      alignItems:'flex-end'
    },
    
  });