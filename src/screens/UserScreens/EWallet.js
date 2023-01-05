import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    FlatList,
    TouchableOpacity,
    Image
    ,Dimensions,
    Modal,
    TextInput,
    Button
  } from 'react-native';
  import React, {useState, useEffect} from 'react';
 import {colors} from '../../commons/Colors';
  import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
  import {SCREEN_WIDTH,SCREEN_HEIGHT} from '../../components/units';
  import PaymentCard from '../../components/PaymentCard';
  import CreditCard from '../../components/CreditCard';
import Headerx from '../../components/header';
import url from '../../commons/axiosUrl';
import axios from 'axios';
const { width } = Dimensions.get("window");

  const EWallet = props => {
    const [isModalVisible, setModalVisible] = useState(false);
  
   
    const [cardNum, setCardNum] = useState("");
    const [cardName, setCardName] = useState("");
    const [cardExp, setCardExp] = useState("");
    const [cardCvv, setCardCvv] = useState("");

  

    const handleClick = async () => {
        //validation
        if (cardNum == '' || cardName == ''||cardCvv=='') {
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
                amount:500,
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
              }
    
             else{
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
        onPress={()=>setSelectedPayment(item.id)}
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
    return (
      <SafeAreaView style={styles.container}>
        
       <Headerx navigation={props.navigation} headerName={"E-Wallet"}/>
        <View style={styles.paymentContainer}>
          <Text style={styles.paymentText}>Your Wallet</Text>
          <Text style={{fontSize:30, color:colors.black}}>PKR 1200</Text>
     
        </View>
      
        <View style={{alignContent:'center', justifyContent:'center',left:25}}>
          <FlatList
            data={creditCards}
            renderItem={renderCreditCard}
            keyExtractor={(_, index) => index.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
           
            ListHeaderComponentStyle={styles.headerListStyle}
          />
        </View>
        <View style={styles.bottomContainer}>
          {/* <View style={styles.priceContainer}>
            <Text style={styles.priceTitle}>SubTotal:</Text>
            <Text style={styles.priceText}>12 $</Text>
          </View>
          <View style={[styles.priceContainer, {marginTop: SCREEN_HEIGHT / 81}]}>
            <Text style={styles.priceTitle}>Delivery:</Text>
            <Text style={styles.priceText}>12 $</Text>
          </View>
          <View style={[styles.priceContainer, {marginTop: SCREEN_HEIGHT / 81}]}>
            <Text style={styles.priceTitle}>Total:</Text>
            <Text style={styles.priceText}>13$</Text>
          </View> */}
          <View style={styles.buttonContainer}>
        <TouchableOpacity 
        onPress={toggleModalVisibility}
        style={{backgroundColor:colors.themeColor,width:180,height:60,left:50,borderRadius:15,borderColor:'black'}}>
            <Text style={{textAlign:'center',marginTop:15,fontSize:17,fontWeight:'bold',color:'white'}}>+ Add Card</Text>
        </TouchableOpacity>
          </View>
        </View>



        <Modal animationType="slide" 
                   transparent visible={isModalVisible} 
                   presentationStyle="overFullScreen" 
                   onDismiss={toggleModalVisibility}>
                <View style={styles.viewWrapper}>
                  
                    <View style={styles.modalView}>
                    <Text style={{color:'black',fontSize:30}}>Add Card Details</Text>
                        <TextInput placeholder="CARD NUMBER" placeholderTextColor={'grey'} 
                                   value={cardNum} style={styles.textInput} 
                                   onChangeText={(value) => setCardNum(value)} />



<TextInput placeholder="ACCOUNT TITLE" placeholderTextColor={'grey'} 
                                   value={cardName} style={styles.textInput} 
                                   onChangeText={(value) => setCardName(value)} />


<TextInput placeholder="CVV" placeholderTextColor={'grey'} 
                                   value={cardCvv} style={styles.textInput} 
                                   onChangeText={(value) => setCardCvv(value)} />

  



<TextInput placeholder="EXPIRY DATE" placeholderTextColor={'grey'} 
                                   value={cardExp} style={styles.textInput} 
                                   onChangeText={(value) => setCardExp(value)} />

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
      backgroundColor: colors.white,
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
      color: colors.black,
      fontSize: 20,
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
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
    },
    viewWrapper: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.2)",
    },
    modalView: {
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        top: "50%",
        left: "50%",
        elevation: 5,
        transform: [{ translateX: -(width * 0.4) }, 
                    { translateY: -90 }],
        height: 480,
        width: width * 0.8,
        backgroundColor: "#fff",
        borderRadius: 7,
    },
    textInput: {
        width: "80%",
        borderRadius: 5,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderColor: "rgba(0, 0, 0, 0.2)",
        borderWidth: 1,
        marginBottom: 8,
        color:'black'
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
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
    },
    viewWrapper: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.2)",
    },
    modalView: {
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        top: "50%",
        left: "50%",
        elevation: 5,
        transform: [{ translateX: -(width * 0.4) }, 
                    { translateY: -90 }],
        height: 480,
        width: width * 0.8,
        backgroundColor: "#fff",
        borderRadius: 7,
    },
    textInput: {
        width: "80%",
        borderRadius: 5,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderColor: "rgba(0, 0, 0, 0.2)",
        borderWidth: 1,
        marginBottom: 8,
        color:'black'
    },
});