import { StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';


const messages = [
  { id: 1, sender: 'John', receiver: 'Alice', message: 'Hello', date: '2023-06-04' },
  { id: 2, sender: 'Alice', receiver: 'John', message: 'Hi there!', date: '2023-06-05' },
  // Add more messages here
];

const ChatRoom = (props) => {

  const {bookingId,userId,} = props.route.params;

  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = () => {
    // Send message to server
    // ...
    // Clear input message
    setInputMessage('');
  };


  const renderMessage = ({ item }) => (
    <View style={[styles.messageContainer, item.sender === 'John' ? styles.senderMessage : styles.receiverMessage]}>
      <Text style={styles.message}>{item.message}</Text>
      <Text style={styles.date}>{item.date}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
    <FlatList
      data={messages}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderMessage}
      inverted
    />

    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder="Type your message..."
        value={inputMessage}
        onChangeText={setInputMessage}
      />
      <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
        <Text style={styles.sendButtonText}>Send</Text>
      </TouchableOpacity>
    </View>
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  messageContainer: {
    padding: 8,
    borderRadius: 8,
    marginVertical: 4,
    maxWidth: '80%',
  },
  senderMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#DCF8C6',
  },
  receiverMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF',
  },
  message: {
    fontSize: 16,
  },
  date: {
    fontSize: 12,
    marginTop: 4,
    color: '#888888',
  },
});

export default ChatRoom;
