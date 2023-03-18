import React from 'react';
import {
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Text,
  FlatList,
  View,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import FIcon from 'react-native-vector-icons/Feather';
import {colors} from '../../commons/Colors';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../components/units';
import {color} from 'react-native-reanimated';

const DetailsScreen = ({navigation, route}) => {
  //   const item = route.params;
  const ANIMAL_NAMES = [
    {
      id: 1,
      name: '30 mins',
      selected: true,
    },
    {
      id: 2,
      name: '1 hour',
      selected: false,
    },
    {
      id: 3,
      name: '1.5 hours',
      selected: false,
    },
    {
      id: 4,
      name: '2 hours',
      selected: false,
    },
    {
      id: 5,
      name: 'Cow',
      selected: false,
    },
    {
      id: 6,
      name: 'Deer',
      selected: false,
    },
    {
      id: 7,
      name: 'Horse',
      selected: false,
    },
  ];
  const Security = [
    {
      id: 1,
      icon: 'camera',
      name: 'Location With Camera ',
      selected: false,
    },
    {
      id: 2,
      icon: 'camera-off',
      name: 'Location Without Camera',
      selected: false,
    },
  ];

  const [selectedSecurity, setSelectedSecurity] = React.useState(null);

  const handleSecuritySelection = (name) => {
    setSelectedSecurity(name);
  };

  const ItemRender = ({name, selected}) => (
    <TouchableOpacity style={selected == true ? style.item2 : style.item}>
      <Text style={selected == true ? style.itemText2 : style.itemText}>
        {name}
      </Text>
    </TouchableOpacity>
  );

  const SecurityOptions = ({name, selected, icon}) => (
    <TouchableOpacity style={selectedSecurity == name ? style.item2 : style.item}
    onPress={() => handleSecuritySelection(name)}
    >
      <FIcon
        name={icon}
        size={25}
        color={selectedSecurity == name ? 'white' : 'black'}
      />
    </TouchableOpacity>
  );

  const Separator = () => {
    return (
      <View
        style={{
          height: 50,
          width: 10,

          backgroundColor: 'white',
        }}
      />
    );
  };
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        backgroundColor: 'white',
        paddingBottom: 70,
      }}>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="rgba(0,0,0,0)"
      />
      <ImageBackground
        style={style.headerImage}
        source={require('../../Images/parking.jpeg')}>
        <View style={style.header}>
          <TouchableOpacity
            style={{
              backgroundColor: colors.themeColor,
              width: 50,
              height: 50,
              borderColor: 'black',
              borderRadius: 15,
              borderLeftWidth: 2,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => console.log('object2')}>
            <FIcon
              name="phone-call"
              size={28}
              color={'white'}
              // onPress={navigation.goBack}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: colors.themeColor,
              width: 50,
              height: 50,
              borderColor: 'black',
              borderRadius: 15,
              borderLeftWidth: 2,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => console.log('object')}>
            <Icon name="place" size={28} color={'white'} />
          </TouchableOpacity>
        </View>
      </ImageBackground>
      <View>
        <View
          style={{marginTop: 20, paddingHorizontal: 10, flexDirection: 'row'}}>
          <Icon name="place" size={25} color={'red'} />
          <Text
            style={{
              fontSize: 23,
              fontWeight: '600',
              color: colors.themeColor,
              marginBottom: 15,
            }}>
            Korangi Crossing
          </Text>
        </View>
        <View>
          <Text style={{fontWeight: 'bold', fontSize: 18, marginLeft: 15}}>
           Industrial Area, Karachi
          </Text>
          <View style={{flexDirection: 'row', marginLeft: 15}}>
            <Icon name="star" size={25} color={'orange'} />
            <Icon name="star" size={25} color={'orange'} />
            <Icon name="star" size={25} color={'orange'} />
            <Icon name="star" size={25} color={'orange'} />
            <Icon name="star" size={25} color={'orange'} />
          </View>
        </View>
        <View style={{marginTop: 23, paddingHorizontal: 20}}>
          <Text
            style={{
              fontSize: 25,
              fontWeight: '600',
              color: colors.themeColor,
              marginBottom: 15,
            }}>
            Parking Rates
          </Text>
          <ScrollView>
            <FlatList
              data={ANIMAL_NAMES}
              renderItem={({item}) => (
                <ItemRender name={item.name} selected={item.selected} />
              )}
              keyExtractor={item => item.id}
              ItemSeparatorComponent={Separator}
              horizontal={true}
            />
          </ScrollView>

          <View
            style={{
              marginTop: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View style={{flexDirection: 'row'}}>
              <View style={{flexDirection: 'row'}}>
                {/* <Icon name="star" size={20} color={'orange'} />
                <Icon name="star" size={20} color={COLORS.orange} />
                <Icon name="star" size={20} color={COLORS.orange} />
                <Icon name="star" size={20} color={COLORS.orange} />
                <Icon name="star" size={20} color={COLORS.grey} /> */}
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            marginTop: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingLeft: 20,
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 23,
              fontWeight: '600',
              color: colors.themeColor,
              marginTop: 20,
            }}>
            Payment Accepted
          </Text>

          <View style={style.priceTag}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: 'white',
              }}>
              $200
            </Text>
          </View>
        </View>
        <View style={{marginTop: 20, paddingHorizontal: 20}}>
          <ScrollView>
            <FlatList
              data={ANIMAL_NAMES}
              renderItem={({item}) => (
                <ItemRender name={item.name} selected={item.selected} />
              )}
              keyExtractor={item => item.id}
              ItemSeparatorComponent={Separator}
              horizontal={true}
            />
          </ScrollView>
        </View>
      </View>
      <View style={{marginTop: 23, paddingHorizontal: 20}}>
        <Text
          style={{
            fontSize: 25,
            fontWeight: '600',
            color: colors.themeColor,
            marginBottom: 15,
          }}>
          Security
        </Text>
        <ScrollView>
          <FlatList
            data={Security}
            renderItem={({item}) => (
              <SecurityOptions
                name={item.name}
                selected={item.selected}
                icon={item.icon}
              />
            )}
            keyExtractor={item => item.id}
            ItemSeparatorComponent={Separator}
            horizontal={true}
          />
        </ScrollView>

        <View
          style={{
            marginTop: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row'}}>
            <View style={{flexDirection: 'row'}}>
              {/* <Icon name="star" size={20} color={'orange'} />
                <Icon name="star" size={20} color={COLORS.orange} />
                <Icon name="star" size={20} color={COLORS.orange} />
                <Icon name="star" size={20} color={COLORS.orange} />
                <Icon name="star" size={20} color={COLORS.grey} /> */}
            </View>
          </View>
        </View>
        <View style={style.btn}>
          <Text style={{color:'white', fontSize: 18, fontWeight: 'bold'}}>
            Book Now
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  btn: {
    height: 55,
    width: SCREEN_WIDTH / 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    left: SCREEN_WIDTH / 6.5,   
    marginBottom: 70,
    backgroundColor: colors.themeColor,
    marginHorizontal: 20,
    borderRadius: 10,
  },

  priceTag: {
    height: 40,
    alignItems: 'center',
    marginLeft: SCREEN_WIDTH / 5,
    paddingLeft: 20,
    flex: 1,
    backgroundColor: colors.themeColor,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    flexDirection: 'row',
  },
  iconContainer: {
    position: 'absolute',
    height: 60,
    backgroundColor: 'grey',
    top: -30,
    right: 20,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerImage: {
    height: 250,
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
    overflow: 'hidden',
  },
  header: {
    marginTop: 190,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 30,
    justifyContent: 'flex-start',
  },
  MainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },

  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 12,
  },

  item: {
    padding: 8,

    width: 120,
    height: 80,

    borderColor: '#c0c0c0',
    borderRadius: 5,

    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item2: {
    padding: 8,

    width: 120,
    height: 80,
    backgroundColor: colors.themeColor,

    borderColor: '#c0c0c0',
    borderRadius: 5,

    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  itemText: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
  },

  itemText2: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
});

export default DetailsScreen;
