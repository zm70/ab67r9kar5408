import React from 'react';
import { View } from 'react-native';
import { TextBold } from 'AppFonts';
import propType from 'prop-types';
import styles from '../../style/inputStyle';
import strings from 'src/res/strings.json';

const NULL = 101;

const InputsHeader = ({ isMandatory, title }) => {
  return isMandatory === NULL ? null : (
    <View style={styles.titleWrapper}>
      <TextBold
        weight="light"
        fontSize="size7"
        color={isMandatory ? 'red' : 'gray'}
        
      >
        ({isMandatory ? strings.mandatory : strings.optional})
      </TextBold>
      <TextBold fontSize="size7">{title}</TextBold>
    </View>
  );
};

export default InputsHeader;

InputsHeader.propTypes = {
  title: propType.string,
  isMandatory: propType.bool
};
InputsHeader.defaultProps = {
  title: '',
  isMandatory: false
};
