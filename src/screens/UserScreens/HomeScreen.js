import * as React from 'react';
import {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import categoriesData from '../assets/data/categoriesData';
// import popularData from '../assets/data/popularData';
import {colors} from '../../commons/Colors';
import {color, round} from 'react-native-reanimated';
import url from '../../commons/axiosUrl';
import axios from 'axios';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../components/units';

Feather.loadFont();
MaterialCommunityIcons.loadFont();

export default Home = props => {
  const [listOfBookings, setListOfBookings] = useState([]);
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('userdata');

      if (value !== null) {
        //  {console.log("userid"+userid)}

        axios
          .get(url + 'parkingBookingRecords/customer/' + 45)

          .then(function (response) {
            console.log('object');
            setListOfBookings(response.data);
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    } catch (e) {
      alert(e);
      // error reading value
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const NavItems = [
    {
      id: 1,
      name: 'Find Parking',
      image: require('../../Images/icons8-parking-100.png'),
      screen: 'MyMap',
    },
    {
      id: 2,
      name: 'Your Wallet',
      image: require('../../Images/icons8-digital-wallet-100.png'),
      screen: 'EWallet',
    },
    // ,
    // {
    //   id: 3,
    //   name: 'Contact Us',
    //   image: require('../../Images/supporticon.png'),
    // },
  ];

  const categoriesData = [
    {
      id: 1,
    },
    {
      id: 2,
    },
    {
      id: 3,
    },
  ];
  const renderCategoryItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => props.navigation.navigate(item.screen)}
        style={[
          styles.categoryItemWrapper,
          {
            backgroundColor: item.selected ? colors.themeColor : colors.white,
            marginLeft: item.id == 1 ? 20 : 0,
          },
        ]}>
        <Image source={item.image} style={styles.categoryItemImage} />
        <Text style={styles.categoryItemTitle}>{item.name} </Text>
        <View
          style={[
            styles.categorySelectWrapper,
            {
              backgroundColor: item.selected ? colors.white : colors.themeColor,
            },
          ]}>
          <Feather
            name="chevron-right"
            size={13}
            style={styles.categorySelectIcon}
            color={item.selected ? colors.black : colors.white}
          />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}>
        {/* Header */}
        <SafeAreaView>
          <View style={styles.headerWrapper}>
            {console.log(props)}
            <TouchableOpacity onPress={() => props?.navigation?.openDrawer()}>
              <Feather name="menu" size={24} color={colors.black} />
            </TouchableOpacity>
            <Image
              source={require('../../Images/user_avatar.png')}
              style={styles.profileImage}
            />
          </View>
        </SafeAreaView>

        <View style={styles.titlesWrapper}>
          <Text style={styles.titlesSubtitle}>Find</Text>
          <Text style={styles.titlesTitle}>PARKINGS</Text>
        </View>

        {/* <View style={styles.searchWrapper}>
          <Feather name="search" size={16} color={colors.black} />
          <View style={styles.search}>
            <Text style={styles.searchText}>Search</Text>
          </View>
        </View> */}

        <View style={styles.categoriesWrapper}>
          <Text style={styles.categoriesTitle}>Categories</Text>
          <View style={styles.categoriesListWrapper}>
            <FlatList
              data={NavItems}
              renderItem={renderCategoryItem}
              keyExtractor={item => item.id}
              horizontal={true}
            />
          </View>
        </View>

        <View style={styles.popularWrapper}>
          <Text style={styles.popularTitle}>Your Bookings</Text>
          {listOfBookings.map(item => (
            <TouchableOpacity key={item.id}>
              <View
                style={[
                  styles.popularCardWrapper,
                  {
                    marginTop: item.id == 1 ? 10 : 20,
                  },
                ]}>
                <View>
                  <View>
                    <View style={styles.popularTopWrapper}>
                      <MaterialCommunityIcons
                        name="crown"
                        size={12}
                        color={colors.primary}
                      />
                      <Text style={styles.popularTopText}>
                        Details: {item.parking.description}
                      </Text>
                    </View>
                    <View style={styles.popularTitlesWrapper}>
                      <Text style={styles.popularTitlesTitle}>
                        {item.parking.parkingLocation}
                      </Text>
                      <Text style={styles.popularTitlesWeight}>
                        {/* PKR120/hour */}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.popularCardBottom}>
                    <View style={styles.addPizzaButton}>
                      <Text
                        style={[
                          styles.popularTitlesTitle,
                          {fontWeight: 'bold', color: colors.white},
                        ]}>
                        PKR120/hour
                      </Text>
                    </View>
                    <View style={styles.ratingWrapper}>
                      {/* <MaterialCommunityIcons
                        name="star"
                        size={10}
                        color={colors.black}
                      /> */}

                      <View>
                        <TouchableOpacity>
                          <Text style={{color: colors.themeColor}}>
                            Check In
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                          <Text style={{color: colors.themeColor}}>
                            Check Out
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>

                <View style={styles.popularCardRight}>
                  <Image source={item.image} style={styles.popularCardImage} />
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    alignItems: 'center',
  },
  profileImage: {
    width: SCREEN_WIDTH / 20,
    height: SCREEN_HEIGHT / 20,
    borderRadius: 4,
  },
  titlesWrapper: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  titlesSubtitle: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
    color: colors.themeColor,
    fontWeight:'700'
  },
  titlesTitle: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 32,
    color: colors.textDark,
    marginTop: 5,
    fontWeight:'500'
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 30,
  },
  search: {
    flex: 1,
    marginLeft: 10,
    borderBottomColor: colors.textLight,
    borderBottomWidth: 2,
  },
  searchText: {
    fontFamily: 'Montserrat-Semibold',
    fontSize: 14,
    marginBottom: 5,
    color: colors.textLight,
  },
  categoriesWrapper: {
    marginTop: 30,
  },
  categoriesTitle: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 16,
    paddingHorizontal: 20,
  },
  categoriesListWrapper: {
    paddingTop: 15,
    paddingBottom: 20,
  },
  categoryItemWrapper: {
    backgroundColor: '#F5CA48',
    marginRight: 20,
    borderRadius: 20,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  categoryItemImage: {
    width: 90,
    height: 90,
    marginTop: 25,
    alignSelf: 'center',
    marginHorizontal: 20,
  },
  categoryItemTitle: {
    textAlign: 'center',
    fontFamily: 'Montserrat-Medium',
    fontSize: 14,
    marginTop: 10,
  },
  categorySelectWrapper: {
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 20,
    width: 26,
    height: 26,
    borderRadius: 26,
    marginBottom: 20,
  },
  categorySelectIcon: {
    alignSelf: 'center',
  },
  popularWrapper: {
    paddingHorizontal: 20,
  },
  popularTitle: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 16,
  },
  popularCardWrapper: {
    backgroundColor: colors.white,
    borderRadius: 25,
    paddingTop: 20,
    paddingLeft: 20,
    flexDirection: 'row',
    overflow: 'hidden',
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  popularTopWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  popularTopText: {
    marginLeft: 10,
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
  },
  popularTitlesWrapper: {
    marginTop: 20,
  },
  popularTitlesTitle: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
    color: colors.textDark,
  },
  popularTitlesWeight: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 12,
    color: colors.textLight,
    marginTop: 5,
  },
  popularCardBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginLeft: -20,
  },
  addPizzaButton: {
    backgroundColor: colors.themeColor,
    paddingHorizontal: 40,
    paddingVertical: 20,
    borderTopRightRadius: 25,
    borderBottomLeftRadius: 25,
  },
  ratingWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
  },
  rating: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 12,
    color: colors.textDark,
    marginLeft: 5,
  },
  popularCardRight: {
    marginLeft: 40,
  },
  popularCardImage: {
    width: 210,
    height: 125,
    resizeMode: 'contain',
  },
});
