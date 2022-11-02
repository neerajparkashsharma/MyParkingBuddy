import { NavigationContainer } from '@react-navigation/native';
import OnBoarding from './OnBoarding';
import Login from './Login';
import SignUp from './SignUp';

const Stack = createStackNavigator();

import {createStackNavigator} from '@react-navigation/stack';
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="OnBoarding">
        <Stack.Screen name="OnBoarding" component={OnBoarding} options={{headerShown: false}}/>
        <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
        <Stack.Screen name="SignUp" component={SignUp} options={{headerShown: false}}/>
  
      </Stack.Navigator>
    </NavigationContainer>
  );
}