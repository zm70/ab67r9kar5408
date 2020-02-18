import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, ViewPropTypes } from 'react-native';

export function ButtonLoading({ containerStyle, children }) {
  return (
    <TouchableOpacity
      style={[
        {
          flexDirection: 'row-reverse',
          alignItems: 'center',
          justifyContent: 'center'
        },
        containerStyle
      ]}
      onPress={() => {}}
      activeOpacity={0.5}
    >
      {children}
    </TouchableOpacity>
  );
}

ButtonLoading.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.any
  ]),

  containerStyle: ViewPropTypes.style
};

ButtonLoading.defaultProps = {
  children: undefined,
  containerStyle: {}
};
