import React, { useState } from 'react';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import EStylesheet from 'react-native-extended-stylesheet';
import { Actions } from 'react-native-router-flux';

const styles = EStylesheet.create({
  searchInputWrapper: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0
  }
});

const components = this.lists.map(({ value, label }) => (
  <TouchableOpacity
    key={value}
    onPress={() => this.onPickerClose(label)}
    style={{ padding: 2 }}
  >
    <TextBold fontSize="size5">{label}</TextBold>
  </TouchableOpacity>
));

const WarningDialog = ({ data }) => {
  return (
    <View
      pointerEvents={this.state.expand ? 'auto' : 'none'}
      style={[styles.dropDownContainer, { opacity: this.state.dropdown }]}
    >
      <ScrollView>{components}</ScrollView>
    </View>
  );
};

export default WarningDialog;
