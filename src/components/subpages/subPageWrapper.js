import React from 'react';
import { Actions } from 'react-native-router-flux';
import { View } from 'react-native';
import SubpageTabbar from '../layout/subPageTabbar';

const Subpages = ({ title, iconName, children }) => (
  <View style={{ flex: 1 }}>

    <>
      <SubpageTabbar
        title={title}
        iconName={iconName}
        popBack={Actions.pop}
      />
      {children}
    </>
    
  </View>
);

export default Subpages;
