// @flow

import React from 'react';

import { View } from 'react-native';
import { CartPage, MainpageTabbar, } from 'AppComponent';
import   {mainStyles}  from 'app-styles';

import { AnimationAux, RetryAux } from 'AppAux';
import StyleSheet from 'react-native-extended-stylesheet';
import strings from 'src/res/strings.json';

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: '#fff'
  }
});

const Tab3Screen = (props) => (
  <View style={[styles.flex]} className="w3view-cart">
    <MainpageTabbar iconName="ic_cart" title={strings.cart}  />
    <AnimationAux loading={false}>
      <RetryAux dataLoaded={true} retry={() => {}}>
        <CartPage />
      </RetryAux>
    </AnimationAux>
  </View>
);

export default Tab3Screen;

// Navigation.push(this.props.componentId, {
//   component: {
//     name: 'demo.SingleAppScreen'
//   }
// });
