import {
  StyleSheet,
  Text,
  View,
  Image,
  Touchable,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import React, {useState} from 'react';
import {FlatList} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {colors} from '../../commons/Colors';
import {Button, Drawer} from 'react-native-paper';
import {UserListOfDrawerItems} from '../../Lists/ListOfItems';
import {SCREEN_WIDTH, SCREEN_HEIGHT} from '../../components/units';

const UserDrawerCustom = props => {
  const [selectedid, setSelectedid] = useState(0);

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

          paddingTop: 50,
          paddingHorizontal: 20,
          paddingVertical: 0,
          backgroundColor: 'black',
        }}>
        <Icon
          name="close"
          style={{marginTop: -40, marginLeft: 220}}
          onPress={() => props?.navigation.closeDrawer()}
          color={colors.white}
          size={23}
        />
        <TouchableOpacity
          style={{flexDirection: 'row', display: 'flex', paddingHorizontal: 10}}
          onPress={() => props?.navigation.navigate('Profile')}>
          <Image
            source={require('../../Images/user_avatar.png')}
            style={{
              width: SCREEN_WIDTH / 8,
              height: SCREEN_HEIGHT / 15,
              borderRadius: 50,
              borderWidth: 3,
              borderColor: '#AF8DEB',
            }}
          />
          <Text
            style={{
              fontSize: SCREEN_HEIGHT / 40,
              fontWeight: 'bold',
              top: 10,
              left: SCREEN_WIDTH / 50,
              color: colors.white,
            }}>
            nimra@gmail.com
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{flex: 0.9, borderBottomColor: 'black', borderWidth: 1}}>
        <FlatList
          data={UserListOfDrawerItems}
          renderItem={renderItem}></FlatList>
      </View>
      <TouchableOpacity
        style={{position: 'absolute', bottom: 30, left: SCREEN_WIDTH / 4.5}}
        onPress={() => props?.navigation.navigate('Login')}>
        <Text style={{fontSize: 18, fontWeight: 'bold'}}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};
export default UserDrawerCustom;
const styles = StyleSheet.create({});
