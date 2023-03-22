/**
 * @format
 */
import { ViewPropTypes } from 'deprecated-react-native-prop-types';

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import 'react-native-reanimated'



AppRegistry.registerComponent(appName, () => App);
