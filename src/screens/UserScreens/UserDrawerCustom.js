import {
  StyleSheet,
  Text,
  View,
  Image,
  Touchable,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import React, {useState,useEffect} from 'react';
import {FlatList} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {colors} from '../../commons/Colors';
import {Button, Drawer} from 'react-native-paper';
import {UserListOfDrawerItems} from '../../Lists/ListOfItems';
import {SCREEN_WIDTH, SCREEN_HEIGHT} from '../../components/units';
import axios from 'axios';
import url from '../../commons/axiosUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackActions } from '@react-navigation/native';



const UserDrawerCustom = props => {
  const [selectedid, setSelectedid] = useState(0);
  const [userData, setUserData] = useState([]);

  

  useEffect(() => {
    setSelectedid(props?.state?.index);
  }, [props?.state?.index]);
  
  useEffect(() => {
    const getUserId = async () => {
      const userId = await AsyncStorage.getItem('userdata');
      console.log(userId);
      if (userId) {
        axios.get(`${url}users/id/${userId}`)
          .then(res => {
            setUserData(res.data);
            console.log(res.data);
          })
          .catch(err => {
            console.log(err);
            // handle the error appropriately
          });
      }
    };
    getUserId();
  }, []);
  
  const Item = ({
    name,
    icon,
    onPress,
    backgroundColor,
    color,
    textcolor,
    index,
  }) => (
    <TouchableOpacity
      onPress={() => onPress(index)}
      style={{
        flexDirection: 'row',
        marginVertical: 7,
        marginHorizontal: 14,
        backgroundColor: backgroundColor,
        color: color,
        padding: 13,
        borderRadius: 10,
      }}>
      <View
        style={{
          padding: 1,
        }}>
        <Icon name={icon} size={22} color={color} />
      </View>
      <Text
        style={{
          fontSize: 24,
          fontWeight: 'bold',
          marginLeft: 20,
          fontSize: 14,
          color: textcolor,
          marginTop: 4,
        }}>
        {name}
      </Text>
    </TouchableOpacity>
  );

  const renderItem = ({item, index}) => {
    const backgroundColor = item.id == selectedid ? colors.themeColor : 'white';
    const color = item.id == selectedid ? 'white' : colors.themeColor;
    const textcolor = item.id == selectedid ? 'white' : 'black';
    return (
      <Item
        name={item.name}
        icon={item.icon}
        onPress={() => {
          setSelectedid(item.id);
          props.navigation.navigate(props?.state?.routes[item.id].name);
        }}
        color={color}
        index={item.id}
        backgroundColor={backgroundColor}
        textcolor={textcolor}></Item>
    );
  };

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          flex: 0.1,

          paddingTop: SCREEN_HEIGHT / 20,
        }}>
        <Icon
          name="close"
          style={{marginTop: -40, marginLeft: 220}}
          onPress={() => props?.navigation.closeDrawer()}
          color={colors.themeColor}
          size={23}
        />
        <TouchableOpacity
          style={{flexDirection: 'row', display: 'flex', paddingHorizontal: 10}}
          onPress={() => props?.navigation.navigate('Profile')}>
          <Image
            source={require('../../Images/user.png')}
            style={{
              width: SCREEN_WIDTH / 10,
              height: SCREEN_HEIGHT / 17,
            }}
          />
          <Text
            style={{
              fontSize: SCREEN_HEIGHT / 40,
              fontWeight: 'bold',
              top: 10,
              left: SCREEN_WIDTH / 50,
              color: colors.themeColor,
            }}>
            {userData?.emailAddress}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{flex: 0.9}}>
        <FlatList
          data={UserListOfDrawerItems}
          renderItem={renderItem}></FlatList>
      </View>
      <TouchableOpacity
  style={{ position: 'absolute', bottom: 30, left: SCREEN_WIDTH / 4.5 }}
  onPress={async () => {
    try {
      await AsyncStorage.removeItem('userdata');
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('role');

      props?.navigation.dispatch(StackActions.popToTop());
      props?.navigation.navigate('Login');
    } catch (error) {
      console.log('Error occurred while logging out:', error);
    }
  }}
>
  <Text style={{ fontSize: 18, fontWeight: 'bold',color:'black' }}>Logout</Text>
</TouchableOpacity>

   {/* <TouchableOpacity
      style={styles.container}
      onPress={() => props?.navigation.navigate('Login')}>
      <Icon name="logout" size={25} style={styles.icon} />
      <Text style={styles.text}>Logout</Text>
    </TouchableOpacity> */}
    </View>
  );
};
export default UserDrawerCustom;
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 30,
    left: SCREEN_WIDTH / 4.5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    color: colors.themeColor,
 alignSelf:'flex-start',
 right:70
  },
  text: {
    color:'#585858',
    fontSize: 18,
    fontWeight: 'bold',
    right:60
  },
});
