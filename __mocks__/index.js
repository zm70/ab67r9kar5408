// import mapboxgl from '@mapbox/react-native-mapbox-gl';

import MockAsyncStorage from 'mock-async-storage';

const mockImpl = new MockAsyncStorage();
jest.mock('@react-native-community/async-storage', () => mockImpl);

jest
  .mock('Button', () => {
    const RealComponent = require.requireActual('react-native-elements').Button;
    return RealComponent;
  });

// jest.mock("@mapbox/react-native-mapbox-gl", () => require("mapbox-gl-js-mock"));

// let mapDiv = dom.window.document.querySelector("div");
// let map = new mapboxgl.Map({container: mapDiv});