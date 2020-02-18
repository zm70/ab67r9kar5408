import React from 'react';

import { createIconSetFromFontello } from 'react-native-vector-icons';
import fontelloConfig from 'src/res/config.json';
import styles from './styles';

const CustomIcon = createIconSetFromFontello(fontelloConfig);

export const Icon = ({ name, iconColor, iconSize, style, ...props }) => {
  return (
    <CustomIcon
      name={name}
      {...props}
      style={[style, styles[iconSize], styles[iconColor]]}
    />
  );
};
