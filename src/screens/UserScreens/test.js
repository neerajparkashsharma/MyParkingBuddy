// import React from 'react';
// import { View, Button, Text } from 'react-native';
// import Voice from 'react-native-voice';

// export default function VoiceToText() {
//     const [recognizedText, setRecognizedText] = React.useState('');
  
//     const handleStartRecognition = async () => {
//       try {
//         console.log('Starting voice recognition...');
//         Voice.start('en-US');
//       } catch (error) {
//         console.log('Error starting voice recognition:', error);
//       }
//     };
  
//     const handleStopRecognition = async () => {
//       try {
//         Voice.stop();
//       } catch (error) {
//         console.log('Error stopping voice recognition:', error);
//       }
//     };
  
//     React.useEffect(() => {
//       Voice.onSpeechResults = onSpeechResults;
//       return () => {
//         Voice.destroy().then(Voice.removeAllListeners);
//       };
//     }, []);
  
//     const onSpeechResults = event => {
//       const recognizedWords = event.value;
//       if (recognizedWords && recognizedWords.length > 0) {
//         setRecognizedText(recognizedWords[0]);
//       }
//     };
  
//     return (
//       <View>
//         <Button title="Start Recognition" onPress={handleStartRecognition} />
//         <Button title="Stop Recognition" onPress={handleStopRecognition} />
//         <Text>Recognized Text: {recognizedText}</Text>
//       </View>
//     );
//   }
  