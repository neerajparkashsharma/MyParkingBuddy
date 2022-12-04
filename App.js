import { NavigationContainer } from '@react-navigation/native';
import OnBoarding from './src/screens/OnBoarding';
import Login from './src/screens/Login';
import SignUp from './src/screens/SignUp';
import MyMap from './src/screens/Map';
// import QRScan from './QRScanning';
import 'react-native-gesture-handler';
import SignUpOptions from './src/screens/SignUpOptions';
import GuestSignUp from './src/screens/GuestSignUp';


import VisionCamera from './src/screens/QRScanning';
import AddRemoveInputField from './src/screens/dynamic';
// import Scan from './QRScanning';


  
const Stack = createStackNavigator();

import {createStackNavigator} from '@react-navigation/stack';
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="OnBoarding">
        <Stack.Screen name="OnBoarding" component={OnBoarding} options={{headerShown: false}}/>
        <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
        <Stack.Screen name="SignUp" component={SignUp} options={{headerShown: false}}/>
        <Stack.Screen name="Map" component={MyMap} options={{headerShown: false}}/>
<Stack.Screen name="GuestSignUp" component={GuestSignUp} options={{headerShown: false}}/>
<Stack.Screen name="SignUpOptions" component={SignUpOptions} options={{headerShown: false}}/>

        <Stack.Screen name="Camera" component={VisionCamera} options={{headerShown: false}}/>
        <Stack.Screen name="AddRemoveInputField" component={AddRemoveInputField} options={{headerShown: false}}/>

        {/* <Stack.Screen name="QRScan" component={Scan} options={{headerShown: false}}/> */}
  {/* <Stack.Screen name="QRScan" component={QRScan} options={{headerShown: false}}/> */}

      </Stack.Navigator>
    </NavigationContainer>
  );0
}