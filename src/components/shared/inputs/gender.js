import React from 'react';
import { View } from 'react-native';
import BoxComponents from './BoxComponents';

//these two component should merge defintaly

export const Gender = ({ onValueChange, value, name, contrasted, index }) => {

  return (
    <View style={[{ flexDirection: 'row', justifyContent: 'space-between' }]}>
      <BoxComponents
        yekan
        contrasted={contrasted}
        title={'مرد'}
        containerStyle={{ width: '30%' }}
        onChange={() => onValueChange('male', name, name)}
        textStyle={{ color: contrasted ? '#eee' : '#222' }}
        fontSize="size7"
        isActive={value === 'male'}
      />
      <BoxComponents
        yekan
        contrasted={contrasted}
        containerStyle={{ width: '30%' }}
        title={'زن'}
        onChange={() => onValueChange('female', name, name)}
        textStyle={{ color: contrasted ? '#eee' : '#222' }}
        fontSize="size7"
        isActive={value === 'female'}
      />
    </View>
  )
};

export const Gender2 = ({ onValueChange, value, name, contrasted, index }) => {

  return (
    <View style={[{ flexDirection: 'row', justifyContent: 'space-between' }]}>
      <BoxComponents
        yekan
        contrasted={contrasted}
        title={'مرد'}
        containerStyle={{ width: '30%' }}
        onChange={() => onValueChange('male', name, index)}
        textStyle={{ color: contrasted ? '#eee' : '#222' }}
        fontSize="size7"
        isActive={value === 'male'}
      />
      <BoxComponents
        yekan
        contrasted={contrasted}
        containerStyle={{ width: '30%' }}
        title={'زن'}
        onChange={() => onValueChange('female', name, index)}
        textStyle={{ color: contrasted ? '#eee' : '#222' }}
        fontSize="size7"
        isActive={value === 'female'}
      />
    </View>
  )
};
