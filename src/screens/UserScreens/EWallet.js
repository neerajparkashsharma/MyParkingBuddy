import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  Modal,
  TextInput,
  ActivityIndicator,
  Button,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {colors} from '../../commons/Colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {SCREEN_WIDTH, SCREEN_HEIGHT} from '../../components/units';
import PaymentCard from '../../components/PaymentCard';
import CreditCard from '../../components/CreditCard';
import Headerx from '../../components/header';
import url from '../../commons/axiosUrl';
import axios from 'axios';
const {width} = Dimensions.get('window');

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { color } from 'react-native-reanimated';

const EWallet = props => {
  const [isModalVisible, setModalVisible] = useState(false);

  [listOfBookings, setListOfBookings] = useState([]);

  const [isLoading, setLoading] = useState(true);
  const [userid, setUserid] = useState();
  const [cardNum, setCardNum] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardExp, setCardExp] = useState('');
  const [cardCvv, setCardCvv] = useState('');

  const handleClick = async () => {
    //validation
    if (cardNum == '' || cardName == '' || cardCvv == '') {
      alert('Please fill all the fields');
      return false;
    } else {
      axios
        .post(
          url + 'CardDetails/',
          {
            number: cardNum,
            accountTitle: cardName,
            cvv: cardCvv,
            amount: 500,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        )
        .then(response => {
          if (response.data == 'Card not found') {
            alert('card not found!');
          } else {
            alert('card added successfully!');
            navigation.navigate('Map');
          }
        })
        .catch(error =>
          alert(
            error.response.status == 404
              ? 'Invalid Credentials'
              : 'Something went wrong',
          ),
        );
    }
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('userdata');

      if (value !== null) {
        setUserid(value);
        console.log('> } > >  > ' + value);

        axios
          .get(url + 'parkingBookingRecords/customer/' + value)

          .then(function (response) {
            setLoading(false);
            console.log(response);
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

  // const {subTotal, totalPrice, deliveryPrice} = route.params.basketParams;

  const toggleModalVisibility = () => {
    setModalVisible(!isModalVisible);
  };

  const payments = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'Credit Card',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91a2a97f63w',
      title: 'Cash on visit',
    },
  ];
  const creditCards = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'mastercard',
      number: '2768',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'visa',
      number: '7896',
    },
  ];

  const [selectedPayment, setSelectedPayment] = useState(payments[0].id);

  const renderPayemtCard = ({item}) => (
    <PaymentCard
      item={item}
      selectedItem={selectedPayment}
      onPress={() => setSelectedPayment(item.id)}
    />
  );
  const renderCreditCard = ({item}) => <CreditCard card={item} />;
  const onClickBack = () => {
    navigation.goBack();
  };

  const handlePayFood = () => {
    //   payClearBasket(navigationOrderScreen);
  };
  const navigationOrderScreen = () => {
    //   navigation.replace(routes.DELIVERY);
  };

  if (isLoading) {
    return (
      <ActivityIndicator
        size="large"
        color="#0000ff"
        style={{alignSelf: 'center', flex: 1}}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Headerx navigation={props.navigation} headerName={'E-Wallet'} />
      <View style={styles.paymentContainer}>
        <Text style={styles.paymentText}>Wallet</Text>
        {/* <Text style={{fontSize: 30, color: colors.black}}>PKR 1200</Text> */}
      </View>

      <View style={EWalletStyles.popularCardWrapper}>
        <View>
          <View style={EWalletStyles.popularTopWrapper}>
            <Text style={EWalletStyles.popularTopText}>Wallet Balance</Text>
          </View>
          <View style={EWalletStyles.popularTitlesWrapper}>
            <Text style={EWalletStyles.popularTitlesTitle}>PKR 1200</Text>

            <TouchableOpacity
              onPress={toggleModalVisibility}
              style={{
               backgroundColor:colors.white,
                width: 120,
                height: 30,
left:240,
                borderRadius: 15,
                borderColor: 'black',
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  top: 5,
                  fontSize: 12,
                  fontWeight: 'bold',
                  color: colors.themeColor,
                }}>
                + Add Card
              </Text>
            </TouchableOpacity>

            <Text style={EWalletStyles.popularTitlesWeight}>
              {/* PKR120/hour */}
            </Text>
          </View>
        </View>
      </View>

      {/* <View style={{flexDirection: 'row',top:30}}>
       
       <View style={{left:70}}>
       <Image style={{width:70, height:70}} source={require('../../Images/creditcard.png')}/>
       <Text style={{fontWeight:'bold'}}>Send Money</Text>
       </View>
       <View style={{left:90}}>
       <Image style={{width:70, height:70}} source={require('../../Images/creditcard.png')}/>
       <Text style={{fontWeight:'bold'}}>Send Money</Text>
       </View>
       <View style={{left:110}}>      
        <Image style={{width:70, height:70}} source={require('../../Images/creditcard.png')}/>
        <Text style={{fontWeight:'bold'}}>Send Money</Text>
       </View>
 
      
     </View> */}

      {/* <View
        style={{alignContent: 'center', justifyContent: 'center', left: 25,top:30}}>
        <FlatList
          data={creditCards}
          renderItem={renderCreditCard}
          keyExtractor={(_, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          ListHeaderComponentStyle={styles.headerListStyle}
        />
      </View> 
   */}
      <ScrollView>
        <View style={styles.popularWrapper}>
          <Text style={styles.titlesTitle}>Recent Transactions</Text>

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
                      <Text style={styles.popularTopText}>
                        Transaction # {item.id}
                      </Text>
                    </View>
                    <View style={styles.popularTitlesWrapper}>
                      <Text style={styles.popularTitlesWeight}>
                        Parking Booking
                      </Text>

                      <Text style={styles.popularTitlesTitle}>
                        {item.parking.parkingLocation}
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
                        PKR 120
                      </Text>
                    </View>
                    <Text style={[styles.popularTopText, {left: 30}]}>
                      {' '}
                      12/Dec/2023, 12:30PM
                    </Text>
                    <View style={styles.ratingWrapper}>
                      {/* <MaterialCommunityIcons
                        name="star"
                        size={10}
                        color={colors.black}
                      /> */}

                      {/* <View>
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
                      </View> */}
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

      <Modal
        animationType="slide"
        transparent
        visible={isModalVisible}
        presentationStyle="overFullScreen"
        onDismiss={toggleModalVisibility}>
        <View style={styles.viewWrapper}>
          <View style={styles.modalView}>
            <Text style={{color: 'black', fontSize: 30}}>Add Card Details</Text>
            <TextInput
              placeholder="CARD NUMBER"
              placeholderTextColor={'grey'}
              value={cardNum}
              style={styles.textInput}
              onChangeText={value => setCardNum(value)}
            />

            <TextInput
              placeholder="ACCOUNT TITLE"
              placeholderTextColor={'grey'}
              value={cardName}
              style={styles.textInput}
              onChangeText={value => setCardName(value)}
            />

            <TextInput
              placeholder="CVV"
              placeholderTextColor={'grey'}
              value={cardCvv}
              style={styles.textInput}
              onChangeText={value => setCardCvv(value)}
            />

            <TextInput
              placeholder="EXPIRY DATE"
              placeholderTextColor={'grey'}
              value={cardExp}
              style={styles.textInput}
              onChangeText={value => setCardExp(value)}
            />

            <Button title="Submit" onPress={handleClick} />

            {/** This button is responsible to close the modal */}
            <Button title="Close" onPress={toggleModalVisibility} />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};
export default EWallet;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: SCREEN_HEIGHT / 34,
    marginHorizontal: SCREEN_WIDTH / 16,
  },
  topTitle: {
    color: colors.black,
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
  },
  addressContainer: {
    flexDirection: 'row',
    backgroundColor: colors.themeColor,
    paddingHorizontal: SCREEN_WIDTH / 15,
    paddingVertical: SCREEN_HEIGHT / 68,
    marginTop: SCREEN_HEIGHT / 51,
  },
  deliveryContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  addressText: {
    fontSize: 16,
    color: colors.white,
    fontWeight: '500',
    marginStart: SCREEN_WIDTH / 94,
  },
  timeContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    borderStartWidth: 1,
    borderStartColor: colors.black,
    marginStart: SCREEN_WIDTH / 15,
    paddingStart: SCREEN_WIDTH / 15,
  },
  paymentText: {
    color: colors.textDark,
    fontSize: 30,
    fontWeight: '600',
  },
  paymentContainer: {
    marginVertical: SCREEN_HEIGHT / 28,
    marginHorizontal: SCREEN_WIDTH / 15,
  },
  addCardContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.themeColor,
    borderRadius: 100,
    paddingHorizontal: SCREEN_WIDTH / 23,
    paddingVertical: SCREEN_HEIGHT / 51,
  },
  headerListStyle: {
    justifyContent: 'center',
    marginStart: SCREEN_WIDTH / 23,
  },
  bottomContainer: {
    marginHorizontal: SCREEN_WIDTH / 17,
    marginTop: SCREEN_HEIGHT / 20,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.black,
    paddingBottom: SCREEN_HEIGHT / 81,
  },
  priceTitle: {
    fontSize: 16,
    color: colors.black,
  },
  priceText: {
    fontSize: 19,
    color: colors.black,
    fontWeight: '500',
  },
  buttonContainer: {
    marginTop: SCREEN_HEIGHT / 50,
    marginHorizontal: SCREEN_WIDTH / 7,
    marginBottom: SCREEN_HEIGHT / 81,
  },
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  viewWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  modalView: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: '50%',
    left: '50%',
    elevation: 5,
    transform: [{translateX: -(width * 0.4)}, {translateY: -90}],
    height: 480,
    width: width * 0.8,
    backgroundColor: '#fff',
    borderRadius: 7,
  },
  textInput: {
    width: '80%',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderColor: 'rgba(0, 0, 0, 0.2)',
    borderWidth: 1,
    marginBottom: 8,
    color: 'black',
  },

  titlesWrapper: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  titlesSubtitle: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 34,
    color: colors.themeColor,
    fontWeight: 'bold',
  },
  titlesTitle: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 23,
    color: 'black',
    marginTop: 19,
    fontWeight: '700',
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
    borderRadius: 5,

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
    elevation: 28,
  },
  popularTopWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  popularTopText: {
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
    fontSize: 16,
    color: colors.themeColor,
    fontWeight: 'bold',
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
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 5,
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
const paymentcardstyles = StyleSheet.create({
  paymentMethodContainer: {
    marginTop: SCREEN_HEIGHT / 101,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  paymentMethodText: {
    fontSize: 16,
    color: colors.black,
    marginStart: SCREEN_WIDTH / 23,
  },
  radioButton: {
    borderWidth: 2,
    borderColor: colors.black,
    borderRadius: 100,
    justifyContent: 'center',
    minHeight: SCREEN_HEIGHT / 37,
    minWidth: SCREEN_WIDTH / 17,
    alignItems: 'center',
  },
  cardIconContainer: {
    borderRadius: 10,
    backgroundColor: colors.black,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SCREEN_WIDTH / 47,
    paddingVertical: SCREEN_HEIGHT / 90,
  },
  bodyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  viewWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  modalView: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: '50%',
    left: '50%',
    elevation: 5,
    transform: [{translateX: -(width * 0.4)}, {translateY: -90}],
    height: 480,
    width: width * 0.8,
    backgroundColor: '#fff',
    borderRadius: 7,
  },
  textInput: {
    width: '80%',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderColor: 'rgba(0, 0, 0, 0.2)',
    borderWidth: 1,
    marginBottom: 8,
    color: 'black',
  },
});

const EWalletStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 2,
  },
  item: {
    backgroundColor: '#613EEA',
    opacity: 0.8,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },

  txt: {
    color: 'white',
    fontSize: 17,
    fontWeight: 'bold',
  },

  popularWrapper: {
    paddingHorizontal: 20,
  },
  popularTitle: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 16,
  },
  popularCardWrapper: {
    backgroundColor: colors.themeColor,
    borderRadius: 5,
    height: SCREEN_HEIGHT / 4.5,
    paddingTop: 20,
    paddingLeft: 20,
    width: '95%',
    left: 10,
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
    fontWeight: '700',
    fontSize: 16,
    color: colors.white,
  },
  popularTitlesWrapper: {
    marginTop: 20,
  },
  popularTitlesTitle: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 30,
    fontWeight: '700',
    color: colors.white,
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
