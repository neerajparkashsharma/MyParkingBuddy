import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import React, { useEffect, useState } from 'react';
import {
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Text,
  FlatList,
  View,
  TouchableWithoutFeedback,
  TimePickerAndroid,
  Button,
  Image,
  TextInput,
  Linking,
  ActivityIndicator,
} from 'react-native';
import moment from 'moment';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FIcon from 'react-native-vector-icons/Feather';
import FontIcon from 'react-native-vector-icons/FontAwesome';

import { colors } from '../../commons/Colors';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../../components/units';
import Headerx from '../../components/header';
import axios from 'axios';
import url from '../../commons/axiosUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Calendar, LocaleConfig } from 'react-native-calendars';
import { useIsFocused } from '@react-navigation/native';
import { useRef } from 'react';



const PaymentBookingConfirmation = (props) => {

  const buttonTextStyle = {
    display: 'hidden',
  };

  const isFocused = useIsFocused();
  const [calenderLoading, setCalenderLoading] = useState(true);
  const [data, setData] = React.useState([]);
  const id = props.route.params?.id;
  const [booked, setBooked] = useState([]);
  const [selectedDates, setSelectedDates] = useState([]);

  const currentDate = moment().format('YYYY-MM-DD');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${url}parking_dates_occupied/${id}`);
        const { data } = response;
        console.log(data, 'data');
        const bookedDates = data.map((item) => moment(item.bookingDate).format('YYYY-MM-DD'));
        console.log(bookedDates, 'bookedDates');
        setBooked(bookedDates);
        setCalenderLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 60000);
    return () => {
      clearInterval(interval);
    };
  }, [id]);


  useEffect(() => {
    axios
      .get(`${url}parking/${id}`)
      .then(res => {
        console.log(res.data);
        setData(res?.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [isFocused]);


  const handleBooking = async () => {
    try {
      const userId = await AsyncStorage.getItem('userdata');
      const payload = {
        parkingId: data?.id,
        customerId: userId,
        bookingDates: selectedDates,
      }
      // const response = await axios.post(`${url}book-parking`, payload);

      // if(response.data === 'Parking Booked Successfully'){
      //   alert('Parking Booked Successfully');
      //   props?.navigation.navigate('Home');
      // }
      // else{
      //   alert('Parking Already Booked');
      //   props?.navigation.navigate('Home');
      // }
      setBooked(null);
      setSelectedDates([]);
      setData(null);

      // axios.post(`${url}book-parking`, payload).then(
      //   res => {
      //     console.log(res.data);
      //     if (res.data === 'Parking Booked Successfully')
      //       alert('Parking Booked Successfully');
      //     props?.navigation.navigate('Home');
      //   }


      // ).catch(err => {
      //   setError(err.response.data);


      // }
      // )

    } catch (error) {
      console.error(error);
    }
  };

  const handleDateSelect = (date) => {
    const updatedDates = [...selectedDates];
    if (selectedDates.includes(date)) {
      // Date already selected, remove it
      const index = updatedDates.indexOf(date);
      updatedDates.splice(index, 1);
    } else {
      // Date not selected, add it
      updatedDates.push(date);
    }
    setSelectedDates(updatedDates);
  };

  const getMarkedDates = (dates) => {
    const markedDates = {};
    booked?.forEach((date) => {
      markedDates[date] = {
        disabled: true, disableTouchEvent: true, dotColor: 'red', selectedDotColor: 'red', selected: false,
        selectedColor: 'red'
      };
    });
    dates?.forEach((date) => {
      markedDates[date] = { selected: true, selectedColor: colors.themeColor };
    });
    return markedDates;
  };


  const [showCardList, setShowCardList] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [cardList, setCardList] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cardNumber, setCardNumber] = useState('');
  const [cardholderName, setCardholderName] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [cvv, setCVV] = useState('');
  const [cardNumberError, setCardNumberError] = useState('');
  const [cardholderNameError, setCardholderNameError] = useState('');
  const [expirationDateError, setExpirationDateError] = useState('');
  const [cvvError, setCVVError] = useState('');
  const [showActivityIndicator, setShowActivityIndicator] = useState(false);


  // Method for handling cardholder name change
  const handleCardholderNameChange = (cardholderName) => {
    // Update the state variable for cardholder name
    setCardholderName(cardholderName);
  };

  // Method for handling expiration date change
  const handleExpirationDateChange = (expirationDate) => {
    // Update the state variable for expiration date
    setExpirationDate(expirationDate);
  };

  // Method for handling CVV change
  const handleCVVChange = (cvv) => {
    // Update the state variable for CVV
    setCVV(cvv);
  };

  // Event handlers
  const handleUseExistingCard = () => {
    setShowCardList(true);
    setShowPaymentForm(false);
  };

  const handleAddNewCard = () => {
    setShowCardList(false);
    setShowPaymentForm(true);
  };

  const handleSelectCard = (cardId) => {
    setSelectedCard(cardId);
  };

  const handleCardNumberChange = (value) => {
    setCardNumber(value);
  };

  const handleSubmitPayment = () => {
    // Perform validation on the entered card details
    let isValid = true;
    if (cardNumber === '') {
      setCardNumberError('Please enter card number');
      isValid = false;
    } else {
      setCardNumberError('');
    }

    if (cardholderName === '') {
      setCardholderNameError('Please enter cardholder name');
      isValid = false;
    } else {
      setCardholderNameError('');
    }

    if (expirationDate === '') {
      setExpirationDateError('Please enter expiration date');
      isValid = false;
    } else {
      setExpirationDateError('');
    }

    if (cvv === '') {
      setCVVError('Please enter CVV');
      isValid = false;
    } else {
      setCVVError('');
    }

    if (isValid) {


      const payload = {
        number: cardNumber,
        cardholderName: cardholderName,
        expiryDate: expirationDate,
        cvv: cvv,
      };

      axios.post(`${url}CardDetails`, payload).then(
        res => {
          console.log(res.data);
        }
      ).catch(err => {
        console.log(err.response.data);
      })

      setShowActivityIndicator(true);

      setTimeout(() => {
        setShowActivityIndicator(false);

        setCardNumber('');
        setCardholderName('');
        setExpirationDate('');
        setCVV('');

        alert('Payment submitted successfully!');
      }, 2000);
    }
  };

  const mockCardList = [
    {
      id: 1,
      image: require('../../Images/card1.png'),
      number: '**** **** **** 1234',
      expiry: 'Expires 12/24',
    },
    {
      id: 2,
      image: require('../../Images/card2.png'),
      number: '**** **** **** 5678',
      expiry: 'Expires 06/25',
    },
    {
      id: 3,
      image: require('../../Images/card5.png'),
      number: '**** **** **** 9012',
      expiry: 'Expires 09/26',
    },
  ];


  const [userId, setUserId] = useState();
  useEffect(() => {
    AsyncStorage.getItem('userId').then(
      res => {
        setUserId(res);
      }
    ).catch(err => {
      console.log(err.response.data);
    }
    )
  }, []);

  useEffect(() => {
    

    // Fetch card list from API
    axios.get(`${url}CardDetails/user/${userId}`).then(
      res => {
       setCardList(res.data);
      }
    ).catch(err => {
      console.log(err.response.data);
    }
    )
  }, []);

  const progressStepsRef = useRef(null);

  const handleGoBack = () => {
    progressStepsRef.current?.goToPrevious();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={handleGoBack}>
        <Icon name="arrow-back" size={28} color={colors.themeColor} />
      </TouchableOpacity>

      <ProgressSteps
        activeStepIconBorderColor={colors.themeColor}
        progressBarColor={colors.gray}
        completedProgressBarColor={colors.themeColor}
        completedStepIconColor={colors.themeColor}
        activeLabelColor={colors.themeColor}
        completedLabelColor={colors.themeColor}
        disabledStepNumColor={colors.themeColor}
        activeStepNumColor={colors.white}
        completedStepNumColor={colors.themeColor}
        labelColor={colors.themeColor}
        activeStepIconColor={colors.themeColor}
        disabledStepIconBorderColor={colors.themeColor}
        ref={progressStepsRef}

      >
        <ProgressStep label="Parking Details" nextButtonStyle={buttonTextStyle}>
          <ScrollView>
            <View style={styles.header}>
              <TouchableOpacity
                style={styles.iconContainer}
                onPress={() => Linking.openURL(`tel:${data?.contactNumber}`)}
              >
                <FIcon name="phone-call" size={28} color={'white'} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.iconContainer}
                onPress={() =>
                  Linking.openURL(
                    `https://www.google.com/maps/dir/?api=1&destination=${data?.latitude},${data?.longitude}`
                  )
                }
              >
                <Icon name="place" size={28} color={'white'} />
              </TouchableOpacity>
            </View>
            <View style={styles.locationContainer}>
              <View style={styles.locationIconContainer}>
                <Icon name="location-on" size={25} color={colors.themeColor} />
              </View>
              <View style={styles.locationTextContainer}>
                <Text style={styles.locationText}>{data?.parkingLocation}</Text>
                <View style={styles.descriptionContainer}>
                  <Text style={styles.descriptionText}>
                    <Icon name="info" size={14} color="gray" /> Conveniently located near the city center, this parking place offers a secure and hassle-free parking solution for your vehicle. With 24/7 surveillance and well-lit surroundings, you can park your car with peace of mind. Our dedicated staff is always available to assist you with any parking-related needs. Whether you're visiting for work or leisure, this parking place provides easy access to nearby attractions, shopping centers, and public transportation. Reserve your spot today and enjoy a seamless parking experience.
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.selectDatesContainer}>
              <Text style={styles.selectDatesText}>Select Dates</Text>
              <View style={styles.calendarContainer}>
                <Calendar
                  theme={{
                    selectedDayBackgroundColor: colors.themeColor,
                    monthTextColor: colors.themeColor,
                    todayTextColor: colors.themeColor,
                    arrowColor: colors.themeColor,
                    monthTextFontSize: 20,
                    dayTextColor: colors.themeColor,
                    disabledArrowColor: colors.themeColor,
                    textDayFontWeight: 'bold',
                    textMonthFontWeight: 'bold',
                    textDayHeaderFontWeight: 'bold',
                    textDayFontSize: 16,
                    textMonthFontSize: 16,
                    textDayHeaderFontSize: 16,
                  }}
                  disableAllTouchEventsForDisabledDays={true}
                  minDate={currentDate}
                  markedDates={getMarkedDates(selectedDates)}
                  onDayPress={(day) => handleDateSelect(day.dateString)}
                  hideExtraDays={true}
                  showWeekNumbers={true}
                  hideDayNames={false}
                />
              </View>
            </View>
            <View style={styles.bookNowContainer}>
              <TouchableOpacity style={styles.btn} onPress={handleBooking}>
                <Text style={styles.btnText}>Book Now</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </ProgressStep>
        <ProgressStep label="Payment Details">
          <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.paymentContainer}>
              <Text style={styles.paymentHeading}>Payment Method</Text>
              <View style={styles.paymentMethodContainer}>
                {/* Option 1: Use Existing Card */}
                <TouchableOpacity
                  style={[
                    styles.paymentOptionContainer,
                    showCardList && styles.selectedPaymentOptionContainer,
                  ]}
                  onPress={handleUseExistingCard}
                >
                  <View style={styles.paymentOptionIconContainer}>
                    <FontIcon name="credit-card" size={28} color={showCardList ? '#FFFFFF' : '#333333'} />
                  </View>
                  <Text
                    style={[
                      styles.paymentOptionText,
                      showCardList && styles.selectedPaymentOptionText,
                    ]}
                  >
                    Use Existing Card
                  </Text>
                </TouchableOpacity>
                {/* Option 2: Add New Card */}
                <TouchableOpacity
                  style={[
                    styles.paymentOptionContainer,
                    showPaymentForm && styles.selectedPaymentOptionContainer,
                  ]}
                  onPress={handleAddNewCard}
                >
                  <View style={styles.paymentOptionIconContainer}>
                    <FontIcon name="plus-circle" size={28} color={showPaymentForm ? '#FFFFFF' : '#333333'} />
                  </View>
                  <Text
                    style={[
                      styles.paymentOptionText,
                      showPaymentForm && styles.selectedPaymentOptionText,
                    ]}
                  >
                    Add New Card
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {showCardList && (
              <View style={styles.cardListContainer}>
                <Text style={styles.cardListHeading}>Saved Cards</Text>
                {cardList.map((card) => (
                  <TouchableOpacity
                    key={card?.id}
                    style={[
                      styles.savedCardContainer,
                      selectedCard === card?.id && styles.selectedCardContainer,
                    ]}
                    onPress={() => handleSelectCard(card?.id)}
                  >
                    <Image source={card?.image} style={styles.savedCardImage} />
                    <View style={styles.savedCardDetails}>
                      <Text style={styles.savedCardNumber}>{card?.number}</Text>
                      <Text style={styles.savedCardExpiry}>{card?.expiryDate}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {showPaymentForm && (
              <View style={styles.paymentFormContainer}>
                <Text style={styles.paymentFormHeading}>Payment Details</Text>

                <View style={styles.inputFieldContainer}>
                  <FontIcon name="credit-card" size={20} color="#999999" style={styles.inputFieldIcon} />
                  <TextInput
                    style={styles.inputField}
                    placeholder="Card Number"
                    onChangeText={handleCardNumberChange}
                  />
                </View>

                <View style={styles.inputFieldContainer}>
                  <FontIcon name="user" size={20} color="#999999" style={styles.inputFieldIcon} />
                  <TextInput
                    style={styles.inputField}
                    placeholder="Cardholder Name"
                    onChangeText={handleCardholderNameChange}
                  />
                </View>

                <View style={styles.inputFieldContainer}>
                  <FontIcon name="calendar" size={20} color="#999999" style={styles.inputFieldIcon} />
                  <TextInput
                    style={styles.inputField}
                    placeholder="Expiration Date (MM/YY)"
                    onChangeText={handleExpirationDateChange}
                  />
                </View>

                <View style={styles.inputFieldContainer}>
                  <FontIcon name="lock" size={20} color="#999999" style={styles.inputFieldIcon} />
                  <TextInput
                    style={styles.inputField}
                    placeholder="CVV"
                    onChangeText={handleCVVChange}
                    secureTextEntry
                  />
                </View>

                <TouchableOpacity style={styles.submitButton} onPress={handleSubmitPayment}>
                  <Text style={styles.submitButtonText}>Submit Payment</Text>
                </TouchableOpacity>
              </View>
            )}
          </ScrollView>
        </ProgressStep>


        <ProgressStep label="Third Step">
          <View style={styles.stepContainer}>
            <Text>This is the content within step 3!</Text>
          </View>
        </ProgressStep>
      </ProgressSteps>
    </View>
  );

};

export default PaymentBookingConfirmation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 10,
    padding: 10,
  },
  backButtonIcon: {
    fontSize: 28,
    color: colors.themeColor,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  iconContainer: {
    backgroundColor: colors.themeColor,
    width: 50,
    height: 50,
    borderRadius: 25,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  priceTag: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.themeColor,
    borderRadius: 12,
  },
  priceText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  locationIconContainer: {
    marginRight: 10,
    marginTop: 2,
  },
  locationTextContainer: {
    flex: 1,
  },
  locationText: {
    color: colors.themeColor,
    fontSize: 16,
    fontWeight: 'bold',
  },
  descriptionContainer: {
    marginTop: 5,
  },
  descriptionText: {
    color: 'gray',
    fontSize: 14,
  },
  selectDatesContainer: {
    marginTop: 23,
    paddingHorizontal: 20,
  },
  selectDatesText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: colors.themeColor,
  },
  calendarContainer: {
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
  },
  bookNowContainer: {
    marginTop: 23,
    paddingHorizontal: 20,
  },
  btn: {
    height: 55,
    width: SCREEN_WIDTH / 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    alignSelf: 'center',
    marginBottom: 70,
    backgroundColor: colors.themeColor,
    borderRadius: 10,
  },
  btnText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  stepContainer: {
    alignItems: 'center',
  },
  paymentContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  paymentHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  paymentMethodContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  paymentOptionContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: colors.themeColor,
    marginHorizontal: 5,
  },


  selectedPaymentOptionContainer: {
    backgroundColor: colors.themeColor,
    borderColor: colors.themeColor,
  },
  paymentOptionIconContainer: {
    marginRight: 5,
  },
  paymentOptionText: {
    fontSize: 15,
    color: '#333333',
  },
  selectedPaymentOptionText: {
    color: '#FFFFFF',
  },
  cardListContainer: {
    marginBottom: 20,
    marginLeft: 20,
    width: '90%',
  },
  cardListHeading: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,

  },
  savedCardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#CCCCCC',
    marginBottom: 10,
    width: '100%', // Set the width to 100%
    margin: 5, // Add some margin left and right
  },

  selectedCardContainer: {
    backgroundColor: colors.themeColor,
    borderColor: colors.themeColor,
  },
  savedCardImage: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  savedCardDetails: {
    flex: 1,
  },
  savedCardNumber: {
    fontSize: 16,
  },
  savedCardExpiry: {
    fontSize: 14,
    color: '#999999',
  },
  paymentFormContainer: {
    marginBottom: 20,
  },
  paymentFormHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    left: 25,
  },
  inputFieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    width: '95%',

  },
  inputFieldIcon: {
    margin: 10,
  },
  inputField: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#CCCCCC',
    paddingLeft: 10,
    margin: 5,
  },
  submitButton: {
    backgroundColor: colors.themeColor,
    paddingVertical: 12,
    width: '70%',
    // paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: 'center',
  },
  submitButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center'
  },

});