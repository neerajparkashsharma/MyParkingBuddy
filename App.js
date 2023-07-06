import { NavigationContainer } from '@react-navigation/native';
import { useEffect,useState} from 'react';
import { View, Text } from 'react-native';
import OnBoarding from './src/screens/OnBoarding';
import Login from './src/screens/commonScreens/Login';
import SignUp from './src/screens/HostScreens/SignUp';
import MyMap from './src/screens/Map';
import 'react-native-gesture-handler';
import SignUpOptions from './src/screens/commonScreens/SignUpOptions';
import GuestSignUp from './src/screens/UserScreens/GuestSignUp';
import Imge from './src/screens/HostScreens/ParkingRegistration';
import AllBookings from './src/screens/UserScreens/AllBookings';
import VisionCamera from './src/screens/QRScanning';
import VisionCamera2 from './src/screens/QRCheckout';
import AddRemoveInputField from './src/screens/dynamic';
import Home from './src/screens/UserScreens/HomeScreen';
const Stack = createStackNavigator();
import NetInfo from '@react-native-community/netinfo';
import { createStackNavigator } from '@react-navigation/stack';
import CardDetails from './src/screens/UserScreens/CardDetails'; 
import DrawerNavigator from './src/Navigators/DrawerNavigator';
import LocationSettings from './src/screens/UserScreens/LocationSettings';
import HostDrawer from './src/Navigators/HostDrawer';
import Alerts from './src/screens/HostScreens/Alerts';
import VehicleParkingRegistration from './src/screens/HostScreens/VehicleParkingRegistration'; 
import VoiceInputForm from './src/components/NLP';
import ParkingBooking from './src/screens/UserScreens/ParkingBooking';
import LiveStreaming from './src/screens/UserScreens/LivesSreaming';
import UserPayment from './src/screens/UserScreens/UserPayment';
import NewScreen from './src/screens/UserScreens/NewScreen';
import SplashScreen from './src/screens/commonScreens/SplashScreen';
import VehicleDetections from './src/screens/UserScreens/VehicleDetections';
export default function App() {

  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);


  if (!isConnected) {
    return (
      <View style={{justifyContent:'center', alignContent:'center'}}>
        <Text style={{textAlign:'center',fontWeight:'bold'}}>No internet connection</Text>
      </View>
    );
  }


  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">

        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="NewScreen"
          component={NewScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LiveStreaming"
          component={LiveStreaming}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UserPayment"
          component={UserPayment}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OnBoarding"
          component={OnBoarding}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="TextClassifier"
          component={VoiceInputForm}
          options={{ headerShown: false }}
        />
        {/* <Stack.Screen
          name="ProgressSteps"
          component={ProgressSteps}
          options={{headerShown: false}}
        /> */}

        <Stack.Screen
          name="ParkingBooking"
          component={ParkingBooking}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="VehicleDetections"
          component={VehicleDetections}
          options={{ headerShown: false }}
        />


        <Stack.Screen
          name="Alerts"
          component={Alerts}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Drawer"
          component={DrawerNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LocationSettings"
          component={LocationSettings}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HostDrawer"
          component={HostDrawer}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="HomeeScreen"
          component={Home}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Map"
          component={MyMap}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="GuestSignUp"
          component={GuestSignUp}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUpOptions"
          component={SignUpOptions}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Camera"
          component={VisionCamera}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Camera2"
          component={VisionCamera2}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="AddRemoveInputField"
          component={AddRemoveInputField}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Imge"
          component={Imge}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AllBookings"
          component={AllBookings}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="cardDetails"
          component={CardDetails}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="VehicleParkingRegistration"
          component={VehicleParkingRegistration}
          options={{ headerShown: false }}
        />
        {/* <Stack.Screen name="QRScan" component={Scan} options={{headerShown: false}}/> */}
        {/* <Stack.Screen name="QRScan" component={QRScan} options={{headerShown: false}}/> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
  0;
}
