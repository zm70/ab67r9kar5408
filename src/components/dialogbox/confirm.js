import React, { useState } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import EStylesheet from 'react-native-extended-stylesheet';
import { TextBold, ButtonBold } from 'AppFonts';
import { connect } from 'react-redux';

import { mainStyles } from 'app-styles';
import strings from 'src/res/strings.json';

import styles from './styles';
import { Actions } from 'react-native-router-flux';

const Confirm = (props) => {
  const [checked, setCheck] = useState(false);
  return (
    <View style={[styles.container, styles.errorBackground]}>
      <TextBold fontSize="size8">{strings.confirmMap}</TextBold>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          marginTop: 10,
          justifyContent: 'space-around'
        }}
      >
        <ButtonBold
          color="white"
          fontSize="size8"
          containerStyle={[mainStyles.defaultButton, mainStyles.backGreen]}
          onPress={props.onConfirm}
        >
          {strings.confirm}
        </ButtonBold>
        <ButtonBold
          color="white"
          fontSize="size8"
          containerStyle={[mainStyles.defaultButton, , mainStyles.backRed]}
          onPress={props.onReject}
        >
          {strings.negativeError}
        </ButtonBold>
      </View>
    </View>
  );
};

export default connect(
  null,
  null
)(Confirm);
