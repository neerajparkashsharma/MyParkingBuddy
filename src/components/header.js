import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native'
import { colors } from '../commons/Colors'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import React from 'react'


const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

const Headerx = ({ navigation, headerName }) => {
  return (
    <View style={styles.topContainer}>
      {
        navigation.openDrawer ?
          (<TouchableOpacity onPress={() => navigation?.openDrawer()}>
            <Icon name="menu" size={30} color={colors.themeColor} />
          </TouchableOpacity>
          ) :
          (
            <TouchableOpacity
              onPress={() => {

                navigation.goBack()
              }
              }>
              <Icon name="chevron-left" size={SCREEN_WIDTH / 15} color={colors.themeColor} />
            </TouchableOpacity>
          )

      }

      <Text style={styles.topTitle}>{headerName}</Text>
      <View />
    </View>
  )
}

export default Headerx

const styles = StyleSheet.create({

  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: SCREEN_HEIGHT / 34,
    marginHorizontal: SCREEN_WIDTH / 16,


  },
  topTitle: {
    color: colors.themeColor,
    fontSize: SCREEN_WIDTH / 23,
    fontWeight: '500',
    textAlign: 'center',
  },

})