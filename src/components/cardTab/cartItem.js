import React from 'react';
import { View } from 'react-native';

import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    width: '100%',

    alignItems: 'center',
    backgroundColor: '#fff'
  },
  cartWrapper: {
    elevation: 4,
    width: '95%',
    alignItems: 'center',
    backgroundColor: '#FFF'
  },
  mainButton: {
    width: '100%',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    marginTop: 4,
    padding: 10
  }
});

export const CardItem = ({ name, }) => (
  <View style={styles.cartWrapper}>

  </View>
);
