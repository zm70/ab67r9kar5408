import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TextBold } from './TextBold';
import { TextInput, Text, View } from 'react-native';
import styles from './styles';
import { checkValidation } from './checkValidation';

export const ValidationTextInput = ({
  weight,
  color,
  fontSize,
  textStyle,
  editable,
  validation,
  onChangeText,
  containerStyle,
  label,
  dark,
  extraLabel,
  extraLabelColor,
  ...props
}) => {
  
  const [errors, setErrors] = useState([]);
  const errorColor = dark ? 'yellow' : 'red';
  const labelColor = dark ? 'white' : '#222';

  return (
    <View style={containerStyle}>
      {extraLabel || label ? (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <TextBold
            fontSize="size6"
            color={extraLabelColor}
            textStyle={{ alignSelf: 'flex-end' }}
          >
            {extraLabel}
          </TextBold>
          <TextBold
            fontSize="size6"
            color={labelColor}
            textStyle={{ alignSelf: 'flex-end' }}
          >
            {label}
          </TextBold>
        </View>
      ) : null}
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
        onChangeText={(text) => {
          const newError = checkValidation(text, validation);
          setErrors(newError);
          onChangeText(text, newError.length > 0);
        }}
      />
      {errors ? (
        <Text style={{ textAlign: 'right', alignSelf: 'flex-end' }}>
          {errors.map((error) => (
            <TextBold color={errorColor} fontSize="size5">
              ({error})
            </TextBold>
          ))}
        </Text>
      ) : null}
    </View>
  );
};

ValidationTextInput.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.any
  ]),
  textStyle: Text.propTypes.style,
  fontSize: PropTypes.string,
  weight: PropTypes.string
};

ValidationTextInput.defaultProps = {
  children: undefined,
  textStyle: {},
  fontSize: 'size4',
  weight: 'medium'
};
