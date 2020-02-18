import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { ValidationTextInput, TextBold } from 'AppFonts';
import styles from '../../style/inputStyle';
import strings from 'src/res/strings.json';

const SimpleTextInput = ({
  isMandatory,
  title,
  onValueChange,
  value,
  name,
  index,
  fullWidth,
  ...props
}) => (
  <View style={fullWidth ? styles.fullInputWrapper : styles.inputWrapper}>
    <ValidationTextInput
      {...props}
      textStyle={[
        styles.inputBoxContainer,
        styles.inputWrapper,
        {
          textAlignVertical: 'top',
          paddingTop: 2,
          paddingBottom: 2,
          maxHeight: 200,
          margin: 10
        }
      ]}
      fontSize="size7"
      onChangeText={(text, error) => onValueChange(text, name, index, error)}
    >
      {value}
    </ValidationTextInput>
  </View>
);

export default SimpleTextInput;
