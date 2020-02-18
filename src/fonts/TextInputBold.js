import React from 'react';
import PropTypes from 'prop-types';
import { TextInput, Text } from 'react-native';
import styles from './styles';

export function TextInputBold({
  weight,
  color,
  fontSize,
  textStyle,
  editable,
  ...props
}) {
  return (
    <TextInput
      underlineColorAndroid="transparent"
      {...props}
      editable={editable}
      
      style={[
        styles[weight],
        textStyle,
        styles[fontSize],
        styles[color],
        { fontWeight: 'normal' }
      ]}
    />
  );
}

TextInputBold.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.any
  ]),
  textStyle: Text.propTypes.style,
  fontSize: PropTypes.string,
  weight: PropTypes.string
};

TextInputBold.defaultProps = {
  children: undefined,
  textStyle: {},
  fontSize: 'size4',
  weight: 'medium'
};
