import { AppRegistry } from 'react-native';
import MapboxGL from '@mapbox/react-native-mapbox-gl';
import { name as appName } from './app.json';
import App from './AppWithDeepLink';

MapboxGL.setAccessToken(
  'pk.eyJ1IjoibG9yZHBvb3JpYSIsImEiOiJjazFueW1nNTIwZmdjM2N0aWZndXUxdnJlIn0.RYXeK4Uz--wpURBTEADiPg'
);

console.disableYellowBox = true;

AppRegistry.registerComponent(appName, () => App);
