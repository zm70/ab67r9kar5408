import React from 'react';
import { TouchableOpacity } from 'react-native';

export const CustomTouchable = ({ children, ...props }) => (
  <TouchableOpacity activeOpacity={0.85} {...props}>
    {children}
  </TouchableOpacity>
);
