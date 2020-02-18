import React, { useState } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { TextBold, ButtonBold } from 'AppFonts';

import { mainStyles } from 'app-styles';
import strings from 'src/res/strings.json';

import style from './style';

const WarningDialog = (props) => {
  const [checked, setCheck] = useState(false);
  return (
    <View>
      <TextBold textStyle={{ textAlign: 'center' }} fontSize="size10">
        {strings.warn}
      </TextBold>
      <TextBold
        color="white"
        fontSize="size7"
        textStyle={{ textAlign: 'right' }}
      >
        {strings.followCaution}{' '}
      </TextBold>
      <TouchableOpacity
        style={style.radioButtonContainer}
        onPress={() => setCheck(!checked)}
      >
        <TextBold color="white" fontSize="size8">
          {strings.neverShow}
        </TextBold>
        <View style={style.radioButton}>
          <View
            style={[
              style.innerRadioButton,
              checked ? style.checkedRadioButton : style.uncheckedRadioButton
            ]}
          />
        </View>
      </TouchableOpacity>
      <ButtonBold
        containerStyle={[
          mainStyles.defaultButton,
         
          {
            backgroundColor: '#fff'
          }
        ]}
        onPress={() => {
          console.log(props)
          // props.setShowCaution(checked ? 'notshow' : 'show');
          props.onConfirm(checked ? 'notshow' : 'show');
        }}
        color="red"
        fontSize="size9"
      >
        {strings.isee}
      </ButtonBold>
    </View>
  );
};

export default WarningDialog;
