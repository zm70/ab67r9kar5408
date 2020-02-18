import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import { TextBold } from './TextBold';
import { Icon } from './icons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import styles from './styles';

export function ButtonBold({
  onPress,
  iconName,
  iconName2,
  containerStyle,
  iconStyle,
  iconColor,
  iconSize,
  textStyle,
  children,
  isMedium,
  fontSize,
  color,
  weight,
  externalIconName,
  ...props
}) {
  return (
    <TouchableOpacity
      style={[
        {
          flexDirection: 'row-reverse',
          alignItems: 'center',
          justifyContent: 'center',
        },
        containerStyle
      ]}
      onPress={onPress}
      activeOpacity={0.5}
    >
      {externalIconName ? (
        <FontAwesome
          name={externalIconName}
          style={[
            styles[iconColor],
            styles[iconSize],
            { marginLeft: 4, marginRight: 4 }
          ]}
        />
      ) : null}
      {iconName ? (
        <Icon
          name={iconName}
          iconColor={iconColor}
          iconSize={iconSize}
          style={[{ marginLeft: 3, marginRight: 3 }, iconStyle]}
        />
      ) : null}
      {children ? (
        <TextBold
          {...props}
          weight={weight}
          textStyle={textStyle}
          fontSize={fontSize}
          color={color}
        >
          {children}
        </TextBold>
      ) : null}
      {iconName2 ? (
        <Icon
          name={iconName2}
          iconColor={iconColor}
          iconSize={iconSize}
          style={[{ marginLeft: 3, marginRight: 3 }, iconStyle]}
        />
      ) : null}
    </TouchableOpacity>
  );
}

ButtonBold.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.any
  ]),
  fontSize: PropTypes.string,
  textStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onPress: PropTypes.func,
  containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  iconStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

ButtonBold.defaultProps = {
  children: undefined,
  textStyle: {},
  onPress: () => {},
  containerStyle: {},
  iconStyle: {}
};
