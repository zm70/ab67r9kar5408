import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';
// import { checkIsPersian } from './index';
import styles from './styles';

export function TextBold({
  weight,
  textStyle,
  forcePer,
  fontSize,
  color,
  ...props
}) {
  return (
    <Text
      {...props}
      style={[
        // checkIsPersian(props.children) || forcePer?
        // : styles.textBold,

        styles[weight],
        textStyle,
        styles[fontSize],
        styles[color]
      ]}
    />
  );
}

TextBold.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.any
  ]),
  textStyle: Text.propTypes.style,
  fontSize: PropTypes.string,
  weight: PropTypes.string
};

TextBold.defaultProps = {
  children: undefined,
  textStyle: {},
  fontSize: 'size4',
  weight: 'medium'
};
