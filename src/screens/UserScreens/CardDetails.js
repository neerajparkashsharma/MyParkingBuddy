import React, { useState } from "react";
import { Button, SafeAreaView, StyleSheet, Modal, 
         View, TextInput, Dimensions,Text } from "react-native";
         import axios from 'axios';
         import url from '../../commons/axiosUrl.js';
const { width } = Dimensions.get("window");
const CardDetails = ({navigation}) => {
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


    
    const toggleModalVisibility = () => {
        setModalVisible(!isModalVisible);
    };
  
    return (
        <SafeAreaView style={styles.screen}>
           
  
            {/**  We are going to create a Modal with Text Input. */}
            <Button title="ADD CARD" onPress={toggleModalVisibility} />
  
  
            {/** This is our modal component containing textinput and a button */}
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
}

export default CardDetails

const styles = StyleSheet.create({
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