import React, { useState } from 'react';
import { FlatList, StyleSheet, View, Image, Text, TextInput, TouchableOpacity } from 'react-native';
import { colors } from '../../commons/Colors';
import Headerx from '../../components/header';
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../../components/units';
import { ScrollView } from 'react-native-gesture-handler';
import url from '../../commons/axiosUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
const IMAGES = [
    {
        id: '1',
        source: require('./../../Images/card5.png'),
    },
    {
        id: '2',
        source: require('./../../Images/card9.jpg'),
    },
    {
        id: '3',
        source: require('./../../Images/card7.png'),
    },

    {
        id: '4',
        source: require('./../../Images/card8.png'),
    },
    {
        id: '5',
        source: require('./../../Images/card5.png'),
    },

];

export default UserPayment = (props) => {

    const [cardNumber,setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv,setCvv] = useState('');
    const [MM,setMM] = useState('');
    const [YY, setYY] = useState('');



    const renderItem = ({ item }) => (
        <Image source={item.source} style={styles.image} resizeMode="cover" />
    );


    const handleAddCard = async () => {
        try {
            const userId = await AsyncStorage.getItem('userdata');


          const response = await axios.post(
            `${url}wallet/${userId}`,
            {
              cardNumber,
              MM,
              YY,
              CVV:cvv
            }
          );
    
          alert('Success', 'Card added successfully');
        } catch (error) {
          alert('Error', 'Failed to add card');
          console.error(error);
        }
      };


    return (
        <>
            <Headerx
                navigation={props?.navigation}
                headerName={'Payment Method'}></Headerx>
            <ScrollView>
                <View style={{ padding: 20, margin: 5, width: SCREEN_WIDTH, SCREEN_HEIGHT: SCREEN_HEIGHT }}>
                    <FlatList
                        data={IMAGES}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={item => item.id}
                        renderItem={renderItem} 
                    />
                    <Text style={{ fontSize: 15, alignSelf: 'center', marginTop: SCREEN_HEIGHT / 19 }}>Add New Card Details</Text>
                    <View
                        style={{

                            marginTop: '5%',
                            borderRadius: 10,
                            padding: 20,
                        }}
                    >
                        <TextInput
                            style={{
                                height: 40,
                                fontSize: 16,
                                marginBottom: 10,
                            }}
                            onChangeText={(text) => setCardNumber(text)}
                            placeholder="Card No."
                        />
                        <View
                            style={{
                                borderBottomColor: '#ccc',
                                borderBottomWidth: 1,
                                marginBottom: 10,
                            }}
                        />
                        <TextInput
                            style={{
                                height: 40,
                                fontSize: 16,
                                marginBottom: 10,
                            }}

                            onChangeText={(text) => setMM(text)}

                            placeholder="MM"
                        />


                        <View
                            style={{
                                borderBottomColor: '#ccc',
                                borderBottomWidth: 1,
                                marginBottom: 10,
                            }}
                        />
                        <TextInput
                            style={{
                                height: 40,
                                fontSize: 16,
                                marginBottom: 10,
                            }}
                            onChangeText={(text) => setYY(text)}
                            placeholder="YY"
                        />

                        <View
                            style={{
                                borderBottomColor: '#ccc',
                                borderBottomWidth: 1,
                                marginBottom: 10,
                            }}
                        />
                        <TextInput
                            style={{
                                height: 40,
                                fontSize: 16,
                                marginBottom: 10,
                            }}

                            onChangeText={(text) =>setCvv(text)}
                            placeholder="CVV"
                        />
                        <View
                            style={{
                                borderBottomColor: '#ccc',
                                borderBottomWidth: 1,
                                marginBottom: 10,
                            }}
                        />
                        <TouchableOpacity
                            style={{
                                backgroundColor: colors.themeColor,
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: 50,
                                borderRadius: 10,
                                shadowColor: 'rgba(0, 0, 0, 0.2)',
                                shadowOpacity: 0.8,
                                shadowOffset: { width: 0, height: 2 },
                                shadowRadius: 2,
                                elevation: 5,
                                marginTop: 20,
                            }}

                            onPress={handleAddCard}
                        >
                            <Text
                                style={{
                                    color: 'white',
                                    fontSize: 18,
                                    fontWeight: '900',

                                }}
                            >
                                Add Card
                            </Text>
                        </TouchableOpacity>

                    </View>

                </View>
            </ScrollView>
        </>
    );
};

const styles = StyleSheet.create({

    image: {
        width: 250,
        height: 150,
        marginRight: 10,
        borderRadius: 10,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        padding: 20,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    input: {
        height: 40,
        width: 150,
        padding: 10,
        color: 'grey',
        fontSize: 15,
        margin: 16,
        padding: 10,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        marginRight: 10,
        alignSelf: 'flex-start'
    },
    input1: {
        height: 40,
        width: '95%',
        color: 'grey',
        fontSize: 15,
        padding: 10,
        margin: 16,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        marginRight: 10,
        alignSelf: 'flex-start'
    },
    btn: {
        height: 55,
        width: SCREEN_WIDTH / 1.1,
        justifyContent: 'center',
        alignItems: 'center',

        alignSelf: 'center',
        marginBottom: 70,
        backgroundColor: colors.themeColor,
        marginHorizontal: 20,
        borderRadius: 10,
    },
});


