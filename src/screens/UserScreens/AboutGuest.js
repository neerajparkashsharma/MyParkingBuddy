import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import Headerx from '../../components/header';
import {colors} from '../../commons/Colors';
import {SCREEN_WIDTH, SCREEN_HEIGHT} from '../../components/units';

import Feather from 'react-native-vector-icons/Feather';

const AboutGuest = props => {
  return (
    <View>
      <Headerx navigation={props.navigation} headerName={'About Guest'} />

      <View style={{ flexDirection: 'row',justifyContent:'center'}}>
        <Feather name="search" size={25} style={{top:SCREEN_HEIGHT/53,right:SCREEN_WIDTH/30}}></Feather>
        <Text style={styles.Discovery}>Discovery</Text>
      </View>
      <Text style={{textAlign:'center'}}>
      Parking Buddy connects guests with verified hosts to grant one single wish; Save Money on Parking. Tired of paying overpriced sporting event parking prices; ask the Buddy. Hotel parking prices impacting your vacation or get away budget; ask the Buddy. Everyone wins with Parking Genie.
Don’t forget to ask the Parking-Buddy for a safe and convenient place to park your Vehicle or dock your Bike.

      </Text>
    </View>
  );
};

export default AboutGuest;

const styles = StyleSheet.create({
  Discovery: {
    fontWeight: 'bold',
    fontSize: 35,
    color: colors.themeColor,
    // textAlign: 'center',
  },
});
