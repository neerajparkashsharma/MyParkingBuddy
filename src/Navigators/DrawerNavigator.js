import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Home from '../screens/UserScreens/HomeScreen';
import AllBookings from '../screens/UserScreens/AllBookings';
import MyMap from '../screens/Map';
import UserDrawerCustom from '../screens/UserScreens/UserDrawerCustom';
import EWallet from '../screens/UserScreens/EWallet';
import VisionCamera2 from '../screens/QRCheckout';
import Profile from '../screens/UserScreens/Profile';
import FindParking from '../screens/UserScreens/FindParking';
import Settings from '../screens/UserScreens/Settings';
import LocationSettings from '../screens/UserScreens/LocationSettings';
import BookingParking from '../screens/UserScreens/ParkingBooking';
const Drawer = createDrawerNavigator();

export default function DrawerNavigator({navigation}) {
  return (
    <Drawer.Navigator
      useLegacyImplementation
      initialRouteName="Home"
      drawerContent={props => <UserDrawerCustom {...props} />}>
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />

      <Drawer.Screen
        name="ParkingBookings"
        component={AllBookings}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name="E-Wallet"
        component={EWallet}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name="Settings"
        component={Settings}
        options={{headerShown: false}}
      />

      <Drawer.Screen
        name="LocationSettings"
        component={LocationSettings}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name="BookParking"
        component={BookingParking}
        options={{headerShown: false}}
      />

      <Drawer.Screen
        name="MyMap"
        component={FindParking}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name="Camera2"
        component={VisionCamera2}
        options={{headerShown: false}}
      />

      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false}}
      />
    </Drawer.Navigator>
  );
}
