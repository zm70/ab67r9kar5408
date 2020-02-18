import React from 'react';
import { Provider } from 'react-redux';
import store from './configureStore';

const AppStoreProvider = ({ children, props }) => (
  <Provider store={store} {...props}>{children}</Provider>
);

export default AppStoreProvider;
