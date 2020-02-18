import React from "react";
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Sae } from 'react-native-textinput-effects';
import {Icon} from 'AppFonts'

export const SaeInput = props=>(
  <Sae
    label={'Email Address'}
    iconClass={FontAwesomeIcon}
    iconName={'pencil'}
    iconColor={'white'}
    inputPadding={16}
    labelHeight={24}
    // active border height
    borderHeight={2}
    // TextInput props
    autoCapitalize={'none'}
    autoCorrect={false}
  />
);
