import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Home from '../screens/UserScreens/HomeScreen';
import AllBookings from '../screens/HostScreens/AllBookings';
import MyMap from '../screens/Map';
import UserDrawerCustom from '../screens/UserScreens/UserDrawerCustom';
import EWallet from '../screens/UserScreens/EWallet';
import VisionCamera2 from '../screens/QRCheckout';
import Profile from '../screens/HostScreens/Profile';
import HostCustomDrawer from '../screens/HostScreens/HostCustomDrawer';
import ParkingRegistration from '../screens/HostScreens/ParkingRegistration';
const Drawer = createDrawerNavigator();

export default function HostDrawer({navigation}) {
  return (
    <Drawer.Navigator
      useLegacyImplementation
      initialRouteName="ParkingBookings"
      drawerContent={props => <HostCustomDrawer {...props} />}>
      <Drawer.Screen
        name="ParkingBookings"
        component={AllBookings}
        options={{headerShown: false}}
      />

      <Drawer.Screen
        name="ParkingRegistration"
        component={ParkingRegistration}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name="EWallet"
        component={EWallet}
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
