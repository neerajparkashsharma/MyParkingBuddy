import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
 

const nameExtractor = (text) => {
  const tokenizer = new natural.WordTokenizer();
  const tokens = tokenizer.tokenize(text);

  let name = '';

  tokens.forEach((token, index) => {
    if (token === 'name' && index < tokens.length - 1) {
      name = tokens[index + 1];
    }
  });

  return name;
};

const VoiceInputForm = () => {

  return (
    <View>
     
    </View>
  );
};

export default VoiceInputForm;
